# HCI Domain Alignment Design Spec

**Date:** 2026-07-18  
**Course:** HCI & UX (27203901)  
**Exam Format:** American multiple-choice in English  
**Platform:** Human-Computer Interface Learning Platform  

---

## Executive Summary

Transform the existing educational platform from security-education context to HCI-exam-prep context using a **template-driven approach**. This preserves the entire technical architecture while aligning skills, documentation, and content patterns to the HCI domain. Result: Contributors have clear HCI templates to follow; platform is consistently aligned with course goals.

---

## Problem Statement

The platform was initially built for Computer Security education. It's being repurposed for HCI exam preparation (course 27203901), but:

1. **Skills and docs still reference security examples** (firewalls, attacks, etc.)
2. **README.md describes Computer Security education** (not HCI)
3. **Content templates don't exist** for HCI lesson/quiz/flashcard formats
4. **Quiz format isn't yet aligned** with American multiple-choice exam standard

Contributors creating HCI lessons lack clear patterns to follow, and the platform's messaging is misaligned.

---

## Solution: Template-Driven Domain Alignment

Instead of rewriting all code, create **reusable HCI templates** that become the source of truth for:
- Lesson structure (from lecturer PowerPoint/PDF → markdown)
- Quiz format (American multiple-choice exam style)
- Flashcard format (spaced repetition study aids)
- Concept definitions (if using concepts/ directory)

Then update **core docs** and **skills** to reference these templates, replacing security examples with HCI ones.

---

## Detailed Design

### 1. New Template Files

Create `/docs/templates/` directory with four HCI-specific templates:

#### 1a. `HCI_LESSON_TEMPLATE.md`
**Purpose:** Guide for converting lecturer materials (PowerPoint/PDF) into markdown lessons.

**Structure:**
```markdown
# [Unit Name]: [Topic Title]

## Overview
[1-2 sentence summary of what this topic covers and why it matters for exam]

## Learning Objectives
- [Student should understand X HCI principle]
- [Student should be able to apply Y in design context]
- [Student should recognize Z pattern in real interfaces]

## Core Concepts

### [Concept 1: e.g., "Affordances"]
**Definition:** [Clear definition grounded in HCI theory]

**Why It Matters:** [Real-world application or exam relevance]

**Example:** [Concrete example from interfaces, design, or user behavior]

### [Concept 2]
[Same structure]

## Key Principles
- [Principle 1 from lecture]
- [Principle 2 from lecture]
- [Principle 3 from lecture]

## Common Exam Patterns
- [Question type 1 likely on exam: "Define X"]
- [Question type 2 likely on exam: "Which principle applies to Y?"]

## Related Concepts
- [Link to concept]: [Brief connection]
- [Link to lesson]: [How it builds on previous unit]

## Resources
- Lecturer material: [Source file name]
- Related units: [List]
```

**Rationale:**
- **Overview** hooks importance for exam prep
- **Learning Objectives** let students self-assess understanding
- **Core Concepts** maps to quiz content
- **Common Exam Patterns** helps students prepare for question types
- **Related Concepts** shows knowledge graph connections
- **Resources** traces back to authoritative materials

---

#### 1b. `HCI_QUIZ_TEMPLATE.md`
**Purpose:** Template for American multiple-choice quiz questions (exam format).

**Structure:**
```markdown
# Quiz: [Unit Name]
## [Topic Area]

### Question 1
**Type:** Concept Definition | Application | Scenario | Analysis

**Question Text:**
Which of the following best describes **[HCI concept/term]**?

A) [Incorrect distractor — plausible but wrong]
B) [Correct answer — grounded in lecture/theory]
C) [Incorrect distractor — common misconception]
D) [Incorrect distractor — related concept but not correct]

**Correct Answer:** B

**Explanation:**
[Why B is correct. Reference lecture material or HCI principle.]
[Why A/C/D are incorrect (addresses common misunderstandings)]

**Exam Weight:** [HIGH | MEDIUM | LOW]
**Related Concepts:** [Link to lesson concepts]

---

### Question 2
[Repeat structure]

## Answer Key
| Question | Answer | Explanation |
|----------|--------|-------------|
| 1 | B | ... |
| 2 | A | ... |
```

