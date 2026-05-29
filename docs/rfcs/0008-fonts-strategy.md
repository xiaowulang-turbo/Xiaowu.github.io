# RFC-0008: Fonts Strategy（字体策略与接入）

| Field | Value |
|---|---|
| Status | **Implemented** |
| Author | Xiaowu (with AI assistance: CodeBuddy) |
| Created | 2026-05-29 |
| Last Updated | 2026-05-29 |
| Related Docs | `AGENTS.md` §1 / §3 / §4.2 · `STYLE_GUIDE.md` §0 / §2.1 · `DESIGN_TOKENS.md` §5.1 · `ARCHITECTURE.md` §7.1 / §9 · `tokens.css` |
| Related Issues / PRs | — |

> **编号说明**：本 RFC 最初拟号 `0007`，与已存在的 `0007-hero-pagehead-unification.md` 冲突，
> 落地时改为 `0008`。文中"RFC-0007 / RFC-0008"如有出入以本表头为准。

---

## 1. Background（背景）

项目从地基阶段（v0.1）起就在 `tokens.css` 与 `STYLE_GUIDE.md §2.1` 预留了字体切换条件：

- `--font-sans` / `--font-serif` / `--font-mono` 已是 token，仅指向**系统字体回退链**，从未真正加载任何 web 字体。
- `STYLE_GUIDE §2.1` 表头标注「待讨论：是否引入 Inter / Geist / IBM Plex 等替代品」。

**不做会怎样？**
- 不同操作系统的访客看到的"Xiaowu's portal"长得不一样（macOS 的 SF Pro vs Windows 的 Segoe UI）—— 视觉一致性受损。
- "极简 × 优雅"的品牌感依赖**字形层面的克制**，而 system-ui 在不同平台的表现是无法控制的变量。
- 项目主人已明确"是时候考虑字体切换了"。

**做了之后能解决什么？**
- 全平台西文渲染统一为同一套字形，强化「克制蓝 + 留白 + 单字体家族」的品牌识别度。
- 把 `--font-sans` / `--font-mono` 从"模糊回退链"升级为"明确指定 + 系统兜底"。
- 同时保留中文走系统栈这条**主动、克制**的路径（详见 §4.2）。

---

## 2. Goals（目标）

1. 引入 **Inter**（西文 Sans）+ **JetBrains Mono**（等宽）两套 web 字体，自托管、构建期子集化、零运行时新依赖（仅 Astro 内置）。
2. 中文继续走系统字体栈，但调整 Windows 优先序：**思源黑体 > 微软雅黑**（用户偏好）。
3. 更新 `tokens.css` 字体栈、`astro.config.ts` fonts 声明、`BaseLayout.astro` `<Font>` 注入；同步更新 `STYLE_GUIDE.md §2.1`、`DESIGN_TOKENS.md §5.1`、`ARCHITECTURE.md §9`。
4. 性能预算守住 `ARCHITECTURE.md §9`：CSS gzip < 20KB、CLS < 0.05、首屏 LCP < 2s（4G）。
5. 隐私守住 `AGENTS.md §1`：不引入任何把访客信息泄漏给第三方域名的字体加载方式。

---

## 3. Non-Goals（非目标）

- ❌ **不引入西文 Serif**（Newsreader / Source Serif / etc）。理由：v1 只用一种西文字形，做不出层级再考虑（`§2.4.2 少 > 多`）。
- ❌ **不引入任何中文 web 字体**（思源黑体 / 霞鹜文楷 / 鸿蒙 / 等）。理由：单文件 5MB+ 严重超预算；CJK 自动子集化在 Astro Fonts API 不支持；与 v1 阶段（无长文）不匹配。
- ❌ **不接入 Google Fonts CDN / 字体家 / Bunny Fonts** 等远程加载。理由：隐私（`§1.5`）+ 国内可达性 + CLS 风险（详见 §5）。
- ❌ **不为字体加任何动效 / 交互**（如 hover 切换字重）。
- ❌ **不重写已有组件的 `font-family`**（沿用 `--font-sans` / `--font-mono` token，组件无需感知）。
- ❌ **不改 `package.json#author`、`SITE` 等元数据**（属署名规则范围，非本 RFC）。

