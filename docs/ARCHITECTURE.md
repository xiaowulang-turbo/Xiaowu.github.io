# ARCHITECTURE — 技术架构

> 本文档是 **技术架构** 的唯一真理来源（SoT）。
> 任何对技术栈、目录结构、构建流程的变更，必须先更新此文档。

---

## 1. 设计目标

按优先级排序：

1. **长期可维护性** —— 三年后仍能轻松迭代
2. **内容可扩展性** —— 添加新文章/新板块零摩擦
3. **视觉一致性** —— Token 驱动，一处改动全站生效
4. **性能** —— 默认零 JS，按需水合
5. **协作友好** —— 文档驱动，AI 易于理解

> **不追求**：极致前沿（如 SSR 流式、edge function 重度使用）、复杂状态管理、运行时插件化。

---

## 2. 技术栈

| 层 | 选型 | 备选 | 决策依据 |
|---|---|---|---|
| 框架 | **Astro 5.x** | Next.js / VitePress | 内容驱动、Islands 架构、零 JS 默认、MDX 一流 |
| 内容 | **MDX** | Markdown / 纯 JSON | 可在内容中嵌入交互组件 |
| 语言 | **TypeScript** (strict) | — | 长期类型安全 |
| 样式 | **Tailwind CSS v4** + CSS variables | UnoCSS / 纯 CSS | 原子化 + token 化结合最佳 |
| UI 组件 | **自建** | shadcn / Radix | 哲学一致性，避免外来设计语言 |
| 图标 | **Lucide** | Heroicons / Tabler | 风格克制、tree-shake 友好 |
| 包管理 | **pnpm** | npm / yarn | 快速、磁盘友好、严格依赖图 |
| 代码规范 | **Biome** | ESLint + Prettier | 单二进制、零配置、极快 |
| Hooks | **Husky** + **lint-staged** + **commitlint** | simple-git-hooks | 提交前自动校验 |
| 搜索（规划） | **Pagefind** | Algolia / Fuse.js | 纯静态、零后端 |
| 部署 | **Vercel** | Cloudflare Pages | 已有部署、Astro 一等支持 |
| Analytics（规划） | Vercel Analytics | Umami | 零侵入、隐私友好 |

### 不引入的依赖（白名单原则）

- ❌ jQuery / Moment.js / Lodash —— 用原生
- ❌ 重型动画库（Framer Motion / GSAP）—— 简单动效用 CSS / View Transitions
- ❌ 状态管理库（Redux / Zustand）—— 静态站不需要
- ❌ CSS-in-JS（Emotion / styled-components）—— 与 Tailwind + tokens 重复

---

## 3. 目录结构

```
Xiaowu.github.io/
├── AGENTS.md                  # AI 协作宪法
├── LICENSE                    # CC BY-NC 4.0
├── README.md                  # 项目对外说明
├── astro.config.ts            # Astro 配置
├── tsconfig.json
├── biome.json
├── package.json
├── pnpm-lock.yaml
├── .gitignore
├── .vercel/                   # （部署后生成，gitignored）
│
├── docs/                      # 项目文档（详见 docs/README.md）
├── prompts/                   # AI 配图 prompt 库
│
├── public/                    # 静态资源（直出原路径）
│   ├── favicon.svg
│   ├── robots.txt
│   └── ...                    # 不参与构建优化的固定资源
│
└── src/
    ├── content/               # ⭐ 内容层（MDX + Schema）
    │   ├── config.ts          # Zod Schema 定义（所有 collection）
    │   ├── projects/
    │   ├── ai-insights/
    │   ├── ai-mcp/
    │   ├── ai-skills/
    │   ├── ai-lab/
    │   ├── thoughts/
    │   └── about/
    │
    ├── data/                  # 静态结构化数据（非 MDX）
    │   ├── site.ts            # 站点元信息
    │   ├── nav.ts             # 导航配置
    │   └── social.ts          # 社交链接
    │
    ├── styles/
    │   ├── tokens.css         # ⭐ 设计 token 唯一来源
    │   ├── globals.css        # reset + 基础排版
    │   └── prose.css          # MDX 正文样式
    │
    ├── lib/                   # 纯函数工具（无副作用）
    │   ├── format.ts
    │   ├── slug.ts
    │   └── ...
    │
    ├── i18n/                  # 国际化字典（先只放 zh）
    │   ├── zh.ts
    │   └── index.ts
    │
    ├── components/
    │   ├── primitives/        # 原子（Button, Tag, Link, Icon, Kbd）
    │   ├── ui/                # 复合（Card, Nav, Footer, ThemeToggle, SearchTrigger）
    │   └── sections/          # 页面级区块（Hero, ProjectGrid, PostList, AboutTabs）
    │
    ├── layouts/
    │   ├── BaseLayout.astro
    │   ├── PageLayout.astro
    │   └── PostLayout.astro
    │
    ├── pages/                 # 路由（薄，只做组装）
    │   ├── index.astro                     # /
    │   ├── about.astro                     # /about
    │   ├── projects/
    │   │   ├── index.astro                 # /projects
    │   │   └── [slug].astro                # /projects/:slug
    │   ├── ai/
    │   │   ├── index.astro                 # /ai
    │   │   ├── insights/
    │   │   │   ├── index.astro
    │   │   │   └── [slug].astro
    │   │   ├── mcp/index.astro
    │   │   ├── skills/index.astro
    │   │   └── lab/index.astro
    │   ├── thoughts/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── rss.xml.ts                      # （后期启用）
    │   └── 404.astro
    │
    └── assets/                # 参与构建优化的图片资源
        ├── hero/
        ├── projects/
        └── og/
```

