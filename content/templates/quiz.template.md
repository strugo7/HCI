# QUIZ_TEMPLATE.md

> HCI Quiz Template
>
> Version: 1.0

---

# Purpose

This template defines the standard format for every quiz question in the HCI platform.

Questions should evaluate understanding rather than memorization.

Every question must have exactly one correct answer.

---

## Metadata

```yaml
id:
lesson:
difficulty:
estimatedTime:
points:
concepts:
tags:
```

Example

```yaml
id: q-001
lesson: lesson-04
difficulty: medium
estimatedTime: 45
points: 5
concepts:
  - Affordances
  - Signifiers
tags:
  - interaction-design
```

---

# Question

```md
## Question

<question text>
```

Example

```md
## Question

Which property of an object communicates what actions a user can perform with it?
```

---

# Scenario (Optional)

```md
### Scenario

<context>
```

Example

```md
### Scenario

A team has just released a mobile app where users report they cannot tell
which elements on the screen are tappable.
The design team wants to make the available actions clearer to users.
```

---

# Diagram (Optional)

```md
:::
affordances-diagram
:::
```

---

# Image (Optional)

Embed an image anywhere in the question text or the scenario:

```md
![[information-architecture.png]]
```

The file must exist in `content/media/` or `content/assets/`. The embed is
stripped from the text and rendered below the scenario. A question that
describes a drawing must embed it — an embed of a missing file fails the
build.

---

# Answers

```md
A.

B.

C.

D.
```

Example

```md
A. Cognitive Load

B. Affordance

C. Persona

D. Wireframe
```

---

# Correct Answer

```yaml
correct: B
```

---

# Explanation

```md
### Explanation

Explain why the correct answer is correct.

Explain why the other answers are incorrect.
```

Example

```md
אַפוֹרְדֶנְס (Affordance) היא אפשרות הפעולה שאובייקט מציע למשתמש, ולכן היא זו שמתקשרת אילו פעולות ניתן לבצע.

עומס קוגניטיבי מתאר את המאמץ המנטלי הנדרש, ולא את אפשרות הפעולה.

פרסונה היא ייצוג של משתמש טיפוסי ואינה תכונה של אובייקט.

Wireframe הוא שרטוט מבנה של מסך ואינו מתאר אפשרות פעולה של רכיב.
```

---

# Learning Objective

```yaml
objective:
```

Example

```yaml
objective:
Understand the purpose of affordances in interaction design.
```

---

# Cognitive Skill

Allowed values

```yaml
remember

understand

apply

analyze

evaluate
```

Example

```yaml
cognitive: analyze
```

---

# Question Type

Supported values

```yaml
multiple-choice

scenario

diagram

architecture

comparison

incident-response

attack-analysis

best-practice
```

---

# Difficulty

```yaml
easy

medium

hard
```

---

# Concepts Tested

```yaml
concepts:

- Affordances

- Signifiers

- Mental Models
```

---

# Common Misconception

(Optional)

```yaml
misconception:
```

Example

```yaml
misconception:
Students often confuse affordances with signifiers.
```

---

# AI Generation Rules

AI should:

- Create realistic scenarios.
- Use plausible distractors.
- Test conceptual understanding.
- Avoid trivia.
- Use HCI and UX terminology correctly.
- Ensure only one answer is correct.

---

# Example

```md
---
id: q-021
lesson: lesson-05
difficulty: medium
points: 5
estimatedTime: 60
concepts:
  - Affordances
  - Signifiers
cognitive: analyze
type: scenario
---

## Question

Which design change should be applied first to help users understand which element on the screen is clickable?

### Scenario

A small company has released a new web application to its customers.

Users report they cannot tell which items on the page are interactive.

### Answers

A. Add a [[Persona]]

B. Add a clear [[Signifiers|signifier]] such as an underline or button styling

C. Reduce the [[Cognitive Load]]

D. Create a [[Wireframe]]

correct: B

### Explanation

סיגניפייר (Signifier) הוא רמז חזותי כמו קו תחתון או עיצוב של כפתור, שמראה למשתמש היכן וכיצד לפעול, ולכן הוא הפתרון הישיר לבעיה.

פרסונה היא ייצוג של משתמש טיפוסי ואינה משנה את המסך עצמו.

הפחתת עומס קוגניטיבי חשובה אך אינה מבהירה אילו רכיבים לחיצים.

Wireframe הוא שרטוט מבנה ואינו רמז אינטראקציה למשתמש הסופי.

objective:
Understand the role of signifiers in communicating affordances.

misconception:
Students often believe an affordance is visible on its own, without a signifier.
```

---

# Golden Rules

- Exactly one correct answer.
- Every distractor must be technically plausible.
- Prefer real-world scenarios.
- Test reasoning rather than recall.
- Always include an explanation.
- Questions should resemble university exam quality.