---

## 4. Proposal（方案）

### 4.1 总体设计

```
        ┌──────────────────────────────────────────────────────┐
        │  astro.config.ts · experimental.fonts                │
        │   ├─ Inter           (400/500/600/700, latin+ext)    │
        │   └─ JetBrains Mono  (400/500/700,    latin)         │
        │            │                                          │
        │            ▼  构建期：下载 → 子集化 → 写入 dist/_astro│
        │  BaseLayout.astro · <Font cssVariable=… preload />   │
        │            │                                          │
        │            ▼  注入 @font-face + preload + size-adjust │
        │  tokens.css · --font-sans / --font-mono              │
        │   ├─ var(--font-inter), …西文备份, …中文系统栈        │
        │   └─ var(--font-jetbrains-mono), …等宽备份           │
        └──────────────────────────────────────────────────────┘
                              │
                              ▼  无 JS 运行时；构建期一次性完成
                       页面只通过 CSS token 引用，组件零感知
```

### 4.2 关键决策

| 决策点 | 选项 | 选择 | 理由 |
|---|---|---|---|
| 加载方式 | A·CDN（Google/Bunny）/ B·Fontsource npm / **C·Astro 内置** | **C** | 隐私（无第三方域名）+ 国内可达（Vercel CDN）+ 自动子集化与 preload + 零新增 npm 依赖 |
| Astro fonts provider | `google()` / **`bunny()`** / `local()` | **`bunny()`** | 实施时发现 `google()` 在中国大陆访问 `fonts.google.com/metadata/fonts` 超时，导致本地 build 失败；`bunny()` 行为完全一致（构建期下载、运行时自托管），但元数据接口在双端可达 |
| 西文 Sans | Inter / Geist / IBM Plex Sans | **Inter** | 中性、克制、超广基础设施认证（GitHub / Vercel / Linear / Notion 系），变量字体覆盖所有 token 字重 |
| 西文 Serif | Newsreader / Source Serif / **不引入** | **不引入** | `§2.4.2 少 > 多`：v1 阶段只用一种字形做层级，未来需要再加；现在引入 + 删除成本不对称 |
| 等宽 | JetBrains Mono / Geist Mono / IBM Plex Mono / Fira Code | **JetBrains Mono Variable** | 与既有 fallback 链连续；为代码与"数据感"细节（编号、年份、日期）设计；**禁用连字**避免 `=>` 合并干扰阅读 |
| 中文（CJK） | 系统栈 / 思源黑体远程 / 霞鹜文楷 | **系统栈** | 远程加载 5MB+ 直接破坏 LCP 预算；系统栈让"每个用户看到自己最熟悉的中文"，反而克制 |
| 中文 Windows 优先序 | 微软雅黑优先 / **思源黑体优先** | **思源黑体优先** | 用户偏好；思源比微软雅黑更接近 macOS 的 PingFang 视感，Windows 用户若装了思源就能与 macOS 用户字形几乎对齐 |
| 字重集 | 全字重 / 选择性子集 | **400/500/600/700** | 完全对齐 `--font-weight-*` 四档 token；不多不少；变量字体技术上一个文件涵盖 |
| 字符集 | 全字符 / 仅 latin / **latin + latin-ext** | **latin + latin-ext** | 覆盖德语 / 法语等欧洲语言变音字符（极少用但开销极小，约 +5KB）；中文不在 web 字体范围内（走系统） |
| Mono 连字 | 启用 / **禁用** | **禁用**（`font-variant-ligatures: none`） | 博客的日期 `2026-05-29` 与编号 `001` 不需要 IDE 风格的 `=>` 合并；连字反而干扰阅读 |
| 字体显示策略 | block / **swap** / fallback | **swap**（Astro 默认） | 先用系统字体渲染，加载完无缝替换；与 `--font-sans` 链中的系统字体配合，用户从首帧就有可读内容 |

### 4.3 最终字体栈（更新后）

`tokens.css` 字体栈三条会变为：

