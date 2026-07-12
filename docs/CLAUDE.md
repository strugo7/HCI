# CLAUDE.md

# CyberAtlas

> AI-Powered Knowledge Platform for Computer Security Education

Version: 1.0

---

# Mission

CyberAtlas is not a documentation website.

CyberAtlas is not a note-taking application.

CyberAtlas is an AI-powered educational platform that teaches Computer Security through reusable knowledge objects, interactive content and visual learning.

The first implementation is a university Computer Security course.

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
computer-security-platform/

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
├── markdown-parser/
│
├── markdown-renderer/
│
├── knowledge-graph/
│
├── search-indexer/
│
├── quiz-engine/
│
└── ui/
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

Firewall.md

DNS.md

Cloud.md

CIA.md
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
- TryHackMe

Avoid

- hacker aesthetics
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

Creates educational content.

Responsible for

Lessons

Concepts

Definitions

Examples

Summaries

Flashcards

Quizzes

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
/create-lesson Malware
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

CyberAtlas should become a reusable educational framework.

Computer Security is only the first course.

The platform should eventually support any technical subject simply by adding new content written in the Learning DSL.

The architecture should remain unchanged as new courses are added.