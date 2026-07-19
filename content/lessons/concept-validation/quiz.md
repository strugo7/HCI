---
id: concept-validation-quiz
lesson: concept-validation
title: "Quiz: Validating the Concept with Users and Stakeholders"
---

## Question

id: concept-validation/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - validation

Why do teams show a wireframe or prototype to designers, developers, stakeholders, and users *before* writing code?

### Answers

A. Because a polished visual design is required before any technical work can start.

B. Because the wireframe or prototype acts as a common, low-cost language that lets each audience react to the same concept and catch different problems while changes are still nearly free.

C. Because stakeholders legally require a signed-off document before a project can begin.

D. Because wireframes are more visually appealing than written specifications.

Correct: B
Explanation: המטרה המרכזית של בחינת הקונספט היא זו — wireframe או prototype משמשים שפה משותפת שמאפשרת לארבעה קהלים שונים (מעצבים, מפתחים, בעלי עניין, משתמשים) להגיב לאותו רעיון בזמן שהתיקון עדיין כמעט חינמי, לפני שנכתב קוד. תשובה A שגויה — wireframe הוא במכוון לא מעוצב (ראו שיעור Wireframing). תשובה C שגויה — אין דרישה משפטית כזו. תשובה D שגויה — האסתטיקה אינה הסיבה; מדובר בכלי לתקשורת ולזיהוי בעיות מוקדם.
Learning Objective: Define concept validation and explain why wireframes/prototypes function as a shared language before development.
Misconception: Students sometimes think wireframes exist to look good or as a formal deliverable. In reality their value is functional — a cheap artifact for catching problems before expensive work begins.

---

## Question

id: concept-validation/q2
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - validation
  - usability

A product manager approves a prototype's scope and budget after a demo. What is the most accurate conclusion about the prototype's readiness?

### Answers

A. The prototype is now fully validated and ready for development, since business approval is the highest bar to clear.

B. Stakeholder approval confirms business/scope alignment only — it says nothing about whether real users can understand and complete tasks with the interface, which requires a separate usability validation.

C. Stakeholder approval is unnecessary once a prototype exists, since only user testing matters.

D. Since the product manager is also a potential user of the product, this approval already counts as user validation.

Correct: B
Explanation: בדיקה מול בעלי עניין תופסת חוסר יישור עסקי (תקציב, היקף, אסטרטגיה) — לא בעיות שמישות. כפי שנלמד בשיעור, קונספט יכול לעבור בהצלחה מול בעלי עניין ולהיכשל לחלוטין מול משתמשים אמיתיים (כמו Windows 8). תשובה A שגויה — אישור עסקי אינו "הבר הגבוה ביותר"; הוא בודק דבר אחר לגמרי מבדיקת שמישות. תשובה C שגויה — שתי הבדיקות נחוצות, לא רק בדיקת משתמשים. תשובה D שגויה — מנהל מוצר אינו מייצג את קהל היעד האמיתי ואת ההקשר שבו המשתמשים בפועל פועלים.
Learning Objective: Distinguish stakeholder validation from user validation and explain that passing one does not guarantee passing the other.
Misconception: Students often assume that internal/business sign-off is sufficient evidence the design "works," conflating strategic approval with demonstrated usability.

---

## Question

id: concept-validation/q3
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - validation
  - usability

Which statement correctly matches each piece of feedback to the type of problem it reveals?

### Scenario

A team shows a wireframe of a new checkout screen to four people separately: a designer, a backend engineer, a business stakeholder, and a real user recruited for testing. The engineer says: "The real-time delivery map shown here would require rebuilding our server architecture — that's three extra sprints." The user, asked to place an order, tries several times to tap the total price expecting a cost breakdown, but nothing happens.

### Answers

A. Both comments reveal the same type of problem — general dissatisfaction with the checkout screen.

B. The engineer's comment reveals a usability problem; the user's comment reveals a technical feasibility problem.

