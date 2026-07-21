---
id: hci-practice-exam-b
kind: lecturer
title: "Claude lecture 2027 b"
year: 2026
duration: 7200
source: "Originally generated to match the structure, tone, and difficulty of lecturer-2025-a and lecturer-2026-a; based on the course syllabus (curriculum.yaml)."
---

# HCI Practice Exam B

Human-Computer Interface, 273020 · 27 questions · Equal weight · No reference material allowed.
All questions below are original and were written to match the format, tone, and difficulty distribution of the official lecturer exams. This exam has not been reviewed, approved, or endorsed by the course lecturer, and is intended for self-study purposes only.

## Question

id: q-hci-exam-b-001
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - human-centered-design

A stakeholder argues that since the ISO 9241-210 process was formally followed step by step, the resulting product must be well designed. Which is the strongest critique of this reasoning?

### Answers

A. Following the process correctly guarantees a good outcome, so the stakeholder's reasoning is sound.

B. ISO 9241-210 is only relevant to hardware ergonomics, not software interfaces at all.

C. Following the iterative process improves the odds of a good outcome, but does not by itself guarantee one, since the quality of each iteration's insights still matters.

D. The process is irrelevant once a single round of user testing has been completed.

E. Only the final evaluation step of the process actually matters; earlier steps are procedural formality.

Correct: C
Explanation: Human-centered design is a framework for structuring iterative work around user needs, but simply going through its steps does not ensure that the understanding, ideas, or evaluations generated within each step were actually good — process compliance and outcome quality are related but not equivalent. Treating the process as an outcome guarantee, restricting it to hardware, dismissing it after one testing round, or writing off early steps as mere formality all misstate how the standard actually functions.
Learning Objective: Evaluate the claim that procedural compliance with a design standard guarantees design quality.
Misconception: Equating following a design process with achieving a good design outcome.

---

## Question

id: q-hci-exam-b-002
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - cognitive-psychology

A smart-home app shows 12 identical-looking toggle switches on one screen with no grouping, and users often turn on the wrong device. Which explanation best accounts for this specific error pattern?

### Answers

A. The toggles create excessive recall demand, since users must remember which physical device each one controls.

B. Visual similarity without grouping forces users to rely on serial scanning and position memory rather than quick recognition of a distinct target.

C. The interface violates accessibility contrast standards, which is the direct cause of the wrong selections.

D. Users are experiencing inattentional blindness because their attention is captured by an unrelated notification.

E. The toggles are simply mislabeled with incorrect device names throughout the interface.

Correct: B
Explanation: When many items look alike and are not grouped, users cannot recognize the right one at a glance and instead have to scan serially and rely on remembering position, which is exactly the kind of error the scenario describes. This is a recognition/discriminability problem tied to visual similarity and grouping, not a recall-of-external-facts problem, a contrast violation, an attention-capture event from something unrelated, or a labeling error, none of which the scenario provides evidence for.
Learning Objective: Attribute a look-alike, ungrouped control error to weak visual discriminability rather than unrelated cognitive or technical causes.
Misconception: Reaching for the nearest cognitive-sounding term (recall, blindness) without checking whether it matches the specific error pattern described.

---

## Question

id: q-hci-exam-b-003
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - mental-models

A user expects that dragging a file into a folder icon on a cloud-storage website will move it, because that is how desktop file managers behave, but the website actually copies the file instead. What does this scenario best illustrate?

### Answers

A. A mismatch between the user's mental model, formed elsewhere, and the system's actual behavior.

B. A memorability failure, since the user has simply forgotten the website's real behavior from a previous visit.

C. An accessibility failure, since drag-and-drop is not usable by all input methods.

D. A card-sorting error, since files are grouped into the wrong category of folder.

E. An inattentional-blindness failure, since the user did not visually notice the copy icon appear.

Correct: A
Explanation: The user is transferring an expectation formed by a different, familiar system (the desktop file manager) onto a new system that behaves differently, which is the definition of a mental-model mismatch. This is not about forgetting something learned on the site itself, nor is it an accessibility issue, a card-sorting problem, or a missed visual cue, since the scenario is about a carried-over expectation rather than any of those specific issues.
Learning Objective: Recognize when a usability problem stems from a transferred mental model rather than a memory, accessibility, or perception issue.
Misconception: Labeling any expectation-based error as a memory lapse instead of identifying it as a mismatched mental model.

---

## Question

id: q-hci-exam-b-004
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - cognitive-psychology

