# ROADMAP.md

> **Version:** 1.0
> **Status:** Living Roadmap

---

# Honest Status

Read this before planning anything.

**Today, only the scaffold exists.**

| Thing | Reality |
|---|---|
| Monorepo, tooling, CI shell | Exists |
| `packages/core` Zod schemas | Exists. This is the real asset. |
| `markdown-parser` | Typed **contract**. Unimplemented bodies. |
| `markdown-renderer` | Typed **contract**. Registry type exists, components do not. |
| `knowledge-graph` | Typed **contract**. Unimplemented. |
| `quiz-engine` | Typed **contract**. Unimplemented. |
| `search` | Typed **contract**. Unimplemented. |
| `apps/web` | RTL shell, routing, empty-state pages. Renders nothing real. |
| Content vault | **Empty.** Every lesson file is 0 bytes. |

Nothing has been built end to end.

No lesson has ever been parsed. No Knowledge Object has ever been rendered.

The roadmap below exists to change that, in order, without shortcuts.

---

# Sequencing Rule

The phases follow the pipeline, and the pipeline is not negotiable:

```
Markdown + DSL → Parser → Knowledge Objects → Renderer → UI
```

You cannot build the renderer before the parser produces objects.

You cannot build the graph before concepts exist.

You cannot build search before there is content to index.

Phases may overlap at the edges. They may not be reordered.

---

# Phase 0 — Scaffold ✅ DONE

## Goal

A repo where the right thing is easy and the wrong thing is a type error.

## Deliverables

- pnpm workspaces + Turborepo monorepo.
- `packages/core` — Zod schemas as the **single source of truth** for the Learning DSL and Knowledge Objects. `directives.ts` is the only place a directive is defined; `knowledge-objects.ts` is the only place an object shape is defined.
- Typed contracts for `markdown-parser`, `markdown-renderer`, `knowledge-graph`, `quiz-engine`, `search`.
- `BlockRegistry` keyed by `BlockType`, so a directive without a component fails the build rather than rendering a blank space.
- `apps/web`: Vite + React + TypeScript + Tailwind v3 + shadcn/ui + Radix.
- RTL-first app shell: `dir="rtl"`, Heebo, HSL token theme, light/dark, six `--learn-*` callout tokens, `.tech-term` bidi isolation.
- Routing for all planned surfaces (`routes.ts`), each backed by an honest empty state.
- Docs repaired: `CLAUDE.md`, `ARCHITECTURE.md`, `LEARNING_DSL.md`, `CONTENT_SPEC.md`, `PARSER_SPEC.md`, `DESIGN_SYSTEM.md`, `ROADMAP.md`.

## Definition of Done

- ✅ `pnpm build` passes across the workspace.
- ✅ Every route renders without crashing.
- ✅ Empty states say the feature is not built, rather than faking data.
- ✅ Directive vocabulary is declared exactly once.

## Packages touched

`core` · `markdown-parser` · `markdown-renderer` · `knowledge-graph` · `quiz-engine` · `search` · `apps/web`

---

# Phase 1 — The Parser

> The first phase that produces real output.

## Goal

Turn a Learning DSL Markdown file into validated Knowledge Objects, deterministically, with useful errors.

## Deliverables

**`packages/markdown-parser`**

- unified + remark-parse + remark-directive pipeline.
- Frontmatter extraction, validated against `LessonFrontmatterSchema` / `ConceptFrontmatterSchema`.
- Directive recognition for the full vocabulary in `core/directives.ts`:
  - semantic: `objectives`, `definition`, `example`, `analogy`
  - callouts: `important`, `warning`, `tip`
  - media: `diagram`, `image`, `animation`, `video`
  - references: `quiz`, `flashcards`
  - closing: `selfcheck`, `summary`, `keypoints`, `references`
- Unknown directive → hard error. No silent pass-through.
- `[[Concept]]` → `ConceptReference` with a resolved slug.
- Inline Latin technical spans marked so the renderer can apply `.tech-term`.
- Lesson **bundle** composition: `lesson.md` + `summary.md` + `quiz.md` + `flashcards.md` + `mindmap.md` + `assets.md` → one `Lesson` object.
- Deterministic ID generation. Same input, same IDs, every run.
- Diagnostics collected, never thrown on first error. `{ severity, file, line, message }`.