**Rationale:**
- **Type field** helps identify question patterns students will see
- **Distractors** are psychologically plausible, not random
- **Explanation** teaches, not just grades
- **Exam Weight** helps students prioritize study
- **Related Concepts** links to lessons for review

---

#### 1c. `HCI_FLASHCARD_TEMPLATE.md`
**Purpose:** Spaced-repetition study cards for quick concept recall.

**Structure:**
```markdown
# Flashcards: [Unit Name]

## Card 1: [Concept Name]

**Front (English):**
What is [concept]? / Define [concept] / Explain [principle]

**Back (English):**
[Definition — one sentence, clear and complete]

[Brief elaboration — why it matters in HCI/exam context]

**Back (Hebrew - optional for recall aid):**
[Hebrew translation or mnemonic if helpful]

**Exam Weight:** [HIGH | MEDIUM | LOW]

**Remember:**
- [Key distinction or common confusion to watch for]
- [Real-world example if applicable]

---

## Card 2: [Concept Name]
[Repeat structure]
```

**Rationale:**
- **English front** matches exam language
- **Hebrew back** optional for bilingual learners
- **One-sentence definition** forces clarity
- **Exam Weight** prioritizes study time
- **Remember section** catches misconceptions

---

#### 1d. `HCI_CONCEPTS_TEMPLATE.md` (if using concepts/ directory)
**Purpose:** Concept definitions for knowledge graph / searchable reference.

**Structure:**
```markdown
# [Concept Name]

**Hebrew Name:** [תרגום בעברית]

**Definition:** [Concise definition grounded in HCI]

**Context:** [Where this concept appears in curriculum]

**Related Terms:**
- [Parent concept]: [How this concept relates]
- [Sibling concept]: [Distinction]
- [Child concept]: [How this concept breaks down]

**Exam Relevance:** [Why students need to know this]

**Example:** [Real interface or design case study]

**Common Misconceptions:**
- [Misconception 1 & why it's wrong]
- [Misconception 2 & why it's wrong]
```

**Rationale:**
- Searchable atomic definitions
- Links form the knowledge graph automatically
- Addresses misconceptions preemptively

---

### 2. Updated Core Documentation

#### 2a. **README.md Changes**
**From:**
```
# Human Computer Interface 

> AI-powered knowledge platform for Computer Security education.
```

**To:**
```
# Human-Computer Interface Exam Prep

> AI-powered learning platform for HCI & User Experience (Course 27203901).

A professional exam-prep resource for students preparing for university-level HCI coursework, built on markdown source of truth and interactive quizzes in American multiple-choice format.
```

**Additional updates:**
- Update status section: "Phase 1: HCI curriculum scaffolding (1 of 11 units implemented)"
- Replace security examples with HCI examples in "Getting started"
- Update ROADMAP reference: "See `docs/ROADMAP.md` for HCI curriculum timeline"
- Add link to `docs/templates/` for content contributors

**Rationale:** Accurate branding; clear purpose; contributor guidance.

---

#### 2b. **CLAUDE.md Changes**
**Add new section (at top, after title):**

```markdown
## HCI Domain Context

This platform is built for **HCI & User Experience education** (University Course 27203901), not security education. When writing content or creating lessons:

### Core HCI Concepts
- **Human-Centered Design (HCD):** Design process that puts user needs first
- **Usability:** How easily users can learn and use an interface
- **Affordances:** Visual/physical cues that suggest how to interact with an object
- **Mental Models:** How users understand a system based on prior experience
- **Cognitive Load:** Mental effort required to use an interface

### Content Guidelines
- All lesson content must connect to HCI principles from lecturer materials
- Quiz questions must match American multiple-choice format (A/B/C/D)
- Use real interface examples (not hypothetical)
- Exam weight: 40% Ethnographic Research + Usability Testing, 30% Core Concepts, 30% Design Methods

### When Creating Content
- Use templates in `docs/templates/` for lessons, quizzes, flashcards
- Reference lecturer materials in `content/sources/` as authoritative source
- Link concepts to curriculum units in `content/curriculum.yaml`
```

