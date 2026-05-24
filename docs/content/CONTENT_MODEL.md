# CONTENT MODEL — 内容建模

> 本文档定义所有 **Content Collection** 的 Schema。
> 实施时使用 Astro 的 `defineCollection` + Zod。
> 任何字段变更必须先在此登记，并向后兼容（或提供迁移说明）。

---

## 0. 总原则

- **强 Schema**：所有 collection 必须用 Zod 定义；写错字段构建直接失败。
- **语义命名**：字段名英文、kebab/camel 一致；不缩写到看不懂。
- **隐私优先**：任何可能含敏感信息的字段，写入前需经隐私自检（见 `AGENTS.md` §1）。
- **国际化预留**：所有文案字段未来可能扩展为 `{ zh, en }` 对象，当前先用纯字符串。

---

## 1. 通用字段（Common）

下列字段在多个 collection 中复用：

```ts
{
  title: string;             // 标题（必填）
  summary: string;           // 一句话摘要（≤ 80 字）
  date: Date;                // 发布日期
  updated?: Date;            // 最近更新（可选）
  tags?: string[];           // 标签（小写 kebab：frontend / ai-coding ...）
  draft?: boolean;           // 默认 false；true 时构建产物中不出现
  featured?: boolean;        // 是否首页精选
  aiAssisted?: boolean;      // 内容是否由 AI 辅助创作（透明披露）
  cover?: ImageMetadata;     // 封面图（来自 src/assets/）
  ogImage?: ImageMetadata;   // OG image（不指定时由模板生成）
  noindex?: boolean;         // 是否禁止搜索引擎索引
}
```

---

## 2. Collections 详细 Schema

### 2.1 `projects`

> 路径：`src/content/projects/<slug>.mdx`
> 路由：`/projects/[slug]`

```ts
{
  title: string;
  summary: string;
  date: Date;                          // 项目起始或上线日期
  updated?: Date;
  tags: string[];                      // ["typescript", "astro", ...]
  category: "web" | "tool" | "library" | "experiment" | "ai";
  status: "active" | "archived" | "wip";
  repo?: string;                       // GitHub URL（必为真实可访问）
  demo?: string;                       // Live URL
  cover?: ImageMetadata;
  gallery?: ImageMetadata[];           // 详情页图集
  techStack?: string[];                // 展示的技术栈 chip
  featured?: boolean;                  // 首页精选
  order?: number;                      // 排序权重（越小越靠前；同值按 date desc）
  draft?: boolean;
}
```

**常用 tags 词表（建议遵循）**：
`astro` `typescript` `react` `vue` `svelte` `node` `cli` `ai` `mcp` `skill`
`design-system` `tooling` `playground`

### 2.2 `ai-insights`

> 路径：`src/content/ai-insights/<slug>.mdx`
> 路由：`/ai/insights/[slug]`

```ts
{
  title: string;
  summary: string;
  date: Date;
  updated?: Date;
  tags?: string[];
  topic: "prompting" | "agent" | "workflow" | "review" | "ide" | "other";
  cover?: ImageMetadata;
  draft?: boolean;
  aiAssisted?: boolean;
}
```

### 2.3 `ai-mcp`

> 路径：`src/content/ai-mcp/<slug>.mdx`
> 路由：`/ai/mcp`（聚合页，无单页路由；可选 `/ai/mcp/[slug]` 详情）

```ts
{
  name: string;                        // MCP 名称
  summary: string;
  category: "search" | "code" | "data" | "ops" | "design" | "other";
  repo?: string;
  homepage?: string;
  install?: string;                    // 一行安装命令或链接
  rating?: 1 | 2 | 3 | 4 | 5;          // 个人评分（可选）
  useCases: string[];                  // 推荐使用场景
  tags?: string[];
  date: Date;                          // 收录日期
  draft?: boolean;
}
```

### 2.4 `ai-skills`

> 路径：`src/content/ai-skills/<slug>.mdx`
> 路由：同 mcp

```ts
{
  name: string;
  summary: string;
  source: "official" | "community" | "self";
  scenario: string;                    // 一句话使用场景
  repo?: string;
  install?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  date: Date;
  draft?: boolean;
}
```

### 2.5 `ai-lab`

> 路径：`src/content/ai-lab/<slug>.mdx`
> 路由：`/ai/lab`（聚合）；可有详情页

```ts
{
  title: string;                       // 工具/skill 名称
  summary: string;
  status: "active" | "wip" | "paused" | "archived";
  date: Date;
  updated?: Date;
  tech?: string[];                     // 技术栈
  repo?: string;
  demo?: string;
  cover?: ImageMetadata;
  tags?: string[];
  draft?: boolean;
}
```

