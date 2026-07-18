# PARSER_SPEC.md

> The HCI Platform Parser Specification
>
> Status: Draft
>
> Version: 1.0

---

# Purpose

The parser is responsible for converting Learning DSL Markdown into structured Knowledge Objects that can be rendered by the frontend.

The parser is **not** responsible for:

- rendering HTML
- styling
- React logic
- educational decisions

Its only responsibility is to transform content into a normalized intermediate representation.

---

# Rendering Pipeline

```
Obsidian Vault

↓

Markdown (.md)

↓

Learning DSL Parser

↓

Markdown AST (MDAST)

↓

Knowledge Objects

↓

Knowledge Graph

↓

React Renderer

↓

User Interface
```

The parser is the bridge between educational content and the rendering engine.

---

# Parser Responsibilities

The parser must:

- Parse Markdown
- Parse Learning DSL blocks
- Resolve Obsidian links
- Extract metadata
- Validate content
- Normalize objects
- Generate IDs
- Build object relationships
- Produce renderer-ready output

The parser must never render UI.

---

# Input

Input is a **lesson bundle** — a directory, not a single file:

```text
content/lessons/lesson-01/
├── lesson.md       → sections          (required)
├── summary.md      → summary
├── quiz.md         → quiz
├── flashcards.md   → flashcard deck
├── mindmap.md      → concept map
└── assets.md       → asset manifest
```

The parser composes these into one `Lesson` object. Only `lesson.md` is
required.

Example `lesson.md`:

````md
---
id: lesson-01
title: מהי שמישות?
course: hci
---

# מהי שמישות?

:::definition
שמישות היא המידה שבה משתמשים יכולים ללמוד ממשק, להשתמש בו ביעילות ולהפיק ממנו שביעות רצון.
:::

:::example
תפריט ניווט ברור הוא רכיב אחד התורם לשמישות של אתר.
:::

ראו [[Affordances]]
````

---

# Output

The parser outputs structured JSON objects.

Example

```json
{
  "type": "lesson",
  "id": "lesson-01",
  "title": "Introduction to Affordances",
  "sections": [
    {
      "type": "definition",
      "content": "An affordance is..."
    },
    {
      "type": "example",
      "content": "A button affords pressing."
    }
  ]
}
```

---

# Parser Stages

## Stage 1

Load Markdown.

```
lesson.md
```

↓

Raw Text

---

## Stage 2

Parse Markdown.

Recommended libraries:

- unified
- remark
- remark-parse

Output:

```
Markdown AST
```

---

## Stage 3

Locate Learning DSL directives.

Example

````md
:::definition
אפורדנס הוא תכונה של אובייקט המרמזת כיצד להשתמש בו...
:::
````

↓

```
DefinitionNode
```

---

## Stage 4

Parse directive attributes.

Example

````md
:::quiz{ref="lesson-01-quiz" difficulty="easy" points="5"}
:::
````

↓

```json
{
  "difficulty": "easy",
  "points": 5
}
```

---

## Stage 5

Resolve Obsidian links.

Example

```md
[[Affordances]]
```

↓

```json
{
    "type":"concept-reference",
    "target":"affordances"
}
```

---

## Stage 6

Validate content.

Examples

- Missing title
- Duplicate IDs
- Unknown block
- Missing concept
- Invalid attributes

Errors should be reported with file and line number.

---

## Stage 7

Generate Knowledge Objects.

Example

```
DefinitionNode

↓

DefinitionObject
```

---

## Stage 8

Return normalized document.

The renderer consumes this structure directly.

---

# Knowledge Objects

Supported object types

```
Lesson

Section

Heading

Paragraph

Definition

ConceptReference

Example

Diagram

Image

Video

Quiz

Question

Exercise

Summary

Flashcard

Table

Callout

Warning

Note
```

Each object has a common interface.

```ts
interface KnowledgeObject {
    id: string
    type: string
}
```

---

# Frontmatter

Every content file begins with YAML.

Example

```yaml
---
id: lesson-01
title: Introduction to Affordances
course: hci
order: 1
---
```

Required

- id
- title

Optional

- description
- tags
- prerequisites
- objectives
- estimatedTime
- difficulty
- version

---

# Learning DSL

Supported directives — seventeen, exhaustive:

```text
objectives    definition    example      analogy
important     warning       tip
diagram       image         animation    video
selfcheck     quiz          flashcards
summary       keypoints     references
```

**This list is a mirror, not the source of truth.** The vocabulary is defined in
`packages/core/src/directives.ts` and the parser imports it from there. Never
hand-maintain a second copy of this list in code — that is exactly how v1.0 of
the spec drifted until the directive names were lost entirely.

Unknown directives produce parser errors. There is no silent fallback.

---

# Nested Blocks

Nested blocks are supported. The outer fence takes more colons than the inner
one, so the parser can tell them apart.

Example

````md
::::example
כפתור בעל בליטה תלת-ממדית מספק אפורדנס נתפס שמרמז למשתמש שניתן ללחוץ עליו.

:::important
אפורדנס נתפס אינו מספיק כשלעצמו; נדרש גם סימן מובחן (signifier) שמסמן היכן לפעול.
:::
::::
````

Output preserves hierarchy.

---

# Concept Resolution

Concepts are referenced using Obsidian syntax.

Example

```md
[[Affordances]]
```

Parser resolves

```
Affordances

↓

concepts/affordances.md
```

Generated object

```json
{
    "type":"concept-reference",
    "target":"affordances"
}
```

Missing concepts generate validation errors.

---

# Asset Resolution

Images

```md
![[norman-door.png]]
```

↓

```json
{
    "type":"image",
    "src":"assets/norman-door.png"
}
```

Videos

```md
![[intro.mp4]]
```

↓

Video Object

---

# Validation Rules

The parser validates:

- duplicate ids
- duplicate lessons
- duplicate concepts
- invalid YAML
- broken links
- unknown directives
- invalid nesting
- missing assets
- missing required fields
- malformed quizzes

Validation never stops parsing immediately.

All errors are collected and returned.

---

# Error Format

```json
{
    "severity":"error",
    "file":"lesson.md",
    "line":42,
    "message":"Unknown directive 'hint'"
}
```

Severity

- info
- warning
- error

---

# Generated IDs

If no ID exists

```
Definition

↓

definition-001
```

IDs must be deterministic.

---

# Knowledge Graph

During parsing the parser records relationships.

Example

```
Lesson 01

↓

Affordances

↓

Lesson 05
```

Output

```json
{
    "source":"lesson-01",
    "target":"affordances",
    "type":"references"
}
```

---

# Parser Output Structure

```
Document

├── Metadata

├── Sections

├── Knowledge Objects

├── Assets

├── References

├── Diagnostics
```

---

# Recommended Libraries

Markdown

- unified
- remark
- remark-parse

AST

- mdast
- unist

Transform

- remark-directive
- unist-util-visit

Validation

- zod

Slug generation

- github-slugger

---

# Design Principles

- Markdown is the source of truth.
- The parser never renders UI.
- Educational content remains presentation-independent.
- Every object has a deterministic structure.
- Parsing must be deterministic.
- Validation is strict.
- Renderer receives normalized Knowledge Objects only.
- The parser is framework-independent and reusable across React or any future frontend.