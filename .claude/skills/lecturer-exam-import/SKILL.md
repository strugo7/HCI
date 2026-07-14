---
name: lecturer-exam-import
description: Transcribe a lecturer's real past exam (scanned PDF in content/quizzes) into a gradeable CyberAtlas exam under content/exams/lecturer — verbatim questions and distractors, shuffled option order, our own explanations, and diagrams pulled from content/media. Use when asked to import, transcribe, or rebuild an original exam (מבחן מרצה) from the scanned papers.
---

# Lecturer Exam Import

Turn a scanned past paper into an exam a student can actually sit — without changing a single word the lecturer wrote.

The product is a **replica, not an adaptation**. Question text and distractor text are copied verbatim, typos included. The only thing that changes is the order the options appear in. Everything else we add (explanations, concept tags) is clearly ours.

**The platform plumbing is already built.** Schema, parser, compiler, lint, shuffle, Hebrew option letters, and the three-tab practice page all shipped with the 2023 import. A new paper is *content work only*. Read `PIPELINE.md` before editing any code — if you are changing `quiz.ts` or `exam-lint.ts`, you are probably doing it wrong.

## The two facts the whole thing rests on

Before you touch anything, confirm both. If either is false, stop and ask.

1. **The PDFs are master forms: option א is always the correct answer.** No paper ships an answer key. Without this, the questions are not gradeable and there is nothing to build.
2. **The scans have no text layer.** You cannot copy text out. You must *read the pages visually* with the Read tool.

## Non-goals

- Do not rewrite, improve, or fix the lecturer's questions. `Warm` stays `Warm`. A broken Hebrew sentence stays broken.
- Do not hold these exams to the Golden Exam standard. They are an archive of someone else's paper.

---

## Step 1 — Read the scan. Never trust a prior transcription.

`.extraction/00-past-exams.md` holds an earlier visual reconstruction of all 60 questions. **It is a cross-check, not a source.** It has been caught reordering options (2023 Q11), and it flags its own blurry spots.

```
Read content/quizzes/<the paper>.pdf   pages: 1-5, then 6-N
```

Transcribe each question verbatim: stem, every option in the order printed, and any shared scenario text.

### The א-invariant — your correctness check

Because א is always correct, it is also a transcription test:

> After transcribing a question, ask: **is option א defensibly the correct answer?**
> If it plainly is not, you misread the option order. Go back to the scan.

This is what caught the 2023 Q11 error. Use it on every question — it is the only thing that makes a 60-question transcription trustworthy.

If א still looks wrong after a careful re-read, **do not guess**. Flag the question to the user and let them adjudicate against the paper.

### Report what you could not read

Scans are blurry. When a word or a whole option is genuinely unclear, transcribe your best reading and **tell the user exactly which questions to verify**. Never silently smooth over a sentence that does not parse — the lecturer's Hebrew really is broken in places, and "fixing" it is a fidelity bug.

---

## Step 2 — Images: look in `content/media/` FIRST

When a question has a figure, **check `content/media/` before extracting anything**. The 2023 figures are already cropped and named:

| question | asset |
|---|---|
| Q5 — component X between A and B | `exam-2023-topology-abx.png` |
| Q7 — spear-phishing flow | `exam-2023-phishing-flow.png` |
| Q8 — Bob / Alice / Darth | `exam-2023-bob-alice.png` |
| Q12 — Enterprise WAN | `exam-2023-enterprise-wan.png` |
| Q18 — DMZ options A/B/C | `exam-2023-dmz-options.png` |
| Q19 — linear DMZ | `exam-2023-dmz-linear.png` |

Embed with `![[file.png]]` in the prompt or the scenario. A file the vault does not hold is a **build error**, not a broken image the student discovers. Only crop from the PDF if the asset is genuinely missing.

---

## Step 3 — Shuffle, and know what you must NOT shuffle

Write the options into the `.md` in a **shuffled order**, with `Correct:` pointing at wherever the original א landed. This stops the file from being a readable master form. The engine reshuffles again at render time on every attempt, so both layers are in play.

### Pin any question whose options reference other options

This is the trap. Some options name their siblings by letter:

- *"תשובות ב' ו-ג' אפשריות"* (2023 Q11)
- *"תשובה א' ו-ב' נכונות"* (2023 Q19)

Shuffle those and the reference follows the *slot*, not the option it meant — the question becomes **wrong**, not merely reordered. Mark them:

```
lockAnswerOrder: true
```

and keep the original order (so `Correct: A`). `shuffleAnswers()` honours the flag, so the runtime shuffle skips them too.

