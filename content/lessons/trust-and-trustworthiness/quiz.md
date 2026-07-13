---
id: trust-and-trustworthiness-quiz
lesson: trust-and-trustworthiness
---

# קוויז — מהימן מול ראוי-לאמון

## Question

id: q-trust-and-trustworthiness-001
type: comparison
difficulty: medium
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - Trusted
  - Trustworthy

מהו ההבדל המהותי בין רכיב **Trusted** לרכיב **Trustworthy** כפי שהמרצה מגדיר?

### Answers

A. Trusted הוא רכיב חיצוני לארגון; Trustworthy הוא רכיב פנימי.

B. אין ביניהם הבדל מעשי — שני המונחים מתארים רכיב שהוכח כבטוח.

C. Trusted הוא רכיב מאובטח שהוסמך; Trustworthy הוא רכיב שעדיין לא נבדק.

D. Trusted מתייחס לחומרה בלבד; Trustworthy מתייחס לתוכנה בלבד.

E. Trusted הוא רכיב שאנחנו מוכרחים לסמוך עליו מתוקף הארכיטקטורה; Trustworthy הוא רכיב שיש עליו ראיות שהוא מאובטח.

Correct: E

Explanation: E נכונה מפני ש-Trusted הוא קביעה על **תלות** (המערכת מוכרחה להישען על הרכיב כדי לאכוף את מדיניותה), בעוד Trustworthy הוא קביעה על **ראיות** (בדיקות, הסמכה, attestation). C הופכת את המונחים — דווקא Trustworthy הוא המאובטח-והמוסמך. D שגויה: שני המונחים חלים על חומרה ותוכנה כאחד (הקרנל trusted, ה-HSM trustworthy). A ממציאה חלוקה פנים/חוץ שאינה קיימת בהגדרה. B היא בדיוק הטעות שהמרצה מזהיר מפניה — "confusing the two is a common and dangerous mistake".

Learning Objective: להבחין בין תלות מבנית (trusted) לאמון מבוסס-ראיות (trustworthy).

Misconception: סטודנטים מניחים ש"trusted" פירושו "בטוח/מאובטח", בעוד הוא מתאר רק שהמערכת תלויה ברכיב.

---

## Question

id: q-trust-and-trustworthiness-002
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - Trusted
  - Trustworthy
  - Vulnerability

כיצד יש לסווג את שירות הזיהוי הזה במונחי השיעור?

### Scenario

בבנק, שירות הזיהוי המרכזי (login service) מאמת כל עובד לפני גישה למערכות הליבה. השירות פותח בבית לפני שנים, מעולם לא עבר אודיט חיצוני, ואין עליו בדיקות אבטחה מתועדות — אך כל המערכת נשענת עליו לחלוטין.

### Answers

A. Trusted אך לא Trustworthy — ולכן Vulnerability סמויה של המערכת כולה.

B. לא Trusted ולא Trustworthy — רכיב ישן אינו נחשב חלק מבסיס האמון.

C. גם Trusted וגם Trustworthy — עצם היותו בשימוש שנים מוכיח שהוא בטוח.

D. Trustworthy אך לא Trusted — הוא מאובטח, אך המערכת אינה תלויה בו.

E. Trustworthy בלבד — היעדר תקלות ידועות שקול לראיה שהוא מאובטח.

Correct: A

Explanation: A נכונה: המערכת **מוכרחה** לסמוך על השירות (trusted), אך אין עליו שום ראיה שהוא מאובטח — לא אודיט ולא בדיקות — ולכן הוא אינו trustworthy. הצירוף הזה הוא בדיוק ה-Vulnerability הסמויה: הסתמכות מלאה בלי כיסוי. D הופכת את המצב — המערכת דווקא תלויה בו לחלוטין. C טועה: ותק בשימוש אינו ראיה לאבטחה. B שגויה: רכיב שהמערכת נשענת עליו הוא trusted מעצם הגדרתו, ותק אינו רלוונטי. E טועה: "אין תקלות ידועות" אינו ראיה חיובית — היעדר בדיקות הוא היעדר trustworthiness, לא הוכחתו.

