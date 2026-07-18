# Quiz: [Unit Name]

> **Course:** Human-Computer Interaction (27203901)
> **Format:** American multiple-choice — every question has A/B/C/D options, exactly one correct answer, and three plausible distractors.
> **Domain:** All questions and examples must come from the HCI domain (affordances, usability, mental models, Nielsen's heuristics, think-aloud protocol, ethnographic research, information architecture, etc.). Do not use examples from other domains.

## [Topic Area]

### Question 1

**Type:** [Concept Definition | Application | Scenario Analysis | Comparative Understanding | Theory Recognition]

**Question Text:**

Which of the following best describes an **affordance** in interaction design?

A) A visual style guide that keeps buttons, colors, and spacing consistent across every screen of the product

B) A perceived property of an object that signals how it can be used, so a user knows what action is possible without instruction

C) A usability metric that measures how many seconds it takes a new user to complete their first task

D) A cognitive bias in which users assume an interface works the same way as the last product they used

**Correct Answer:** B

**Explanation:**

**Why B is correct:** An affordance is a relationship between an object's properties and a user's capabilities that makes an action perceivable. A well-designed handle affords pulling, a flat plate affords pushing. This matches the lecture definition drawn from Norman's work: affordances communicate possible actions directly through the design itself.

**Why A is wrong:** It sounds plausible because consistency is a real design goal, but it describes a design system or style guide, not an affordance. It confuses a visual-consistency concern with a perception-of-action concern.

**Why C is wrong:** This is a common misconception — students conflate affordances with usability measurement. Time-on-task is a usability metric, not an affordance; affordances are about perceived possibility of action, not measurement.

**Why D is wrong:** This is a related but different concept. It describes a mental model carried over from prior experience, not an affordance. Mental models and affordances both shape expectations, but an affordance lives in the object's design, not in the user's memory of another product.

**Exam Weight:** MEDIUM

**Related Concepts:** [[Affordances]], [[Mental Models]], [[Signifiers]]

**Lecturer Reference:** [Source file in /content/sources/ or lecture slide number]

---

### Question 2

**Type:** Scenario Analysis

**Question Text:**

During a **think-aloud usability test**, a participant repeatedly says "I'm not sure if this saved" after clicking Submit, even though the form did save. Which Nielsen heuristic does this most directly point to as violated?

A) Match between the system and the real world

B) Visibility of system status

C) User control and freedom

D) Aesthetic and minimalist design

**Correct Answer:** B

**Explanation:**

**Why B is correct:** Visibility of system status requires the system to keep users informed about what is happening through timely feedback. The user's uncertainty about whether the save succeeded is a textbook feedback gap, which is exactly what this heuristic covers.

**Why A is wrong:** Match between system and real world concerns using familiar language and conventions. The participant understood the words; they lacked confirmation, so this heuristic is not the primary issue.

**Why C is wrong:** User control and freedom is about undo, redo, and emergency exits. The problem here is missing feedback, not a trapped user needing an escape route.

**Why D is wrong:** Aesthetic and minimalist design is about avoiding irrelevant clutter. Adding a confirmation message would improve status visibility, so this scenario is the opposite of a minimalism problem.

**Exam Weight:** HIGH

**Related Concepts:** [[Nielsen's Heuristics]], [[Think-Aloud Protocol]], [[Usability Testing]]

**Lecturer Reference:** [Source file in /content/sources/ or lecture slide number]

---

### Question 3

**Type:** Comparative Understanding

**Question Text:**

What is the key difference between a **formative** and a **summative** usability evaluation?

A) Formative evaluation is run by researchers, while summative evaluation is run by the end users themselves

B) Formative evaluation happens during design to find and fix problems, while summative evaluation measures how usable a finished design is against benchmarks

C) Formative evaluation only uses interviews, while summative evaluation only uses surveys

D) Formative evaluation is qualitative and summative evaluation is always automated with analytics tools

**Correct Answer:** B

**Explanation:**

**Why B is correct:** Formative evaluation is conducted iteratively during the design process to surface issues early and guide improvements, whereas summative evaluation assesses a near-final product against measurable criteria. This timing-and-purpose distinction is the defining difference taught in the course.

**Why A is wrong:** It sounds close because both involve people, but the distinction is not about who runs the study. Both can be facilitated by researchers with real users.

**Why C is wrong:** This is a misconception that ties each evaluation type to one method. Both formative and summative studies can use a range of methods; the difference is when and why, not which single instrument.