### 2.6 `thoughts`

> 路径：`src/content/thoughts/<slug>.mdx`
> 路由：`/thoughts/[slug]`，列表 `/thoughts`

```ts
{
  title: string;
  summary: string;
  date: Date;
  updated?: Date;
  category: "frontend" | "engineering" | "design" | "career" | "tooling" | "misc";
  tags?: string[];
  cover?: ImageMetadata;
  featured?: boolean;
  draft?: boolean;
  aiAssisted?: boolean;
  readingTimeMinutes?: number;         // 自动计算覆盖（可选 frontmatter override）
}
```

### 2.7 `about`（结构化数据，非 collection）

> 路径：`src/data/about.ts`
> 路由：`/about`
> 形态：**TypeScript 模块 + Zod 加载时校验**，**不是** Content Collection

**为什么不用 collection**：about 是单文档、结构化、无 mdx 需求；放进 `src/data/` 与
`site.ts` / `nav.ts` / `social.ts` 形态一致，避免 collection runtime 的多余开销。

详细字段定义见 [`docs/rfcs/0002-about-section.md`](../rfcs/0002-about-section.md) §7。
Schema 实施于 `src/data/about.ts`，约束包括：

- `signature`：name / aka / akaTease（Kirito 彩蛋）/ tagline / intent / meta
- `trajectory`：4 个里程碑节点（`{date, org, role, label, hover?, highlight}`）
- `nowProjects`：当前两个 Agent 项目（含 keywords + tagline 占位）
- `experiences`：反时间线工作经历（删 Vben，删 Renren 仅留 3 段）
- `stack`：4 档技能栈（`agentAndAi` / `daily` / `comfortable` / `curious`）
- `education`：学历（CET-6 字段 schema 预留、不渲染）
- `questionsToBeAsked`：3 个开放问题（强制长度 = 3，v1.0 占位）
- `wantMore`：深读入口链接
- `contact`：email
- `lastUpdated`：自更新时间戳

> **隐私强提醒**：`about` 的所有字段都可能涉及敏感信息。
> 写入前必须按 `AGENTS.md` §1.3 流程逐项询问。
> v1.0 字段处理决策见 RFC-0002 §6 隐私自查矩阵。

---

## 3. 文件命名规范

- 所有 collection 条目：**kebab-case** slug，对应文件名
  - 例：`my-first-astro-island.mdx`、`vercel-mcp-deep-dive.mdx`
- 中文标题用拼音或英文意译做 slug，避免 URL 编码乱码
- 一旦发布，**禁止**修改 slug（破坏外链）；如需重命名，添加 `redirects` 配置

---

## 4. Frontmatter 模板

### 4.1 `projects/<slug>.mdx`

```yaml
---
title: "Project Name"
summary: "A one-line description, ≤ 80 chars."
date: 2026-05-20
tags: [astro, typescript]
category: web
status: active
repo: https://github.com/xxx/yyy
demo: https://yyy.example.com
techStack: [Astro, TypeScript, Tailwind]
featured: true
order: 10
---

## 项目背景
...

## 技术亮点
...
```

### 4.2 `thoughts/<slug>.mdx`

```yaml
---
title: "On the Discipline of Restraint"
summary: "Why less is hard, and why we should keep trying."
date: 2026-05-24
category: frontend
tags: [design, philosophy]
---

正文……
```

---

## 5. Tags 治理

- 全站使用**统一 tag 池**（即将在 `data/tags.ts` 维护）
- 新增 tag 前需在 `data/tags.ts` 中登记（含 zh/en 显示名）
- ⛔ **禁止**重复语义的 tag（`ai` vs `AI` vs `ai-coding` —— 选一个）
- tag 数量建议 ≤ 5 / 条

---

## 6. Schema 实施位置

```
src/content/
  config.ts          # ⭐ 所有 collection 的 defineCollection
  projects/
  ai-insights/
  ai-mcp/
  ai-skills/
  ai-lab/
  thoughts/
  about/
```

`config.ts` 编写规则：

- 每个 collection 一个 `defineCollection`
- 字段命名与本文件**完全一致**
- 严格 `.refine()` 校验（如 `repo` 必须为合法 URL）

---

## 7. 演进与迁移

- 添加新字段：可选字段直接加；必填字段需提供默认值或迁移脚本
- 重命名字段：先标记 `@deprecated`，下个版本再移除
- 删除字段：必须经 RFC 论证

---

_第一版定稿于地基阶段，所有 collection 仅定义结构，未产出实际内容。_
