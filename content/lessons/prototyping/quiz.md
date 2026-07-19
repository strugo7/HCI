---
id: prototyping-quiz
lesson: prototyping
title: "Quiz: Building an Interactive Prototype"
---

## Question

id: prototyping/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - prototype

Which of the following is the most accurate definition of a **prototype** in the product design process?

### Answers

A. A final, fully-coded version of the product ready for release.

B. An early, experienceable version of a product or feature that simulates how a user would navigate and interact with it, used to gather feedback before full development.

C. A written document listing all functional requirements of the system.

D. A static, single-screen sketch showing only the layout and hierarchy of elements.

Correct: B
Explanation: אב-טיפוס (Prototype) הוא גרסה מוקדמת וניתנת-לחוויה, שמדמה איך המשתמש ינווט ויתקשר עם המערכת — לצורך קבלת משוב לפני השקעה בפיתוח מלא. תשובה A שגויה כי אב-טיפוס הוא ההפך מגרסה סופית מוכנה. תשובה C מתארת מסמך דרישות, לא כלי חווייתי. תשובה D מתארת דווקא Wireframe — ייצוג סטטי של מסך בודד, לא סימולציה של אינטראקציה.
Learning Objective: Define what a prototype is and explain why it is built before developing the actual product.
Misconception: Students sometimes think a prototype must be functional code. In reality, a prototype only needs to feel real enough for a test user to react to — even paper qualifies.

---

## Question

id: prototyping/q2
type: multiple-choice
difficulty: medium
cognitive: analyze
estimatedTime: 60
points: 5
concepts:
  - wireframe
  - prototype

A teammate says: "I built a wireframe of the checkout flow, and you can already click through it to see how the payment screen transitions to the confirmation screen." What is actually wrong with this description?

### Answers

A. Nothing is wrong — wireframes are always clickable and interactive by definition.

B. What was actually built is a prototype, not a wireframe — a wireframe is a static representation of a single screen's structure, while simulating navigation between screens is exactly what defines a prototype.

C. The teammate should have used a paper prototype instead of a digital one, since checkout flows must always be tested on paper first.

D. Wireframes and prototypes are interchangeable terms for the same artifact, so the description is fine either way.

Correct: B
Explanation: Wireframe הוא ייצוג **סטטי** של מסך בודד — הוא עונה על השאלה "מה יש במסך הזה?". ברגע שיש לחיצה שגורמת למעבר בין מסכים ("payment screen transitions to confirmation screen"), מדובר בסימולציה של זרימה — וזו בדיוק ההגדרה של Prototype. תשובה A הפוכה מהעובדות: Wireframe הוא סטטי מטבעו. תשובה C לא רלוונטית — אין כלל שמחייב נייר דווקא לזרימת תשלום. תשובה D שגויה כי ההבחנה בין השניים היא בדיוק מה שהשיעור מלמד ונבחן עליו.
Learning Objective: Distinguish sharply between the static, single-screen nature of a wireframe and the interactive, multi-screen nature of a prototype.
Misconception: Students often use "wireframe" and "prototype" interchangeably because both can look like simple sketches. The deciding factor is not visual polish but whether navigation/interaction between screens is being simulated.

---

## Question

id: prototyping/q3
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - prototype
  - fidelity

Which approach best fits this stage of the process?

### Scenario

Two students are asked to test a new "track my order" feature for a food-delivery app that they had already researched earlier in the course using ethnographic research and personas. They have one hour before their user testing session and want to find out, as cheaply as possible, whether test users understand how to navigate from the order list to the live map screen.

### Answers

A. Build a fully clickable Mid/High-Fidelity prototype in Axure with final colors and branding, since only a polished prototype produces trustworthy feedback.

B. Skip prototyping entirely and go straight to writing the production code, since the feature was already validated through personas.

C. Sketch each screen on a separate sheet of paper, have one teammate play "the computer" and swap pages as the test user taps on the paper — a Low-Fidelity paper prototype.

D. Write a detailed functional specification document describing every screen transition in text, without any visual mockup.

Correct: C
Explanation: בשלב הזה — לפני שאישררו את הזרימה הבסיסית ועם שעה בלבד לעבודה — Low-Fidelity Paper Prototype הוא הבחירה הנכונה: זול, מהיר להכנה, וקל לזרוק ולשנות אם מתגלה שהניווט מבלבל. תשובה A שגויה כי השקעה ב-Mid/High-Fidelity בשלב מוקדם כזה יקרה מדי ומיותרת — עדיין לא ידוע אם המבנה הבסיסי תקין. תשובה B מפרה את עקרון Fail Fast, Fail Cheap — מחקר עם פרסונות אינו תחליף לבדיקת ניווט בפועל. תשובה D אינה אב-טיפוס כלל — מסמך טקסטואלי לא מאפשר למשתמש "לחוות" את הזרימה.
Learning Objective: Apply the Paper Prototype technique to test navigation flow cheaply and quickly at an early stage.
Misconception: Students sometimes think more polish always produces better feedback. Early in the process, a rough paper prototype produces the same navigational insight far faster and cheaper than a polished one.

---

## Question

id: prototyping/q4
type: multiple-choice
difficulty: hard
cognitive: evaluate
estimatedTime: 75
points: 5
concepts:
  - fidelity
  - prototype

A design team already validated the basic screen flow of a feature using a paper prototype. A manager now insists on skipping Mid-Fidelity entirely and building a full High-Fidelity, pixel-perfect clickable prototype immediately — arguing this "saves time" because the team won't have to redo work later. What is the strongest argument against this decision?

### Answers

A. High-Fidelity prototypes are always technically impossible to build before the product itself is coded.

B. Users cannot give any useful feedback on a High-Fidelity prototype, since it looks too much like the real product.

C. Investing heavily in a High-Fidelity prototype increases the cost of changing course if user testing still reveals a deeper problem — the further you move along the fidelity spectrum, the more expensive it becomes to discard the work and redesign.

D. High-Fidelity prototypes are only allowed after the product has already shipped, as a form of documentation.

Correct: C
Explanation: זהו לב הפשרה (Trade-off) של ה-Fidelity spectrum: ככל שרמת הדיוק עולה, המשוב מדויק יותר, אבל גם עולה בזמן ובמשאבים לשנות כיוון. אם דילגו על Mid-Fidelity וקפצו ישר ל-High-Fidelity, וגילוי הבעיה עדיין אפשרי (למשל פרט אינטראקציה עדין שלא נבדק ב-Low-Fidelity), הצוות מסתכן בהשקעה יקרה שקשה לוותר עליה — בדיוק המלכודת שהעיקרון "תתחילו זול, השקיעו ברמת דיוק גבוהה רק אחרי אישרור" נועד למנוע. תשובה A שגויה עובדתית — High-Fidelity prototypes נבנים כל הזמן בכלים כמו Axure לפני קוד. תשובה B שגויה — משתמשים כן נותנים משוב מועיל על High-Fidelity, רק שהוא מתמקד בפרטים עדינים ולא במבנה בסיסי. תשובה D שגויה — אב-טיפוס נבנה **לפני** הפיתוח, לא כתיעוד אחריו.
Learning Objective: Evaluate the cost trade-off of jumping to High-Fidelity prototyping too early relative to what is already known about the design's soundness.
Misconception: Students sometimes think "more polished, sooner" is a pure time-saver. In practice, higher fidelity built earlier raises the cost of the very design changes that testing might still reveal are necessary.
