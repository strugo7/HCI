`````md
# ARCHITECTURE.md

> **Version:** 1.0  
> **Status:** Living Architecture Document

---

# CyberAtlas Architecture

## Vision

CyberAtlas is **not** a traditional Learning Management System (LMS).

It is a **Learning Operating System** that separates educational content, learning logic, rendering, assessment, AI capabilities, and user interfaces into independent layers.

The architecture is designed around one core principle:

> **Content is the source of truth.**

Every other component exists to interpret, process, present, or extend that content.

---

# Core Principles

## Content First

Educational content is the foundation of the platform.

The UI never owns knowledge.

Every screen is generated from structured content.

```text
Content
    ↓
Parser
    ↓
Knowledge Model
    ↓
Renderer
    ↓
UI
```

---

## Headless Learning Engine

Learning logic must never depend on any frontend technology.

The same engine should work for:

- Web
- Mobile
- Desktop
- CLI
- AI Agents
- APIs

---

## Separation of Concerns

Each layer has one responsibility.

| Layer | Responsibility |
|--------|----------------|
| Content | Educational knowledge |
| Parser | Parse Markdown & DSL |
| Knowledge Model | Canonical representation |
| Learning Engine | Educational behavior |
| Assessment | Evaluation |
| AI | Content generation |
| Search | Discovery |
| Renderer | UI generation |
| Client | User interaction |

---

## Immutable Content

Published lessons are immutable.

Updates create new versions instead of modifying existing ones.

```text
Lesson v1

↓

Lesson v2

↓

Lesson v3
```

Learner progress is always associated with the version that was completed.

---

## Stateless Rendering

Renderers never own educational state.

They simply transform structured knowledge into interface components.

```text
Learning DSL

↓

Renderer

↓

UI Components
```

---

## AI Is an Extension

Artificial Intelligence enhances learning.

It never replaces the educational model.

AI only consumes structured knowledge.

---

# High-Level Architecture

```text
                +----------------------+
                |    Author Tools      |
                +----------------------+
                           |
                           v
                +----------------------+
                | Markdown + DSL Files |
                +----------------------+
                           |
                           v
                +----------------------+
                |       Parser         |
                +----------------------+
                           |
                           v
                +----------------------+
                |  Knowledge Objects   |
                +----------------------+
                     |      |       |
                     |      |       |
                     v      v       v
             Assessment   AI    Search
                     \      |      /
                      \     |     /
                       v    v    v
                +----------------------+
                |   Rendering Engine   |
                +----------------------+
                           |
                           v
                +----------------------+
                |        Client        |
                +----------------------+
```

---

# System Layers

## Layer 1 — Content

Stores educational knowledge.

Includes:

- Courses
- Modules
- Lessons
- Sections
- Definitions
- Examples
- Exercises
- Labs
- Quizzes
- Summaries

Content is written using Markdown and the Learning DSL.

---

## Layer 2 — Parser

Reads Markdown and Learning DSL.

Responsibilities:

- Parsing
- Validation
- Normalization
- Schema verification
- Object creation

Example:

````text
:::definition
Firewall
:::
`````

becomes

```text
DefinitionObject
```

The parser never renders UI.

---

## Layer 3 — Knowledge Model

Internal representation of educational content.

Typical objects include:

```text
Course
Module
Lesson
Section
Definition
Example
Exercise
Question
Hint
Summary
Diagram
```

Every downstream system consumes these objects.

---

## Layer 4 — Learning Engine

Responsible for educational logic.

Examples:

* Lesson completion
* Mastery tracking
* Progress calculation
* Unlock rules
* Prerequisites
* Review scheduling
* Spaced repetition

No UI code exists in this layer.

---

## Layer 5 — Assessment Engine

Responsible for learner evaluation.

Responsibilities include:

* Quiz grading
* Partial credit
* Adaptive difficulty
* Mastery estimation
* Feedback generation

Input:

* Knowledge Objects

Output:

* Assessment Results

---

## Layer 6 — AI Layer

Consumes structured educational content.

Generates:

* Explanations
* Analogies
* Hints
* Examples
* Flashcards
* Practice quizzes
* Summaries

AI-generated content is temporary unless explicitly accepted by an author.

---

## Layer 7 — Search

Indexes educational knowledge.

Supports:

* Keyword search
* Semantic search
* Concept lookup
* Acronyms
* Commands
* Technologies
* Lessons

---

## Layer 8 — Rendering Engine

