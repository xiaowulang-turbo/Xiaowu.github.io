# DESIGN TOKENS — 设计 token 清单

> 本文件是所有 CSS 变量的**唯一来源**。
> 实现文件 `src/styles/tokens.css` 必须与本文件保持完全一致。
> 任何 token 变更必须先在此文件登记，并同步到 `STYLE_GUIDE.md`。

---

## 1. 颜色（Colors）

### 1.1 Light Mode

```css
:root {
  /* —— 中性 / Neutral —— */
  --color-bg:            #FFFFFF;
  --color-bg-subtle:     #FAFAFA;   /* 卡片底色 */
  --color-bg-muted:      #F4F4F5;   /* 输入框、代码块底色、禁用 */

  --color-border:        #E4E4E7;
  --color-border-strong: #D4D4D8;

  --color-text:          #18181B;   /* 正文 */
  --color-text-muted:    #52525B;   /* 次正文、描述 */
  --color-text-subtle:   #A1A1AA;   /* caption、占位 */

  /* —— 强调色 / Accent — 克制蓝 —— */
  --color-accent:        #2563EB;
  --color-accent-hover:  #1D4ED8;
  --color-accent-soft:   #DBEAFE;   /* 软背景（提示条、tag） */
  --color-accent-fg:     #FFFFFF;   /* 强调色之上的前景 */

  /* —— 状态色（仅用于必要语义，不作装饰） —— */
  --color-success:       #16A34A;
  --color-warning:       #CA8A04;
  --color-danger:        #DC2626;

  /* —— 焦点环 —— */
  --color-focus-ring:    var(--color-accent);
}
```

### 1.2 Dark Mode

```css
:root[data-theme="dark"] {
  --color-bg:            #0A0A0A;
  --color-bg-subtle:     #111113;
  --color-bg-muted:      #1A1A1D;

  --color-border:        #27272A;
  --color-border-strong: #3F3F46;

  --color-text:          #FAFAFA;
  --color-text-muted:    #A1A1AA;
  --color-text-subtle:   #71717A;

  --color-accent:        #60A5FA;   /* 提亮以保持对比度 */
  --color-accent-hover:  #93C5FD;
  --color-accent-soft:   rgba(30, 58, 138, 0.25);
  --color-accent-fg:     #0A0A0A;

  --color-success:       #4ADE80;
  --color-warning:       #FACC15;
  --color-danger:        #F87171;
}
```

