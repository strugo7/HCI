---
id: dos-ddos-quiz
lesson: dos-ddos
---

# קוויז — מתקפות מניעת שירות: DoS ו-DDoS

## Question

id: q-dos-ddos-001
type: multiple-choice
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - DDoS

מהו ההבדל המהותי בין DoS ל-DDoS?

### Answers

A. DoS פוגע בזמינות, ואילו DDoS פוגע בסודיות
B. DDoS מנצל חולשה בשרת, ואילו DoS אינו מנצל חולשה
C. ב-DDoS המתקפה מגיעה בו-זמנית ממספר רב של מקורות מבוזרים, ואילו DoS מגיע ממקור יחיד
D. DoS מבוצע רק על שרתי DNS, ואילו DDoS על כל שרת
E. DDoS מצפין את נתוני הקורבן, ואילו DoS רק מאט אותם

Correct: C

Explanation: המילה Distributed היא כל ההבדל: ב-DDoS התעבורה ההתקפית מגיעה בו-זמנית
מעשרות אלפי מקורות מבוזרים (botnet), בעוד ש-DoS מגיע ממקור יחיד. לכן C. A שגויה כי
שתי המתקפות פוגעות ב-Availability בלבד, לא בסודיות. B הופכת את אחת הנקודות המרכזיות
של הנושא — אף אחת מהן אינה מנצלת חולשה. D ממציאה הגבלה על סוג היעד שאינה קיימת. E
מתאר כופרה (Ransomware), לא מניעת שירות.

Difficulty: easy

Concepts: DDoS

Bloom: understand

Learning Objective: להסביר את ההבדל בין DoS ל-DDoS ולזהות שהביזור הוא לב העניין.

Misconception: סטודנטים חושבים שההבדל הוא רק "יותר תעבורה" או מבלבלים בין DDoS לכופרה.

---

## Question

id: q-dos-ddos-002
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - DDoS
  - Botnet

ארגון מזהה שהוא מותקף וחוסם בחומת האש את כתובת ה-IP שממנה מגיעה תעבורה זדונית.
דקה לאחר מכן המתקפה נמשכת ללא הפרעה. מה ההסבר הסביר ביותר?

### Scenario

מנתח האבטחה רואה בלוגים תעבורה זדונית שמגיעה מאלפי כתובות IP שונות, פזורות על פני
מדינות רבות, וכל אחת מהן שולחת נפח קטן יחסית.

### Answers

A. חומת האש תקולה ואינה מיישמת את כלל החסימה
B. זו מתקפת DDoS מבוזרת — חסימת כתובת אחת מותירה את עשרות אלפי המקורות האחרים פעילים
C. התוקף שינה את כתובת ה-IP שלו לאחר החסימה, וכעת יש לחסום את החדשה
D. הכתובות המבוזרות מוכיחות שמדובר בהתקפה פנימית מתוך הרשת
E. חומת האש בשכבה 3 אינה יכולה לחסום כתובות IP כלל

Correct: B

Explanation: הסימן המובהק — אלפי כתובות מבוזרות שכל אחת שולחת מעט — הוא DDoS מבוזר
(botnet). חסימת כתובת יחידה מטפלת באחד מתוך עשרות אלפי מקורות, ולכן המתקפה נמשכת: B.
A שגויה כי חומת האש כן פעלה — פשוט חסמה מקור אחד מרבים. C מתאר החלפת מקור יחיד, אך
כאן המקורות מבוזרים מלכתחילה, לא מקור אחד שמתחלף. D שגויה — כתובות מרחבי העולם מצביעות
על botnet חיצוני, לא על מקור פנימי. E שגויה עובדתית: חומת אש בשכבה 3 חוסמת לפי כתובת
IP — זו בדיוק פעולתה, היא פשוט חסרת אונים מול ביזור.

Difficulty: medium

Concepts: DDoS, Botnet

Bloom: apply

Learning Objective: לנמק מדוע הביזור מנטרל את ההגנה הפשוטה של חסימת כתובת IP.

Misconception: סטודנטים מניחים שאם חסמת מקור והמתקפה נמשכת — החסימה נכשלה טכנית, במקום שהמתקפה מבוזרת.

---

## Question

id: q-dos-ddos-003
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Botnet
  - Command and Control

מהו התפקיד של ערוץ ה-Command and Control (C&C) במתקפת DDoS מבוססת botnet?

### Answers