Two proposed fixes are suggested for the toggle-switch problem in a smart-home app: (1) add distinct icons and room labels above each group of toggles, or (2) add a tooltip that appears only when the user hovers for three seconds. Which fix better addresses the root cognitive issue, and why?

### Answers

A. Fix 2, because tooltips give users a complete backup source of the exact information they need.

B. Fix 1, because grouping with visible icons and labels supports recognition at a glance, whereas a delayed tooltip still requires the user to already suspect a problem before waiting for it.

C. Neither fix matters, since users will make selection errors at the same rate either way.

D. Fix 2, because a three-second delay ensures users read the tooltip carefully every time.

E. Fix 1, but only because icons are visually more attractive than plain text labels.

Correct: B
Explanation: The underlying issue is that users cannot recognize the right toggle at a glance; grouping with visible icons and labels supports immediate recognition, while a hover-triggered tooltip only helps a user who has already paused to investigate, meaning it does not prevent the initial wrong-click. Treating the tooltip as a full backup, claiming neither fix matters, assuming a delay guarantees careful reading, or crediting Fix 1 to attractiveness alone all miss the actual recognition-support mechanism that makes Fix 1 stronger here.
Learning Objective: Evaluate two candidate fixes against the specific recognition-based root cause identified earlier in the scenario.
Misconception: Judging an interface fix by surface appeal (attractiveness, presence of more information) rather than whether it addresses the actual recognition failure.

---

## Question

id: q-hci-exam-b-005
type: scenario
difficulty: hard
cognitive: apply
points: 4
concepts:
  - ethnographic-research

Given that the interface is used in a noisy, fast-paced warehouse with gloves and time pressure, which method would most directly reveal whether picking actually happens as described?

### Answers

A. A structured survey emailed to pickers asking them to rate their agreement with the interview statement.

B. A single focus group held in a quiet meeting room, discussing the picking process in general terms.

C. Direct shadowing of pickers during real shifts, observing the scanner's use in context as it actually happens.

D. A heuristic evaluation of the scanner's screen conducted by two usability experts in the office.

E. A card-sorting exercise asking pickers to categorize different types of warehouse items.

Correct: C
Explanation: Because the concern is whether real behavior under real noisy, time-pressured, gloved conditions matches a reported habit, only direct in-context shadowing during actual shifts can confirm or contradict it — moving the observation out of the warehouse would strip away the very conditions in question.  survey or focus group held elsewhere still only captures self-report, and a heuristic evaluation or card sort evaluates the interface or its categories rather than real on-the-job behavior.
Learning Objective: Choose in-context observation over self-report or office-based evaluation methods when the goal is verifying real-world behavior under specific conditions.
Misconception: Assuming any interview- or expert-based method can substitute for observing behavior in its real physical and situational context.

---

## Question

id: q-hci-exam-b-006
type: scenario
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - ethnographic-research

During shadowing, the researcher notes: "Pickers appear to trust their memory more than the scanner when the bin is nearly full." Why is this note problematic as written?

### Scenario

A logistics company wants to redesign the handheld scanner interface used by warehouse pickers. Interviews suggest pickers "always scan every item before placing it in the bin." Management wants confirmation before investing in the redesign.

### Scenario


A logistics company wants to redesign the handheld scanner interface used by warehouse pickers. Interviews suggest pickers "always scan every item before placing it in the bin." Management wants confirmation before investing in the redesign.


### Answers

A. It cannot be problematic, since anything written during fieldwork counts as a valid observation.

B. It attributes an internal mental state ("trust") to the pickers rather than describing the directly observed behavior that led to that impression.

C. It is problematic only because it was written during a busy shift instead of a calm one.

D. It is problematic because it focuses on the bin instead of the scanner device itself.

E. It is problematic because it does not mention a specific picker's name.

Correct: B
Explanation: The phrase "appear to trust" assigns an inferred internal motivation to the pickers rather than describing the concrete, observable action — such as which items were scanned or skipped — that produced that impression, which crosses from observation into interpretation. Fieldwork notes are not automatically valid regardless of content, shift timing and mentioning the bin are not the actual issue, and omitting a name is a privacy or identification matter unrelated to the observation/interpretation distinction being tested.
Learning Objective: Identify language that attributes internal mental states as interpretation rather than pure observation.
Misconception: Assuming that a note is objective as long as it was taken while directly watching the activity, regardless of the language used.

---

## Question

id: q-hci-exam-b-007
type: scenario
difficulty: hard
cognitive: apply
points: 4
concepts:
  - aeiou-framework

The researcher records: "Pickers frequently hand off half-scanned totes to the next shift during changeover, without a formal note of what remains." Which AEIOU element does this note primarily capture?

