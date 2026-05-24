/**
 * src/i18n/zh.ts — 中文字典（v0.5 骨架文案）
 *
 * 命名规则：<scope>.<key>，使用点分。
 * 新增 key 必须在所有语言字典中同步（即使当前只渲染中文）。
 */

export const zh = {
  /* ============================================================
   * 通用 / common
   * ============================================================ */
  "common.skipToContent": "跳到主要内容",
  "common.copy": "复制",
  "common.copied": "已复制",
  "common.toggleMenu": "切换菜单",

  /* ============================================================
   * 主题切换 / theme
   * ============================================================ */
  "theme.toggle": "切换主题",
  "theme.light": "浅色模式",
  "theme.dark": "深色模式",
  "theme.system": "跟随系统",

  /* ============================================================
   * 主导航 / nav
   * ============================================================ */
  "nav.home": "首页",
  "nav.about": "关于",
  "nav.projects": "项目",
  "nav.ai": "AI",
  "nav.thoughts": "心得",

  /* ============================================================
   * 社交 / social
   * ============================================================ */
  "social.github": "GitHub",
  "social.email": "Email",

  /* ============================================================
   * 站点级 / site
   * ============================================================ */
  "site.tagline.zh": "用克制，做长期的事。",

  /* ============================================================
   * 占位（Quiet Construction）/ placeholder
   * ============================================================ */
  "placeholder.phase": "当前阶段：v0.5 骨架",
  "placeholder.roadmap": "查看路线图",

  /* ============================================================
   * 页面 / pages
   * ============================================================ */
  "page.home.intro":
    "一个由 Xiaowu 慢慢建造的个人门户站。简历、项目、AI 心得与开发思考都将在此安家。",
  "page.home.rebuild": "这个站点正在被重建——慢一点，认真一点。骨架已经搭好。",

  "page.about.title": "关于",
  "page.about.intro": "我是 Xiaowu，在网络空间里也叫 Kirito。",
  "page.about.placeholder": "这里以后会是一份克制的简历——关于我做过什么、相信什么、想往哪里去。",

  "page.projects.title": "项目",
  "page.projects.placeholder": "这里以后会陈列我在 GitHub 上认真做过、愿意拿出来分享的项目。",

  "page.ai.title": "AI",
  "page.ai.placeholder":
    "这里以后会有我对 AI 协作的心得、推荐的 MCP 与 Skill，以及我自己写的 AI 工具。",

  "page.thoughts.title": "心得",
  "page.thoughts.placeholder": "这里以后会是我对前端、工程化、设计与软件之道的思考与笔记。",

  "page.404.title": "404",
  "page.404.body": "Not all those who wander are lost — but this page is.",
  "page.404.kirito": "I am Kirito; I will find another way.",
  "page.404.back": "回到首页",

  /* ============================================================
   * 页脚 / footer
   * ============================================================ */
  "footer.copyright": "© Xiaowu / Kirito",
  "footer.licenseLabel": "采用 CC BY-NC 4.0 许可",
  "footer.builtWith": "Built with restraint.",
} as const;

export type Dictionary = typeof zh;
export type DictKey = keyof Dictionary;