**Validation CI gate**

- `pnpm validate-content` — parses the entire vault and fails on any `error`.
- Wired into CI. A PR that breaks the vault does not merge.
- Detects: unknown directives, missing frontmatter, duplicate IDs, broken `[[links]]`, missing concepts, missing assets, raw HTML in content, ASCII diagrams inside `:::diagram`.

**Build-content pipeline**

- `pnpm build-content` — vault → static JSON artifacts consumed by the app.
- Content is built, not fetched at runtime.

## Definition of Done

- A real Hebrew lesson written in the DSL parses into a `Lesson` that satisfies `LessonSchema`.
- Every error case above produces a diagnostic with a correct file and line number.
- Parsing the same file twice produces byte-identical output.
- The parser imports **zero** React. It is framework-independent.
- CI fails on an intentionally broken lesson.

## Packages touched

`core` · `markdown-parser`

---

# Phase 2 — The Renderer

## Goal

Turn Knowledge Objects into a lesson a student can actually read in Hebrew.

## Deliverables

**`packages/markdown-renderer`**

- A complete `BlockRegistry` — every `BlockType` mapped to a component.
- Components per `DESIGN_SYSTEM.md`: DefinitionCard, ExampleCard, AnalogyCard, Callout (important/warning/tip), DiagramPlaceholder, SelfCheck, KeyPoints, Summary, References, ConceptReference chip, QuizCard link, prose primitives.
- SelfCheck uses a Radix Collapsible. Not `<details>`.
- DiagramPlaceholder renders the author's *description*. It never invents a picture and never prints ASCII art.
- Renderer reads Knowledge Objects only. It never reads Markdown, never reads the vault, never parses.

**`apps/web` reading experience**

- `/lessons` — real lesson index.
- `/lessons/:lessonId` — the reading page: RTL prose at 72ch / 1.85, section navigation, a table of contents, reading progress.
- Correct bidi on every inline technical term.

## Definition of Done

- Lesson 01 renders end to end from Markdown with no hand-written JSX anywhere in the path.
- Adding a directive to `core` without adding a component is a **compile error**.
- A Hebrew sentence with an inline Latin term followed by punctuation renders the punctuation on the correct side.
- Keyboard `Tab` moves right-to-left, matching visual order.
- Axe reports no violations on the lesson page.
- Light and dark both pass contrast.

## Packages touched

`core` · `markdown-renderer` · `apps/web`

---

# Phase 3 — Concepts, Glossary, Knowledge Graph ✅ DONE

## Goal

Every concept exists exactly once, and the relationships between concepts are **derived**, never authored.

## Deliverables

**Content**

- `content/concepts/` populated. One file per concept. The concept owns its definition; lessons only reference it.

**`packages/knowledge-graph`**

- Graph built from parser output: concept nodes, `references` / `prerequisite` / `related` edges.
- `appearsIn` back-references computed. Never typed by a human.
- Cycle detection on prerequisites.
- Orphan detection: a concept nothing links to, and a `[[link]]` to a concept that does not exist.

**`apps/web`**

- `/glossary` — searchable concept index.
- `/glossary/:slug` — concept page: definition, simple explanation, technical explanation, examples, related concepts, and the lessons it appears in.
- `/graph` — visual concept graph.
- ConceptReference hover cards now resolve against real concepts.

## Definition of Done

- No definition text is duplicated anywhere in the vault.
- The graph regenerates from scratch on every build. There is no hand-maintained graph file, and there never will be.
- Every `[[link]]` in the vault resolves, enforced by the Phase 1 CI gate.
- Deleting a lesson updates the graph automatically.

## Packages touched

`core` · `markdown-parser` · `knowledge-graph` · `apps/web`

---

# Phase 4 — Quiz Engine, Assessment, Spaced Repetition

## Goal

Students can test themselves, and the platform knows how they did.

## Deliverables

**`packages/quiz-engine`**

