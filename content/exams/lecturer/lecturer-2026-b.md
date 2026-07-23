---
id: lecturer-2026-a
kind: lecturer
title: "מבחן מרצה — HCI, מועד א' סמסטר ב׳ (2026)"
year: 2026
duration: 7200
source: "מבחן HCI מועד א׳ סמסטר ב׳ שנת 2026.pdf"
---

# מבחן מרצה — HCI, מועד א' (2026)

HCI: concepts and applications, 273020 · ד"ר משה ליבה · 28/06/2026 · 27 שאלות · משקל זהה · ללא חומר עזר.
השאלות והמסיחים הועתקו מילה במילה מהטופס המקורי (באנגלית). מפתח התשובות נלקח מדוח המשוב הממוחשב שצורף לטופס (Tomax) עבור שאלות 1–24; לשאלות 25–27 (שאינן מופיעות בדוח) התשובה נקבעה על פי החומר. ההסברים, מטרות הלמידה ותשומת הלב למסיחים נכתבו על ידינו.

## Question

id: q-lecturer-2026-a-001
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - usability

Which statement about heuristic evaluation is most accurate as a limitation relative to user testing?

### Answers

A. It can systematically identify guideline violations early, but may miss issues driven by domain misconceptions or novel user strategies.

B. It can under-represent workflow issues that emerge only across multi-step, multi-screen journeys.

C. It is sensitive to evaluator expertise and can vary in severity ratings across evaluators.

D. It can generate false positives when guidelines conflict with domain-specific conventions.

E. It may overlook context-of-use factors (interruptions, constraints) when performed offsite.

Correct: A
Explanation: כל האפשרויות מתארות מגבלות אמיתיות של הערכה היוריסטית, אך השאלה מבקשת את המגבלה המרכזית ביחס לבדיקת משתמשים: היוריסטיקה מזהה הפרות של כללי אצבע, אך מפספסת בעיות הנובעות מתפיסות שגויות של המשתמש בתחום או מאסטרטגיות בלתי-צפויות שרק משתמשים אמיתיים חושפים. שאר המגבלות משניות ואינן ההבדל היסודי מול בדיקה עם משתמשים.
Learning Objective: לזהות שהחיסרון המרכזי של הערכת מומחים הוא פספוס בעיות התלויות במשתמש ובהקשר האמיתי.
Misconception: הנחה שהערכה היוריסטית מספקת כיסוי מלא כמו בדיקה עם משתמשים אמיתיים.

---

## Question

id: q-lecturer-2026-a-002
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - contextual-inquiry

A dispatch interface is used during emergencies with constant interruptions, multitasking, and handoffs. Which method most directly targets discovering interruption-driven failures?

### Answers

A. An expert heuristic review focusing on consistency and error prevention.

B. A log review of task sequences to infer where delays or retries occur.

C. A short series of semi-structured interviews focusing on "hard moments" and typical workarounds.

D. A moderated usability test using realistic scenarios, conducted in a controlled quiet room.

E. Contextual inquiry/shadowing during real shifts to capture interruptions, handoffs, and workarounds.

Correct: E
Explanation: כשלים הנובעים מהפרעות מתגלים רק בסביבת העבודה האמיתית — לכן חקירה הקשרית וצפייה במהלך משמרות אמת לוכדות את ההפרעות, ההעברות והעקיפות בזמן שהן קורות. סקירת מומחים, ניתוח לוגים וראיונות מספקים רמזים עקיפים, ובדיקה בחדר שקט ומבוקר מנטרלת בדיוק את ההפרעות שמבקשים לחקור.
Learning Objective: לבחור שיטת תצפית בהקשר האמיתי כדי לחשוף כשלים תלויי-סביבה.
Misconception: אמונה שבדיקה במעבדה שקטה משקפת את תנאי העבודה עתירי-ההפרעות.

---

## Question

id: q-lecturer-2026-a-003
type: multiple-choice
difficulty: medium
cognitive: apply
points: 4
concepts:
  - usability

Which scenario most strongly warrants prioritizing error prevention over recovery?

### Answers

A. Posting publicly where deletion exists but may not remove external copies.

B. Editing a document where Undo exists but users may not notice it under time pressure.

C. Approving a purchase where cancellation is possible within a short grace period.

D. Scheduling where changes are reversible but may trigger downstream notifications.

E. Confirming a high-stakes irreversible action with safety constraints (e.g., transferring funds to a new payee with no rollback).

Correct: E
Explanation: מניעת שגיאה חשובה יותר מהתאוששות כאשר לפעולה אין דרך חזרה — כמו העברת כספים בלתי-הפיכה לנמען חדש. בשאר המצבים קיים מנגנון תיקון (מחיקה, ביטול, חזרה), ולכן מנגנון התאוששות מספק; רק כשההשלכה בלתי-הפיכה וקריטית יש להשקיע במניעה מלכתחילה.
Learning Objective: לזהות שפעולות בלתי-הפיכות בעלות סיכון גבוה מחייבות מניעת שגיאה ולא רק התאוששות.
Misconception: הנחה שמנגנון ביטול או חזרה מספיק גם כשהפעולה בלתי-הפיכה.

---

## Question

id: q-lecturer-2026-a-004
type: multiple-choice
difficulty: medium
cognitive: apply
points: 4

