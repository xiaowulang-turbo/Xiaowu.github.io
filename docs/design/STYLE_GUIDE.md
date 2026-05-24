# STYLE GUIDE — 视觉风格宪法

> 这是 **Xiaowu.github.io** 视觉与交互的**最高准则**。
> 任何 UI 决策必须能引用本文件的具体条款。
> 本文件中标记 ⛔ 的红线条款不得违反。

---

## 0. 设计哲学

> **「留白是内容，克制是态度。」**
>
> 极简不是简陋，优雅不是装饰。
> 让信息呼吸，让交互无感，让风格经得起三年的审视。

### 三条核心信条

1. **平衡**：在「极简」与「优雅」之间走钢丝，不偏向任一极。
2. **克制**：每一处装饰都要回答「不加会更好吗？」
3. **经典**：选择十年后仍不会过时的方案，拒绝跟风潮流。

### 我们追求的氛围

- 像一份排印精美的杂志的封面
- 像 Linear 的官网那样冷静自信
- 像 Vercel 的字体处理那样有性格
- 像 paco.me 那样有编辑感而不浮夸

### 我们拒绝的氛围

- ⛔ Bootstrap 风（饱和蓝按钮、生硬阴影）
- ⛔ Saas 营销页风（渐变 hero、巨大 CTA、滑动产品截图）
- ⛔ 极客 Hack 风（终端绿、ASCII 装饰、CRT 滤镜）
- ⛔ 玻璃拟态 / 新拟态（noisy）
- ⛔ 卡通插画 / 表情包风
- ⛔ 任何"动效炫技"

---

## 1. 颜色系统 ⛔

### 1.1 颜色红线

- ⛔ **禁止**渐变色（linear / radial / conic）作为视觉装饰
- ⛔ **禁止**霓虹、荧光、糖果色
- ⛔ **禁止**多彩配色：除中性灰阶外，全站只允许出现**一种强调色**
- ⛔ **禁止**硬编码颜色值（`#xxxxxx` / `rgb()` / `hsl()`），所有颜色必须来自 `tokens.css`
- ⛔ **禁止**透明色叠加产生的"伪渐变"

### 1.2 颜色调色板（语义化）

| Token | 角色 | 使用场景 |
|---|---|---|
| `--color-bg` | 主背景 | `<body>` 默认背景 |
| `--color-bg-subtle` | 次背景 | 卡片、区块的轻微抬升 |
| `--color-bg-muted` | 静默背景 | 输入框、禁用区域、代码块 |
| `--color-border` | 默认边线 | 卡片、分隔线 |
| `--color-border-strong` | 强边线 | 强调分隔、focus ring 边线 |
| `--color-text` | 主正文 | 段落、按钮文字 |
| `--color-text-muted` | 次正文 | 描述、辅助说明 |
| `--color-text-subtle` | 静默文字 | caption、时间戳、tag |
| `--color-accent` | 强调色 | 主要 CTA、链接、当前激活态 |
| `--color-accent-hover` | 强调色悬浮 | 强调色的 hover/active |
| `--color-accent-soft` | 强调色软背景 | 强调色软底（如 tag、提示条） |
| `--color-accent-fg` | 强调色之上的前景 | 强调色按钮内的文字 |

具体取值见 [`DESIGN_TOKENS.md`](./DESIGN_TOKENS.md)。

### 1.3 强调色方针

- 当前强调色：**克制蓝**
  - Light: `#2563EB`（hover `#1D4ED8`）
  - Dark: `#60A5FA`（hover `#93C5FD`）
- 通过 token 一行替换即可全站切换
- 强调色每屏出现频率应**克制**：一屏内主要强调色块（按钮/链接/激活 tab）建议不超过 3~5 个

### 1.4 深浅模式对称设计

- 不简单"反转"，而是对称设计：暗色更深沉、亮色更纯净
- 暗色背景**不使用**纯黑 `#000`（视觉太硬），用 `#0A0A0A`
- 亮色背景**不使用**米色（偏暖），用纯白 `#FFFFFF`，让排印更"瑞士"
- 暗色下强调色**适当提亮**，保证对比度

---

## 2. 排版系统

### 2.1 字体策略

> 当前阶段：使用**系统字体栈**，性能最佳，等内容产出后再讨论自定义字体。
> 字体通过 CSS 变量抽象，未来可一行替换。

