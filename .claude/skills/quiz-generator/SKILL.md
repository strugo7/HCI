---
name: quiz-generator
description: Generate university-level HCI (Human-Computer Interaction) quizzes and exams from platform lessons using the Learning DSL and the exam standard.
---

# Quiz Generator Skill

You generate high-quality quiz questions for the HCI Learning Platform (Course 27203901).

> [!IMPORTANT]
> You MUST read and strictly adhere to the guidelines specified in the workspace customization rules file [.agents/AGENTS.md](file:///Users/ofekstrogo/human-computer-intereface-platform/.agents/AGENTS.md) when generating quizzes or exams. Especially:
> 1. **Avoid Length Bias**: The longest answer option must not always be the correct one.
> 2. **Dilemma Design**: Distractors must create a high-quality cognitive dilemma between 2 or 3 options, ensuring only one correct answer exists.

Your quizzes must resemble the real university HCI exam: **American multiple-choice, in English**.

The objective is to evaluate understanding rather than memorization.

Follow the template in `docs/templates/HCI_QUIZ_TEMPLATE.md`.

---

## Format (the real exam)

- **Four options (A–D) per question.** Exactly one is correct.
- **Question text and all four answers are in English** — the exam is in English, so practice in English.
- **The explanation is written in Hebrew** as a study aid, with the English HCI term alongside.
- Multiple-choice only — no "all of the above", no "none of the above".

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

Generate `quiz.md` using the platform Quiz DSL.

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

- Concept Definition
- Scenario Analysis
- Application ("a designer wants to…")
- Comparison (Compare & Contrast)
- Method Selection (which research/evaluation method fits)
- Heuristic Recognition (map a problem to a Nielsen heuristic)

Mix types whenever possible. The real exam leans on scenario questions — prefer them.

---

## Golden Rules

Every question must:

- Have exactly one correct answer.
- Test understanding.
- Use accurate HCI terminology (affordances, signifiers, usability, mental models, cognitive load, Nielsen's heuristics, think-aloud, personas, information architecture).
- Avoid trivia.
- Avoid ambiguity.
- Include an explanation (in Hebrew).
- Include plausible distractors.
- Trace to the lecturer's material in `content/sources/`.

---

## Distractor Rules

Wrong answers should:

- Be conceptually plausible.
- Represent common misconceptions (e.g. confusing affordance with signifier, or utility with usability).
- Be close enough to require reasoning.
- Never be jokes.
- Follow the length-neutrality and dilemma design guidelines in [.agents/AGENTS.md](file:///Users/ofekstrogo/human-computer-intereface-platform/.agents/AGENTS.md).

---

## Difficulty Guidelines

Easy

- Recall basic concepts.
- Identify definitions.
- Understand terminology.

Medium

- Apply concepts to a design situation.
- Analyze a short scenario.
- Compare two methods or concepts.

Hard

- Evaluate a design against principles.
- Choose the best research/evaluation method for a goal.
- Diagnose a usability problem and map it to a heuristic.
- Combine multiple concepts across lessons.

---

## Preferred Scenarios

Prefer realistic product and research settings:

- Mobile app onboarding
- E-commerce checkout flows
- Form and error-message design
- Website navigation and information architecture
- Usability test sessions (moderator, participant, think-aloud)
- Ethnographic field observation
- Persona and journey-map creation

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
- Question (English)
- Optional Scenario (English)
- Four answer choices, A–D (English)
- Correct answer
- Explanation (Hebrew, with English term on first use)
- Concepts (as `[[bracket]]` links, so questions join the knowledge graph)
- Difficulty
- Cognitive level

---

## Quality Checklist

Before finishing verify:

- One correct answer.
- Four plausible answers (A–D).
- No ambiguity.
- Conceptual accuracy (faithful to the lecture).
- Real-world relevance.
- Explanation included (Hebrew).
- Difficulty matches metadata.
- Concepts align with the lesson and use `[[bracket]]` links.

---

# Unit Exam Standard (מבחן מסכם)

Every curriculum unit ends with a summative exam that integrates the whole
unit. Exams live in `content/exams/<unit-id>.md`, use the same question DSL as
lesson quizzes, and are validated by a dedicated lint at build time
(`scripts/lib/exam-lint.ts`) — the rules below are **enforced**, not advisory.

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

- **Four options (A–D) per question.** 5 points per question.
- Difficulty mix: ~20% easy, ~50% medium, ~30% hard.
- **Question and answers in English; explanation in Hebrew** (with the English
  HCI term alongside on first use).
- Realistic scenarios (app onboarding, checkout, form design, a usability
  session). The real exam is scenario-heavy — prefer scenario clusters.
- Never repeat a question that already exists in the unit's lesson quizzes.
  Read them first; the exam tests the same material from new angles.

## Rule 1 — shuffle-safe writing (answers are randomized at runtime)

The web app shuffles answer order on every attempt. Therefore:

- **Never reference option letters** in the explanation or misconception —
  no "answer C is wrong", and no Hebrew equivalent ("תשובה ג׳ שגויה"). Refer to
  answers by their content: "האפשרות הטוענת ש-Affordance הוא רק עניין ויזואלי —
  שגויה, כי...". The lint rejects standalone A–D option-letter tokens (in both
  alphabets) inside explanations.
- Never write answers that depend on position: no "all of the answers", no
  "answers A+B", no "none of the above".
- The `Correct:` letter still refers to the authored order — that is fine; it
  is canonical, only the display shuffles.

## Rule 2 — distractor parity (kill the "longest answer" tell)

Students learn that the longest, most detailed option is correct. Break the
pattern:

- All four options must sit in the same length band — the longest option no
  more than ~1.35× the mean of the others. The lint warns per question and
  **fails the exam** if the correct answer is the longest in more than 35%
  of questions.
- The fix is never to truncate the correct answer into vagueness — it is to
  give distractors the same specificity: a wrong answer should contain a real
  mechanism, applied wrongly ("Recognition asks the user to retrieve the
  answer from memory unaided" — concrete, plausible, wrong; that is recall).
- Give distractors the same grammatical shape as the correct answer.
- Build distractors from documented misconceptions (the lesson's
  `misconception:` fields are a goldmine), from adjacent concepts
  (affordance↔signifier, utility↔usability, recognition↔recall,
  formative↔summative evaluation), and from true statements that don't answer
  the question.

## Rule 3 — integration (the exam is more than the sum of its quizzes)

- At least **40% of questions must be integrative**: their `concepts:` list
  spans two or more lessons of the unit. The lint checks this against the
  lessons' concept ownership.
- In later units, reach back: a Usability-Testing exam question should make the
  student apply a persona (unit 4) inside a test plan; an Information-
  Architecture question should connect card sorting to mental models.
  Cross-unit concepts count as integrative.
- The best integrative form is the scenario cluster: one scenario, one product,
  2–4 questions drilling into it from different lessons' angles.

## Exam sizes

Scale with the unit: roughly `2–3 × lesson count`, minimum 8, maximum 16.
Heavier exam-weight units (Ethnographic Research, Usability Testing) sit at the
top of their range.

## Images in questions

A question may embed images with `![[file.png]]` inside the prompt or the
scenario — the parser strips the embed from the text, ships the image with the
question, and the UI renders it below the scenario. The file must exist in
`content/media/` or `content/assets/`; a missing file fails the build. Never
*describe* a drawing in words ("in the wireframe below…") without embedding it.

## Diagram questions from the lecturer's decks (past-exam style)

The real exam shows an interface or diagram and asks the student to classify or
reason about it ("the wireframe below shows a checkout flow… choose the best
answer"). Reproduce this style:

- Source diagrams from the lecturer's decks (`content/sources/*.pdf`) — extract
  with `pdftoppm -png -r 150 -f <page> -l <page>` and crop with
  `sips --cropOffset <y> <x> -c <h> <w>`. Ship them in `content/media/`.
- **Crop the caption off** when the caption names the answer (e.g. a slide
  labelled "Closed Card Sort" under the diagram) — the drawing is the question;
  the label is the answer key.
- Use answer-neutral file names (`ia-diagram-1.png`, not `card-sorting.png`) —
  file names leak through URLs.
- In explanations, never call components by bare option letters even when a
  drawing labels them A/B (the lint blocks A–D tokens): write "the source
  element", "the target element", or use X (allowed).
- Good targets: wireframe vs mockup vs prototype comparisons, journey-map
  diagrams, card-sort groupings, the double-diamond design-thinking diagram,
  Norman's stages-of-action, an AEIOU observation grid.
- A two-image question is supported (two `![[...]]` embeds) — ideal for
  "which layout is more usable" comparisons.