```css
/* 西文优先 → 系统西文兜底 → 系统中文兜底（思源优先于微软雅黑） */
--font-sans:
  var(--font-inter, ""),
  ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
  "PingFang SC", "Hiragino Sans GB",
  "Source Han Sans SC", "Source Han Sans CN", "Noto Sans CJK SC",
  "Microsoft YaHei",
  sans-serif;

/* Serif 保留但 v1 不主动使用 —— 预留给未来长文 */
--font-serif:
  ui-serif, Georgia, Cambria, "Times New Roman",
  "Source Han Serif SC", "Noto Serif CJK SC",
  serif;

/* 等宽优先 → 系统等宽兜底（中文场景下浏览器会自动 fallback 到系统中文 sans，无需额外列出） */
--font-mono:
  var(--font-jetbrains-mono, ""),
  ui-monospace, "SF Mono", Menlo, Consolas,
  monospace;
```

**关键设计**：
1. `var(--font-inter, "")` 的空 fallback 让"未加载完成 / Astro fonts 未启用"的窗口期自动跳到下一项（system-ui），不会出现 `font-family: ,…` 的语法错误（CSS 会忽略整条）。
2. Windows 中文优先序：`Source Han Sans SC` / `Source Han Sans CN` 在 `Microsoft YaHei` **之前** —— 装了思源的 Windows 用户优先看思源，没装的退回微软雅黑。
3. macOS 仍优先 `PingFang SC`（思源在 macOS 上不是默认，PingFang 字形质量足够好，无需切换）。
4. Linux 仍优先 `Noto Sans CJK SC`（多数发行版默认）。

### 4.4 实施步骤

1. **`astro.config.ts`**：在 `defineConfig` 中追加 `experimental.fonts`：
   ```ts
   import { fontProviders } from "astro/config";

   experimental: {
     fonts: [
       {
         provider: fontProviders.google(),
         name: "Inter",
         cssVariable: "--font-inter",
         weights: ["400", "500", "600", "700"],
         styles: ["normal"],
         subsets: ["latin", "latin-ext"],
         fallbacks: ["ui-sans-serif", "system-ui"],
       },
       {
         provider: fontProviders.google(),
         name: "JetBrains Mono",
         cssVariable: "--font-jetbrains-mono",
         weights: ["400", "500", "700"],
         styles: ["normal"],
         subsets: ["latin"],
         fallbacks: ["ui-monospace", "monospace"],
       },
     ],
   }
   ```
   > 注：`fontProviders.google()` 是 Astro 5 内置 provider，构建期下载，**运行时不接 Google 任何域名**——产物完全自托管在 Vercel CDN。
   > 若 Astro 版本所在期已把 `experimental.fonts` 升为稳定顶层 `fonts`，按当时官方文档调整字段路径，配置内容完全相同。

2. **`BaseLayout.astro`**：在 `<head>` 引入 `<Font>` 组件：
   ```astro
   ---
   import { Font } from "astro:assets";  // 或 astro:fonts，依实际版本
   ---
   <head>
     ...
     <Font cssVariable="--font-inter" preload />
     <Font cssVariable="--font-jetbrains-mono" />
   </head>
   ```
   仅对 `--font-inter` `preload`（最高频，首屏即用）；Mono 不 preload（仅 footer/数据细节用，可懒加载）。

3. **`tokens.css`**：替换 §字体栈三条为 §4.3 所列内容。

4. **`globals.css`**：在 `code, kbd, pre, samp` 选择器下追加：
   ```css
   font-variant-ligatures: none;
   font-feature-settings: "liga" 0, "calt" 0;
   ```
   关闭 JetBrains Mono 默认连字，避免日期/编号被合并。

5. **同步更新文档**：
   - `STYLE_GUIDE.md §2.1`：把"待讨论"清单替换为"已选型：Inter（西文）+ 系统中文栈 + JetBrains Mono"，附本 RFC 链接与决策时间。
   - `DESIGN_TOKENS.md §5.1`：把字体栈表格更新为 §4.3 的最终值，标注"中文 Windows 优先序"。
   - `ARCHITECTURE.md §9`：在性能预算附近补一行"web 字体：Inter Variable + JetBrains Mono Variable，自托管，构建期子集化"。
   - `ARCHITECTURE.md §7.1`：本期**不新增** pnpm `allowBuilds` 条目（Astro fonts 不引入新原生构建依赖）。若实测发现 lockfile 触发新依赖构建，再按既有规则补。

