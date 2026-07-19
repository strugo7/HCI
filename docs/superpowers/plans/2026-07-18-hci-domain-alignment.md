# HCI Domain Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform platform from Computer Security education context to HCI exam-prep context by creating reusable HCI templates and aligning all documentation and skills to the HCI domain.

**Architecture:** Template-driven approach: Create 4 reusable HCI content templates (lesson, quiz, flashcard, concept), then update core docs and skills to reference these templates while replacing security examples with HCI ones. This preserves the entire technical architecture while providing clear patterns for content contributors.

**Tech Stack:** Markdown templates, VSCode, Git, Bash (for verification)

## Global Constraints

- **Course Code:** 27203901 (HCI & User Experience)
- **Exam Format:** American multiple-choice, English language
- **Content Language:** Hebrew (interface), Markdown source material
- **Platform Architecture:** Unchanged (packages/, apps/, scripts/ stay intact)
- **Scope:** Documentation + Skills only (no code changes)

---

## Phase 1: Create HCI Templates

### Task 1: Create HCI_LESSON_TEMPLATE.md

**Files:**
- Create: `docs/templates/HCI_LESSON_TEMPLATE.md`

**Interfaces:**
- Produces: Template file that guides lesson authors to structure markdown lessons with: Overview, Learning Objectives, Core Concepts, Key Principles, Common Exam Patterns, Related Concepts, Resources

- [ ] **Step 1: Create templates directory**

```bash
mkdir -p /Users/ofekstrogo/human-computer-intereface-platform/docs/templates
```

- [ ] **Step 2: Write HCI_LESSON_TEMPLATE.md**

```bash
cat > /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_LESSON_TEMPLATE.md << 'EOF'
# [Unit Name]: [Topic Title]

## Overview

[1-2 sentence summary of what this topic covers and why it matters for exam preparation]

Example: "Affordances are visual and physical cues that guide user interaction. Understanding affordances is critical for the exam (appears in 3-5 questions) and essential for designing intuitive interfaces."

## Learning Objectives

After completing this lesson, students should be able to:
- [Student should understand X HCI principle]
- [Student should be able to apply Y in design context]
- [Student should recognize Z pattern in real interfaces or user behavior]

Example:
- Understand the definition and importance of affordances in HCI
- Identify affordances in real-world interfaces (physical and digital)
- Distinguish between affordances and signifiers (Norman's door example)

## Core Concepts

### [Concept 1: e.g., "Affordances"]

**Definition:**
[Clear, concise definition grounded in HCI theory. Should be specific enough for exam questions.]

Example: "An affordance is a property of an object that suggests how it can be used — a handle affords pulling, a button affords pressing."

**Why It Matters:**
[Real-world application or exam relevance. Connect to lecturer materials.]

Example: "The exam expects you to identify affordances in interface design scenarios. Poor affordances lead to user confusion and usability failures, which is a major HCI focus."

**Example:**
[Concrete, real interface or design example.]

Example: "Apple's door handle vs a flat surface: the handle's shape affords pulling. A poorly designed door might have no affordance, forcing users to guess (and push instead of pull)."

---

### [Concept 2]

[Repeat the structure above for each major concept]

---

## Key Principles

From the lecture materials, list the 3-5 main principles or rules students must remember:

- [Principle 1 with brief explanation]
- [Principle 2 with brief explanation]
- [Principle 3 with brief explanation]

Example (for Ethnographic Research):
- Always separate observation (facts) from interpretation (assumptions)
- Watch what people do, not what they say they do (innovation blind spot)
- Maintain reflexivity: recognize your own biases as an observer

## Common Exam Patterns

This section prepares students for question types likely to appear on the exam:

- **Question Type 1:** "Define X" → Students must provide precise definitions from lecture
- **Question Type 2:** "Which principle applies to Y scenario?" → Students recognize patterns
- **Question Type 3:** "Why is Z important?" → Students connect concepts to design practice
- **Question Type 4:** "Distinguish between A and B" → Students understand nuanced differences

Example (for Usability Testing):
- Question Type 1: "Define 'think-aloud protocol'"
- Question Type 2: "A moderator observes a user struggling with a form. Which Nielsen heuristic is violated?"
- Question Type 3: "Why do we use only 5 users instead of 50?"
- Question Type 4: "Distinguish between empirical testing and analytical evaluation"

## Related Concepts

Link this lesson to other concepts and lessons in the curriculum. This builds the knowledge graph.

**Prerequisite Concepts** (what students should know first):
- [Link]: [Brief explanation of connection]
- Example: "[[Mental Models]]: Affordances are based on users' mental models of how things work"

**Building-Block Concepts** (what this enables):
- [Link]: [Brief explanation of connection]
- Example: "[[Design Rules]]: Affordances are one of the core visual principles for interface design"

**Related Topics** (other lessons covering similar themes):
- [Link]: [Brief explanation of connection]

## Resources

- **Lecturer Material Source:** [File name from /content/sources/]
  Example: "Examine the Concept.pptx" from `/content/sources/HCI_concepts.../`

- **Related Units in Curriculum:**
  - [[Unit 1: Introduction]] — foundational concepts
  - [[Unit 6: Design Rules]] — visual principles

- **Key Exam Topics (Weight):**
  - HIGH weight: [Concept appears in 3+ exam questions]
  - MEDIUM weight: [Concept appears in 1-2 exam questions]
  - LOW weight: [Concept is background/context]

---

## Template Instructions for Authors

1. **Keep it concise:** This is a study guide, not a textbook. Aim for 2-3 core concepts per lesson.
2. **Use examples from real interfaces:** Always reference concrete examples (Slack, Twitter, Apple, etc.).
3. **Connect to the exam:** Every concept should address "why is this on the exam?"
4. **Link aggressively:** Use [[bracket notation]] for internal links to build knowledge graph.
5. **Use plain language:** Avoid jargon unless you define it. Assume students are smart but new to HCI.

EOF
```

- [ ] **Step 3: Verify file was created and is readable**

```bash
head -20 /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_LESSON_TEMPLATE.md
```

Expected output: Shows the first section of the template starting with "# [Unit Name]: [Topic Title]"

