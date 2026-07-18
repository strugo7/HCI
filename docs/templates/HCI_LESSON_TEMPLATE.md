# HCI Lesson Template

> **Purpose:** This template guides HCI lesson authors on how to structure markdown lessons with a consistent format suitable for teaching Human-Computer Interaction concepts and preparing students for the course exam.

---

## Template Structure Overview

Every HCI lesson should follow this seven-section structure:

1. **Overview** — Context and motivation
2. **Learning Objectives** — What students will achieve
3. **Core Concepts** — Key ideas and definitions
4. **Key Principles** — Design principles and best practices
5. **Common Exam Patterns** — Typical exam question formats
6. **Related Concepts** — Links to other HCI topics
7. **Resources** — References and further reading

---

## Section 1: Overview

**Purpose:** Establish context and explain why this topic matters.

**Author Instructions:**
- Start with a relatable real-world scenario or problem
- Explain how this concept affects user experience
- Briefly connect to broader HCI goals (usability, accessibility, user satisfaction)
- Keep to 2-3 paragraphs maximum
- Use concrete examples from everyday technology

**Example for "Affordances" lesson:**

```markdown
## Overview

When you see a button on a website, you immediately know to click it. When you grab a door handle, you intuitively know whether to push or pull. This happens because objects communicate their intended use through their design — a concept called **affordances**.

Affordances are not just about making things work; they are about making things understandable. In Human-Computer Interaction, poor affordances lead to frustrated users who don't know what to do next, while good affordances make interactions feel natural and effortless.

Understanding affordances is crucial for designing interfaces that users can operate intuitively, without needing instruction manuals or error messages.
```

---

## Section 2: Learning Objectives

**Purpose:** Clearly state what students will know and be able to do.

**Author Instructions:**
- Use action verbs: "understand," "identify," "apply," "analyze," "distinguish," "create"
- Make each objective measurable and testable
- Aim for 4-6 objectives
- Order objectives from simple (understand) to complex (apply/create)
- Frame objectives from the student's perspective

**Example for "Affordances" lesson:**

```markdown
## Learning Objectives

By the end of this lesson, you will be able to:

- **Understand** what affordances are and why they matter in HCI
- **Identify** affordances in real-world interfaces (both physical and digital)
- **Distinguish** between perceived affordances and real affordances
- **Apply** the concept of affordances to critique existing user interfaces
- **Design** simple interfaces that provide clear affordances for common actions
- **Analyze** why certain interfaces fail due to poor affordances
```

---

## Section 3: Core Concepts

**Purpose:** Define and explain the key ideas, terms, and theories.

**Author Instructions:**
- Start with a clear, concise definition
- Provide technical and simple explanations
- Use comparisons to related concepts
- Explain how the concept fits into broader HCI theory
- Include 1-2 examples for each concept
- Mark concepts that appear in other lessons

**Example for "Affordances" lesson:**

```markdown
## Core Concepts

### What Are Affordances?

**Definition:** An affordance is a property of an object or interface that suggests how it should be used. It is the perceived or actual action possibility available to a user.

**Formal explanation:** Affordances refer to the qualities and properties that suggest how an object should be used — the clues an object gives about its operation. If the object's affordances are correctly interpreted by the user, the user knows what to do just by looking at it.

**Example 1 (Physical):** A door handle with a flat plate affords pushing; a handle you can grasp affords pulling. The shape itself communicates the intended action.

**Example 2 (Digital):** A underlined blue text affords clicking (it looks like a link). A raised button affords pressing. A text box affords typing.

### Perceived vs. Real Affordances

**Perceived affordances** are what the user thinks they can do, based on the interface design. These are what users see and act on.

**Real affordances** are what is actually possible with the system. Sometimes these don't match.

**Problem:** If perceived affordances differ from real affordances, users become confused. For example, if a non-clickable element looks like it should be clickable, users will waste time trying to click it (poor design).

### Signifiers

Related to affordances is the concept of a **signifier** — a sign or indicator that communicates where and how to act. While an affordance is a property of the object, a signifier is a clue that tells you an affordance exists.

**Example:** A button may have the affordance to be pressed, but a signifier communicates this affordance: the text "Click Me," the visual appearance of being raised, or the cursor changing to a pointer when you hover over it.

### Mental Models

Users interact with interfaces based on their **mental models** — their understanding of how something works. Good affordances help users build accurate mental models; poor affordances lead to incorrect mental models and mistakes.

**Example:** Users expect form fields to accept typed input because of how they appear (the affordance). When a field doesn't accept input, it violates the affordance and breaks the user's mental model.
```

