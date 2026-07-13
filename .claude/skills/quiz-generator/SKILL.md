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
---

# Unit Exam Standard (מבחן מסכם)

Every curriculum unit ends with a summative exam that integrates the whole
unit. Exams live in `content/exams/<unit-id>.md`, use the same question DSL as
lesson quizzes, and are validated by a dedicated lint at build time — the
rules below are **enforced**, not advisory.

## Exam frontmatter

```yaml
---
id: exam-<unit-id>
unit: <unit-id>          # must match a unit in curriculum.yaml
title: מבחן מסכם — <unit title>
---
```

Question ids: `q-exam-<unit-id>-001` and so on.

## Exam blueprint

- **Five options (A–E) per question** — the real course exam moved to five
  distractors in 2024. 5 points per question.
- Difficulty mix: ~20% easy, ~50% medium, ~30% hard.
- Language: Hebrew, with the English term alongside on first use.
- Realistic scenarios (bank, hospital, SaaS, enterprise). From 2025 the real
  exam is ~70% scenario clusters — prefer scenario questions.
- Never repeat a question that already exists in the unit's lesson quizzes.
  Read them first; the exam tests the same material from new angles.

## Rule 1 — shuffle-safe writing (answers are randomized at runtime)

The web app shuffles answer order on every attempt. Therefore:

- **Never reference option letters** in the explanation or misconception —
  no "תשובה C שגויה". Refer to answers by their content: "האפשרות שטוענת
  שחומת אש סורקת תוכן — שגויה, כי...". The lint rejects standalone A–E
  tokens in explanations.
- Never write answers that depend on position: no "כל התשובות נכונות",
  "תשובות א+ב", "אף אחת מהתשובות".
- The `Correct:` letter still refers to the authored order — that is fine;
  it is canonical, only the display shuffles.

## Rule 2 — distractor parity (kill the "longest answer" tell)

Students learn that the longest, most detailed option is correct. Break the
pattern:

- All five options must sit in the same length band — the longest option no
  more than ~1.35× the mean of the others. The lint warns per question and
  **fails the exam** if the correct answer is the longest in more than 35%
  of questions.
- The fix is never to truncate the correct answer into vagueness — it is to
  give distractors the same specificity: a wrong answer should contain a
  real mechanism, applied wrongly ("חומת אש בשכבה 3 חוסמת לפי חתימות תוכן" —
  concrete, plausible, wrong).
- Give distractors the same grammatical shape as the correct answer: if the
  correct answer has a "because" clause, so do the distractors.
- Build distractors from documented misconceptions (the lesson's
  `misconception:` fields are a goldmine), from adjacent concepts
  (IDS↔IPS, dropper↔payload, AuthN↔AuthZ), and from true statements that
  don't answer the question.

## Rule 3 — integration (the exam is more than the sum of its quizzes)

- At least **40% of questions must be integrative**: their `concepts:` list
  spans two or more lessons of the unit. The lint checks this against the
  lessons' concept ownership.
- In later units, reach back: DMZ exam questions should make the student
  place a WAF (unit 5) and an IDS (unit 7) inside an architecture; the
  identity exam should connect Least Privilege to ACLs. Cross-unit concepts
  count as integrative.
- The best integrative form is the scenario cluster: one scenario, one
  organization, 2–4 questions drilling into it from different lessons'
  angles — exactly like the 2025 exam.

## Exam sizes

Scale with the unit: roughly `2–3 × lesson count`, minimum 8, maximum 16.
Heavier exam-weight units (defense-principles, perimeter-dmz, attack-anatomy)
sit at the top of their range.

## Images in questions

A question may embed images with `![[file.png]]` inside the prompt or the
scenario — the parser strips the embed from the text, ships the image with
the question, and the UI renders it below the scenario. The file must exist
in `content/media/` or `content/assets/`; a missing file fails the build.
Never *describe* a drawing in words ("בשרטוט שלפניך...") without embedding
it.

## Diagram questions from the lecturer's decks (past-exam style)

The real exam shows a drawing and asks the student to classify or reason
about it ("לפניכם סרטוט המתאר טופולוגיה... בחרו בתשובה המתאימה ביותר").
Reproduce this style:

- Source diagrams from the lecturer's decks (`content/sources/*.pdf`) —
  extract with `pdftoppm -png -r 150 -f <page> -l <page>` and crop with
  `sips --cropOffset <y> <x> -c <h> <w>`. Ship them in `content/media/`.
- **Crop the caption off** when the caption names the answer (e.g. the
  "(d) Fabrication" label under an attack-flow drawing) — the drawing is
  the question; the label is the answer key.
- Use answer-neutral file names (`attack-flow-diagram-1.png`, not
  `fabrication.png`) — file names leak through URLs.
- In explanations, never call components by bare letters even when the
  drawing labels them A/B (the lint blocks A–E tokens): write "רכיב המקור",
  "רכיב היעד", or use X (allowed).
- Good targets: RFC 2828 flow diagrams (deck 03 p8), DMZ topology/zones
  (deck 07 p4), Bastion host (p7), Three-Legged vs Screened Subnet drawings
  (p9/p11 — the versions WITHOUT the pros/cons text), ACL tables (deck 05).
- A two-image question is supported (two `![[...]]` embeds) — ideal for
  "which architecture is stronger" comparisons.