**"כל התשובות נכונות" does NOT need pinning** — it refers to the set, not to positions, and stays true wherever it sits.

### Option count is whatever the paper says

2023 uses four options; 2024–25 use five. 2023 Q19 is the lone five-option question in an otherwise four-option paper. `answers` is `min(4).max(5)` — do not force uniformity by deleting an option the lecturer wrote.

---

## Step 4 — Explanations are ours, and they must be shuffle-safe

The lecturer published none. Write one per question, plus a `Learning Objective` and a `Misconception`.

**Never name an option by letter.** Not `A`, not `א׳`. The answer order changes on every attempt, so a letter points somewhere different each time. Refer to options by *content*:

- ❌ "תשובה א׳ נכונה"
- ❌ "אפשרות B מתארת…"
- ✅ "האפשרות שמתארת יירוט פסיבי…"
- ✅ "הארכיטקטורה עם שתי חומות אש ו-DMZ ביניהן…"

This bites hardest on diagram questions whose options legitimately say "נקודה B" or "אפשרות A" — those are *diagram labels*, and you still must paraphrase them in the explanation ("הנקודה שבין ענן האינטרנט לבין מטה הארגון").

`scripts/lib/exam-lint.ts` enforces this in **both alphabets**. Rule 1 applies to lecturer exams; rules 2 and 3 do not.

Say plainly, on the page, that the explanations are ours — so nobody studies one of our mistakes believing it came from the lecturer.

---

## Step 5 — File shape

`content/exams/lecturer/lecturer-<year>-<moed>.md`

```markdown
---
id: lecturer-2023-a
kind: lecturer
title: "מבחן מרצה — תשפ\"ג, סמסטר א', מועד א'"
year: 2023
duration: 7200          # seconds. 2023 = 2h; 2024/25 = 90min
source: "<original PDF filename>"
---
```

`kind: lecturer` is what exempts the exam from the authoring-quality lint and lets it carry no `unit`.

### The DSL's one sharp edge

**The prompt goes ABOVE `### Scenario`, never inside it.** The parser starts the prompt at the first non-field line and ends it at `### Scenario`. Put the question first and the situation in the scenario block — the card renders prompt, then image, then scenario.

```markdown
## Question

id: q-lecturer-2023-a-011
type: scenario
points: 5
lockAnswerOrder: true
concepts:
  - IDS

<the question sentence>

### Scenario

<the shared situation, and ![[image.png]] if any>

### Answers

A. …
B. …
C. …
D. …

Correct: A

Explanation: …
Learning Objective: …
Misconception: …
```

### Scenario clusters

The papers group questions under a shared setup. Repeat the scenario on **every** question in its cluster so each one renders standalone.

- 2023 — Q9–11, Q12–13
- 2024 — none
- 2025 — Q7–11 (בנק דיסקונט), Q12–15 (ID-SecureTech), Q16–20 (בית החולים לב השרון)

### Concepts

Tag from the real slugs in `content/concepts/` only — an unknown name is a build warning. `ls content/concepts` before you write.

---

## Step 6 — Verify. Do not claim it works because it parsed.

```bash
pnpm content:build      # must be 0 errors, 0 warnings
```

Then check the compiled JSON, not the markdown:

```bash
node -e "
const e=require('./apps/web/src/generated/content/exams/lecturer-2023-a.json');
console.log('questions:', e.questions.length, 'points:', e.questions.reduce((s,q)=>s+q.points,0));
console.log('correct spread:', JSON.stringify(e.questions.reduce((a,q)=>{a[q.correct]=(a[q.correct]||0)+1;return a},{})));
console.log('locked:', e.questions.filter(q=>q.lockAnswerOrder).map(q=>q.id));
console.log('images:', e.questions.filter(q=>q.images.length).map(q=>q.id+' → '+q.images));
"
```

The gate:

- [ ] 20 questions, 100 points
- [ ] `correct` is **not** all `A` — proves the authored shuffle ran
- [ ] every letter-referencing question appears in `locked`
- [ ] every figure question resolves to a real asset
- [ ] `pnpm -w turbo typecheck` passes
- [ ] the nine existing unit exams still lint clean

Finally, run the app and open the exam. Answer a question. A build that parses is not an exam that works.

---

## Reporting back

Always tell the user:

1. **Any question where the scan was ambiguous**, by number, so they can check it against the paper.
2. **Any place the prior extraction disagreed with the scan** — that is a real finding.
3. **Any question you pinned**, and why.

Fidelity is the product. A silent guess is worse than an admitted gap.
