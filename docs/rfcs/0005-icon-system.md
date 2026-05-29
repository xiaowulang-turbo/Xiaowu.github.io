# RFC-0005: Icon System（统一图标系统）

| Field | Value |
|---|---|
| Status | **Implemented** |
| Author | Xiaowu (with AI assistance: Cursor) |
| Created | 2026-05-29 |
| Last Updated | 2026-05-29 |
| Related Docs | `AGENTS.md` §3.5 · `STYLE_GUIDE.md` §9 / §8.3 · `COMPONENT_PATTERNS.md` §2.4 · `ARCHITECTURE.md` §2 · `RFC-0003` |
| Related Issues / PRs | — |

---

## 1. Background（背景）

文档早已把 **Lucide** 钉为唯一图标库（`ARCHITECTURE.md` §2、`STYLE_GUIDE.md` §9、`COMPONENT_PATTERNS.md` §2.4 的 `<Icon>` 原子组件），但**实现层从未落地**：

- `src/components/primitives/` 为空 —— `<Icon>` 组件不存在。
- `package.json` 无任何 Lucide / 图标依赖。
- 现状形成两种「违规图标」：
  1. **HTML 实体 / Unicode 当图标**（本 RFC 主要清理对象）。
  2. **手抄 Lucide 路径内联 SVG**（`ThemeToggle.astro` 把 monitor/sun/moon 的 path 自己贴了一份）。

`RFC-0003` §4.5 当初甚至把「链接用 `↗` 文本箭头、不引图标库」作为风格自检**通过**项 —— 这是一次有意识的从简取舍。本 RFC **推翻该决策**：实体字符当图标在可访问性（屏幕阅读器朗读、字体回退渲染不一）、视觉一致性（粗细/基线/字重随系统字体漂移）、可维护性上均劣于矢量图标，已由用户明确定为红线（`AGENTS.md` §3.5 / `STYLE_GUIDE.md` §9）。

> 规则（红线）已先行写入文档；本 RFC 负责**让红线可落地**：提供统一来源 + 迁移存量。

### 现存违规清单（迁移目标）

| 文件 | 行 | 现状 | 目标 Lucide 图标 |
|---|---|---|---|
| `sections/ProjectDetailHeader.astro` | 24 | `←` 返回箭头 | `arrow-left` |
| `sections/ProjectDetailHeader.astro` | 56, 62 | `↗` 外链 | `arrow-up-right` |
| `sections/ProjectsArchive.astro` | 38 | `↗` 外链 | `arrow-up-right` |
| `sections/ProjectsSelected.astro` | 59, 65 | `↗` 外链 | `arrow-up-right` |
| `sections/AboutWantMore.astro` | 28 | `→` 列表箭头 | `arrow-right` |
| `sections/AboutHero.astro` | 67 | `↓` 滚动提示 | `chevron-down` |
| `pages/404.astro` | 13 | `←` 返回链接 | `arrow-left` |
| `pages/index.astro` | 30 | `→` ROADMAP 外链箭头 | `arrow-up-right` |
| `ui/ThemeToggle.astro` | 18–69 | 手抄内联 SVG（monitor/sun/moon） | `monitor` / `sun` / `moon`（改用统一来源） |

> 不在清单内：注释 / 正文中的 `→`（如组件文件头注释）属文档说明、`·` 分隔点属排印标点 —— 按 `STYLE_GUIDE.md` §9 例外条款保留。

---

## 2. Goals（目标）

1. 提供**唯一**的图标渲染路径：`<Icon>` 原子组件，所有图标只能经此渲染。
2. 接入统一图标来源 **Lucide**，构建期内联 SVG、按需 tree-shake、**零运行时 JS**（不破坏 §9 性能预算）。
3. 把上表 8 个文件的实体 / 手抄 SVG **全部迁移**到 `<Icon>`。
4. 让 `STYLE_GUIDE.md` §9 / §8.3、`AGENTS.md` §3.5 的红线**有可执行的落地物**。

---

## 3. Non-Goals（非目标）

- ❌ 不做图标主题化 / 多色图标（图标只用 `currentColor`，遵循单一强调色与 token）。
- ❌ 不引入除 Lucide 外的第二套图标集（违反「统一来源」）。
- ❌ 不为图标加动效（除既有 `back-arrow` 的 ≤300ms 位移微交互，沿用 §5）。
- ❌ 不封装 `<Button iconLeft>` 等更上层 API（本期只交付 `<Icon>` 与迁移；上层留待组件落地时）。
- ❌ 不改任何文案 / i18n key。

---

## 4. Proposal（方案）

### 4.1 总体设计