### Answers

A. Objects, since it focuses on the physical properties of the scanner device.

B. Users, since it focuses only on demographic traits of the individual pickers involved.

C. Interactions, since it describes an exchange of responsibility and information between people at a transition point.

D. Environments, since it focuses on the lighting conditions of the warehouse floor.

E. Activities, since it focuses exclusively on the act of scanning a single barcode.

Correct: C
Explanation:  hand-off between one shift and the next, involving an exchange of responsibility (and a gap in information), is squarely an Interaction — it captures how people and information move between individuals at a transition point. The note says nothing about the scanner's physical properties, picker demographics, lighting, or a single scan action, so Objects, Users, Environments, and Activities each miss what the note is actually describing.
Learning Objective: Correctly identify a hand-off between people as an Interaction rather than another AEIOU category.
Misconception: Defaulting to Activities whenever an action verb appears, without checking whether the note actually centers on an exchange between people.

---

## Question

id: q-hci-exam-b-008
type: scenario
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - ethnographic-research

After two shadowed shifts, pickers skip scanning small, low-value items about 30% of the time under time pressure. Which conclusion is best supported by this finding alone?

### Scenario

A logistics company wants to redesign the handheld scanner interface used by warehouse pickers. Interviews suggest pickers "always scan every item before placing it in the bin." Management wants confirmation before investing in the redesign.

### Scenario


A logistics company wants to redesign the handheld scanner interface used by warehouse pickers. Interviews suggest pickers "always scan every item before placing it in the bin." Management wants confirmation before investing in the redesign.


### Answers

A. The scanner hardware is defective and needs to be physically replaced across the warehouse.

B. There is a meaningful gap between reported and actual behavior specifically tied to time pressure and item value, worth investigating further before redesigning.

C. Pickers are dishonest and cannot be trusted to report their own work practices in any context.

D. No redesign is needed, since 70% of items are still scanned as reported.

E. The interview method used earlier should never be used again for any future research.

Correct: B
Explanation:  30% skip rate concentrated under specific conditions (time pressure, low-value items) is a concrete, bounded finding: it shows a real say-do gap tied to identifiable circumstances, which is exactly the kind of signal that should be investigated further before committing to a redesign. Concluding hardware failure, blanket dishonesty, that no problem exists because most items are scanned, or that interviews are permanently useless all overreach well beyond what this specific, conditional finding actually supports.
Learning Objective: Draw a conclusion proportionate to a specific, conditional finding rather than overgeneralizing from it.
Misconception: Either dismissing a partial gap as negligible or overreacting to it with a sweeping, unsupported conclusion.

---

## Question

id: q-hci-exam-b-009
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - personas-and-scenarios

A team builds a persona named "Busy Parent Dana" listing hobbies, favorite snacks, and a stock photo, but omits any stated goal or frustration with the product. Which is the most accurate critique?

### Answers

A. The persona is complete, since demographic and lifestyle detail is what makes a persona feel real to stakeholders.

B. The persona lacks the goal and frustration content needed to actually drive design decisions, despite feeling vivid.

C. The persona should be discarded entirely and replaced with raw survey data instead.

D. The persona is too short and simply needs a longer physical description to become useful.

E. The persona cannot be evaluated without also seeing a completed journey map for the same user.

Correct: B
Explanation: Vivid demographic and lifestyle details can make a persona feel realistic without making it useful, because the elements that actually inform design choices are the person's goals and the frustrations blocking them, both of which are missing here. Declaring the persona complete, discarding it for raw data, padding it with more physical description, or requiring a journey map before judgment are all responses that avoid naming the actual missing content.
Learning Objective: Evaluate a persona for the presence of goals and frustrations rather than for vividness or length alone.
Misconception: Equating a vivid, detailed-feeling persona with a design-ready one.

---

## Question

id: q-hci-exam-b-010
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - user-scenario

Which of the following scenario drafts most clearly violates the linear, single-path requirement taught in this course, even though it reads smoothly?

### Answers

A. "Omar opens the app, taps 'Track Package,' enters his tracking number, and views the estimated delivery date."

B. "Omar opens the app and, depending on whether he is signed in, either sees his saved packages or is prompted to log in first."

C. "Omar opens the app, searches for his package, and reads the delivery status shown on screen."

D. "Omar opens the app, taps the notification bell, and reads his latest delivery alert."

E. "Omar opens the app, scrolls through his order history, and selects his most recent order."

