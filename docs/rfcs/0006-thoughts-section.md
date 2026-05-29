# RFC-0006: Thoughts Section（心得 · 信条墙）

| Field | Value |
|---|---|
| Status | **Implemented** |
| Author | Xiaowu (with AI assistance: Cursor) |
| Created | 2026-05-29 |
| Last Updated | 2026-05-29 |
| Related Docs | `AGENTS.md` · `STYLE_GUIDE.md` · `COMPONENT_PATTERNS.md` · `CONTENT_MODEL.md` · `WRITING_GUIDE.md` · `RFC-0002` · `RFC-0003` |
| Depends On | RFC-0001 (project bootstrap) |
| Related Issues / PRs | — |

---

## 1. Background（背景）

`/thoughts` 当前只是 `PlaceholderPage` 占位（"Quiet Construction"）。

ROADMAP 原本把 Thoughts 规划成**长文博客**（列表按 category 分组 + 详情页含阅读进度 / 目录）。但在第一版没有长文积累的现实下，硬上博客壳会得到一个空页面，违反 §2.4.2「少 > 多」。

同时一个更贴切的洞察浮现：**本仓库的开发规范，本身就是作者的一批「心得」**。`AGENTS.md` 的取舍原则、`STYLE_GUIDE.md` 的克制哲学、工程纪律、写作真诚——这些天生是**短小的信条（aphorism）**，而非长文章。把它们作为心得页的首批内容，既真实、又克制，且与全站「文档驱动」气质自洽。

不做的代价：心得页长期空置，或被迫写注水长文。

---

## 2. Goals（目标）

1. **信条优先**：以「短标题 + 1~2 句阐述 + 来源标注」的原子信条呈现心得，可一眼扫读。
2. **主题分组**：按 `取舍 / 克制 / 工程 / 真诚` 四个主题归类，呼应规范来源。
3. **零维护起步**：纯结构化数据驱动，不依赖 MDX、不依赖封面图与外部 API。
4. **风格一致**：完全复用 about / projects 已落地的「左窄列 + 右正文」栅格与 token，不为 thoughts 单独破例。
5. **真实可溯**：每条信条标注来源条款（如 `AGENTS §2.4.2`），与规范文档形成互文，不编造。

---

## 3. Non-Goals（非目标）

- ❌ 不做长文博客 / 详情页 / 阅读进度 / 目录（ROADMAP 原计划移至 v1.x，待长文积累后另开 RFC）。
- ❌ 不动用现有 `thoughts` MDX collection（`config.ts` 中保留不变，留给未来长文；本期信条走独立数据源，避免与长文模型耦合）。
- ❌ 不做标签 / 筛选 / 分页（信条量小，遵循「少 > 多」）。
- ❌ 不上封面图、不引图标库、不加状态徽章（§7 拒绝堆砌）。
- ❌ 不接入「按 CONTENT_MODEL 既定 category 分组」（已与用户确认改用主题分组）。

---

## 4. Proposal（方案）

### 4.1 总体设计

`/thoughts` 是一个长页面，自上而下：

```
┌── 页头 ───────────────────────────────┐
│  H1 心得  +  一行 intro                │
├── 取舍（Trade-offs）──────────────────┤
│  信条列表                              │
│  §2.4.2 │ 标题                         │
│         │ 阐述（1~2 句）               │
├── 克制（Restraint）───────────────────┤
│  信条列表 …                            │
├── 工程（Craft）───────────────────────┤
│  信条列表 …                            │
├── 真诚（Honesty）─────────────────────┤
│  信条列表 …                            │
└───────────────────────────────────────┘
```

- 每个主题组是一个 `<section data-reveal>`，h2 用 `--text-h3`。
- 每条信条复用 `AboutTrackRecord` 的「左 mono 窄列 + 右正文」grid：
  - **左列**（`--font-mono` / subtle）：来源条款号，如 `§2.4.2`（缺省时留空，栅格仍对齐）。条款号即来源引用，右侧不再另设「来源标注」。
  - **右正文**：信条标题（semibold）→ 阐述（muted / relaxed）。
- 数据为空的主题组不渲染；全空时渲染优雅空状态（复用 projects 空状态文案范式）。

### 4.2 内容种子（首批信条，[DRAFT] 待用户审定）

> 标题摘自规范原文（作者所写，属事实）；阐述为 [DRAFT] 改写，等用户用自己的口吻审校（参照 `about.ts` 的 [DRAFT] / {{TODO}} 约定）。

**取舍 Trade-offs**
- `长期 > 短期` — 永远向前看。今天的省力，是明天的债。（AGENTS §2.4.1）
- `少 > 多` — 不确定要不要做，就默认不做。加上去永远比删下来容易。（AGENTS §2.4.2）
- `优雅 > 方便` — 便利不是最高目标，对项目最贴切才是。（AGENTS §2.4.3）
- `一致 > 新鲜` — 3 个月后回看仍合适，才值得引入。（AGENTS §2.4.4）

