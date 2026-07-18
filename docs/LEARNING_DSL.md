# LEARNING_DSL.md

> Version 2.0
> Status: Canonical

This document defines the educational language used by the HCI Learning Platform.

It is the only supported format for writing educational content.

---

# ⚠️ Read This Before Editing

**Version 1.0 of this document was corrupted.** Every directive was written as a
bare `:::` with its name stripped, which made the entire vocabulary unreadable —
`:::definition` had become `:::`. The parser contract was, for a time,
undefined.

Two rules exist to prevent a recurrence:

1. **Every directive example in this file is inside a fenced code block.**
   Never write a directive name in bare prose.
2. **This document is not the source of truth. It is the human-readable mirror
   of one.** The machine-readable vocabulary lives in
   `packages/core/src/directives.ts`. If the two ever disagree, **the code wins**
   and this file is the bug.

Adding a directive is a three-step change, in this order:

1. add it to `packages/core/src/directives.ts`
2. teach the parser to build its Knowledge Object
3. teach the renderer to draw it

---

# Philosophy

Content describes **what** is being taught.

The renderer decides **how** it is displayed.

Never mix content with presentation.

---

# Language

Educational content is written in **Hebrew**.

Technology names stay in English and are never translated.

```text
Affordance   ✅        אַפוֹרדנס       ❌
Usability    ✅
UI/UX        ✅
Persona      ✅
Wireframe    ✅
```

The UI renders right-to-left. Authors do not think about this — write Hebrew
prose, and the renderer handles direction and bidi isolation.

---

# Front Matter

Every lesson begins with YAML front matter.

```yaml
---
id: lesson-01
title: מהו HCI?
lessonNumber: 1
course: hci-course
category: יסודות
difficulty: easy
estimatedTime: 25
tags:
  - hci
  - fundamentals
prerequisites: []
relatedLessons:
  - lesson-02
relatedConcepts:
  - Affordances
  - Usability
version: 1
---
```

`id` and `title` are **required**. Everything else has a default.

`version` exists because published lessons are immutable — an edit ships as a
new version, and a student's progress stays attached to the version they
actually completed.

---

# Directive Syntax

A directive is a fenced container block.

````md
:::name
content
:::
````

Some directives take attributes.

````md
:::quiz{ref="lesson-01-quiz"}
:::
````

**Unknown directive names are a hard parser error.** There is no silent
fallback — a typo is caught at build time, not discovered by a student staring
at a blank page.

---

# The Complete Vocabulary

Seventeen directives. This list is exhaustive.

| Directive     | Purpose                              | Required? |
| ------------- | ------------------------------------ | --------- |
| `objectives`  | What the student will know after this| per lesson |
| `definition`  | What a thing *is*                    | per concept |
| `example`     | One concrete, real-world case        | per concept |
| `analogy`     | A familiar situation that clarifies  | optional  |
| `important`   | A fact that must be remembered       | optional  |
| `warning`     | A common misunderstanding to avoid   | optional  |
| `tip`         | Practical advice                     | optional  |
| `diagram`     | A described visual                   | optional  |
| `image`       | A described image                    | optional  |
| `animation`   | A described animation                | optional  |
| `video`       | A described video                    | optional  |
| `selfcheck`   | A question that verifies understanding | per section |
| `quiz`        | Reference to a quiz file             | per lesson |
| `flashcards`  | Reference to a flashcard deck        | per lesson |
| `summary`     | Closing recap, no new information    | per lesson |
| `keypoints`   | The bullet-list takeaways            | per lesson |
| `references`  | Where this came from                 | per lesson |

---

# Semantic Blocks

## objectives

````md
:::objectives
- להגדיר מהו HCI (מנשק אדם-מחשב).
- להבין את ההבדל בין UI, UX ל-HCI.
- לזהות מתי עיצוב ממוקד-משתמש (UCD) בא לידי ביטוי בממשק.
:::
````

## definition

Answers **"what is this?"** — nothing more.

Short. Precise. Objective. **Never contains an example.**

