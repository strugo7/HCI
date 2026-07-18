# Human-Computer Interface Exam Prep

> AI-powered learning platform for HCI & User Experience (Course 27203901).

A professional exam-prep resource for students preparing for the university HCI
exam, built on a markdown source of truth with lessons, flashcards, and
practice quizzes.

Educational content is written in **Hebrew** (HCI terminology stays in English);
the exam itself is in English. The interface is **RTL-first**.

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

Phase 1: HCI curriculum scaffolding. The scaffold, the typed contracts, and the
RTL app shell exist, and the curriculum is mapped in
[`content/curriculum.yaml`](content/curriculum.yaml) (11 units).

The parser, renderer, graph, quiz engine and search are **typed contracts with
unimplemented bodies** — they compile, and they throw if called. The content
vault holds one worked lesson (`what-is-hci`) with the remaining units awaiting
content.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the HCI curriculum timeline.

---

## Content templates

New to authoring HCI content? Start from the templates in
[`docs/templates/`](docs/templates/):

| Template                                                                   | Use it for                                    |
| -------------------------------------------------------------------------- | --------------------------------------------- |
| [`HCI_LESSON_TEMPLATE.md`](docs/templates/HCI_LESSON_TEMPLATE.md)          | Lessons built from the lecturer's materials   |
| [`HCI_QUIZ_TEMPLATE.md`](docs/templates/HCI_QUIZ_TEMPLATE.md)              | Multiple-choice practice questions            |
| [`HCI_FLASHCARD_TEMPLATE.md`](docs/templates/HCI_FLASHCARD_TEMPLATE.md)    | Spaced-repetition study cards                 |
| [`HCI_CONCEPTS_TEMPLATE.md`](docs/templates/HCI_CONCEPTS_TEMPLATE.md)      | Knowledge-graph concept definitions           |

---

## Before you write code

Read [`docs/CLAUDE.md`](docs/CLAUDE.md), then
[`docs/LEARNING_DSL.md`](docs/LEARNING_DSL.md) and
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

The docs are the contract. Where implementation and documentation disagree, the
documentation wins — **except** for the DSL vocabulary, where
`packages/core/src/directives.ts` is authoritative and the docs mirror it.
