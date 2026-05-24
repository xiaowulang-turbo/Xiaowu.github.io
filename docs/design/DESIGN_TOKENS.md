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

## 5. 排版（Typography）

### 5.1 字体栈

```css
:root {
  --font-sans:
    ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", sans-serif;

  --font-serif:
    ui-serif, Georgia, Cambria, "Times New Roman",
    "Source Han Serif SC", "Noto Serif CJK SC", serif;

  --font-mono:
    ui-monospace, "JetBrains Mono", "Fira Code",
    "SF Mono", Menlo, Consolas, monospace;
}
```

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
