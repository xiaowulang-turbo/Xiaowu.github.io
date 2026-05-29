# RFC-0007: Hero & PageHead Unification

| Field | Value |
|---|---|
| Status | **Implemented** |
| Author | Xiaowu (with AI assistance: CodeBuddy) |
| Created | 2026-05-29 |
| Last Updated | 2026-05-29 |
| Related Docs | `AGENTS.md` · `STYLE_GUIDE.md` · `DESIGN_TOKENS.md` · `COMPONENT_PATTERNS.md` · `RFC-0002` |
| Depends On | — |
| Related Issues / PRs | — |

---

## 1. Background

五个主路由的首屏目前各写各的，存在三类不一致：

| 页面 | inner 容器 | 上 padding | H1 字号 | 文案结构 |
|---|---|---|---|---|
| `/` Home | `--hero-max` 960px | `--space-32` (128px) | `clamp(3rem, 7vw, 5rem)` 48→80 | eyebrow → 双行大字 → tagline → 段落 → CTA |
| `/about` | `--prose-max` 680px | `clamp(8rem, 18vh, 14rem)` + `min-height:100svh` | `clamp(3rem, 8vw, 6.5rem)` 48→104 | eyebrow → display → aka → lead → meta → keep-reading |
| `/projects` | `--prose-max` 680px | `--space-24` (96px) | `--text-h1` 36→48 | title → intro |
| `/ai` | `--prose-max` 680px | `--space-24` (96px) | `--text-h1` 36→48 | title → intro |
| `/thoughts` | `--prose-max` 680px | `--space-24` (96px) | `--text-h1` 36→48 | title → intro |

具体问题：

1. **垂直锚点不齐**：home 上 padding 128px、列表页 96px，切 tab 时标题约跳 32px。
2. **字号断崖**：home/about 的 hero display 是列表页 H1 的 1.7~2.2 倍；home 与 about 之间也彼此不一致。
3. **代码重复**：projects / ai / thoughts 三页头几乎逐字拷贝（`.page-head` / `.title` / `.intro` 三段 CSS 各 30+ 行），违反 §4.4 组件分层与 DRY。
4. **无语义 token**：所有尺寸都是直接引用 `--space-N`，没有"页头节奏"语义层；未来调整需改 5 处。

不做的代价：tab 切换持续给访客一种"每页都重新布过版"的轻微突兀；后续新加路由会再复制一份页头 CSS，债越滚越大。

---

## 2. Goals

按优先级：

1. **两层节奏明确**：把首屏分为 **Hero 层**（home + about）与 **PageHead 层**（projects + ai + thoughts），各自内部锚点完全一致；两层之间是有规律的两档差，而非中间灰色地带。
2. **抽出共享组件**：列表页头落入 `<PageHead title intro>` 一个组件，三处页面零样式重复。
3. **新增语义 token**：在 `tokens.css` / `DESIGN_TOKENS.md` 新增 6 个语义化变量，替换硬编码 `--space-*` 引用，未来调节奏只改一处。
4. **零内容/文案变化**：所有可见文字、链接、彩蛋、动效语义不动。
5. **保留 about 独占首屏**：`min-height:100svh` 不动（RFC-0002 §M1 叙事要求）。

---

## 3. Non-Goals

- ❌ **不**让 5 页 H1 字号一致（违反信息层级 §3.3，否决方案 C，详见 §10）
- ❌ **不**改 About Hero 的 `min-height:100svh`（RFC-0002 已确认）
- ❌ **不**改 Home Hero 的双行 display 结构与 tagline 语义
- ❌ **不**引入新依赖 / 新图标 / 新动效
- ❌ **不**改 i18n 文案 / 任何 `t("page.*.title")` 的值
- ❌ **不**重写 5 个页面的 frontmatter / SEO meta
- ❌ **不**抽 Hero 为共享组件（home 与 about 的内部结构差异远大于共性，强抽得不偿失，详见 §10.2）

---

## 4. Proposal

### 4.1 总体设计：两层节奏