```
--font-sans:  ui-sans-serif, system-ui, -apple-system,
              "Segoe UI", "PingFang SC", "Hiragino Sans GB",
              "Microsoft YaHei", sans-serif;
--font-serif: ui-serif, Georgia, "Source Han Serif SC", serif;
--font-mono:  ui-monospace, "JetBrains Mono", "Fira Code",
              Menlo, Consolas, monospace;
```

未来候选自定义字体（**待讨论**，不要擅自接入）：
- Sans: Inter / Geist / IBM Plex Sans
- Serif: Newsreader / Source Serif / Fraunces
- 中文 Sans: 思源黑体 / OPPO Sans / HarmonyOS Sans
- 中文 Serif: 思源宋体 / 霞鹜文楷
- Mono: JetBrains Mono / Geist Mono / Berkeley Mono

### 2.2 字号阶梯（Type Scale）

```
H1   clamp(2.25rem, 4vw, 3rem)     weight 600   tracking -0.02em   line 1.15
H2   clamp(1.75rem, 3vw, 2.25rem)  weight 600   tracking -0.015em  line 1.2
H3   1.5rem                        weight 600   tracking -0.01em   line 1.3
H4   1.25rem                       weight 600                       line 1.35
Body 1rem                          weight 400                       line 1.7
Small 0.875rem                     weight 400                       line 1.6
Caption 0.8125rem                  weight 400   color: text-subtle  line 1.5
Code 0.9375rem                     family: var(--font-mono)
```

- 流式排版用 `clamp()` 适配视口
- 字号一律用 `rem`，**禁止**用 `px` 锁死（破坏用户系统字号偏好）
- 行高（line-height）数值**不带单位**

### 2.3 文字层级红线 ⛔

- ⛔ **禁止**把 H 标签当作样式工具滥用（H1 只用于页面主标题，每页**仅一个**）
- ⛔ **禁止**全大写连续中文段落
- ⛔ **禁止**正文 line-height < 1.6
- ⛔ **禁止**字距（letter-spacing）夸张到影响阅读

### 2.4 中英文混排

- 中英之间**自动**留有视觉空隙（通过 CSS `text-spacing-trim` + 排印习惯）
- 不在 MDX 源文中手动加空格
- 标点优先半角，引号根据内容语言自然使用

---

## 3. 间距与栅格

### 3.1 间距阶梯（4px grid）

```
1: 0.25rem (4px)    8: 2rem    (32px)
2: 0.5rem  (8px)   12: 3rem    (48px)
3: 0.75rem (12px)  16: 4rem    (64px)
4: 1rem    (16px)  24: 6rem    (96px)
6: 1.5rem  (24px)  32: 8rem   (128px)
```

- 所有 padding / margin / gap **必须**来自此阶梯
- ⛔ **禁止** `padding: 13px` 这类非阶梯值

### 3.2 容器宽度

- 主容器：`max-width: var(--container-max)` = 1200px
- 正文阅读区：`max-width: var(--prose-max)` = 680px（约 65ch，最佳阅读宽度）
- 全宽区域（hero 背景等）：`width: 100%`，但**内容**仍约束在主容器内

### 3.3 响应式断点

| 别名 | 起点 | 设备 |
|---|---|---|
| sm | 640px | 大手机 |
| md | 768px | 平板 |
| lg | 1024px | 小笔记本 |
| xl | 1280px | 标准桌面 |
| 2xl | 1536px | 大屏 |

- 移动优先：默认样式针对小屏，大屏用 `min-width` 媒体查询渐进增强
- ⛔ **禁止**桌面优先回退（避免性能与样式覆盖问题）

---

## 4. 圆角与阴影

### 4.1 圆角

```
--radius-sm:   4px    /* 小标签、徽章、键盘 kbd */
--radius:      8px    /* 默认：按钮、输入框 */
--radius-md:   12px   /* 卡片 */
--radius-lg:   16px   /* 大区块（如 hero 内卡） */
--radius-full: 9999px /* 仅头像、特殊语义（avatar / pill nav） */
```

- ⛔ **禁止**全圆角胶囊按钮（除非语义需要，如 pill nav）
- ⛔ **禁止**不同元素圆角混乱（按钮 8 / 卡片 12 / 标签 4 是约定，不要随意改）

### 4.2 阴影

```
/* 仅在悬浮、激活、聚焦态使用 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, .04);
--shadow:    0 1px 3px rgba(0, 0, 0, .04),
             0 4px 12px rgba(0, 0, 0, .04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, .06),
             0 12px 32px rgba(0, 0, 0, .04);
```

