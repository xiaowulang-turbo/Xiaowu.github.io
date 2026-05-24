# Image Prompt Library

> 本文档是所有 AI 生成图片的 **prompt 留档**。
> 每张正式入库的图片必须在此登记 prompt，保证风格可复刻、可迭代。
>
> 配套规范见 [`docs/content/IMAGE_GUIDE.md`](../docs/content/IMAGE_GUIDE.md)。

---

## 0. 基础风格 Prompt（Base Style）

> 所有图片都从此基础上扩展。新建图片 prompt 时**复制这段然后追加细节**。

```
Style:
  minimal, elegant, restrained, editorial,
  black and white as primary palette,
  optional single accent of muted blue (#2563EB or its tints),
  flat geometric composition,
  fine line work,
  generous negative space,
  swiss design influence,
  calm and quiet atmosphere,
  subtle paper grain optional.

Forbidden:
  no people, no faces, no hands,
  no text, no letters, no logos, no watermarks,
  no gradients, no neon, no glow,
  no glassmorphism, no 3D render,
  no cute, no cartoon, no kawaii,
  no vibrant colors, no rainbow,
  no photorealistic portraits.

Composition:
  centered or rule-of-thirds,
  high contrast between elements,
  clear visual hierarchy,
  ample padding around subject.

Output:
  flat illustration or abstract geometric,
  square or 16:9 unless specified,
  high resolution,
  print-quality.
```

---

## 1. 命名与登记规则

每张图片在本文件添加一条记录，结构如下：

```markdown
### IMG-NNN: <slug>

- **Path**: `src/assets/.../<file>.png`
- **Use**: 用途说明（哪个页面 / 哪个组件 / 哪篇文章）
- **Generator**: 工具名（如 `image_gen` / `Midjourney` / `DALL-E`）
- **Date**: YYYY-MM-DD
- **Variant**: light / dark / both

**Prompt**:
\`\`\`
<完整 prompt>
\`\`\`

**Notes**: 生成迭代记录、最终选用第几版、人工修改说明
```

`NNN` 三位数字递增（IMG-001, IMG-002, ...）。

---

## 2. 已登记图片

> 当前阶段尚无图片。下面预留几条**待生成**的图片占位，作为后续工作清单。

### 🔲 IMG-001: site-favicon

- **Path**: `public/favicon.svg`
- **Use**: 浏览器标签 favicon
- **Status**: TODO（未生成）
- **Variant**: 单色 SVG，亮暗模式自适应（用 `currentColor`）

**Prompt（draft）**:
```
A minimal monogram-like geometric mark.
Inspired by the letters "X" (Xiaowu) and "K" (Kirito) interlocking subtly.
Pure black on transparent background.
Flat, geometric, no gradients, no shadows.
Final output as a clean SVG, balanced inside a square viewport.
The mark should remain readable at 16x16 px.
```

**Notes**: 生成多版后由用户挑选；最终需手工 SVG 优化（路径合并、viewBox 居中）。

---

### 🔲 IMG-002: home-hero-visual

- **Path**: `src/assets/hero/home-hero.png`（如需图）
- **Use**: 首页 hero 区背景或装饰（**待定**：是否需要图，可能纯文字 hero 更克制）
- **Status**: TODO / 可能不需要

**Prompt（draft）**:
```
{Base Style}

Subject:
  An abstract minimal composition representing "restraint" and "clarity".
  Two intersecting thin lines forming a quiet geometric grid.
  A single small filled circle in muted blue placed off-center.
  Predominantly white space (or near-white #FAFAFA).

Mood: calm, contemplative, editorial.
Aspect: 16:9, suitable as desktop hero background.
```

**Notes**: 评估是否真的需要 hero 图——可能裸文字更符合「克制」哲学。

---

### 🔲 IMG-003: ai-section-illustration

- **Path**: `src/assets/ai/hub-illustration.png`
- **Use**: AI 板块入口页插画
- **Status**: TODO

**Prompt（draft）**:
```
{Base Style}

Subject:
  A minimal abstract diagram suggesting "agent collaboration":
  three small geometric nodes (circle, square, triangle) in fine black lines,
  connected by thin lines, with one node subtly highlighted in muted blue.
  Background pure white.

Composition: centered, lots of breathing room.
Aspect: 4:3.
```

---

### 🔲 IMG-004: thoughts-section-illustration

- **Path**: `src/assets/thoughts/section-illustration.png`
- **Use**: Thoughts 板块入口插画
- **Status**: TODO

**Prompt（draft）**:
```
{Base Style}

Subject:
  An abstract representation of "thinking through writing":
  a horizontal line that subtly bends and reconnects,
  evoking a manuscript margin or typographic ruler.
  A single small dot of muted blue indicates focus.
  Plenty of negative space.

Aspect: 16:9.
```

---

## 3. Prompt 编写指南

写新 prompt 时按此顺序组织：

1. **Style block**（粘贴 §0 Base Style）
2. **Subject**：1~3 句描述主体
3. **Composition**：构图（居中 / 三分 / 横竖）
4. **Mood**：情绪（calm / contemplative / focused...）
5. **Aspect**：宽高比 / 用途尺寸
6. **Variants**：是否需要亮暗版本

---

## 4. 风格回顾（Periodic Review）

每 3 个月或风格出现漂移时：

- 检查现有图片是否仍符合基础 prompt
- 必要时更新 §0 Base Style
- 关键图（favicon / logo / hero）尽量稳定，不轻易迭代

---

## 5. 工具偏好

- 优先使用 IDE 内建 `image_gen`（Hunyuan / 同类模型）
- 复杂矢量需求转 SVG，必要时人工绘制或工具如 Figma 导出
- 真实照片需求（少见）从 Unsplash 选取，注明出处

---

_所有图片版权与许可见 LICENSE。AI 生成图归本站作者所有。_