Learning Objective: לזהות רכיב trusted-אבל-לא-trustworthy כנקודת סיכון סמויה.

Misconception: "אם רכיב עובד שנים בלי תקלה, הוא מוכח כבטוח" — ותק והיעדר תקלות ידועות אינם ראיה לאבטחה.

---

## Question

id: q-trust-and-trustworthiness-003
type: multiple-choice
difficulty: medium
cognitive: apply
estimatedTime: 50
points: 5
concepts:
  - Trustworthy

מדוע HSM שעבר הסמכת **FIPS 140-3**, או microkernel מאומת (seL4), מובאים כדוגמאות לרכיבים **Trustworthy**?

### Answers

A. מפני שהמערכת מוכרחה להישען עליהם כדי לפעול.

B. מפני שיש עליהם ראיות חיצוניות — הסמכה או אימות פורמלי — שמבססות את האמון בהם.

C. מפני שהם יקרים, ומחיר גבוה מעיד על אבטחה גבוהה.

D. מפני שהם רכיבי חומרה, וחומרה תמיד ראויה לאמון יותר מתוכנה.

E. מפני שהם חדשים, וטכנולוגיה חדשה חסינה מפני חולשות.

Correct: B

Explanation: B נכונה: trustworthiness נמדדת ב**ראיות** — הסמכת FIPS 140-3, Common Criteria או אימות פורמלי הן בדיוק הראיה שמגיע לרכיב אמון. D טועה: החומרה אינה ראויה לאמון בזכות היותה חומרה, אלא בזכות ההסמכה שעברה; יש חומרה לא-מאובטחת רבה. A מתארת **trusted** (תלות), לא trustworthy. C ו-E מציעות מדדים שגויים לחלוטין — מחיר וחדשנות אינם ראיה לאבטחה, ולעיתים ההפך (טכנולוגיה חדשה טרם נבחנה).

Learning Objective: לזהות מהי ראיה תקפה ל-trustworthiness (הסמכה/אימות) לעומת אינדיקציות מטעות.

Misconception: סטודנטים מזהים trustworthiness עם מחיר, חדשנות או "חומרה", במקום עם ראיות מאימות והסמכה.

---

## Question

id: q-trust-and-trustworthiness-004
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - Trusted
  - Trustworthy

מהו ה-**Key Insight** שהמרצה מסמן במפורש בחלק זה, ומהו היעד הנגזר ממנו?

### Answers

A. רכיב trusted הוא תמיד trustworthy; היעד הוא להסיר בדיקות אבטחה מיותרות.

B. ה-TCB צריך לגדול ככל האפשר כדי לפזר את הסיכון בין רכיבים רבים.

C. רכיב יכול להיות trusted מבלי להיות trustworthy; היעד הוא להפוך כל רכיב trusted גם ל-trustworthy, או לצמצם את ה-TCB.

D. כל רכיב trustworthy הוא בהכרח trusted; היעד הוא להרחיב את מספר הרכיבים ה-trusted.

E. trustworthiness אינה ניתנת להשגה; היעד הוא לוותר על אמון ולהצפין הכל.

Correct: C

Explanation: C מנסחת במדויק את ה-Key Insight (שקף 25): "C component can be trusted without being trustworthy", ואת שני היעדים — להפוך כל trusted ל-trustworthy או לצמצם את ה-Trusted Computing Base (TCB). D הופכת את הכיוון ומציעה יעד הפוך (הרחבת ה-trusted היא הגדלת הסיכון). A מכחישה את ה-Key Insight עצמו. E מגזימה — trustworthiness כן ניתנת להשגה דרך ראיות, והצפנה אינה מחליפה אמון ברכיבים. B שגויה: צמצום ה-TCB הוא היעד, כי TCB גדול פירושו יותר רכיבים שכשל באחד מהם מפיל את הכל.

Learning Objective: לנסח את ה-Key Insight ואת שני יעדי התכנון הנגזרים ממנו (הפיכה ל-trustworthy או צמצום TCB).

Misconception: סטודנטים חושבים ש"יותר רכיבים trusted" מפזר סיכון, בעוד TCB גדול דווקא מגדיל את שטח הכשל.