A. הוא מצפין את התעבורה כדי להסתירה מחומת האש
B. הוא הערוץ שדרכו התוקף מתאם ומורה לכל המכשירים הנגועים להציף את היעד בו-זמנית
C. הוא השרת שסופג את התעבורה במקום היעד האמיתי
D. הוא מנגנון ההגנה של הקורבן שמזהה את המתקפה
E. הוא מגביר את התשובות של שרתי DNS פי עשרות

Correct: B

Explanation: ה-Botnet נשלט דרך ערוץ C&C — אותו מנגנון "phone home" שנלמד ביחידת
הנוזקות. דרכו התוקף מוציא פקודה אחת, וכל המכשירים הנגועים מתחילים להציף את היעד יחד:
B. A מתאר הצפנה, שאינה תפקיד ה-C&C. C מתאר scrubbing center — אמצעי הגנה, לא רכיב
התקיפה. D הופך את התפקיד: C&C שייך לתוקף, לא לקורבן. E מתאר amplification, מנגנון
נפרד לחלוטין שאינו קשור לערוץ השליטה.

Difficulty: medium

Concepts: Botnet, Command and Control

Bloom: understand

Learning Objective: לתאר את ה-Botnet כמנגנון אספקה ואת הקשר שלו ל-Command and Control.

Misconception: סטודנטים מבלבלים בין ערוץ השליטה (C&C) לבין מנגנון ההגברה (amplification) או אמצעי ההגנה.

---

## Question

id: q-dos-ddos-004
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - DDoS

צוות סייבר מנתח שלושה אירועים ומנסה לשייך כל אחד למשפחת התקיפה הנכונה. מהו הזיווג
הנכון?

### Scenario

- אירוע א': השרת מקבל אלפי חבילות SYN עם כתובות מקור מזויפות, טבלת החיבורים מתמלאת
  בחיבורים חצי-פתוחים, אך נפח התעבורה הכולל נמוך.
- אירוע ב': קו התקשורת של הארגון רווי ב-400 Gbps של תעבורת UDP חסרת משמעות.
- אירוע ג': השרת מקבל בקשות HTTP תקינות לחלוטין אל דף החיפוש, בקצב גבוה, שכל אחת
  מפעילה שאילתת מסד נתונים כבדה.

### Answers

A. א' volumetric · ב' protocol · ג' application-layer
B. א' protocol · ב' volumetric · ג' application-layer
C. א' application-layer · ב' protocol · ג' volumetric
D. א' protocol · ב' application-layer · ג' volumetric
E. שלושתם volumetric, כי כולם מתקפות DDoS

Correct: B

Explanation: אירוע א' ממלא את טבלת החיבורים דרך מנגנון לחיצת היד של TCP בנפח נמוך —
זו מתקפת protocol (SYN flood). אירוע ב' סותם את רוחב הפס בנפח גולמי — volumetric.
אירוע ג' שולח בקשות L7 תקינות שמכלות את משאבי היישום — application-layer. לכן B. A ו-C
מחליפות בין המשפחות. D ממקמת שגוי את ב' ו-ג'. E שגויה כי רק משפחה אחת (volumetric)
נמדדת בנפח — SYN flood ו-HTTP flood אינן מתקפות נפח, וזו בדיוק הטעות שהשאלה בודקת.

Difficulty: hard

Concepts: DDoS

Bloom: analyze

Learning Objective: להבחין בין שלוש משפחות התקיפה לפי המשאב שהן מכלות.

Misconception: סטודנטים חושבים שכל DDoS היא "שיטפון גדול" ומסווגים גם protocol ו-application-layer כ-volumetric.

---

## Question

id: q-dos-ddos-005
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 70
points: 5
concepts:
  - DDoS

מדוע spoofing (זיוף) של כתובת המקור הוא תנאי הכרחי למתקפת amplification/reflection?

### Answers

A. כי בלעדיו שרת ה-DNS מסרב לענות על בקשות
B. כי הזיוף מצפין את הבקשה כך שחומת האש לא תזהה אותה
C. כי הזיוף גורם לשרת התמים להחזיר את התשובה הגדולה אל הקורבן ולא אל התוקף, וגם מסתיר את זהות התוקף
D. כי הזיוף מגדיל את יחס ההגברה בין השאלה לתשובה
E. כי בלי זיוף המתקפה תפגע בסודיות במקום בזמינות

Correct: C

