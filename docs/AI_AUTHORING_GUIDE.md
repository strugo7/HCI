# AI_AUTHORING_GUIDE.md

> HCI Platform AI Authoring Guide
>
> Status: Draft
>
> Version: 1.0

---

# Purpose

This document defines how AI systems generate educational content for this platform.

The goal is to ensure that every lesson follows the same educational philosophy, writing style, structure, and quality standards.

AI is responsible for writing educational content.

AI is **not** responsible for presentation, layout, styling, or application logic.

---

# Core Principles

AI should write for understanding, not memorization.

Every lesson should help students answer:

- What is it?
- Why is it important?
- How does it work?
- Where is it used?
- What are the limitations?
- What should I remember?

Students should finish each lesson with conceptual understanding, not just definitions.

---

# AI Responsibilities

AI is responsible for:

- Writing lessons
- Writing concepts
- Creating examples
- Creating quizzes
- Creating flashcards
- Creating summaries
- Creating exercises
- Suggesting diagrams
- Linking concepts
- Explaining difficult topics

AI is not responsible for:

- HTML
- CSS
- React
- JSX
- Styling
- Navigation
- Application logic
- Knowledge Graph generation

---

# Single Source of Truth

AI always writes Markdown.

Never HTML.

Never JSX.

Never React Components.

Never inline styling.

Content must remain presentation-independent.

---

# Output Format

Every generated file must follow the Learning DSL. The complete directive
vocabulary lives in `LEARNING_DSL.md`, mirroring
`packages/core/src/directives.ts`.

Example

````md
# Affordances

:::definition
Affordance הוא מאפיין של אובייקט או רכיב ממשק שמרמז למשתמש כיצד ניתן להשתמש בו — ידית מזמינה משיכה, כפתור מזמין לחיצה.
:::

:::example
כפתור מוגבה עם צל בממשק מרמז שניתן ללחוץ עליו, בעוד שדה קלט עם מסגרת שקועה מרמז שאפשר להקליד בתוכו.
:::

:::warning
Affordance אינו Signifier. ה-Affordance הוא היכולת לפעולה עצמה, ואילו ה-Signifier הוא הרמז החזותי שמסמן למשתמש שהפעולה קיימת.
:::

ראו [[Information Architecture]] ו-[[Human-Centered Design]]
````

---

# Lesson Structure

Every lesson should follow this flow.

```
Introduction

↓

Motivation

↓

Concept

↓

Explanation

↓

Example

↓

Visualization

↓

Real-world usage

↓

Common mistakes

↓

Summary

↓

Quiz

↓

Flashcards
```

The structure should remain consistent across all lessons.

---

# Writing Style

**Educational content is written in Hebrew.** Technology and discipline names stay
in English and are never translated — `Affordances`, `Usability`, `UI/UX`, `Persona`, `Wireframe`.

> Earlier versions of this guide said "write in English." That was wrong, and it
> contradicted `CONTENT_SPEC.md` and every lesson actually in the vault.
> **Hebrew is correct.** Only the *documentation* is in English; the content a
> student reads is Hebrew.

Use:

- Short paragraphs
- Simple language
- Active voice
- Practical explanations
- Real-world examples

Avoid:

- Academic jargon
- Long introductions
- Unnecessary repetition
- Decorative language
- Marketing language

---

# Lesson Size

Recommended lesson size:

- 5–10 sections
- 1–3 concepts per section
- 2–5 examples
- 3–8 quiz questions
- 5–15 flashcards

Lessons should remain digestible.

---

# Concept Ownership

Definitions belong only to Concept files.

Lessons reference concepts.

Correct:

```md
[[Affordances]]
```

Incorrect:

```md
Affordances are...
```

unless introducing the concept for the first time through its dedicated Concept page.

---

# Examples

Every important concept should include at least one example.

Prefer real-world scenarios.

Good example:

> Slack's paperclip icon affords attaching a file, signaling the action before the user clicks.

