---
id: nielsens-10-heuristics-quiz
lesson: nielsens-10-heuristics
title: "Quiz: Nielsen's 10 Usability Heuristics"
---

## Question

id: nielsens-10-heuristics/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - nielsens-heuristics

Nielsen's 10 usability heuristics were developed to support which evaluation method?

### Answers

A. Empirical usability testing with real users performing tasks in a lab.

B. Heuristic Evaluation — an analytical, expert-based inspection of an interface against known usability principles, without real users.

C. A/B testing of two competing visual designs on live traffic.

D. Card sorting to design an information architecture.

Correct: B
Explanation: עשר ההיוריסטיקות של נילסן הן הכלי המרכזי של ה-Heuristic Evaluation — שיטת הערכה אנליטית שבה מומחה בודק ממשק מול רשימת עקרונות מוכרים, ללא צורך במשתמשים אמיתיים כלל. תיאור A מתאר בדיקת שמישות אמפירית — השיטה המנוגדת, המבוססת דווקא על משתמשים אמיתיים. תיאור C (A/B testing) הוא שיטת ניסוי כמותי שאינו קשור להיוריסטיקות. תיאור D (card sorting) הוא כלי לבניית ארכיטקטורת מידע, לא להערכת שמישות.
Learning Objective: לפרט את מטרת עשר ההיוריסטיקות של נילסן ולשייך אותן לשיטת ההערכה האנליטית.
Misconception: סטודנטים לעיתים חושבים שההיוריסטיקות הן כלי לבדיקה עם משתמשים אמיתיים. בפועל הן בדיוק ההפך — כלי שמייתר את הצורך במשתמשים בשלב הראשוני של ההערכה.

---

## Question

id: nielsens-10-heuristics/q2
type: scenario
difficulty: medium
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - nielsens-heuristics

Which heuristic is most directly violated?

### Scenario

A ride-hailing app lets users request a ride. After tapping "Confirm Ride," the screen freezes for several seconds with no spinner, no message, and no visual change of any kind — until it suddenly jumps to a confirmation screen. Several users tap the button multiple times during the freeze, occasionally triggering duplicate ride requests.

### Answers

A. Visibility of System Status — the system fails to inform the user that the request is being processed.

B. Aesthetic and Minimalist Design — the confirmation screen contains too much information.

C. Help and Documentation — the app lacks a help article explaining ride confirmation.

D. Consistency and Standards — the confirm button looks different from other buttons in the app.

Correct: A
Explanation: הבעיה המרכזית היא שהמערכת לא נותנת שום משוב ויזואלי (ספינר, טקסט "מעבד בקשה") בזמן שהיא מעבדת את הבקשה — זו הפרה קלאסית של Visibility of System Status, וההשלכה הישירה שלה היא בדיוק מה שתואר: משתמשים לוחצים שוב כי הם לא יודעים אם הלחיצה הראשונה נקלטה, מה שגורם לבקשות כפולות. תיאור B (Aesthetic and Minimalist) לא רלוונטי — התרחיש לא מתאר עומס מידע במסך האישור אלא היעדר משוב לפני כן. תיאור C (Help and Documentation) לא רלוונטי — הבעיה אינה חוסר תיעוד אלא חוסר משוב בזמן אמת. תיאור D (Consistency) אינו מוזכר כלל בתרחיש — אין שום מידע על עיצוב הכפתור עצמו.
Learning Objective: לזהות הפרת Visibility of System Status מתוך תיאור תרחיש קונקרטי ולקשר בין ההפרה לתוצאה שלה (בקשות כפולות).
Misconception: סטודנטים לעיתים מבלבלים בין "מסך שקופא" (בעיית ביצועים) לבין הפרת היוריסטיקה. ההיוריסטיקה לא עוסקת במהירות המערכת אלא בכך שלא ניתן שום אינדיקציה שמשהו בכלל קורה.

---

## Question

id: nielsens-10-heuristics/q3
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - nielsens-heuristics

Which heuristic is most directly violated?

### Scenario

A banking app places a "Delete Account Permanently" button directly next to the "Save Changes" button, using the same size, color, and font. Tapping "Delete Account Permanently" deletes the account immediately, with no confirmation dialog of any kind.

### Answers

A. Error Prevention — the interface fails to prevent a destructive, hard-to-reverse action from being triggered accidentally.