Explanation: במתקפת reflection התוקף רושם בשדה כתובת המקור את כתובת הקורבן. מכיוון
ש-UDP אינו מאמת מי שלח, השרת התמים עונה — ושולח את התשובה המוגברת אל הקורבן במקום אל
התוקף, תוך הסתרת זהות התוקף: C. A שגויה — שרת פתוח עונה גם בלי זיוף. B מתאר הצפנה,
שאינה קשורה ל-spoofing. D שגויה — יחס ההגברה נובע מהפרוטוקול (למשל monlist), לא
מהזיוף; הזיוף רק מפנה את התשובה. E שגויה — DDoS פוגעת בזמינות בכל מקרה.

Difficulty: medium

Concepts: DDoS

Bloom: understand

Learning Objective: להסביר כיצד spoofing מאפשר reflection והגברה של תעבורה אל הקורבן.

Misconception: סטודנטים חושבים שהזיוף עצמו מגביר את התעבורה, במקום שהוא רק מפנה את התשובה המוגברת אל הקורבן.

---

## Question

id: q-dos-ddos-006
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - DDoS

חברה משקיעה בהקשחה מלאה של שרת ה-web שלה: כל הטלאים מעודכנים, ההגדרות מוקשחות,
וסריקת חולשות מחזירה אפס ממצאים. שבוע לאחר מכן השרת נופל תחת מתקפת DDoS. כיצד ייתכן?

### Scenario

מנהל השרת טוען: "אין שום חולשה במערכת — בדקנו הכול. אם אין חולשה, איך הצליחו להפיל
אותנו?".

### Answers

A. בוודאי נותרה חולשה שהסריקה החמיצה; יש לסרוק שוב עד שתימצא
B. DDoS אינה מנצלת חולשה אלא את הקיבולת הסופית של המערכת, ולכן הקשחה ועדכונים אינם מגינים מפניה
C. ההקשחה עצמה פתחה חולשה חדשה שהתוקף ניצל
D. השרת נפל רק כי חומת האש הייתה מכובה באותו רגע
E. זו אינה DDoS אמיתית, כי DDoS דורשת תמיד חולשה כדי לעבוד

Correct: B

Explanation: זו הנקודה המרכזית של הנושא: DDoS אינה מנצלת פגם אלא עובדה — לכל מערכת
קיבולת סופית (רוחב פס, טבלת חיבורים, חוטים). שרת מוקשח ומעודכן לחלוטין ייפול בדיוק כמו
מוזנח אם ישלחו אליו מספיק תעבורה: B. A ו-C מניחות שחייבת להיות חולשה — הנחה שגויה
שמחמיצה את מה שמייחד DDoS. D ממציא סיבה טכנית צדדית; גם עם חומת אש פעילה DDoS volumetric
עוברת. E הופך את העובדה: דווקא היעדר הצורך בחולשה הוא מה שהופך DDoS לייחודית.

Difficulty: hard

Concepts: DDoS

Bloom: analyze

Learning Objective: לנמק מדוע DDoS אינה דורשת חולשה וזה מייחד אותה מכל תקיפה אחרת.

Misconception: סטודנטים מניחים שכל תקיפה מוצלחת מוכיחה קיום חולשה, ולכן מחפשים באג שאינו קיים.

---

## Question

id: q-dos-ddos-007
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 85
points: 5
concepts:
  - DDoS
  - Firewall

ארגון סומך על חומת האש בשכבה 3 שלו כדי לספוג מתקפת DDoS volumetric בנפח מאות Gbps.
מדוע גישה זו נכשלת עוד לפני שחומת האש מסננת ולו מנה אחת?

### Scenario

חומת האש מוגדרת היטב ומיישמת Implicit Deny; היא מותקנת בגבול הרשת של הארגון, בין
הנתב שמחבר לאינטרנט לבין הרשת הפנימית.

### Answers

A. חומת האש מסננת נכון, אך הקו שמוביל אליה כבר רווי בשיטפון — הצינור נסתם לפני נקודת הסינון
B. חומת אש בשכבה 3 מתירה תמיד תעבורת UDP כברירת מחדל
C. חומת האש הייתה צריכה להיות מוגדרת ב-Implicit Allow כדי לחסום DDoS
D. הבעיה היא שחומת האש בודקת תוכן (payload) ולכן מאטה את כל התעבורה
E. חומת אש בשכבה 3 אינה מסוגלת לחסום מנות volumetric כי אלה מוצפנות

Correct: A

