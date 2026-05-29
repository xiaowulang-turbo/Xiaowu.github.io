/**
 * src/data/thoughts.ts
 *
 * 心得页（信条墙）所需的全部结构化数据。
 * 不放置于 Content Collection，详见 RFC-0006 §4.3 与 docs/content/CONTENT_MODEL.md §2.6。
 *
 * 内容来源：本仓库公开规范文档（AGENTS.md / STYLE_GUIDE.md / WRITING_GUIDE.md）。
 *
 * 隐私自查（按 AGENTS.md §1）：
 *   ✅ 仅 Xiaowu / Kirito 署名
 *   ✅ 内容全部来自公开规范，无真实姓名 / 联系方式 / 学校公司全名等敏感字段
 *
 * 字段填充状态（参照 about.ts 约定）：
 *   [DRAFT] 阐述措辞由 AI 起草，等待作者用自己的口吻审校；信条标题取自规范原文。
 */

import { z } from "astro:content";

/* ============================================================
 * Schema
 * ============================================================ */

const principle = z.object({
  ref: z.string().optional(), // 来源条款号，如 "§2.4.2"（左列 mono 显示，即来源引用）
  title: z.string(), // 信条，如 "少 > 多"
  body: z.string().max(120), // 1~2 句阐述
});

const themeGroup = z.object({
  theme: z.string(), // 主题名，如 "取舍"
  label: z.string().optional(), // 英文副标签，如 "Trade-offs"
  principles: z.array(principle).min(1),
});

const thoughtsSchema = z.object({
  groups: z.array(themeGroup).min(1),
  lastUpdated: z.coerce.date(),
});

/* ============================================================
 * Data
 * ============================================================ */

const thoughtsData = {
  groups: [
    {
      theme: "取舍",
      label: "Trade-offs",
      principles: [
        {
          ref: "§2.4.1",
          title: "长期 > 短期",
          /* [DRAFT] */
          body: "永远向前看。今天的省力，是明天的债。",
        },
        {
          ref: "§2.4.2",
          title: "少 > 多",
          /* [DRAFT] */
          body: "不确定要不要做，就默认不做。加上去永远比删下来容易。",
        },
        {
          ref: "§2.4.3",
          title: "优雅 > 方便",
          /* [DRAFT] */
          body: "便利不是最高目标，对项目最贴切才是。",
        },
        {
          ref: "§2.4.4",
          title: "一致 > 新鲜",
          /* [DRAFT] */
          body: "3 个月后回看仍合适，才值得引入。",
        },
      ],
    },
    {
      theme: "克制",
      label: "Restraint",
      principles: [
        {
          ref: "§0",
          title: "留白是内容，克制是态度",
          /* [DRAFT] */
          body: "极简不是简陋。每一处装饰都要回答「不加会更好吗」。",
        },
        {
          ref: "§1",
          title: "全站只一种强调色",
          /* [DRAFT] */
          body: "除中性灰阶外，克制蓝是唯一的声音。",
        },
        {
          ref: "§5",
          title: "动效要无感",
          /* [DRAFT] */
          body: "时长 ≤300ms，缓动统一，能不动就不动。",
        },
      ],
    },
    {
      theme: "工程",
      label: "Craft",
      principles: [
        {
          ref: "§2.1",
          title: "文档先行",
          /* [DRAFT] */
          body: "文档是唯一真理来源，每个决策都能引用到某一条。",
        },
        {
          ref: "§2.2",
          title: "RFC 再动手",
          /* [DRAFT] */
          body: "跨文件的改动，先写清背景、取舍、回滚，再写代码。",
        },
        {
          ref: "§5.2",
          title: "增量，不顺手重构",
          /* [DRAFT] */
          body: "不顺眼的代码先记进想法池，下次专门处理。",
        },
      ],
    },
    {
      theme: "真诚",
      label: "Honesty",
      principles: [
        {
          ref: "§1",
          title: "删掉一句也成立的句子，就删",
          /* [DRAFT] */
          body: "简洁是对读者时间的尊重。",
        },
        {
          ref: "§9",
          title: "不编造经历与数据",
          /* [DRAFT] */
          body: "不确定的数字加「约」，链接必须真实可达。",
        },
        {
          ref: "§8",
          title: "AI 辅助要透明披露",
          /* [DRAFT] */
          body: "AI 主笔或超过三成段落，frontmatter 标 aiAssisted。",
        },
      ],
    },
  ],

  /* 实施时可由 git 最后修改时间生成。当前手动维护一次。 */
  lastUpdated: "2026-05-29",
};

/* ============================================================
 * 加载时校验（违反 schema 直接抛错，构建失败）
 * ============================================================ */
export const THOUGHTS = thoughtsSchema.parse(thoughtsData);
export type Thoughts = z.infer<typeof thoughtsSchema>;
