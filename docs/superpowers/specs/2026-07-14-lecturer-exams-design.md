# מבחני מרצה — Lecturer Exams

**Date:** 2026-07-14
**Status:** Approved, ready for planning

## The goal

Take the three original exams written by ד"ר יצחק אביב (2023, 2024, 2025) and republish them
inside CyberAtlas as gradeable exams that are **faithful replicas**: the same questions, the same
options, word for word. The only thing we change is the order the options appear in.

Then unify all practice into one page with three tabs: by lesson, by unit, lecturer exams.

## What we start from

`content/quizzes/` holds three PDFs. They are **scans with no text layer** — the text cannot be
copied out, only read visually, page by page.

Two facts make this project possible, and both came from the user:

1. **The PDFs are master forms: option א is always the correct answer.** No exam ships an answer
   key, so without this the questions would not be gradeable at all.
2. **The diagrams are already extracted.** Six figures from the 2023 exam live in `content/media/`.

A prior transcription exists at `.extraction/00-past-exams.md` (852 lines, all 60 questions). It is
a *reconstruction*, and it flags its own soft spots (2023 Q11: "הסריקה מטושטשת… שוחזר בקירוב").
**It is a cross-check, not the source of truth.** The source of truth is the scan.

## Non-goals

- Rewriting, improving, or "fixing" the lecturer's questions. Even the typos stay (2023 Q3 says
  "Warm" for "Worm" — it ships as "Warm").
- Holding these exams to our Golden Exam authoring standard. They are an archive of someone else's
  exam, not an exam we designed.

---

## 1. Transcription: fidelity is the whole product

For each of the 60 questions, read the scanned page and transcribe **verbatim**: the stem, every
option, and the scenario text if the question belongs to a cluster. Then diff against
`.extraction/00-past-exams.md` and resolve every discrepancy by re-reading the scan.

### The א-invariant, used as a correctness check

Because option א is always correct in a master form, it doubles as a self-check:

> After transcribing a question, ask whether option א is defensibly the correct answer.
> If it plainly is not, the option order was misread — go back to the scan.

This caught nothing on the questions verified so far (2023 Q6's א maps exactly onto RFC 2828's
Disruption → Incapacitation/Corruption/Obstruction; Q8's א is passive interception, confirmed
against the scan the user supplied), but it is the check that makes a 60-question transcription
trustworthy at scale.

Any question where א remains doubtful after a careful re-read gets flagged in the plan for the user
to adjudicate, rather than guessed.

### Images: check `content/media/` first

When a question has a figure, **look in `content/media/` before doing anything else.** All six 2023
figures are already there; attach the existing asset rather than re-extracting it.

| 2023 question | asset |
|---|---|
| Q5 — רכיב X בין A ל-B | `exam-2023-topology-abx.png` |
| Q7 — spear-phishing flow | `exam-2023-phishing-flow.png` |
| Q8 — Bob / Alice / Darth | `exam-2023-bob-alice.png` |
| Q12 — Enterprise WAN | `exam-2023-enterprise-wan.png` |
| Q18 — DMZ options A/B/C | `exam-2023-dmz-options.png` |
| Q19 — linear DMZ | `exam-2023-dmz-linear.png` |

Only if a figure turns out to be missing do we crop it from the PDF and add it to `content/media/`.
2024 and 2025 contain no diagrams.

### Scenario clusters

`QuestionSchema.scenario` already exists and carries the shared setup text. The scenario is repeated
on every question in its cluster so each question renders standalone.

- **2023** — two small clusters (Q9–11, Q12–13).
- **2024** — none; all questions standalone.
- **2025** — three large clusters covering 14 of 20 questions: בנק דיסקונט (Q7–11),
  ID-SecureTech (Q12–15), בית החולים לב השרון (Q16–20).

---

## 2. The shuffle

Two independent shuffles, and we want both.

**At authoring time** — a one-time deterministic permutation baked into the `.md`, so `Correct:`
varies across questions and the file is not a readable master form.

**At render time** — `apps/web/src/features/quiz/shuffle.ts` already reshuffles an exam's answers on
every attempt. Two students see different orders; a retry is never the same order twice.

The authored shuffle is what the user asked for and protects the content file. The render shuffle is
what actually defeats memorization. Neither replaces the other.

---

## 3. Explanations are ours, and they are shuffle-safe

The lecturer never published explanations. We write our own, one per question, plus a learning
objective (`QuestionSchema` requires both).

Two rules follow:

- **Never name an option letter.** "תשובה א׳ נכונה" is a bug: א׳ will not be א׳ on the next attempt.
  Explanations refer to option *content*, never position. Our lint already enforces this and it
  **stays on** for lecturer exams.
- **Attribute honestly.** The page states that the questions are the lecturer's and the explanations
  are ours, so nobody studies one of our mistakes believing it came from ד"ר אביב.

---

## 4. Schema

`ExamSchema` in `packages/core/src/quiz.ts` hard-requires a `unit`. A lecturer exam belongs to no
unit — it cuts across the whole course.