Transforms knowledge objects into UI.

Examples:

```text
Definition
    ↓
DefinitionCard
```

```text
Quiz
    ↓
QuizComponent
```

```text
Diagram
    ↓
DiagramRenderer
```

Rendering contains no educational logic.

---

## Layer 9 — Client Applications

Possible clients include:

* Web
* Mobile
* Desktop

Clients communicate only through public APIs.

---

# Repository Structure

The layers above are conceptual. On disk they are a pnpm workspace:

```text
cyberatlas/
│
├── apps/
│   └── web/                  React + Vite client (RTL-first)
│
├── content/                  The Obsidian vault — source of truth
│   ├── lessons/              one directory per lesson (a "bundle")
│   ├── concepts/             each concept exactly once
│   ├── quizzes/
│   ├── flashcards/
│   ├── diagrams/
│   ├── media/
│   └── templates/
│
├── packages/
│   ├── core/                 Knowledge Objects + DSL vocabulary (Zod).
│   │                         Depends on nothing. Everything depends on it.
│   ├── markdown-parser/      Markdown + DSL → Knowledge Objects
│   ├── markdown-renderer/    Knowledge Objects → React
│   ├── knowledge-graph/      derived graph, prerequisites, recommendations
│   ├── quiz-engine/          grading, mastery, spaced repetition
│   └── search/               compile-time index, Hebrew + Latin queries
│
├── scripts/                  build-content, validate-content
├── docs/
└── .claude/skills/
```

Dependency direction is enforced by the workspace graph:

```text
core ← parser ← knowledge-graph ← search
  ↑       ↑                          ↑
  └─── renderer ── quiz-engine ──────┘
                       ↑
                    apps/web
```

`core` imports nothing. `apps/web` is imported by nothing — it renders, and
never owns knowledge.

Layers that do not yet exist as packages (`learning-engine`, `assessment`,
`ai`, `api`, `mobile`) are described above as architecture, not as directories.
They are added when they are built, not before.

---

# Content Pipeline

```text
Author

↓

Markdown

↓

Learning DSL

↓

Parser

↓

Knowledge Objects

↓

Validation

↓

Indexing

↓

Renderer

↓

Learner
```

---

# Learning Flow

```text
Student

↓

Lesson

↓

Exercise

↓

Assessment

↓

Mastery Update

↓

Progress Update

↓

Next Lesson
```

---

# AI Pipeline

```text
Knowledge Objects

↓

Context Builder

↓

Prompt Builder

↓

LLM

↓

Validation

↓

Generated Content

↓

Renderer
```

---

# State Management

Persistent state:

* User profile
* Completed lessons
* Quiz history
* Mastery
* Achievements
* Review schedule

Ephemeral state:

* AI conversations
* Generated hints
* Temporary quizzes
* Session cache

---

# Public API

The Learning Engine exposes services such as:

```text
GetCourse()

GetLesson()

CompleteLesson()

SubmitQuiz()

GetProgress()

GetMastery()

GetRecommendations()
```

Clients never access storage directly.

---

# Dependency Rules

Allowed:

```text
Content

↓

Parser

↓

Knowledge Model

↓

Learning Engine

↓

Renderer

↓

Client
```

Forbidden:

```text
Renderer → Parser

Renderer → Content

UI → Database

AI → UI

Assessment → Renderer
```

Dependencies always point downward.

---

# Extensibility

Adding a new course requires only:

```text
content/new-course/
```

No engine changes are required.

Adding a new lesson block requires:

1. DSL definition
2. Parser support
3. Renderer support

Existing lessons remain unchanged.

---

# Scalability Goals

The architecture is designed to support:

* Hundreds of courses
* Tens of thousands of lessons
* Reusable learning objects
* Multiple frontend clients
* Offline learning
* AI-assisted learning
* Multiple languages
* Future assessment engines

---

# Design Goals

CyberAtlas prioritizes:

* Maintainability
* Separation of concerns
* Educational correctness
* Reusability
* Extensibility
* Deterministic rendering
* AI compatibility
* Testability
* Versioning
* Long-term scalability

---

# Related Documents

| Document          | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `CLAUDE.md`       | Engineering philosophy and development rules           |
| `CONTENT_SPEC.md` | Educational content specification                      |
| `LEARNING_DSL.md` | Learning DSL syntax and semantics                      |
| `ARCHITECTURE.md` | Overall system architecture and component interactions |

```
```