- Parse `quiz.md` per the quiz schema in `core/quiz.ts`.
- Question types: multiple choice, multiple select, true/false, short answer.
- Grading with partial credit.
- Feedback per answer, including *why* the distractor was wrong. A quiz that only says "incorrect" has taught nothing.
- Flashcard decks from `flashcards.md`.
- Spaced repetition scheduling (SM-2 or equivalent) over flashcards and missed questions.

**`apps/web`**

- `/practice` — flashcards and the review queue.
- `/exams` — full quizzes with results.
- QuizCard and Flashcard components, keyboard-operable, reduced-motion-safe.

## Definition of Done

- A quiz authored in the DSL grades correctly with no quiz logic in React.
- The engine is pure: same answers in, same result out. Zero UI imports.
- Review scheduling survives a page reload.
- Quizzes are **referenced** from lessons (`:::quiz{ref=…}`), never inlined into them.

## Packages touched

`core` · `quiz-engine` · `apps/web`

---

# Phase 5 — Search

## Goal

One search box that handles Hebrew and Latin technical terms **in the same query**.

This is the phase most likely to be underestimated.

## Deliverables

**`packages/search`**

- Index built from Knowledge Objects at build time — lessons, sections, concepts, definitions, flashcards.
- **Bilingual query handling in a single box:**
  - A query may be pure Hebrew (`שמישות`), pure Latin (`Affordance`), or mixed (`הגדרה של Usability`).
  - Hebrew normalization: strip niqqud, normalize final forms (ך ם ן ף ץ ↔ כ מ נ פ צ), strip the prefix particles ו־ ה־ ב־ ל־ כ־ מ־ ש־ so `בשמישות` matches `שמישות`.
  - Latin normalization: case-folding, and punctuation-insensitive matching so `UI/UX` is found by `uiux` and `ui ux`.
  - **Cross-script aliasing:** a concept's `aliases` field carries its Hebrew name(s) and its English name. Searching `שמישות` must find the `Usability` concept and vice versa. This is why `ConceptFrontmatterSchema` has `aliases`.
  - Acronym expansion: `HCI` → human / computer / interaction, and their Hebrew equivalents.
- Results grouped by object type, with the matched context shown.

**`apps/web`**

- `/search` — results page.
- Command-palette style quick search (⌘K).

## Definition of Done

- `Usability` and `יוזביליטי` and `שמישות` all reach the same concept.
- A mixed-script query returns sensible results rather than zero.
- Search runs client-side against a prebuilt index. No server required.
- Zero results renders an honest empty state, never fabricated suggestions.

## Packages touched

`core` · `search` · `apps/web`

---

# Phase 6 — Progress & Mastery

## Goal

The platform knows what a student has learned and what to show next.

## Deliverables

- Learning engine: lesson completion, mastery estimation per concept, prerequisite unlocking, recommendation of the next lesson.
- Mastery is computed per **concept**, not per lesson — concepts are the unit of knowledge, so they are the unit of mastery.
- Progress is bound to the **lesson version** completed, per the immutable-content rule in `ARCHITECTURE.md`.
- `/progress` — real dashboard: concept mastery, completion, review queue.
- Persistence (local-first).

## Definition of Done

- Completing a lesson updates concept mastery through the graph, not through a hardcoded list.
- Prerequisites gate correctly, driven by graph edges.
- No educational logic lives in a React component.

## Packages touched

`core` · `knowledge-graph` · `quiz-engine` · `apps/web`

---

# Phase 7 — AI Layer

> Last, deliberately.

## Goal

AI **extends** learning. It never replaces the educational model.

## Deliverables

- Context builder: assembles prompts from **Knowledge Objects only**. The AI layer never reads raw Markdown and never reads the vault.
- Capabilities: alternate explanations, extra analogies, hints on a wrong answer, generated practice questions, personalized review sets.
- All AI output is **ephemeral** unless an author explicitly accepts it into the vault. Accepted output goes through the normal DSL → parser → validation path like any other content.
- Generated content is validated against the same Zod schemas. AI is not exempt.

## Definition of Done

- Disabling the AI layer removes zero core functionality. Every lesson, quiz, and concept still works.
- AI never writes to the vault without a human accept step.
- AI never bypasses the pipeline.

## Packages touched

`core` · new `ai` package · `apps/web`

---

# Phase 8 — Multi-Course Generalization

