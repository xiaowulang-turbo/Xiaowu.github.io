/**
 * src/i18n/index.ts — 国际化入口
 *
 * v0.5 阶段：固定返回中文字典。
 * 未来扩展：根据路由 lang 段切换字典；保持 t(key) 接口不变。
 */

import { type DictKey, zh } from "./zh";

const DICTIONARIES = { zh } as const;

export type Lang = keyof typeof DICTIONARIES;

/**
 * 翻译函数。
 *
 * - 当 key 为已知 DictKey：返回对应翻译
 * - 当 key 为未登记 string：开发期 console.warn，运行时返回原 key（避免破坏渲染）
 *
 * 之所以接受 string 而不强制 DictKey，是为了让从配置/数据中传入 `labelKey: string`
 * 的场景免去类型断言，保持模板代码整洁。所有 key 仍受 zh.ts 字典约束。
 */
export function t(key: DictKey | string, _lang: Lang = "zh"): string {
  const dict = DICTIONARIES.zh as Record<string, string>;
  const value = dict[key];
  if (value === undefined) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] missing key: ${key}`);
    }
    return key;
  }
  return value;
}

export type { DictKey };
