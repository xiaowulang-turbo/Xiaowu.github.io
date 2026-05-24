# ROADMAP — 路线图与想法池

> 本文件记录项目的**当前状态**、**进行中的工作**、**已规划但未启动**的功能、以及**想法池**。
> 任何 AI 在主动建议「下一步做什么」前必须先看这份文件。

---

## 阶段定义

| 阶段 | 标志 |
|---|---|
| **v0** 地基 | 文档体系完成，未写任何业务代码 |
| **v0.5** 骨架 | Astro 项目初始化完成，五大路由占位，tokens 落地，深浅模式可切换 |
| **v1.0** MVP | 五大板块均有内容产出，首页可对外发布 |
| **v1.x** 增强 | 搜索、RSS、评论、i18n 启用，性能/可访问性达标 |
| **v2** 互动 | AI Lab 中接入交互式 demo，Vercel MCP 等生态接入 |

---

## 当前阶段：v0 地基

### ✅ 已完成

- [x] 删除旧 `index.html` / GPL `LICENSE`
- [x] 替换 LICENSE 为 CC BY-NC 4.0
- [x] 建立 `.gitignore`
- [x] `AGENTS.md` —— AI 协作宪法
- [x] `README.md` —— 项目对外说明
- [x] `docs/README.md` —— 文档索引
- [x] `docs/ARCHITECTURE.md` —— 技术架构
- [x] `docs/ROADMAP.md` —— 本文件

- [x] `docs/design/STYLE_GUIDE.md` —— 视觉风格宪法
- [x] `docs/design/DESIGN_TOKENS.md` —— 设计 token 清单
- [x] `docs/design/COMPONENT_PATTERNS.md` —— 组件标准（骨架）
- [x] `docs/content/CONTENT_MODEL.md` —— 内容 Schema
- [x] `docs/content/WRITING_GUIDE.md` —— 写作规范
- [x] `docs/content/IMAGE_GUIDE.md` —— 图片规范
- [x] `docs/rfcs/0000-template.md` —— RFC 模板
- [x] `prompts/images.md` —— 图片 prompt 库
- [x] 用户审阅地基文档，确认无误

### 🚧 进行中（v0 → v0.5 过渡）

- [ ] **RFC-0001: Project Bootstrap** —— 项目初始化方案（**等待用户确认**）

### 📋 待办（v0.5 骨架）

> 全部依赖 RFC-0001 用户确认后启动。

- [ ] 执行 Astro + pnpm + Tailwind v4 + Biome + Husky 初始化
- [ ] 配置文件落地（`astro.config.ts` / `tsconfig.json` / `biome.json` / `package.json`）
- [ ] `src/styles/tokens.css` 完整实现（与 `DESIGN_TOKENS.md` 一致）
- [ ] `src/styles/globals.css` reset + 基础排版
- [x] `src/content/config.ts` 7 个 collection 的 Zod Schema
- [x] `BaseLayout.astro` 含主题防闪 inline 脚本
- [x] 五大路由占位页（"Quiet Construction" 风格）
- [x] `<ThemeToggle>` 三态切换 + 持久化
- [x] `<SiteNav>` 顶部主导航
- [x] 临时 favicon（手写极简 SVG）
- [x] 本地验证：`pnpm dev` / `pnpm build` / `pnpm check` 全部通过
- [x] 部署到 Vercel 替换旧 `Hello World`
- [x] 验证生产环境：主题切换、五个路由、移动端响应式
- [x] 修复 Sticky footer 与 nav tab 等高（v0.5 上线后细节优化）

---

## v0.5 → v1.0 过渡（进行中）

- [ ] **RFC-0002: About Section** —— 个人简历型 about 页（**等待用户确认**）

---

## v1.0 MVP 清单

按板块拆分，每个板块开发前需提交独立 RFC：

### Home
- [ ] Hero（克制大字 + 一句 tagline + CTA）
- [ ] Featured Projects（≤3 条，从 projects 集合 `featured: true`）
- [ ] Latest Thoughts（最新 3 篇，跨 thoughts + ai-insights）
- [ ] About 入口卡片