---

## Section 4: Key Principles

**Purpose:** Present design principles, best practices, and guidelines for applying the concept.

**Author Instructions:**
- Extract 3-5 actionable principles
- Explain the "why" behind each principle
- Provide practical guidance
- Use "do's and don'ts" format when helpful
- Connect principles to real interface examples
- Explain consequences of violating the principle

**Example for "Affordances" lesson:**

```markdown
## Key Principles

### Principle 1: Make Affordances Match Intent

**The Principle:** Design an interface so that what users perceive they can do matches what they actually can do.

**Why it matters:** When affordances align with actual functionality, users feel confident and make fewer mistakes. When they don't align, users get frustrated.

**How to apply:**
- DON'T: Make non-interactive elements look like buttons
- DO: Make all buttons look consistently clickable
- DON'T: Hide interactive elements so they appear to be static text
- DO: Provide visual feedback (underlines, icons, color) that signals interactivity

**Consequence of violation:** Users waste time trying to interact with non-interactive elements, or they miss interactive elements because they don't recognize them as such.

### Principle 2: Use Consistent Visual Language

**The Principle:** Use the same visual style for similar affordances across your interface and across your product ecosystem.

**Why it matters:** Users learn patterns. Once they learn that blue underlined text is a link, they expect this everywhere. Inconsistency requires them to re-learn the interface repeatedly.

**How to apply:**
- Use the same button style for similar actions (e.g., all confirm buttons should look the same)
- Use the same visual indicators for interactive elements (e.g., all clickable items should change appearance on hover)
- Match patterns that users already know from other popular interfaces (e.g., the hamburger menu icon for navigation)

**Consequence of violation:** Users become confused and slower at accomplishing tasks. New interfaces take longer to learn.

### Principle 3: Provide Clear Feedback

**The Principle:** Confirm that an action was recognized through immediate visual or auditory feedback.

**Why it matters:** Affordances work best when they are followed by feedback. Users need to know their interaction was received. Without feedback, they don't know if they should try again.

**How to apply:**
- Button click → button appears pressed, then completes the action
- Form input → text appears in the field as you type
- Hover → cursor changes and element highlights
- Submit → confirmation message appears

**Consequence of violation:** Users don't trust the interface. They may click buttons multiple times because they don't believe the first click worked.

### Principle 4: Reduce Cognitive Load

**The Principle:** Design affordances that are immediately obvious so users don't need to think about what to do.

**Why it matters:** Users have limited cognitive capacity. Every second they spend figuring out how to interact with an interface is a second of frustration. Obvious affordances are intuitive — they require no thought.

**How to apply:**
- Use familiar patterns users already know (don't invent new interaction models)
- Minimize the number of options visible at once
- Group related actions together
- Label affordances clearly (e.g., "Save" not "OK")

**Consequence of violation:** Users need training or documentation. The interface is not intuitive and feels poorly designed.

### Principle 5: Design for Different User Groups

**The Principle:** Remember that affordances are perceived differently by different users. Novices and experts see interfaces differently.

**Why it matters:** A power user might appreciate keyboard shortcuts and hidden options (they see affordances that are not visible to novices). A novice might be overwhelmed by options. Both groups need their affordances to be clear.

**How to apply:**
- Show essential affordances to everyone (primary actions)
- Hide advanced affordances from novices but make them discoverable (secondary actions)
- Provide progressive disclosure (reveal options as needed)
- Support multiple ways of doing the same action (menu, keyboard shortcut, button)

**Consequence of violation:** Novice users feel overwhelmed; advanced users feel constrained and inefficient.
```

---

## Section 5: Common Exam Patterns

**Purpose:** Prepare students for the types of questions they will encounter on the American multiple-choice course exam (27203901).

**Author Instructions:**
- List 5-8 question patterns that appear on actual exams
- Provide the question type (recognition, application, analysis)
- Include a sample question and multiple-choice answers
- Explain what the question tests
- Provide the correct answer and explanation
- Help students recognize question patterns and avoid common mistakes

**Example for "Affordances" lesson:**