**克制 Restraint**
- `留白是内容，克制是态度` — 极简不是简陋，每处装饰都要回答「不加会更好吗」。（STYLE_GUIDE §0）
- `全站只一种强调色` — 除中性灰阶外，克制蓝是唯一的声音。（STYLE_GUIDE §1）
- `动效要无感` — ≤300ms，统一缓动，能不动就不动。（STYLE_GUIDE §5）

**工程 Craft**
- `文档先行` — 文档是唯一真理来源，决策都能引用到某一条。（AGENTS §2.1）
- `RFC 再动手` — 跨文件的改动，先写清背景、取舍、回滚，再写代码。（AGENTS §2.2）
- `增量，不顺手重构` — 不顺眼的代码先记进想法池，下次专门处理。（AGENTS §5.2）

**真诚 Honesty**
- `删掉一句也成立的句子，就删` — 简洁是对读者时间的尊重。（WRITING_GUIDE §1）
- `不编造经历与数据` — 不确定的数字加「约」，链接必须真实可达。（WRITING_GUIDE §9）
- `AI 辅助要透明披露` — AI 主笔或 >30% 段落，frontmatter 标 `aiAssisted`。（WRITING_GUIDE §8）

### 4.3 数据模型（`src/data/thoughts.ts`，Zod 加载时校验）

仿 `about.ts`：纯 TS 模块 + Zod `.parse()`，违反 schema 构建即失败。

```ts
const principle = z.object({
  ref: z.string().optional(),   // 来源条款，如 "AGENTS §2.4.2"
  title: z.string(),            // 信条，如 "少 > 多"
  body: z.string().max(120),    // 1~2 句阐述
});

const themeGroup = z.object({
  theme: z.string(),            // 主题名，如 "取舍"
  label: z.string().optional(), // 英文副标签，如 "Trade-offs"
  principles: z.array(principle).min(1),
});

const thoughtsSchema = z.object({
  groups: z.array(themeGroup).min(1),
  lastUpdated: z.coerce.date(),
});
```

- 主题名 / 信条内容属「内容数据」，落在 `thoughts.ts`（与 about 把内容放 data、把区块标题放 i18n 的范式一致）。
- 页面级 intro 走 i18n（`page.thoughts.intro`），对齐 `page.projects.intro`。

### 4.4 关键决策

| 决策点 | 选项 | 选择 | 理由 |
|---|---|---|---|
| 页面形态 | 信条墙 / 长文博客 / 混合 | **信条墙** | 贴合现有内容（规范即箴言）、最克制（少 > 多）；长文待积累后另开 RFC |
| 分组依据 | 主题 / CONTENT_MODEL category | **按主题（取舍/克制/工程/真诚）** | 贴合规范来源，比通用 category 更有叙事 |
| 数据落地 | 轻量 data.ts / MDX collection | **`src/data/thoughts.ts`** | 短信条无 MDX 需求，结构化更轻；复用 about.ts 范式 |
| 单条栅格 | 新设计 / 复用 TrackRecord | **复用 TrackRecord「左 mono + 右正文」** | 零新栅格、视觉与 about/projects 一致 |
| thoughts MDX collection | 删除 / 改用 / 保留 | **保留不动** | 留给未来长文；本期不耦合 |

### 4.5 实施步骤（待确认后执行）

1. `src/i18n/zh.ts`：新增 `page.thoughts.intro`、`thoughts.empty`，移除对旧 placeholder 的页面依赖（key 保留）。
2. `src/data/thoughts.ts`：按 §4.3 schema + §4.2 种子内容落地，Zod 校验。
3. `src/components/sections/ThoughtsPrinciples.astro`：复用 `AboutTrackRecord` 列表范式，props `groups`。
4. `src/pages/thoughts/index.astro`：薄装配（取数 + 下发 + 空状态），替换 `PlaceholderPage`。
5. 同步 `COMPONENT_PATTERNS.md`（登记新 section）、`CONTENT_MODEL.md`（注明 thoughts 信条走 data.ts，MDX collection 保留待长文）、`ROADMAP.md`（勾选 Thoughts 信条版）。
6. 自检：隐私 / 风格 / 类型 / 构建；运行 `lint` / `lint:tsc`(`astro check`) / `lint:fix`(`biome check`)。

### 4.6 影响范围

- 文件（新增）：`src/data/thoughts.ts` · `src/components/sections/ThoughtsPrinciples.astro`
- 文件（修改）：`src/pages/thoughts/index.astro` · `src/i18n/zh.ts`
- 文档：`COMPONENT_PATTERNS.md` · `CONTENT_MODEL.md` · `ROADMAP.md`
- 依赖：无新增

