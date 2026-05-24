/**
 * src/lib/theme.ts — 主题切换工具
 *
 * 三态：light / dark / system
 * 持久化：localStorage["theme"]
 * 广播：dispatchEvent("theme:changed", { detail: { theme, resolved } })
 */

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";

/** 读取系统偏好 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** 读取持久化偏好（无效值视作 system） */
export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }
  return "system";
}

/** 计算最终生效主题 */
export function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

/** 应用主题到 <html> */
export function applyTheme(theme: Theme): ResolvedTheme {
  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  if (theme === "system") {
    root.removeAttribute(THEME_ATTR);
  } else {
    root.setAttribute(THEME_ATTR, resolved);
  }

  return resolved;
}

/** 设置主题：持久化 + 应用 + 广播 */
export function setTheme(theme: Theme): void {
  if (theme === "system") {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } else {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  const resolved = applyTheme(theme);

  window.dispatchEvent(
    new CustomEvent("theme:changed", {
      detail: { theme, resolved },
    }),
  );
}

/** 监听系统主题变化（仅当用户设置为 system 时跟随） */
export function watchSystemTheme(): () => void {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (): void => {
    if (getStoredTheme() === "system") {
      applyTheme("system");
      window.dispatchEvent(
        new CustomEvent("theme:changed", {
          detail: { theme: "system", resolved: getSystemTheme() },
        }),
      );
    }
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