## Goal

Prove the architecture claim: **HCI is the first course, not the only one.**

## Deliverables

- Course as a first-class object. `frontmatter.course` already exists in `LessonFrontmatterSchema` and defaults to `hci-course` — Phase 8 makes it load-bearing.
- Vault restructured to `content/<course>/…`.
- Per-course routing, per-course knowledge graph, per-course search index.
- Course selection in the UI.
- A second course added — any technical subject — purely as content.

## Definition of Done

- Adding a course requires **only** adding a `content/<course>/` directory.
- Zero changes to `core`, `markdown-parser`, `markdown-renderer`, `knowledge-graph`, `quiz-engine`, or `search`.
- If any engine package needs a change to add a course, **the architecture failed** and the failure is fixed before the course ships.
- Both courses build, render, and search from one codebase.

## Packages touched

Ideally **none of the engine packages**. That is the entire point of this phase.

---

# Content Debt

> The vault is the source of truth, and right now the source of truth is empty.

This section is tracked as debt because it blocks Phase 1 from being verified.

---

## 1. The vault is empty

Every lesson file is **0 bytes**:

```
content/lessons/lesson-01/{lesson,summary,quiz,flashcards,mindmap,assets}.md   0 bytes
content/lessons/lesson-02/{lesson,summary,quiz,flashcards,mindmap,assets}.md   0 bytes
content/lessons/lesson-03/{lesson,summary,quiz,flashcards,mindmap,assets}.md   0 bytes
```

Most templates are also empty:

```
content/templates/concept.template.md      0 bytes
content/templates/section.template.md      0 bytes
content/templates/flashcard.template.md    0 bytes
content/templates/diagram.template.md      0 bytes
content/templates/media.template.md        0 bytes
```

Only `lesson.template.md` and `quiz.template.md` have content.

**Consequence:** the parser has nothing to parse and the renderer has nothing to render. There is no way to prove Phase 1 works.

**Action:** Phase 1 must ship with **one** fully authored, DSL-compliant Hebrew lesson used as the parser's golden fixture. One correct lesson beats three empty ones.

---

## 2. The golden lesson template violates the DSL

`content/templates/lesson.template.md` is the only substantial content in the vault, and it is **not valid Learning DSL**. It predates the spec.

| Violation | Location | Rule broken |
|---|---|---|
| **No frontmatter** | Top of file | `PARSER_SPEC.md`: "Every content file begins with YAML." `id` and `title` are required. The parser will reject the file outright. |
| **Raw HTML `<details>` / `<summary>`** | The "בדקו את עצמכם" section | `LEARNING_DSL.md`: "Never generate HTML." Self-checks must be `:::selfcheck`. The collapse behavior is the **renderer's** decision, not the content's. |
| **ASCII diagram in a fenced block** | The "המחשה" section | `LEARNING_DSL.md`: "Never create ASCII diagrams." Must become `:::diagram` containing a *description* of the intended visual. The ASCII box also renders incorrectly in RTL. |
| **Zero DSL directives** | Whole file | No `:::objectives`, `:::definition`, `:::example`, `:::keypoints`, `:::summary`. Content is carried in plain headings and `**bold**`, which erases the semantics the renderer needs. |
| **Blockquote used as an `:::important`** | "כל אינטרנט הוא חלק ממרחב הסייבר…" | A `>` quote is presentation. `:::important` is intent. |
| **Bare `✔` checkmarks** | "נקודות חשובות לזכור" | Should be `:::keypoints`. Typographic characters are not a data structure. |
| **No `[[concept]]` links** | Whole file | `Cyberspace`, `Internet`, `IoT`, `Router` are all mentioned as prose. None link. The knowledge graph would see zero edges from this lesson. |

**Action (Phase 1, blocking):**

1. Migrate `lesson.template.md` to valid DSL. It is the template — every future lesson inherits its mistakes.
2. Fill the five empty templates.
3. Add the migrated lesson as the parser's golden fixture test.
4. Add CI checks that fail on raw HTML in content, ASCII art inside `:::diagram`, and missing frontmatter — so this class of debt cannot return.

Until step 4 lands, this debt is one careless commit away from coming back.