```
┌────────────────────────────────────────────────────┐
│  Hero Tier      ← 站点级身份页：home, about        │
│    · 上 padding 大     (≈ 7-10rem)                 │
│    · display 字号大    (clamp(3rem, 7vw, 5rem))    │
│    · 容器宽度 hero-max (960px)                     │
│    · about 额外 100svh（独占首屏，叙事需要）        │
├────────────────────────────────────────────────────┤
│  PageHead Tier  ← 列表页头：projects, ai, thoughts │
│    · 上 padding 中     (≈ 5-6rem)                  │
│    · H1 字号常规       (--text-h1: 36→48)          │
│    · 容器宽度 prose-max (680px)                    │
│    · 通过 <PageHead> 组件统一渲染                   │
└────────────────────────────────────────────────────┘
```

切 tab 体验：home ↔ about 切换时，eyebrow 与 display 的左上角锚点稳定；projects/ai/thoughts 之间切换时锚点完全相同；跨层切换是**有规律的两档变化**，眼睛能预期。

### 4.2 关键决策

| 决策点 | 选项 | 选择 | 理由 |
|---|---|---|---|
| 5 页是否完全统一锚点 | A. 两层节奏 / B. 全部一致 / C. 维持现状仅去重 | **A** | B 违反 §3.3 信息层级；C 不解决用户感知到的"突兀感" |
| Hero 是否抽共享组件 | 抽 / 不抽 | **不抽** | home 与 about 的内部结构差异太大（aka / keep-reading / 段落数完全不同），强抽产生胶水代码 |
| PageHead 是否抽共享组件 | 抽 / 不抽 | **抽** | 三页几乎逐字拷贝，DRY 价值明显 |
| Home 是否也加 `min-height:100svh` | 加 / 不加 | **不加** | home 首屏下方还有 Featured / Latest / About 入口要露出（RFC v1.0 home 清单），独占会强迫滚动 |
| Hero 的 padding 是否同步到 about | 同步 / 不同步 | **同步公式起点** | about 的 `clamp(8rem,18vh,14rem)` 起点 8rem 与 home 的 `--space-32` (8rem) 对齐；上限保留 18vh / 14rem（独占首屏需要更多上方留白） |
| 字号公式是否统一 | A. home/about 各保留 / B. 共享 hero 字号 | **B** | 都用 `clamp(3rem, 7vw, 5rem)`；about 的 8vw/6.5rem 上限是过度强调，与 home"品牌大字"一致即可 |

### 4.3 Token 增量（写入 `tokens.css` 与 `DESIGN_TOKENS.md`）

新增 6 个语义 token，全部映射到现有 `--space-*` / 字号公式，**不引入新数值**：

```css
@theme {
  /* —— Hero 节奏（home + about 共享） —— */
  --hero-pad-top:    var(--space-32);              /* 128px 起点 */
  --hero-pad-bottom: var(--space-16);              /* 64px */
  --hero-display:    clamp(3rem, 7vw, 5rem);       /* 48 → 80 */

  /* —— PageHead 节奏（projects + ai + thoughts 共享） —— */
  --pagehead-pad-top:    var(--space-24);          /* 96px */
  --pagehead-pad-bottom: var(--space-8);           /* 32px */
  --pagehead-mb-title:   var(--space-6);           /* 24px */
}
```

注意：

- `--hero-display` 是字号公式 token，新增是因为 home 和 about 都要引用同一公式。值与 home 当前一致，**about 字号会从 6.5rem 上限降到 5rem**——这是本 RFC 唯一的可见视觉变化（详见 §6 风险）。
- `--pagehead-pad-bottom` = 32px 而非 0：列表区块自带上 padding，组合后视觉间距 ≈ 64px，与 hero 保持节奏对仗。
- 不为 about 单独建 `--hero-min-height`，直接在组件里写 `min-height:100svh`（仅一处使用，建 token 反而过度抽象）。

### 4.4 新增组件 `<PageHead>`

路径：`src/components/sections/PageHead.astro`（按 `COMPONENT_PATTERNS.md` 三层结构，列表页头属"section"层）。

API：