C. The engineer's comment reveals a technical feasibility problem that only a developer could catch; the user's comment reveals a usability problem — an element that looks interactive but isn't — that only real-user testing could catch.

D. Both comments should have been caught by the stakeholder review, since stakeholders are responsible for approving the full scope of the feature.

Correct: C
Explanation: זהו בדיוק העיקרון של "ארבעה קהלים, ארבעה סוגי בעיות" מהשיעור: המהנדס מזהה בעיית היתכנות טכנית (Feasibility) — הוא היחיד שמכיר את מגבלות הארכיטקטורה הקיימת. המשתמש מזהה בעיית שמישות (Usability) — ציפייה שאלמנט מסוים יהיה אינטראקטיבי כשהוא אינו כזה, בעיה שרק תצפית על משתמש אמיתי מבצע משימה חושפת. תשובה A שגויה — אלו שני סוגי בעיות שונים לחלוטין, לא "אי-שביעות רצון" כללית. תשובה B שגויה — הפוכה: המהנדס תפס בעיה טכנית, המשתמש תפס בעיית שמישות. תשובה D שגויה — בעל עניין בודק יישור עסקי, לא היתכנות טכנית או שמישות; הוא לא היה מזהה אף אחת מהבעיות הללו.
Learning Objective: Apply the four-audience framework to a concrete scenario and correctly classify which type of problem each audience's feedback reveals.
Misconception: Students sometimes assume any single reviewer (or stakeholder review alone) can catch all categories of problems. Each audience is blind to problem types outside its own expertise.

---

## Question

id: concept-validation/q4
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - validation
  - human-centered-design

What does this scenario best illustrate about concept validation, and what should the team have done differently?

### Scenario

A team shows their wireframe only to the business stakeholder, who approves the budget, scope, and overall direction without reservation. Satisfied with this sign-off, the team treats the concept as validated, revises the wireframe based on the stakeholder's notes only, and moves straight into full development — never testing it with a real user. Users are shown the finished product for the first time at launch, and many struggle to complete the core task.

### Answers

A. The team should have skipped stakeholder review entirely and gone straight to development, since stakeholder feedback was clearly a waste of time.

B. Concept validation is a one-time checklist item; the failure simply means the team needed a more detailed wireframe, not more validation rounds.

C. The team treated concept validation as a one-time gate satisfied by a single audience, instead of an iterative loop that must include separate user validation and repeated rounds of feedback and revision before development — consistent with the iterative cycle of Human-Centered Design.

D. The failure is unrelated to the validation process; it is purely a development-quality issue that only code review could have caught.

Correct: C
Explanation: התרחיש ממחיש בדיוק את שני העקרונות המרכזיים של השיעור: (1) בדיקה מול בעלי עניין אינה תחליף לבדיקה מול משתמשים — הצוות דילג על הבדיקה שהייתה חושפת את כשל השמישות. (2) בחינת קונספט היא לולאה איטרטיבית (בהתאמה למחזור העבודה של Human-Centered Design), לא שער חד-פעמי — סבב בדיקה יחיד ומעבר ישיר לפיתוח מלא מנוגד לעיקרון הזה. תשובה A שגויה — בדיקת בעלי עניין עדיין חשובה, רק אינה מספיקה לבדה. תשובה B שגויה — הבעיה אינה רמת הפירוט של השרטוט אלא היעדר בדיקת משתמשים ולולאת איטרציה. תשובה D שגויה — הבעיה נובעת בדיוק מדילוג על שלב בחינת הקונספט, לא מאיכות הפיתוח.
Learning Objective: Analyze a validation failure to identify which principle (audience coverage, iteration) was violated and connect it explicitly to the Human-Centered Design iterative cycle.
Misconception: Students often think one round of feedback from any audience "counts" as full concept validation. In reality, validation requires covering both stakeholder and user perspectives, repeated iteratively, before moving to development.

