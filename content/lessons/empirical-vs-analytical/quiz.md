---
id: empirical-vs-analytical-quiz
lesson: empirical-vs-analytical
title: "Quiz: Empirical vs. Analytical Usability Evaluation"
---

## Question

id: empirical-vs-analytical/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - empirical-vs-analytical

Which statement correctly distinguishes **analytical evaluation** from **empirical evaluation**?

### Answers

A. Analytical evaluation is performed by real users; empirical evaluation is performed by expert reviewers.

B. Analytical evaluation is judged by an expert against known principles, with no real users involved; empirical evaluation is based on observing real users performing real tasks.

C. Heuristic Evaluation and Cognitive Walkthrough are simply two interchangeable names for the same analytical technique, so a team only ever needs to pick one name.

D. Analytical and empirical evaluation both require the same number of participants and produce identical results.

Correct: B
Explanation: הערכה אנליטית מבוססת על שיפוט מומחה מול עקרונות ידועים (כמו היוריסטיקות של נילסן) או סימולציית משתמש (Cognitive Walkthrough), ללא מעורבות משתמשים כלל. הערכה אמפירית מבוססת על תצפית ומדידה של משתמשים אמיתיים המבצעים משימות אמיתיות. תשובה A הפוכה מהמציאות. תשובה C שגויה — Heuristic Evaluation ו-Cognitive Walkthrough הן שתי שיטות אנליטיות שונות: הראשונה בודקת את הממשק כולו מול רשימת עקרונות כלליים, השנייה מדמה משתמש ספציפי המבצע משימה מוגדרת צעד-אחר-צעד. תשובה D שגויה: לשתי הגישות מספרי משתתפים ותוצאות שונים לחלוטין (מומחים מול משתמשים).
Learning Objective: Define empirical and analytical evaluation, identify who is involved in each, and distinguish Heuristic Evaluation from Cognitive Walkthrough as the two main analytical methods.
Misconception: Students sometimes treat Heuristic Evaluation and Cognitive Walkthrough as the same thing because both are "analytical" and expert-run — in reality one is a general principle checklist and the other is a task-specific step-by-step simulation.

---

## Question

id: empirical-vs-analytical/q2
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - empirical-vs-analytical
  - nielsens-heuristics

Roughly 5 expert evaluators conducting a Heuristic Evaluation are said to identify about 75% of a system's usability problems, at the best cost/benefit point. Why is this described as an "optimum" rather than simply "the more evaluators, the better"?

### Answers

A. Because each additional evaluator beyond the first finds fewer new problems, so extra evaluators cost more while adding diminishing value.

B. Because Jakob Nielsen legally requires exactly 5 evaluators for a heuristic evaluation to count as valid.

C. Because heuristic evaluation stops working entirely once more than 5 people look at the interface.

D. Because 5 evaluators together guarantee finding 100% of usability problems, making more evaluators unnecessary.

Correct: A
Explanation: התופעה נובעת מכך שכל מעריך נוסף מוצא בעיות חדשות בקצב פוחת — המעריך הראשון מוצא הרבה, השני מוסיף פחות, וכן הלאה, עד שמעריך נוסף כבר כמעט לא תורם. בנקודה של כ-5 מעריכים, התועלת השולית (עוד בעיות שנמצאות) כבר לא מצדיקה את העלות הנוספת (עוד מומחה, עוד זמן) — זו נקודת האופטימום. תשובה B ממציאה "חוק" שלא קיים — 5 הוא כלל אצבע מבוסס-נתונים, לא חובה פורמלית. תשובה C שגויה — אפשר להוסיף מעריכים, פשוט זה פחות משתלם. תשובה D שגויה — 75% משמעותו שרבע מהבעיות עדיין לא נמצאו גם עם 5 מעריכים.
Learning Objective: Explain the cost/benefit trade-off behind the "~5 expert evaluators, ~75% of problems" heuristic.
Misconception: Students often think more evaluators always finds proportionally more problems. In reality returns diminish sharply after a small number of evaluators, which is exactly why an "optimum" point exists instead of "more is always better."

