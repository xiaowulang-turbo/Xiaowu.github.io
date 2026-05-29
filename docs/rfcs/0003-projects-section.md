# RFC-0003: Projects Section

| Field | Value |
|---|---|
| Status | **Implemented** |
| Author | Xiaowu (with AI assistance: Cursor) |
| Created | 2026-05-29 |
| Last Updated | 2026-05-29 |
| Related Docs | `AGENTS.md` · `STYLE_GUIDE.md` · `COMPONENT_PATTERNS.md` · `CONTENT_MODEL.md` · `RFC-0001` · `RFC-0002` |
| Depends On | RFC-0001 (project bootstrap) |
| Related Issues / PRs | — |

---

## 1. Background（背景）

`/projects` 当前只是 `PlaceholderPage` 占位（"Quiet Construction"）。它需要承担一个明确的使用场景：

> **面试官 / 同行从简历或 about 页跳进来，想在 30 秒内判断「这个人到底做过什么」。**

我手上的项目天然分两类密度：

1. **高光层**：工作中的 Agent 项目、值得展开讲的旗舰作品。
2. **长尾层**：GitHub 上的插件、脚本、小工具——数量多、单个分量轻。

把这两类用同一种密度平铺会稀释高光、堆砌长尾。需要一个能「突出重点、收纳长尾」的结构。

---

## 2. Goals（目标）

1. **两层呈现**：精选区让旗舰项目可深读；归档区让小工具可被发现但不喧宾夺主。
2. **可扫读**：列表优先、文字优先，访客一眼扫完，按需点进 GitHub 或详情页。
3. **零维护负担起步**：不依赖封面图、不依赖外部 API，纯 MDX + frontmatter 驱动。
4. **风格一致**：完全复用 about 板块已落地的卡片 / 列表范式与 token，不为 projects 单独破例。
5. **内容真实**：不编造项目；`repo` / `demo` 必为真实可访问（AGENTS.md §6.2）。

---

## 3. Non-Goals（非目标）

- ❌ 不上封面图 / 截图（本期文字优先，`cover` 字段保留不渲染）
- ❌ 不做标签 / 类别筛选器（项目量小，遵循「少 > 多」，留待 v1.x）
- ❌ 不做客户端分页（同上）
- ❌ 不给归档小工具建详情页（直链 GitHub）
- ❌ 不改 `projects` collection schema（现有字段已足够）
- ❌ 不接入 GitHub API 自动同步 stars / commit（移到 ROADMAP 想法池）

---

## 4. Proposal（方案）

### 4.1 总体设计

`/projects` 是一个长页面，自上而下：

```
┌── 页头 ───────────────────────────────┐
│  H1 项目  +  一行 intro                │
├── Selected Work（精选）───────────────┤
│  富卡片网格（featured: true）          │
│  标题 / status / category / 摘要 /     │
│  技术 chip / 源码·演示链接             │
│  标题点击 → /projects/[slug] 详情      │
├── Archive（归档）─────────────────────┤
│  紧凑列表（featured: false）           │
│  年份 · 名称 · 摘要 · 技术 · 外链      │
│  名称点击 → 外链 GitHub                │
└───────────────────────────────────────┘
```

- 任一区为空则不渲染该区；两区皆空渲染优雅空状态。
- 详情页 `/projects/[slug]` 仅为 `featured` 项构建（`getStaticPaths` 过滤）。

### 4.2 关键决策

| 决策点 | 选项 | 选择 | 理由 |
|---|---|---|---|
| 组织结构 | 分层 / 按类分组 / 网格+筛选 | **精选 + 归档两层** | 突出高光、收纳长尾；对应用户的两类项目密度 |
| 视觉密度 | 文字优先 / 旗舰配图 / 全配图 | **文字优先，零封面** | 克制、零图片维护成本（少 > 多） |
| 详情页范围 | 仅精选 / 全部 / 全不做 | **仅精选建 MDX 详情** | 旗舰可深读，小工具直链 GitHub 即可 |
| 数据获取 | 各 section 自取 / 页面统一取并下发 | **页面取 + props 下发** | section 保持纯展示，单一数据源 |
| 归档分组 | 扁平 / 按 category 分小组 | **扁平 + 行内 category 标签** | 项目少时分组是过度设计，量大再加 |

### 4.3 实施步骤