Users categorize "Requests," "Cases," and "Tickets" differently from the current menu structure. Which method best diagnoses category mismatch?

### Answers

A. Log/analytics review of navigation paths to infer where users deviate or backtrack.

B. Hybrid card sorting (open → propose structure; closed → validate fit) followed by synthesis.

C. Moderated usability testing on navigation tasks to see where users expect items to appear.

D. A/B testing two alternative navigation groupings to compare findability success rate.

E. Heuristic evaluation focusing on "match between system and the real world" and labeling consistency.

Correct: B
Explanation: אי-התאמה בין קטגוריות המשתמש למבנה התפריט מאובחנת ישירות במיון כרטיסים: מיון פתוח חושף כיצד משתמשים מקבצים ומתייגים, ומיון סגור מתקף מבנה מוצע. ניתוח לוגים, בדיקת שמישות והשוואת גרסאות עשויים להצביע על סימפטומים, אך אינם חושפים את המודל המנטלי של הקיבוץ; הערכת מומחה אינה משקפת את תפיסת המשתמשים.
Learning Objective: לבחור במיון כרטיסים לאבחון פערי קטגוריזציה מול המודל המנטלי של המשתמש.
Misconception: ניסיון לאבחן פער קטגוריזציה מתוך לוגים או בדיקות שמישות במקום ממיון כרטיסים.

---

## Question

id: q-lecturer-2026-a-005
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - usability

Why is it risky to rely only on clickstream analytics to identify "the usability problem" in a form abandonment funnel?

### Answers

A. Analytics shows where drop-off happens (what), but not the cognitive cause (why) without complementary qualitative methods.

B. Analytics can show correlations but rarely isolates a single causal UI element.

C. Confounds (device type, traffic source) can shift drop-off independent of UX.

D. Analytics may reflect mixed intents (comparison, postponing) rather than interface failure, requiring interpretation.

E. Instrumentation choices can bias what appears to be the "problem step".

Correct: A
Explanation: כל האפשרויות נכונות חלקית, אך העיקרון המרכזי הוא שאנליטיקה כמותית מגלה היכן קורה הנטישה (המה), אך לא את הסיבה הקוגניטיבית (המדוע) — לשם כך נדרשות שיטות איכותניות משלימות. שאר הטענות (מתאם מול סיבתיות, גורמים מבלבלים, כוונות מעורבות, הטיית מדידה) הן ניסוחים ספציפיים של אותה מגבלת-יסוד.
Learning Objective: להבחין בין נתונים כמותיים ("איפה") לבין הבנת הסיבה ("למה") הדורשת מחקר איכותני.
Misconception: אמונה שנתוני קליקים לבדם מספיקים לאבחון סיבת בעיית השמישות.

---

## Question

id: q-lecturer-2026-a-006
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - usability

You can recruit only 6 target users. The key question is whether people interpret "Submit request" as final or reversible in a claims flow. Which approach best matches this goal?

### Answers

A. Heuristic evaluation focusing on error prevention and recovery to predict reversibility expectations.

B. Benchmarking time-on-task across users to infer whether the action feels final.

C. Card sorting to improve labeling of the claims categories so users feel in control.

D. A/B testing two "Submit" labels (e.g., "Submit" vs. "Send") to compare completion rate.

E. Moderated usability testing with scripted critical tasks, observation, and a think-aloud protocol during task execution.

Correct: E
Explanation: כדי לחשוף כיצד משתמשים מפרשים פעולה, בדיקת שמישות מונחית עם פרוטוקול "חשיבה בקול" חושפת ישירות את מחשבות המשתמש בזמן ביצוע המשימה. הערכת מומחים חוזה בלבד, מדידת זמן אינה מסבירה פרשנות, מיון כרטיסים עוסק בתיוג קטגוריות, והשוואת תוויות מודדת תוצאה ולא את הסיבה התפיסתית.
Learning Objective: לבחור בבדיקה מונחית עם חשיבה בקול לחשיפת פרשנות סובייקטיבית של המשתמש.
Misconception: ניסיון להסיק פרשנות משתמש ממדדי זמן או מהערכת מומחים במקום מהתבוננות ישירה.

---

## Question

id: q-lecturer-2026-a-007
type: multiple-choice
difficulty: medium
cognitive: understand
points: 4
concepts:
  - usability

A team runs moderated sessions with target users on a clickable prototype and collects task success, time, critical errors, and behavior notes. What classification fits best?

### Answers

A. Objective empirical evaluation.

B. Mixed empirical evaluation (objective metrics plus subjective ratings).

C. Predictive evaluation (model-based performance estimation).

D. Analytical expert-based evaluation (principle-based inspection).

E. Subjective empirical evaluation (primarily perception-based).

Correct: A
Explanation: ההערכה אמפירית משום שהיא מבוצעת עם משתמשים אמיתיים, ואובייקטיבית משום שהיא אוספת מדדים התנהגותיים נמדדים — הצלחת משימה, זמן ושגיאות קריטיות — ולא דירוגים סובייקטיביים. אין כאן דירוגי תפיסה (שהיו הופכים אותה למעורבת או סובייקטיבית), אין מודל חיזוי, ואין בדיקת מומחים אנליטית.
Learning Objective: לסווג הערכה לפי מקור הנתונים (אמפירי מול אנליטי) וטיבם (אובייקטיבי מול סובייקטיבי).
Misconception: בלבול בין מדדים התנהגותיים אובייקטיביים לבין דירוגי תפיסה סובייקטיביים.