````md
:::definition
HCI (מנשק אדם-מחשב) הוא תחום הבוחן כיצד בני אדם מתקשרים עם מערכות ממוחשבות,
ומעצב את הממשק כך שיהיה יעיל, נוח ונגיש למשתמש.
:::
````

Definitions are **owned by concepts**. A lesson that defines a term inline is
duplicating knowledge — link to the concept instead.

## example

Answers **"where would I actually meet this?"**

Concrete. Practical. Drawn from real systems students already use.

````md
:::example
כאשר אתם מזמינים אוכל דרך Wolt, כל החלטת עיצוב — היכן ממוקם כפתור ההזמנה, כיצד
מנוסחת הודעת השגיאה, כמה צעדים עד התשלום — היא תוצר של HCI: התאמת הממשק לדרך
שבה בני אדם חושבים ופועלים.
:::
````

## analogy

Optional. Use only when a familiar situation genuinely makes a hard idea
easier — not for decoration.

````md
:::analogy
Affordance דומה לידית של דלת: צורתה מרמזת כיצד להשתמש בה — ידית בולטת מזמינה
משיכה, ומשטח שטוח מזמין דחיפה, עוד לפני שקראנו שלט כלשהו.
:::
````

---

# Callouts

Same shape, different intent. The renderer colors them by meaning.

## important

For facts a student must carry forward. **Overuse destroys the signal** — if
everything is important, nothing is.

````md
:::important
כל שמישות (Usability) כוללת שימושיות (Utility), אך מערכת שימושית אינה בהכרח שמישה.
:::
````

## warning

For a specific misconception you are actively heading off.

````md
:::warning
Affordance אינו Signifier. Affordance היא אפשרות הפעולה עצמה; Signifier הוא הרמז
החזותי שמסמן היכן לבצע אותה.
:::
````

## tip

Optional. Practical advice.

````md
:::tip
כשאתם מעריכים ממשק, התחילו תמיד מהשאלה: מה המשתמש מנסה להשיג כאן?
:::
````

---

# Media

Content **describes** visuals it does not have, and **names** the ones the
vault does.

There is no ASCII art and no external URL in educational content. What a
directive gives you is a description — the author says what should be drawn,
and the renderer decides whether and how to draw it. What an embed gives you
is a real file that already lives in the vault.

## Embedding a real asset

````md
![[Norman Door.png]]

![[Norman Door.png|דלת שהידית שלה מזמינה משיכה בעוד שצריך לדחוף — אפורדנס שגוי.]]
````

The file must exist in `content/media`. **An embed of a file the vault does
not hold is a build error** — a student never meets a broken image.

Write the file name, never a path: content does not know how the vault is laid
out, and it certainly does not know the URL an app happens to serve it from.
The text after `|` becomes the caption.

The build copies only the assets that are actually embedded, so an unused image
in the vault ships nothing.

Everything below describes a visual that does not exist yet.

## diagram

````md
:::diagram
תרשים המראה את מודל עיבוד המידע האנושי: קלט חושי נכנס לתפיסה, עובר לזיכרון
העבודה (קצר-טווח), ומשם להחלטה ולפעולה. לצד זיכרון העבודה מופיע הזיכרון
ארוך-הטווח שמזין ומקבל מידע.
:::
````

## image

````md
:::image
צילום מסך של טופס הרשמה עם מיקרו-קופי טוב: הודעות שגיאה ברורות ליד כל שדה.
:::
````

## animation

````md
:::animation
אנימציה המראה משתמש עובר דרך תהליך Think-aloud במבחן שמישות: הוא מקריא את
מחשבותיו בעודו מנסה להשלים משימה בממשק.
:::
````

## video

````md
:::video
סרטון קצר המדגים מבחן שמישות אמיתי: מנחה, משתתף ומשימה, מנקודת מבטו של המשתמש.
:::
````

---

# Assessment

## selfcheck

Every major section ends with one. Verifies **understanding**, never recall.

