---
id: firewall-quiz
lesson: firewall
---

# קוויז — חומת אש: סינון מנות וטבלאות כללים

## Question

id: q-firewall-001
type: multiple-choice
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - Firewall

חומת אש בשכבה 3 (Packet Filtering) מקבלת החלטת forward או drop על סמך מידע במנה.
על איזה מידע היא **אינה** מסתמכת?

### Answers

A. כתובת ה-IP של המקור
B. כתובת ה-IP של היעד
C. תוכן המנה (payload) עצמו
D. מספר הפורט
E. הפרוטוקול (TCP/UDP)

Correct: C

Explanation: חומת אש בשכבה 3 בודקת אך ורק את כותרת המנה — כתובת מקור (A), כתובת יעד
(B), פורט (D) ופרוטוקול (E) — ולכן כל אלה שגויים כתשובה לשאלה "על מה היא לא
מסתמכת". התוכן עצמו (C) נשאר מחוץ לבדיקה: זו בדיוק המגבלה שהמרצה מדגיש, ובחינת תוכן
היא תפקידו של WAF בשכבה 7. לכן C הנכונה.

Difficulty: easy

Concepts: Firewall

Bloom: understand

Learning Objective: לזהות מה חומת אש בשכבה 3 בודקת ומה לא.

Misconception: סטודנטים חושבים שחומת אש "סורקת" את תוכן התעבורה ומזהה נוזקות בתוכה.

---

## Question

id: q-firewall-002
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - Firewall

לפי טבלת ה-ACL בתרחיש, מה יקרה למנת TCP שמגיעה מכתובת 8.8.8.8 אל פורט 3389 של שרת
פנימי?

### Scenario

חברת הייטק הגדירה בחומת האש ההיקפית את טבלת הכללים הבאה (הכללים נבדקים מלמעלה
למטה, והשורה הראשונה שמתאימה קובעת):

| Permission | IP Address | Protocol | Destination | Port |
|---|---|---|---|---|
| ALLOW | ANY | TCP | ANY | 80 |
| ALLOW | ANY | TCP | ANY | 25 |
| ALLOW | ANY | TCP | ANY | 110 |
| DENY | ANY | UDP | ANY | 23 |
| DENY | ANY | TCP | ANY | 3389 |

### Answers

A. המנה תותר, כי היא מגיעה מכתובת של Google שהיא מקור מהימן
B. המנה תיחסם, כי היא מתאימה לשורת ה-DENY על פורט 3389
C. המנה תותר, כי אין שורה שמתירה במפורש את פורט 3389
D. המנה תיחסם, כי פרוטוקול TCP חסום בטבלה כולה
E. המנה תותר, כי שורת ה-ALLOW הראשונה על פורט 80 תופסת אותה

Correct: B

Explanation: המנה עוברת על השורות עד למציאת התאמה. שלוש שורות ה-ALLOW הראשונות הן
לפורטים 80, 25 ו-110 — המנה לפורט 3389 אינה מתאימה לאף אחת מהן. שורת ה-DENY על UDP
23 אינה מתאימה (המנה היא TCP). השורה החמישית — DENY · ANY · TCP · ANY · 3389 —
מתאימה בדיוק, ולכן המנה נחסמת: B. A שגויה כי חומת אש בשכבה 3 אינה מכירה "מוניטין"
של מקור, ומקור ANY בשורה חוסם כל כתובת כולל 8.8.8.8. C שגויה כי הטבלה חוסמת 3389
במפורש, ולא מסתמכת על ברירת מחדל. D שגויה כי TCP אינו חסום גורף — פורטים 80/25/110
מותרים ב-TCP. E שגויה כי המנה כלל אינה אל פורט 80, כך ששורה זו לא מתאימה לה.

Difficulty: medium

Concepts: Firewall

Bloom: apply

Learning Objective: לקרוא טבלת ACL ולהחליט אם מנה נתונה נחסמת, לפי התאמת שורה ראשונה.

Misconception: סטודנטים מניחים שמקור "מהימן" (כמו Google) גובר על כלל חסימת פורט, או שהיעדר כלל ALLOW פירושו חסימה כשקיים DENY מפורש.

---

## Question

id: q-firewall-003
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Firewall

בבנק הגדירו את טבלת ה-ACL הבאה. שלוש מנות TCP אל פורט 80 מגיעות אל חומת האש, מן
הכתובות 162.213.214.140, 54.21.66.112 ו-40.55.130.66. מהי התוצאה הנכונה?

### Scenario

| Permission | IP Address | Protocol | Destination | Port |
|---|---|---|---|---|
| ALLOW | 162.213.214.140 | TCP | ANY | 80 |
| ALLOW | 54.21.66.112 | TCP | ANY | 80 |
| DENY | 40.55.130.66 | TCP | ANY | 80 |

### Answers

A. שלוש המנות מותרות — כולן פונות לפורט 80 המותר
B. שלוש המנות נחסמות — אין שורת ALLOW כללית שתופסת אותן
C. שתי הראשונות מותרות, ו-40.55.130.66 נחסמת
D. רק 40.55.130.66 מותרת, כי היא היחידה עם כלל ייעודי אחרון
E. שלוש המנות מותרות, אך 40.55.130.66 תירשם ביומן בלבד

Correct: C