Correct: B
Explanation: Despite reading smoothly, this draft contains an explicit "depending on whether... either... or" branch, which is exactly the conditional structure a linear scenario must avoid — a scenario should follow one persona through one specific path, not multiple possible ones. The other four options each describe a single continuous sequence of actions with no embedded condition, which is what makes them properly linear.
Learning Objective: Detect embedded conditional branching in a scenario even when the prose reads fluently.
Misconception: Assuming a scenario is linear simply because it is written as flowing prose, without checking for hidden conditional branches.

---

## Question

id: q-hci-exam-b-011
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - journey-map

A journey map shows high satisfaction at "browsing" and "checkout" but a sharp emotional dip at "order confirmation email," where users report confusion about whether their order actually went through. Which response best matches the purpose of a journey map?

### Answers

A. Removing the confirmation email entirely, since it is the source of the dip.

B. Redesigning the browsing phase further, since it already has the highest satisfaction and should be reinforced.

C. Treating the dip as noise, since satisfaction is high everywhere else in the journey.

D. Clarifying the confirmation email's content and timing, since the map isolates that specific touchpoint as the actual source of user anxiety.

E. Building an entirely new persona, since the dip suggests the current persona was inaccurate from the start.

Correct: D
Explanation:  journey map's value lies in isolating exactly where emotion drops along the timeline, and here that is unambiguously the confirmation-email touchpoint, so the appropriate response is to target that specific point rather than the already-strong phases. Removing the email ignores that confirmation still serves a real purpose, reinforcing an already-strong phase misdirects effort, dismissing the dip as noise ignores a clearly isolated signal, and rebuilding the persona conflates a touchpoint problem with a persona-accuracy problem.
Learning Objective: Direct design attention specifically at the touchpoint a journey map identifies as low, rather than at unrelated phases.
Misconception: Responding to a journey-map finding by reinforcing an already-strong phase instead of addressing the identified weak point.

---

## Question

id: q-hci-exam-b-012
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - information-architecture

A university intranet organizes content as "Ontology: tags like #enrollment and #financial-aid," "Taxonomy: categories like Academics, Student Life, Admissions," and a flat list of pages with no defined navigation sequence. Which IA pillar is missing from this structure?

### Answers

A. Ontology, since tags alone are never sufficient without categories.

B. Taxonomy, since categories alone are never sufficient without tags.

C. Choreography, since there is no defined structure for how users move between pages and sections over time.

D. Usability, since usability is technically the fourth pillar of information architecture.

E. Card sorting, since no card-sorting session has been conducted yet.

Correct: C
Explanation: Ontology (tagging/meaning) and Taxonomy (categorization) are both present, but nothing describes the structural sequencing of how a user actually moves through the site over time — that missing piece is Choreography, IA's third pillar. Ontology and Taxonomy are each already represented and cannot be "missing," usability is not one of the three IA pillars, and card sorting is a research method for building IA, not a pillar of the structure itself.
Learning Objective: Identify Choreography as the pillar responsible for navigational sequencing, distinct from Ontology and Taxonomy.
Misconception: Treating usability or a research method (card sorting) as if it were one of the three formal IA pillars.

---

## Question

id: q-hci-exam-b-013
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - latch-model

A recipe app lets users browse "By Cuisine," "By Prep Time," and "By Difficulty (Easy/Medium/Hard)." Which LATCH categories are represented by "By Prep Time" and "By Difficulty," respectively?

### Answers

A. Time and Hierarchy, since prep time is a temporal measure and difficulty levels form a ranked order.

B. Alphabet and Category, since prep time can be alphabetized and difficulty is just a label.

C. Location and Time, since prep time takes place somewhere and difficulty relates to skill location.

D. Hierarchy and Time, since difficulty determines how long a task will take, reversing the usual order.

E. Category and Alphabet, since both are simply named groups with no inherent order.

Correct: A
Explanation: Prep time is a straightforward temporal measure, matching Time, while Easy/Medium/Hard represents a ranked order of difficulty, matching Hierarchy — this pairing correctly reflects LATCH's distinction between temporal and ranked-order data. Prep time is not naturally alphabetic data, difficulty is not a location, and treating either dimension as an unordered flat Category ignores the inherent ranking present in "Easy/Medium/Hard."
Learning Objective: Correctly distinguish temporal (Time) data from ranked (Hierarchy) data within the LATCH model.
Misconception: Treating an inherently ranked scale like difficulty level as a flat, unordered Category.

---

## Question

id: q-hci-exam-b-014
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - card-sorting

A team ran an open card sort and found users grouped items in three very different ways with little overlap. Which next step best matches sound IA practice?

### Answers

A. Immediately ship the categories from whichever single participant seemed most confident.