Explanation: חומת האש יושבת בגבול הרשת, אחרי הקו שמחבר לאינטרנט. שיטפון של מאות Gbps
מרווה ומחניק את הקו הזה עצמו, ולכן התעבורה הלגיטימית נחסמת עוד לפני שהיא מגיעה לחומת
האש — גם אם זו הייתה מסננת כל מנה בהצלחה: A. B ממציא ברירת מחדל שגויה; מדיניות ה-ACL
אינה העניין כאן. C שגויה — Implicit Allow פותח את חומת האש, לא חוסם DDoS. D שגויה כי
חומת אש בשכבה 3 דווקא אינה בודקת תוכן. E שגויה — הבעיה אינה הצפנה אלא רוויית הקו במעלה
הזרם.

Difficulty: hard

Concepts: DDoS, Firewall

Bloom: analyze

Learning Objective: להסביר מדוע חומת אש בשכבה 3 לבדה אינה יכולה לעצור DDoS volumetric.

Misconception: סטודנטים מניחים שחומת אש בגבול הרשת מספיקה, ומתעלמים מכך שהקו עצמו נסתם לפניה.

---

## Question

id: q-dos-ddos-008
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - DDoS
  - Availability

לאיזו צלע של משולש ה-CIA שייכת פגיעת DDoS, וכיצד היא ממופה בטקסונומיית RFC 2828?

### Answers

A. Confidentiality; תחת Unauthorized Disclosure
B. Integrity; תחת Corruption
C. Availability; תחת Obstruction
D. Availability; תחת Incapacitation
E. Integrity; תחת Falsification

Correct: C

Explanation: DDoS אינה חושפת מידע ואינה משנה נתונים — היא רק חוסמת גישה, ולכן פוגעת
ב-Availability בלבד. ב-RFC 2828 היא הדוגמה הקנונית של Obstruction ("hindering system
operation"): C. A ו-E ו-B מייחסים לה נכס שאינו נפגע. D קרובה אך שגויה: Incapacitation
משמעה שהרכיב **מושבת** (מת) — ב-DDoS הרכיב חי ובריא, פשוט חסום, וזו בדיוק ההבחנה בין
Obstruction ל-Incapacitation.

Difficulty: medium

Concepts: DDoS, Availability

Bloom: understand

Learning Objective: למפות DDoS אל Availability ואל Obstruction ב-RFC 2828.

Misconception: סטודנטים מבלבלים בין Obstruction (הרכיב חי וחסום) ל-Incapacitation (הרכיב מושבת) בתוך קטגוריית שיבוש.

---

## Question

id: q-dos-ddos-009
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - DDoS

שירות web גלובלי סופג מתקפת DDoS volumetric אדירה, ובכל זאת נותר זמין למשתמשיו. איזו
מיטיגציה מסבירה זאת בצורה הטובה ביותר?

### Scenario

השירות פרוס מאחורי רשת עולמית של שרתי קצה. אותה כתובת IP מוכרזת ממאות אתרים ברחבי
העולם, כך שכל בקשה מנותבת לאתר הקרוב ביותר גאוגרפית.

### Answers

A. Implicit Deny בחומת האש המקומית של השרת המרכזי
B. ספיגה מבוזרת דרך CDN/Anycast — התעבורה ההתקפית מתפזרת על פני מאות אתרים במקום להתרכז בשרת אחד
C. הצפנת TLS של כל התעבורה הנכנסת
D. גיבוי offline של נתוני השרת
E. החלפת השרת בשרת חזק יותר עם יותר זיכרון

Correct: B

Explanation: התיאור — אותה כתובת IP המוכרזת ממאות אתרים דרך Anycast — הוא בדיוק מנגנון
הספיגה המבוזרת: התעבורה ההתקפית מתחלקת על פני כל הרשת, כך שאף אתר בודד אינו סופג את מלוא
הנפח, והשירות נותר זמין: B. A שגויה — חומת אש מקומית אינה מונעת רוויית קו, כפי שראינו.
C מתאר סודיות, שאינה רלוונטית לזמינות. D שייך ל-Incapacitation (שחזור רכיב מושבת), לא
לספיגת שיטפון. E ("שרת חזק יותר") לא יעמוד מול נפח של Tbps — הפתרון הוא פיזור, לא הגדלה
של נקודה יחידה.

Difficulty: medium

Concepts: DDoS

Bloom: apply

Learning Objective: לזהות CDN/Anycast absorption כמיטיגציה שמפזרת תעבורה התקפית.

Misconception: סטודנטים חושבים שהחלפה לשרת חזק יותר או חומת אש מקומית פותרות DDoS volumetric, במקום ספיגה מבוזרת במעלה הזרם.
