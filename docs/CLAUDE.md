# CLAUDE.md

# HCI Learning Platform

> AI-Powered Knowledge Platform for Human-Computer Interaction & UX Education

Version: 1.0

---

# HCI Domain Context

This platform teaches **Human-Computer Interaction & User Experience**
(University Course 27203901) — not security. When writing content:

## Core HCI Concepts

- **Human-Centered Design (HCD):** a design process that puts user needs first throughout development
- **Usability:** how easily users learn, use, and find satisfaction in an interface (learnability, efficiency, memorability, error tolerance, satisfaction)
- **Affordances:** properties of an object that suggest how to interact with it — a handle affords pulling, a button affords pressing
- **Mental Models:** how users predict system behavior based on prior experience
- **Cognitive Load:** the mental effort an interface demands — reducing it improves usability

## Content Guidelines

- Every lesson connects to HCI principles from the lecturer materials in `content/sources/`
- Practice questions are multiple-choice (the exam is in English); use real interface examples (Apple, Slack, Microsoft), not hypotheticals
- Exam weight leans heavily on Ethnographic Research and Usability Testing (~40% together), then core concepts and design methods
- Author with the templates in `docs/templates/` and mark concept exam weight: HIGH (3+ questions), MEDIUM (1–2), LOW (background)

---

# Mission

This platform is not a documentation website.

This platform is not a note-taking application.

This platform is an AI-powered educational platform that teaches Human-Computer Interaction & User Experience through reusable knowledge objects, interactive content and visual learning.

The first implementation is a university HCI course (27203901).

The architecture must support additional courses in the future without modification.

---

# Project Goals

Every decision should improve one or more of the following:

- Learning quality
- Understanding
- Reusability
- Maintainability
- Consistency
- Scalability

Never optimize for shortcuts.

Always optimize for long-term architecture.

---

# Core Philosophy

Knowledge and presentation are separate.

Content should describe **what** is being taught.

The renderer decides **how** it is presented.

The frontend never owns educational content.

Educational content never owns presentation.

---

# Source of Truth

The only source of truth is the Obsidian Vault.

```
content/
```

Nothing inside React should duplicate educational content.

Definitions exist exactly once.

Concepts exist exactly once.

Lessons reference concepts.

---

# Project Architecture

```
Obsidian Markdown

        │

        ▼

Learning DSL

        │

        ▼

Markdown Parser

        │

        ▼

Markdown AST

        │

        ▼

Knowledge Objects

        │

        ▼

Renderer

        │

        ▼

React Components

        │

        ▼

User Interface
```

Never bypass this pipeline.

---

# Repository Structure

```
hci-platform/

apps/
│
└── web/
│   ├── src/
│   ├── public/
│   └── vite.config.ts
│
content/
│
├── lessons/
│
├── concepts/
│
├── quizzes/
│
├── flashcards/
│
├── diagrams/
│
├── media/
│
└── templates/
│
packages/
│
├── core/              ← Knowledge Objects + DSL vocabulary (Zod).
│                        The single source of truth. Depends on nothing.
├── markdown-parser/
│
├── markdown-renderer/
│
├── knowledge-graph/
│
├── quiz-engine/
│
└── search/
│
docs/
│
├── CLAUDE.md
├── CONTENT_SPEC.md
├── LEARNING_DSL.md
├── PARSER_SPEC.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── DESIGN_SYSTEM.md
└── AI_AUTHORING_GUIDE.md
│
.claude/
│
└── skills/
```

---

# Knowledge Model

Everything in the platform is a Knowledge Object.

Supported Knowledge Objects

- Lesson
- Section
- Concept
- Definition
- Example
- Diagram
- Image
- Animation
- Video
- Quiz
- Flashcard
- Exercise
- Summary

Knowledge Objects are reusable.

Never duplicate knowledge.

---

# Learning Model

Students learn progressively.

```
Definition

↓

Explanation

↓

Example

↓

Visualization

↓

Self Check

↓

Summary

↓

Practice
```

Never skip stages.

---

# Markdown

Educational content uses the custom Learning DSL.

Never generate

- HTML
- JSX
- CSS
- React Components

