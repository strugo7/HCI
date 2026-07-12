# LEARNING_DSL.md

> Version 1.0

This document defines the educational language used by the Computer Security Learning Platform.

This language is the only supported format for writing educational content.

Claude must always generate content using this specification.

React renders this language into interactive components.

---

# Philosophy

Content should describe **what** is being taught.

The renderer decides **how** it is is displayed.

Never mix content with presentation.

---

# Document Structure

Every lesson starts with Front Matter.

```yaml
---
id:
title:
lesson:
category:
difficulty:
estimated_time:
tags:
prerequisites:
related:
---
```

---

# Headings

```md
# Lesson

## Section

### Topic
```

---

# Learning Objectives

```md
:::

- ...

- ...

- ...

:::
```

Purpose

Describe what the student will know after completing the section.

---

# Definition

```md
:::

...

:::
```

Purpose

Introduce a concept.

Rules

- Keep concise.
- One concept only.
- No examples.

---

# Explanation

Regular markdown paragraphs.

Purpose

Expand the definition.

Rules

Explain clearly.

Use simple language.

---

# Example

```md
:::

...

:::
```

Purpose

Provide one real-world example.

Rules

Concrete.

Practical.

Easy to understand.

---

# Analogy

```md
:::

...

:::
```

Purpose

Explain difficult concepts using familiar situations.

Optional.

---

# Important

```md
:::

...

:::
```

Purpose

Highlight information students must remember.

---

# Warning

```md
:::

...

:::
```

Purpose

Prevent common misunderstandings.

---

# Tip

```md
:::

...

:::
```

Purpose

Helpful advice.

Optional.

---

# Diagram

```md
:::

Describe the desired illustration.

:::
```

Purpose

Describe what should be visualized.

Never create ASCII diagrams unless explicitly requested.

---

# Image

```md
:::

Describe the desired image.

:::
```

---

# Animation

```md
:::

Describe the desired animation.

:::
```

---

# Video

```md
:::

Describe the desired educational video.

:::
```

---

# Self Check

```md
:::

Question

Answer

:::
```

Purpose

Verify understanding.

Every major section should include one.

---

# Quiz Reference

```md
:::

lesson-01-quiz

:::
```

Reference only.

Never embed full quizzes.

---

# Flashcards Reference

```md
:::

lesson-01

:::
```

Reference only.

---

# Summary

```md
:::

...

:::
```

---

# Key Points

```md
:::

- ...

- ...

- ...

:::
```

---

# References

```md
:::

Course Slides

NotebookLM

Additional Resources

:::
```

---

# Concept Links

Use Obsidian syntax.

Example

[[Firewall]]

[[TCP/IP]]

[[Cloud]]

[[CIA]]

The renderer converts these into interactive concept cards.

---

# Tables

Use standard Markdown tables.

---

# Code

Use fenced code blocks.

---

# Lists

Use standard Markdown lists.

---

# Images

Never embed files.

Always describe the desired illustration.

---

# HTML

Never generate HTML.

---

# JSX

Never generate JSX.

---

# CSS

Never generate CSS.

---

# React

Never generate React components inside educational content.

---

# Educational Rules

Always explain before giving examples.

Never introduce more than one new concept at a time.

Keep paragraphs short.

Prefer visual explanations.

Always connect concepts.

Always assume the student is learning the topic for the first time.

---

# Output Quality Checklist

Every lesson should answer:

✓ What is it?

✓ Why does it matter?

✓ Where is it used?

✓ How does it work?

✓ Example

✓ Common mistakes

✓ Self-check

✓ Related concepts

If any of these are missing, the lesson is incomplete.