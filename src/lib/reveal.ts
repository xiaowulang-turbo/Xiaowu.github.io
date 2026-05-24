/**
 * src/lib/reveal.ts — Reveal-on-scroll 工具
 *
 * 设计原则（按 STYLE_GUIDE §5.3 reveal 规范）：
 *   - opt-in：仅 [data-reveal] 元素生效，避免全站统一渲染
 *   - 渐进增强：JS 失败时元素仍可见（CSS 默认 opacity: 1）
 *   - 一次性：进入视口后不再"出 → 入"循环（避免分心）
 *   - 无障碍：prefers-reduced-motion 下完全跳过
 *   - 性能：复用单个 IntersectionObserver
 */

const REVEAL_ATTR = "data-reveal";
const REVEAL_VISIBLE = "is-revealed";

/** 初始化 reveal 观察。返回卸载函数。 */
export function initReveal(): () => void {
  if (typeof window === "undefined") return () => {};

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    // 减弱动效：直接全部标记为已显示，跳过动画
    for (const el of document.querySelectorAll<HTMLElement>(`[${REVEAL_ATTR}]`)) {
      el.classList.add(REVEAL_VISIBLE);
    }
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(REVEAL_VISIBLE);
          observer.unobserve(entry.target);
        }
      }
    },
    {
      // 进入视口下 12% 时触发，避免到达边缘才动
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.01,
    },
  );

  for (const el of document.querySelectorAll<HTMLElement>(`[${REVEAL_ATTR}]`)) {
    observer.observe(el);
  }

  return () => observer.disconnect();
}
