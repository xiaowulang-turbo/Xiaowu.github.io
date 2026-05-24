/**
 * src/content/config.ts
 *
 * 所有 Content Collection 的 Zod Schema 定义。
 * 与 docs/content/CONTENT_MODEL.md 保持完全一致。
 *
 * v0.5 阶段：仅定义 schema，不放置任何 .mdx 内容。
 *           Astro 在 collection 为空时不会校验，但一旦有内容就会强制校验。
 */

import { defineCollection, z } from "astro:content";

/* ============================================================
 * 公共字段 / 工具
 * ============================================================ */

const tagSchema = z.array(z.string().toLowerCase()).max(5);

const baseFrontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().max(120),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: tagSchema.optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  aiAssisted: z.boolean().default(false),
  noindex: z.boolean().default(false),
});

/* ============================================================
 * Collection: projects
 * ============================================================ */
const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseFrontmatter.extend({
      category: z.enum(["web", "tool", "library", "experiment", "ai"]),
      status: z.enum(["active", "archived", "wip"]),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      cover: image().optional(),
      gallery: z.array(image()).optional(),
      techStack: z.array(z.string()).optional(),
      order: z.number().int().optional(),
    }),
});

/* ============================================================
 * Collection: ai-insights
 * ============================================================ */
const aiInsights = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseFrontmatter.extend({
      topic: z.enum(["prompting", "agent", "workflow", "review", "ide", "other"]),
      cover: image().optional(),
    }),
});

/* ============================================================
 * Collection: ai-mcp
 * ============================================================ */
const aiMcp = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string().min(1),
    summary: z.string().max(120),
    category: z.enum(["search", "code", "data", "ops", "design", "other"]),
    repo: z.string().url().optional(),
    homepage: z.string().url().optional(),
    install: z.string().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    useCases: z.array(z.string()).default([]),
    tags: tagSchema.optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/* ============================================================
 * Collection: ai-skills
 * ============================================================ */
const aiSkills = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string().min(1),
    summary: z.string().max(120),
    source: z.enum(["official", "community", "self"]),
    scenario: z.string(),
    repo: z.string().url().optional(),
    install: z.string().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    tags: tagSchema.optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/* ============================================================
 * Collection: ai-lab
 * ============================================================ */
const aiLab = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseFrontmatter.extend({
      status: z.enum(["active", "wip", "paused", "archived"]),
      tech: z.array(z.string()).optional(),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      cover: image().optional(),
    }),
});

/* ============================================================
 * Collection: thoughts
 * ============================================================ */
const thoughts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseFrontmatter.extend({
      category: z.enum(["frontend", "engineering", "design", "career", "tooling", "misc"]),
      cover: image().optional(),
      readingTimeMinutes: z.number().int().positive().optional(),
    }),
});

/* ============================================================
 * Note: about（关于页）不是 Content Collection
 * ============================================================
 * 它是结构化数据，定义在 src/data/about.ts，由 Zod 加载时校验。
 * 参考 docs/content/CONTENT_MODEL.md §2.7。
 */

/* ============================================================
 * 导出
 * ============================================================ */
export const collections = {
  projects,
  "ai-insights": aiInsights,
  "ai-mcp": aiMcp,
  "ai-skills": aiSkills,
  "ai-lab": aiLab,
  thoughts,
};