1. `src/i18n/zh.ts`：新增 projects 文案 key，移除旧 placeholder 依赖。
2. `src/components/sections/ProjectsSelected.astro`：复用 `AboutNow` 卡片范式。
3. `src/components/sections/ProjectsArchive.astro`：复用 `AboutTrackRecord` 列表范式。
4. `src/components/sections/ProjectDetailHeader.astro`：详情页头部。
5. `src/pages/projects/index.astro`：薄装配（取数 + 拆分 + 下发 + 空状态）。
6. `src/pages/projects/[slug].astro`：`getStaticPaths` 仅 featured + 渲染 MDX 正文。
7. `src/styles/prose.css`：落地最小 MDX 正文样式（首个详情页触发）。
8. 内容：加入 1 条真实项目（本门户站自身）+ `_TEMPLATE.mdx`（被 Astro 忽略的模板）。
9. 同步 `COMPONENT_PATTERNS.md` / `ROADMAP.md`。

### 4.4 影响范围

- 文件（新增）：`ProjectsSelected.astro` · `ProjectsArchive.astro` · `ProjectDetailHeader.astro` · `pages/projects/[slug].astro` · `content/projects/xiaowu-portal.mdx` · `content/projects/_TEMPLATE.mdx`
- 文件（修改）：`pages/projects/index.astro` · `i18n/zh.ts` · `styles/prose.css`
- 文档：`COMPONENT_PATTERNS.md` · `ROADMAP.md`
- 依赖：无新增

### 4.5 视觉与风格自检

| 红线 | 遵守 |
|---|---|
| §1 禁止渐变 / 硬编码颜色 | ✅ 全 token，1px 边线 |
| §1 单一强调色 | ✅ 仅克制蓝（链接 / status 强调）|
| §3 4px 间距栅格 | ✅ 全 `--space-*` |
| §4 卡片 1px 边线、圆角 token | ✅ 复用 AboutNow 卡片 |
| §5 动效 ≤ 300ms、无位移炫技 | ✅ hover 仅边线/颜色 200ms |
| §7 信息密度 / 列数 ≤ 3 | ✅ 精选 md 1 / lg 2 列 |
| §8.5 标签徽章规范 | ✅ status/category/tech chip 走既有规范 |
| §9 图标克制 | ✅ 链接用 `↗` 文本箭头，不引图标库 |

### 4.6 隐私自检（AGENTS.md §1）

- 仅出现 `Xiaowu` / `Kirito` 署名。
- 唯一内置真实项目为本门户站（repo / demo 均为站点已公开信息）。
- 不含真实姓名、联系方式（email 仅在 about）、敏感字段。
- 用户后续添加项目时，`repo` / `demo` 必填真实链接或留空。

---

## 5. Alternatives（备选方案）

- **按类别分三组（Agent & AI / 工作 / 开源）平铺**：否决——同等密度会稀释旗舰、堆砌长尾。
- **统一卡片网格 + 客户端筛选器**：否决——项目量小，筛选器是过早抽象，增维护成本。
- **全部项目都建详情页**：否决——小工具薄页无信息量，徒增路由与空壳页。
- **引入封面图 / bento 网格**（搜索常见推荐）：否决——撞 STYLE_GUIDE 渐变 / 玻璃拟态 / 装饰红线。

---

## 6. Risks & Mitigations（风险与缓解）

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 初期项目内容少，页面显空 | 高 | 低 | 任一区空则隐藏；两区空显优雅空状态；先内置 1 条真实项目 |
| 用户填新项目时漏真实链接 | 中 | 中 | 提供 `_TEMPLATE.mdx`；schema `repo`/`demo` 为合法 URL 校验 |
| 归档长尾未来变多显拥挤 | 中 | 低 | 届时再加 category 分组 / 筛选（已在备选记录）|

---

## 7. Rollback Plan（回滚方案）

- 每个 commit 独立可 `git revert`。
- 回滚渲染层即可恢复 v0.5 占位页（`index.astro` 改回 `PlaceholderPage`）。
- schema 未改动，内容文件删除即回滚，无迁移成本。

---

## 8. Open Questions（已由用户确认）

- [x] 组织结构 → **精选 + 归档两层**
- [x] 视觉密度 → **文字优先，暂不上封面**
- [x] 详情页范围 → **仅精选旗舰建 MDX 详情**

---

## 9. Approval（确认）

- [x] 用户已确认本 RFC（2026-05-29，经 plan 确认实现）
- [x] 已检查与 `AGENTS.md` 红线一致（§4.6 隐私自查）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.5 风格自查）

## 10. Implementation Notes（实施记录）

- 2026-05-29：按本 RFC 实现并通过 `biome check` / `biome lint` / `astro check`（0 错误）/ `astro build`（7 页，含 `/projects` 与详情页 `/projects/xiaowu-portal`）。
- 内置真实项目仅本门户站一条（featured，进 Selected + 详情页）；归档区初期为空，等待用户补充 GitHub 小工具 / 脚本。
- `prose.css` 由本 RFC 首个详情页触发落地（最小 MDX 正文样式，仅作用于 `.prose`）。