---

## Question

id: q-lecturer-2026-a-008
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - attention

In testing, participants repeatedly miss a small but critical status indicator while focusing on a demanding multi-step form. What is the strongest explanation?

### Answers

A. Change blindness: users fail to notice updates when the indicator changes after an action.

B. Low visual salience: the indicator does not stand out relative to surrounding elements.

C. Expectation mismatch: users do not believe a status indicator should matter for task completion.

D. Banner blindness: users learn to ignore content in locations that resemble ads or promotional areas.

E. Inattentional blindness / attentional tunneling under cognitive load.

Correct: E
Explanation: כשמשימה תובענית מרוכזת את הקשב, מתרחש עיוורון קשבי (attentional tunneling) והמשתמש אינו קולט אלמנט גלוי אך לא-מצופה — זהו ההסבר החזק ביותר בהינתן העומס הקוגניטיבי המפורש בתרחיש. עיוורון לשינוי נוגע לשינוי לאחר פעולה, סאליינטיות נמוכה ועיוורון-באנרים הם גורמים חלקיים, וחוסר ציפייה אינו לוכד את השפעת העומס.
Learning Objective: לקשר החמצת רכיב גלוי תחת עומס קוגניטיבי לעיוורון קשבי.
Misconception: ייחוס ההחמצה לסאליינטיות נמוכה בלבד, תוך התעלמות מעומס הקשב.

---

## Question

id: q-lecturer-2026-a-009
type: multiple-choice
difficulty: easy
cognitive: understand
points: 4
concepts:
  - usability

Users learn the system quickly in training, but after a few weeks they need to "re-learn" basic operations. Which usability attribute is most implicated?

### Answers

A. Perceived usability (satisfaction).

B. Efficiency.

C. Memorability.

D. Error tolerance (recoverability).

E. Learnability.

Correct: C
Explanation: היכולת לחזור למערכת לאחר תקופה ולזכור כיצד להפעילה היא ממד הזכירות (Memorability). הלמידות מתייחסת לקלות בפעם הראשונה — והתרחיש דווקא מציין שהלמידה הראשונית הייתה מהירה; יעילות, שביעות רצון וסבילות לשגיאות אינן נוגעות לשחיקת הזיכרון לאורך זמן.
Learning Objective: להבחין בין למידות (פעם ראשונה) לזכירות (חזרה לאחר זמן).
Misconception: ערבוב בין למידות לזכירות כשהבעיה היא שכחה לאחר תקופת אי-שימוש.

---

## Question

id: q-lecturer-2026-a-010
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - usability

A team has storyboards and static screen flows for a government benefits portal. They must produce a prioritized list of usability risks in 48 hours, before any interactive prototype exists. What is the most defensible first step?

### Answers

A. Run a structured heuristic evaluation with multiple evaluators, then consolidate and severity-rank findings using agreed criteria.

B. Run a pluralistic walkthrough (designer + developer + stakeholder) to identify where explanations are needed.

C. Conduct 3–4 rapid moderated sessions using paper screens to estimate completion rates on end-to-end tasks.

D. Run a quick content audit and readability check to reduce cognitive burden in text-heavy screens.

E. Do stakeholder interviews to align on "what good looks like" before any evaluation activity.

Correct: A
Explanation: כשנדרשת רשימת סיכונים מתועדפת תוך 48 שעות וללא אב-טיפוס אינטראקטיבי, הצעד המבוסס ביותר הוא הערכה היוריסטית מובנית עם כמה מעריכים, שתוצאותיה מאוחדות ומדורגות לפי חומרה. סדנת מעבר, סשנים על נייר, ביקורת תוכן וראיונות בעלי-עניין הם משלימים בעלי ערך, אך אינם מפיקים במהירות רשימת סיכונים מתועדפת ובת-השוואה כמו הערכת מומחים מובנית.
Learning Objective: לבחור בהערכת מומחים מובנית ומדורגת-חומרה כשצריך מיפוי סיכונים מהיר ללא משתמשים.
Misconception: הנחה שאי-אפשר להעריך שמישות לפני קיום אב-טיפוס אינטראקטיבי.

---

## Question

id: q-lecturer-2026-a-011
type: multiple-choice
difficulty: medium
cognitive: apply
points: 4
concepts:
  - usability

During evaluation, the team wants to uncover users' reasoning, misconceptions, and decision points while performing tasks (not just whether they succeed). Which method best fits this goal?

### Answers

A. Heuristic evaluation to identify guideline violations that may explain user confusion.

B. A/B testing two interface variants to compare completion and drop-off rates.

C. Analytics/log analysis to identify where users abandon the flow.

D. A post-session questionnaire (e.g., satisfaction/usability rating) to capture perceived difficulty.

E. Moderated usability testing using a think-aloud protocol during task execution.

Correct: E
Explanation: כדי לחשוף את ההיגיון, התפיסות השגויות ונקודות ההחלטה של המשתמש תוך כדי ביצוע, בדיקת שמישות מונחית עם "חשיבה בקול" היא השיטה הישירה — היא מנגישה את תהליך המחשבה בזמן אמת. הערכת מומחים חוזה בלבד, השוואת גרסאות ולוגים מודדים תוצאה, ושאלון לאחר הסשן לוכד תחושה בדיעבד ולא את תהליך ההחלטה.
Learning Objective: לבחור בחשיבה-בקול לחשיפת תהליך החשיבה של המשתמש, ולא רק תוצאת המשימה.
Misconception: ניסיון להסיק תהליך חשיבה ממדדי הצלחה או משאלון בדיעבד.