B. Conclude that card sorting has failed as a method and switch directly to a heuristic evaluation instead.

C. Run a closed card sort using a few candidate structures informed by the diverse groupings, to see which one users can navigate most successfully.

D. Average the three groupings mathematically into one single structure without further testing.

E. Skip further research and let the development team decide the categories based on technical convenience.

Correct: C
Explanation: When open sorting reveals genuinely divergent mental models, the appropriate next step is a closed sort that tests a small number of candidate structures — informed by the diversity already observed — to see which one users can actually navigate, rather than guessing from a single confident participant or abandoning the method. Picking one participant's view, declaring the method a failure, mathematically averaging incompatible groupings, or deferring to developer convenience all skip the validation step a closed sort is specifically designed to provide.
Learning Objective: Follow divergent open-sort results with a closed sort to validate candidate structures, rather than guessing or abandoning the method.
Misconception: Assuming that diverse or inconclusive open-sort results mean the method itself has failed.

---

## Question

id: q-hci-exam-b-015
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - metaphors-and-analogies

A voice assistant is given a friendly cartoon avatar with exaggerated human facial expressions, but it frequently gives generic or wrong answers to nuanced follow-up questions. Which best explains why this design choice risks backfiring?

### Answers

A. Facial expressions always improve user satisfaction, regardless of how the assistant actually performs.

B. The human-like avatar sets an implicit expectation of humanlike conversational competence that the assistant's actual answers then fail to meet.

C. Cartoon avatars are illegal under most accessibility regulations for voice assistants.

D. Users cannot form any expectations about voice assistants that lack a visual avatar entirely.

E. The mismatch is irrelevant, since voice assistants are judged only on response speed.

Correct: B
Explanation:  strongly human-like metaphor implicitly promises humanlike conversational ability, so when the assistant's actual responses fall short of that promise, the gap between expectation and performance becomes more jarring than it would be with a more neutral presentation — this is the same risk illustrated by failed anthropomorphic metaphors in the field. Assuming expressions always help regardless of performance, inventing a regulatory ban, claiming users form no expectations without a visual avatar, and reducing judgment to response speed alone all sidestep the actual expectation-mismatch mechanism at play.
Learning Objective: Analyze how an anthropomorphic metaphor can raise expectations that a system's actual competence then fails to satisfy.
Misconception: Assuming a friendlier, more humanlike presentation can only help perceived quality, never work against it.

---

## Question

id: q-hci-exam-b-016
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - wireframing

A stakeholder reviewing a grayscale wireframe insists on discussing which shade of blue the primary button should use. Which response best reflects the correct purpose of a wireframe review?

### Answers

A. Agreeing to lock in the exact blue shade immediately, since stakeholder sign-off is required at every stage.

B. Redirecting the discussion to whether the layout and information structure support the task, noting that color choices belong to a later visual-design stage.

C. Ending the review entirely, since any mention of color means the wireframe has failed its purpose.

D. Adding color to the wireframe on the spot so the stakeholder's question can be answered directly.

E. Explaining that wireframes are only used for mobile apps, not for this kind of stakeholder review.

Correct: B
Explanation:  wireframe is deliberately unstyled so that review can focus on structure and content placement, so the correct response is to acknowledge the question but steer it toward the appropriate later stage, keeping the wireframe review on its intended structural purpose. Locking in a color choice, abandoning the review outright, adding color on the spot, or claiming wireframes only apply to mobile apps all either derail the review's actual purpose or misstate what wireframes are for.
Learning Objective: Redirect visual-design questions raised during a wireframe review back to structural concerns appropriate to that stage.
Misconception: Treating any visual-design question raised during a wireframe review as something that must be answered immediately within that review.

---

## Question

id: q-hci-exam-b-017
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - design-thinking

A team skips the empathize phase entirely, jumping straight to prototyping based on the founder's personal assumptions about what users want. Which risk does this most directly create?

### Answers

A. The prototype will automatically be higher fidelity than one built after user research.

B. The team may build a well-crafted solution to a problem that does not reflect users' actual needs or context.

C. Ideation will take significantly longer without a completed empathy phase beforehand.

D. The five-user usability testing rule can no longer be applied later in the process.

E. The resulting product will fail every heuristic evaluation criterion automatically.

Correct: B
Explanation: Skipping empathy removes the step where real user needs and context are actually uncovered, so the team risks investing effort in solving a problem defined only by assumption, which may not match what users genuinely need. Fidelity level, ideation duration, eligibility for later five-user testing, and automatic heuristic failure are all unrelated or unfounded consequences that do not follow logically from skipping the empathy phase specifically.
Learning Objective: Evaluate the specific downstream risk of skipping empathy: solving an assumed rather than a real problem.
Misconception: Assuming that skipping early research phases mainly affects speed or technical quality rather than problem-fit.

