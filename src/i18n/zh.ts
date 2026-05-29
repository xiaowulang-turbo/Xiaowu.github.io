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

  /* —— About 板块（v1.0）—— */
  "about.lastUpdated": "最近一次自更新",
  "about.keepReading": "继续阅读",
  "about.openTo": "Open to opportunities",

  "about.trajectory.title": "Trajectory",
  "about.trajectory.subtitle": "",

  "about.now.title": "What I'm working on",
  "about.now.keywords": "关键能力",

  "about.track.title": "Track Record",
  "about.track.intern": "Intern",

  "about.stack.title": "Stack",
  "about.stack.agentAndAi": "Agent & AI",
  "about.stack.daily": "Daily driver",
  "about.stack.comfortable": "Comfortable",
  "about.stack.curious": "Curious about",

  "about.education.title": "Education",

  "about.asked.title": "Three things I'd love to be asked",
  "about.asked.placeholderHint": "Three thoughtful questions are taking shape.",

  "about.wantMore.title": "Want more?",

  "page.projects.title": "项目",
  "page.projects.intro":
    "这里陈列我认真做过、愿意拿出来分享的东西——工作里的 Agent 项目，以及 GitHub 上的小工具与脚本。",

  /* —— Projects 板块（v1.0）—— */
  "projects.selected.title": "Selected Work",
  "projects.archive.title": "Archive",
  "projects.empty": "项目正在整理中，很快就会出现在这里。",

  "projects.status.active": "进行中",
  "projects.status.wip": "开发中",
  "projects.status.archived": "已归档",

  "projects.category.web": "Web",
  "projects.category.tool": "工具",
  "projects.category.library": "开源库",
  "projects.category.experiment": "实验",
  "projects.category.ai": "AI",

  "projects.viewSource": "源码",
  "projects.viewDemo": "演示",
  "projects.backToList": "项目",

  "page.ai.title": "AI",

  "page.thoughts.title": "心得",
  "page.thoughts.intro":
    "一些我反复确认的小信条——关于取舍、克制、工程与真诚。它们大多先成了这个站点的开发规范，再沉淀成这里的句子。",
  "thoughts.empty": "信条还在沉淀，很快会出现在这里。",

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