---

## Question

id: q-lecturer-2026-a-012
type: multiple-choice
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - usability

A team proposes an A/B test to compare two onboarding concepts that differ in many ways (sequence, content, number of steps, and UI layout). At the same time, the team has not finalized a single primary success metric, and tracking is only partially implemented. What is the best critique?

### Answers

A. The main issue is only statistical power; once traffic is sufficient the conclusions will be causal.

B. The test would have weak causal interpretability because too many variables change at once, and outcomes are not reliably defined/measured yet.

C. A/B testing is appropriate here if the sample size is large enough, even without a primary metric.

D. A/B testing is better replaced by heuristic evaluation because it always yields clearer answers early.

E. The problem is only UI fidelity; with a high-fidelity prototype, A/B conclusions become reliable.

Correct: B
Explanation: כששתי הגרסאות נבדלות בהרבה משתנים בו-זמנית ואין מדד הצלחה מרכזי מוגדר ומדוד, לא ניתן לייחס הבדל בתוצאה לגורם ספציפי — הפרשנות הסיבתית חלשה. הגדלת התנועה אינה פותרת בלבול משתנים, ניסוי ללא מדד מרכזי אינו תקף, החלפה בהערכת מומחים אינה המסקנה, ורזולוציית הממשק אינה שורש הבעיה.
Learning Objective: לזהות שהשוואת גרסאות דורשת בידוד משתנים ומדד תוצאה מוגדר לפרשנות סיבתית.
Misconception: אמונה שדגימה גדולה מספיק מכשירה ניסוי השוואתי גם ללא בידוד משתנים ומדד ברור.

---

## Question

id: q-lecturer-2026-a-013
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - usability

Two designs yield: Design X has higher task success but longer completion time; Design Y is faster but produces more critical errors. Which interpretation best distinguishes effectiveness and efficiency?

### Answers

A. The "better" design depends on context: risk tolerance, user expertise, and task criticality.

B. Y is more efficient and could be acceptable if critical errors are rare in real usage conditions.

C. X is more effective; Y may be more efficient on successful attempts, but at a cost to critical errors.

D. X may reduce cognitive load but introduces friction; Y may encourage speed at the cost of accuracy.

E. The result reflects a speed–accuracy trade-off that should be evaluated with error severity, not time alone.

Correct: C
Explanation: השאלה מבקשת להבחין בין אפקטיביות ליעילות: אפקטיביות היא הצלחת המשימה (שבה עיצוב X עדיף), ויעילות היא מהירות בניסיונות מוצלחים (שבה עיצוב Y מהיר אך משלם בשגיאות קריטיות). שאר הניסוחים נכונים כשיקול כללי, אך רק אחד ממפה במפורש את המושגים אפקטיביות ויעילות לממצאים.
Learning Objective: להבחין בין אפקטיביות (הצלחה) ליעילות (מהירות) בניתוח תוצאות בדיקה.
Misconception: ערבוב בין אפקטיביות ליעילות, או צמצום הניתוח לשקלול מהירות בלבד.

---

## Question

id: q-lecturer-2026-a-014
type: multiple-choice
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - mental-models
  - signifier

In a budgeting app, "Freeze Budget" uses a snowflake icon. Many users assume it means "hide temporarily" rather than "lock edits." Which concept best explains the breakdown?

### Answers

A. Poor mapping between the control location and the object it affects within the layout.

B. Weak signifiers: the icon does not indicate whether it changes state or applies a constraint.

C. Overloaded terminology ("freeze") that conflicts with other app features using similar wording.

D. A mental-model mismatch triggered by metaphor/semantics, leading to incorrect action expectations.

E. Insufficient feedback after the action, leaving users unsure what changed.

Correct: D
Explanation: המשתמשים מייחסים למטאפורה של "הקפאה" ולסמל פתית השלג משמעות של הסתרה זמנית במקום נעילת עריכה — זהו פער במודל המנטלי שמקורו בסמנטיקה ובמטאפורה, המוליד ציפיית פעולה שגויה. מיפוי לקוי, סימון חלש, עמימות מונחית ומשוב חסר הם היבטים סמוכים, אך שורש אי-ההבנה כאן הוא פרשנות המטאפורה עצמה.
Learning Objective: לזהות פער במודל המנטלי הנובע ממטאפורה או סמנטיקה מטעה.
Misconception: ייחוס אי-ההבנה למשוב או למיפוי, בעוד המקור הוא פרשנות המטאפורה.

---

## Question

id: q-lecturer-2026-a-015
type: multiple-choice
difficulty: medium
cognitive: evaluate
points: 4
concepts:
  - human-centered-design

A stakeholder insists on high-fidelity prototypes because "users won't take it seriously otherwise." What is the best response grounded in prototyping trade-offs?

### Answers

A. Use high-fidelity for the main flow and low-fidelity for edge cases to balance realism and speed.

B. Use low-fidelity to iterate on structure quickly, then high-fidelity to validate interaction details once the core flow stabilizes.