```ts
export const ExamKindSchema = z.enum(['unit', 'lecturer']);

export const ExamSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('exam'),
  kind: ExamKindSchema.default('unit'),   // default keeps every existing exam valid, untouched
  unit: z.string().nullable().default(null),
  title: z.string().min(1),
  questions: z.array(QuestionSchema),

  // provenance — lecturer exams only
  year: z.number().int().nullable().default(null),
  duration: z.number().int().positive().nullable().default(null),  // seconds
  source: z.string().nullable().default(null),                     // original PDF filename
}).superRefine((exam, ctx) => {
  if (exam.kind === 'unit' && exam.unit === null) {
    ctx.addIssue({ code: 'custom', path: ['unit'], message: 'a unit exam must declare its unit' });
  }
});
```

`kind` defaulting to `'unit'` means all nine existing exams keep validating with no edit. Consumers
that read `exam.unit` (notably `exams.tsx` → `unitById`) must guard against `null`.

Each question's `lesson` field carries the mapped unit id, using the topic map already worked out in
`.extraction/00-past-exams.md`. That preserves the existing "questions carry their owner" convention
and leaves the door open to a future "filter lecturer questions by topic".

Files land in `content/exams/lecturer/{2023-a,2024-a,2025-a}.md`. `compile.ts` pass 4 reads that
subdirectory in addition to `content/exams/`.

---

## 5. Lint

`scripts/lib/exam-lint.ts` enforces three rules. Only the two that judge *authoring quality* get
switched off for `kind: 'lecturer'` — we cannot rewrite another person's questions to satisfy them.

| rule | lecturer exams | why |
|---|---|---|
| shuffle-safe explanations (no bare A–E tokens) | **on** | the explanations are ours, and they get shuffled |
| correct-answer-is-longest | off | the lecturer's correct option often *is* the longest |
| integrative question coverage | off | not our exam to design |

Our own unit exams remain under the full Golden Exam standard. Nothing about that standard relaxes.

### Two bugs this project exposes in the lint — fix both first

**The shuffle-safety regex is blind to Hebrew option letters.** Today:

```ts
const LETTER_REF = /(?<![A-Za-z0-9&])[A-E](?![A-Za-z0-9&]|-[A-Za-z])/;
```

Latin `A`–`E` only. Our existing exams are Hebrew prose that names options in Latin ("תשובה C שגויה"
— the rule's own doc comment), so it has held up so far. But the natural way to write 60 new Hebrew
explanations is **"תשובה א׳ נכונה"** / **"המסיח ב׳"** — Hebrew letters, which the regex does not
match. The single rule we are keeping on is the rule that would not have fired.

Extend `LETTER_REF` to cover standalone **א–ה** (including the geresh forms `א׳` / `א'`) before
authoring any explanation. This also retroactively protects the nine existing unit exams.

**`examFile()` assumes a non-null unit.** It builds `content/exams/${exam.unit}.md`, which becomes
`content/exams/null.md` once `unit` is nullable. It must derive the path from the exam's actual
source file (or its id) so lecturer diagnostics point somewhere real.

---

## 6. UI: one hub, three tabs

`/practice` becomes the single practice page.

| tab | source | today |
|---|---|---|
| לפי שיעורים | each lesson's `quiz.md` | current `/practice` |
| לפי יחידות לימוד | `content/exams/*.md` | current `/exams` |
| מבחני מרצה | `content/exams/lecturer/*.md` | new |

- The active tab lives in the URL (`/practice?tab=lecturer`) so it is linkable and survives a reload.
- `/exams` redirects to `/practice?tab=units`.
- `/exams/:examId` is **unchanged**. A lecturer exam is an `Exam`, so the existing runner grades it
  with no new code.
- The nav drops its now-duplicate "מבחנים" entry.
- `@radix-ui/react-tabs` is already a dependency.

A lecturer exam card shows year, מועד, question count, and duration (2023 = 2 hours; 2024 and
2025 = 90 minutes).

---

## 7. Build order

Ship a **thin vertical slice first**: schema + lint + tabs + the 2023 exam only, end to end.

The dominant risk in this project is a transcription that is subtly wrong, repeated 60 times. The
slice retires that risk while it is still cheap — the user can open one real lecturer exam, compare
it against the PDF, and confirm fidelity before we transcribe another 40 questions and write another
40 explanations.

Then bulk-author 2024 and 2025.

## 8. Verification

- `pnpm content:build` passes; 3 exams × 20 questions parse; every exam totals 100 points.
- The six 2023 image questions resolve to real assets — a missing asset is a build diagnostic, not a
  broken image at runtime.
- No lecturer explanation contains a standalone A–E **or א–ה** token. The Hebrew half of that rule
  does not exist yet — §5 adds it, and it must be proven with a failing-then-passing test.
- Authored `correct` keys are not all `A` — proves the authoring shuffle actually ran.
- The nine existing unit exams still lint clean after the schema and lint changes.
- Open each exam in the app and answer it through.
