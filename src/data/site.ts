/**
 * src/data/site.ts
 *
 * 站点元信息单一来源。
 * 严格遵守 AGENTS.md §1 隐私规则：仅含 Xiaowu/Kirito 署名与已许可的公开联系方式。
 */

export const SITE = {
  /** 站点对外域名（含协议） */
  url: "https://xiaowulang.vercel.app",
  /** 站点品牌名 */
  name: "Xiaowu",
  /** 主署名（专业身份） */
  author: "Xiaowu",
  /** 彩蛋署名（个性身份） */
  aka: "Kirito",
  /** 站点 tagline */
  tagline: "Building things with restraint.",
  /** 简短描述（用于 meta description / OG） */
  description:
    "A personal portal by Xiaowu — résumé, projects, AI notes, and thoughts on the craft.",
  /** 默认语言（i18n 启用前固定为中文） */
  defaultLang: "zh" as const,
  /** 当前阶段标识（v0.5 占位页使用） */
  phase: "v0.5 — skeleton phase",
  /** License */
  license: "CC BY-NC 4.0",
  /** 仓库 */
  repo: "https://github.com/xiaowulang-turbo/Xiaowu.github.io",
} as const;

export type Site = typeof SITE;