C. Use high-fidelity primarily for stakeholder alignment, then validate later with users.

D. Use a medium-fidelity clickable wireframe to reduce bias while still supporting task execution.

E. Use two high-fidelity variants in parallel to accelerate learning through comparison.

Correct: B
Explanation: עקרון האיטרציה הנכון הוא להתחיל ברזולוציה נמוכה כדי לחדד את המבנה במהירות ובזול, ורק לאחר שהזרימה המרכזית מתייצבת לעבור לרזולוציה גבוהה כדי לתקף פרטי אינטראקציה. שילובי הרזולוציה האחרים מקדימים השקעה יקרה, ממקדים ביישור בעלי-עניין במקום בלמידה, או מכפילים עלות ללא הצדקה בשלב מוקדם.
Learning Objective: לרצף רזולוציית אב-טיפוס — נמוכה למבנה, גבוהה לפרטי אינטראקציה בהמשך.
Misconception: אמונה שרזולוציה גבוהה מוקדמת חוסכת זמן, בעוד שהיא מייקרת שינויים מבניים.

---

## Question

id: q-lecturer-2026-a-016
type: multiple-choice
difficulty: hard
cognitive: apply
points: 4
concepts:
  - usability

You want fast expert feedback but worry experts will overweight rule violations that don't matter in your domain. Which mitigation is best without losing speed?

### Answers

A. Use a pluralistic walkthrough including a domain practitioner to challenge assumptions.

B. Add a quick user satisfaction rating to prioritize expert findings.

C. Calibrate experts with a domain brief and a shared severity rubric before independent reviews.

D. Combine a brief heuristic pass with a small targeted usability test on the highest-risk domain-critical tasks.

E. Focus the expert review only on top tasks rather than the full UI.

Correct: D
Explanation: כדי למנוע ממומחים לנפח הפרות שאינן חשובות בתחום מבלי לאבד מהירות, משלבים מעבר היוריסטי קצר עם בדיקת שמישות ממוקדת וקטנה על המשימות הקריטיות ביותר לתחום — כך התובנות מעוגנות בהתנהגות אמיתית. יישור מומחים, דירוג שביעות רצון וצמצום היקף הסקירה מסייעים חלקית, אך רק שילוב עם משתמשים אמיתיים ממקד את הביקורת בסיכון האמיתי.
Learning Objective: לעגן ביקורת מומחים בבדיקה ממוקדת עם משתמשים כדי לסנן ממצאים לא-רלוונטיים.
Misconception: הנחה שהערכת מומחים לבדה מספיקה לסינון ממצאים שאינם רלוונטיים לתחום.

---

## Question

id: q-lecturer-2026-a-017
type: scenario
difficulty: medium
cognitive: apply
points: 4
concepts:
  - human-centered-design

Which accessibility improvement best complements voice interaction here?

### Scenario

A ride-hailing app supports both voice and touch for "Request ride," "Cancel ride," "Share location," and "Safety check-in." Findings:
- Users are unsure whether the system executed a spoken command or merely recognized it.
- Accidental activation occurs for sensitive actions (especially cancellation).
- Under stress, users hesitate to use safety features and fear selecting the wrong option.

### Answers

A. Provide adjustable speech rate and voice options for comprehension and comfort.

B. Offer an offline "low-connectivity" mode to reduce failure in constrained contexts.

C. Provide captions/transcripts of recognized speech and system responses for hearing-impaired users.

D. Allow personalized command synonyms and language/locale settings for broader inclusivity.

E. Provide a complete touch alternative with large targets, clear focus states, screen-reader labeling, and explicit feedback.

Correct: C
Explanation: תמלול חזותי של הדיבור שזוהה ושל תגובות המערכת משלים ישירות את הערוץ הקולי, ומאפשר גם למשתמשים כבדי שמיעה לוודא מה זוהה ומה בוצע. שליטה בקצב דיבור, מצב לא-מקוון, מילים נרדפות והגדרות שפה — כולם שיפורי נגישות לגיטימיים, אך אינם משלימים את המודאליות הקולית עבור כבדי שמיעה כמו תמלול. (בטופס המקורי סומנה שאלה זו כמבוטלת בדוח הציונים.)
Learning Objective: לבחור בערוץ טקסטואלי משלים לאישור אינטראקציה קולית עבור כבדי שמיעה.
Misconception: הנחה שממשק קולי משרת נגישות בלי ערוץ חלופי גלוי לאישור פעולות.

---

## Question

id: q-lecturer-2026-a-018
type: scenario
difficulty: medium
cognitive: apply
points: 4
concepts:
  - usability

Which design change is most likely to reduce accidental activation of sensitive actions without blocking legitimate use?

### Scenario

A ride-hailing app supports both voice and touch for "Request ride," "Cancel ride," "Share location," and "Safety check-in." Findings:
- Users are unsure whether the system executed a spoken command or merely recognized it.
- Accidental activation occurs for sensitive actions (especially cancellation).
- Under stress, users hesitate to use safety features and fear selecting the wrong option.

### Answers

A. Require a wake word or explicit intent phrase before executing sensitive commands ("Confirm cancel ride").

B. Add a short "grace period" allowing Undo after cancellation, reducing harm from accidental triggers.

C. Add multimodal feedback (haptic + visual) immediately, so users can stop before completion.