```astro
---
interface Props {
  title: string;       // 必填，渲染为 <h1>
  intro?: string;      // 选填，渲染为说明段落
  align?: "start";     // 预留，v1.0 仅支持 start（左对齐）
}
const { title, intro } = Astro.props;
---

<section class="page-head">
  <div class="container page-head-inner">
    <h1 class="title">{title}</h1>
    {intro && <p class="intro">{intro}</p>}
  </div>
</section>

<style>
  .page-head {
    padding-block: var(--pagehead-pad-top) var(--pagehead-pad-bottom);
  }
  .page-head-inner {
    max-width: var(--prose-max);
  }
  .title {
    margin: 0 0 var(--pagehead-mb-title);
    /* 不写 font-size：继承 globals.css 的 h1 = --text-h1，保持单一来源 */
  }
  .intro {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 1.125rem;
    line-height: var(--leading-relaxed);
  }
</style>
```

### 4.5 改动清单

| 文件 | 改动类型 | 说明 |
|---|---|---|
| `src/styles/tokens.css` | 新增 | §4.3 中 6 个 token |
| `docs/design/DESIGN_TOKENS.md` | 同步 | 新增 §4.5「页头节奏 token」节 |
| `src/components/sections/PageHead.astro` | **新增** | §4.4 |
| `src/pages/projects/index.astro` | 替换 | 删 `.page-head` 三段 CSS，改用 `<PageHead title intro />` |
| `src/pages/ai/index.astro` | 替换 | 同上 |
| `src/pages/thoughts/index.astro` | 替换 | 同上（保留 `.empty` 区，不属于页头） |
| `src/pages/index.astro` | 微调 | `.hero` padding 改用 `--hero-pad-top/-bottom`；`.display` 改用 `--hero-display` |
| `src/components/sections/AboutHero.astro` | 微调 | `.hero` padding 起点改用 `--hero-pad-top`；上限保留 `clamp(...,18vh,14rem)`；`.display` 改用 `--hero-display`（**字号上限 6.5rem → 5rem**） |
| `docs/design/COMPONENT_PATTERNS.md` | 同步 | 新增 `<PageHead>` 标准条目 |
| `docs/ROADMAP.md` | 同步 | v0.5 → v1.0 段落补一行已完成项 |

### 4.6 实施步骤

按依赖顺序：

1. **Step 1 — Tokens 落地**：更新 `tokens.css` + `DESIGN_TOKENS.md`，本地 `astro check` + `pnpm build` 通过。
2. **Step 2 — 新增 `<PageHead>`**：写组件 + 在 `COMPONENT_PATTERNS.md` 登记。
3. **Step 3 — 替换三个列表页**：projects / ai / thoughts 改用 `<PageHead>`，删原 CSS。视觉走查（Chrome 三档视口：375 / 768 / 1280）。
4. **Step 4 — Home / About Hero 微调**：替换为新 token，验证 about 上限字号变化（6.5rem→5rem）的实际观感。
5. **Step 5 — 走查与提交**：
   - 五页首屏切换录屏（dev 模式手动切 tab，肉眼对比锚点稳定性）
   - `astro check && biome check && astro build` 三检
   - 单 commit：`refactor(layout): unify hero & pagehead rhythm per RFC-0007`

### 4.7 视觉与风格自检

对照 `STYLE_GUIDE.md`：

| 红线 | 本方案 |
|---|---|
| §1 禁渐变 / 霓虹 / 玻璃 | ✅ 不引入装饰 |
| §1 禁硬编码颜色 | ✅ 全 token |
| §1 唯一强调色 | ✅ 不引入新强调 |
| §3 4px 间距栅格 | ✅ 新 token 全部映射到 `--space-*` |
| §5 动效 ≤ 300ms | ✅ 不动动效 |
| §7 信息密度 | ✅ 仅减少视觉噪声，未增字段 |
| §9 图标 | ✅ 不动 |

对照 §2.4 取舍原则：

- **长期 > 短期**：抽组件 + token 让未来新页头零成本一致；现在多花一小时换长期债务清零。
- **少 > 多**：不引入新视觉、不增字段、不抽 Hero 组件（避免胶水）；只做"该统一的统一、该分层的分层"。
- **优雅 > 方便**：方案 C（5 页强行同字号）"切 tab 完全不动"更"方便用户眼睛"，但牺牲信息层级，否决。
- **一致 > 新鲜**：完全使用现有数值与公式，不发明任何新数。

