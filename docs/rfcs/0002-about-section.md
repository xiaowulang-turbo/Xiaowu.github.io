# RFC-0002: About Section

| Field | Value |
|---|---|
| Status | **Accepted** |
| Author | Xiaowu (with AI assistance: CodeBuddy) |
| Created | 2026-05-24 |
| Last Updated | 2026-05-24 |
| Related Docs | `AGENTS.md` · `STYLE_GUIDE.md` · `DESIGN_TOKENS.md` · `CONTENT_MODEL.md` · `RFC-0001` |
| Depends On | RFC-0001 (project bootstrap) |
| Related Issues / PRs | — |

---

## 1. Background

`/about` 是站点最关键的板块。明确的使用场景：

> **面试官在简历上看到 `xiaowulang.vercel.app` 后访问的第一个深页。**

这个上下文决定 4 件事：

1. 不是面向公众的"博客 about"——访客**已带预设**而来
2. **30 秒决定继续看不看**——节奏比深度重要
3. 必须**展示成长性**，而不是"我会什么"——前者是增量，后者是存量
4. 不能堆砌信息——克制本身是品味的证据

v0.5 阶段的占位页（`/about` 仅一句"敬请期待"）已无法承担这个任务。

---

## 2. Goals

按优先级：

1. **第一屏建立人设**：30 秒内让面试官记住"前端 → 全栈 Agent 工程师"的成长曲线
2. **可扫读、可深读**：3 分钟扫完核心模块，30 分钟可读完所有内容并跟随链接
3. **隐私安全**：严格遵守 `AGENTS.md` §1，不暴露任何禁止字段
4. **风格一致**：完全遵守 `STYLE_GUIDE.md`，不为 About 单独例外
5. **可演进**：内容字段从一处真理来源（about collection）渲染，未来更新只改一份 `.mdx`

---

## 3. Non-Goals

- ❌ 不接入英文版（i18n 仅预留接口）
- ❌ 不实现"Beliefs / 自评"内容（用户表示"缓一缓"）
- ❌ 不放头像 / 真人照
- ❌ 不放城市信息（已淡化处理）
- ❌ 不放校招期间的 4 个学生项目
- ❌ 不接入 Print Mode（移到 ROADMAP v1.x）
- ❌ 不引入 shadcn / Naive UI / DaisyUI 等样式型组件库
- ❌ 不实现"求职状态"模块（"考虑机会"是弱信号，跳过）

---

## 4. Information Architecture

### 4.1 一页式 + 自然分节

`/about` 是**一个长页面**，不分子路由、不用 Tabs 切换。
访客自上而下浏览或通过侧边锚点导航跳转。

> 选用一页式而非 Tabs 的理由：面试官时间紧张，**滚动比点击效率高 3 倍**；
> 一页布局对打印（未来 Print Mode）也友好。

### 4.2 模块顺序与作用

```
┌────────────────────────────────────────────────────┐
│  /about                                            │
│                                                    │
│  ┌── M1. Hero ───────────────────────────────────┐ │
│  │  极简自我陈述 · 30 秒抓住面试官               │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M2. Trajectory ─────────────────────────────┐ │
│  │  时间轨迹图 · 一眼看完成长曲线                │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M3. Now ────────────────────────────────────┐ │
│  │  当前在做的两个 Agent 项目（核心硬通货）       │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M4. Track Record ───────────────────────────┐ │
│  │  反时间线工作 / 实习经历                      │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M5. Stack ──────────────────────────────────┐ │
│  │  四档技能栈（Agent & AI 第一档）              │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M6. Education ──────────────────────────────┐ │
│  │  学历（信息密度极低，刻意低调）               │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M7. Three Things to Be Asked ───────────────┐ │
│  │  给面试官的小礼物                             │ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── M8. Want More ──────────────────────────────┐ │
│  │  深读入口：/projects · /thoughts · contact   │ │
│  └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

### 4.3 锚点侧边导航（桌面端，可选）

- 桌面端 `≥ 1024px`：右侧固定一列极小字号锚点（仅 dot + 区块名）
- 滚动时高亮当前节
- 移动端：完全隐藏，纯线性滚动
- v1.0 是否启用：**实施时根据空间感再决定**，宁可不做不可花哨

---

## 5. Module Specs（核心）

### M1. Hero

**目标**：30 秒让面试官记住主线一句话。

**结构**：

```
[eyebrow]    Last self-updated · 2026-05-24