```
src/components/primitives/Icon.astro     ← 新增，唯一图标入口
        │  基于 astro-icon 的 <Icon />
        ▼
@iconify-json/lucide （构建期图标数据，仅 devDependency）
        │  astro-icon 在构建期内联为 <svg>，无运行时 JS
        ▼
页面 / section 使用 <Icon name="arrow-left" /> …
```

- 统一描边 1.5、默认 `currentColor`、默认尺寸经 prop（16/20/24）。
- 组件对外 props 与 `COMPONENT_PATTERNS.md` §2.4 一致：`name` | `size?` | `strokeWidth?`（默认 1.5）。

### 4.2 关键决策

| 决策点 | 选项 | 选择 | 理由 |
|---|---|---|---|
| 集成方式 | astro-icon+@iconify-json/lucide / lucide-astro 官方包 / 自建本地 sprite | **astro-icon + @iconify-json/lucide** | Astro 生态主流，构建期内联、按需打包、零运行时；图标集作为 devDependency 不进运行时 |
| 运行时成本 | 允许少量 JS / 零 JS | **零运行时 JS** | 守 `ARCHITECTURE.md` §9 性能预算与「默认零 JS」 |
| 图标尺寸 API | className / size prop | **size prop（16/20/24）** | 与 §9 与 COMPONENT_PATTERNS §2.4 约定一致 |
| 颜色 | 固定色 / currentColor | **currentColor** | 自动适配深浅模式与 token，不硬编码颜色（§1 红线） |
| ThemeToggle | 保留手抄 SVG / 一并迁移 | **一并迁移** | 手抄内联 SVG 同样违反「统一来源」（§9 新红线） |

### 4.3 实施步骤

1. `pnpm add -D astro-icon @iconify-json/lucide`（均为 devDependency）。
2. `astro.config.ts`：注册 `astro-icon` integration。
3. `pnpm-workspace.yaml`：如新依赖触发构建脚本，按 `ARCHITECTURE.md` §7.1 在 `allowBuilds` 追加（实测确认后再加，避免多余条目）。
4. 新增 `src/components/primitives/Icon.astro`：封装 astro-icon 的 `<Icon>`，统一 `strokeWidth=1.5`、`size`、`aria-hidden` 默认与 `aria-label` 透传。
5. 迁移上表 8 个文件：实体 / 手抄 SVG → `<Icon name=… />`，保留既有 class 与 `aria-hidden`/位移微交互。
6. `ThemeToggle.astro`：三个手抄 SVG → `<Icon name="monitor|sun|moon" />`，保留 `[data-theme-state]` 显隐逻辑与脚本。
7. 回填 `COMPONENT_PATTERNS.md` §2.4 的 markup 片段（骨架升级为实例）。
8. 校验：`biome check` + `biome lint` + `astro check` + `astro build`，确认 0 错误、页面数不变、无运行时 JS 新增。
9. 本 RFC 末尾标注 `Implemented` 与 commit。

### 4.4 影响范围

- 文件（新增）：`src/components/primitives/Icon.astro`
- 文件（修改）：`ProjectDetailHeader.astro` · `ProjectsArchive.astro` · `ProjectsSelected.astro` · `AboutWantMore.astro` · `AboutHero.astro` · `pages/404.astro` · `ui/ThemeToggle.astro` · `astro.config.ts` · `package.json` · 可能 `pnpm-workspace.yaml`
- 文档：本 RFC · `COMPONENT_PATTERNS.md`（回填 markup）
- 依赖：**新增 devDependency** `astro-icon` + `@iconify-json/lucide`（构建期，零运行时）

### 4.5 视觉与风格自检

| 红线 | 遵守 |
|---|---|
| §1 禁硬编码颜色 | ✅ 图标用 `currentColor`，无颜色值 |
| §5 动效 ≤ 300ms | ✅ 仅沿用既有 back-arrow 位移微交互，图标本身无新动效 |
| §9 统一图标来源 / 禁实体 | ✅ 本 RFC 即为落地物；清零全部实体与手抄 SVG |
| §9 描边 1.5 / 尺寸 16·20·24 | ✅ `<Icon>` 默认 strokeWidth 1.5、size prop |
| §12 禁第三方 CSS 全量引入 | ✅ 图标集为构建期数据，按需内联，不引入第三方 CSS |
| §6 可访问性 | ✅ 装饰图标 `aria-hidden`，语义图标透传 `aria-label` |

### 4.6 隐私自检（AGENTS.md §1）

- 纯前端图标渲染，不涉及任何敏感字段、署名仍仅 `Xiaowu` / `Kirito`，不引入元数据通道变更。

---

## 5. Alternatives（备选方案）