- 静态卡片**优先使用 1px 边线**而非阴影
- ⛔ **禁止**多层叠加阴影制造"漂浮"错觉
- 暗色模式下使用极轻的浅色阴影（或不用）

---

## 5. 动效系统

### 5.1 时长与缓动

```
--ease:        cubic-bezier(0.2, 0.8, 0.2, 1);  /* Apple-style */
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* 大区块入场 */
--ease-linear: linear;                          /* 进度条 */

--dur-fast:    150ms   /* 微交互（hover、focus） */
--dur-normal:  200ms   /* 标准（弹层显隐） */
--dur-slow:    300ms   /* 大区块切换上限 */
```

### 5.2 动效红线 ⛔

- ⛔ 时长 > 300ms（除非 `prefers-reduced-motion: no-preference` 下的入场动画）
- ⛔ rotate（图标语义除外，如 loading 转圈）
- ⛔ skew / 弹簧 / 视差 / 跑马灯 / 自动轮播
- ⛔ hover 缩放 > 1.05
- ⛔ 滚动驱动的过度动画（仅允许极轻的 fade-in / slide-up）
- 必须实现 `prefers-reduced-motion: reduce` 降级

### 5.3 允许的动效模式

- **Fade**: opacity 0→1（150~200ms）
- **Slide-up**: translateY(8px → 0) + fade（200ms，常用于内容入场）
- **Color transition**: hover/focus 颜色与边框（150ms）
- **Underline grow**: 链接下划线从 0 → 100%（200ms）
- **Theme switch**: html 的 `color-scheme` 切换 0ms（避免闪烁），元素颜色 200ms 过渡
- **View Transitions API**（未来）：跨路由的细微过渡

### 5.4 Reveal-on-scroll（页面级入场）

> 受控的渐进增强：模块进入视口时执行一次 fade-up 入场。

**统一规范**：

- 实现：`src/lib/reveal.ts` + `data-reveal` 属性 opt-in
- 仅 ≥ 模块级元素使用（如 `<section>`），**禁止**用于段落、按钮、单个组件
- 进入条件：元素进入视口下边缘 12% 时触发
- 一次性：进入后 `unobserve`，不做"出 → 入"循环
- 渐进增强：`<html>` 添加 `.js` class 后才启用过渡，无 JS 时元素立即可见
- 减弱动效（`prefers-reduced-motion: reduce`）下：直接显示，无过渡

**红线 ⛔**：

- ⛔ 不允许把 reveal 用于 hero 之类首屏元素（首屏内容必须立即可见）
- ⛔ 不允许在同一视口同时触发 ≥ 4 个 reveal（造成"涌入感"）
- ⛔ 不允许同一元素 reveal 触发后再次"消失"

**全局透明度**：

- 默认 `opacity: 0` + `translateY(12px)`
- 入场后：`opacity: 1` + `translateY(0)`
- 时长 `--dur-normal`（200ms），缓动 `--ease-out`

---

## 6. 焦点与可访问性

### 6.1 Focus Ring

- 所有可交互元素（按钮、链接、输入、tab）必须有清晰的 focus ring
- 标准：`outline: 2px solid var(--color-accent); outline-offset: 2px;`
- ⛔ **禁止** `outline: none` 而不提供替代焦点指示
- 鼠标点击与键盘 Tab 区分：使用 `:focus-visible`

### 6.2 对比度

- 正文与背景对比度 ≥ 4.5:1（WCAG AA）
- 大文字与背景对比度 ≥ 3:1
- 强调色作为前景时与背景对比度 ≥ 4.5:1（暗色模式下尤需注意）

### 6.3 语义化

- 使用语义化 HTML（`<nav>` `<main>` `<article>` `<aside>` `<footer>`）
- 图片必有 `alt`（装饰性图片用 `alt=""` 而非省略）
- 图标按钮必有 `aria-label`
- 跳转链接（"Skip to content"）：实现给键盘用户

### 6.4 用户偏好

支持以下系统级偏好：
- `prefers-color-scheme` —— 默认主题
- `prefers-reduced-motion` —— 关闭/弱化动画
- `prefers-reduced-transparency` —— 关闭透明叠层（如有）
- 浏览器字号缩放 —— 一切尺寸用 `rem` 才能跟随

---

## 7. 信息密度原则

### 7.1 单屏聚焦

- 每屏（每个视口高度）聚焦**一个主信息**
- 次要信息以折叠 / 锚点 / 分页提供，不要"塞满"
- 卡片网格的列数：sm 1 列，md 2 列，lg 3 列，**禁止** 4+ 列（除非极小卡片）

