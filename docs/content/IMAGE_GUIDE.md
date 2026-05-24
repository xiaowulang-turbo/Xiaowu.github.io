# IMAGE GUIDE — 图片规范

> 本文档定义本站所有图片资产的来源、尺寸、命名、处理规则。
> AI 生图的具体 prompt 库见 [`/prompts/images.md`](../../prompts/images.md)。

---

## 1. 来源策略

### 1.1 优先级

```
项目真实截图  >  AI 生成（统一风格）  >  图表/代码块替代  >  Unsplash（注明出处）
```

### 1.2 各类图片的标准来源

| 类型 | 来源 | 备注 |
|---|---|---|
| Logo / Favicon | AI 生成 + 人工微调 | 唯一性、版权干净 |
| Hero 主视觉 | AI 生成（统一 prompt） | 全站风格一致 |
| 板块插画 | AI 生成 | 同上 |
| 项目封面 | 优先项目真实截图 → 否则 AI 生成抽象封面 | 真实性优先 |
| 文章配图 | 能用图表/代码就不用图片 → AI 生成 → Unsplash | 性能 + 版权 |
| 截图 | 真实截图 | 不允许 AI 伪造 |
| 头像 | 抽象/卡通化/像素化 | ⛔ **禁止**真人照（隐私原则） |

### 1.3 ⛔ 禁止

- ⛔ 直接搜图保存（侵犯版权风险）
- ⛔ 复用其他网站的设计稿截图
- ⛔ 使用带水印图片
- ⛔ 任何含真人面孔的图片（即使经过模糊）

---

## 2. 视觉风格统一 Prompt

> 所有 AI 生图必须遵循此基础 prompt 框架，确保全站视觉一致性。

### 2.1 基础风格关键词

```
minimal, elegant, restrained, editorial,
black and white primary, single accent of muted blue,
flat geometric shapes, fine line work, generous negative space,
no people, no text, no logos, no gradients, no neon,
swiss design influence, calm composition,
muted desaturated palette, subtle grain optional
```

### 2.2 必须包含

- ✅ "minimal" / "restrained" / "elegant"
- ✅ "no gradients" / "no neon"
- ✅ "no text in image"（避免乱码文字）
- ✅ "no people" / "no faces"
- ✅ 黑白基调 + 单一克制蓝（如需配色）

### 2.3 禁止包含

- ⛔ "vibrant" / "colorful" / "neon"
- ⛔ "gradient" / "glassmorphism"
- ⛔ "3D render"（除非特定语义需要）
- ⛔ "cute" / "cartoon" / "kawaii"
- ⛔ "photorealistic portrait"

### 2.4 完整 prompt 库

详见 [`/prompts/images.md`](../../prompts/images.md)，每张正式入库的图片必须留档 prompt。

---

## 3. 尺寸规范

| 用途 | 推荐尺寸（src） | 输出 | 备注 |
|---|---|---|---|
| Favicon | 512×512 | 自动多尺寸 | SVG 优先 |
| Logo | SVG | — | 矢量 |
| OG / Twitter Card | 1200×630 | 同尺寸 | 由 `/og/` 自动生成 |
| Hero 主图 | 2400×1200 | 响应式 | 用 `<Image />` 自动 srcset |
| 项目封面 | 1600×900 (16:9) | 响应式 | |
| 文章配图（普通） | 1600×900 或 1600×1067 (3:2) | 响应式 | |
| Avatar / 个人标识 | 512×512 | 响应式 | 圆角 `--radius-md` 或 full |
| 内联截图 | 原始倍数 | 响应式 | 优先 PNG，UI 截图勿压缩过度 |

---

## 4. 文件命名

- **小写 kebab-case**：`hero-restraint.png`、`mcp-overview.svg`
- 不含日期（用 git 历史追踪）
- 不含中文（避免编码问题）
- 一图一用途；禁止 `image1.png`、`new.png` 这类无意义命名

---

## 5. 存放位置

```
src/assets/                 # 参与 Astro 构建优化（必走 <Image />）
├── hero/                   # Hero 主视觉
├── projects/<slug>/        # 项目相关
├── thoughts/<slug>/        # 文章相关
├── ai/                     # AI 板块插画
├── og/                     # OG image 模板素材
└── brand/                  # Logo / 个人标识

public/                     # 直出原路径（不参与优化）
├── favicon.svg
├── apple-touch-icon.png
├── robots.txt
└── ...
```

⛔ **禁止**把可优化图片放 `public/`（破坏性能）。

---

## 6. 处理与使用

### 6.1 必须使用 `<Image />` / `<Picture />`

```astro
---
import { Image } from "astro:assets";
import cover from "@/assets/projects/foo/cover.png";
---
<Image
  src={cover}
  alt="项目 Foo 的封面：抽象几何排版，黑白为主"
  widths={[480, 800, 1200, 1600]}
  sizes="(min-width: 1024px) 800px, 100vw"
  loading="lazy"
/>
```

### 6.2 alt 文本规则

- 描述图片**传达的信息**，不是图片**长什么样**
- 装饰性图片用 `alt=""`（不要省略 alt 属性）
- 不要以 "Image of..." / "图片：..." 开头

**好的 alt**
- "项目 Foo 的封面：用极简几何排版表达克制的设计哲学"

**不好的 alt**
- "封面图"、"图片"、"foo cover.png"

### 6.3 加载策略

- 首屏 hero / above-fold：`loading="eager"` + `fetchpriority="high"`
- 其他图片：`loading="lazy"`（默认）

### 6.4 格式

- Astro 自动产出 AVIF / WebP，原图保留 PNG / JPG
- SVG 图标优先内联（`<Icon>` 组件）；插画 SVG 走 `<Image />`

---

## 7. 性能预算

- 单张图片 src 不超过 1MB
- 单页面图片总大小（按响应式实际加载）≤ 800KB
- 超出时考虑：分页 / lazy / 替换为图表

---

## 8. 暗色模式

- 单色插画/SVG 优先用 `currentColor`，跟随主题
- 双色或彩色插画必须做暗色变体（同名加 `.dark` 后缀）
  - 例：`hero-restraint.png` + `hero-restraint.dark.png`
- 实现可用 `<picture>` + `prefers-color-scheme` 媒体查询

---

## 9. 版权与归属

- AI 生图：在 `prompts/images.md` 留 prompt，自动归属本站
- Unsplash / 其他：在文章末尾注明来源 + 摄影师
- ⛔ 不使用未明确授权的图

---

## 10. 自检清单

提交一张图片前自问：

- [ ] 风格符合 §2 基础 prompt？
- [ ] 命名遵循 §4？
- [ ] 放在正确目录（§5）？
- [ ] 使用 `<Image />`（§6.1）？
- [ ] 写了有信息量的 alt（§6.2）？
- [ ] 不含真人面孔 / 文字水印 / 渐变？
- [ ] 加载策略合理（§6.3）？
- [ ] 单图 ≤ 1MB（§7）？
- [ ] 暗色模式适配（§8）？
- [ ] prompt 已记入 `/prompts/images.md`（如为 AI 生图）？