```markdown
## Common Exam Patterns

### Pattern 1: Recognition — Identifying Affordances

**Type:** Multiple-choice, recognition

**What it tests:** Can you identify an affordance when described?

**Sample Question:**

Which of the following is an example of an affordance in a digital interface?

A) The color blue used for links across a website  
B) A button that appears raised and has a shadow, suggesting it can be pressed  
C) A label explaining what a button does  
D) The instruction manual that came with the software  

**Correct Answer:** B

**Explanation:** An affordance is a property that suggests how something should be used. The raised appearance with shadow suggests the button can be pressed — this is the affordance. The color (A) is a convention, the label (C) is a signifier, and the manual (D) is external documentation, not an affordance.

---

### Pattern 2: Application — Improving a Poor Interface

**Type:** Multiple-choice, application/analysis

**What it tests:** Can you apply affordance principles to improve interfaces?

**Sample Question:**

A website has several clickable links that appear in plain black text with no underline or color difference from regular text. Users frequently miss these links and need to be told where to click. Which principle of affordances is being violated?

A) Signifiers should always use the same color  
B) Affordances should be clearly perceivable; users should understand what is clickable without instruction  
C) Perceived affordances must be limited to expert users only  
D) Digital affordances should mimic physical object affordances exactly  

**Correct Answer:** B

**Explanation:** The principle is that affordances should communicate clearly what actions are possible. Here, users cannot perceive that the text is clickable (poor perceived affordance). The interface violates the principle of making affordances obvious and requiring no explanation.

---

### Pattern 3: Analysis — Comparing Affordances

**Type:** Multiple-choice, analysis

**What it tests:** Can you compare and contrast affordances in different contexts?

**Sample Question:**

A physical door with a flat push plate and a digital button that appears raised with a shadow are similar in that:

A) Both use color to indicate interactivity  
B) Both communicate their intended action through their appearance, allowing users to act without instruction  
C) Both provide auditory feedback when activated  
D) Both are equally visible in all lighting conditions  

**Correct Answer:** B

**Explanation:** Both provide affordances—perceived action possibilities—through their visual design. The physical plate says "push" through its shape; the digital button says "press" through its appearance. Neither needs explanation because the affordance is clear.

---

### Pattern 4: Identifying Real vs. Perceived Affordances

**Type:** Multiple-choice, analysis

**What it tests:** Can you distinguish between what an interface appears to allow and what it actually allows?

**Sample Question:**

A menu item in an application has a small arrow next to it. Users expect to click the arrow to open a submenu (this is the perceived affordance). However, you must click anywhere on the menu item text itself to open the submenu; clicking the arrow does nothing. This situation is problematic because:

A) The arrow should not be present if it is not clickable  
B) Perceived affordances do not match real affordances, causing user confusion and errors  
C) Submenus should not be used in applications  
D) The arrow is too small and hard to see  

**Correct Answer:** B

**Explanation:** This violates the principle that perceived affordances (what users think they can do based on visual design) should match real affordances (what they can actually do). The arrow suggests clickability but is not actually clickable, breaking user expectations and causing frustration.

---

### Pattern 5: Cognitive Load and Affordances

**Type:** Multiple-choice, application

**What it tests:** Understanding the relationship between clear affordances and cognitive load?

**Sample Question:**

An interface designer is revising a complex form with 30 fields. They notice users make many mistakes and take a long time to complete the form. To reduce cognitive load and improve affordances, which change would be most effective?

A) Make all field labels smaller so more fields fit on the screen  
B) Group related fields together and show only essential fields initially, hiding optional fields  
C) Use more colors to make each field visually distinct  
D) Require users to read the help documentation before using the form  

**Correct Answer:** B

**Explanation:** Clear grouping and progressive disclosure (hiding optional fields) reduce the number of affordances visible at once, lowering cognitive load. This makes the form feel less overwhelming and easier to navigate. The other options would increase confusion or place burden on the user.

---

### Pattern 6: Affordances Across User Groups

**Type:** Multiple-choice, analysis

**What it tests:** Understanding that affordances must serve both novice and expert users?

**Sample Question:**

A spreadsheet application provides multiple ways to save a file: a "Save" button in the toolbar, a File menu option, and the keyboard shortcut Ctrl+S. This design choice reflects which principle of affordances?

A) Only one affordance per action should be provided  
B) Affordances should be color-coded for visibility  
C) Design affordances for different user groups; novices use visible buttons, experts use keyboard shortcuts  
D) Saving should always require manual confirmation  

**Correct Answer:** C

**Explanation:** This design supports multiple user types. Novice users see the button and understand what to do. Expert users discover or know the keyboard shortcut and can work faster. This follows the principle of designing for different user groups while maintaining consistent functionality.
```