B. Recognition Rather Than Recall — the user must remember where the delete button is located.

C. Flexibility and Efficiency of Use — expert users have no shortcut for deleting an account quickly.

D. Match Between System and the Real World — the button's label uses unfamiliar terminology.

Correct: A
Explanation: המקרה מתאר בדיוק את ההפרה הקלאסית של Error Prevention: פעולה הרסנית ובלתי הפיכה (מחיקת חשבון) ממוקמת ומעוצבת באופן זהה לפעולה שגרתית ובטוחה (שמירת שינויים), ואין שום שלב אישור שמונע לחיצה בטעות. תיאור B (Recognition vs Recall) לא רלוונטי — התרחיש לא עוסק בזיכרון המשתמש היכן נמצא הכפתור, אלא בכך שהוא קל מדי ללחוץ עליו בטעות. תיאור C (Flexibility and Efficiency) הפוך מהכיוון הנכון — כאן החסר הוא דווקא *יותר* חיכוך (אישור), לא פחות. תיאור D (Match with Real World) לא נתמך בתרחיש — אין אינדיקציה שהטקסט על הכפתור עצמו אינו מובן.
Learning Objective: ליישם את מסגרת עשר ההיוריסטיקות כדי לזהות הפרת Error Prevention מתוך תיאור ממשק, ולהבחין אותה מהיוריסטיקות דומות.
Misconception: סטודנטים לעיתים מבלבלים בין Error Prevention (מניעת השגיאה מראש) לבין Help Recover from Errors (טיפול אחרי שהשגיאה כבר קרתה). כאן אין בכלל הודעת שגיאה לאחר מעשה — הבעיה היא שלא נעשה שום ניסיון למנוע את הטעות מראש.

---

## Question

id: nielsens-10-heuristics/q4
type: multiple-choice
difficulty: hard
cognitive: evaluate
estimatedTime: 75
points: 5
concepts:
  - nielsens-heuristics

A UX team is debating whether to add a confirmation dialog every time a power user archives an email in a productivity app that power users use dozens of times per day. Which statement best reflects how Nielsen's heuristics should be applied here?

### Answers

A. The team must always add the confirmation dialog, because Error Prevention is a mandatory rule that overrides all other considerations.

B. The team must never add a confirmation dialog, because Flexibility and Efficiency of Use always takes priority for any repeated action.

C. The heuristics are guiding principles, not rigid rules — here Error Prevention and Flexibility and Efficiency of Use are in tension, and the team should judge based on how reversible and how frequent the action is (e.g., skip the dialog but offer a quick Undo instead).

D. The heuristics do not apply to this decision because archiving is not a destructive action.

Correct: C
Explanation: זהו בדיוק המתח הקלאסי בין Error Prevention (שמעודד עוד שלב אישור) לבין Flexibility and Efficiency of Use (שמעודד להסיר חיכוך למשתמש מנוסה החוזר על אותה פעולה עשרות פעמים ביום). מכיוון שארכוב הוא פעולה הפיכה בקלות (בניגוד למחיקה לצמיתות), הפתרון המאוזן הוא לוותר על חלון האישור המעכב ולהציע במקומו כפתור "בטל" (Undo) מהיר אחרי הפעולה — זה בדיוק מה ש-User Control and Freedom ממליץ. תיאורים A ו-B שגויים כי שניהם מציגים היוריסטיקה בודדת כ"חוק" מוחלט שגובר תמיד על האחרות — בניגוד מפורש לרעיון שההיוריסטיקות הן עקרונות מנחים שדורשים איזון לפי הקשר. תיאור D שגוי כי ההיוריסטיקות רלוונטיות לכל פעולה בממשק, גם פעולות הפיכות.
Learning Objective: לנתח מקרה שבו שתי היוריסטיקות מתנגשות ולהסביר כיצד מעצב מאזן ביניהן לפי הקשר (הפיכות הפעולה ותדירותה).
Misconception: סטודנטים רבים ניגשים להיוריסטיקות כאל רשימת "כללים" שמוחלים אחד אחד בנפרד, במקום להבין שהן לעיתים סותרות זו את זו וההערכה ההיוריסטית האמיתית דורשת שיקול דעת מקצועי, לא ציון וי/איקס מכני.