**Rationale:** Domain context is explicit for contributors; reduces confusion from old security content.

---

#### 2c. **LEARNING_DSL.md Review**
- **Action:** Scan for security-specific examples (firewalls, authentication, etc.)
- **If found:** Replace with HCI examples (e.g., "affordance detection" instead of "attack detection")
- **If not found:** Add link to templates: "See `docs/templates/` for HCI-specific content structures"

---

#### 2d. **ARCHITECTURE.md Review**
- **Action:** Scan for security-specific examples in "Parser → Knowledge Objects" pipeline section
- **If found:** Replace with HCI data flow (e.g., "lesson → concept extraction → flashcard generation" instead of security pipeline)
- **If not found:** No changes needed

---

#### 2e. **ROADMAP.md Review**
- **Action:** Ensure timeline aligns with HCI curriculum (11 units, not security phases)
- **If misaligned:** Update phase descriptions to reference HCI topics by weight:
  - **Phase 1:** Foundation + Ethnographic Research (high exam weight)
  - **Phase 2:** Cognitive Psychology + Design Methods
  - **Phase 3:** Usability + Testing (high exam weight)
  - **Phase 4:** Information Architecture + Micro Copy

---

### 3. Skills Audit & Updates

#### 3a. `content-author` Skill
**Current State:** Generic lesson-authoring guidance (likely security-focused examples)

**Changes:**
- Replace security concepts example with HCI example (e.g., "affordances" vs "threat vectors")
- Add link to `docs/templates/HCI_LESSON_TEMPLATE.md`
- Add note: "Lessons should connect to lecturer materials in `/content/sources/`"
- Add exam-format guidance: "Structure lessons around concepts likely to appear in American multiple-choice questions"

---

#### 3b. `quiz-generator` Skill
**Current State:** Generic quiz structure (may not match American multiple-choice format)

**Changes:**
- Add section: "American Multiple-Choice Format"
  - A/B/C/D options only (never "all of the above" or "none of the above")
  - One unambiguously correct answer
  - Three psychologically plausible distractors
- Add link to `docs/templates/HCI_QUIZ_TEMPLATE.md`
- Add exam-weight mapping: "HIGH weight topics (Ethnographic Research, Usability Testing) should have 30+ questions; MEDIUM weight topics 15-20; LOW weight 5-10"

---

#### 3c. `flashcard-creator` Skill (if exists)
**Changes:**
- Add link to `docs/templates/HCI_FLASHCARD_TEMPLATE.md`
- Add note: "Front should be English (exam language); back can include Hebrew mnemonic"
- Add exam-weight guidance: "Cards should prioritize HIGH and MEDIUM weight concepts"

---

#### 3d. `knowledge-graph` Skill
**Status:** Likely domain-neutral (derives connections automatically)
**Action:** Scan for security examples; if none found, no changes needed.

---

### 4. File Inventory

**Files to Create:**
```
docs/templates/
├── HCI_LESSON_TEMPLATE.md
├── HCI_QUIZ_TEMPLATE.md
├── HCI_FLASHCARD_TEMPLATE.md
└── HCI_CONCEPTS_TEMPLATE.md
```

**Files to Update:**
```
docs/
├── README.md                  [Update branding + links]
├── CLAUDE.md                  [Add HCI domain context]
├── LEARNING_DSL.md            [Review + add template link]
├── ARCHITECTURE.md            [Review for security examples]
└── ROADMAP.md                 [Align with HCI phases]

~/.claude/skills/
├── content-author/            [Update examples + add template link]
├── quiz-generator/            [Add American multiple-choice guidance]
├── flashcard-creator/         [Add template link]
└── knowledge-graph/           [Review]
```

