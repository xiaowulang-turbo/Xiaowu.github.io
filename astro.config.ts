import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://xiaowulang.vercel.app",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  prefetch: {
    defaultStrategy: "viewport",
  },
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  /**
   * 字体策略：详见 docs/rfcs/0008-fonts-strategy.md
   *
   * - Inter Variable           西文 Sans，覆盖 400/500/600/700，latin + latin-ext
   * - JetBrains Mono Variable  等宽，400/500/700，latin（连字在 globals.css 中关闭）
   *
   * Provider 选用 `fontProviders.bunny()` 而非 google()：
   * - 二者行为对等（构建期下载到 _astro/，运行时完全自托管，访客浏览器不接触第三方域名）
   * - Bunny Fonts CDN 在中国大陆与 Vercel 海外构建机器**双端可达**，
   *   Google Fonts metadata 接口在中国大陆默认无法访问，会让本地 build 失败
   * - 隐私规则（AGENTS.md §1.5）守住：远程访问只发生在构建机器上一次
   */
  experimental: {
    fonts: [
      {
        provider: fontProviders.bunny(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["400", "500", "600", "700"],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
        fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      {
        provider: fontProviders.bunny(),
        name: "JetBrains Mono",
        cssVariable: "--font-jetbrains-mono",
        weights: ["400", "500", "700"],
        styles: ["normal"],
        subsets: ["latin"],
        fallbacks: ["ui-monospace", "monospace"],
      },
    ],
  },
});
