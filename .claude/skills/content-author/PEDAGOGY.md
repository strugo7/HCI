# Pedagogy Engine — Evidence-Based Lesson Design

> This is the *why* behind every lesson. `SKILL.md` tells you the mechanics; this
> file tells you what makes a lesson actually teach. Read it before authoring, and
> run the audit at the bottom before you call a lesson done.
>
> Every principle here is backed by learning-science research (see Sources). None
> of it is decoration — each maps to a concrete move you make in the markdown.

---

## The prime directive: backward design

Never start from the slides. Start from the exam.

A lesson is built in this order — the reverse of how it's read:

1. **What must the student be able to *do* on the exam?** (the multiple-choice
   questions they must answer — recognize, apply, analyze)
2. **What evidence proves they can do it?** (the Self-Checks and exam patterns)
3. **What explanation + examples + visuals get them there?** (the body)

If a paragraph does not serve an objective that is tested, cut it. Every lesson
element must trace back to something the exam asks. This is the single biggest
lever on quality: a lesson aligned to outcomes beats a lesson that merely
"covers the material."

> Source: backward design / Understanding by Design (Wiggins & McTighe).

---

## The six strategies (the core of every lesson)

These six are the most robustly validated learning strategies in cognitive
psychology. Each maps directly onto a move in our DSL. **A finished lesson uses
all six.**

### 1. Retrieval practice — *recall beats re-reading*

Students learn by pulling information *out* of memory, not by reading it again.
Every Self-Check is a retrieval event, not a summary.

- **Do:** end every section with a question that forces recall or application —
  "Without scrolling up, how would you tell an affordance from a signifier?"
- **Don't:** write a Self-Check whose answer is visible in the sentence above it.
- Self-Checks should feel slightly effortful. Desirable difficulty is the point.
- Feed the exam: our quizzes and flashcards are retrieval tools — write the
  lesson so its Self-Checks *become* good flashcards.

### 2. Spaced & interleaved practice — *connect across, revisit over time*

Learning sticks when it's distributed and mixed, not crammed in one block.

- **Interleave:** deliberately contrast the current concept with a *previously
  taught* one it's confused with (`[[Affordances]]` vs `[[Signifiers]]`). Mixing
  discriminable concepts is where interleaving pays off.
- **Space:** link aggressively with `[[ ]]` so the knowledge-graph can build
  learning paths that resurface concepts later. Reference prerequisites by link
  so the student re-touches them.
- A concept that never links out is a concept that will be forgotten.

### 3. Dual coding — *words + a picture, always*

The brain encodes verbal and visual information on separate channels; using both
builds more retrieval routes. **Every abstract or spatial concept gets a visual
directive.**

- Pair each core concept with a `:::diagram`, `:::animation`, or `![[image]]`
  that shows the *same* idea the text explains — not decoration, the same idea.
- Especially for: processes (steps), comparisons (X vs Y), structures
  (hierarchies), and anything with before/after (good vs bad interface).
- The caption should let the visual stand on its own.

### 4. Concrete examples — *anchor every abstraction in a real interface*

Abstract principles are learned through concrete instances the student already
knows.

- **Every** technical concept gets ≥1 real example from a product students use:
  Apple, Slack, Gmail, Instagram, Microsoft, iOS. Never hypotheticals.
- Give **two contrasting** examples where possible: one where the principle is
  honored, one where it's violated (a good button vs a Norman door). Contrast
  cases teach the boundary of a concept better than a single example.
- Vary domains (web, mobile, physical) so the concept transfers.

### 5. Elaboration — *make them ask and answer "why" and "how"*

Explaining *why* something is true, and how it connects to what they know,
builds durable understanding.

- Don't just state a principle — explain the mechanism and the consequence of
  violating it (the template's "Why it matters" / "Consequence" fields exist for
  this; always fill them).
- Prompt elaborative thinking in Self-Checks: "*Why* would this interface
  frustrate a novice but not an expert?" beats "What is progressive disclosure?"
- Connect new ideas to the student's own experience and to prior concepts.

### 6. Worked examples — *show the reasoning, then fade the support*

For anything procedural (especially exam questions), a fully worked-out solution
lowers cognitive load for novices far more than problem-solving from scratch.

- In "Common Exam Patterns," don't just give the answer — **model the reasoning**
  the student should run: why B is right *and* why A, C, D are traps.
- Sequence support: worked example (full reasoning) → completion (partial) →
  independent Self-Check. This "fading" is how novices become able to solve alone.

> Sources: the six strategies (Weinstein, Madan & Sumeracki; The Learning
> Scientists). Worked-example effect (Sweller, cognitive load theory).

---

## Cognitive load — the constraint everything obeys

Working memory is tiny. Every design choice either spends it on learning or
wastes it on confusion. Protect it.

- **One concept per lesson.** Depth over breadth. If a lesson has two big ideas,
  split it.
- **Simple first, then deepen.** Plain-language definition → formal explanation →
  nuance. Never lead with the jargon-dense version.
