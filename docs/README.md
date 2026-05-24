# Documentation Index

> 本目录是 **Xiaowu.github.io** 的文档中心。
> 不同主题由不同文档负责，AI 协作时**按需加载对应文档**，避免上下文爆炸。

---

## 阅读顺序

### 第一次接触本项目（人或 AI）
1. [`/AGENTS.md`](../AGENTS.md) ⭐ **必读** —— AI 协作宪法
2. [`/README.md`](../README.md) —— 项目对外说明
3. [`./ARCHITECTURE.md`](./ARCHITECTURE.md) —— 技术架构
4. [`./design/STYLE_GUIDE.md`](./design/STYLE_GUIDE.md) —— 视觉风格宪法
5. [`./ROADMAP.md`](./ROADMAP.md) —— 现状 / 规划 / 想法池

---

## 按任务索引

### 我要写一个新组件 / 新页面
- 先读 `design/STYLE_GUIDE.md`
- 再读 `design/DESIGN_TOKENS.md`
- 再读 `design/COMPONENT_PATTERNS.md`
- 在 `rfcs/` 提交 RFC

### 我要新增一种内容（如新建一个 collection）
- 先读 `content/CONTENT_MODEL.md`
- 再读 `content/WRITING_GUIDE.md`
- 在 `rfcs/` 提交 RFC

### 我要写一篇新文章 / 项目卡片
- 读 `content/WRITING_GUIDE.md`
- 配图参考 `content/IMAGE_GUIDE.md` 与 `/prompts/images.md`

### 我要调整视觉风格
- 修改 `design/STYLE_GUIDE.md` 与 `design/DESIGN_TOKENS.md`
- 红线条款（`AGENTS.md` §3）不得修改

### 我要规划下一个迭代
- 在 `ROADMAP.md` 登记
- 大功能在 `rfcs/` 立项

---

## 文档地图

```
docs/
├── README.md                         # 你正在看
├── ARCHITECTURE.md                   # 技术架构（栈、目录、构建、部署）
├── ROADMAP.md                        # 路线图与想法池
├── design/
│   ├── STYLE_GUIDE.md   ⭐           # 视觉风格宪法（哲学+规则）
│   ├── DESIGN_TOKENS.md              # 设计 token 清单（CSS 变量）
│   └── COMPONENT_PATTERNS.md         # 标准组件模式
├── content/
│   ├── CONTENT_MODEL.md              # 所有 Content Collection Schema
│   ├── WRITING_GUIDE.md              # 写作风格指南
│   └── IMAGE_GUIDE.md                # 图片规范
├── rfcs/
│   ├── 0000-template.md              # RFC 模板
│   └── NNNN-<slug>.md                # 各功能 RFC
└── private/                          # 敏感原始材料（gitignored）
    └── .gitkeep
```

并行参考：
- `/prompts/images.md` —— AI 配图 prompt 库

---

## 维护原则

- 文档与代码同步更新；文档落后于代码视为**未完成**。
- 每份文档单一职责，**不重复**其他文档已说清的内容（用链接交叉引用）。
- 修改有红线条款的文档（`AGENTS.md` / `STYLE_GUIDE.md` 红线节）需用户明确确认。
