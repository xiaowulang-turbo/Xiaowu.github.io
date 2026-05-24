/**
 * src/data/social.ts
 *
 * 公开联系方式。仅暴露经用户许可的渠道（详见 AGENTS.md §1）。
 */

export interface SocialLink {
  /** 平台标识 */
  id: "github" | "email";
  /** i18n 字典 key */
  labelKey: string;
  /** 显示值（GitHub 用户名 / Email 地址） */
  display: string;
  /** 跳转地址（mailto: / https://） */
  href: string;
  /** 是否对外链 */
  external: boolean;
}

export const SOCIAL: readonly SocialLink[] = [
  {
    id: "github",
    labelKey: "social.github",
    display: "xiaowulang-turbo",
    href: "https://github.com/xiaowulang-turbo",
    external: true,
  },
  {
    id: "email",
    labelKey: "social.email",
    display: "kiritoha@qq.com",
    href: "mailto:kiritoha@qq.com",
    external: false,
  },
] as const;
