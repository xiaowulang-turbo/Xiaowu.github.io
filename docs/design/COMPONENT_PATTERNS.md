# COMPONENT PATTERNS — 组件标准模式

> 本文件定义所有可复用组件的**标准模式**。
> 任何新组件实现前必须先在此登记 API 与变体；实现后回填代码片段。
>
> 本文件当前为 **骨架阶段**：列出组件清单与 API 约定，具体 markup 在组件落地时回填。

---

## 1. 分层与命名

```
primitives/   # 原子（无业务、无副作用）
ui/           # 复合（多个 primitives + 状态）
sections/     # 页面级区块
```

- 文件名 PascalCase：`Button.astro` / `ProjectCard.astro`
- 不导出多个组件于一文件
- props 定义放文件顶部 `interface Props { ... }`

---

## 2. Primitives（原子组件）

### 2.1 `<Button>`

**变体**：`primary` | `secondary` | `ghost`
**尺寸**：`sm` | `md`（默认）| `lg`
**状态**：default / hover / active / focus / disabled / loading

**Props**：
```ts
interface Props {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;          // 提供则渲染 <a>
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ...;
  iconRight?: ...;
  class?: string;
}
```

**约束**：
- 高度对应 `--space-8 / --space-10 / --space-12`
- 圆角 `--radius`
- 过渡 `--dur-fast` 颜色与边框
- 焦点环遵循 §6.1

### 2.2 `<Link>`

**Props**：
```ts
interface Props {
  href: string;
  external?: boolean;     // 自动加 rel="noopener noreferrer" + target="_blank" + ↗ 图标
  underline?: "auto" | "always" | "hover" | "none";  // 默认 hover
}
```

### 2.3 `<Tag>`

**变体**：`neutral`（默认）| `accent`
**Props**：
```ts
interface Props {
  variant?: "neutral" | "accent";
  size?: "sm" | "md";
  href?: string;          // 可点击 tag
}
```

### 2.4 `<Icon>`

- 基于 Lucide
- **Props**：`name` | `size?` | `strokeWidth?`（默认 1.5）

### 2.5 `<Kbd>`

- 显示键盘按键（如 `⌘K`）
- 圆角 `--radius-sm`，背景 `--color-bg-muted`，1px 边线

---

## 3. UI（复合组件）

### 3.1 `<Card>`

**Props**：
```ts
interface Props {
  href?: string;          // 提供则整卡可点击
  hoverable?: boolean;    // 默认与 href 联动
}
```

**结构**：
```
<article class="card">
  <header />     <!-- 可选：封面 -->
  <div class="card-body">
    <slot />
  </div>
  <footer />     <!-- 可选：tag、时间 -->
</article>
```

### 3.2 `<Nav>`

- 顶部主导航
- 桌面：水平菜单 + 主题切换器
- 移动：汉堡菜单（点击展开抽屉）
- 当前路由高亮：`--color-accent` 或 1px 下边线

### 3.3 `<Footer>`

- 单行：左侧 © Xiaowu / Kirito，中间 social links，右侧 build hash
- 留白充足，不堆砌"友情链接"等

### 3.4 `<ThemeToggle>`

- 三态切换：light / dark / system（图标依次 sun / moon / monitor）
- 圆形按钮，仅图标
- aria-label 必须

### 3.5 `<SearchTrigger>`（v1.x 启用，先占位）

- 触发按钮：`<Kbd>/</Kbd>` 提示
- 弹层组件 `<SearchPalette>` 后期接入 Pagefind

### 3.6 `<TOC>`（文章目录）

- 桌面端右侧固定，移动端折叠
- 当前阅读位置高亮（IntersectionObserver）

### 3.7 `<Pagination>` / `<TagFilter>`

- Pagination：列表页分页（≤8 页直出，>8 用省略）
- TagFilter：客户端筛选，URL 同步 `?tag=`

---

## 4. Sections（页面级区块）

### 4.1 `<Hero>`（首页）

- 一行大字 + 一行 tagline + 1~2 个 CTA
- ⛔ 禁止背景图、渐变、装饰插画

### 4.2 `<FeaturedProjects>`

- 1 行 ≤ 3 张项目卡（`featured: true`）
- 标题 + "查看全部 →" 链接

### 4.3 `<LatestThoughts>`

- 跨 `thoughts` + `ai-insights` 的最新 3 条
- 极简列表样式：日期 / 标题 / 一句摘要

### 4.4 `<AboutTabs>` / `<AboutAside>`

- About 页的侧边锚点导航
- 滚动时高亮当前节

### 4.5 `<ProjectGrid>` / `<ProjectDetailHeader>`

### 4.6 `<AIHub>`（AI 板块入口）

- 4 个子板块入口卡（Insights / MCP / Skills / Lab）

### 4.7 `<ThoughtList>` / `<ThoughtCategoryGroup>`

---

## 5. 通用规范

### 5.1 Props 默认值

- 所有可选 props 必须有合理默认值
- 默认值与最常见用法保持一致

### 5.2 Slot 设计

- 优先使用具名 slot（`header` / `footer` / `aside`）
- 默认 slot 用于主内容

### 5.3 状态视觉一致

- 所有可交互组件覆盖 6 状态：default / hover / active / focus / disabled / loading
- focus 状态使用 `:focus-visible`，不影响鼠标点击

### 5.4 国际化

- 组件内的可见文案**禁止硬编码**（使用 `i18n/zh.ts` 字典）
- 例外：开发占位（标记 TODO）

### 5.5 性能

- 仅有交互逻辑的组件标 `client:visible` 或更细的 directive
- ⛔ 禁止全局 `client:load`

---

## 6. 实施流程

每个组件落地遵循：

1. 在本文档登记 API（已完成则跳过）
2. 在 `STYLE_GUIDE.md` 引用相关条款
3. 实现 `.astro` 文件
4. 写一个最小使用示例（页面或 stories 文件）
5. 完成后回填本文档的 markup 片段

---

_首次落地组件时，将本文件从骨架升级为完整规范。_
