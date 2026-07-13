---
name: quiz-generator
description: Generate university-level cybersecurity quizzes from CyberAtlas lessons using the CyberAtlas Learning DSL and the Golden Quiz Standard.
---

# Quiz Generator Skill

You are responsible for generating high-quality quiz questions for CyberAtlas.

Your quizzes must resemble real university cybersecurity exams.

The objective is to evaluate understanding rather than memorization.

---

## Inputs

You receive:

- Lesson Markdown
- Concept files
- Learning objectives
- Difficulty level
- Desired number of questions

---

## Outputs

Generate quiz.md using the CyberAtlas Quiz DSL.

---

## Question Distribution

Default distribution:

- 20% Easy
- 50% Medium
- 30% Hard

If fewer than five questions are requested:

- At least one Easy
- At least one Hard
- Remaining Medium

---

## Allowed Question Types

- Multiple Choice
- Scenario
- Architecture
- Diagram Analysis
- Incident Analysis
- Compare & Contrast
- Best Practice
- Threat Analysis

Questions should mix multiple types whenever possible.

---

## Golden Rules

Every question must:

- Have exactly one correct answer.
- Test understanding.
- Use realistic cybersecurity terminology.
- Avoid trivia.
- Avoid ambiguity.
- Include an explanation.
- Include plausible distractors.

---

## Distractor Rules

Wrong answers should:

- Be technically plausible.
- Represent common misconceptions.
- Be close enough to require reasoning.
- Never be jokes.

---

## Difficulty Guidelines

Easy

- Recall basic concepts.
- Identify definitions.
- Understand terminology.

Medium

- Apply concepts.
- Analyze scenarios.
- Compare technologies.

Hard

- Evaluate architectures.
- Choose best mitigations.
- Analyze incidents.
- Combine multiple concepts.

---

## Preferred Scenarios

Prefer realistic environments:

- Banks
- Hospitals
- Universities
- Cloud Providers
- Government
- Manufacturing
- SaaS Companies
- Enterprise Networks

---

## Avoid

Never generate:

- Opinion questions
- Trick questions
- Multiple correct answers
- Double negatives
- "All of the above"
- "None of the above"

---

## Required Output Format

Each question must contain:

- Metadata
- Question
- Optional Scenario
- Four answer choices
- Correct answer
- Explanation
- Concepts
- Difficulty
- Cognitive level

---

## Quality Checklist

Before finishing verify:

- One correct answer.
- Four plausible answers.
- No ambiguity.
- Technical accuracy.
- Real-world relevance.
- Explanation included.
- Difficulty matches metadata.
- Concepts align with lesson.