[display]    Xiaowu

[caption]    also known as Kirito in the cyberspace.

[lead]       从初级前端走向全栈 Agent 工程师。
             一条还在加速的曲线。

[meta]       Agent · 全栈 · 前端 · Open to opportunities

             ↓ 继续阅读
```

**视觉规范**：

| 字段 | Token / 类 | 备注 |
|---|---|---|
| `display`（"Xiaowu"）| `clamp(3rem, 7vw, 5rem)` · weight 600 · `tracking-tight` | 与 v0.5 首页大字一致，建立品牌 |
| `caption`（Kirito）| `--text-caption` · `--color-text-subtle` | hover 时 200ms 浮现单行彩蛋 |
| `lead`（主线）| `1.125rem` · `--leading-relaxed` · `--color-text` | 全页最重要一句 |
| `meta`（求职意向）| `--text-small` · `--color-text-muted` | 空格分隔，无图标 |

**Kirito hover 彩蛋**（克制版）：

- 默认：caption 文字
- hover：caption 后追加 `— from a sword-and-magic story.`，淡入 200ms
- 移动端：long-press 触发，或干脆禁用（不引入 mobile hack）
- 实施：纯 CSS `data-attribute` + `:hover` 即可，**不引入 JS**

**禁止**：
- ❌ 头像 / 真人照
- ❌ 装饰图形 / SVG 插画
- ❌ "Hire me" CTA 大按钮
- ❌ 社交媒体图标墙

---

### M2. Trajectory（时间轨迹图）⭐

**目标**：一眼看完"前端 → Agent"的成长曲线，比读 8 段经历快 5 倍。

**结构（桌面端水平、移动端竖向）**：

```
桌面 ≥ 768px：

   2024.03      2024.06        2025.07            2025.12
     ●─────────────●──────────────●─────────────────●─→
     │             │              │                 │
   实习          实习           转正              入职
   Renren       Kingsoft       Kingsoft           Tencent
   切图调样式    AI 对话插件     带组 AI 设计室    Agent 项目

移动 < 768px：

   ●  2024.03 · Renren 实习
   │  切图调样式
   ●  2024.06 · Kingsoft 实习
   │  AI 对话插件 · SSE
   ●  2025.07 · Kingsoft 转正
   │  带组主导 AI 设计室
   ●  2025.12 · Tencent 入职
   │  互选 Agent · 智能诊断 Agent