---

## Question

id: empirical-vs-analytical/q3
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - empirical-vs-analytical

Which approach is most appropriate given these constraints?

### Scenario

A UX designer has a rough wireframe of a new checkout flow and only one afternoon before presenting it to stakeholders. There is no budget or time to recruit test participants, but the designer wants some evidence-based feedback on obvious usability problems before the meeting.

### Answers

A. Empirical evaluation with 5 real users performing the checkout task under observation.

B. Empirical evaluation using a remote moderated think-aloud session scheduled for the following week.

C. Analytical evaluation — a heuristic evaluation of the wireframe against known usability principles, performed by the designer or a colleague.

D. Skip evaluation entirely and present the wireframe as-is, since usability evaluation only makes sense on a finished product.

Correct: C
Explanation: הערכה אנליטית (Heuristic Evaluation) היא הבחירה הנכונה כאן: היא לא דורשת גיוס משתתפים, אפשר לבצע אותה תוך שעות בודדות, וניתן להריץ אותה כבר על Wireframe גס — בדיוק התנאים הנתונים בתרחיש. תשובות A ו-B דורשות גיוס משתתפים ותיאום זמן שלא מתאימים לאילוץ "אחר צהריים אחד, בלי תקציב". תשובה D שגויה מהיסוד — היתרון המרכזי של הערכה אנליטית הוא בדיוק שהיא אפשרית גם על מוצר לא גמור, ולכן אין סיבה לוותר על בדיקה.
Learning Objective: Choose the more appropriate evaluation method given time, budget, and product-stage constraints.
Misconception: Students sometimes assume usability evaluation always requires real users and therefore isn't feasible under tight time/budget constraints — analytical evaluation exists precisely to fill that gap.

---

## Question

id: empirical-vs-analytical/q4
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - empirical-vs-analytical

A team evaluates a food-delivery app's checkout screen. First, an expert performs a heuristic evaluation and quickly flags that the "Confirm Order" button stays active even with an invalid delivery address — a clear error-prevention violation. Later, a usability test with 5 real users reveals that most of them misunderstand a small clock icon next to the delivery time, leading to frustration the expert never flagged. What is the best conclusion to draw from this sequence of events?

### Answers

A. The heuristic evaluation was a waste of time, since the real usability test found the more important problem.

B. The expert should have been able to predict the icon confusion too, so the heuristic evaluation was performed poorly.

C. Analytical and empirical evaluation catch different classes of problems, and running both — analytical first, then empirical — surfaced issues neither method alone would have caught.

D. Since the two methods found different problems, they must have been testing two different products.

Correct: C
Explanation: המקרה ממחיש בדיוק את המסר המרכזי של השיעור: ההערכה האנליטית תפסה הפרת עיקרון ידועה (מניעת שגיאות) במהירות ובזול, בעוד שההערכה האמפירית תפסה בעיה שנבעה מפער ידע ספציפי של משתמשים אמיתיים — משהו שאף מומחה, מטבע תפקידו כמי שכבר מכיר את המערכת, לא צפוי לחוות בעצמו. שתי הבדיקות היו נחוצות ומשלימות. תשובה A שוללת בטעות את הערך של הבדיקה האנליטית, שתפסה בעיה אמיתית ומהר. תשובה B שגויה — זו בדיוק המגבלה המובנית של הערכה אנליטית, לא כשל ביצוע של אותו מומחה ספציפי. תשובה D שגויה — זה אותו ממשק בדיוק; השוני נובע משיטת ההערכה, לא מהמוצר.
Learning Objective: Analyze a case where analytical and empirical evaluation reveal different usability problems, and explain why the methods are complementary rather than redundant.
Misconception: Students sometimes conclude that when the two methods find different problems, one method must be "wrong" or unnecessary — rather than understanding that different methods are structurally suited to catching different failure classes.
