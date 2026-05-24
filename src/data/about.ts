/**
 * src/data/about.ts
 *
 * About 页所需的全部结构化数据。
 * 不放置于 Content Collection，详见 docs/content/CONTENT_MODEL.md §2.7。
 *
 * 隐私自查（按 AGENTS.md §1 与 RFC-0002 §6）：
 *   ✅ 仅 Xiaowu / Kirito 署名
 *   ✅ Tencent / Kingsoft 实名（用户已许可）
 *   ✅ 武汉理工大学（211 工程）实名（用户已许可）
 *   ✅ Email 经用户授权
 *   ❌ 不含真实姓名、头像、年龄、性别、手机号、城市、CET-6 分数（schema 预留）
 *
 * 字段填充状态：
 *   [DRAFT]    我已按 RFC-0002 与简历客观信息初拟，等待用户审定
 *   {{TODO}}   主观判断字段，必须由用户亲自填写（AI 不代笔）
 */

import { z } from "astro:content";

/* ============================================================
 * Schema
 * ============================================================ */

const trajectoryItem = z.object({
  date: z.string(),
  org: z.string(),
  role: z.string(),
  label: z.string(),
  hover: z.string().max(50).optional(),
  highlight: z.boolean().default(false),
});

const nowProject = z.object({
  title: z.string(),
  org: z.string(),
  role: z.string().optional(),
  period: z.string(),
  summary: z.string().max(140),
  keywords: z.array(z.string()).min(3).max(6),
  tagline: z.string().optional(),
});

const experience = z.object({
  period: z.string(),
  org: z.string(),
  role: z.enum(["FT", "Intern"]),
  title: z.string(),
  bullets: z.array(z.string()).max(3),
});

const aboutSchema = z.object({
  signature: z.object({
    name: z.enum(["Xiaowu", "Kirito"]),
    aka: z.string().optional(),
    akaTease: z.string().optional(),
    tagline: z.string(),
    intent: z.array(z.string()),
    meta: z.string().optional(),
  }),
  trajectory: z.array(trajectoryItem),
  nowProjects: z.array(nowProject),
  experiences: z.array(experience),
  stack: z.object({
    agentAndAi: z.array(z.string()),
    daily: z.array(z.string()),
    comfortable: z.array(z.string()),
    curious: z.array(z.string()),
  }),
  education: z.array(
    z.object({
      period: z.string(),
      school: z.string(),
      major: z.string(),
      degree: z.string(),
      notes: z.array(z.string()).optional(),
    }),
  ),
  questionsToBeAsked: z.array(z.string()).length(3),
  wantMore: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    }),
  ),
  contact: z.object({
    email: z.string().email(),
  }),
  lastUpdated: z.coerce.date(),
});

/* ============================================================
 * Data
 * ============================================================ */

