---
id: effectiveness-vs-efficiency-quiz
lesson: effectiveness-vs-efficiency
title: "Quiz: Effectiveness vs. Efficiency (ISO 9241-11)"
---

## Question

id: effectiveness-vs-efficiency/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - effectiveness-vs-efficiency

According to ISO 9241-11, usability is defined as the extent to which specified users can achieve specified goals with which three components?

### Answers

A. Learnability, Memorability, and Errors.

B. Effectiveness, Efficiency, and Satisfaction.

C. Utility, Usability, and Accessibility.

D. Speed, Accuracy, and Aesthetics.

Correct: B
Explanation: תקן ISO 9241-11 מגדיר שמישות כשילוב של שלושה רכיבים בדיוק: אפקטיביות (Effectiveness) — האם המשתמש השיג את מטרתו במדויק ובשלמות; יעילות (Efficiency) — כמה משאבים (זמן, מאמץ) נדרשו; ושביעות רצון (Satisfaction) — התחושה הסובייקטיבית מהתהליך. תשובה A מתארת שלושה מתוך חמשת ממדי נילסן (חסרים שם Efficiency ו-Satisfaction) — מודל שונה לגמרי. תשובה C מבלבלת בין Usefulness (utility + usability) לבין הגדרת ה-ISO עצמה. תשובה D אינה מונחים רשמיים בתקן.
Learning Objective: Define the three formal components of usability according to ISO 9241-11.
Misconception: Students often merge the ISO 9241-11 triad with Nielsen's five dimensions, since both use the terms "Efficiency" and "Satisfaction." The ISO definition has exactly three components; Nielsen's model has five.

---

## Question

id: effectiveness-vs-efficiency/q2
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - effectiveness-vs-efficiency

Based on these numbers, how should the new tool be described?

### Scenario

A team tests a new expense-report submission tool with 50 employees. Results: 96% of employees successfully submitted a correctly filled report (no critical errors). On average, it took each employee 3 minutes and 6 clicks to do so — down from 14 minutes and 35 clicks in the old system, which also had a 96% completion rate.

### Answers

A. More effective than the old tool, but equally efficient.

B. Equally effective as the old tool, and significantly more efficient.

C. Less effective than the old tool, but more efficient.

D. Neither effective nor efficient — the completion rate is too low to draw conclusions.

Correct: B
Explanation: שיעור ההשלמה (Completion Rate) זהה בשתי הגרסאות — 96% — כלומר **האפקטיביות לא השתנתה כלל** בין הגרסה הישנה לחדשה. מה שהשתנה דרמטית הוא המשאבים שנדרשו כדי להגיע לאותה תוצאה: מ-14 דקות ו-35 לחיצות ל-3 דקות ו-6 לחיצות — כלומר **היעילות השתפרה משמעותית**. זהו בדיוק אותו דפוס כמו בדוגמת האתר הממשלתי לתשלום דוחות תנועה מהשיעור: אפשר לשפר יעילות בלי לגעת באפקטיביות. תשובה A שוגה כי האפקטיביות לא השתנתה (היא זהה, לא גבוהה יותר). תשובה C הפוכה מהנתונים. תשובה D שוגה כי 96% הוא שיעור השלמה גבוה מאוד, לא נמוך.
Learning Objective: Apply completion-rate and time-on-task data to correctly classify a system as effective, efficient, both, or neither.
Misconception: Students sometimes assume that any UX improvement must raise the completion rate. In reality, a redesign can leave effectiveness completely unchanged while dramatically improving efficiency — the two are independent axes.

---

## Question

id: effectiveness-vs-efficiency/q3
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - effectiveness-vs-efficiency
  - usability

A first-time user opens a food-delivery app for the very first time and manages to place an order in 50 seconds. A separate, long-time user of the same app — who has ordered through it weekly for a year — places a routine order in 8 seconds. Which statement correctly applies the distinction between ISO 9241-11's Efficiency component and Nielsen's Efficiency dimension?

### Answers

A. Both cases measure the same kind of "Efficiency" — there is no meaningful difference between the two models.

B. Only the long-time user's 8-second order counts as an "Efficiency" measurement at all, under either model.

C. The first-time user's 50-second attempt reflects ISO 9241-11's Efficiency (paired with Effectiveness for any single attempt), while the long-time user's 8-second order reflects Nielsen's Efficiency dimension (speed for experienced, returning users).

D. The first-time user's attempt cannot be measured for efficiency at all, since Efficiency by definition only applies to expert users.

Correct: C
Explanation: זהו בדיוק ההבדל שנלמד בשיעור: **ה-Efficiency של ISO 9241-11** נמדד כזוג עם Effectiveness עבור **כל ניסיון בודד** — גם של משתמש חדש בפעם הראשונה, כמו המשתמש שהזמין תוך 50 שניות. **ה-Efficiency של נילסן**, לעומת זאת, הוא אחד מחמישה ממדים שמתאר ספציפית מהירות של **משתמשים ותיקים שכבר עברו את שלב הלמידה** — בדיוק כמו המשתמש שהזמין תוך 8 שניות אחרי שנה של שימוש שבועי. תשובה A מתעלמת מההבדל המהותי בין המודלים. תשובה B שוגה — הניסיון הראשון בהחלט נמדד ביעילות, רק לפי מודל ה-ISO ולא לפי נילסן. תשובה D שוגה מאותה סיבה.
Learning Objective: Distinguish ISO 9241-11's Efficiency component from Nielsen's Efficiency dimension and correctly map real scenarios to each model.
Misconception: Students often treat "Efficiency" as one universal term. The exam commonly exploits this by describing a first-time user's speed and asking whether it reflects Nielsen's Efficiency dimension — it does not, since Nielsen's Efficiency specifically requires prior learning/experience.

---

## Question

id: effectiveness-vs-efficiency/q4
type: multiple-choice
difficulty: medium
cognitive: analyze
estimatedTime: 60
points: 5
concepts:
  - effectiveness-vs-efficiency

A product manager reports: "Our checkout flow is extremely efficient — the average failed checkout attempt takes users only 20 seconds before they give up." Why is this statement conceptually confused?

### Answers

A. Because 20 seconds is not fast enough to be considered efficient by industry standards.

B. Because efficiency cannot be meaningfully measured or claimed for an attempt that was not effective — effectiveness is a logical prerequisite for evaluating efficiency.

C. Because efficiency should only be measured using click counts, not time.

D. Because the statement should have used the term "Satisfaction" instead of "Efficiency."

Correct: B
Explanation: הכלל המרכזי מהשיעור: אי אפשר למדוד יעילות של ניסיון שלא היה אפקטיבי. כאן המשתמשים **נכשלו** (ויתרו על הקנייה) — כלומר לא הייתה אפקטיביות בכלל. לומר שהכישלון "היה מהיר ולכן יעיל" הוא בדיוק ההיפוך של הסדר ההגיוני הנכון: קודם בודקים האם המשימה הושלמה, ורק אם כן יש טעם לשאול כמה זמן זה לקח. "20 שניות עד ויתור" הוא נתון מדאיג על אפקטיביות נמוכה, לא הישג של יעילות. תשובה A מתמקדת במספר עצמו ומפספסת את הבעיה המושגית. תשובות C ו-D אינן קשורות לשורש הטעות.
Learning Objective: Analyze why effectiveness is a logical prerequisite to efficiency, and identify statements that violate this order.
Misconception: Students sometimes think "fast" always means "efficient," regardless of outcome. Speed is only a meaningful efficiency signal once effectiveness (successful task completion) has already been established.