Explanation: כל שורה מזהה כתובת מקור ספציפית. 162.213.214.140 מתאימה לשורה הראשונה
(ALLOW) ו-54.21.66.112 לשורה השנייה (ALLOW) — שתיהן מותרות. 40.55.130.66 מתאימה
לשורה השלישית (DENY) ונחסמת, למרות שהיא פונה לאותו פורט 80 כמו האחרות: הכתובת היא
שקבעה, לא הפורט. לכן C. A שגויה כי פורט זהה אינו מבטיח מעבר כשכתובת המקור חסומה
במפורש. B שגויה כי כל אחת מהמנות כן מתאימה לשורה ספציפית — אין צורך בכלל כללי. D
הופכת את משמעות ה-DENY. E ממציאה מנגנון "רישום בלבד" שאינו קיים בטבלה — DENY חוסם,
לא רק מתעד.

Difficulty: hard

Concepts: Firewall

Bloom: analyze

Learning Objective: להבחין שחומת אש בשכבה 3 מסננת לפי כתובת מקור גם כשהפורט זהה.

Misconception: סטודנטים מניחים שאם הפורט מותר, כל המנות אליו עוברות — ומתעלמים מכך שכתובת מקור בשורת DENY חוסמת.

---

## Question

id: q-firewall-004
type: comparison
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Firewall

מה מאפיין מדיניות **Implicit Deny** (allow list) בחומת אש?

### Answers

A. כל תעבורה מותרת, אלא אם קיים כלל שחוסם אותה במפורש
B. כל תעבורה נחסמת, אלא אם קיים כלל שמתיר אותה במפורש
C. התעבורה מותרת או נחסמת באקראי כדי להקשות על תוקפים
D. רק תעבורה מוצפנת מותרת; שאר התעבורה נחסמת
E. התעבורה נחסמת רק אם חומת האש מזהה בתוכה נוזקה

Correct: B

Explanation: Implicit Deny פירושו "deny by default": מה שלא הותר במפורש — נחסם.
הרשימה מכילה רק אישורים (ALLOW), וכל השאר נופל לחסימה — זו רשימת ההיתר
(whitelist / allow list), וזו התשובה B. A מתאר את ההפך המדויק, Implicit Allow
(block list). C ממציא התנהגות אקראית שאינה קיימת — חומת אש דטרמיניסטית. D מבלבל בין
מדיניות ברירת מחדל לבין דרישת הצפנה, שאינה חלק מסינון בשכבה 3. E מתאר בחינת תוכן
(שכבה 7), ולא מדיניות ברירת מחדל של Packet Filtering.

Difficulty: medium

Concepts: Firewall

Bloom: understand

Learning Objective: להבחין בין Implicit Deny (allow list) ל-Implicit Allow (block list).

Misconception: סטודנטים מחליפים בין allow list ל-block list, או מזהים "deny by default" עם חסימת כל התעבורה תמיד.

---

## Question

id: q-firewall-005
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 70
points: 5
concepts:
  - Firewall
  - Defense in Depth

בבית חולים הותקנה חומת אש רשתית (Network-based) בפרימטר. צוות הסייבר מבקש להוסיף
הגנה גם ברמת השרתים הפנימיים המפעילים את מערכות המטופלים. מהי הפעולה המתאימה ביותר?

### Scenario

התקציב מיועד לחיזוק ההגנה הן בנקודת הכניסה בפרימטר והן ברמת השרתים עצמם, מתוך הבנה
שתוקף שחדר מעבר לפרימטר עלול לנוע בין השרתים.

### Answers

A. להתקין תוכנת חומת אש מבוססת-מארח (Host-based) על השרתים, בנוסף לחומת האש הרשתית
B. להחליף את חומת האש הרשתית בחומת אש ענן (Cloud) בלבד
C. להסיר את חומת האש הרשתית ולהסתמך על חומת אש מבוססת-מארח בכל שרת
D. להגדיר בחומת האש הרשתית מדיניות Implicit Allow כדי לא לחסום את השרתים
E. להתקין WAF בלבד, שיחליף את הצורך בחומת אש מבוססת-מארח

Correct: A

Explanation: הדרישה היא הגנה בשתי רמות — פרימטר ושרתים — וזה בדיוק Defense in Depth:
חומת אש רשתית בגבול **בנוסף** לחומות אש מבוססות-מארח על השרתים, כך שגם אם הפרימטר
נפרץ, השרת עדיין מוגן. לכן A. B מוותר על שכבת המארח לגמרי ומעביר את ההגנה לענן בלי
לענות על הדרישה ברמת השרת. C מסיר את שכבת הפרימטר — במקום להוסיף שכבה, הוא מחליף
אחת באחרת ומחליש. D פותח את חומת האש (Implicit Allow) — היפוך מסוכן שמבטל את ההגנה.
E מחליף רכיב בשכבה 3 ב-WAF (שכבה 7) שנועד למטרה אחרת, ומוותר על הגנת המארח שהתבקשה.

Difficulty: medium

Concepts: Firewall, Defense in Depth

Bloom: apply

Learning Objective: ליישם Host-based ו-Network-based firewall כשכבות משלימות ב-Defense in Depth.

Misconception: סטודנטים חושבים שיש לבחור בין חומת אש רשתית למבוססת-מארח, במקום לשלב אותן.