### 4.8 隐私自检（按 AGENTS.md §1）

不涉及任何用户数据 / 文案 / 元数据变更。Pass。

---

## 5. Component Diff（before / after）

**Before**（projects/index.astro，节选 30 行）：

```astro
<section class="page-head">
  <div class="container page-head-inner">
    <h1 class="title">{t("page.projects.title")}</h1>
    <p class="intro">{t("page.projects.intro")}</p>
  </div>
</section>

<style>
  .page-head { padding-block: var(--space-24) var(--space-8); }
  .page-head-inner { max-width: var(--prose-max); }
  .title { margin: 0 0 var(--space-6); }
  .intro {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 1.125rem;
    line-height: var(--leading-relaxed);
  }
</style>
```

**After**（projects/index.astro）：

```astro
import PageHead from "@components/sections/PageHead.astro";

<PageHead
  title={t("page.projects.title")}
  intro={t("page.projects.intro")}
/>
```

3 页累计 -90 行 CSS / -3 个重复 inline `<section>`。

---

## 6. Risks & Mitigations

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| About Hero 字号上限从 6.5rem 降到 5rem，"纪念碑感"减弱 | 高 | 中 | Step 4 实施时实拍对比；若用户觉得弱了，第二选择是把 `--hero-display` 公式上限提到 `5.5rem`，home 一并跟随（保持两页一致）。**不**给 about 单独保留 6.5rem。 |
| Home 与 about 字号统一后，访客从 home 跳到 about 时"识别度变弱" | 中 | 低 | 实际差异在 eyebrow（about 显示 lastUpdated）/ aka 行 / lead 文案，识别度由内容承担而非字号 |
| `<PageHead>` 后续被滥用（譬如塞图标、徽章） | 中 | 中 | 在 `COMPONENT_PATTERNS.md` 标注「PageHead 仅承载 title + intro，不接受 children；如需更多结构请单独抽 section」 |
| Token 命名 `--pagehead-*` 与未来可能的 `<PageHead>` props 混淆 | 低 | 低 | 命名锁定语义层（节奏），props 用 `title/intro` 等内容词，物理隔离 |

---

## 7. Rollback Plan

- 每步独立 commit（Step 1-4 各一个 commit），任一步可单独 `git revert`。
- 极端回滚：删 `<PageHead>` 文件 + 把三个列表页恢复为原 30 行 inline CSS（已在 git 历史可取）。
- Token 即使保留也无副作用（未被引用即闲置），不需要额外清理。

---

## 8. Open Questions

- [x] **Q1**：About Hero 字号是否同意从 `clamp(3rem, 8vw, 6.5rem)` 改到 `clamp(3rem, 7vw, 5rem)`？ → **同意**，已统一到 `--hero-display`。
- [x] **Q2**：是否同意 `<PageHead>` v1.0 不接受 `children`（即不开放更多结构插槽）？ → **同意**。实施时进一步砍掉了 RFC 草案预留的 `align` prop（v1.0 用不上的不引入 · §2.4.2 少 > 多）。
- [x] **Q3**：`--pagehead-pad-top` 取 `--space-24` (96px) 还是降到 `--space-20` (80px)？ → **取 96px**（与现状一致，零视觉风险）。
- [x] **Q4**：Home 是否需要 `keep-reading` 类的暗示？ → **不加**（home 已有"查看路线图"CTA，本 RFC 不处理）。

---

## 9. Approval

- [x] 用户已确认本 RFC（2026-05-29）
- [x] 已检查与 `AGENTS.md` 红线一致（§4.8）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.7）
- [x] 已检查与 `RFC-0002` 不冲突（about 100svh 保留）

---

## 10. Alternatives

### 10.1 方案 C — 五页强行统一锚点（否决）

让 5 页共用同一组上 padding / 容器宽度 / H1 字号，"左上角完全不动"。

**否决理由**：
- 抹平 hero/page-head 信息层级，违反 `STYLE_GUIDE.md` §3.3「单屏聚焦一个主信息」。
- About 失去 `min-height:100svh` 等于推翻 RFC-0002 §M1 已确认决策，需要重新立 RFC。
- "完全不动"是过度统一；§2.4.4「一致 > 新鲜」要求的是**同类一致**，不是**异类同质**。

