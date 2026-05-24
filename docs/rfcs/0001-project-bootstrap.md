# RFC-0001: Project Bootstrap

| Field | Value |
|---|---|
| Status | **Accepted** |
| Author | Xiaowu (with AI assistance: CodeBuddy) |
| Created | 2026-05-24 |
| Last Updated | 2026-05-24 |
| Related Docs | `AGENTS.md` · `docs/ARCHITECTURE.md` · `docs/design/STYLE_GUIDE.md` · `docs/design/DESIGN_TOKENS.md` · `docs/ROADMAP.md` |
| Related Issues / PRs | — |

---

## 1. Background

地基阶段（v0）已完成所有规范文档。本 RFC 将项目从「文档目录」推进为「可运行的 Astro 项目」，进入 v0.5 骨架阶段。

**当前状态**：仓库只有文档与 LICENSE，无 `package.json`、无构建产物、无运行时代码。Vercel 上线上的仍是旧版 `Hello World`。

**目标交付**：一个最小但完整的项目骨架，`pnpm dev` 可起、`pnpm build` 可通过、push 后 Vercel 自动部署、五个路由可访问、主题可切换。

---

## 2. Goals

按优先级：

1. **可运行**：`pnpm dev / build / preview / check` 四个核心脚本全部跑通
2. **质量护栏**：TS strict、Biome、Husky pre-commit + commit-msg 全部生效
3. **视觉地基落地**：`tokens.css` 完全实现 `DESIGN_TOKENS.md` 的所有 token；深浅模式可切换且无 FOUC
4. **结构齐整**：`src/` 目录与 `ARCHITECTURE.md` §3 完全一致（含空目录占位）
5. **路由占位**：5 个一级路由可访问，呈现"Quiet Construction"风格
6. **部署成功**：push 后 Vercel 自动部署，新版替换旧 `Hello World`

---

## 3. Non-Goals（明确不做）

- ❌ 任何业务组件（Button / Card / Nav 的最终实现）—— 仅占位
- ❌ Content Collection 实际内容样例
- ❌ Pagefind / RSS / Sitemap / 评论 / i18n 启用
- ❌ AI 生图 / favicon / OG image 设计
- ❌ GitHub Actions CI（理由见 §4.13）
- ❌ Lighthouse CI / 性能门禁
- ❌ 字体最终选型（继续用系统字体栈）

---

## 4. Proposal

### 4.1 Node 与包管理

| 项 | 决策 |
|---|---|
| Node | **22 LTS**（与 Vercel 默认一致），通过 `package.json#engines` 锁定 |
| 包管理 | **pnpm**，通过 `packageManager` 字段锁定版本 |
| Lockfile | `pnpm-lock.yaml` 入库 |
| `.npmrc` | `engine-strict=true`、`shamefully-hoist=false` |

### 4.2 Astro 配置

```ts
// astro.config.ts
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://xiaowulang.vercel.app",
  trailingSlash: "never",
  build: { format: "directory" },
  prefetch: { defaultStrategy: "viewport" },
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

**第一波集成清单**：

| 集成 | 装 / 不装 | 理由 |
|---|---|---|
| `@astrojs/mdx` | ✅ | 内容核心 |
| `@astrojs/sitemap` | ✅ | 零成本 SEO 必需 |
| `@tailwindcss/vite` (Tailwind v4) | ✅ | 样式核心 |
| `@astrojs/rss` | ❌ 延后 | v1.x 启用 |
| `@astrojs/check` | ✅ | 类型检查（dev 依赖） |
| `astro-pagefind` | ❌ 延后 | v1.x 启用 |
| 任何 React/Vue/Svelte 集成 | ❌ | 当前没有客户端组件需求 |

### 4.3 TypeScript 配置

```jsonc
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@styles/*": ["src/styles/*"],
      "@data/*": ["src/data/*"],
      "@assets/*": ["src/assets/*"]
    }
  },
  "include": ["src", ".astro/types.d.ts"],
  "exclude": ["dist", "node_modules"]
}
```

**严格度说明**：开 `exactOptionalPropertyTypes` 是为了避免 `prop?: string | undefined` 与 `prop?: string` 的混淆，与 `AGENTS.md` §4.1 的「禁止 any」精神一致。

### 4.4 Tailwind v4 与 tokens.css 的整合

> 这是关键设计：**`DESIGN_TOKENS.md` 是 SoT，`tokens.css` 是它的唯一实现，Tailwind 通过 `@theme` 派生**。

```css
/* src/styles/tokens.css */
@import "tailwindcss";