````md
:::selfcheck
question: האם עיצוב גרפי יפה של מסך מספיק כדי לומר שהממשק "טוב" מבחינת HCI?
answer: לא. HCI בוחן גם שמישות — האם המשתמש מבין כיצד לפעול ומשלים את המשימה — ולא רק את המראה.
:::
````

Note this replaces the `<details>` HTML tags used in the old golden lesson.
Content never contains HTML — the renderer decides whether the answer is
revealed by a click, a hover, or an accordion.

## quiz

A reference. **Never an inlined quiz.**

````md
:::quiz{ref="lesson-01-quiz"}
:::
````

## flashcards

````md
:::flashcards{ref="lesson-01"}
:::
````

---

# Closing Blocks

## keypoints

````md
:::keypoints
- HCI רחב יותר מ-UI: הוא כולל את המשתמש, המשימה וההקשר.
- UI הוא הממשק הגלוי, UX היא החוויה הכוללת, ו-HCI הוא התחום שחוקר את שניהם.
- כל החלטת עיצוב טובה מתחילה מהבנת המשתמש.
:::
````

## summary

Reinforces. Introduces nothing new. Fits on one screen.

````md
:::summary
HCI הוא התחום החוקר את האינטראקציה בין בני אדם למערכות ממוחשבות. הבנת המושג היא
אבן היסוד ללימוד עיצוב חוויית משתמש, משום שכל עיקרון עיצוב ושיטת מחקר שנלמד
בהמשך נשען עליו.
:::
````

## references

````md
:::references
- מצגות הקורס, שיעור 1
- NotebookLM — סיכום מקורות
:::
````

---

# Concept Links

Concepts are referenced with Obsidian wiki-link syntax.

```md
[[Affordances]]

[[Usability]]

[[Mental Models]]
```

Never use Markdown links for concepts.

The parser resolves `[[Affordances]]` to `concepts/affordances.md` and emits a
`concept-reference` object. The renderer turns it into an interactive chip with
a hover preview. **A link to a concept that does not exist is a build error.**

Every one of these links becomes an edge in the knowledge graph. This is the
only way graph edges are created — the graph is derived, never authored.

---

# Standard Markdown

These work as expected and need no directive:

- **Explanations** — ordinary paragraphs. This is the connective tissue of a
  lesson and should be most of it.
- **Headings** — `#` lesson, `##` section, `###` topic.
- **Lists** — prefer them over dense prose.
- **Tables** — for comparisons only.
- **Code** — fenced blocks. Always rendered LTR, even inside Hebrew text.

---

# Forbidden in Content

Educational content must survive being rendered by a client that does not exist
yet — a mobile app, a CLI, a screen reader, a print export.

```text
HTML             ❌   including <details>, <br>, <div>
JSX              ❌
CSS              ❌
Tailwind classes ❌
React components ❌
ASCII diagrams   ❌   describe with :::diagram instead
External images  ❌   put the file in content/media and write ![[file.png]]
YouTube URLs     ❌   describe with :::video instead
Inline styling   ❌
Layout hints     ❌
```

If content specifies presentation, presentation has leaked into content, and
the separation the whole architecture rests on is gone.

---

# Educational Rules

Explain before you define.

Introduce one new concept at a time.

Keep paragraphs to 4–6 lines.

Prefer visual explanation where it genuinely helps.

Always assume the student is meeting this topic for the first time.

---

# Quality Checklist

Every lesson must answer:

```text
✓ What is it?
✓ Why does it matter?
✓ How does it work?
✓ Where is it used?
✓ Example
✓ Common mistakes
✓ Self-check
✓ Related concepts
```

If any is missing, the lesson is incomplete.

---

# Related Documents

| Document              | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `packages/core/src/directives.ts` | **The actual vocabulary.** Code, not prose. |
| `CONTENT_SPEC.md`     | How content is structured                  |
| `PARSER_SPEC.md`      | How this DSL becomes Knowledge Objects     |
| `AI_AUTHORING_GUIDE.md` | How AI writes content in this DSL        |
| `ARCHITECTURE.md`     | Where the parser sits in the system        |