### 4.7 视觉与风格自检（STYLE_GUIDE）

| 红线 | 遵守 |
|---|---|
| §1 禁渐变 / 硬编码颜色 / 单一强调色 | ✅ 全 token，仅克制蓝（来源链接如启用）|
| §2 字号 rem / 行高 ≥1.6 / H1 唯一 | ✅ 全 `--text-*` / `--leading-relaxed` / 页面仅一个 H1 |
| §3 4px 间距栅格 | ✅ 全 `--space-*` |
| §4 静态卡优先 1px 边线 | ✅ 列表无卡片、无阴影 |
| §5 动效 ≤300ms、无炫技 | ✅ 仅 `data-reveal` fade-up（§5.4 模块级，一次性）|
| §7 信息密度 / 拒绝堆砌 | ✅ 每条仅标题+阐述+来源三件 |
| §9 图标克制 | ✅ 信条中 `>` 为文本运算符非图标；不引图标库；来源标注纯文本 |

### 4.8 隐私自检（AGENTS.md §1）

- 仅出现 `Xiaowu` / `Kirito` 署名。
- 内容全部来自本仓库公开规范文档，**不含**任何真实姓名、联系方式、证件、学校/公司全名等敏感字段。
- 无需走 §1.3 敏感字段询问流程。

---

## 5. Alternatives（备选方案）

- **长文博客（ROADMAP 原计划）**：否决——无长文积累，硬上得到空壳页（少 > 多）。待积累后另开 RFC。
- **混合（信条为主 + 个别展开长文）**：暂缓——本期先纯信条；未来某条信条「长大」时再引入详情页，成本可控。
- **按 CONTENT_MODEL 既定 category 分组**：否决——category（frontend/engineering/…）对信条不如主题（取舍/克制/…）贴切。
- **复用 thoughts MDX collection 写短信条**：否决——MDX 对一两句的信条是过度形态，且会与未来长文模型混淆。
- **卡片网格 / bento 呈现**：否决——撞 STYLE_GUIDE 装饰红线，且信息密度过高。

---

## 6. Risks & Mitigations（风险与缓解）

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 信条内容由 AI 改写偏离作者本意 | 中 | 中 | 阐述全标 [DRAFT]，等用户审校；标题取自规范原文 |
| 与既有 thoughts MDX collection 概念混淆 | 中 | 低 | Non-Goals 与 CONTENT_MODEL 明确：collection 保留待长文，信条走 data.ts |
| 信条变多后页面偏长 | 低 | 低 | 主题分组天然分段；届时可加锚点导航（移想法池）|

---

## 7. Rollback Plan（回滚方案）

- 单 commit 可 `git revert`。
- 回滚渲染层即恢复 v0.5 占位页（`index.astro` 改回 `PlaceholderPage`）。
- 无 schema 迁移：删除 `thoughts.ts` 与 section 即完全回滚。

---

## 8. Open Questions（待用户确认）

- [x] 页面形态 → **信条墙**（已确认）
- [x] 分组依据 → **按主题 取舍/克制/工程/真诚**（已确认）
- [x] 数据落地 → **`src/data/thoughts.ts`**（已确认）
- [x] §4.2 首批信条选条与分组 → **认可**，阐述文案标 [DRAFT] 待作者微调
- [x] 主题分组 → **取舍 / 克制 / 工程 / 真诚 四组**（已确认）
- [x] 左列来源标注 → **条款号（如 `§2.4.2`，mono）**；右侧不再重复「来源标注」caption（守 §7）

---

## 9. Approval（确认）

- [x] 用户已确认本 RFC（2026-05-29，经两轮 AskQuestion 确认方向与实现）
- [x] 已检查与 `AGENTS.md` 红线一致（§4.8 隐私自查）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.7 风格自查）

## 10. Implementation Notes（实施记录）

- 设计合并：左列条款号即来源引用，删去右侧独立「来源标注」caption——每条信条最终仅「条款号 + 标题 + 阐述」三件（§7 拒绝堆砌）。
- 2026-05-29：按本 RFC 实现并通过 `astro check`（37 文件 0 错误）/ `biome lint`（干净）/ `biome check --write`（格式化 1 文件）/ `astro build`（7 页，含 `/thoughts`）。
- 新增 `src/data/thoughts.ts`（4 主题 × 3~4 条，共 13 条信条，阐述标 [DRAFT]）与 `ThoughtsPrinciples.astro`（复用 `AboutTrackRecord` 栅格，零新 CSS 范式、零新 token）。
- `i18n/zh.ts`：旧 `page.thoughts.placeholder` 替换为 `page.thoughts.intro` + `thoughts.empty`（移除冗余未用 key）。
- 现有 `thoughts` MDX collection 保留不动，留给未来长文。