D. Context-appropriate confirmation (e.g., hold-to-confirm, two-step confirmation, or constrained confirmation under motion/noise).

E. Use confidence-threshold logic: if ASR confidence is low, request clarification instead of executing.

Correct: D
Explanation: אישור מותאם-הקשר — כמו לחיצה-ממושכת, אישור דו-שלבי או אישור מוגבל בתנועה ורעש — מצמצם הפעלה בשוגג של פעולות רגישות מבלי לחסום שימוש לגיטימי, משום שהוא מתאים את מחסום האישור לתנאי השימוש. מילת הפעלה, חלון ביטול, משוב מיידי וסף ביטחון הם אמצעים משלימים טובים, אך פחות כלליים ומאוזנים מהתאמת האישור להקשר.
Learning Objective: לבחור מנגנון אישור מותאם-הקשר לאיזון בין מניעת טעות לשימוש שוטף.
Misconception: הנחה שכל חיכוך נוסף בהכרח חוסם שימוש לגיטימי, ולהפך.

---

## Question

id: q-lecturer-2026-a-019
type: scenario
difficulty: medium
cognitive: apply
points: 4
concepts:
  - usability

Which principle most directly addresses uncertainty about whether a command executed?

### Scenario

A ride-hailing app supports both voice and touch for "Request ride," "Cancel ride," "Share location," and "Safety check-in." Findings:
- Users are unsure whether the system executed a spoken command or merely recognized it.
- Accidental activation occurs for sensitive actions (especially cancellation).
- Under stress, users hesitate to use safety features and fear selecting the wrong option.

### Answers

A. Match between system and real world by echoing the user's words in natural language.

B. Recognition rather than recall by keeping action options visible at all times.

C. Error prevention by reducing available actions during motion/noise.

D. Consistency by ensuring voice and touch use identical phrasing and iconography.

E. Visibility of system status through immediate, unambiguous feedback about outcomes and current state.

Correct: E
Explanation: אי-הוודאות אם הפקודה בוצעה נובעת מהיעדר משוב על מצב המערכת — לכן העיקרון הישיר הוא נראוּת מצב המערכת: משוב מיידי וחד-משמעי על התוצאה והמצב הנוכחי. התאמה לעולם האמיתי, זיהוי-מול-היזכרות, מניעת שגיאות ועקביות נוגעים להיבטים אחרים, אך אינם עוסקים ישירות בהצגת סטטוס הביצוע.
Learning Objective: לקשר אי-ודאות לגבי ביצוע פעולה להפרת נראוּת מצב המערכת.
Misconception: בלבול בין נראוּת מצב לבין עקביות או התאמה לעולם האמיתי.

---

## Question

id: q-lecturer-2026-a-020
type: scenario
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - usability

Which measurement approach best captures trust and perceived safety in high-stress interactions?

### Scenario

A ride-hailing app supports both voice and touch for "Request ride," "Cancel ride," "Share location," and "Safety check-in." Findings:
- Users are unsure whether the system executed a spoken command or merely recognized it.
- Accidental activation occurs for sensitive actions (especially cancellation).
- Under stress, users hesitate to use safety features and fear selecting the wrong option.

### Answers

A. Incident reports and support tickets labeled "safety concern" as an organizational signal.

B. Task-anchored self-report (confidence/trust ratings right after safety/cancel tasks) combined with observed hesitation markers.

C. A standardized post-session questionnaire (trust scale) not tied to specific tasks.

D. Longitudinal proxy: repeat usage of safety features over weeks.

E. Behavioral proxies only: time-to-act, abandonment, and error rates in safety flows.

Correct: B
Explanation: אמון ותחושת ביטחון הם סובייקטיביים אך תלויי-משימה, ולכן הדיווח העצמי המעוגן במשימה (דירוגי אמון וביטחון מיד לאחר משימות בטיחות וביטול) בשילוב סימני היסוס נצפים לוכד אותם בצורה המדויקת ביותר. דיווחי תקלות, שאלון כללי שאינו קשור למשימה, שימוש חוזר לאורך זמן או מדדים התנהגותיים בלבד מספקים אותות עקיפים או מנותקים מרגע החוויה.
Learning Objective: לשלב דיווח עצמי מעוגן-משימה עם סימנים התנהגותיים נצפים למדידת אמון.
Misconception: הסתמכות על מדד התנהגותי בלבד או על שאלון כללי המנותק מהמשימה הרגישה.

---

## Question

id: q-lecturer-2026-a-021
type: scenario
difficulty: medium
cognitive: understand
points: 4
concepts:
  - persona

When creating personas responsibly, which step typically consumes the most effort and why?

### Scenario

A hospital relaunches an internal portal for physicians, nurses, and residents. Content is accurate, but staff struggle to find procedures, forms, on-call schedules, and safety protocols. The team plans to use personas, scenarios, and journey maps.

### Answers

A. Data collection + synthesis, because clustering patterns into stable archetypes requires triangulation and validation.

B. Validation sessions with staff to confirm personas are recognizable and actionable.

C. Stakeholder alignment workshops, because cross-department agreement takes time.

D. Writing persona narratives and goals, to avoid stereotypes and ensure precision.

E. Translating personas into requirements artifacts (scenarios, journey maps, KPIs).

