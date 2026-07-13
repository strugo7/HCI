# PARSER_SPEC.md

> CyberAtlas Parser Specification
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
title: מהו מרחב הסייבר?
course: computer-security
---

# מהו מרחב הסייבר?

:::definition
מרחב הסייבר הוא כלל הסביבה הדיגיטלית המאפשרת למחשבים ולמערכות לתקשר.
:::

:::example
האינטרנט הוא רכיב אחד בתוך מרחב הסייבר.
:::

ראו [[Firewall]]
````

---

# Output

The parser outputs structured JSON objects.

Example

```json
{
  "type": "lesson",
  "id": "lesson-01",
  "title": "Introduction to Cyberspace",
  "sections": [
    {
      "type": "definition",
      "content": "Cyberspace is..."
    },
    {
      "type": "example",
      "content": "The Internet is part of Cyberspace."
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
מרחב הסייבר הוא כלל הסביבה הדיגיטלית...
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
[[Firewall]]
```

↓

```json
{
    "type":"concept-reference",
    "target":"firewall"
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
title: Introduction to Cyberspace
course: computer-security
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
חברה מגדירה Firewall שחוסם תעבורה נכנסת ממדינות לא מוכרות.

:::important
חסימה גיאוגרפית אינה מספיקה כשלעצמה.
:::
::::
````

Output preserves hierarchy.

---

# Concept Resolution

Concepts are referenced using Obsidian syntax.

Example

```md
[[Firewall]]
```

Parser resolves

```
Firewall

↓

concepts/firewall.md
```

Generated object

```json
{
    "type":"concept-reference",
    "target":"firewall"
}
```

Missing concepts generate validation errors.

---

# Asset Resolution

Images

```md
![[firewall.png]]
```

↓

```json
{
    "type":"image",
    "src":"assets/firewall.png"
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

Firewall

↓

Lesson 05
```

Output

```json
{
    "source":"lesson-01",
    "target":"firewall",
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