- **lucide-astro 官方包**：否决 —— 直接 import 组件可用，但 astro-icon + iconify 生态更通用、图标集统一管理、未来若需补充少量非 Lucide 系统图标（如品牌 logo）扩展成本更低。
- **自建本地 SVG sprite + Icon 组件**：否决 —— 零依赖但需手动维护图标集、手动同步描边/viewBox，违反「优雅 > 方便」且易再次产生「手抄 SVG」漂移。
- **保留实体字符、仅约束写法**：否决 —— 即为本 RFC 推翻的现状，已被用户定为红线。

---

## 6. Risks & Mitigations（风险与缓解）

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 新依赖触发 pnpm 构建脚本，Vercel 部署卡住 | 中 | 中 | 按 `ARCHITECTURE.md` §7.1，本地 `--frozen-lockfile` 验证后在 `allowBuilds` 追加 |
| astro-icon 增加构建期开销 | 低 | 低 | 仅构建期内联，零运行时；图标数量少 |
| 迁移遗漏某处实体 | 低 | 中 | 迁移后全仓 `rg` 复扫实体字符确认归零 |
| ThemeToggle 迁移破坏三态显隐 | 低 | 中 | 保留 `[data-theme-state]` class 与脚本，仅替换 SVG 来源 |

---

## 7. Rollback Plan（回滚方案）

- 每步独立可 `git revert`。
- 回滚 = 移除 `astro-icon` integration + 依赖 + `Icon.astro`，迁移过的文件 revert 回实体写法即恢复 v0.5 行为。
- 无内容 / schema 变更，无数据迁移成本。

---

## 8. Open Questions（已确认）

- [x] 外链图标 → **`arrow-up-right`**。理由：2026 年现代极简站（Linear / Vercel 风）的行业标准外链指示，比 `external-link`（方框+箭头）更干净、更具方向感；且与现状 `↗` 形态一致，迁移零视觉断层。
- [x] `AboutHero` 滚动提示 → **`chevron-down`**（不沿用 `↓` 箭头）。理由：UI 惯例「caret 表展开 / chevron 表方向引导 / arrow 暗示跳转到另一页」，滚动提示属「引导向下看更多」正是 chevron 职责；chevron 视觉更轻、更克制，贴合「留白 × 克制」。**用静态 chevron，禁弹跳动画**（守 STYLE_GUIDE §5.2）。

---

## 9. Approval（确认）

- [x] 用户已确认本 RFC（2026-05-29，含 §8 两项图标选型经研究后确认）
- [x] 已检查与 `AGENTS.md` 红线一致（§4.6 隐私自查 / §3.5 图标红线）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.5 风格自查）

## 10. Implementation Notes（实施记录）

- 2026-05-29：按本 RFC 实现。新增 `src/components/primitives/Icon.astro`（封装 astro-icon，注入 `--icon-sw` 控制描边）；`astro.config.ts` 注册 `icon()`；devDependency 新增 `astro-icon` + `@iconify-json/lucide`。
- 迁移 **9 处**（较 §1 表多 1 处）：实现时发现 `pages/index.astro:30` 的 `→` 实为 ROADMAP 外链方向箭头（非占位文案），归入红线一并迁移为 `arrow-up-right`，已更新 §1 清单。
- **描边修正**：Lucide 经 iconify 把 `stroke-width="2"` 烤进内层 `<g>/<path>`，根 `<svg>` 设置无效。改用全局规则 `[data-icon] [stroke-width] { stroke-width: var(--icon-sw, 1.5) }`（`globals.css`）+ `<Icon>` 注入 `--icon-sw`，使描边真正统一为 §9 的 1.5。
- **对齐**：图标与文本同排的父容器由 `align-items: baseline` 改为 `center`（svg 无文本基线）；涉及 `ProjectDetailHeader`/`ProjectsSelected`/`ProjectsArchive`/`AboutWantMore`/`404`/`index`。
- **RFC 编号**：0004 由并行的「AI 章节」工作占用（`0004-ai-section.md`），本 RFC 编号为 **0005**；并行的「信条墙」工作见 `0006-thoughts-section.md`。
- 验证：`astro check` 0 错误；`biome lint` 0 问题；`biome check` 对本次改动文件（`astro.config.ts`/`globals.css`/`package.json`）通过；`astro build` 9 页成功，客户端 JS 维持 2.25 kB（gzip 1.02 kB），**图标零运行时**（构建期内联 `<symbol>`+`<use>`）。
- 全仓复扫 `[←→↑↓↗↘↖↙]`：渲染层已归零，仅余代码注释中的说明性 `→`（§9 例外）。
- 已知无关项：`src/data/thoughts.ts`（并行「信条墙」工作的未跟踪文件）存在 CRLF 行尾，导致仓库级 `biome check` 报错；不属本 RFC 范围，未改动。
