# Xiaowu.github.io

> A personal portal by **Xiaowu** (also known as **Kirito**).
> Crafted with restraint. Designed to last.

[![Live Site](https://img.shields.io/badge/live-xiaowulang.vercel.app-000?style=flat-square)](https://xiaowulang.vercel.app/)
[![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-000?style=flat-square)](./LICENSE)

---

## About

This is a content-driven personal portal — part résumé, part portfolio,
part knowledge garden. It is **not** a generic blog template. Every piece
of the foundation is intentionally designed for **long-term elegance**
over short-term speed.

The site is structured around five top-level sections:

- **Home** — A composed entrance with a hero, featured projects, and latest writings.
- **About** — A résumé-style profile (privacy-aware).
- **Projects** — A curated portfolio of GitHub work.
- **AI** — Insights, recommended MCPs & skills, and my own AI tooling.
- **Thoughts** — Notes on frontend craft and software thinking.

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** + **MDX** | Content-first, zero-JS by default, Islands architecture |
| Language | **TypeScript** (strict) | Long-term maintainability |
| Styling | **Tailwind CSS v4** + CSS variables | Token-driven, consistent, themeable |
| Tooling | **pnpm** + **Biome** | Fast, single-binary linting/formatting |
| Search (planned) | **Pagefind** | Fully static, zero-backend full-text search |
| Hosting | **Vercel** | First-class Astro support, CI/CD out of the box |

> Production: <https://xiaowulang.vercel.app/>

## Documentation

This project is **document-driven**. Before contributing or asking an AI
to make changes, read the relevant docs:

- [`AGENTS.md`](./AGENTS.md) — **AI collaboration constitution** (privacy, style, engineering)
- [`docs/README.md`](./docs/README.md) — Documentation index
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Technical architecture
- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — Roadmap & idea pool
- [`docs/design/STYLE_GUIDE.md`](./docs/design/STYLE_GUIDE.md) — Visual & interaction guide
- [`docs/content/CONTENT_MODEL.md`](./docs/content/CONTENT_MODEL.md) — Content schemas

## Development

> _Project scaffolding will be initialized after the documentation
> foundation is reviewed and approved. The commands below are the
> intended interface._

```bash
pnpm install        # install dependencies
pnpm dev            # start dev server
pnpm check          # type-check + lint
pnpm build          # production build
pnpm preview        # preview production build locally
```

## Conventions

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
- **Privacy**: See `AGENTS.md` §1. The author's real identity is never
  exposed; the site only ever signs as `Xiaowu` or `Kirito`.

## License

Content and code in this repository are licensed under
**[CC BY-NC 4.0](./LICENSE)** — free to share and adapt for non-commercial
purposes with attribution.

---

_Built slowly, on purpose._