```

**关键决策（4 个节点，不是 5 个）**：

按用户的删减意见，**2025.02 Vben Admin 重构**这一段从轨迹图中移除。
最终呈现的 4 个里程碑：
1. **2024.03** Renren 实习 · 起点
2. **2024.06** Kingsoft 实习 · AI 萌芽（重点 ⭐）
3. **2025.07** Kingsoft 转正 · 带组
4. **2025.12** Tencent 入职 · 现在（重点 ⭐）

**视觉规范**：

| 元素 | 规格 |
|---|---|
| 主线 | `1px` solid `var(--color-border-strong)` |
| 节点（普通）| `8px` 圆点 · `var(--color-text-muted)` 填充 |
| 节点（重点 ⭐）| `8px` 圆点 · `var(--color-accent)` 填充 + `2px` 同色描边外圈 |
| 当前节点（最右）| 同重点节点 + 极轻的呼吸动画（仅 `prefers-reduced-motion: no-preference`）|
| 节点上方文本 | `--text-caption` · `--color-text-subtle`（日期）|
| 节点下方文本 | `--text-small` · 第一行 `--color-text` 第二行 `--color-text-muted` |
| 节点间距 | 弹性等分 `space-between` |
| 移动端纵向间距 | `--space-12` |

**交互**：

- hover / focus 节点：节点下方淡入 1 行**额外说明**（≤ 30 字）
- 用 `grid-template-rows: 0fr → 1fr` 过渡 200ms，无遮挡
- 减弱动效偏好下：直接展开，无过渡

**禁止**：
- ❌ 弧线 / 曲线 / SVG 装饰路径
- ❌ 进度条 / 百分比 / 等级
- ❌ 公司 logo（污染样式 + 涉及 logo 版权）
- ❌ 滚动驱动的视差展开

---

### M3. Now（当前两个 Agent 项目）

**目标**：让面试官停下来读完 —— 这是你最大的硬通货。

**结构**：两张并列卡片（≥ 1024px）/ 上下堆叠（< 1024px）

```
What I'm working on                                2025.12 — now

  ┌───────────────────────────────────────────────────────────┐
  │  AI 选号 Agent                            Tencent · Lead  │
  │                                                           │
  │  基于对话的达人推荐系统。Agent 从需求理解、联网搜索、     │
  │  Skill 调用一路到达人匹配，端到端完成选号。              │
  │                                                           │
  │  关键能力   内容理解 · 联网搜索 · Skill 编排 · SSE 流式   │
  │                                                           │
  │  关于这个项目的一句话    {{TODO 你来写一句金句}}          │
  └───────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────────────────────────┐
  │  智能诊断 Agent                              Tencent      │
  │                                                           │
  │  前后端日志智能诊断系统。Agent 自主监测、定位代码问题、   │
  │  执行修复，完成线上问题排查的全链路闭环。                 │
  │                                                           │
  │  关键能力   日志理解 · CodeMap 索引 · 自动修复 · 闭环     │
  │                                                           │
  │  关于这个项目的一句话    {{TODO 你来写一句金句}}          │
  └───────────────────────────────────────────────────────────┘
```

**字段建模（每个项目）**：

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 项目中文名 |
| `org` | ✅ | "Tencent" 等 |
| `role` | – | "Lead" / "Front-End" / 留空 |
| `period` | ✅ | "2025.12 — now" |
| `summary` | ✅ | 2~3 行叙述（≤ 60 字）|
| `keywords` | ✅ | 4~6 个技术关键词，· 分隔 |
| `tagline` | – | 一句金句（占位 `{{TODO}}`）|

**视觉规范**：

| 元素 | 规格 |
|---|---|
| 卡片 | 1px `--color-border` 边线 · `--radius-md` 圆角 · `--space-8` 内边距 |
| 卡片间距 | `--space-6`（桌面横向）/ `--space-6`（移动纵向）|
| Hover | 边线变 `--color-border-strong` · 200ms 过渡 · **不**位移、**不**阴影 |
| `title` | `--text-h3` · weight 600 |
| `org · role` | `--text-small` · `--color-text-subtle` · 右对齐 |
| `summary` | `--text-body` · `--color-text-muted` · `--leading-relaxed` |
| `keywords` 行 | `--text-small` · 标签前缀（"关键能力"）`--color-text-subtle` |
| `tagline` | `--text-small` · `font-style: italic` · `--color-text` |

**禁止**：
- ❌ 项目截图 / 封面图（Agent 项目截图含商业敏感信息，且违反极简）
- ❌ 进度条 / 完成度
- ❌ 跳转外部 demo（除非项目可外开访问；这两个内部项目不可）
- ❌ "查看源码"按钮（内部项目无 repo）

---

### M4. Track Record（反时间线工作经历）

**目标**：补全时间线之外的经历细节，给想深入了解的人。

**结构**：

```
Track Record

  2025.12 — now      Tencent
                     Front-End on Marketing Cloud team.
                     Building AI-powered selection tools
                     for advertiser-creator matchmaking.

  2025.07 — 2025.11  Kingsoft Office
                     Front-End. Led a small team building
                     WPS AI Design Studio (poster generation).
                     Spec-and-ship in lockstep with backend & ML.

  2024.06 — 2024.08  Kingsoft Office · Intern
                     Built WPS AI chat plugin (SSE) for
                     natural-language slide editing & generation.
                     Plus XML-based slide layout templates.

  2024.03 — 2024.05  Renren · Intern
                     Customized client-facing websites,
                     debugged production issues.