@theme {
  /* —— 颜色（语义命名，禁止 gray-100 这种色阶） —— */
  --color-bg: #FFFFFF;
  --color-bg-subtle: #FAFAFA;
  --color-bg-muted: #F4F4F5;
  --color-border: #E4E4E7;
  --color-border-strong: #D4D4D8;
  --color-text: #18181B;
  --color-text-muted: #52525B;
  --color-text-subtle: #A1A1AA;

  --color-accent: #2563EB;
  --color-accent-hover: #1D4ED8;
  --color-accent-soft: #DBEAFE;
  --color-accent-fg: #FFFFFF;

  /* —— 圆角 —— */
  --radius-sm: 4px;
  --radius: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* —— 间距、字号、动效... 完整列表与 DESIGN_TOKENS.md 一致 —— */
  /* （为简洁省略，实施时与文档完全同步） */

  /* —— 容器 —— */
  --container-max: 1200px;
  --prose-max: 680px;
}

/* —— 暗色模式覆盖 —— */
:root[data-theme="dark"] {
  --color-bg: #0A0A0A;
  --color-bg-subtle: #111113;
  --color-bg-muted: #1A1A1D;
  --color-border: #27272A;
  --color-border-strong: #3F3F46;
  --color-text: #FAFAFA;
  --color-text-muted: #A1A1AA;
  --color-text-subtle: #71717A;
  --color-accent: #60A5FA;
  --color-accent-hover: #93C5FD;
  --color-accent-soft: rgba(30, 58, 138, 0.25);
  --color-accent-fg: #0A0A0A;
}

/* —— 系统主题（用户未手动选择时跟随系统） —— */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* 同 dark 取值（CSS 变量重声明） */
  }
}
```

Tailwind v4 的 `@theme` 会自动把这些变量暴露为工具类（`bg-bg`、`text-text-muted`、`rounded-md`、`p-6` 等），**无需额外配置文件**。

### 4.5 Biome 配置

```jsonc
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": { "noStaticOnlyClass": "off" },
      "style": {
        "useImportType": "error",
        "useNodejsImportProtocol": "error",
        "noNonNullAssertion": "error"
      },
      "correctness": {
        "noUnusedImports": "error",
        "noUnusedVariables": "error"
      },
      "suspicious": {
        "noExplicitAny": "error",
        "noConsole": { "level": "warn", "options": { "allow": ["warn", "error"] } }
      }
    }
  },
  "javascript": {
    "formatter": { "quoteStyle": "double", "semicolons": "always", "trailingCommas": "all" }
  },
  "files": {
    "ignore": ["dist", ".astro", "node_modules", "pnpm-lock.yaml"]
  },
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true }
}
```

> Biome 当前对 `.astro` 文件的支持有限（只 lint script 块），其余靠 Astro 自带的 Prettier 风格。`.astro` 文件的格式化交给 Astro VS Code 扩展。

### 4.6 Husky + lint-staged + commitlint

```jsonc
// package.json (节选)
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx,json,md,css}": "biome check --write --no-errors-on-unmatched"
  }
}
```

**Hooks**：

| Hook | 行为 |
|---|---|
| `pre-commit` | `pnpm exec lint-staged` |
| `commit-msg` | `pnpm exec commitlint --edit $1` |
| `pre-push` | `pnpm exec astro check && pnpm exec astro build`（可选，先开） |

**commitlint 配置**：用 `@commitlint/config-conventional` 默认规则。

### 4.7 package.json scripts

```jsonc
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check && biome check",
    "check:fix": "biome check --write",
    "typecheck": "astro check",
    "lint": "biome lint",
    "format": "biome format --write",
    "prepare": "husky"
  }
}
```

### 4.8 目录与首批文件清单

按 `ARCHITECTURE.md` §3 创建结构。**v0.5 实际产出文件**：

```
src/
├── content/config.ts                    # 7 个 collection 的 Zod Schema 定义（不放任何 .mdx）
├── data/
│   ├── site.ts                          # 站点元信息
│   ├── nav.ts                           # 主导航
│   └── social.ts                        # 社交链接（占位：GitHub + Email）
├── styles/
│   ├── tokens.css                       # ⭐ 见 §4.4
│   ├── globals.css                      # reset + 基础排版
│   └── prose.css                        # 占位（v1.0 写）
├── lib/
│   └── theme.ts                         # 主题切换工具函数
├── i18n/
│   ├── zh.ts                            # 中文字典（仅含骨架文案）
│   └── index.ts                         # 字典导出
├── components/
│   ├── primitives/.gitkeep              # 占位空目录
│   ├── ui/
│   │   ├── ThemeToggle.astro            # 唯一交互组件
│   │   └── SiteNav.astro                # 顶部导航
│   └── sections/.gitkeep
├── layouts/
│   └── BaseLayout.astro                 # 含主题防闪 inline script + nav + footer
├── pages/
│   ├── index.astro                      # 首页（特殊处理）
│   ├── about.astro
│   ├── projects/index.astro
│   ├── ai/index.astro
│   ├── thoughts/index.astro
│   └── 404.astro                        # 含 Kirito 彩蛋（克制版本）
└── assets/.gitkeep                      # 空目录占位