Correct: A
Explanation: השלב היקר ביותר בבניית פרסונה אחראית הוא איסוף הנתונים וסינתזה שלהם: קיבוץ דפוסים לארכיטיפים יציבים דורש הצלבת מקורות ותיקוף, ולא ניחוש. אימות, יישור בעלי-עניין, כתיבת נרטיב ותרגום לתוצרים הם שלבים חשובים אך נשענים על בסיס הנתונים שנאסף ועובד — שם מושקע עיקר המאמץ.
Learning Objective: להבין שפרסונה מבוססת-נתונים דורשת עיקר המאמץ באיסוף וסינתזה, לא בכתיבה.
Misconception: תפיסת בניית פרסונה ככתיבת דמות בדיונית ולא כעיבוד נתוני מחקר.

---

## Question

id: q-lecturer-2026-a-022
type: scenario
difficulty: medium
cognitive: apply
points: 4
concepts:
  - usability

Which success criterion most directly validates whether the new portal structure is working?

### Scenario

A hospital relaunches an internal portal for physicians, nurses, and residents. Content is accurate, but staff struggle to find procedures, forms, on-call schedules, and safety protocols. The team plans to use personas, scenarios, and journey maps.

### Answers

A. Faster page-load performance and fewer timeouts.

B. Reliable findability for critical items (task success with acceptable time and low critical error).

C. Higher satisfaction scores in a post-launch "ease of use" survey.

D. Improved search success rate and fewer query refinements.

E. Reduced average clicks to reach high-traffic pages across all roles.

Correct: B
Explanation: הבעיה שהוגדרה היא קושי במציאת פריטים, ולכן מדד ההצלחה הישיר הוא מציאוּת אמינה של פריטים קריטיים — הצלחת משימה בזמן סביר ובמעט שגיאות קריטיות. ביצועי טעינה, שביעות רצון, הצלחת חיפוש ומספר קליקים הם אותות משניים או חלקיים, אך רק מציאוּת המשימה מתקפת ישירות אם המבנה החדש עובד.
Learning Objective: לבחור מדד מציאוּת מבוסס-משימה לתיקוף מבנה ניווט חדש.
Misconception: החלפת מדד מציאוּת המשימה במדדי ביצועים או שביעות רצון עקיפים.

---

## Question

id: q-lecturer-2026-a-023
type: scenario
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - journey-map
  - user-scenario

What is the most accurate difference between a journey map and a user scenario here?

### Scenario

A hospital relaunches an internal portal for physicians, nurses, and residents. Content is accurate, but staff struggle to find procedures, forms, on-call schedules, and safety protocols. The team plans to use personas, scenarios, and journey maps.

### Answers

A. Journey maps align stakeholders end-to-end; scenarios help validate task flows and requirements.

B. A journey map is broader; a scenario is narrower and more testable as a script.

C. A journey map emphasizes emotions across phases; a scenario emphasizes concrete steps in one task.

D. A journey map can include multiple actors/systems; a scenario typically centers one persona and one goal.

E. A journey map spans stages and touchpoints over time; a scenario is a focused narrative of accomplishing a goal in a specific situation.

Correct: E
Explanation: ההבחנה המדויקת ביותר היא שמפת מסע פורשת שלבים ונקודות מגע לאורך זמן, בעוד תרחיש הוא נרטיב ממוקד של השגת יעד יחיד במצב מסוים. שאר הניסוחים לוכדים הבדלים חלקיים (רוחב, רגש, מספר שחקנים, שימוש ביישור), אך רק אחד ממקד את ההבחנה המהותית בין טווח-זמן ונקודות-מגע לבין נרטיב יעד ממוקד.
Learning Objective: להבחין בין מפת מסע (שלבים ונקודות מגע לאורך זמן) לתרחיש (נרטיב יעד ממוקד).
Misconception: צמצום ההבדל לרוחב או לרגש בלבד, במקום למבנה הזמן ונקודות המגע.

---

## Question

id: q-lecturer-2026-a-024
type: scenario
difficulty: medium
cognitive: analyze
points: 4

Given the problem statement, what domain should lead the intervention first?

### Scenario

A hospital relaunches an internal portal for physicians, nurses, and residents. Content is accurate, but staff struggle to find procedures, forms, on-call schedules, and safety protocols. The team plans to use personas, scenarios, and journey maps.

### Answers

A. Content strategy (rewriting titles, reducing duplication) as the primary driver.

B. Search experience design (query support, relevance, filters) as the primary driver.

C. Change management/training (job aids, onboarding) as the primary driver.

D. Information architecture (findability, labeling, navigation structure).

E. Interaction design (streamlining workflows) as the primary driver.

Correct: D
Explanation: התוכן מדויק אך אינו נמצא — כלומר הבעיה היא מבנה, תיוג וניווט, שהם לב ארכיטקטורת המידע. לכן ההתערבות המובילה צריכה להיות ארכיטקטורת מידע (מציאוּת, תיוג ומבנה ניווט). אסטרטגיית תוכן, חיפוש, ניהול שינוי ועיצוב אינטראקציה הם משלימים, אך אינם שורש בעיית המציאוּת שהוגדרה.
Learning Objective: לזהות בעיית מציאוּת של תוכן קיים כבעיית ארכיטקטורת מידע.
Misconception: ייחוס קושי במציאת תוכן קיים לחיפוש או להדרכה במקום למבנה המידע.

---

## Question