### 1.3 系统主题（默认跟随）

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* 同 dark mode 取值，省略 */
  }
}
```

---

## 2. 圆角（Radius）

```css
:root {
  --radius-sm:   4px;
  --radius:      8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-full: 9999px;
}
```

| Token | 用途 |
|---|---|
| `--radius-sm` | 标签、徽章、kbd |
| `--radius` | 按钮、输入框（默认） |
| `--radius-md` | 卡片、图片 |
| `--radius-lg` | 大区块、hero 内卡 |
| `--radius-full` | 头像、pill |

---

## 3. 间距（Spacing）—— 4px grid

```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px — 输入框/按钮高度 */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */
}
```

---

## 4. 容器宽度

```css
:root {
  --container-max: 1200px;
  --prose-max:     680px;   /* ~ 65ch，最佳阅读宽度 */
  --hero-max:      960px;
}
```

---

## 4.5 页头节奏（Page-head Rhythm）—— RFC-0007

> 站点首屏切 tab 时锚点稳定的关键。把首屏分两层：**Hero 层**（home + about）与
> **PageHead 层**（projects + ai + thoughts）。各自内部完全一致；两层之间是有规律的两档差。
>
> 所有取值均映射到现有 `--space-*` 与字号公式，**不引入新数值**。

```css
:root {
  /* —— Hero 节奏（home + about 共享） —— */
  --hero-pad-top:    var(--space-32);             /* 128px */
  --hero-pad-bottom: var(--space-16);             /*  64px */
  --hero-display:    clamp(3rem, 7vw, 5rem);      /*  48 → 80 */
  --hero-content-max: var(--prose-max);           /* 680px：与 PageHead 同宽，五页左缘对齐 */
  --hero-mb-eyebrow:  var(--space-8);             /*  32px：eyebrow → H1 距离，home + about 共用 */

  /* —— PageHead 节奏（projects + ai + thoughts 共享） —— */
  --pagehead-pad-top:    var(--space-24);         /*  96px */
  --pagehead-pad-bottom: var(--space-8);          /*  32px */
  --pagehead-mb-title:   var(--space-6);          /*  24px */
}
```

| Token | 用途 |
|---|---|
| `--hero-pad-top` | Hero `padding-block-start`（home + about 一致；about 不再叠 `18vh` clamp） |
| `--hero-pad-bottom` | Hero `padding-block-end` |
| `--hero-display` | Hero `<h1>` 的 `font-size`（home + about 一致） |
| `--hero-content-max` | Hero 内容容器（`.hero-inner`）`max-width`，与 PageHead 共用 `--prose-max`，五页左缘统一锚定 |
| `--hero-mb-eyebrow` | Hero 内 `.eyebrow` 的 `margin-bottom`（home + about 一致），承担"顶部 → H1"纵向锚点 |
| `--pagehead-pad-top` | `<PageHead>` `padding-block-start` |
| `--pagehead-pad-bottom` | `<PageHead>` `padding-block-end` |
| `--pagehead-mb-title` | `<PageHead>` 内 title → intro 间距 |

> **不要**为 `<PageHead>` 的 `<h1>` 字号建独立 token：直接继承 globals.css 的 `h1 { font-size: var(--text-h1); }`，保持单一来源。

---

## 5. 排版（Typography）

### 5.1 字体栈

> 已选型 — 详见 [`../rfcs/0008-fonts-strategy.md`](../rfcs/0008-fonts-strategy.md)。
> 西文走自托管 web 字体（Astro experimental.fonts），中文走系统栈。

```css
:root {
  /* 西文优先 → 系统西文兜底 → 系统中文兜底（Windows 思源 > 雅黑） */
  --font-sans:
    var(--font-inter, ""),
    ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang SC", "Hiragino Sans GB",
    "Source Han Sans SC", "Source Han Sans CN", "Noto Sans CJK SC",
    "Microsoft YaHei",
    sans-serif;

  /* Serif：v1 不主动使用，预留给未来长文 */
  --font-serif:
    ui-serif, Georgia, Cambria, "Times New Roman",
    "Source Han Serif SC", "Noto Serif CJK SC", serif;

  /* 等宽：连字在 globals.css 中通过 font-variant-ligatures: none 关闭 */
  --font-mono:
    var(--font-jetbrains-mono, ""),
    ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
```

| Web 字体 | CSS 变量 | 字重 | 字符集 | 加载 |
|---|---|---|---|---|
| Inter Variable | `--font-inter` | 400/500/600/700 | latin + latin-ext | preload，首屏即用 |
| JetBrains Mono Variable | `--font-jetbrains-mono` | 400/500/700 | latin | 不 preload，懒加载 |

**关键设计**：
1. `var(--font-inter, "")` 的空字符串 fallback 让"Astro fonts 启用前 / 加载失败"窗口期自动跳到下一项（system-ui），不会出现非法的 `font-family: , …` 整条声明被忽略。
2. **Windows 中文优先序**：`Source Han Sans SC` / `Source Han Sans CN` 在 `Microsoft YaHei` **之前**——装了思源的 Windows 用户优先看思源，没装的透明退回微软雅黑（仓库主人偏好）。
3. **不引入任何 CJK web 字体**（避免 5MB+ 单文件破坏 LCP 预算）。


### 5.2 字号

```css
:root {
  --fs-h1:      clamp(2.25rem, 4vw,  3rem);     /* 36 → 48 */
  --fs-h2:      clamp(1.75rem, 3vw,  2.25rem);  /* 28 → 36 */
  --fs-h3:      1.5rem;     /* 24 */
  --fs-h4:      1.25rem;    /* 20 */
  --fs-body:    1rem;       /* 16 */
  --fs-small:   0.875rem;   /* 14 */
  --fs-caption: 0.8125rem;  /* 13 */
  --fs-code:    0.9375rem;  /* 15 */
}
```

### 5.3 字重

```css
:root {
  --fw-normal:   400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;
}
```

### 5.4 行高与字距

```css
:root {
  --lh-tight:   1.2;
  --lh-snug:    1.4;
  --lh-normal:  1.6;
  --lh-relaxed: 1.7;   /* 正文 */
  --lh-loose:   1.85;

  --tracking-tight:  -0.02em;
  --tracking-snug:   -0.01em;
  --tracking-normal: 0;
  --tracking-wide:   0.02em;
}
```

---

## 6. 阴影（Shadow）

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow:    0 1px 3px rgba(0, 0, 0, 0.04),
               0 4px 12px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06),
               0 12px 32px rgba(0, 0, 0, 0.04);
}

:root[data-theme="dark"] {
  /* 暗色模式：阴影几乎不可见，依赖边线区分层次 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow:    0 1px 3px rgba(0, 0, 0, 0.4),
               0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5),
               0 12px 32px rgba(0, 0, 0, 0.4);
}
```

---

## 7. 动效（Motion）

```css
:root {
  --ease:        cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-linear: linear;

  --dur-instant: 0ms;
  --dur-fast:    150ms;
  --dur-normal:  200ms;
  --dur-slow:    300ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-fast:   0.01ms;
    --dur-normal: 0.01ms;
    --dur-slow:   0.01ms;
  }
}
```

---

## 8. Z-index 层级

```css
:root {
  --z-base:     0;
  --z-dropdown: 10;
  --z-sticky:   20;     /* 顶部导航 */
  --z-overlay:  30;     /* 半透明遮罩 */
  --z-modal:    40;     /* 弹窗 */
  --z-toast:    50;     /* 通知 */
  --z-tooltip:  60;
}
```

---

## 9. 断点（仅供参考；Tailwind 默认即可）

| 别名 | 起点 |
|---|---|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## 10. Tailwind v4 集成

> Tailwind v4 通过 `@theme` 在 CSS 中定义 token，与本文件**单一来源**。

`src/styles/tokens.css`（实现文件，最终代码）应类似：

```css
@import "tailwindcss";

@theme {
  /* —— 颜色 —— */
  --color-bg:            #FFFFFF;
  --color-bg-subtle:     #FAFAFA;
  /* ...（与本文件 §1.1 同步） */

  /* —— 圆角 —— */
  --radius-sm:   4px;
  --radius:      8px;
  --radius-md:   12px;
  --radius-lg:   16px;

  /* —— 间距、字号、字体... —— */
}

:root[data-theme="dark"] {
  /* 覆盖暗色取值（§1.2） */
}
```

> 实施时由 RFC `0001-project-bootstrap` 落地。

---

## 11. 命名规则

- **语义命名**：使用 `text-muted` 而非 `gray-500`
- **不引入**色阶 token（`gray-100` ~ `gray-900`），全部走语义 token
- **强调色**只暴露 4 个：`accent` / `accent-hover` / `accent-soft` / `accent-fg`
- 新增 token 必须有清晰语义且复用 ≥ 2 处

---

## 12. 变更记录

| 日期 | 版本 | 变更 |
|---|---|---|
| v0.1 | 地基 | 初始定稿 |
| v0.6 | RFC-0007 | 新增 §4.5「页头节奏」：`--hero-pad-top/-bottom/--hero-display` 与 `--pagehead-pad-top/-bottom/--mb-title` 共 6 个语义 token |
| v0.6.1 | RFC-0007 patch | §4.5 增 `--hero-content-max`（= `--prose-max`），统一 home / about 的 `.hero-inner` 宽度，使五页首屏左缘锚点一致；同步移除 about 的 `clamp(...,18vh,14rem)` 顶 padding 例外 |
| v0.6.2 | RFC-0007 patch | §4.5 增 `--hero-mb-eyebrow`（= `--space-8`），统一 home / about 的 `.eyebrow → H1` 间距（about 由 48px 收紧到 32px），消除切 tab 时 H1 的纵向跳跃 |
| v0.7 | RFC-0008 | §5.1 字体栈接入 Inter / JetBrains Mono web 字体（自托管）；Windows 中文优先序改为「思源 > 雅黑」 |