### 7.2 留白比例

- 主标题上下间距 ≥ 字号本身
- 段落之间间距 ≥ 1em（约一个 line-height）
- 区块之间间距 ≥ `--space-12`（48px），大区块之间 ≥ `--space-16`（64px）

### 7.3 拒绝堆砌

- 看到 hero 想加副标题、CTA、图片、引用——先问"删掉一个会更好吗"
- 看到卡片想加 5 个标签——先问"3 个最重要的是哪几个"
- 看到列表想加序号、icon、子标题——先问"裸列表是否已足够"

---

## 8. 组件设计原则

### 8.1 通用原则

- 所有组件状态完整：default / hover / active / focus / disabled / loading
- 所有组件支持深浅模式（通过 token 自动适配）
- 所有组件可被 className 扩展，但**不接受**任意内联 style 覆盖颜色/间距 token

### 8.2 按钮

三种语义：
- **Primary**：背景 = `--color-accent`，前景 = `--color-accent-fg`，圆角 8px
- **Secondary**：背景透明，1px 边线 = `--color-border`，文字 = `--color-text`
- **Ghost**：纯文字，hover 时浅背景 = `--color-bg-muted`

⛔ 禁止：四种以上的按钮变体；带渐变/阴影的"3D 按钮"。

### 8.3 链接

- 正文链接：颜色 = `--color-accent`，hover 显示下划线
- 导航链接：颜色 = `--color-text`，激活态用 `--color-accent` 或 1px 下边线
- 外链：自动加 `↗` 小图标，必带 `rel="noopener noreferrer"`

### 8.4 卡片

- 默认：1px 边线（`--color-border`），无阴影，圆角 `--radius-md`
- Hover（仅可点击卡片）：边线变为 `--color-border-strong`，可选轻微 `--shadow`
- 内边距：`--space-6` 起步

### 8.5 标签 / 徽章

- 高度 ≤ 24px，圆角 `--radius-sm`
- 浅色：背景 `--color-bg-muted`，文字 `--color-text-muted`
- 强调色：背景 `--color-accent-soft`，文字 `--color-accent`

### 8.6 输入框

- 高度 40px（对应 `--space-10`，新增 token）
- 1px 边线，focus 时边线变为 `--color-accent` 并叠加 focus ring
- ⛔ 禁止 placeholder 颜色过浅导致看不见

详细组件规范见 [`COMPONENT_PATTERNS.md`](./COMPONENT_PATTERNS.md)。

---

## 9. 图标

- 统一使用 **Lucide** 图标库
- 默认尺寸 16px / 20px / 24px（对应文字、按钮、图示）
- 描边宽度统一 1.5px
- ⛔ **禁止**混用 emoji 与图标
- ⛔ **禁止**装饰性图标过度（图标应辅助语义，不是装饰）

---

## 10. 图片与媒体

- 全部经 Astro `<Image />` 处理（自动 AVIF/WebP + 响应式）
- 默认 `loading="lazy"`，首屏关键图设为 `loading="eager"`
- 必须有 `alt`
- 圆角与卡片一致（默认 `--radius-md`）
- 详细规范见 [`../content/IMAGE_GUIDE.md`](../content/IMAGE_GUIDE.md)

---

## 11. 暗色模式专项

- 切换器位置：顶部导航右侧
- 三态：light / dark / system（系统）
- 持久化：`localStorage.theme`
- 防止 FOUC：在 `<head>` 中 inline 一段同步脚本，在 paint 前设置 `data-theme`
- 切换过渡：颜色相关属性 200ms 过渡，背景色避免闪烁

---

## 12. 性能与样式产物

- Tailwind v4 自动 tree-shake，未使用类不进 bundle
- 自定义 CSS 集中在 `tokens.css` / `globals.css` / `prose.css`
- ⛔ **禁止**组件文件中写 `<style>` 长样式块（>20 行）；该提取就提取
- ⛔ **禁止**第三方 CSS 全量引入（图标库、动画库 css 必须按需）

---

## 13. 例外与变更

- 本文件中标 ⛔ 的红线条款**不得违反**
- 其他建议（如颜色取值、字号、间距具体数值）的微调可在 RFC 中讨论
- 变更必须同步更新 `DESIGN_TOKENS.md`
- 重大风格变更必须经用户明确确认

---

_本文件随项目演进持续校准。第一版定稿于地基阶段。_