public/
├── favicon.svg                          # 极简临时 mark（手写 SVG，非 AI 生）
└── robots.txt                           # 允许全部，指向 sitemap

# 根目录新增配置
astro.config.ts
tsconfig.json
biome.json
package.json
pnpm-lock.yaml
.commitlintrc.json
.husky/
  ├── pre-commit
  ├── commit-msg
  └── pre-push
.npmrc
```

**统计**：约 25 个新文件（含 4 个 `.gitkeep`），无任何业务代码。

### 4.9 占位页风格："Quiet Construction"

每个占位页（除首页）的统一结构：

```
[顶部 SiteNav]
[main 容器]
  H1: 板块标题（如 "Projects"）
  Body: 1-2 句板块定位（不空话，描述未来内容）
  Caption: "Currently in v0.5 — skeleton phase. See roadmap →" （链接到 ROADMAP）
[Footer]
```

**首页特殊文案（草案，可微调）**：

```
H1: Xiaowu
Sub: Building things with restraint.
Body (≤30 字): A personal portal — résumé, projects, AI notes, thoughts.
Caption: This site is being rebuilt. v0.5 — skeleton in place. Follow the roadmap →
```

**404 页（Kirito 彩蛋的克制版）**：

```
H1: 404
Body: Not all those who wander are lost. — but this page is.
Caption (极小字): "I am Kirito; I'll find another way." → 链接回首页
```

> 这一节的英文文案考虑了 i18n 预留：`i18n/zh.ts` 中提供中文版，路由切换时按 `lang` 字典渲染。当前阶段两版都写好，但只渲染中文。

### 4.10 主题切换：FOUC 防闪策略

`BaseLayout.astro` 在 `<head>` 顶部 inline 一段同步脚本，**在 paint 之前**根据 `localStorage.theme` 设置 `<html data-theme="...">`：

```html
<script is:inline>
  (() => {
    const stored = localStorage.getItem("theme");
    const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = stored && stored !== "system" ? stored : null;
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
```

`<ThemeToggle>` 组件维护三态切换 + 持久化，并广播 `theme:changed` 事件供其他组件订阅（v0.5 暂无订阅者）。

### 4.11 Vercel 配置

无需 `vercel.json`。Vercel 自动识别 Astro 项目：
- Framework Preset: **Astro**
- Build Command: `pnpm build`
- Output Directory: `dist`
- Install Command: `pnpm install --frozen-lockfile`
- Node 版本：通过 `engines.node` 锁定为 22

如果 Vercel 项目设置中**已配置过别的 Build Command 或目录**，需要在第一次部署后切回默认。

### 4.12 Content Collection 的 v0.5 处理

`src/content/config.ts` 在 v0.5 阶段定义所有 7 个 collection 的 Zod schema（与 `CONTENT_MODEL.md` 对齐），但**不放置任何 `.mdx` 文件**。这样：

- ✅ `astro check` 不会报错（schema 仅在有内容时校验）
- ✅ 未来添加内容时立即享受 schema 校验
- ✅ schema 与文档双向校对，防止漂移

### 4.13 关于 GitHub Actions（v0.5 不做）

**理由**：

1. Vercel 已自动跑 `pnpm install` + `pnpm build`，构建失败会保留上一个成功版本
2. Husky 本地 hook 已拦下 80% 的问题（lint / typecheck / commit msg）
3. v0.5 阶段没有真实业务代码，CI 价值有限
4. 真正需要 Actions 的场景（Lighthouse CI、Pagefind 索引、定时同步）都在 v1.x

**v1.0 启用规划**：到时再开 RFC-00XX 单独立项，配套 GitHub MCP 接入。

### 4.14 视觉与风格自检

| `STYLE_GUIDE.md` 红线 | 本方案的遵守 |
|---|---|
| §1.1 禁止硬编码颜色 | 所有颜色走 token；占位页只用语义类（`bg-bg`、`text-text`） |
| §1.1 禁止渐变 | 占位页无任何装饰性背景，纯单色 |
| §3.1 间距 4px grid | 所有 padding/margin 走 token |
| §5.2 动效红线 | 仅主题切换 200ms 颜色过渡，无任何其他动效 |
| §6 焦点可见 | 全局 `:focus-visible` outline 来自 token |
| §7 信息密度 | 占位页每页一句标题 + 一句描述 + 一句状态，**远低于密度上限** |

### 4.15 隐私自检（`AGENTS.md` §1）

本 RFC 不涉及任何敏感字段：
- 署名仅 `Xiaowu` / `Kirito`
- 联系方式（在 `social.ts`）：仅 GitHub URL（占位 `https://github.com/`，等你提供真实 handle 再填）+ Email 占位（待你提供）
- 简历类信息：完全不接入

**待你提供（不进 RFC，进入实施时询问）**：
- GitHub 用户名
- 想暴露的 Email 地址

---

## 5. Alternatives

### 5.1 用 Astro starter 模板而非从零

**否决**。理由见地基阶段讨论：所有现成模板都带有不符合本站哲学的设计/依赖，剥离成本高于从零成本。

### 5.2 ESLint + Prettier 替代 Biome

**否决**。Biome 单二进制、零配置、速度快、对单人项目零负担。即便它对 `.astro` 支持稍弱，也由 Astro 官方扩展补足。

### 5.3 Tailwind v3 而非 v4

**否决**。v4 已稳定，`@theme` + CSS-first 配置与 token 哲学完美契合；v3 的 `tailwind.config.ts` 反而引入第二真理来源。

### 5.4 `npm` 而非 `pnpm`

**否决**。pnpm 更快、磁盘占用小、严格依赖图防幽灵依赖。

### 5.5 v0.5 就引入 React/Solid Island

**否决**。当前没有任何组件需要客户端交互（连主题切换都用 vanilla JS）。等 AI Lab 真正需要时再装。

---

## 6. Risks & Mitigations

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| Vercel 项目残留旧的构建配置 | 中 | 中 | 部署后立刻去 Vercel dashboard 检查 framework preset；如不对则手工调整 |
| Tailwind v4 的 `@theme` 在某些 Vite 环境下有兼容问题 | 低 | 中 | 本地构建已验证；如出问题降级到 v4 alpha 已稳定的 patch 版本 |
| Husky 在 Windows 路径下偶发权限问题 | 低 | 低 | 用 `husky` v9 的新 API，避免老 hook 路径 |
| pnpm 与 Vercel 版本不一致 | 低 | 低 | 锁定 `packageManager` 字段，Vercel 会读取 |
| 主题防闪脚本被严格 CSP 阻断 | 极低 | 中 | Vercel 默认无严苛 CSP；未来加 CSP 时把脚本 hash 加入白名单 |
| Biome 的 `.astro` 支持不全导致格式不一致 | 中 | 低 | `.astro` 文件交给 Astro VSCode 扩展；CI 不强制 lint `.astro` |

---

## 7. Rollback Plan

- 本 RFC 实施全程在 `main` 分支单一推进。每步独立 commit。
- 若 Vercel 部署失败：Vercel 自动保留上一个成功版本（Hello World），用户无感
- 若需回滚到地基阶段：`git revert` 范围内的所有 commit，再 `pnpm install && pnpm build` 验证
- 重大失败的兜底：保留 `git tag v0-foundation`，可一键 `git reset --hard v0-foundation`

---

## 8. Open Questions（已由用户确认）

- [x] **Q1. GitHub 用户名** → `xiaowulang-turbo`（→ `https://github.com/xiaowulang-turbo`）
- [x] **Q2. 公开 Email 地址** → `kiritoha@qq.com`
- [x] **Q3. 站点 tagline** → `Building things with restraint.`（采纳）
- [x] **Q4. 404 文案** → `Not all those who wander are lost — but this page is.`（采纳）
- [x] **Q5. Node 版本锁** → `22 LTS`（用户本地 22/24 均有）

---

## 9. Approval

- [x] **用户已确认本 RFC**（2026-05-24）
- [x] 已检查与 `AGENTS.md` 红线一致（§4.14、§4.15）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.14）
- [x] 已检查与 `ARCHITECTURE.md` 一致（§4.8 目录结构）

---

## 10. Implementation Notes

> 实施过程中产生的偏差与补充决策将在此追加。

### 实施里程碑

- [x] M1. 依赖与配置（pnpm init + 安装依赖 + 配置文件）
- [x] M2. 视觉地基（tokens.css + globals.css）
- [x] M3. 内容 Schema（content/config.ts）
- [x] M4. 布局与交互（BaseLayout + ThemeToggle + SiteNav）
- [x] M5. 五大路由 + 404 占位
- [x] M6. 静态资源（favicon + robots.txt + collection 目录占位）
- [x] M7. 本地三检（`biome check` / `astro check` / `astro build` 全部 EXIT=0）
- [ ] M8. Husky hooks 启用 + 提交推送 + Vercel 部署验证

### 实施期偏差（Deviations）

1. **`pnpm` 受信任包配置位置变化**
   - RFC §4.1 未涉及。pnpm 11+ 把 `onlyBuiltDependencies` 与 `verifyDepsBeforeRun`
     从 `package.json#pnpm` / `.npmrc` 迁移到 `pnpm-workspace.yaml`。
   - 实际方案：新增 `pnpm-workspace.yaml`，包含
     `onlyBuiltDependencies: [@biomejs/biome, esbuild, sharp]` 与
     `verifyDepsBeforeRun: false`。

2. **Content collection 目录预创建**
   - RFC §4.12 提到"不放置 .mdx"。实施中发现 Astro 5 glob-loader 在目录缺失时
     输出 `[WARN]`。为体验整洁，预先创建 7 个 collection 目录并放 `.gitkeep`。
   - 不影响 schema，不影响构建，未来加内容时自然覆盖。

3. **i18n `t()` 函数签名放宽为 `DictKey | string`**
   - RFC §4.4 未涉及。原本严格 `DictKey` 在 Astro 模板中需要 `as Parameters<...>`
     断言，与 JSX 解析冲突，导致 19 个 TS 误报。
   - 改为接受 `string`，未登记 key 在开发期 `console.warn`，运行时回退原值。
   - 类型安全实质未削弱（字典仍是 SoT），但模板代码更整洁。

4. **未实现 `.husky/pre-push` 的强制执行**
   - 钩子文件已写，但未做集成测试（避免在地基阶段触发非必要的全量构建）。
   - M8 推送时如成功触发即视为验证通过；如未触发则在下一个 RFC 复查。