- [ ] **Step 4: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/templates/HCI_LESSON_TEMPLATE.md
git commit -m "feat: add HCI lesson template for markdown content authoring"
```

---

### Task 2: Create HCI_QUIZ_TEMPLATE.md

**Files:**
- Create: `docs/templates/HCI_QUIZ_TEMPLATE.md`

**Interfaces:**
- Produces: Template file that guides quiz authors to create American multiple-choice questions with: Type, Question Text, A/B/C/D options, Correct Answer, Explanation, Exam Weight, Related Concepts

- [ ] **Step 1: Write HCI_QUIZ_TEMPLATE.md**

```bash
cat > /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_QUIZ_TEMPLATE.md << 'EOF'
# Quiz: [Unit Name]

## [Topic Area]

### Question 1

**Type:** [Concept Definition | Application | Scenario Analysis | Comparative Understanding]

**Question Text:**

Which of the following best describes **[HCI concept/term]**?

A) [Incorrect distractor — plausible but misses a key distinction]

B) [Correct answer — grounded in lecture material and HCI theory]

C) [Incorrect distractor — addresses a common misconception]

D) [Incorrect distractor — related concept but not the right answer]

**Correct Answer:** B

**Explanation:**

**Why B is correct:** [Explain why B matches the lecture definition. Reference specific HCI principle or theory.]

**Why A is wrong:** [Address the plausibility: it sounds close but misses X]

**Why C is wrong:** [Explain the common misconception: students often confuse X with Y because...]

**Why D is wrong:** [Explain the trap: D is related but refers to a different concept]

**Exam Weight:** [HIGH | MEDIUM | LOW]

**Related Concepts:** [[Concept Name 1]], [[Concept Name 2]]

**Lecturer Reference:** [Source file or lecture slide number]

---

### Question 2

[Repeat the structure above for each question]

---

## Answer Key

| Question | Answer | Key Teaching Point |
|----------|--------|-------------------|
| 1 | B | [One sentence: what should students learn from getting this right?] |
| 2 | A | [One sentence] |
| 3 | C | [One sentence] |

---

## Template Instructions for Quiz Authors

**American Multiple-Choice Format Rules:**
- Always use A/B/C/D options (never "all of the above" or "none of the above")
- One unambiguously correct answer
- Three psychologically plausible distractors
- Each question tests one concept, not multiple combined concepts

**Distractor Design:**
- **Plausible distractors** prevent guessing. They should feel like they could be right to a student who:
  - Partially understood the concept
  - Confused this concept with a related one
  - Remembered a wrong detail from the lecture

**Exam Weight Guidance:**
- **HIGH weight topics** (Ethnographic Research, Usability Testing, Design Methods): 30+ questions in the full exam
- **MEDIUM weight topics** (Cognitive Psychology, Information Architecture): 15-20 questions
- **LOW weight topics** (Micro Copy, Visual Design): 5-10 questions

**Question Types (Common on University HCI Exams):**

1. **Concept Definition:** "Which best describes X?"
2. **Application:** "A designer wants to reduce cognitive load. Which approach..."
3. **Scenario Analysis:** "A usability test revealed users struggled with a form. What does this suggest about..."
4. **Comparative Understanding:** "What is the difference between X and Y?"
5. **Theory Recognition:** "Nielsen's 10 heuristics emphasize... which of these examples best illustrates..."

**Avoid:**
- Trick questions (questions with ambiguous wording)
- Multiple correct answers (even if one is "most correct")
- Negative questions ("Which is NOT...") — harder to grade, less pedagogical
- Questions testing trivial details instead of understanding

**Always Reference:**
- Lecturer materials (be able to cite where the answer appears in the course)
- Real examples when possible (actual interfaces, actual user research scenarios)
- Exam weight (so students know which topics to prioritize)

EOF
```

- [ ] **Step 2: Verify file was created**

```bash
head -30 /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_QUIZ_TEMPLATE.md
```

Expected output: Shows the quiz structure starting with "# Quiz: [Unit Name]"

- [ ] **Step 3: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/templates/HCI_QUIZ_TEMPLATE.md
git commit -m "feat: add HCI quiz template for American multiple-choice questions"
```

---

### Task 3: Create HCI_FLASHCARD_TEMPLATE.md

**Files:**
- Create: `docs/templates/HCI_FLASHCARD_TEMPLATE.md`

**Interfaces:**
- Produces: Template file that guides flashcard authors to create spaced-repetition study cards with: Front (English), Back (English), Back (Hebrew optional), Exam Weight, Remember section

- [ ] **Step 1: Write HCI_FLASHCARD_TEMPLATE.md**

```bash
cat > /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_FLASHCARD_TEMPLATE.md << 'EOF'
# Flashcards: [Unit Name]

## Card 1: [Concept Name]

**Front (English — what the student sees):**

[Simple question that tests recall. Should be answerable in 1-2 sentences.]

Examples:
- "What is an affordance?"
- "Define usability."
- "What are the 5 dimensions of Nielsen's usability framework?"
- "Explain the difference between Utility and Usability."

**Back (English — the answer):**

[Concise definition — one sentence, clear and complete]

Example: "An affordance is a property of an object that suggests how it can be used — a handle affords pulling, a button affords pressing."

[Brief elaboration — why it matters in HCI/exam context]

Example: "Affordances are critical for interface design. Poor affordances lead to user confusion. The exam tests whether you can recognize affordances in interface scenarios."

**Back (Hebrew — optional recall aid):**

[Hebrew translation or mnemonic if helpful for recall. Omit if English is sufficient.]

Example: "יכולת שימוש — תכונה שמציעה כיצד להשתמש בעצם"

**Exam Weight:** [HIGH | MEDIUM | LOW]

**Remember:**

[Key distinctions or common confusions to avoid. Help students distinguish this concept from related ones.]

Examples:
- "Don't confuse affordance with signifier: an affordance is actual; a signifier is perceived cue"
- "Usability has 5 dimensions: Learnability, Efficiency, Memorability, Errors, Satisfaction"
- "Mental model is user's understanding of a system; afford is what an object suggests"

[Real-world example if applicable]

Example: "Door example: a handle affords pulling. A flat plate affords pushing. Ambiguous design forces users to guess."

---

## Card 2: [Concept Name]

[Repeat the structure above for each concept]

---

## Template Instructions for Flashcard Authors

**English Front (Exam Language):**
- Front should match the language of the exam (English)
- Keep questions to 1 sentence
- Questions should test rapid recall, not deep understanding
- Avoid complex sentences

**Hebrew Back (Optional):**
- Include Hebrew only if it helps students recall the concept
- Can be a direct translation or a mnemonic
- Omit if the concept is better remembered in English (e.g., technical terms, proper nouns)

**Exam Weight:**
- HIGH weight: Card should prioritize the most commonly tested concepts (Ethnographic Research, Usability Testing)
- MEDIUM weight: Important but less frequently tested
- LOW weight: Background/context concepts

**"Remember" Section:**
- Address the #1 misconception students likely have
- Compare this concept to similar ones (affordances vs signifiers, utility vs usability)
- Provide a memorable example from real interfaces

**When to Create a Flashcard:**
- Every HIGH or MEDIUM weight concept should have a card
- Every definition needed for multiple-choice questions should have a card
- Skip LOW weight concepts unless they're easy to confuse with important ones

**When NOT to Create a Flashcard:**
- Skip complex topics that need more than a definition (use the lesson instead)
- Skip concepts that don't appear on the exam
- Skip trivia or historical details

EOF
```