### 10.2 抽 `<Hero>` 共享组件给 home + about（否决）

把 home 与 about 的 hero 抽成同一个组件，传不同 props 控制结构。

**否决理由**：
- home 的结构：eyebrow + 双行 display + tagline + 两段 intro + CTA。
- about 的结构：eyebrow（含日期）+ display + aka(含彩蛋) + lead + meta + keep-reading。
- 共性只有"上 padding + display 字号"两件事，已经被本 RFC 通过 token 解决了。
- 强抽组件会引入大量 `if/slot` 胶水代码，反而违反 §2.4.2「少 > 多」。

### 10.3 维持现状仅去重 PageHead（保留为后备）

如果用户觉得字号统一冒进，可退化为：
- 仅做 §4.4（抽 `<PageHead>`）+ §4.3 中 PageHead 部分的 token；
- Hero 部分维持现状不动。

收益：解决代码债，但保留 home/about 字号差异。
代价：用户感知到的"突兀感"只解决一半（垂直锚点稳定性靠 PageHead 已对齐）。
**仅作为 Q1 否决时的退路**。

---

## 11. Implementation Notes

> 实施过程中产生的偏差、补充决策、commit 链接将追加在此处。

### 实施日志（2026-05-29）

按 §4.6 五步执行，全部完成：

1. **Step 1 — Tokens 落地**（`src/styles/tokens.css` + `docs/design/DESIGN_TOKENS.md` §4.5）
   新增 6 个语义 token：`--hero-pad-top/-bottom/--hero-display` + `--pagehead-pad-top/-bottom/--mb-title`。所有取值映射到现有 `--space-*` 与字号公式，未引入新数值。
2. **Step 2 — `<PageHead>` 组件**（`src/components/sections/PageHead.astro` + `COMPONENT_PATTERNS.md` §4.9）
   仅 `title: string` + `intro?: string`，砍掉草案中预留的 `align` prop（§2.4.2 少 > 多——v1.0 用不上的不引入）；不开 children/slot；`<h1>` 不重写 `font-size`，继承 globals.css `h1 = --text-h1` 单一来源。
3. **Step 3 — 三个列表页迁移**：`/projects` `/ai` `/thoughts` 改用 `<PageHead>`，三处累计移除 `.page-head` / `.title` / `.intro` 共 ~75 行重复 CSS。
4. **Step 4 — Hero 微调**：
   - `src/pages/index.astro`：`.hero` padding 与 `.display` font-size 改用 `--hero-pad-*` 与 `--hero-display`（数值不变，仅语义化）。
   - `src/components/sections/AboutHero.astro`：`.display` 字号 `clamp(3rem, 8vw, 6.5rem)` → `var(--hero-display)`（即 `clamp(3rem, 7vw, 5rem)`，1280px 视口下 H1 从 ~104px → 80px，与 home 完全一致）；`.hero` padding 起点 `8rem` → `var(--hero-pad-top)`，上限保留 `clamp(...,18vh,14rem)` 承载 100svh 独占首屏；padding 收尾走 `--hero-pad-bottom`。
5. **Step 5 — 三检**：
   - `astro check`: ✅ 0 errors / 0 warnings / 0 hints
   - `biome check`：本 RFC 引入的 token 块 0 报错；剩余 `--font-sans` / `--font-mono` 多行格式提示属字体策略（见 `docs/rfcs/0008-fonts-strategy.md`）的预存改动，不在本 RFC 范围。
   - `astro build`: ✅ 9 pages built in 2.73s

### 同步更新的文档

- `docs/design/DESIGN_TOKENS.md` §4.5 + §12 变更记录
- `docs/design/COMPONENT_PATTERNS.md` §4.9
- `docs/ROADMAP.md` v1.0 横切清单勾选

### 偏差

无视觉偏差。仅一处实施细节优化：草案 §4.4 的 `<PageHead>` Props 含 `align?: "start"` 预留位，实施时按 §2.4.2「少 > 多」原则砍掉——未来真需要再开 RFC 扩展。