---

## Question

id: q-hci-exam-b-018
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - design-thinking

During ideation, a facilitator enforces a strict rule that every idea must be immediately followed by at least one build-on suggestion from another participant, rather than a critique. Which design thinking value does this rule most directly support?

### Answers

A. The requirement that every prototype be tested with exactly five users before moving on.

B. The principle of deferring judgment and building on ideas rather than shutting them down early.

C. The requirement that observation be kept strictly separate from interpretation in written notes.

D. The principle that wireframes must remain entirely free of color at all stages.

E. The requirement that personas always include a stated frustration alongside a goal.

Correct: B
Explanation: Requiring a build-on response instead of a critique operationalizes the ideation principle of deferring judgment so that ideas are expanded rather than prematurely dismissed, keeping the pool of possibilities wide. The five-user testing rule, the observation/interpretation distinction, wireframe styling rules, and persona-content requirements are all legitimate rules from other parts of the course, but none of them is what this specific facilitation rule is reinforcing.
Learning Objective: Connect a specific ideation facilitation technique (build-on, not critique) to the deferred-judgment principle it operationalizes.
Misconception: Attaching a facilitation technique to the nearest-sounding rule from a different part of the course rather than the ideation principle it actually serves.

---

## Question

id: q-hci-exam-b-019
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - design-thinking

A team's first three prototype-and-test cycles each surface new user confusion that the previous cycle did not reveal. A stakeholder calls this "a sign the process is broken." Which is the more accurate assessment?

### Answers

A. The stakeholder is correct, since a well-run process should reveal all problems in the very first cycle.

B. This pattern is expected, since iteration is designed to surface problems progressively, each round refining the solution based on what the last one exposed.

C. The team should abandon design thinking and switch to a single, one-time expert heuristic review instead.

D. This proves the initial empathize phase was skipped entirely, since new confusion should never appear later.

E. This shows the prototypes are too high-fidelity to generate useful feedback.

Correct: B
Explanation: Iterative processes are expected to surface new issues progressively, since each round of testing reveals problems shaped by the changes made in the round before it — repeated new findings are a sign the loop is functioning, not a sign it is broken. Expecting everything to surface in one cycle, recommending abandoning the process for a single review, assuming new confusion proves empathy was skipped, or blaming prototype fidelity are all reactions that misjudge what a healthy iterative cycle normally looks like.
Learning Objective: Recognize progressively surfacing new issues across iterations as expected, healthy iterative behavior rather than process failure.
Misconception: Expecting a single design cycle to surface every usability problem at once.

---

## Question

id: q-hci-exam-b-020
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - usability

A tax-filing tool lets users complete their filing (utility is high), but support tickets show most users cannot figure out how to start without calling a help line. Which conclusion is best supported?

### Answers

A. The tool is fully successful, since utility alone determines whether a product is useful.

B. The tool has high utility but poor usability, so its overall usefulness is undermined despite doing what is needed.

C. The tool has poor utility, since users need external help to complete their filing.

D. The support-ticket volume is a marketing problem, unrelated to either utility or usability.

E. Usability is irrelevant here, since the task is ultimately completed either way with help.

Correct: B
Explanation: The tool does what is needed (utility) but people cannot figure out how to use it unaided (usability), and Nielsen's model treats usefulness as requiring both — so high utility paired with poor usability still undermines overall usefulness. Declaring the tool fully successful ignores the usability failure, relabeling this as a utility problem confuses the two concepts, calling it a marketing issue misattributes a design problem, and dismissing usability because the task is eventually completed with help ignores the real usability cost involved.
Learning Objective: Recognize that high utility does not offset poor usability when judging overall usefulness.
Misconception: Assuming a task that is eventually completed, even with heavy external help, reflects strong usability.

---

## Question

id: q-hci-exam-b-021
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - the-five-dimensions

A hospital's medication-order system shows very few errors and strong learnability, but experienced nurses report they "forget the exact steps" if they haven't used it in a few weeks due to infrequent use. Which dimension is weak here?

### Answers

A. Efficiency, since infrequent nurses take longer to complete the order the first time back.

B. Errors, since forgetting steps always produces incorrect medication orders.

C. Memorability, since returning users struggle to recall how to operate the system after a period away.

D. Satisfaction, since infrequent users are simply less enthusiastic about the system overall.

E. Learnability, since the system is difficult to learn from scratch for brand-new nurses.