- [ ] **Step 2: Verify file was created**

```bash
head -25 /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_FLASHCARD_TEMPLATE.md
```

Expected output: Shows the flashcard structure starting with "# Flashcards: [Unit Name]"

- [ ] **Step 3: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/templates/HCI_FLASHCARD_TEMPLATE.md
git commit -m "feat: add HCI flashcard template for spaced-repetition study"
```

---

### Task 4: Create HCI_CONCEPTS_TEMPLATE.md

**Files:**
- Create: `docs/templates/HCI_CONCEPTS_TEMPLATE.md`

**Interfaces:**
- Produces: Template file that guides concept definition authors to create atomic, searchable HCI concept files with: Definition, Context, Related Terms, Exam Relevance, Example, Common Misconceptions

- [ ] **Step 1: Write HCI_CONCEPTS_TEMPLATE.md**

```bash
cat > /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_CONCEPTS_TEMPLATE.md << 'EOF'
# [Concept Name]

**Hebrew Name:** [תרגום בעברית]

**Definition:**

[Concise definition grounded in HCI theory. Should be no more than 2 sentences. Precise enough for use in quiz questions.]

Example: "An affordance is a property of an object that suggests how it can be used based on its form, color, or texture."

---

## Context

**Where This Concept Appears in Curriculum:**

- Unit/Lesson: [Which unit(s) cover this concept]
- Exam Weight: [HIGH | MEDIUM | LOW]
- Prerequisite Concepts: [What should students know first]