```

**字段建模（按 `CONTENT_MODEL.md` `about` collection 扩展）**：

```ts
experiences: z.array(z.object({
  period: z.string(),        // "2025.12 — now"
  org: z.string(),           // "Tencent"
  role: z.enum(["FT", "Intern"]),
  title: z.string(),         // "Front-End"
  bullets: z.array(z.string()).max(3),  // 描述行，≤3 条
}))
```

**关键决策（按用户意见）**：

- **2025.02–04 Vben 重构** → **删除**（无意义）
- **2024.06–08 Kingsoft 实习** → 描述**强化**（突出两个 AI 项目的萌芽）
- 实习 / 正职用相同视觉单元，仅 `role: "Intern"` 标记

**视觉规范**：

| 元素 | 规格 |
|---|---|
| 总体布局 | 双列 grid（窄列：日期 / 宽列：内容）· `--space-8` 行距 |
| 日期列宽度 | `clamp(140px, 18%, 200px)` |
| 日期 | `--text-small` · `--color-text-subtle` · `--font-mono` |
| 公司名 | `--text-body` · weight 600 · `--color-text` |
| `Intern` 后缀 | 公司名后 `· Intern` 灰色 `--color-text-subtle` |
| bullets | `--text-small` · `--color-text-muted` · `--leading-relaxed` · 行高自然分隔（不用 `<ul>`）|
| 移动 < 640px | 单列：日期 caption + 内容堆叠 |

**禁止**：
- ❌ 时间轴竖线装饰
- ❌ 公司 logo
- ❌ 进度条 / 等级图标
- ❌ 任何动效（已用 M2 时间线表达过曲线，此处只填补细节）

---

### M5. Stack（四档技能栈）

**目标**：把"Agent & AI"作为差异化第一档，避免"我会 React"这种通用陈述。

**结构**：

```
Stack

  Agent & AI         Daily driver           Comfortable           Curious about
  Agent runtime      TypeScript             Vue · Svelte          Rust
  Tool calling       React · Astro          Node · Hono           Edge runtimes
  Prompt engineering Tailwind               Python (light)        Local LLMs
  RAG · embeddings   Vercel · Vite          PostgreSQL            ...
  SSE streaming      Git · Webpack
```

**字段建模**：

```ts
stack: z.object({
  agentAndAi: z.array(z.string()),
  daily:      z.array(z.string()),
  comfortable:z.array(z.string()),
  curious:    z.array(z.string()),
})
```

**视觉规范**：

| 元素 | 规格 |
|---|---|
| 总体布局 | 4 列 grid（≥ 1024px）/ 2 列（≥ 640px）/ 1 列（< 640px）|
| 列标题 | `--text-caption` · weight 500 · `--color-text-subtle` · uppercase · letter-spacing wide |
| 列项 | `--text-small` · `--color-text` · 每项一行 · `--space-2` 行距 |
| 列间距 | `--space-8` |
| 第一列（Agent & AI）| 列标题颜色用 `--color-accent`，**唯一**强调点 |

**禁止**：
- ❌ 进度条 / 星级 / 百分比
- ❌ 技能图标（lucide 也不放，会变碎片）
- ❌ "X 年经验"标签
- ❌ tag 形态（圆角胶囊会变 LinkedIn 味）

---

### M6. Education

**目标**：低调，给关心学历的人一行就够。

**结构**：

```
Education

  2021.09 — 2025.06   武汉理工大学（211 工程）
                      计算机科学与技术 · 本科
                      English CET-6 · 594