---

## Section 6: Related Concepts

**Purpose:** Show how this concept connects to other HCI topics and guide students to related material.

**Author Instructions:**
- List 4-6 closely related HCI concepts
- Explain the relationship (e.g., "builds on," "complements," "contrasts with")
- Use format: **Concept Name** — brief explanation of relationship
- Link to other lessons where available
- Help students build a coherent understanding of HCI

**Example for "Affordances" lesson:**

```markdown
## Related Concepts

- **Mental Models** — Affordances help users build accurate mental models of how an interface works. When affordances match the system's actual behavior, users develop correct mental models and make fewer mistakes.

- **Signifiers** — While affordances are properties of the object, signifiers are the clues that communicate affordances to users. Good signifiers reveal affordances; poor signifiers hide them.

- **Feedback** — Affordances work best when followed by immediate feedback. Feedback confirms that an action was perceived and acted upon, reinforcing the affordance.

- **Consistency** — Consistent affordances across an interface (and across products) help users learn and apply patterns. Inconsistency forces users to relearn the interface repeatedly.

- **Accessibility** — Affordances must be perceivable by all users, including those with visual, motor, or cognitive disabilities. This might require providing multiple ways to perceive and act on affordances (visual, auditory, keyboard).

- **Usability** — Affordances are a key component of usability. An interface with poor affordances will score low on learnability, efficiency, memorability, and satisfaction.
```

---

## Section 7: Resources

**Purpose:** Provide references for further reading and examples students can explore.

**Author Instructions:**
- Provide 4-6 authoritative sources
- Include a mix of: academic references, books, articles, online resources
- For each resource, explain what it covers and why it matters
- Format: **Resource Title** — brief description
- Include authors/sources where relevant

**Example for "Affordances" lesson:**

```markdown
## Resources

- **Don Norman, "The Design of Everyday Things" (1988)** — The seminal work that introduced affordances to the design world. Chapter 1-2 specifically cover affordances and their importance in user-centered design. Essential reading for understanding why affordances matter.

- **Jakob Nielsen, "10 Usability Heuristics for User Interface Design"** — Includes heuristics about recognizing affordances and maintaining system visibility. Shows how affordances connect to practical usability testing.

- **Nielsen Norman Group: "Affordances and Signifiers"** — Online article explaining the distinction between affordances and signifiers with contemporary interface examples. Includes video demonstrating affordance failures in real products.

- **Apple Human Interface Guidelines: "Controls"** — Shows how Apple designs consistent, clear affordances for iOS and macOS. Useful for examining how a major platform makes affordances obvious.

- **Microsoft Fluent Design: "Interaction"** — Demonstrates affordance principles in Windows and Office applications. Useful for comparing affordance approaches across platforms.

- **MIT D-Lab: "User-Centered Design" course materials** — Free course materials showing how affordances inform the early stages of interface design and prototyping.
```

---

## How to Use This Template

### Before You Start

1. **Understand your topic deeply.** Read existing HCI literature and look at real interface examples.
2. **Know the exam.** This course uses American multiple-choice format. Questions typically ask students to recognize, apply, and analyze HCI concepts.
3. **Choose one concept.** This template works best for focused lessons covering one main idea.

### Writing Process

1. **Start with Overview.** Write a brief, engaging introduction that explains why this topic matters to users and designers.
2. **Define Learning Objectives.** Write 4-6 measurable outcomes using action verbs. Make them testable.
3. **Develop Core Concepts.** Define terms clearly. Provide multiple examples (physical and digital interfaces). Explain how concepts relate.
4. **Extract Principles.** Ask: "What are the practical rules designers should follow?" Write principles as actionable guidance with consequences.
5. **Create Exam Questions.** Write 5-8 realistic exam questions representing different cognitive levels (recognize, apply, analyze). Include correct answers and detailed explanations.
6. **Link to Related Topics.** Identify 4-6 related concepts. Explain the relationship.
7. **Gather Resources.** Collect authoritative references (books, articles, guidelines) students can explore.

### Quality Checklist

Before considering your lesson complete:

- [ ] Overview clearly explains why the topic matters
- [ ] Learning objectives are measurable and use action verbs
- [ ] Definitions are concise but complete
- [ ] Each concept has multiple examples (both physical and digital)
- [ ] Principles are actionable with clear consequences
- [ ] Exam questions represent different cognitive levels
- [ ] Correct answers are explained, not just stated
- [ ] Related concepts show clear connections to the topic
- [ ] All references are authoritative and relevant
- [ ] Lesson uses accessible language (no jargon without explanation)

### Common Mistakes to Avoid

❌ **Don't:** Write only one example per concept — students need multiple perspectives  
✅ **Do:** Provide examples from different domains (web, mobile, physical, accessibility)

❌ **Don't:** Create exam questions that test only memorization  
✅ **Do:** Include questions requiring application and analysis

❌ **Don't:** Assume students know related concepts  
✅ **Do:** Briefly explain relationships to other HCI topics

❌ **Don't:** Use only modern examples  
✅ **Do:** Include timeless principles that apply across eras and technologies

❌ **Don't:** Leave principles vague  
✅ **Do:** Explain why each principle matters and what happens when it's violated

---

## Example: Complete Short Lesson

Here is a minimal complete lesson following this template (suitable for a single class):

```markdown
# Mental Models in HCI

## Overview

When you use a new application, you don't start from zero. You bring your existing understanding of how similar applications work. This is your mental model. If an interface matches your expectations, you feel in control and the experience feels intuitive. If it doesn't match, you feel lost.

Designers who understand mental models can create interfaces that feel natural because they align with how users think the world works.

## Learning Objectives

By the end of this lesson, you will be able to:
- Define mental models and explain why they matter
- Identify when an interface breaks a user's mental model
- Apply knowledge of common mental models to improve interface design

## Core Concepts

### What Is a Mental Model?

A mental model is a user's internal representation or understanding of how something works. It includes what they believe about the system's capabilities and limitations.

Example: When you use a file system, your mental model might be "files live in folders, folders live in other folders." This mental model guides your decisions about where to save and find files.

### Correct vs. Incorrect Mental Models

Users might have mental models that don't match reality.

Example: A user believes deleting an email from their inbox deletes it forever (mental model). In reality, it moves to the Trash folder (actual behavior). If the user never checks Trash, their understanding feels confirmed, even though it's incorrect.

### How Interfaces Shape Mental Models

Interfaces teach mental models. Good design creates accurate mental models; poor design creates incorrect ones.

## Key Principles

### Principle 1: Design Interfaces That Match Common Mental Models

Match what users already believe. Don't force them to learn new mental models if their existing ones work well.

Example: File systems use folder metaphors because users understand folders from physical filing cabinets.

### Principle 2: Provide Affordances and Feedback to Correct Incorrect Mental Models

If a user has a wrong mental model (like thinking deleted email is gone forever), provide feedback when they discover the Trash folder, helping them revise their understanding.

## Common Exam Patterns

### Pattern 1: Identifying Mental Model Mismatches

A user is frustrated because they think clicking a "Save Draft" button saves and closes the editor, but it only saves without closing. The user's mental model (click save = done editing) does not match the actual behavior. This is an example of:

A) Poor affordance design  
B) A mismatch between the user's mental model and the system's actual behavior  
C) Insufficient feedback  
D) Accessibility failure  

**Correct Answer:** B (The user's expectation—the mental model—doesn't match what actually happens)

## Related Concepts

- **Affordances** — Mental models are built partly from affordances; if affordances are clear, mental models tend to be accurate
- **Feedback** — Feedback helps users verify and adjust their mental models when they are wrong
- **Consistency** — Consistent design helps users develop accurate mental models across your product

## Resources

- Norman, D. (1988). The Design of Everyday Things. Chapter on mental models.
- Nielsen, J. "Mental Models." Nielsen Norman Group online articles.
```

---

## Final Notes for Authors

- **Brevity is clarity.** Long, dense lessons are harder to learn from. Use short paragraphs and plenty of examples.
- **Make it testable.** Every concept should appear in an exam question. Students should be able to apply it.
- **Use real examples.** Point to actual interfaces students know (Gmail, Instagram, Apple Maps, Windows, etc.).
- **Anticipate questions.** Write explanations that answer questions before students ask them.
- **Connect to bigger ideas.** Show how each concept serves the ultimate goal of HCI: creating interfaces that are intuitive, efficient, and satisfying to use.

---

**Template Version:** 1.0  
**Last Updated:** 2026  
**Maintained by:** HCI Course Instructional Design Team