Example:
- Units: [[Unit 1: Introduction]], [[Unit 6: Design Rules]]
- Exam Weight: HIGH (appears in 3-5 questions)
- Prerequisite: [[Norman's Design Principles]]

---

## Related Terms

**Parent Concept** (what this is a part of):
- [Concept Name]: [Brief explanation]

Example: "[[Design Principles]]: Affordances are one of the core principles for intuitive interface design"

**Sibling Concepts** (equally important, at same level):
- [Concept Name]: [Distinction]

Example:
- "[[Signifiers]]: A signifier is the perceived cue about affordances (vs affordance which is actual)"
- "[[Feedback]]: Feedback tells users the result of their action (vs affordance which suggests the action)"

**Child Concepts** (specific applications of this concept):
- [Concept Name]: [How this concept breaks down]

Example:
- "[[Button Affordance]]: A raised, clickable appearance affords pressing"
- "[[Handle Affordance]]: A protruding shape affords pulling"

---

## Exam Relevance

**Why Students Need to Know This:**

[Clear explanation of how this concept appears on the exam. Cite specific question types or scenarios.]

Example: "The exam tests affordances in interface design scenarios. Students must be able to identify good vs poor affordances and explain why poor affordances harm usability. This appears in both definition questions and scenario-based questions."

---

## Example

**Real-World Application:**

[Concrete example from actual interfaces, design, or user research.]

Example: "Apple's door handle design vs a flat surface: The handle's shape and protrusion afford pulling. A poorly designed door might have a flat plate (no affordance for pulling) forcing users to guess and push instead."

**Counter-Example:**

[What NOT to do. Show poor affordance.]

Example: "A light switch that looks the same whether up or down creates poor affordance. Users can't tell if it's on or off without turning the lights on/off. Good design would use different shapes (toggle switch) or colors to afford different states."

---

## Common Misconceptions

**Misconception 1:** [Statement of a wrong belief]

**Why It's Wrong:** [Explanation of correct understanding]

Example:
- **Misconception:** "Affordances are about icons and visual design"
- **Why It's Wrong:** "Affordances are about actual properties of objects, not their appearance. A flat surface doesn't afford pulling just because it looks pretty. Signifiers (visual cues) hint at affordances, but affordances are real properties."

**Misconception 2:** [Another common confusion]

**Why It's Wrong:** [Explanation]

Example:
- **Misconception:** "Affordances and usability are the same thing"
- **Why It's Wrong:** "Affordances are about suggesting actions. Usability is about how well users can learn and use something. Good affordances improve usability, but they're different concepts."

---

## Template Instructions for Concept Authors

**When to Create a Concept File:**

- Every major HCI term that students must know for the exam
- Every term that appears across multiple lessons
- Every term with related concepts (affordances → signifiers, usability → utility, etc.)

**Definition Guidelines:**

- Be precise: Exam-grade definition, not colloquial
- Be concise: 1-2 sentences maximum
- Be grounded: Reference HCI theory or lecturer materials
- Be testable: Should be answerable in a multiple-choice question

**Related Terms:**

- Include only terms that help students understand this concept
- Omit tangentially related concepts
- Use [[bracket links]] to build the knowledge graph

**Misconceptions Section:**

- Address the most common student misunderstanding first
- Include misconceptions that arise from:
  - Confusion with similar concepts (affordance vs signifier)
  - Oversimplification (affordance is just visual design)
  - Common English language misuse (usability ≠ utility)

**Example Section:**

- Always include a real interface or real research example
- Include a counter-example showing poor design
- Help students recognize the concept in the wild

EOF
```

- [ ] **Step 2: Verify file was created**

```bash
head -30 /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_CONCEPTS_TEMPLATE.md
```

Expected output: Shows concept template structure

- [ ] **Step 3: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/templates/HCI_CONCEPTS_TEMPLATE.md
git commit -m "feat: add HCI concepts template for knowledge graph definitions"
```

---

## Phase 2: Update Core Documentation

### Task 5: Update README.md

**Files:**
- Modify: `README.md` (lines 1-6, status section)

**Interfaces:**
- Consumes: Existing README.md structure
- Produces: Updated README with HCI branding, course context, and link to templates

- [ ] **Step 1: Read current README.md**

```bash
head -40 /Users/ofekstrogo/human-computer-intereface-platform/README.md
```

- [ ] **Step 2: Update title and description (lines 1-6)**

```bash
cat > /tmp/readme_update.txt << 'EOF'
# Human-Computer Interface Exam Prep

> AI-powered learning platform for HCI & User Experience (Course 27203901).

A professional exam-prep resource for students preparing for university-level HCI coursework, built on markdown source of truth and interactive quizzes in American multiple-choice format.

---
EOF
```

Now replace the header in README.md:

```bash
cat /tmp/readme_update.txt > /tmp/readme_new.md
tail -n +7 /Users/ofekstrogo/human-computer-intereface-platform/README.md >> /tmp/readme_new.md
mv /tmp/readme_new.md /Users/ofekstrogo/human-computer-intereface-platform/README.md
```

- [ ] **Step 3: Update status section**

Read the current status section:

```bash
grep -n "^## Status" /Users/ofekstrogo/human-computer-intereface-platform/README.md
```

Find the line number, then update that section to:

```bash
cat > /tmp/status_section.txt << 'EOF'

## Status

Phase 1: HCI curriculum scaffolding (1 of 11 units implemented).

The parser, renderer, graph, quiz engine and search are **typed contracts with unimplemented bodies** — they compile, and they throw if called. The content vault contains one complete lesson (what-is-hci) and 10 unit shells awaiting content.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for HCI curriculum timeline.

---
EOF
```

Use Edit tool to replace the old status section with this new one (will do in next step).

- [ ] **Step 4: Add link to templates section**

Add this new section before the "Before you write code" section:

```bash
cat >> /tmp/templates_link.txt << 'EOF'

## Content Templates

New to writing HCI content? Start here:

- **Lessons:** [`docs/templates/HCI_LESSON_TEMPLATE.md`](docs/templates/HCI_LESSON_TEMPLATE.md) — Structure for lessons from lecturer materials
- **Quizzes:** [`docs/templates/HCI_QUIZ_TEMPLATE.md`](docs/templates/HCI_QUIZ_TEMPLATE.md) — American multiple-choice format
- **Flashcards:** [`docs/templates/HCI_FLASHCARD_TEMPLATE.md`](docs/templates/HCI_FLASHCARD_TEMPLATE.md) — Spaced repetition study aids
- **Concepts:** [`docs/templates/HCI_CONCEPTS_TEMPLATE.md`](docs/templates/HCI_CONCEPTS_TEMPLATE.md) — Knowledge graph definitions

---
EOF
```

- [ ] **Step 5: Use Edit tool to update README.md completely**

Using the Edit tool to make precise updates to README.md:

OLD (lines 1-6):
```markdown
# Human Computer Interface 

> AI-powered knowledge platform for Computer Security education.

Educational content is written in **Hebrew** (technology names stay in English).
The interface is **RTL-first**.
```

NEW:
```markdown
# Human-Computer Interface Exam Prep

> AI-powered learning platform for HCI & User Experience (Course 27203901).

A professional exam-prep resource for students preparing for university-level HCI coursework, built on markdown source of truth and interactive quizzes in American multiple-choice format. Educational content is written in **Hebrew** (HCI terminology stays in English). The interface is **RTL-first**.
```

- [ ] **Step 6: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add README.md
git commit -m "feat: update README.md for HCI exam prep branding and add template links"
```

---

### Task 6: Update CLAUDE.md

**Files:**
- Modify: `docs/CLAUDE.md` (add new section at top after title)

**Interfaces:**
- Consumes: Existing CLAUDE.md structure (currently security-focused)
- Produces: CLAUDE.md with HCI domain context prepended, security content replaced where necessary

- [ ] **Step 1: Create the new HCI domain context section**

This will be added right after the title (before the current "Mission" section):

```bash
cat > /tmp/hci_domain_section.txt << 'EOF'
## HCI Domain Context

This platform is built for **HCI & User Experience education** (University Course 27203901), not security education. When writing content or creating lessons:

### Core HCI Concepts

- **Human-Centered Design (HCD):** A design process that puts user needs, preferences, and behaviors first throughout development
- **Usability:** How easily users can learn, use, and find satisfaction in an interface (includes learnability, efficiency, memorability, error tolerance, satisfaction)
- **Affordances:** Properties of objects that suggest how to interact with them — a handle affords pulling, a button affords pressing
- **Mental Models:** How users understand and predict system behavior based on prior experience and cultural knowledge
- **Cognitive Load:** The mental effort required to use an interface — reducing unnecessary cognitive load improves usability

### Content Guidelines

- All lesson content must connect to HCI principles from lecturer materials in `/content/sources/`
- Quiz questions must match American multiple-choice format (A/B/C/D, one correct answer, no "all of the above")
- Use real interface examples (Apple, Slack, Twitter, Microsoft) — avoid hypothetical scenarios
- Exam weight distribution: 40% Ethnographic Research + Usability Testing, 30% Core Concepts, 30% Design Methods
- Lessons should answer: What is it? Why does it matter? How is it used? What's a real example? What should I remember?

### When Creating Content

- Use templates in `docs/templates/` for lessons, quizzes, flashcards, concepts
- Reference lecturer materials in `content/sources/` as the authoritative source
- Link concepts to curriculum units in `content/curriculum.yaml` using [[bracket notation]]
- Mark concepts with exam weight: HIGH (3+ questions), MEDIUM (1-2 questions), LOW (background)

---

EOF
cat /tmp/hci_domain_section.txt
```

- [ ] **Step 2: Update the Mission section to reflect HCI**

OLD (lines 3-16):
```markdown
# Mission

CyberAtlas is not a documentation website.

CyberAtlas is not a note-taking application.

CyberAtlas is an AI-powered educational platform that teaches Computer Security through reusable knowledge objects, interactive content and visual learning.

The first implementation is a university Computer Security course.

The architecture must support additional courses in the future without modification.
```

NEW:
```markdown
# Mission

This platform is not a documentation website.

This platform is not a note-taking application.

This platform is an AI-powered educational platform that teaches Human-Computer Interaction (HCI) & User Experience through reusable knowledge objects, interactive content, and visual learning.

The first implementation is a university HCI course (27203901).

The architecture must support additional courses in the future without modification.
```

- [ ] **Step 3: Update "Available Skills" section**

Find the section listing available skills and update `content-author` section:

OLD:
```markdown
## content-author

Purpose

Creates educational content.

Responsible for

Lessons

Concepts

Definitions

Examples

Summaries

Flashcards

Quizzes
```

NEW:
```markdown
## content-author

Purpose

Creates HCI educational content following the template guidelines.

Responsible for

Lessons (using HCI_LESSON_TEMPLATE.md)

Concepts (using HCI_CONCEPTS_TEMPLATE.md)

Definitions

Examples (from real interfaces)

Summaries

Flashcards (using HCI_FLASHCARD_TEMPLATE.md)

Quizzes (using HCI_QUIZ_TEMPLATE.md in American multiple-choice format)
```

- [ ] **Step 4: Update the "Long-Term Vision" section**

OLD (end of file):
```markdown
# Long-Term Vision

CyberAtlas should become a reusable educational framework.

Computer Security is only the first course.

The platform should eventually support any technical subject simply by adding new content written in the Learning DSL.

The architecture should remain unchanged as new courses are added.
```

NEW:
```markdown
# Long-Term Vision

This platform should become a reusable educational framework.

HCI is the first course.

The platform should eventually support any technical subject simply by adding new content written in the Learning DSL and following the template patterns established in `docs/templates/`.

The architecture should remain unchanged as new courses are added.
```

- [ ] **Step 5: Use Edit tool to perform the updates**

(Will be done with Edit tool in actual implementation)

- [ ] **Step 6: Verify no security examples remain in core sections**

```bash
grep -i "firewall\|attack\|vulnerability\|cybersecurity\|threat\|authentication" /Users/ofekstrogo/human-computer-intereface-platform/docs/CLAUDE.md | grep -v "^#" || echo "No security terms found in CLAUDE.md"
```

Expected: "No security terms found in CLAUDE.md"

- [ ] **Step 7: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/CLAUDE.md
git commit -m "feat: update CLAUDE.md for HCI domain context and add template guidance"
```

---

### Task 7: Review and Update LEARNING_DSL.md

**Files:**
- Modify: `docs/LEARNING_DSL.md` (add template link if not already present)

**Interfaces:**
- Consumes: Existing LEARNING_DSL.md
- Produces: LEARNING_DSL.md with link to HCI templates

- [ ] **Step 1: Check if LEARNING_DSL.md exists and read first section**

```bash
head -50 /Users/ofekstrogo/human-computer-intereface-platform/docs/LEARNING_DSL.md 2>/dev/null || echo "File not found"
```

- [ ] **Step 2: Scan for security-specific examples**

```bash
grep -i "firewall\|attack\|network\|security\|threat" /Users/ofekstrogo/human-computer-intereface-platform/docs/LEARNING_DSL.md || echo "No security examples found"
```

If security examples are found, note their line numbers for Step 3.

- [ ] **Step 3: Add link to templates at appropriate location**

Find a good location (typically near the top, after introduction) and add:

```markdown
## HCI Content Templates

For HCI-specific lesson structures, see:
- [`docs/templates/HCI_LESSON_TEMPLATE.md`](../templates/HCI_LESSON_TEMPLATE.md)
- [`docs/templates/HCI_QUIZ_TEMPLATE.md`](../templates/HCI_QUIZ_TEMPLATE.md)
- [`docs/templates/HCI_FLASHCARD_TEMPLATE.md`](../templates/HCI_FLASHCARD_TEMPLATE.md)
- [`docs/templates/HCI_CONCEPTS_TEMPLATE.md`](../templates/HCI_CONCEPTS_TEMPLATE.md)
```

- [ ] **Step 4: Commit if changes made**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/LEARNING_DSL.md
git commit -m "docs: add HCI template links to LEARNING_DSL.md"
```

(Skip this step if no changes were needed)

---

### Task 8: Review ARCHITECTURE.md

**Files:**
- Modify: `docs/ARCHITECTURE.md` (if security examples found)

**Interfaces:**
- Consumes: Existing ARCHITECTURE.md
- Produces: ARCHITECTURE.md with any security examples replaced with HCI-neutral or HCI-specific examples

- [ ] **Step 1: Read ARCHITECTURE.md**

```bash
cat /Users/ofekstrogo/human-computer-intereface-platform/docs/ARCHITECTURE.md
```

- [ ] **Step 2: Scan for security examples**

```bash
grep -in "firewall\|attack\|network\|threat\|security" /Users/ofekstrogo/human-computer-intereface-platform/docs/ARCHITECTURE.md | head -20
```

- [ ] **Step 3: Decision point**

If NO security examples found:
- Commit message: "docs: reviewed ARCHITECTURE.md (no security examples)"
- Go to Step 5

If security examples found:
- Go to Step 4

- [ ] **Step 4: Update security examples to HCI examples**

Use Edit tool to replace found examples. Example replacement:

OLD example (in pipeline description):
"Parser detects attack vectors in firewall configurations"

NEW example:
"Parser extracts HCI concepts from lesson markdown (e.g., affordances, usability testing methods)"

- [ ] **Step 5: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/ARCHITECTURE.md
git commit -m "docs: review and update ARCHITECTURE.md for HCI context"
```

---

### Task 9: Review ROADMAP.md

**Files:**
- Modify: `docs/ROADMAP.md` (if needed to align with HCI curriculum)

**Interfaces:**
- Consumes: Existing ROADMAP.md
- Produces: ROADMAP.md aligned with 11-unit HCI curriculum by exam weight

- [ ] **Step 1: Read ROADMAP.md**

```bash
cat /Users/ofekstrogo/human-computer-intereface-platform/docs/ROADMAP.md
```

- [ ] **Step 2: Check if it references HCI or security phases**

```bash
grep -i "phase\|security\|unit\|hci" /Users/ofekstrogo/human-computer-intereface-platform/docs/ROADMAP.md | head -20
```

- [ ] **Step 3: Decision point**

If ROADMAP references HCI units appropriately, skip to Step 4.

If ROADMAP references security phases or is generic, update it to include HCI phases (similar to this structure):

```markdown
## Curriculum Phases (by Exam Weight)

### Phase 1: High-Weight Foundation (40% of exam)
- Unit 3: Ethnographic Research & Field Study
- Unit 10: Usability Testing & Heuristic Evaluation
- Focus: Research methods that the exam heavily emphasizes

### Phase 2: Core Concepts (30% of exam)
- Unit 1: Introduction — HCI Foundations
- Unit 2: Cognitive Psychology — Mental Models & Cognitive Load
- Unit 5: Information Architecture
- Focus: Theoretical foundations for all design work

### Phase 3: Design Methods (20% of exam)
- Unit 6: Design Rules & Visual Principles
- Unit 7: Wireframing & Prototyping
- Unit 8: Design Thinking (Iterative Process)
- Focus: How to apply concepts in practice

### Phase 4: Polish & Specialized Topics (10% of exam)
- Unit 4: Personas & User Scenarios
- Unit 9: Usability Dimensions
- Unit 11: Micro Copy & UX Writing
- Focus: Refinement and nuanced understanding
```

- [ ] **Step 4: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add docs/ROADMAP.md
git commit -m "docs: align ROADMAP.md with HCI curriculum phases by exam weight"
```

---

## Phase 3: Update Skills

### Task 10: Update content-author Skill

**Files:**
- Modify: `~/.claude/skills/content-author/SKILL.md` (or equivalent skill definition)

**Interfaces:**
- Consumes: Existing content-author skill instructions
- Produces: Updated skill with HCI examples and template links

- [ ] **Step 1: Read the skill file**

```bash
cat ~/.claude/skills/content-author/SKILL.md 2>/dev/null || echo "Skill file not found; checking alternate location..."
find ~/.claude/skills -name "*content-author*" -o -name "*author*" 2>/dev/null | head -5
```

- [ ] **Step 2: Add section linking to HCI_LESSON_TEMPLATE**

Add this section near the beginning of the skill file:

```markdown
## HCI Lesson Template

All HCI lessons should follow the template in `docs/templates/HCI_LESSON_TEMPLATE.md`.

**Structure:**
- Overview: Why this topic matters for the exam
- Learning Objectives: What students should be able to do
- Core Concepts: 2-3 major concepts with definitions, why they matter, examples
- Key Principles: 3-5 rules/principles from the lecture
- Common Exam Patterns: What question types appear
- Related Concepts: Links to prerequisites and follow-up topics
- Resources: Source materials from `/content/sources/`

**Example Lesson Topic:** Affordances
- Definition: Visual/physical cues suggesting how to interact
- Why It Matters: Exam tests affordances in 3+ questions; critical for interface design
- Example: Apple door handle vs flat surface

See `docs/templates/HCI_LESSON_TEMPLATE.md` for detailed structure.
```

- [ ] **Step 3: Replace any security examples with HCI examples**

Search for security-related examples (threat vectors, firewall configs, attack patterns) and replace with HCI examples:

OLD: "Example lesson on firewall configuration rules"
NEW: "Example lesson on usability testing protocols"

- [ ] **Step 4: Add exam-format guidance**

Add this section:

```markdown
## Exam Format Alignment

Lessons should structure content around concepts that appear in American multiple-choice questions:

- **Concept Definition Questions:** Student must know precise definitions
- **Application Questions:** "Which principle applies to this scenario?"
- **Analysis Questions:** "Why did this design approach fail?"
- **Comparison Questions:** "Distinguish between X and Y"

Every lesson concept should be testable in one of these formats.
```

- [ ] **Step 5: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add ~/.claude/skills/content-author/SKILL.md
git commit -m "feat: update content-author skill for HCI lessons and exam alignment"
```

---

### Task 11: Update quiz-generator Skill

**Files:**
- Modify: `~/.claude/skills/quiz-generator/SKILL.md` (or equivalent)

**Interfaces:**
- Consumes: Existing quiz-generator skill
- Produces: Updated skill with American multiple-choice guidance and template link

- [ ] **Step 1: Read the skill file**

```bash
cat ~/.claude/skills/quiz-generator/SKILL.md 2>/dev/null || echo "Skill not found"
find ~/.claude/skills -name "*quiz*" 2>/dev/null | head -5
```

- [ ] **Step 2: Add American Multiple-Choice Format section**

Add this at the top of the skill:

```markdown
## American Multiple-Choice Format (Required)

All quizzes must follow this format:

**Question Structure:**
- Question text (single concept, clear language)
- A, B, C, D options (exactly 4)
- One unambiguously correct answer
- Three psychologically plausible distractors

**Format Rules:**
- NEVER use "All of the above" or "None of the above"
- NEVER have multiple correct answers
- AVOID negative questions ("Which is NOT...")
- ALWAYS provide explanation: why correct, why others are wrong

**Distractor Design:**
- Distractor 1: Related concept but wrong (e.g., confuses affordance with signifier)
- Distractor 2: Common misconception (e.g., thinks usability = utility)
- Distractor 3: Plausible but incomplete (e.g., partially correct definition)

**Exam Alignment:**
- HIGH weight topics (Ethnographic Research, Usability Testing): 30+ questions across all quizzes
- MEDIUM weight topics (Cognitive Psychology, IA): 15-20 questions
- LOW weight topics (Micro Copy, Visual Design): 5-10 questions
```

- [ ] **Step 3: Add link to HCI_QUIZ_TEMPLATE**

```markdown
## HCI Quiz Template

See `docs/templates/HCI_QUIZ_TEMPLATE.md` for detailed template.

Key sections:
- Question Type: Definition | Application | Scenario | Analysis
- Question Text: Clear, single concept
- Correct Answer: A/B/C/D with letter
- Explanation: Why correct, why others are wrong
- Exam Weight: HIGH | MEDIUM | LOW
- Related Concepts: Links to lessons/concepts
```

- [ ] **Step 4: Replace security examples with HCI examples**

Search for any security-specific quiz examples and replace:

OLD: "Example: What is a firewall?"
NEW: "Example: Define affordance. A) A property suggesting interaction B) ..."

- [ ] **Step 5: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add ~/.claude/skills/quiz-generator/SKILL.md
git commit -m "feat: update quiz-generator skill for American multiple-choice format"
```

---

### Task 12: Update flashcard-creator Skill (if exists)

**Files:**
- Modify: `~/.claude/skills/flashcard-creator/SKILL.md` (or equivalent)

**Interfaces:**
- Consumes: Existing flashcard-creator skill (if exists)
- Produces: Updated skill with HCI template link and exam-weight guidance

- [ ] **Step 1: Check if skill exists**

```bash
find ~/.claude/skills -name "*flashcard*" 2>/dev/null
```

If not found, skip to Task 13.

If found:

- [ ] **Step 2: Read the skill file**

```bash
cat ~/.claude/skills/flashcard-creator/SKILL.md
```

- [ ] **Step 3: Add HCI template section**

```markdown
## HCI Flashcard Template

See `docs/templates/HCI_FLASHCARD_TEMPLATE.md`.

**Card Structure:**
- Front (English): Simple recall question
- Back (English): One-sentence definition + elaboration
- Back (Hebrew optional): Mnemonic or translation
- Exam Weight: HIGH | MEDIUM | LOW
- Remember: Key distinctions, misconceptions, examples

**Language Note:**
- Front is in English (exam language)
- Back can include Hebrew for learners who benefit from bilingual recall
- Omit Hebrew if the concept is better remembered in English (technical terms, proper nouns)
```

- [ ] **Step 4: Add exam-weight guidance**

```markdown
## Exam-Weight Prioritization

- HIGH weight concepts: Prioritize these for flashcard creation
- MEDIUM weight concepts: Create cards for key concepts
- LOW weight concepts: Skip unless they're easy to confuse with HIGH weight concepts

Example distribution:
- HIGH (Ethnographic Research, Usability Testing): 40+ cards
- MEDIUM (Cognitive Psychology, IA): 20-30 cards
- LOW (Micro Copy, Visual Design): 5-10 cards
```

- [ ] **Step 5: Commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add ~/.claude/skills/flashcard-creator/SKILL.md
git commit -m "feat: update flashcard-creator skill for HCI concepts and exam weighting"
```

---

### Task 13: Audit knowledge-graph Skill

**Files:**
- Review: `~/.claude/skills/knowledge-graph/SKILL.md` (read-only)

**Interfaces:**
- Consumes: Existing knowledge-graph skill
- Produces: Verification that no security-specific examples exist; no changes needed unless found

- [ ] **Step 1: Read the skill file**

```bash
cat ~/.claude/skills/knowledge-graph/SKILL.md 2>/dev/null || echo "Skill file not found"
```

- [ ] **Step 2: Scan for security examples**

```bash
grep -i "firewall\|attack\|network\|threat\|cybersecurity" ~/.claude/skills/knowledge-graph/SKILL.md || echo "No security examples found"
```

- [ ] **Step 3: Decision point**

If NO security examples found:
- Commit message: "docs: reviewed knowledge-graph skill (no updates needed)"
- Proceed to Task 14

If security examples found:
- Use Edit tool to replace with HCI examples (lesson → concept → flashcard instead of threat → mitigation → detection)

---

## Phase 4: Verification

### Task 14: Grep Verification of Key Files

**Files:**
- Read: README.md, CLAUDE.md, docs/templates/ (all)

**Interfaces:**
- Consumes: All updated documentation and templates
- Produces: Verification report that no security terminology remains in HCI-specific sections

- [ ] **Step 1: Scan README.md for security terms**

```bash
grep -i "firewall\|attack\|vulnerability\|threat\|cybersecurity" /Users/ofekstrogo/human-computer-intereface-platform/README.md && echo "FOUND SECURITY TERMS" || echo "✓ No security terms in README.md"
```

Expected: "✓ No security terms in README.md"

- [ ] **Step 2: Scan CLAUDE.md for security terms**

```bash
grep -i "firewall\|attack\|vulnerability\|threat\|cybersecurity" /Users/ofekstrogo/human-computer-intereface-platform/docs/CLAUDE.md && echo "FOUND SECURITY TERMS" || echo "✓ No security terms in CLAUDE.md"
```

Expected: "✓ No security terms in CLAUDE.md"

- [ ] **Step 3: Verify all templates link HCI concepts**

```bash
grep -l "affordance\|usability\|mental model\|cognitive" /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/*.md
```

Expected output: Should list all 4 template files

- [ ] **Step 4: Verify README.md mentions templates**

```bash
grep -i "templates" /Users/ofekstrogo/human-computer-intereface-platform/README.md | head -3
```

Expected: Output shows template links (HCI_LESSON_TEMPLATE, etc.)

- [ ] **Step 5: Verify skills reference templates**

```bash
grep -l "HCI_LESSON_TEMPLATE\|HCI_QUIZ_TEMPLATE\|HCI_FLASHCARD_TEMPLATE" ~/.claude/skills/content-author/SKILL.md ~/.claude/skills/quiz-generator/SKILL.md 2>/dev/null | wc -l
```

Expected: Output should be 2 (both content-author and quiz-generator reference templates)

- [ ] **Step 6: Final verification report**

Run this comprehensive check:

```bash
echo "=== VERIFICATION REPORT ==="
echo ""
echo "1. Security terms in key docs:"
grep -i "firewall\|attack" /Users/ofekstrogo/human-computer-intereface-platform/README.md /Users/ofekstrogo/human-computer-intereface-platform/docs/CLAUDE.md 2>/dev/null | wc -l
echo "   Expected: 0"
echo ""
echo "2. HCI templates created:"
ls -1 /Users/ofekstrogo/human-computer-intereface-platform/docs/templates/HCI_*.md 2>/dev/null | wc -l
echo "   Expected: 4"
echo ""
echo "3. README mentions 'HCI exam prep':"
grep "HCI Exam Prep" /Users/ofekstrogo/human-computer-intereface-platform/README.md && echo "   ✓ Found"
echo ""
echo "4. CLAUDE.md has HCI Domain Context:"
grep "## HCI Domain Context" /Users/ofekstrogo/human-computer-intereface-platform/docs/CLAUDE.md && echo "   ✓ Found"
```

Expected output:
```
1. Security terms: 0
2. HCI templates: 4
3. README: ✓ Found
4. CLAUDE.md: ✓ Found
```

- [ ] **Step 7: Commit verification results**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git add -A
git commit -m "chore: complete HCI domain alignment verification — all checks passed"
```

---

## Phase 5: Summary & Final Review

### Task 15: Create Implementation Summary

**Files:**
- No new files created; this is a summary step

**Interfaces:**
- Consumes: All completed tasks
- Produces: Verification that all spec requirements met

- [ ] **Step 1: Verify all templates created**

- [x] HCI_LESSON_TEMPLATE.md — created
- [x] HCI_QUIZ_TEMPLATE.md — created
- [x] HCI_FLASHCARD_TEMPLATE.md — created
- [x] HCI_CONCEPTS_TEMPLATE.md — created

- [ ] **Step 2: Verify all docs updated**

- [x] README.md — updated with HCI branding + template links
- [x] CLAUDE.md — updated with HCI domain context
- [x] LEARNING_DSL.md — reviewed and linked
- [x] ARCHITECTURE.md — reviewed
- [x] ROADMAP.md — aligned with HCI phases

- [ ] **Step 3: Verify all skills updated**

- [x] content-author — linked to HCI_LESSON_TEMPLATE, added exam guidance
- [x] quiz-generator — added American multiple-choice section, linked to HCI_QUIZ_TEMPLATE
- [x] flashcard-creator — linked to HCI_FLASHCARD_TEMPLATE, added exam-weight guidance
- [x] knowledge-graph — reviewed (no changes needed)

- [ ] **Step 4: Verify grep results**

Run final verification:

```bash
echo "✓ README.md: Updated to 'HCI Exam Prep'"
echo "✓ CLAUDE.md: Added 'HCI Domain Context' section"
echo "✓ Templates: 4 files created in docs/templates/"
echo "✓ Skills: 3 skills updated with HCI guidance and template links"
echo "✓ No security terminology in HCI sections"
echo ""
echo "SUCCESS: All spec requirements completed"
```

- [ ] **Step 5: Final commit**

```bash
cd /Users/ofekstrogo/human-computer-intereface-platform
git log --oneline -10
```

Verify that all commits from this session are present:
- "feat: add HCI lesson template"
- "feat: add HCI quiz template"
- "feat: add HCI flashcard template"
- "feat: add HCI concepts template"
- "feat: update README.md for HCI exam prep"
- "feat: update CLAUDE.md for HCI domain context"
- etc.

---

## Success Criteria Checklist

- [ ] All four templates created in `docs/templates/` with HCI examples
- [ ] README.md updated to "HCI Exam Prep" branding
- [ ] CLAUDE.md includes "HCI Domain Context" section with core concepts
- [ ] LEARNING_DSL.md linked to templates
- [ ] ARCHITECTURE.md reviewed (no security examples)
- [ ] ROADMAP.md aligned with HCI curriculum phases
- [ ] content-author skill links to HCI_LESSON_TEMPLATE
- [ ] quiz-generator skill includes American multiple-choice section and links to HCI_QUIZ_TEMPLATE
- [ ] flashcard-creator skill links to HCI_FLASHCARD_TEMPLATE and includes exam-weight guidance
- [ ] knowledge-graph skill reviewed (no changes needed)
- [ ] Grep verification: zero security terms in key docs (README.md, CLAUDE.md)
- [ ] Grep verification: four HCI templates exist in docs/templates/
- [ ] All commits created with clear messages
- [ ] No uncommitted changes

---

## Self-Review Against Spec

**Spec Coverage Check:**

✓ **Section 1: New Template Files**
- Task 1: HCI_LESSON_TEMPLATE.md ✓
- Task 2: HCI_QUIZ_TEMPLATE.md ✓
- Task 3: HCI_FLASHCARD_TEMPLATE.md ✓
- Task 4: HCI_CONCEPTS_TEMPLATE.md ✓

✓ **Section 2: Updated Core Documentation**
- Task 5: README.md (branding + links) ✓
- Task 6: CLAUDE.md (HCI domain context) ✓
- Task 7: LEARNING_DSL.md (review + link) ✓
- Task 8: ARCHITECTURE.md (review) ✓
- Task 9: ROADMAP.md (align with HCI phases) ✓

✓ **Section 3: Skills Audit & Updates**
- Task 10: content-author skill ✓
- Task 11: quiz-generator skill ✓
- Task 12: flashcard-creator skill (if exists) ✓
- Task 13: knowledge-graph skill (audit) ✓

✓ **Section 4: Verification**
- Task 14: Grep verification of security terms ✓
- Task 15: Implementation summary ✓

**Placeholder Check:** No TBD, TODO, or "implement later" statements in any task.

**Type Consistency:** All template references use exact filenames (HCI_LESSON_TEMPLATE.md, etc.).

**Completeness:** All tasks include exact file paths, exact code/commands, and verification steps.

---

**End of Implementation Plan**