---

## 4. 分层规则（架构红线）

### 4.1 调用方向（单向，不得逆流）

```
pages → layouts → sections → ui → primitives
                        ↘  → lib / data / i18n
```

- `primitives` 是叶子层，**不依赖**任何上层组件。
- `sections` 可以使用 `ui` 与 `primitives`，**禁止** `primitives` 反向调用 `sections`。
- `lib` / `data` / `i18n` 是纯数据/纯函数，**任何层**都可调用，但它们**不依赖**组件。

### 4.2 `pages/` 是薄层

- 只允许：导入数据、导入组件、组合渲染、设置 frontmatter。
- 禁止：复杂业务逻辑、内联大段样式、内联硬编码内容。

### 4.3 `content/` 是内容层

- 所有展示型长文本必须以 MDX 文件存在 `content/` 下，由 Schema 强校验。
- 短结构化文本（导航、标语、社交链接）放 `data/`。

### 4.4 `styles/tokens.css` 是视觉根

- 全站颜色、字号、间距、圆角、动效时长**必须**来自此文件定义的 CSS 变量。
- Tailwind v4 的 `@theme` 配置从此文件派生，**不重复定义**。

---

## 5. 路由约定

| 路径 | 来源 | 说明 |
|---|---|---|
| `/` | `pages/index.astro` | 首页（Hero + 精选项目 + 最新文章） |
| `/about` | `pages/about.astro` | 简历型介绍（侧边锚点导航） |
| `/projects` | `content/projects/*.mdx` | 项目网格（标签筛选） |
| `/projects/[slug]` | 同上 | 项目详情 |
| `/ai` | `pages/ai/index.astro` | AI 总览（四子板块入口） |
| `/ai/insights` | `content/ai-insights/*.mdx` | AI 心得列表 |
| `/ai/mcp` | `content/ai-mcp/*.mdx` | MCP 推荐 |
| `/ai/skills` | `content/ai-skills/*.mdx` | Skill 推荐 |
| `/ai/lab` | `content/ai-lab/*.mdx` | 自研 AI 工具 |
| `/thoughts` | `content/thoughts/*.mdx` | 心得列表（按 category 分组） |
| `/thoughts/[slug]` | 同上 | 心得详情 |
| `/404` | `pages/404.astro` | 含 Kirito 彩蛋 |

国际化（未来）：`pages/[lang]/...`，第一阶段 `lang` 默认为 `zh`，结构预留但不启用。

---

## 6. 主题与深色模式

- 通过 `data-theme="light" | "dark"` 在 `<html>` 上切换
- 三态：`light` / `dark` / `system`（默认 system）
- 用户选择持久化到 `localStorage.theme`
- 启动脚本（inline，避免闪烁）由 `BaseLayout.astro` 注入
- 切换器组件：`components/ui/ThemeToggle.astro`

---

## 7. 构建与部署

### 本地

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm check        # astro check + biome check
pnpm build        # 输出 dist/
pnpm preview      # 本地预览构建产物
```

### CI（GitHub Actions，规划）

每次 push 到 `main`：
1. `pnpm install --frozen-lockfile`
2. `pnpm check`
3. `pnpm build`
4. （可选）Lighthouse CI 跑性能阈值

### 部署（Vercel）

- 项目已部署：<https://xiaowulang.vercel.app/>
- 框架预设：Astro
- 构建命令：`pnpm build`
- 输出目录：`dist`
- Node 版本：≥ 20 LTS
- 环境变量：（暂无）

---

## 8. 可扩展性预留

| 未来能力 | 当前预留 | 启用成本 |
|---|---|---|
| 国际化 | 路由结构 + `i18n/` 字典 | 低 |
| 全文搜索 | Layout 留 `<SearchTrigger />` 插槽位 | 中（接入 Pagefind） |
| RSS | `pages/rss.xml.ts` 路由占位 | 低 |
| Sitemap | `@astrojs/sitemap` 直接装 | 低 |
| OG Image 自动生成 | `pages/og/[...slug].png.ts` 结构预留 | 中 |
| 评论 | 文章 Layout 留 `<Comments />` 插槽 | 低（giscus） |
| Vercel Analytics | 环境变量驱动 | 低 |
| Vercel MCP | 文档登记 | 中（按需接入） |
| 暗色模式细化（如自定义主题） | tokens 已分组 | 低 |

---

## 9. 性能预算

| 指标 | 目标 |
|---|---|
| 首页 JS（gzip） | < 30 KB |
| 首页 CSS（gzip） | < 20 KB |
| LCP | < 1.5s（4G 模拟） |
| CLS | < 0.05 |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |

突破预算前必须在 RFC 中论证。

---

## 10. 安全与隐私

- 严格遵守 `AGENTS.md` §1。
- 所有外链 `target="_blank"` 必须配 `rel="noopener noreferrer"`（封装到 `primitives/Link`）。
- 不在前端写入任何 API 密钥；任何需要密钥的功能走 Vercel 环境变量 + Server Endpoint。

---

_本文档随项目演进持续更新。当前阶段：地基阶段（v0.1）。_
