# The plumbing already exists — do not rebuild it

Everything below shipped with the 2023 import. A second or third paper is **content work only**: transcribe, author, build. If you find yourself editing these files, ask why.

## Schema — `packages/core/src/quiz.ts`

| field | on | meaning |
|---|---|---|
| `ExamSchema.kind` | exam | `'unit'` (ours) or `'lecturer'` (theirs). Defaults to `'unit'`, so existing exams are untouched. |
| `ExamSchema.unit` | exam | Nullable. A `superRefine` still requires it when `kind === 'unit'`. |
| `ExamSchema.year` / `duration` / `source` | exam | Provenance. `duration` is seconds. |
| `QuestionSchema.lockAnswerOrder` | question | Pin the options. Defaults to `false`. |
| `QuestionSchema.answers` | question | `min(4).max(5)` — both shapes already validate. |
| `QuestionSchema.scenario` / `images` | question | Both already existed. |

## Parser — `packages/markdown-parser/src/quiz.ts`

`parseExam` peeks at `kind` in the frontmatter, then passes `ownerOptional` into `scanAssessment`. A lecturer exam declares no `unit`; its questions carry the exam id in their `lesson` field.

`lockAnswerOrder` is in the `FIELD` regex and parsed by the `boolean()` helper.

## Compiler — `scripts/lib/compile.ts`, `scripts/build-content.ts`

- Pass 4 reads **both** `content/exams/` and `content/exams/lecturer/`.
- `listMarkdown` filters to `isFile()`, so the subdirectory does not confuse the unit-exam pass.
- The curriculum check in `build-content.ts` skips `kind === 'lecturer'` — a lecturer exam belongs to no unit and must not be validated against `curriculum.yaml`.
- The emitted index appends lecturer exams **after** the unit exams, newest year first. (The old emit mapped over `units`, which silently dropped them.)

## Lint — `scripts/lib/exam-lint.ts`

Three rules. Lecturer exams are held to rule 1 only.

| rule | lecturer | why |
|---|---|---|
| shuffle-safe explanations | **on** | the explanations are ours, and they get shuffled |
| correct-answer-is-longest | off | cannot rewrite another person's distractors |
| integrative coverage | off | not our exam to design |

A question with `lockAnswerOrder` is exempt from rule 1 — nothing is reordered, so a letter still points where the author meant.

### The regexes, and why they look like that

```ts
const LETTER_REF = /(?<![A-Za-z0-9&])[A-E](?![A-Za-z0-9&]|-[A-Za-z])/;
const HEBREW_LETTER_REFS = [
  /(?<![֐-׿])[א-ה][׳'](?![֐-׿])/,
  /(?:תשוב(?:ה|ות)|מסיח(?:ים)?|סעיף|אפשרות)\s+[א-ד](?![֐-׿]|-[A-Za-z0-9])/,
];
```

Both exclusions were learned from real content and must not be "simplified" away:

- **The Latin rule alone was a hole.** It only ever fired because our exams happen to name options in Latin. A Hebrew explanation saying "תשובה א׳" sailed straight past it — the one rule protecting a shuffled exam was not checking the thing it exists to check.
- **`-[A-Za-z]` guard.** `"אפשרות ה-True Negative"` is the definite article on a foreign term, not option ה. Our own `content/exams/ids-ips.md` says exactly that.
- **The second pattern stops at ד.** A bare ה after an introducing word is nearly always the article: `"המסיחים ה'פאסיביים'"`, `"אפשרות ה'כוללת'"`. A genuine option-ה reference carries a geresh, which the first pattern catches.

## Runtime — `apps/web/src/features/quiz/`

- `shuffle.ts` — `shuffleAnswers()` returns `question.answers` untouched when `lockAnswerOrder` is set; otherwise Fisher–Yates, once per attempt.
- `question-card.tsx` — `POSITION_LABELS = ['א','ב','ג','ד','ה']`. The label is the **position**, never the canonical key. Keys stay Latin (`correct: C`): that is what the grader matches on, what every content file is written in, and it is never shown.

## UI — `apps/web/src/pages/practice.tsx`

One hub, three tabs, tab held in the URL (`/practice?tab=lecturer`).

| tab | source |
|---|---|
| לפי שיעורים | each lesson's `quiz.md` |
| לפי יחידות לימוד | `content/exams/*.md` |
| מבחני מרצה | `content/exams/lecturer/*.md` |

`/exams` redirects to the units tab. `/exams/:examId` is unchanged — a lecturer exam is an `Exam`, so the existing runner grades it with no new code. `content.ts` exposes `unitExamsIndex()` and `lecturerExamsIndex()`.

## Known cosmetic quirk

In 2023 Q3, the option `"כל התשובות נכונות"` shuffles like any other and can land first. It stays logically correct (it refers to the set), but it reads oddly. If the user objects, the fix is an "anchor last" flag on the answer — not pinning the question.