```

**字段建模**：

```ts
education: z.array(z.object({
  period: z.string(),
  school: z.string(),
  major: z.string(),
  degree: z.string(),
  notes: z.array(z.string()).optional(),  // 例如 CET-6 分数
}))
```

**关键决策**：

- 简历中 CET-6 594 分原本被列入"不展示"清单；但这里**作为 `notes` 选填存在**——你后续若想展示再填，schema 提前预留
- v1.0 默认**不渲染** `notes`（按你"信息密度低"的意愿）
- 学生会任职 → **不收录**

**视觉规范**：与 M4 Track Record 完全一致（双列布局），保持视觉节奏统一。

---

### M7. Three Things I'd Love to Be Asked

**目标**：全场最让面试官记住你的部分。也给自己一个反思接口。

**结构**：

```
Three things I'd love to be asked

  01    {{TODO 问题一}}

  02    {{TODO 问题二}}

  03    {{TODO 问题三}}
```

**字段建模**：

```ts
questionsToBeAsked: z.array(z.string()).length(3)  // 强制 3 条
```

**关键决策**：

- v1.0 这一节**先做 UI、内容留 `{{TODO}}`**，由你后续填
- 我不替你写——这是你**自己的反思**，AI 代笔失味
- 三个问题的撰写指南（写进 `WRITING_GUIDE.md` 单独一节）：
  1. 必须是开放问题，不能 yes/no
  2. 必须能引出**具体故事**，不能引出空话
  3. 三问之间必须**视角差异**：技术 / 哲学 / 反思

**视觉规范**：

| 元素 | 规格 |
|---|---|
| 编号 `01 02 03` | `--font-mono` · `--text-h4` · `--color-accent` |
| 问题文本 | `--text-body` · `--color-text` · `--leading-relaxed` |
| 编号与问题间距 | `--space-6` |
| 问题间纵向间距 | `--space-8` |
| 区块 padding | 多用 `--space-12` 上下留白，让这一节"呼吸"得最深 |

---

### M8. Want More

**目标**：把 About 与全站连起来，让深度访客有路径。

**结构**：

```
Want more?

  → /projects     更多项目
  → /thoughts     更多思考
  → mailto:...    或聊聊