Educational content must remain presentation independent.

---

# Renderer

The renderer is responsible for presentation only.

Renderer responsibilities

- Parse Markdown
- Parse DSL
- Build AST
- Render React Components
- Resolve Concept Links
- Resolve Images
- Resolve Diagrams

Renderer never modifies educational content.

---

# Concepts

Every concept exists exactly once.

Example

```
content/concepts/

Affordances.md

Usability.md

Mental-Models.md

Cognitive-Load.md
```

Lessons reference concepts.

Concepts own definitions.

---

# Lessons

Lessons assemble knowledge.

Lessons never redefine concepts.

Lessons should remain lightweight.

---

# Knowledge Graph

Every concept automatically becomes a graph node.

Relationships are generated from

- metadata
- Obsidian links
- prerequisites
- related concepts

The graph is generated automatically.

Never manually maintain graph data.

---

# Educational Quality

Every lesson must answer

- What is it?
- Why is it important?
- How does it work?
- Where is it used?
- What should I remember?

If one of these questions is unanswered,

the lesson is incomplete.

---

# Design Philosophy

The platform should feel like

- Notion
- Apple Documentation
- Coursera
- Duolingo

Avoid

- cluttered layouts
- terminal UI
- unnecessary animations
- decorative elements

Learning always comes first.

---

# Skills

Never solve every task with one agent.

Always delegate to the appropriate skill.

Skills live inside

```
.claude/skills/
```

---

# Available Skills

## content-author

Purpose

Creates HCI educational content following the `docs/templates/` guidelines.

Responsible for

Lessons (HCI_LESSON_TEMPLATE.md)

Concepts (HCI_CONCEPTS_TEMPLATE.md)

Definitions

Examples (from real interfaces)

Summaries

Flashcards (HCI_FLASHCARD_TEMPLATE.md)

Quizzes (HCI_QUIZ_TEMPLATE.md)

---

## content-review

Reviews educational quality.

Checks

Metadata

Missing concepts

Broken links

Consistency

Grammar

Educational completeness

---

## renderer

Responsible for

Parser

AST

Renderer

Markdown

MDX

remark

rehype

React Components

---

## knowledge-graph

Responsible for

Concept Graph

Relationships

Recommendations

Prerequisites

Learning Paths

---

## ui-designer

Responsible for

Layouts

Screens

UX

Accessibility

Visual hierarchy

---

# Commands

Claude should recognize these commands.

```
/create-lesson

/create-concept

/create-quiz

/create-flashcards

/review-content

/update-graph

/design-screen

/build-renderer

/build-parser

/validate-content

/generate-diagrams
```

---

# Command Workflow

Example

```
/create-lesson Affordances
```

Pipeline

```
content-author

↓

content-review

↓

knowledge-graph

↓

renderer validation

↓

completed lesson
```

---

# Content Workflow

```
NotebookLM

↓

Claude

↓

Learning DSL

↓

Markdown

↓

Parser

↓

Knowledge Objects

↓

Renderer

↓

React
```

---

# Coding Workflow

When writing code

Always

- build reusable components
- keep components stateless
- separate business logic
- separate rendering
- separate parsing

Never tightly couple content with React.

---

# Definition of Done

Educational Content

✓ Metadata

✓ Learning Objectives

✓ Definitions

✓ Explanations

✓ Examples

✓ Diagram Suggestions

✓ Self Check

✓ Summary

✓ Related Concepts

✓ References

Code

✓ Typed

✓ Reusable

✓ Accessible

✓ Responsive

✓ Tested

Architecture

✓ Modular

✓ Scalable

✓ Independent

---

# References

Always follow

LEARNING_DSL.md

CONTENT_SPEC.md

PARSER_SPEC.md

ARCHITECTURE.md

ROADMAP.md

If project conventions evolve,

update these specifications instead of creating exceptions.

---

# Long-Term Vision

This platform should become a reusable educational framework.

HCI is the first course.

The platform should eventually support any technical subject simply by adding new content written in the Learning DSL and following the patterns in `docs/templates/`.

The architecture should remain unchanged as new courses are added.