**Why D is wrong:** It is a trap that maps the two types onto qualitative-vs-automated. Summative evaluation is often quantitative but is not "always automated," and formative work can include quantitative signals too.

**Exam Weight:** HIGH

**Related Concepts:** [[Usability Testing]], [[Formative Evaluation]], [[Summative Evaluation]]

**Lecturer Reference:** [Source file in /content/sources/ or lecture slide number]

---

### Question 4

[Repeat the structure above for each additional question]

---

## Answer Key

| Question | Answer | Key Teaching Point |
|----------|--------|-------------------|
| 1 | B | An affordance is a perceived possibility of action signaled by an object's design, distinct from mental models or style guides. |
| 2 | B | Missing confirmation after an action is a visibility-of-system-status failure, revealed clearly by think-aloud testing. |
| 3 | B | Formative vs. summative is a distinction of timing and purpose (improve during design vs. measure a finished design), not of method or facilitator. |

---

## Template Instructions for Quiz Authors

**American Multiple-Choice Format Rules:**
- Always use A/B/C/D options (never "all of the above" or "none of the above")
- Exactly one unambiguously correct answer
- Three psychologically plausible distractors
- Each question tests one concept, not multiple combined concepts

**HCI Domain Rule (mandatory):**
- Every question, option, and example must come from the HCI domain.
- Use HCI subject matter: affordances, signifiers, usability, mental models, Nielsen's 10 heuristics, think-aloud protocol, ethnographic research, information architecture, cognitive load, interaction design, accessibility, visual design, micro copy.
- Do not import examples from unrelated domains. If you inherited material from a previous course version, rewrite it entirely in HCI terms.

**Distractor Design:**
- **Plausible distractors** prevent guessing. They should feel like they could be right to a student who:
  - Partially understood the concept
  - Confused this concept with a related one (e.g., affordance vs. mental model, formative vs. summative)
  - Remembered a wrong detail from the lecture

**Bracket Notation (mandatory):**
- The **Related Concepts** field of every question MUST use `[[bracket notation]]` wiki-links, for example `[[Affordances]]`, `[[Usability]]`, `[[Nielsen's Heuristics]]`.
- This repository runs a knowledge-graph skill that reads these links to connect quiz items to concepts, so links are required, not optional.
- Use the canonical concept name inside the brackets, and separate multiple links with commas.

**Exam Weight Guidance:**
- **HIGH weight topics** (Ethnographic Research, Usability Testing, Design Methods): 30+ questions in the full exam
- **MEDIUM weight topics** (Cognitive Psychology, Information Architecture): 15-20 questions
- **LOW weight topics** (Micro Copy, Visual Design): 5-10 questions
- Tag each question HIGH / MEDIUM / LOW so students know which topics to prioritize.

**Lecturer Sourcing (mandatory):**
- Every question includes a **Lecturer Reference** field.
- Point it at the authoritative source material — course materials in `/content/sources/` are authoritative — and cite the specific file or lecture slide where the answer appears.
- If you cannot cite where the answer comes from in the course, do not ship the question.

**Explanation Field (mandatory):**
- Every question must explain **why the correct answer is right** and **why each of the three distractors is wrong**.
- Ground the "why correct" in the lecture definition or the HCI principle.
- For each distractor, name the trap: the partial understanding, the confused-related-concept, or the wrong remembered detail it targets.

**Question Types (Common on University HCI Exams):**

1. **Concept Definition:** "Which best describes an affordance?"
2. **Application:** "A designer wants to reduce cognitive load. Which approach best supports that goal?"
3. **Scenario Analysis:** "A usability test revealed users struggled with a form. What does this suggest about the interface?"
4. **Comparative Understanding:** "What is the difference between formative and summative evaluation?"
5. **Theory Recognition:** "Nielsen's 10 heuristics emphasize error prevention — which of these examples best illustrates it?"

**Avoid:**
- Trick questions (questions with ambiguous wording)
- Multiple correct answers (even if one is "most correct")
- "All of the above" / "none of the above" options
- Negative questions ("Which is NOT...") — harder to grade, less pedagogical
- Questions testing trivial details instead of understanding

**Always Reference:**
- Lecturer materials (be able to cite where the answer appears in the course, ideally in `/content/sources/`)
- Real examples when possible (actual interfaces, actual user research scenarios)
- Exam weight (so students know which topics to prioritize)