**Files to Leave Untouched:**
- All source code (packages/, apps/, scripts/)
- Existing lesson content (`content/lessons/`)
- curriculum.yaml (already HCI-aligned)

---

## Implementation Sequence

1. **Create templates** (30 min)
   - Write all four template files to `/docs/templates/`
   - Include HCI examples, not security examples

2. **Update core docs** (30 min)
   - README.md: branding + contributor guidance
   - CLAUDE.md: add HCI domain context section
   - LEARNING_DSL.md: review + link templates
   - ARCHITECTURE.md: review + update if needed
   - ROADMAP.md: align with HCI phases

3. **Audit & update skills** (20 min)
   - content-author: link to HCI_LESSON_TEMPLATE, add exam guidance
   - quiz-generator: add American multiple-choice section, link to HCI_QUIZ_TEMPLATE
   - flashcard-creator: link to HCI_FLASHCARD_TEMPLATE
   - knowledge-graph: scan for security examples (likely none)

4. **Verification** (10 min)
   - Grep for leftover security keywords in key files (CLAUDE.md, README.md)
   - Confirm all templates are linked from skills
   - Do not commit yet — user reviews spec first

---

## Success Criteria

- [ ] All four templates created with HCI examples (no security examples)
- [ ] README.md updated to reflect "HCI exam prep" branding
- [ ] CLAUDE.md includes HCI domain context + exam format guidance
- [ ] All skills (content-author, quiz-generator, flashcard-creator) link to templates
- [ ] No lingering security examples in README.md, CLAUDE.md, or core skills
- [ ] New contributor can follow templates to write HCI lesson + quiz
- [ ] Grep for common security terms (firewall, attack, vulnerability) in docs returns no results

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Templates too prescriptive, discourage creativity | Templates are guides, not laws. Skill instructions emphasize "adapt as needed" |
| Old security content still surfaces in searches | Grep verification step catches this; cleanup in future phase |
| Skills not updated thoroughly enough | Skill update checklist ensures coverage (content-author, quiz-generator, flashcard-creator) |
| Incomplete coverage (missing a skill or doc) | Inventory section lists all files to update |

---

## Scope Boundaries

**In Scope:**
- Creating HCI templates
- Updating docs (README.md, CLAUDE.md, LEARNING_DSL.md, ARCHITECTURE.md, ROADMAP.md)
- Updating skills (content-author, quiz-generator, flashcard-creator, knowledge-graph)
- Verification via grep

**Out of Scope:**
- Migrating existing lesson content (what-is-hci is already HCI-aligned)
- Deleting old security content (cleanup in separate phase)
- Redesigning platform architecture (kept intact)
- Rewriting source code (parser, renderer, quiz-engine remain unchanged)

---

## Success Outcome

After implementation, a new contributor can:
1. Read `/docs/templates/HCI_LESSON_TEMPLATE.md`
2. Convert a lecturer PowerPoint to markdown lesson following the template
3. Read `/docs/templates/HCI_QUIZ_TEMPLATE.md`
4. Create American multiple-choice quiz questions with proper format
5. Read CLAUDE.md for HCI domain context
6. Know which exam topics are high-weight vs low-weight

Platform messaging is consistent: "HCI exam prep," not "computer security education."

---

## Assumptions

1. **Lecturer materials in `/content/sources/`** are authoritative and already organized by HCI topic
2. **Existing architecture (packages/, apps/)**  will not change
3. **Exam format is confirmed:** American multiple-choice, English language
4. **Target audience:** University students preparing for course 27203901 final exam
5. **Contribution model:** Multiple students/instructors will use templates to create lessons and quizzes

---

## Next Steps

1. User reviews this spec
2. If approved: Invoke `writing-plans` skill to create detailed implementation plan
3. Implementation team executes plan
4. Verification: Grep + spot-check new content
5. Commit templates, docs, and skill updates to git

---

**End of Design Spec**