Correct: C
Explanation: The described problem — struggling to recall operation after time away — is precisely what memorability measures, independent of whether new users learn it easily or whether errors actually occur once steps are recalled. The scenario states learnability is already strong and errors are already rare, ruling those out, efficiency is not what is described (the issue is remembering, not speed once steps are recalled), and enthusiasm/satisfaction is not mentioned at all.
Learning Objective: Identify memorability specifically as the dimension concerned with retention of operating knowledge across periods of disuse.
Misconception: Confusing memorability (retention over time) with learnability (initial ease of learning) when both concern "how well someone learns the system."

---

## Question

id: q-hci-exam-b-022
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - effectiveness-vs-efficiency

A ride-hailing app redesign raises the successful-booking rate from 80% to 96%, but average booking time increases from 20 to 35 seconds. How should this trade-off be best described?

### Answers

A. The redesign is worse overall, since any increase in time automatically outweighs a gain in completion rate.

B. The redesign improved effectiveness substantially, at some cost to efficiency, and whether this is a net win depends on how much the added time actually matters to users in context.

C. The redesign improved efficiency, since the app now completes more bookings than before.

D. Both effectiveness and efficiency declined together, since increased time is always a joint indicator of both.

E. Neither dimension changed, since higher completion offsets the added time exactly.

Correct: B
Explanation: Effectiveness (successful task completion) clearly rose, while efficiency (speed) declined, and evaluating whether the trade-off is worthwhile requires judgment about context rather than mechanically declaring a winner from either number alone. Assuming time increases always dominate, mislabeling the completion-rate gain as an efficiency gain, claiming both dimensions moved in the same direction, or claiming no net change all misread which specific dimension each number reflects.
Learning Objective: Evaluate an effectiveness/efficiency trade-off without collapsing the two distinct dimensions into a single verdict.
Misconception: Assuming that a rise in completion rate must also count as a rise in efficiency, or vice versa.

---

## Question

id: q-hci-exam-b-023
type: scenario
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - usability-testing

Given only uptime metrics and a periodic satisfaction survey, what is the university most likely unable to diagnose?

### Answers

A. Whether the server infrastructure is available during peak registration hours.

B. Whether students are generally satisfied or dissatisfied with the portal in a given semester.

C. The specific step-by-step point in the registration task where students actually struggle or make errors.

D. Whether the portal exists on both desktop and mobile platforms.

E. The total number of course sections offered in a given semester.

Correct: C
Explanation: Uptime metrics reveal only server availability, and a periodic satisfaction survey reveals only a general sentiment score, but neither method can show the precise task step where students actually get stuck or err — that granular behavioral detail requires observing students attempting the task directly, such as through moderated usability testing. Uptime and platform availability are already covered by existing data sources described, satisfaction level is exactly what the survey does capture, and section counts are an unrelated administrative fact.
Learning Objective: Recognize that uptime and satisfaction metrics cannot substitute for task-level behavioral usability testing.
Misconception: Assuming that satisfaction scores or system-health metrics can reveal where in a task users are actually struggling.

---

## Question

id: q-hci-exam-b-024
type: scenario
difficulty: hard
cognitive: apply
points: 4
concepts:
  - conducting-the-test

The team finally schedules sessions but the moderator answers every question participants ask mid-task, such as "Should I click this now?" Why is this problematic?

### Scenario

A university course-registration portal has drawn complaints for years, but the IT team has never run a moderated usability test, relying only on server uptime metrics and a satisfaction survey sent once per semester.

### Scenario


A university course-registration portal has drawn complaints for years, but the IT team has never run a moderated usability test, relying only on server uptime metrics and a satisfaction survey sent once per semester.


### Answers

A. It is not problematic, since a helpful moderator produces a more pleasant experience for participants.

B. It masks the very confusion the test is meant to reveal, since real users will not have a moderator guiding them during actual use.

C. It is problematic only because it makes the session run longer than scheduled.

D. It is problematic because moderators are only allowed to speak at the very start of a session.

E. It is problematic because participants might feel rushed by a moderator's presence.

Correct: B
Explanation: Answering in-task questions removes exactly the confusion and hesitation the test exists to surface, since in real use no moderator will be present to resolve those same moments of uncertainty — this defeats the core purpose of observing unassisted behavior. Framing this as merely pleasant, a scheduling inconvenience, a rule about when moderators may speak, or a pacing concern all miss the central issue: real usability signal is being suppressed by well-meaning intervention.
Learning Objective: Recognize that answering participants' in-task questions undermines a usability test's ability to reveal genuine confusion.
Misconception: Believing a moderator being helpful and responsive during tasks improves rather than compromises test validity.