### About（详见 RFC-0002）
- [ ] M1 Hero：极简自我陈述 + Kirito 彩蛋
- [ ] M2 Trajectory：4 节点成长轨迹图（含 hover 展开）
- [ ] M3 Now：当前两个 Agent 项目（核心硬通货）
- [ ] M4 Track Record：反时间线工作 / 实习经历
- [ ] M5 Stack：四档技能栈（Agent & AI 第一档）
- [ ] M6 Education：低调学历
- [ ] M7 Three Things to Be Asked：三问（占位）
- [ ] M8 Want More：深读入口
- [ ] 隐私自查 + 信息密度自查
- [ ] 联系方式以「点击复制」形式呈现 Email

### Projects
- [ ] 卡片网格（封面 + 标题 + 摘要 + 技术栈 tag）
- [ ] 标签筛选（客户端，无需后端）
- [ ] 详情页（MDX 渲染 + 元信息边栏）

### AI
- [ ] 总览页：四个子板块入口卡
- [ ] AI Insights 列表 + 详情
- [ ] MCP 推荐（卡片式，含分类、用途、链接）
- [ ] Skill 推荐（卡片式）
- [ ] AI Lab（自研工具列表，含状态：active / paused / archived）

### Thoughts
- [ ] 列表（按 category 分组：frontend / engineering / ...）
- [ ] 详情页（MDX + 阅读进度条 + 目录）

### 横切
- [ ] 顶部主导航（响应式：移动端汉堡菜单）
- [ ] 页脚（社交链接 + License + Build hash）
- [ ] 404 页（Kirito 彩蛋）
- [ ] 主题切换器（light / dark / system）
- [ ] OG Image（每页一张，结构预留）

---

## v1.x 增强清单（不在 MVP 内）

- [ ] **Pagefind** 全文搜索（按 `/` 触发命令面板）
- [ ] **RSS** feed（订阅 thoughts + ai-insights）
- [ ] **Sitemap**（`@astrojs/sitemap`）
- [ ] **giscus** 评论（仅文章页，可在 frontmatter 关闭）
- [ ] **i18n** 启用英文版（先翻译框架，内容渐进）
- [ ] **Reading time** 估算（基于字数）
- [ ] **TOC**（文章目录，桌面端右侧）
- [ ] **Vercel Analytics** + **Speed Insights** 接入
- [ ] **GitHub Actions CI**（lint + typecheck + build）
- [ ] **Lighthouse CI** 性能门禁
- [ ] **Web Manifest** + Apple Touch Icon

---

## v2 互动设想

- [ ] AI Lab：在 MDX 中嵌入真实可调用的 Skill demo（通过 Server Islands）
- [ ] Vercel MCP 集成：让 AI 协作者直接读取部署状态、Analytics
- [ ] 命令面板（`Cmd+K`）：跨页面跳转 + 搜索 + 主题切换
- [ ] View Transitions：跨路由的优雅过渡
- [ ] Code Playground：心得文章中嵌入可编辑代码片段

---

## 想法池（Ideas）

> **未承诺实现**。任何成熟的想法升级为「v1.x」或「v2」清单后再开 RFC。

- 🌱 「Now」页面：当前在做什么 / 在读什么 / 在听什么（参考 nownownow.com）
- 🌱 阅读笔记板块（书 + 论文 + 文章）
- 🌱 Bookmarks / Reading List
- 🌱 「Uses」页面：硬件 / 软件 / 服务清单（参考 uses.tech）
- 🌱 Year in Review 年度总结模板
- 🌱 Newsletter（Buttondown / Beehiiv 集成，邮件订阅）
- 🌱 项目页接入 GitHub API：自动同步 stars / 最近 commit
- 🌱 Bento 风格首页变体（仅作为 A/B 视觉实验，不替换主版）
- 🌱 字体切换器（衬线 / 无衬线 / 等宽，作为彩蛋）

---

## 维护原则

- 完成项打 `[x]` 并保留在原位（历史可追溯），不要删除。
- 想法池中的想法升级到清单时，**移动**而非复制。
- 状态有变更需在 PR 描述中提及。
