# CyberAtlas

> AI-powered knowledge platform for Computer Security education.

Educational content is written in **Hebrew** (technology names stay in English).
The interface is **RTL-first**.

---

## The one rule

**Markdown is the source of truth.** The vault in `content/` owns every
definition, example and question. React only renders it.

```text
Markdown → Parser → Knowledge Objects → Renderer → React
```

Nothing bypasses this pipeline. The frontend never contains educational content,
and educational content never contains presentation.

---

## Getting started

```bash
pnpm install
pnpm dev              # http://localhost:5173
```

| Command                 | What it does                                    |
| ----------------------- | ----------------------------------------------- |
| `pnpm dev`              | Run the web app                                 |
| `pnpm build`            | Build every package and the app                 |
| `pnpm typecheck`        | Strict typecheck across the workspace           |
| `pnpm content:validate` | Validate the vault — **the CI gate**            |
| `pnpm content:build`    | Compile the vault into the app's content index  |

---

## Layout

```text
apps/web/          React + Vite client
content/           The Obsidian vault — source of truth
packages/
  core/            Knowledge Objects + DSL vocabulary (Zod)
  markdown-parser/ Markdown + DSL → Knowledge Objects
  markdown-renderer/ Knowledge Objects → React
  knowledge-graph/ Derived graph — never hand-authored
  quiz-engine/     Grading, mastery, spaced repetition
  search/          Compile-time index
scripts/           Content build + validation
docs/              Specifications
```

`packages/core` depends on nothing, and everything depends on it. If you are
about to define what a `definition` block is anywhere else, stop — it is already
defined in `packages/core/src/directives.ts`.

---

## Status

Phase 0. The scaffold, the typed contracts, and the RTL app shell exist.

The parser, renderer, graph, quiz engine and search are **typed contracts with
unimplemented bodies** — they compile, and they throw if called. The content
vault is empty apart from two templates.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for what lands next.

---

## Before you write code

Read [`docs/CLAUDE.md`](docs/CLAUDE.md), then
[`docs/LEARNING_DSL.md`](docs/LEARNING_DSL.md) and
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

The docs are the contract. Where implementation and documentation disagree, the
documentation wins — **except** for the DSL vocabulary, where
`packages/core/src/directives.ts` is authoritative and the docs mirror it.