Poor example:

> Imagine a magical button that just knows what the user wants.

---

# Diagrams

Whenever a visual explanation improves understanding, AI should suggest a
diagram. Describe what should be drawn — never draw it in ASCII.

Example

````md
:::diagram
תרשים המדגים Affordance בממשק: המשתמש רואה כפתור מוגבה עם צל, מזהה אותו כרכיב
לחיץ, מרחף מעליו ומקבל משוב חזותי, ולוחץ — כך המאפיין החזותי מוביל לפעולה הנכונה.
:::
````

The renderer decides how diagrams are displayed.

---

# Quiz Guidelines

Every lesson should end with a quiz.

Questions should measure understanding.

Prefer:

- Multiple Choice
- True / False
- Scenario Questions
- Matching
- Ordering

Avoid questions that only test memorization.

---

# Flashcards

Flashcards should reinforce key ideas.

Good:

Front

```
What is Human-Centered Design?
```

Back

```
A design process that puts user needs first throughout development.
```

Avoid long paragraphs.

---

# Summaries

Every lesson ends with a concise summary.

The summary should:

- Reinforce key concepts
- Avoid introducing new information
- Fit on one screen

---

# Exercises

Exercises should encourage application.

Good:

> Redesign a checkout flow for a small online store to reduce cognitive load.

Poor:

> Rewrite the definition of an affordance.

---

# Concept Linking

Whenever a lesson references another concept, use Obsidian links.

Example

```md
[[Mental Models]]

[[Affordances]]

[[Usability]]
```

Never duplicate explanations that already exist elsewhere.

---

# Educational Philosophy

Explain before defining.

Teach before testing.

Build intuition before introducing terminology.

Move from simple concepts to advanced topics.

Introduce one major concept at a time.

---

# Difficulty Progression

Lessons should progress naturally.

```
Basic

↓

Intermediate

↓

Advanced

↓

Review
```

Avoid sudden jumps in complexity.

---

# Real-World Focus

Whenever possible, connect theory to practice.

Examples:

- Mobile apps
- E-commerce websites
- Operating systems
- Banking apps
- Healthcare interfaces
- Government service portals
- In-car dashboards

Students should understand where concepts are actually used.

---

# Diagram Suggestions

AI should identify places where visuals improve learning.

Examples:

- User flows
- Information architecture trees
- Wireframe layouts
- Task analysis diagrams
- Affordance and signifier mapping
- Design thinking lifecycle
- Usability testing process

AI suggests diagrams.

The renderer decides how they appear.

---

# Content Rules

Every section should answer at least one meaningful question.

Every concept should have a purpose.

Every example should reinforce understanding.

Every quiz should evaluate comprehension.

Every summary should simplify.

---

# Things AI Must Never Do

Never generate:

- HTML
- CSS
- JSX
- React Components
- Tailwind classes
- JavaScript
- TypeScript
- Inline styling
- UI layout instructions

Never embed implementation details inside educational content.

---

# Quality Checklist

Before considering a lesson complete, verify:

- Clear learning objective
- Logical flow
- Correct terminology
- Accurate technical content
- Real-world examples
- Suggested diagrams
- Linked concepts
- Summary included
- Quiz included
- Flashcards included
- No duplicated definitions
- Valid Learning DSL
- No HTML or JSX

---

# Golden Lesson Standard

Every new lesson should meet the quality level of the project's Golden Lesson.

If content quality is lower than the Golden Lesson, it should be revised before publication.

The Golden Lesson serves as the reference implementation for all future lessons.

---

# Design Principles

- AI writes educational content only.
- Markdown is the source of truth.
- Learning DSL is mandatory.
- Concepts are reusable.
- Lessons assemble knowledge.
- Presentation belongs to the renderer.
- Consistency is more important than creativity.
- Understanding is more important than memorization.
- Content must remain reusable across courses and future versions of this platform.