---

## 3. Concepts do not exist — ✅ RESOLVED (Phase 3)

`content/concepts/` holds 82 concepts. Every `[[link]]` in the vault resolves,
and the CI gate fails if one stops resolving.

The graph is derived from them on every build: 119 nodes (82 concepts + 37
lessons) and 555 edges, with cycle and orphan detection wired into
`pnpm content:validate`.

**Two failures worth keeping**, because both were silent:

1. **Concept slugs and lesson ids share one namespace and collide.** Twenty-one
   of them do — a lesson is usually named after the concept it teaches
   (`affordances`, `usability`, `personas`). Keying a graph node by the bare slug merged the
   two, and every `[[Affordances]]` edge pointed at the *lesson*. Node ids are now
   `concept:affordances` / `lesson:affordances`, and the count is checked: nodes must
   equal concepts + lessons.

2. **`related:` was slugified, not resolved.** `related: [Perimeter]` produced
   the slug `perimeter` whether or not such a concept existed, so the graph
   could invent a node the vault does not have. It now resolves through the
   concept index exactly as a `[[link]]` does, and an unresolvable name is
   reported and dropped.

---

## 4. The curriculum and the lesson directories disagree

`content/curriculum.yaml` names lessons by **slug**:

```yaml
units:
  - id: introduction
    lessons: [what-is-hci, affordances, mental-models, signifiers, usability]
  - id: research
    lessons: [ethnography, personas, scenarios]
```

But the directories on disk are `lesson-01`, `lesson-02`, `lesson-03`.

Two incompatible identity schemes for the same object. The parser cannot resolve
a lesson id until one wins.

Note also that the curriculum implies **eight** lessons across two units, while
only three (empty) lesson directories exist.

**Action:** decide the lesson-id scheme in Phase 1, before the parser hard-codes
either convention. Slugs are the better answer — they survive reordering, and
`lesson-07` tells a reader nothing.

---

# Documentation Debt

**Resolved during Phase 0.** Recorded so the failure is not repeated.

| Problem | Resolution |
| --- | --- |
| **The DSL vocabulary had been destroyed.** Every directive in `LEARNING_DSL.md`, `PARSER_SPEC.md` and `AI_AUTHORING_GUIDE.md` had decayed to a bare `:::`, leaving the parser contract undefined. | Reconstructed, and **moved into code**. `packages/core/src/directives.ts` is now authoritative; the docs mirror it. |
| **Hebrew vs English contradiction.** `CONTENT_SPEC.md` said "always write in Hebrew"; `AI_AUTHORING_GUIDE.md` said "write in clear, concise English." | Hebrew wins — it matches the actual content. The guide was corrected and the reversal noted inline. |
| **`DESIGN_SYSTEM.md` and `ROADMAP.md` were empty (0 bytes)** while `CLAUDE.md` listed them as authoritative references. | Both written. |
| **Three conflicting repository structures** across the project brief, `CLAUDE.md`, and `ARCHITECTURE.md`. | Reconciled to the workspace that actually exists. |
| **`content/ curriculum.yaml` had a leading space in its filename**, which breaks every glob that would ever look for it. | Renamed to `content/curriculum.yaml`. |

**The lesson worth keeping:** a contract that lives only in prose will drift,
and eventually break, with nothing to notice. That is precisely what happened
here — the DSL was specified in four documents and defined in none of them.

Contracts belong in code, where the build fails.

---

# Related Documents

| Document | Purpose |
|---|---|
| `CLAUDE.md` | Engineering philosophy and development rules |
| `ARCHITECTURE.md` | System architecture and layer boundaries |
| `LEARNING_DSL.md` | The DSL content is authored in |
| `CONTENT_SPEC.md` | Educational content specification |
| `PARSER_SPEC.md` | Parser behavior and Knowledge Objects |
| `DESIGN_SYSTEM.md` | Visual system and component inventory |

---

# Roadmap Policy

Phases ship in order.

A phase is not done because the code exists. It is done when its **Definition of Done** is met.

If a phase needs a shortcut to ship, the shortcut is the wrong answer. Per `CLAUDE.md`:

> Never optimize for shortcuts. Always optimize for long-term architecture.
