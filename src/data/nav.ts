/**
 * src/data/nav.ts
 *
 * 主导航配置。labelKey 指向 i18n 字典 key，渲染时通过 i18n/zh.ts 取文案。
 */

export interface NavItem {
  /** 路由路径（无尾斜杠） */
  href: string;
  /** i18n 字典 key（在 src/i18n/zh.ts 中定义） */
  labelKey: string;
}

export const NAV: readonly NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/ai", labelKey: "nav.ai" },
  { href: "/thoughts", labelKey: "nav.thoughts" },
] as const;
