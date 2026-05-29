# RFC-0004: AI Section

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

`/ai` 是站点最后一个大章节，当前仍是 `PlaceholderPage` 占位。

原架构（`ARCHITECTURE.md` §5）设想 `/ai` 为四子板块 hub：insights / mcp / skills / lab。但这四个 collection 至今**无任何内容**，强行搭 hub 只会得到一堆空入口卡，违反「少 > 多」。

与此同时，我手上有一份**已经成型**的、关于「如何与 AI 协作」的思想——散落在 `AGENTS.md`（尤其 §2 文档先行、§2.4 取舍原则）、user rules、`WRITING_GUIDE.md` §8 等处。把这些提炼出来，比搭空壳 hub 更有分量、更贴合本站「内容驱动」的定位。

---

## 2. Goals（目标）

1. 让 `/ai` v1.0 成为一个**有分量的内容页**，而非空壳 hub。
2. 提炼 6-7 条高价值的「我与 AI 协作的原则」，面向读者、可扫读。
3. 完全复用既有 token 与组件范式（编号宣言列表 = AboutAskedQuestions），不为 `/ai` 单独破例。
4. 内容来自既有文档的提炼**转写**，不照搬内部宪法原文、不暴露仓库内部细节。

---

## 3. Non-Goals（非目标）

- ❌ 不做 insights / mcp / skills / lab 四子板块（留在 ROADMAP，遵循「少 > 多」）
- ❌ 不搭空入口卡 hub
- ❌ 不把原则写得「特别详细、特别完整」（用户明确表示没必要，先提炼几条有价值的）
- ❌ 不用 `ai-insights` collection 承载原则（原则是短结构化条目，非文章）
- ❌ 不在每条原则后显示来源文档引用（面向读者，保持克制）

---

## 4. Proposal（方案）

### 4.1 总体设计

`/ai` 单一职责页：

```
┌── 页头 ───────────────────────────────┐
│  H1 AI  +  一行 intro（我怎么和 AI 干活）│
├── Principles（编号宣言列表）──────────┤
│  01  文档先行 — 一句解释               │
│  02  先方案，后代码 — 一句解释         │
│  ...                                   │
└───────────────────────────────────────┘
```

### 4.2 关键决策

| 决策点 | 选项 | 选择 | 理由 |
|---|---|---|---|
| `/ai` 定位 | 原则页 / 原则+预告 / 四子板块 hub | **原则内容页** | 四子板块无内容，搭 hub 即空壳；原则已成型、有分量 |
| 呈现形式 | 编号宣言 / 卡片网格 / 极简列表 | **编号宣言列表** | 复用 AboutAskedQuestions 的 01/02 mono+accent 范式，气质契合 |
| 内容建模 | data 模块 / ai-insights collection | **`src/data/ai.ts`** | 短结构化条目，与 `about.ts` 一致，避免空 collection runtime |
| 原则条数 | — | **6-7 条** | 先 7 条，过密删到 6 |

### 4.3 实施步骤

1. `src/data/ai.ts`：Zod 校验数据（intro + principles）。
2. `src/components/sections/AiPrinciples.astro`：编号宣言列表（扩展 AboutAskedQuestions：编号 + 标题 + 一句解释）。
3. `src/pages/ai/index.astro`：薄装配（H1 + intro + AiPrinciples），移除 PlaceholderPage。
4. `src/i18n/zh.ts`：移除旧 `page.ai.placeholder` 依赖。
5. 同步 `CONTENT_MODEL.md` / `ROADMAP.md` / `COMPONENT_PATTERNS.md`。

### 4.4 影响范围

- 文件（新增）：`src/data/ai.ts` · `src/components/sections/AiPrinciples.astro`
- 文件（修改）：`src/pages/ai/index.astro` · `src/i18n/zh.ts`
- 文档：`CONTENT_MODEL.md` · `ROADMAP.md` · `COMPONENT_PATTERNS.md`
- 依赖：无新增

### 4.5 视觉与风格自检

| 红线 | 遵守 |
|---|---|
| §1 禁止渐变 / 硬编码颜色 | ✅ 全 token |
| §1 单一强调色 | ✅ 仅克制蓝（编号）|
| §3 4px 间距栅格 | ✅ 全 `--space-*` |
| §5 动效 ≤ 300ms | ✅ 仅 reveal 入场，无炫技 |
| §7 信息密度 / 留白 | ✅ 单屏一个主信息，编号列表呼吸充足 |
| §9 图标克制 | ✅ 无图标，纯排印 |
| `WRITING_GUIDE` §1 简洁真诚 | ✅ 每条一句解释，不凑字 |

### 4.6 隐私自检（AGENTS.md §1）

- 原则是「方法论」层面的公开表达，**不含**真实姓名、联系方式、公司内部细节。
- **不照搬** `AGENTS.md` 内部宪法原文（如隐私字段清单、仓库治理细节），仅提炼可公开的方法论。
- 仅出现 `Xiaowu` / `Kirito` 语境。

---

## 5. Alternatives（备选方案）

- **四子板块 hub**：否决——无内容，空壳违反「少 > 多」。
- **卡片网格呈现原则**：否决——编号宣言更有「宣言感」，且与 about 的克制气质一致。
- **用 ai-insights collection 写成长文**：否决——原则是短条目，写成文章是过度；且现在不需要详尽。

---

## 6. Risks & Mitigations（风险与缓解）

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 原则措辞像「正确的废话」 | 中 | 中 | 每条挂一个具体取舍（如「加法比减法容易」），可由用户后续润色 |
| 与 about 的 stack / asked 视觉重复 | 低 | 低 | 编号列表语义不同（宣言 vs 问题），间距/层级一致即和谐 |
| 未来要做四子板块时本页需重构 | 中 | 低 | data 模块与组件均可平移；hub 可作为本页之上的新层叠加 |

---

## 7. Rollback Plan（回滚方案）

- 渲染层回滚即恢复 v0.5 占位页（`index.astro` 改回 `PlaceholderPage`）。
- `src/data/ai.ts` 删除即回滚，无迁移成本（未引入 collection / schema 变更）。

---

## 8. Open Questions（已由用户确认）

- [x] `/ai` 定位 → **原则内容页**（四子板块留 ROADMAP）
- [x] 呈现形式 → **编号宣言列表**

---

## 9. Approval（确认）

- [x] 用户已确认本 RFC（2026-05-29，经 plan 确认实现）
- [x] 已检查与 `AGENTS.md` 红线一致（§4.6 隐私自查）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.5 风格自查）

## 10. Implementation Notes（实施记录）

- 2026-05-29：按本 RFC 实现并通过 `biome check` / `biome lint` / `astro check`（0 错误）/ `astro build`。
- 原则内容写入 `src/data/ai.ts`，由 Zod 加载时校验；最终 7 条，面向读者第一人称、提炼自既有文档而非照搬。