```

**视觉规范**：极简列表，1 行 1 项，纯文字 + `→` 箭头，hover 蓝色。无装饰。

---

## 6. 隐私自查（按 AGENTS.md §1）

按本次决策的字段处理矩阵：

| 决策类 | 字段 |
|---|---|
| **不展示**（红线）| 真实姓名 / 真人照 / 出生年份 / 年龄 / 性别 / 手机号 / 学生会任职 |
| **不展示**（弱信号）| 工作城市 / 求职状态"考虑机会" / Vben 实习 / 校招 4 个学生项目 |
| **实名展示**（已许可）| Email · 武汉理工大学 211 工程 · 计算机科学与技术 · 本科 · Tencent · Kingsoft · Renren · 求职意向（Agent / 全栈 / 前端）|
| **预留 schema 不渲染** | CET-6 594 · 自评 8 条 → Beliefs |

实施代码必须自检：每一处 `{{value}}` 渲染前对照本表确认。

---

## 7. Content Model 扩展

### 7.1 升级 `about` collection schema

`CONTENT_MODEL.md` 当前的 `about` schema 太简化。本 RFC 要求扩展为：

```ts
const about = defineCollection({
  type: "data",  // ⚠️ 由 "content" 改为 "data"，因为内容高度结构化
  schema: z.object({
    signature: z.object({
      name: z.enum(["Xiaowu", "Kirito"]),
      aka: z.string().optional(),         // "Kirito"
      akaTease: z.string().optional(),    // hover 彩蛋
      tagline: z.string(),                // 主线一句话
      intent: z.array(z.string()),        // ["Agent", "全栈", "前端"]
      meta: z.string().optional(),        // "Open to opportunities" 等
    }),

    trajectory: z.array(z.object({
      date: z.string(),                   // "2024.06"
      org: z.string(),                    // "Kingsoft"
      role: z.string(),                   // "实习"
      label: z.string(),                  // "AI 对话插件"
      hover: z.string().optional(),       // hover 时多展开的 ≤30 字
      highlight: z.boolean().default(false),
    })),

    nowProjects: z.array(z.object({
      title: z.string(),
      org: z.string(),
      role: z.string().optional(),
      period: z.string(),
      summary: z.string().max(120),
      keywords: z.array(z.string()).min(3).max(6),
      tagline: z.string().optional(),     // {{TODO}} 占位时为 undefined
    })),

    experiences: z.array(z.object({
      period: z.string(),
      org: z.string(),
      role: z.enum(["FT", "Intern"]),
      title: z.string(),
      bullets: z.array(z.string()).max(3),
    })),

    stack: z.object({
      agentAndAi: z.array(z.string()),
      daily: z.array(z.string()),
      comfortable: z.array(z.string()),
      curious: z.array(z.string()),
    }),

    education: z.array(z.object({
      period: z.string(),
      school: z.string(),
      major: z.string(),
      degree: z.string(),
      notes: z.array(z.string()).optional(),
    })),

    questionsToBeAsked: z.array(z.string()).length(3),

    wantMore: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),

    contact: z.object({
      email: z.string().email(),
    }),

    lastUpdated: z.coerce.date(),
  }),
});
```

### 7.2 数据源文件位置

```
src/content/about/index.json    # ⚠️ 改为 .json（type: "data"）
                                # 或 src/data/about.ts（避免 collection 复杂度）