- **Chunk.** Short paragraphs, 3–5 items per group, clear section boundaries.
- **Progressive disclosure.** Introduce complexity only when the student needs
  it, not up front.
- **Cut extraneous load.** No decorative asides, no tangents outside course
  scope, no cleverness that costs clarity. Coherence beats completeness.

> Source: cognitive load theory (Sweller); multimedia learning (Mayer).

---

## Learning objectives with Bloom's taxonomy

Objectives are the contract for the lesson. Write them first, make them testable,
and span cognitive levels — because the exam does.

Use action verbs across the levels (low → high):

| Level | Verbs | Exam question style |
|-------|-------|---------------------|
| Remember | define, list, name, recall | recognition |
| Understand | explain, describe, distinguish, summarize | comprehension |
| Apply | apply, use, demonstrate, choose | application scenario |
| Analyze | compare, contrast, differentiate, diagnose | analysis / "which principle is violated" |

- 4–6 objectives per lesson, ordered simple → complex.
- **Never** use unmeasurable verbs ("know", "understand deeply", "appreciate")
  as the *only* framing — pair with an observable verb.
- Every objective must map to at least one Self-Check *and* one exam pattern. If
  it doesn't, it's not really an objective.

> Source: Bloom's revised taxonomy (Anderson & Krathwohl).

---

## The learning progression (from CLAUDE.md — never skip a stage)

```
Definition → Explanation → Example → Visualization → Self-Check → Summary → Practice
```

Each stage maps to a strategy above:

| Stage | Strategy it delivers |
|-------|----------------------|
| Definition | simple-first / low cognitive load |
| Explanation | elaboration (the "why"/"how") |
| Example | concrete examples (real interfaces, contrast cases) |
| Visualization | dual coding |
| Self-Check | retrieval practice |
| Summary | consolidation / spacing hook |
| Practice | worked examples → independent retrieval (exam patterns) |

A section that jumps from Definition straight to Self-Check skipped elaboration,
examples, and dual coding — three of the six strategies. Don't.

---

## What NOT to do (anti-patterns that feel productive but don't teach)

- ❌ Summarizing slides verbatim — expand, clarify, add examples and visuals.
- ❌ Re-reading disguised as review — if the answer is on screen, it's not
  retrieval.
- ❌ One example per concept — students need multiple, contrasting, cross-domain.
- ❌ Abstract-only explanation with no real interface — no anchor, no transfer.
- ❌ Objectives that use "know/understand" and are never tested.
- ❌ Decorative visuals that don't carry the concept — that's extraneous load.
- ❌ Introducing concepts outside course scope — faithful to lecturer material.
- ❌ Learning-styles / VARK framing — not evidence-based; do not design around it.
- ❌ Two big concepts crammed into one lesson — split them.

---

## Pedagogical audit (run before Definition of Done)

A lesson is not done until every box is true:

**Alignment (backward design)**
- [ ] Every objective is measurable (action verb) and spans ≥3 Bloom levels
- [ ] Every objective maps to ≥1 Self-Check AND ≥1 exam pattern
- [ ] Nothing in the body fails to trace back to a tested objective
- [ ] Exam weights (HIGH/MEDIUM/LOW) tag what's actually emphasized

**The six strategies**
- [ ] **Retrieval:** every section ends with a recall/apply question whose
      answer isn't visible above it
- [ ] **Spacing/interleaving:** ≥2 `[[links]]` to related/contrasted concepts,
      incl. one the concept is commonly confused with
- [ ] **Dual coding:** every core concept has a visual directive carrying the
      same idea as the text
- [ ] **Concrete examples:** every concept has ≥1 real-interface example; key
      concepts have a good-vs-bad contrast pair
- [ ] **Elaboration:** every principle states its "why" and the consequence of
      violating it
- [ ] **Worked examples:** exam patterns model the full reasoning (why right,
      why each distractor is wrong)

**Cognitive load**
- [ ] Exactly one central concept
- [ ] Simple-language definition precedes the formal one
- [ ] Chunked (short paragraphs, ≤5 items per group)
- [ ] No content outside course scope

**Faithfulness**
- [ ] Aligned to the lecturer's `content/sources/` material first, external
      references second

---

## Sources

- [The Learning Scientists — Six Strategies for Effective Learning](https://www.learningscientists.org/blog/2017/4/20-1)
- [Weinstein, Madan & Sumeracki — Teaching the science of learning (2018)](https://link.springer.com/article/10.1186/s41235-017-0087-y)
- [Retrieval + Spaced Practice must be combined — Evidence Based Education](https://evidencebased.education/resource/retrieval-and-spaced-practice-study-strategies-that-must-be-combined/)
- [Cognitive Load Theory — principles & instructional design](https://educationaltechnology.net/cognitive-load-theory-principles-learning-processes-and-implications-for-instructional-design/)
- [Backward Design framework — UC Merced Teaching Commons](https://teach.ucmerced.edu/pedagogy-guides/backwards-design)
- [Bloom's Taxonomy in instructional design](https://www.commlabindia.com/blog/blooms-taxonomy-in-instructional-design)
