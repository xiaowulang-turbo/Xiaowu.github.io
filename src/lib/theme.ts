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

/** 主题切换的过渡作用域类（与 globals.css 的 html.theme-changing body 选择器配套） */
const THEME_CHANGING_CLASS = "theme-changing";
/** 略大于 --dur-normal (200ms) 的清理窗口，确保 transitionend 后再移除 */
const THEME_CHANGING_DURATION = 250;
let themeChangingTimer: ReturnType<typeof setTimeout> | undefined;

/** 标记"用户主动切换主题"——临时启用 body 颜色过渡，250ms 后自动撤销。
 *
 * 仅在 setTheme / watchSystemTheme 这类**用户感知到的主动切换**时调用；
 * applyTheme 不调用，因为它也会被 ThemeToggle.init() 的兜底路径触发，
 * 那种场景属于"页面初始同步"，不应被视觉渐变。 */
function markThemeChanging(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.add(THEME_CHANGING_CLASS);
  if (themeChangingTimer !== undefined) {
    clearTimeout(themeChangingTimer);
  }
  themeChangingTimer = setTimeout(() => {
    root.classList.remove(THEME_CHANGING_CLASS);
    themeChangingTimer = undefined;
  }, THEME_CHANGING_DURATION);
}

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

/** 应用主题到 <html>
 *
 * 同步两件事：
 *   1. data-theme 属性（驱动 CSS 变量切换）
 *   2. style.color-scheme（锁定浏览器原生底色，避免 MPA 切页的过渡空白帧闪烁）
 *
 * 两者必须一起改：data-theme 控制我们自己的样式，color-scheme 控制
 * 浏览器在 unload 旧页 → 新页 first paint 之间的默认填充色。
 */
export function applyTheme(theme: Theme): ResolvedTheme {
  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  if (theme === "system") {
    root.removeAttribute(THEME_ATTR);
  } else {
    root.setAttribute(THEME_ATTR, resolved);
  }
  root.style.colorScheme = resolved;

  return resolved;
}

/** 设置主题：持久化 + 应用 + 广播
 *
 * 这是用户主动切换的入口（点击 ThemeToggle）。在这里启用一次过渡作用域，
 * 让 body 颜色变化以 200ms 渐变；250ms 后自动恢复到"无 transition"状态。 */
export function setTheme(theme: Theme): void {
  if (theme === "system") {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } else {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  markThemeChanging();
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
      markThemeChanging();
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