```

**实施时二选一**（在实施 PR 中决定），原则：选**更易由用户填写**的格式。

### 7.3 `CONTENT_MODEL.md` 同步

实施时必须更新 `CONTENT_MODEL.md` 的 §2.7 about schema 部分。

---

## 8. Component Inventory

### 8.1 新增组件（5 个）

按 `COMPONENT_PATTERNS.md` 三层结构归位：

| 路径 | 类型 | 职责 |
|---|---|---|
| `components/sections/AboutHero.astro` | section | M1 Hero 区 |
| `components/sections/Trajectory.astro` | section | M2 时间线（含 hover 展开）|
| `components/sections/NowProjects.astro` | section | M3 当前项目卡片组 |
| `components/sections/TrackRecord.astro` | section | M4 双列经历表 |
| `components/sections/StackGrid.astro` | section | M5 四列技能栈 |
| `components/sections/EducationList.astro` | section | M6 学历（与 TrackRecord 共享内部 `<DateRow>`）|
| `components/sections/AskedQuestions.astro` | section | M7 三问 |
| `components/sections/WantMore.astro` | section | M8 深读入口 |

### 8.2 共享原子组件（如有需要）

可能新增 1 个 primitive：

| 路径 | 职责 |
|---|---|
| `components/primitives/DateRow.astro` | 双列日期-内容布局，被 TrackRecord / Education 复用 |

> 是否抽象为 primitive，**实施时根据是否真正复用** ≥ 2 处再决定。
> 若仅 2 处简单复用，直接在 section 内复制 6 行 CSS 也无负担。

### 8.3 不引入

- ❌ Radix Primitives 在本 RFC **暂不需要**——所有交互（hover 展开 / 复制 email）纯 CSS / 简单 JS 即可
- ❌ lucide 图标：本 RFC 不使用图标，全文字 + `→` 箭头
- ❌ 任何样式型组件库

> 如果 v1.0 之后做 `/projects` 详情页 lightbox 之类需要 Dialog，再引入 Radix Dialog。**当前 0 依赖**。

---

## 9. Style Guide Adherence Check

逐条对照红线：

| 红线 | 本方案遵守 |
|---|---|
| §1 禁止渐变 | ✅ 全文字+1px 线，零渐变 |
| §1 禁止硬编码颜色 | ✅ 全部 token |
| §1 强调色一种 | ✅ 仅克制蓝（M2 重点节点 / M7 编号 / M5 第一列标题）|
| §3 4px 间距栅格 | ✅ 全部使用 `--space-*` |
| §5 动效 ≤ 300ms | ✅ Hero 入场 200ms · 时间线 hover 200ms · 卡片 hover 200ms |
| §5 禁止视差 / 弹跳 / 自动轮播 | ✅ 无 |
| §7 信息密度偏低 | ✅ 单屏聚焦一节，节内文字 ≤3 行 |
| §7 留白优先 | ✅ 区块间距 `--space-16`，单屏聚焦一个模块 |
| §8.4 卡片 1px 边线 | ✅ M3 卡片 |
| `WRITING_GUIDE` §3 标题 12~24 字 | ✅ |
| `WRITING_GUIDE` §5.2 段落 ≤ 5 句 | ✅ 实际 ≤ 3 行 |

---

## 10. Density Budget（信息密度自查）

约束（写入实施清单）：

| 维度 | 上限 | 备注 |
|---|---|---|
| 全页中文总字数 | ≤ 800 字 | 不含日期、关键词、邮箱 |
| 单段落行数 | ≤ 3 行 | 桌面 ≤ 4 行移动端 |
| 单屏聚焦模块数 | 1 | 滚动一屏只看一个 M |
| 第一屏密度 | M1 整屏独占 | 不放任何其他模块 |
| 时间线节点数 | 4 | 不增删 |
| Now 项目卡片数 | ≤ 2 | 当前正好 2 个 |
| Stack 列项数 | 每列 ≤ 6 | 超出说明在炫耀 |
| Track Record 经历数 | 4 | 删 2025.02 一段 |
| 三问数量 | 严格 3 | schema 强制 |

实施时如某模块超出上限，**先删内容再考虑扩容**。

---

## 11. Performance Budget

继续遵守 RFC-0001 §9：

| 指标 | 目标 | 本 RFC 影响 |
|---|---|---|
| 首页 JS gzip | < 30 KB | About 页**预期 0 客户端 JS**（所有交互纯 CSS）|
| 首页 CSS gzip | < 20 KB | 增量 ≈ 3 KB（8 个 section 各占少量）|
| LCP | < 1.5s | 不引入图片，无影响 |
| CLS | < 0.05 | 不用动态尺寸，无影响 |

预计 About 页 JS gzip 仍为 **0 KB**（继承 v0.5）。

---

## 12. Implementation Plan

里程碑顺序：

- **M1.** 升级 `about` schema（更新 `CONTENT_MODEL.md` 与 `src/content/config.ts` 或 `src/data/about.ts`）
- **M2.** 准备初始数据（占位 `{{TODO}}` 字段：Now tagline / 三问 / Beliefs 跳过）
- **M3.** 实现 8 个 section 组件（自下而上：M8 → M7 → ... → M1）
- **M4.** 实现 `pages/about.astro`（仅做组装）
- **M5.** 在 `i18n/zh.ts` 补充必要 key
- **M6.** 本地三检（biome / astro check / astro build）
- **M7.** 视觉走查（与 STYLE_GUIDE / Density Budget 逐条对）
- **M8.** 隐私自查（与 §6 表逐项对）
- **M9.** 单 commit `feat(about): build the about section per RFC-0002`
- **M10.** Push → Vercel 自动部署

预计代码量：~600 行（含 8 个 section + schema + 数据 + i18n 增量）

---

## 13. Alternatives

### 13.1 Tab 切换 vs 一页式
**否决 Tab**。RFC §4.1 已论证：滚动 > 点击。

### 13.2 时间线竖向贯穿全页 vs 单独 M2 模块
**否决竖向贯穿**。会成为视觉重心抢占其他模块；M2 紧凑呈现更克制。

### 13.3 卡片化 stack（每个技能一个 chip）vs 文字列表
**否决 chip**。chip 是 LinkedIn 味道，违反 STYLE_GUIDE §8.5。

### 13.4 引入 Radix Tooltip 实现 Kirito 彩蛋
**否决**。纯 CSS + `data-attr` 即可，引入 JS 库为单次彩蛋不划算。

---

## 14. Risks & Mitigations

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 时间线水平布局在窄屏卡顿 | 中 | 中 | 768px 以下强制竖向，已规范 |
| Now 卡片文案过长撑破节奏 | 中 | 中 | schema 限定 `summary.max(120)` 字 |
| 用户后续填 `{{TODO}}` 时遗漏 | 高 | 低 | 用 Astro `astro check` + `optional` 字段，缺失不构建错误，但**实施时在 README 列 TODO 清单**告诉用户填什么 |
| Hero 大字"Xiaowu"与首页重复，造成视觉重复感 | 中 | 中 | About Hero 与首页 Hero **风格一致但布局不同**：首页占满屏，About 紧凑居左 |
| 三问内容长期空着显得"未完成" | 高 | 中 | 实施时 §10 用一个温和 placeholder："Three thoughtful questions are taking shape." 暗示主动留白 |

---

## 15. Rollback Plan

- 每个 commit 独立可 `git revert`
- About 实施失败不影响 v0.5 占位页（`pages/about.astro` 改回最简版即可）
- 可保留 `feat(about)` commit 中的 schema 与数据，仅回滚渲染层

---

## 16. Open Questions（已由用户确认）

- [x] **Q1. Trajectory 节点数** → **4 个**（删除 Vben 一段）
- [x] **Q2. Now 卡片 tagline** → 实施时留 `{{TODO}}`，由用户后续填
- [x] **Q3. Education CET-6 594** → schema 预留、不渲染
- [x] **Q4. Kirito hover 彩蛋** → 默认采用 `— from a sword-and-magic story.`
- [x] **Q5. 锚点侧边导航** → 推迟到 v1.x，根据主页面紧凑度再决定
- [x] **Q6. 三问内容** → v1.0 留 placeholder，由用户后续填

---

## 17. Approval

- [x] **用户已确认本 RFC**（2026-05-24）
- [x] 已检查与 `AGENTS.md` 红线一致（§6 隐私自查）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§9 风格自查）
- [x] 已检查与 `ARCHITECTURE.md` 一致（组件分层与目录）
- [x] 已检查与 `CONTENT_MODEL.md` 兼容（§7 schema 升级路径）

---

## 18. Implementation Notes

### 实施里程碑

- [ ] M1. 升级 about schema（`CONTENT_MODEL.md` + `src/data/about.ts`）
- [ ] M2. 准备初始数据（占位 `{{TODO}}` 字段：Now tagline / 三问）
- [ ] M3. 实现 8 个 section 组件（自下而上）
- [ ] M4. 装配 `pages/about.astro`
- [ ] M5. 补充 i18n key
- [ ] M6. 本地三检（biome / astro check / astro build）
- [ ] M7. 视觉走查 + 隐私自查（按 §6、§9、§10）
- [ ] M8. 单 commit `feat(about): build the about section per RFC-0002`
- [ ] M9. Push → Vercel 部署 → 生产环境验证

### 实施期偏差（Deviations）

> 实施过程中产生的偏差与补充决策将在此追加。

_待实施_