---

### 补丁日志（2026-05-30）— v0.6.1

**触发**：用户实测发现 `/`（home）与 `/about` 的首屏锚点仍未对齐，与右侧三个列表页（`<PageHead>`）也不一致。

**根因复盘**：上一轮统一了字号、padding、组件，但漏掉了**"内容容器宽度"**——home 的 `.hero-inner` 仍用 `--hero-max` (960px)、about 用 `--prose-max` (680px)、PageHead 也用 `--prose-max`。1280px 视口下 home 比其他四页向左多伸 140px。同时 about 的 `padding-block-start` 仍带 `clamp(...,18vh,14rem)`，高视口下顶部比 home 低 ~16~66px。

**修复**（补 RFC-0007 的第 7 个节奏 token + 取消 about 的 padding 例外）：

1. **`tokens.css` + `DESIGN_TOKENS.md` §4.5**：新增 `--hero-content-max: var(--prose-max)`（680px），与 PageHead 共用。
2. **`src/pages/index.astro`**：`.hero-inner { max-width: var(--hero-max) }` → `var(--hero-content-max)`。
3. **`src/components/sections/AboutHero.astro`**：
   - `.hero-inner { max-width: var(--prose-max) }` → `var(--hero-content-max)`（语义化）。
   - `.hero { padding-block: clamp(var(--hero-pad-top), 18vh, 14rem) ... }` → `var(--hero-pad-top) var(--hero-pad-bottom)`，与 home 完全一致。`min-height: 100svh` 保留承载 RFC-0002 §M1 的"独占首屏"语义；高视口多出空间沉到底部，与 keep-reading 暗示天然契合。
4. **三检**：astro check / biome check / astro build 全绿。

**结果**：home / about / projects / ai / thoughts 五页首屏 H1 的左缘 X 与顶 Y 均完全对齐——切 tab 时左上角锚点彻底稳定。

---

### 补丁日志（2026-05-30）— v0.6.2

**触发**：v0.6.1 之后用户切换 home ↔ about 时仍感觉 `Xiaowu` 在纵向"沉一档"。

**根因复盘**：v0.6.1 锁住了 hero 的 `padding-block-start`（128px）与 `.hero-inner` 宽度（680px），但 `.eyebrow → .display` 的 `margin-bottom` 仍是各自为政——home `--space-8` (32px) vs about `--space-12` (48px)。叠加 about eyebrow 用 mono、home 用 uppercase，font metric 微差让差距更明显。两页"顶部 → H1 顶"的距离差约 16px，肉眼可感。

**修复**（补 RFC-0007 的第 8 个节奏 token）：

1. **`tokens.css` + `DESIGN_TOKENS.md` §4.5**：新增 `--hero-mb-eyebrow: var(--space-8)`（32px），承担 hero eyebrow → H1 的纵向距离。
2. **`src/pages/index.astro`**：`.eyebrow { margin: 0 0 var(--space-8) }` → `var(--hero-mb-eyebrow)`（值不变，语义化）。
3. **`src/components/sections/AboutHero.astro`**：`.eyebrow { margin: 0 0 var(--space-12) }` → `var(--hero-mb-eyebrow)`（48 → 32 收紧 16px，与 home 完全对齐）。
4. **取舍**：是否保留 about 的 48px 留白？按 §2.4.4「一致 > 新鲜」+ §2.4.2「少 > 多」，**收紧到 32px** 胜出——切 tab 锚点稳定 > 单页内的额外呼吸感；about 的"独占首屏"语义已由 `min-height: 100svh` + 下沉的 keep-reading 充分承载，eyebrow 多出 16px 不是必要装饰。
5. **三检**：astro check / biome check / astro build 全绿。

**结果**：home ↔ about 切 tab 时，`Xiaowu` 的 X / Y 两轴均完全锁定；左上角"顶部 → H1 顶"距离视觉上零跳跃。



### 备注（编号确认）

仓库中只存在 **一个** RFC-0007（本 RFC）。字体策略 RFC 编号为 `0008-fonts-strategy.md`。本节"备注"是回应一次会话内的引用 typo（已在上方"实施日志 Step 5"中修正），**不存在重号**。