6. **校验**：本地 `rm -rf node_modules dist && pnpm install --frozen-lockfile && pnpm build`：
   - `dist/_astro/` 应出现 4–6 个 woff2 文件（Inter 4 字重 + Mono 3 字重，可能合并）。
   - 总字体资源 gzip 应 < 200KB（Inter ~120KB + Mono ~50KB）。
   - `astro check` 0 错误；`biome check` 通过；页面数维持。
   - 浏览器 DevTools Network：字体仅请求 `your-vercel-domain/_astro/...`，**不应**有任何 `fonts.googleapis.com` / `fonts.gstatic.com` 请求。
   - Lighthouse：CLS ≤ 0.05；LCP 不退化。

7. 本 RFC 标注 `Implemented` + commit。

### 4.5 影响范围

- 文件（修改）：`astro.config.ts` · `src/layouts/BaseLayout.astro` · `src/styles/tokens.css` · `src/styles/globals.css`
- 文档（修改）：`docs/design/STYLE_GUIDE.md` §2.1 · `docs/design/DESIGN_TOKENS.md` §5.1 · `docs/ARCHITECTURE.md` §9
- 依赖：**零新增 npm 依赖**（仅启用 Astro 内置能力）
- 资源：构建产物新增字体文件（Inter + JetBrains Mono 子集化 woff2，预计总 gzip < 200KB）
- 运行时：**零新增 JS**

### 4.6 视觉与风格自检

| 红线 | 遵守 |
|---|---|
| `STYLE_GUIDE §0` 冷静自信 / 数字克制 | ✅ Inter + JetBrains Mono 是该气质的主流选择 |
| `STYLE_GUIDE §2.1` 字体待讨论 → 已选型 | ✅ 本 RFC 即为决议 |
| `STYLE_GUIDE §3` 颜色红线 | ✅ 字体不涉及颜色 |
| `STYLE_GUIDE §5` 动效 ≤ 300ms | ✅ swap 替换是浏览器原生行为，不引入 CSS 过渡 |
| `STYLE_GUIDE §7` 信息密度 | ✅ 不增加视觉元素 |
| `AGENTS.md §3.1` 禁硬编码颜色 | ✅ 无颜色变更 |
| `AGENTS.md §4.2` 依赖纪律 | ✅ 零新增 npm 依赖 |
| `AGENTS.md §4.3` 资源纪律 | ✅ 字体走构建管道，不进 `public/` |
| `AGENTS.md §2.4.2` 少 > 多 | ✅ 不引入 Serif、不引入中文 web 字体 |

### 4.7 隐私自检（AGENTS.md §1）

| 通道 | 检查 | 结论 |
|---|---|---|
| §1.1 唯一署名 | 字体变更不触及 author / SITE 字段 | ✅ |
| §1.2 禁字段清单 | 字体变更不引入任何敏感字段 | ✅ |
| §1.5 元数据通道 | `<Font>` 注入的 `<link rel="preload">` `as="font"` 指向 **本站 `_astro/`**，不指向 Google / Bunny / 任何第三方域 | ✅ 关键 |
| 远程请求 | 构建期下载完字体后，**运行时零远程请求** | ✅ |

> **特别说明**：`fontProviders.google()` 这个名字容易让人误以为运行时会接 Google。**它只在构建机器上下载一次**字体文件，写入 `dist/_astro/`，访客浏览器只接触 Vercel CDN。这与"远程引用 Google Fonts"是**完全不同**的两件事。

---

## 5. Alternatives（备选方案）

