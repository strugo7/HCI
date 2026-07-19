---
id: the-5-user-rule-quiz
lesson: the-5-user-rule
title: "Quiz: The 5-User Rule (Nielsen & Landauer, 1993)"
---

## Question

id: the-5-user-rule/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - five-user-rule
  - empirical-vs-analytical

Which pair correctly matches the number of participants and the percentage of usability problems typically found, for **empirical usability testing with real users** versus **analytical heuristic evaluation with expert evaluators**?

### Answers

A. 5 real users find ~85% of problems (empirical, Nielsen-Landauer); ~5 expert evaluators find ~75% of problems (analytical, heuristic evaluation).

B. 5 real users find ~75% of problems; ~5 expert evaluators find ~85% of problems — the numbers are reversed from option A.

C. Both real users and expert evaluators need at least 20 participants to reach ~85% of problems found.

D. The two methods use the same formula and the same 85% benchmark, since both are usability evaluation techniques.

Correct: A
Explanation: אלו שני חישובים נפרדים לחלוטין, על שתי שיטות שונות: בדיקת שמישות אמפירית עם 5 משתמשים אמיתיים (לפי נוסחת נילסן-לנדאואר N(1-(1-L)ⁿ), עם L=31%) מגיעה לכ-85% מהבעיות. הערכה היוריסטית (אנליטית) עם כ-5 מעריכי-מומחה, ללא מעורבות משתמשים כלל, מגיעה לנקודת אופטימום שונה — כ-75% מהבעיות. תיאור B הופך את המספרים. תיאור C שגוי — 20 משתתפים נדרשים רק במחקר כמותי, לא בבדיקה איכותנית רגילה. תיאור D שגוי — לכל שיטה נוסחה ונקודת אופטימום נפרדות, כי הן נשענות על סוגי משתתפים שונים לגמרי (משתמשים אמיתיים מול מומחים).
Learning Objective: Distinguish "5 users / ~85%" (empirical usability testing) from "5 evaluators / ~75%" (analytical heuristic evaluation) as two distinct, non-interchangeable statistics.
Misconception: Students frequently merge the two numbers into one "rule of 5," or swap which percentage belongs to which method, because both involve roughly 5 participants reaching a cost/benefit optimum — but the participant type (real user vs. expert) and the resulting percentage are different in each case.

---

## Question

id: the-5-user-rule/q2
type: multiple-choice
difficulty: medium
cognitive: apply
estimatedTime: 60
points: 5
concepts:
  - five-user-rule

Using the formula N(1-(1-L)ⁿ) with L=31%, approximately what percentage of usability problems is found after testing with **10** users compared to **5** users, and what does this reveal about the value of the additional 5 participants?

### Answers

A. 5 users find ~85% and 10 users find ~170% — doubling the users doubles the discovery rate.

B. 5 users find ~85% and 10 users find ~98% — the extra 5 users add only about 13 more percentage points, despite costing the same as the first 5.

C. 5 users find ~50% and 10 users find ~85% — you need double the users just to reach the rule's benchmark.

D. 5 users find ~85% and 10 users find ~86% — testing beyond 5 users adds essentially nothing at any scale.

Correct: B
Explanation: חישוב מדויק: 1-(0.69)^5 ≈ 84.4% (מעוגל ל-85%), ו-1-(0.69)^10 ≈ 97.6% (מעוגל ל-98%). כלומר, חמשת המשתתפים הנוספים (6-10) תרמו יחד רק כ-13 נקודות אחוז נוספות — לעומת 84 הנקודות שתרמו חמשת הראשונים — למרות עלות זהה בגיוס וזמן. זו התשואה הפוחתת במלוא הדרה. תיאור A שגוי מתמטית (אחוזים לא יכולים לעבור 100%). תיאור C הופך את המספרים. תיאור D מגזים — יש עדיין תרומה של כ-13 נקודות, לא אפס, אבל היא קטנה יחסית לעלות.
Learning Objective: Apply the Nielsen-Landauer formula to compute and compare discovery rates at different sample sizes, demonstrating diminishing returns.
Misconception: Students sometimes assume the curve is almost perfectly flat after n=5 (zero additional value), when in fact there is still real but shrinking marginal benefit — the point is cost-effectiveness, not that additional users are useless.

---

## Question

id: the-5-user-rule/q3
type: scenario
difficulty: medium
cognitive: evaluate
estimatedTime: 75
points: 5
concepts:
  - five-user-rule
  - usability-testing