const aboutData = {
  signature: {
    name: "Xiaowu",
    aka: "Kirito",
    akaTease: "— from a sword-and-magic story.",
    /* [DRAFT] 主线 lead 句，可改 */
    tagline: "从初级前端走向全栈 Agent 工程师。一条还在加速的曲线。",
    intent: ["Agent", "全栈", "前端"],
    /* [DRAFT] 求职意向元信息 */
    meta: "Open to opportunities",
  },

  trajectory: [
    {
      date: "2024.03",
      org: "Renren",
      role: "Intern",
      label: "起点 · Web 前端",
      hover: "学习生产环境前端协作的第一段经历。",
      highlight: false,
    },
    {
      date: "2024.06",
      org: "Kingsoft",
      role: "Intern",
      label: "AI 萌芽 · WPS AI 插件",
      hover: "用 SSE 把自然语言接进 PPT，第一次接触 AI 工程化。",
      highlight: true,
    },
    {
      date: "2025.07",
      org: "Kingsoft",
      role: "FT",
      label: "带组 · WPS AI 设计室",
      hover: "主导 AI 海报生成项目的前端设计与实现。",
      highlight: false,
    },
    {
      date: "2025.12",
      org: "Tencent",
      role: "FT",
      label: "Agent · 选号 / 诊断",
      hover: "两个生产 Agent 项目并行，仍在加速。",
      highlight: true,
    },
  ],

  nowProjects: [
    {
      title: "AI 选号 Agent",
      org: "Tencent",
      role: "Front-End Lead",
      period: "2025.12 — now",
      /* [DRAFT] 客观叙述，请审 */
      summary: "基于对话的达人推荐系统。Agent 从需求理解、多路检索一路到达人匹配，端到端完成选号。",
      keywords: ["Agent runtime", "多路检索", "工具编排", "流式输出", "工作区 / 制品库"],
      /* {{TODO}} —— 一句金句，由你亲自写。删除整行表示不放金句。 */
      tagline: undefined,
    },
    {
      title: "智能诊断 Agent",
      org: "Tencent",
      role: undefined,
      period: "2025.03 — now",
      /* [DRAFT] 客观叙述，请审 */
      summary:
        "前后端日志智能诊断系统。Agent 自主监测告警、结合 codemap 定位问题与修复，闭环线上排障。",
      keywords: ["日志理解", "CodeMap", "自动定位", "全链路闭环"],
      /* {{TODO}} —— 一句金句，由你亲自写。 */
      tagline: undefined,
    },
  ],

  experiences: [
    {
      period: "2025.12 — now",
      org: "Tencent",
      role: "FT",
      /* [DRAFT] 一句话职责，请审 */
      title: "Front-End",
      bullets: [
        "负责广告互选 AI 选号系统的全周期前后端开发。",
        "与产研运紧密协作，保障模块需求的敏捷迭代。",
      ],
    },
    {
      period: "2025.07 — 2025.11",
      org: "Kingsoft",
      role: "FT",
      title: "Front-End",
      bullets: [
        "带领小组完成 WPS AI 设计室（图文海报）的前端开发。",
        "协同后端、算法团队主导设计方案与落地实现。",
      ],
    },
    {
      period: "2024.06 — 2024.08",
      org: "Kingsoft",
      role: "Intern",
      title: "Front-End",
      bullets: [
        "基于 SSE 开发 WPS AI 对话插件，用自然语言修改与生成 PPT。",
        "基于 XML 开发 WPS 演示布局模板，沉淀模板生成能力。",
      ],
    },
    /*
     * 注：Renren 实习（2024.03 — 2024.05）已在 Trajectory 时间线呈现，
     * 此处不重复列出（按 RFC-0002 §5.M4 + 取舍原则 §2.4.2 精简）。
     */
  ],

  stack: {
    agentAndAi: [
      "Agent runtime · Tool calling",
      "Multi-source retrieval",
      "Prompt engineering · Memory",
      "RAG · Embeddings",
      "Streaming UX (SSE)",
    ],
    daily: ["TypeScript", "React · Astro", "Tailwind", "Vercel · Vite", "Git · Webpack"],
    comfortable: ["Vue · Svelte", "Node · Hono", "Python (light)", "PostgreSQL"],
    curious: ["Rust", "Edge runtimes", "Local LLMs"],
  },

  education: [
    {
      period: "2021.09 — 2025.06",
      school: "武汉理工大学（211 工程）",
      major: "计算机科学与技术",
      degree: "本科",
      /* schema 预留：CET-6 594 / 其他证明类信息。当前 v1.0 不渲染。 */
      notes: undefined,
    },
  ],

  /* {{TODO}} —— 三个问题由你亲自写。
   * 写作指南（WRITING_GUIDE 已记）：
   *   1. 必须是开放问题，不能 yes/no
   *   2. 必须能引出具体故事，不能引出空话
   *   3. 三问之间必须视角差异：技术 / 哲学 / 反思
   * 在你写好之前，下方占位会渲染为优雅留白。 */
  questionsToBeAsked: [
    "{{TODO}} 第一个问题（建议方向：技术深度）",
    "{{TODO}} 第二个问题（建议方向：哲学/取舍）",
    "{{TODO}} 第三个问题（建议方向：反思/成长）",
  ],

  wantMore: [
    { label: "更多项目", href: "/projects" },
    { label: "更多思考", href: "/thoughts" },
    { label: "或聊聊", href: "mailto:kiritoha@qq.com" },
  ],

  contact: {
    email: "kiritoha@qq.com",
  },

  /* 实施时由 git 最后修改时间生成。当前手动维护一次 v1.0 上线时间。 */
  lastUpdated: "2026-05-24",
};

/* ============================================================
 * 加载时校验（违反 schema 直接抛错，构建失败）
 * ============================================================ */
export const ABOUT = aboutSchema.parse(aboutData);
export type About = z.infer<typeof aboutSchema>;