| 方案 | 否决理由 |
|---|---|
| **A · CDN 直接引用 Google Fonts** | 隐私（GDPR 判例）+ 国内可达性差 + CLS 不可控 + 与 §1 隐私基调冲突 |
| **B · Bunny Fonts CDN（运行时直引）** | 隐私好但仍是第三方运行时域名；与 Astro fonts 的优势重合而无独有价值 |
| **C · Fontsource npm 包** | 需要新增 ≥2 个 devDependency；自托管但不自动 preload / size-adjust，需手动 `@font-face`；比 Astro 内置劣 |
| **D · IBM Plex Sans + Newsreader 双字体** | "杂志感"在 v1 阶段是过早优化；标题/正文双字体增加 schema 与组件复杂度；违反 `§2.4.2 少 > 多` |
| **E · Geist Sans** | 风格更鲜明但更新（2023），10 年后可能"很 2024"；Inter 更"耐看"且基础设施信任度更高 |
| **F · 引入思源黑体 web 字体** | 单文件 5MB+，CLS / LCP 直接破预算；CJK 子集化无成熟工具；远程或自托管都不可行 |
| **G · Windows 沿用微软雅黑优先** | 用户明确偏好思源；思源在字形细节（字距、笔画粗细）上比微软雅黑更接近 macOS PingFang，跨平台一致性更好 |
| **H · 启用 JetBrains Mono 连字** | 博客场景日期 `2026-05-29` 与编号 `001` 会被合并/扭曲；连字是 IDE 的优化、对阅读反而是污染 |

---

## 6. Risks & Mitigations（风险与缓解）

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| Astro `experimental.fonts` 在版本升级时 API 变动 | 中 | 中 | API 稳定后官方会保留 alias；实施时跟踪 release notes，必要时改字段路径 |
| 字体首次加载导致 CLS 抖动 | 中 | 中 | Astro 自动注入 `size-adjust`；本 RFC 用 `swap` + 系统字体兜底；Lighthouse 必测 CLS ≤ 0.05 |
| 字体子集体积超预算 | 低 | 中 | latin + latin-ext 实测 gzip < 200KB；若超，砍掉 latin-ext |
| Vercel 构建机器拉取 Google Fonts 失败 | 低 | 中 | Astro 会缓存到 `node_modules/.astro/fonts/`；首次失败重试即可；最坏情况回滚（§7） |
| Windows 用户未装思源 | 高 | 低 | fallback 链下一项是微软雅黑，用户无感知；这是"装了思源就赢"的渐进增强 |
| JetBrains Mono 不预加载导致首屏数据细节闪烁 | 低 | 低 | 数据细节（footer 年份等）非首屏关键路径；不 preload 是有意取舍 |
| `var(--font-inter, "")` 语法在旧浏览器不兼容 | 低 | 低 | CSS 变量带 fallback 是 CSS Variables L1 标准（2017+），全现代浏览器支持 |

---

## 7. Rollback Plan（回滚方案）

每步独立可 `git revert`：

1. 移除 `astro.config.ts` 的 `experimental.fonts` 块。
2. `BaseLayout.astro` 移除 `<Font>` 注入与 import。
3. `tokens.css` 字体栈三条还原为 v0.5 的 `ui-sans-serif, system-ui, …` 形式。
4. `globals.css` 的 `font-variant-ligatures: none` 可保留（无副作用）或一并移除。
5. 文档同步还原 §4.5 列出的 3 处。

回滚后行为 = v0.5 的纯系统字体栈，零依赖、零产物变更，**无数据/内容迁移成本**。

---

## 8. Open Questions（待用户确认）

- [x] 用户已确认"方案 ① v1 极简起步"（Inter + 系统中文 + JetBrains Mono）—— ✅ 已在对话中确认。
- [x] 用户已确认"中文 Windows 优先序：思源 > 微软雅黑"—— ✅ 已在对话中确认。
- [x] 用户授权"由 AI 决定 Mono 字体" → 选 **JetBrains Mono Variable + 禁连字**。✅
- [x] 字符集采用 `latin + latin-ext`（多 ~5KB 覆盖欧洲变音字符）。✅

---

## 9. Approval（确认）

- [x] 用户已确认本 RFC
- [x] 已检查与 `AGENTS.md` 红线一致（§4.7 隐私自查 / §4.6 风格自查）
- [x] 已检查与 `STYLE_GUIDE.md` 红线一致（§4.6）