Which argument best supports the researcher's recommendation?

### Scenario

A UX researcher plans a routine qualitative usability test for a new checkout flow — the goal is simply to find where users get confused, not to produce statistically significant metrics. Her manager insists: "Let's just recruit 20 users in one big round so we get a complete picture at once." The researcher wants to push back and instead recommend running several smaller rounds of 5 users each, with fixes applied between rounds.

### Answers

A. Twenty users would be too expensive to recruit, so 5 users is simply the cheapest option regardless of what it finds.

B. With one large round of 20, most of the later participants will re-encounter the same major problems the first 5 already revealed, and no fixes can be applied until the entire round finishes; small iterative rounds surface ~85% of problems quickly each time and let the team fix and retest sooner.

C. Twenty users is only appropriate for card sorting studies, never for usability testing of any kind.

D. Statistical significance requires exactly 5 users per round, so anything else would invalidate the results.

Correct: B
Explanation: זהו בדיוק ההיגיון של "בדוק מוקדם, בדוק הרבה, בדוק קטן": בסבב גדול יחיד, משתתפים 6-20 בעיקר חוזרים על הבעיות הבולטות שכבר נמצאו אצל המשתתפים הראשונים (תשואה פוחתת), ואף בעיה לא מתוקנת עד שכל 20 הריאיונות מסתיימים. בסבבים קטנים וחוזרים, כל 5 משתתפים חושפים כ-85% מהבעיות של הגרסה הנוכחית, הצוות מתקן מיד, וכל סבב הבא בודק גרסה משופרת. תיאור A מתמקד רק בעלות ומתעלם מהיתרון האיטרטיבי. תיאור C שגוי — 20 משתתפים דווקא כן מתאימים במקרים אחרים (מחקר כמותי), אבל לא כאן, וגם לא רק לCard Sorting. תיאור D הופך את חוק ה-5 למגבלה נוקשה על סטטיסטיקה, בעוד שבדיקה איכותנית כלל אינה שואפת למובהקות סטטיסטית.
Learning Objective: Recommend an iterative small-sample testing strategy over a single large round for qualitative usability testing, and justify it with the cost/benefit logic of diminishing returns.
Misconception: Students often think "more data always means a more complete picture," missing that in qualitative testing, a single large round wastes budget on redundant findings and delays fixes, while iterative small rounds convert the same budget into multiple real improvement cycles.

---

## Question

id: the-5-user-rule/q4
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - five-user-rule

A UX team wants to redesign a website's navigation menu and needs to understand how a broad user base mentally groups and labels content categories. They plan to run a **card sorting** study. Based on the exceptions to the 5-user rule, how many participants should they recruit **per user group**, and why is 5 not sufficient here?

### Answers

A. 5 participants are enough, because card sorting is a qualitative discovery method just like standard usability testing.

B. At least 15 participants per user group, because card sorting aims to identify a stable, shared mental-model pattern across a population — not merely to detect whether a single problem exists.

C. At least 39 participants, because card sorting produces heatmap-style data similar to eye-tracking.

D. Exactly 20 participants, since card sorting is a quantitative study requiring statistical significance like task-time measurement.

Correct: B
Explanation: Card Sorting הוא אחד החריגים המפורשים לחוק ה-5 משתמשים, כי מטרתו שונה: לא לגלות אם קיימת בעיה בודדת, אלא לזהות **דפוס ארגון חוזר ומהימן** — איך רוב המשתמשים מקבצים ומתייגים מידע. דפוס אמין כזה דורש לפחות 15 משתתפים לכל קבוצת משתמשים, כדי להבחין בין מגמה אמיתית לרעש אקראי של יחיד. תיאור A מתעלם מכך שהמטרה כאן שונה מהותית מבדיקת שמישות רגילה. תיאור C מבלבל בין Card Sorting (15+) ל-Eye-Tracking (~39) — שתי דרישות מדגם שונות מהחריגים לכלל. תיאור D מבלבל בין Card Sorting (15+ לקבוצה) לבין מחקר כמותי כללי (20+) — שני חריגים נפרדים עם מטרות שונות.
Learning Objective: Identify Card Sorting as an exception to the 5-user rule and explain why measuring shared patterns requires a larger sample than discovering the existence of problems.
Misconception: Students often lump all the exceptions (quantitative studies, card sorting, eye-tracking) into one generic "need more users" bucket without distinguishing the specific numbers and the specific reason each method needs a bigger sample.