id: q-lecturer-2026-a-025
type: scenario
difficulty: hard
cognitive: analyze
points: 4
concepts:
  - recognition-vs-recall

The app previously let experienced users trigger actions using short command phrases and a compact shortcut panel. The redesign replaces this with visible menus and icon groups listing all actions. After the change, critical errors drop, but completion time rises slightly. Which explanation best accounts for the pattern?

### Scenario

A city launches an emergency alerts app: real-time instructions, "I'm safe" check-in, assistance requests, and quick forms. Under pressure, users report hesitation and errors.

### Answers

A. The system shifts from recall-based input to recognition-based input, trading speed for reliability.

B. Increased visibility reduces mistakes, but added UI elements slow scanning and decision time.

C. Learnability improves, but experts lose efficiency because practiced sequences are interrupted.

D. Reduced cognitive load lowers errors, but extra selection/confirmation steps add time.

E. Recognition support increases and errors fall, but interaction overhead can rise relative to expert shortcuts, reducing efficiency.

Correct: A
Explanation: המעבר מקיצורי-פקודה (הנשענים על היזכרות) לתפריטים גלויים (הנשענים על זיהוי) הוא ההסבר המרכזי לדפוס: הזיהוי מפחית שגיאות אך גובה מעט מהירות. שאר הניסוחים מתארים תסמינים של אותו עיקרון (עומס, סריקה, אובדן יעילות מומחים), אך העיקרון היסודי הוא חילופי היזכרות-מול-זיהוי ותמורת האמינות במהירות. (שאלה זו אינה מכוסה בדוח התשובות הממוחשב; התשובה נקבעה על פי החומר.)
Learning Objective: לזהות חילופי היזכרות-מול-זיהוי ואת תמורת המהירות באמינות.
Misconception: ייחוס השינוי לעומס או לסריקה בלבד, ולא לחילופי היזכרות-זיהוי היסודיים.

---

## Question

id: q-lecturer-2026-a-026
type: scenario
difficulty: medium
cognitive: analyze
points: 4
concepts:
  - affordance
  - signifier

In shelters, a redesigned door has a large flat push plate on one side and a small pull handle on the other. People repeatedly pull when they should push. What best explains the failure?

### Scenario

A city launches an emergency alerts app: real-time instructions, "I'm safe" check-in, assistance requests, and quick forms. Under pressure, users report hesitation and errors.

### Answers

A. Insufficient feedback: the door provides no immediate response indicating correct action.

B. Missing constraints: the design does not make the wrong action harder than the right one.

C. Poor mapping: the relationship between action and response is unclear until after trying.

D. Weak signifiers: users do not notice the push plate as the interaction cue.

E. A mismatch between perceived affordance and required action, amplified by stress and time pressure.

Correct: E
Explanation: לוחית שטוחה גדולה "מזמינה" דחיפה, אך הידית הקטנה בצד השני יוצרת אפורדנס נתפס סותר — ותחת לחץ וזמן קצר המשתמשים פועלים לפי התפיסה השגויה ומושכים. זהו אי-התאמה בין האפורדנס הנתפס לפעולה הנדרשת, המתעצם בלחץ. משוב, אילוצים, מיפוי וסימון חלש הם היבטים סמוכים, אך שורש הכשל הוא פער האפורדנס. (שאלה זו אינה מכוסה בדוח התשובות הממוחשב; התשובה נקבעה על פי החומר.)
Learning Objective: לזהות כשל שימוש כפער בין אפורדנס נתפס לפעולה הנדרשת, המתעצם בלחץ.
Misconception: ייחוס כשל דלת דחיפה/משיכה למשוב או למיפוי במקום לאפורדנס הנתפס.

---

## Question

id: q-lecturer-2026-a-027
type: scenario
difficulty: hard
cognitive: evaluate
points: 4
concepts:
  - usability

The team wants to measure effectiveness of completing critical tasks ("Check-in safe," "Request help," "Find instructions"). Which metric set best captures effectiveness?

### Scenario

A city launches an emergency alerts app: real-time instructions, "I'm safe" check-in, assistance requests, and quick forms. Under pressure, users report hesitation and errors.

### Answers

A. Step drop-off rate + retries as an operational proxy.

B. Task completion rate + error rate (or critical error count), optionally with correctness checks.

C. Task completion rate + time-on-task to capture both success and speed.

D. NASA-TLX workload + post-task confidence ratings to capture perceived effectiveness.

E. First-click accuracy + time to first meaningful action as a proxy for correct intent.

Correct: B
Explanation: אפקטיביות (בניגוד ליעילות) עוסקת בשאלה האם המשימה הושלמה נכון — לכן מערך המדדים הישיר הוא שיעור השלמת המשימה בשילוב שיעור שגיאות (או ספירת שגיאות קריטיות), ובמידת הצורך בדיקות נכונות. הוספת זמן משקפת יעילות, עומס נתפס וביטחון הם סובייקטיביים, ומדדי דרופ-אוף או קליק-ראשון הם אמצעי עקיף. (שאלה זו אינה מכוסה בדוח התשובות הממוחשב; התשובה נקבעה על פי החומר.)
Learning Objective: לבחור מדדי אפקטיביות (השלמה ושגיאות) ולהפריד אותם ממדדי יעילות ותפיסה.
Misconception: ערבוב אפקטיביות (השלמה נכונה) עם יעילות (מהירות) בבחירת מדדים.