---

## 10. Implementation Notes（实施记录）

**实施日期**：2026-05-29

**编号变更**：本 RFC 最初拟号 `0007`，落地时发现与既有 `0007-hero-pagehead-unification.md` 冲突，遂改为 `0008`。所有跨文件引用同步更新。

**实际改动**：

| 文件 | 变更 |
|---|---|
| `astro.config.ts` | 新增 `experimental.fonts`，Provider 选用 **`fontProviders.bunny()`**（详见下文 Provider 决定）：Inter（`--font-inter`，400/500/600/700，latin+ext）+ JetBrains Mono（`--font-jetbrains-mono`，400/500/700，latin） |
| `src/layouts/BaseLayout.astro` | `import { Font } from "astro:assets"`；`<head>` 注入 `<Font cssVariable="--font-inter" preload />` 与 `<Font cssVariable="--font-jetbrains-mono" />` |
| `src/styles/tokens.css` | `--font-sans` / `--font-serif` / `--font-mono` 改为 §4.3 形态；`--font-sans` 中文 Windows 优先序「思源 > 雅黑」 |
| `src/styles/globals.css` | `code, kbd, pre, samp` 选择器追加 `font-variant-ligatures: none` + `font-feature-settings: "liga" 0, "calt" 0` 关闭连字 |
| `docs/design/STYLE_GUIDE.md` §2.1 | "待讨论" → "已选型"，附本 RFC 链接 |
| `docs/design/DESIGN_TOKENS.md` §5.1 / §12 | 字体栈表格 + Web 字体加载表格；变更记录追加 v0.7 |
| `docs/ARCHITECTURE.md` §9 | 性能预算追加「首页字体 gzip < 200KB」；新增 §9.1「Web 字体（RFC-0008）」 |

**自检**：
- ✅ 隐私（`AGENTS.md §1`）：构建期下载，运行时不接触第三方域名。
- ✅ 视觉红线（`STYLE_GUIDE §3`）：未触及颜色 / 动效 / 信息密度。
- ✅ 依赖纪律（`AGENTS.md §4.2`）：零新增 npm 依赖。
- ✅ 资源纪律（`AGENTS.md §4.3`）：字体走构建管道，不进 `public/`。
- ✅ `pnpm allowBuilds`（`ARCHITECTURE §7.1`）：Astro fonts 不引入新原生依赖，无需追加。

**回滚**：每步都可独立 `git revert`，详见 §7。

**Provider 决定（实施时新增）**：原 RFC §4.4 草案使用 `fontProviders.google()`，实测 `astro check` 时 Google Fonts 的 metadata 接口在中国大陆 10s 超时，本地构建失败。改用 `fontProviders.bunny()`：

- **行为完全等价**：仍是构建期下载到 `dist/_astro/fonts/`，运行时**完全自托管**，访客浏览器只接触本站 `_astro/...`，不接触任何第三方字体域名。
- **双端可达**：Bunny 元数据接口在中国大陆与 Vercel 海外构建机器都稳定。
- **隐私规则不变**：`AGENTS.md §1.5` 守住 —— 远程访问只发生在构建机器上一次。
- **与 §5 备选 B（Bunny CDN 运行时直引）不同**：那是把字体作为 `<link href="https://fonts.bunny.net/...">` 直接交给浏览器加载（仍是第三方域名），本方案的 Bunny 只是构建期 metadata 来源，**已被运行时数据剥离**。

**实测产物（本地构建）**：`dist/_astro/fonts/` 11 个 woff2 文件
- Inter 4 字重 × 2 子集（latin / latin-ext）= 8 个文件，~24KB+~35KB 一对，浏览器按 `unicode-range` 只下载命中子集
- JetBrains Mono 3 字重 × 1 子集（latin）= 3 个文件，~21KB
- 首屏中文为主页面预计仅触发 Inter latin 1-2 个字重（24-48KB）
- 全产物 grep `gstatic | googleapis | bunny.net` 结果 **0 处** ✅