---

## Question

id: q-hci-exam-b-025
type: scenario
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - the-5-user-rule

After testing with five students, four hit the same confusing step when adding a course to a waitlist. A committee member argues, "Five students can't represent 20,000, so this finding is worthless." Which is the strongest counter to this argument?

### Answers

A. Five students is actually more representative than 20,000 would be, since smaller samples are always more precise.

B. The finding should be dismissed, since the committee member is technically correct about small sample sizes.

C. Four out of five independently hitting the same step is a strong, well-supported signal, since research shows a handful of representative users typically surface the majority of major usability problems.

D. The finding only matters if it is confirmed later by a large-scale quantitative survey of all 20,000 students.

E. Sample size is irrelevant to usability testing entirely, so the committee member's objection makes no sense as stated.

Correct: C
Explanation: The well-established five-user finding is that a small number of representative participants typically uncovers most major usability problems, and four out of five independently hitting the same step is exactly the kind of strong, repeated signal that finding predicts — it does not require a 20,000-person sample to be credible. Claiming smaller samples are always more precise, agreeing the finding should be dismissed, requiring a large survey to confirm it, or claiming sample size is irrelevant altogether all either overstate or dismiss the actual evidence-based logic behind the five-user rule.
Learning Objective: Defend the validity of a small representative usability sample using the evidence-based five-user rule, without overstating or understating its scope.
Misconception: Assuming that a usability finding is only credible once validated by a survey of the entire user population.

---

## Question

id: q-hci-exam-b-026
type: scenario
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - empirical-vs-analytical

Given limited time before next semester's registration, the team can run either a full moderated usability test with 5 students or a heuristic evaluation with 2 expert reviewers, but not both. Which factor should most influence this choice?

### Scenario

A university course-registration portal has drawn complaints for years, but the IT team has never run a moderated usability test, relying only on server uptime metrics and a satisfaction survey sent once per semester.

### Scenario


A university course-registration portal has drawn complaints for years, but the IT team has never run a moderated usability test, relying only on server uptime metrics and a satisfaction survey sent once per semester.


### Answers

A. Whichever method costs slightly less money should always be chosen regardless of the goal.

B. Whether the priority is uncovering unexpected, student-specific confusion (favoring usability testing) versus quickly checking known usability principles (favoring heuristic evaluation).

C. Heuristic evaluation should always be chosen, since two experts are inherently more reliable than five students.

D. Usability testing should always be chosen, since real users are inherently more reliable than any expert review.

E. The choice makes no real difference, since both methods produce functionally identical findings.

Correct: B
Explanation: The two methods serve different purposes — usability testing is better suited to uncovering unexpected problems specific to real users' behavior, while heuristic evaluation is faster for checking against known, established principles — so the deciding factor should be which kind of insight the team most needs right now, not a blanket rule favoring one method. Defaulting to cost alone, declaring one method inherently superior in all cases, or assuming the two methods produce identical findings all ignore the genuine, purpose-driven trade-off between the two approaches.
Learning Objective: Choose between empirical and analytical evaluation based on the type of insight needed, rather than treating one as universally superior.
Misconception: Treating empirical and analytical evaluation as interchangeable, or assuming one is always inherently better than the other.

---

## Question

id: q-hci-exam-b-027
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - micro-copy

A banking app's confirmation button reads "Proceed" with no further context, right before an irreversible funds transfer. Which rewrite best follows microcopy principles for a high-stakes, irreversible action?

### Answers

A. "Proceed" (unchanged), since shorter labels are always the clearest choice for any button.

B. "Confirm transfer of $500 to John Doe — this cannot be undone," paired with a clear, separate cancel option.

C. "Click here to continue the process you have already started in this application."

D. "Warning: Proceeding may have consequences. Are you absolutely certain you wish to continue?"

E. "OK," since a universally recognized word removes any need for additional context.

Correct: B
Explanation: For a high-stakes, irreversible action, microcopy should state the specific consequence plainly (amount, recipient, irreversibility) and offer a clear way out, exactly as this rewrite does, which reduces the risk of an uninformed, irreversible mistake.  bare "Proceed," a vague reference to "the process," an alarming but unspecific warning, and a generic "OK" all fail to give the user the specific, concrete information needed to confirm such a consequential action with confidence.
Learning Objective: Apply specific, consequence-stating microcopy as the standard for confirming high-stakes, irreversible actions.
Misconception: Assuming that shorter or more universally familiar wording is always preferable, even when a specific, irreversible consequence is at stake.
