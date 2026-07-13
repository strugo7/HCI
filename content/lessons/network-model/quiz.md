---
id: network-model-quiz
lesson: network-model
---

# קוויז — מודל הרשת: TCP/IP ושכבות התקשורת

## Question

id: q-network-model-001
type: multiple-choice
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - TCP/IP

כמה שכבות יש במודל [[TCP/IP]] כפי שהוא מוגדר ב-RFC 1122, ומהן?

### Answers

A. שבע שכבות: Physical, Data Link, Network, Transport, Session, Presentation, Application
B. ארבע שכבות: Application, Transport, Internet, Link
C. שלוש שכבות: Network, Transport, Application
D. חמש שכבות: Physical, Network, Transport, Session, Application
E. ארבע שכבות: Physical, Logical, Social, Governance

Correct: B

Explanation: מודל TCP/IP המיושם, כפי שמוגדר ב-IETF RFC 1122, מכיל בדיוק ארבע שכבות:
Application, Transport, Internet ו-Link — לכן B. A מתאר את שבע השכבות של OSI Model,
שהוא מודל ייחוס ולא המודל המיושם. C ו-D ממציאים חלוקות שאינן תואמות לאף מודל תקני.
E מבלבל בין שכבות מודל הרשת לבין ארבע השכבות של מרחב הסייבר (Physical/Logical/Social/
Governance), שהן חלוקה אחרת לגמרי מהשיעור הקודם.

Difficulty: easy

Concepts: TCP/IP

Bloom: understand

Learning Objective: למנות את ארבע השכבות של מודל TCP/IP.

Misconception: סטודנטים מערבבים בין ארבע שכבות TCP/IP, שבע שכבות OSI, וארבע שכבות מרחב הסייבר.

---

## Question

id: q-network-model-002
type: multiple-choice
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - OSI Model
  - TCP/IP

מהי ההבחנה הנכונה בין [[OSI Model]] לבין [[TCP/IP]]?

### Answers

A. OSI הוא המודל המיושם באינטרנט, ו-TCP/IP הוא מודל ייחוס תיאורטי בלבד
B. שניהם מודלים מיושמים שמתחרים זה בזה על אותה תעבורה
C. OSI הוא מודל ייחוס בן שבע שכבות, ו-TCP/IP הוא המודל בן ארבע השכבות שהאינטרנט מיישם בפועל
D. OSI מתאר תוכנה בלבד ו-TCP/IP מתאר חומרה בלבד
E. הם שני שמות לאותו מודל בן שבע שכבות

Correct: C

Explanation: OSI הוא מודל **ייחוס** בן שבע שכבות (שפה משותפת לתיאור בעיות), בעוד
TCP/IP הוא המודל בן ארבע השכבות שהאינטרנט באמת **מיישם** — לכן C. A הופך את
התפקידים. B שגוי כי הם אינם מתחרים אלא משרתים מטרות שונות: אחד מתאר, השני מיישם. D
ממציא חלוקת חומרה/תוכנה שאינה קיימת — שני המודלים מתארים את כל המחסנית. E שגוי כי
מספר השכבות שונה (שבע מול ארבע) והתפקיד שונה.

Difficulty: easy

Concepts: OSI Model, TCP/IP

Bloom: understand

Learning Objective: להבחין בין מודל הייחוס OSI למודל המיושם TCP/IP.

Misconception: סטודנטים חושבים ש-OSI הוא זה שרץ בפועל, או שהמודלים מתחרים זה בזה.

---

## Question

id: q-network-model-003
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - TCP/IP

באיזו שכבה חיים מספרי הפורט (למשל 443 ל-HTTPS), ומה תפקידם?

### Answers

A. שכבה 3 (Network) — הם מזהים את הרשת שאליה המנה מנותבת
B. שכבה 4 (Transport) — הם מזהים לאיזו תוכנה במחשב היעד מיועדת המנה
C. שכבה 7 (Application) — הם חלק מתוכן בקשת ה-HTTP
D. שכבה 1 (Physical) — הם מייצגים את ערוץ החומרה הפיזי
E. שכבה 3 (Network) — הם מחליפים את כתובת ה-IP כשאין כזו

Correct: B

Explanation: הפורט הוא מזהה של שכבת ה-Transport (שכבה 4): כתובת ה-IP מביאה את המנה
עד המחשב, והפורט אומר לאיזו תוכנה **בתוך** המחשב היא מיועדת — לכן B. A ו-E מבלבלים
בין הפורט (שכבה 4) לכתובת ה-IP (שכבה 3); הפורט אינו מנתב בין רשתות ואינו מחליף
כתובת. C שגוי כי הפורט יושב בכותרת TCP, לא בגוף בקשת ה-HTTP האפליקטיבי. D שגוי כי
שכבה 1 עוסקת באות הפיזי, לא בהפניה לתוכנה.

Difficulty: medium

Concepts: TCP/IP

Bloom: understand

Learning Objective: לשייך את מספר הפורט לשכבה 4 (Transport).

Misconception: סטודנטים מזהים פורט עם שכבה 3, ומערבבים בינו לבין כתובת IP.

---

## Question

id: q-network-model-004
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - TCP/IP

מנה יחידה מגיעה אל שרת. שייכו כל אחד משלושת הפרטים בתרחיש לשכבה הנכונה שלו.

### Scenario

מנה מיועדת לכתובת **10.0.0.5**, אל פורט **443**, ובגוף בקשת ה-HTTP שלה כתובה
המחרוזת **`' OR 1=1 --`**.

### Answers

A. הכתובת — שכבה 4 · הפורט — שכבה 3 · המחרוזת — שכבה 7
B. הכתובת — שכבה 3 · הפורט — שכבה 4 · המחרוזת — שכבה 7
C. הכתובת — שכבה 7 · הפורט — שכבה 7 · המחרוזת — שכבה 7
D. הכתובת — שכבה 3 · הפורט — שכבה 3 · המחרוזת — שכבה 4
E. הכתובת — שכבה 1 · הפורט — שכבה 2 · המחרוזת — שכבה 3

Correct: B

Explanation: הכתובת 10.0.0.5 היא שכבה 3 (Network) — היא קובעת לאיזה מחשב המנה הולכת.
הפורט 443 הוא שכבה 4 (Transport) — הוא קובע לאיזו תוכנה במחשב. המחרוזת `' OR 1=1 --`
היא תוכן אפליקטיבי בגוף בקשת ה-HTTP, כלומר שכבה 7. לכן B. A מחליף בין שכבה 3 לשכבה 4.
C דוחס הכול לשכבה 7 ומתעלם מכך שכתובת ופורט חיים בכותרות נפרדות. D ו-E משבצים את
הפרטים בשכבות שגויות לחלוטין.

Difficulty: medium

Concepts: TCP/IP

Bloom: apply

Learning Objective: לשייך כתובת, פורט ותוכן לשכבות 3, 4 ו-7 בהתאמה.

Misconception: סטודנטים מתקשים להפריד בין כתובת (שכבה 3), פורט (שכבה 4) ותוכן (שכבה 7) בתוך אותה מנה.

---

## Question

id: q-network-model-005
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - TCP/IP

מהו Encapsulation בהעברת נתונים ברשת?

### Answers

A. הצפנת תוכן המנה כדי שאיש לא יוכל לקרוא אותה
B. תהליך שבו כל שכבה עוטפת את המטען שקיבלה מהשכבה שמעליה בכותרת (header) משלה
C. דחיסת המנה כדי להקטין את גודלה לפני השליחה
D. פיצול קובץ גדול לכמה קבצים קטנים בדיסק
E. תרגום כתובת IP לשם מתחם קריא לאדם

Correct: B

Explanation: Encapsulation הוא תהליך העטיפה שכבה-אחר-שכבה: בקשת HTTP נעטפת בכותרת TCP
(Segment), זו נעטפת בכותרת IP (Packet), וזו בכותרת Ethernet (Frame) — כל שכבה מוסיפה
את הכותרת שלה סביב מה שקיבלה. לכן B. A מבלבל עם הצפנה (TLS), שהיא מנגנון נפרד. C
מבלבל עם דחיסה. D מתאר פעולת מערכת קבצים, לא רשת. E מתאר את פעולת DNS.

Difficulty: medium

Concepts: TCP/IP

Bloom: understand

Learning Objective: להגדיר Encapsulation כעטיפת מטען בכותרות שכבה-אחר-שכבה.

Misconception: סטודנטים מבלבלים Encapsulation עם הצפנה או דחיסה.

---

## Question

id: q-network-model-006
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Firewall
  - TCP/IP

בעזרת מבנה ה-Encapsulation, הסבירו מדוע חומת אש בשכבה 3 מפספסת את המתקפה בתרחיש.

### Scenario

מנה תקינה לחלוטין מבחוץ מגיעה אל שרת ה-web: כתובת מקור לגיטימית, פרוטוקול TCP, פורט
443 — כולם מותרים בטבלת הכללים. אך בתוך גוף בקשת ה-HTTP מוסתרת מתקפת SQL Injection.
חומת האש בשכבה 3 מעבירה את המנה.

### Answers

A. חומת האש טעתה בתצורה; אילו הוגדרה נכון, שכבה 3 הייתה מזהה את ה-SQL Injection
B. ה-SQL Injection יושב בליבת המנה, עטוף בכותרות TCP ו-IP; חומת אש בשכבה 3 מפרשת רק את הכותרות החיצוניות ולכן אינה יכולה לראותו
C. חומת האש ראתה את המתקפה אך בחרה להעביר אותה כי המקור מהימן
D. שכבה 3 קוראת את כל תוכן המנה, אך אינה יודעת מהו SQL Injection
E. המתקפה עברה מפני שפורט 443 מוצפן, ואילו היה HTTP רגיל שכבה 3 הייתה חוסמת

Correct: B

Explanation: בזכות ה-Encapsulation, גוף בקשת ה-HTTP (שם יושב ה-SQL Injection) עטוף
בכותרת TCP ובכותרת IP. חומת אש בשכבה 3 מפרשת אך ורק את שתי הכותרות החיצוניות —
כתובות ופורט — ומתייחסת לליבה כמטען אטום, ולכן היא **אינה יכולה** לראות את המתקפה,
לא "בוחרת שלא". לכן B. A שגוי כי אין תצורה שתגרום לרכיב שכבה 3 לקרוא תוכן שכבה 7. C
מייחס לה "ראייה" של התוכן שאין לה. D סותר את עצמו — שכבה 3 דווקא אינה קוראת את
התוכן. E שגוי כי גם על HTTP לא-מוצפן חומת אש בשכבה 3 עדיין אינה בודקת את גוף הבקשה.

Difficulty: hard

Concepts: Firewall, TCP/IP

Bloom: analyze

Learning Objective: להסביר בעזרת Encapsulation מדוע רכיב שכבה 3 עיוור לתוכן שכבה 7.

Misconception: סטודנטים מניחים שחומת אש בשכבה 3 "סורקת" את כל המנה או שהיא בוחרת שלא לחסום.

---

## Question

id: q-network-model-007
type: comparison
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Firewall
  - WAF

רכיב הגנה בודק **רק** את כתובות ה-IP ואת מספרי הפורט של כל מנה. לאיזו קטגוריה הוא
שייך, ומה המחיר של רכיב שבודק לעומק גם את התוכן?

### Answers

A. זהו WAF בשכבה 7; רכיב שבודק תוכן זול ומהיר יותר ממנו
B. זהו Packet Filter בשכבה 3/4; רכיב שבודק תוכן (שכבה 7) איטי יותר בגלל בדיקה עמוקה ופענוח TLS
C. זהו NGFW; אין הבדל בביצועים בין בדיקת כותרת לבדיקת תוכן
D. זהו IDS בשכבה 7; בדיקת תוכן אינה עולה דבר בביצועים
E. זהו Packet Filter בשכבה 7; בדיקת תוכן מהירה יותר כי היא רואה פחות מידע

Correct: B

Explanation: רכיב שבודק רק כתובות IP ופורטים פועל בשכבות 3–4 — זהו Packet Filter
([[Firewall]] בשכבה 3). רכיב שבודק גם את התוכן פועל בשכבה 7 ([[WAF]] / DPI), וכדי
לעשות זאת עליו לקלף את כל העטיפות ולפענח TLS — ולכן ה-throughput שלו נמוך יותר. לכן
B. A מסמן את הרכיב כ-WAF (שכבה 7) בעוד הוא בודק רק כותרות. C שגוי כי בדיקת תוכן דווקא
עולה בביצועים משמעותית. D ו-E טוענים שבדיקת תוכן זולה או חינמית — היפוך של המציאות,
שבה בדיקה עמוקה יקרה יותר.

Difficulty: medium

Concepts: Firewall, WAF

Bloom: understand

Learning Objective: למקם Packet Filter בשכבות 3–4 ובדיקת תוכן בשכבה 7, ולזהות את המחיר בביצועים.

Misconception: סטודנטים מניחים שבדיקת תוכן עמוקה זולה כמו סינון כותרות, או שרכיב שכבה 3 רואה תוכן.

---

## Question

id: q-network-model-008
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - Firewall
  - WAF
  - Defense in Depth

חברה מציבה Packet Filter בקצה הרשת **וגם** WAF לפני שרת ה-web. מדוע לא להסתפק ב-WAF
בלבד, שהרי הוא רואה יותר?

### Scenario

צוות הסייבר שוקל לוותר על ה-Packet Filter ולנתב את **כל** התעבורה ישירות אל ה-WAF,
בטענה שממילא ה-WAF בודק לעומק רב יותר.

### Answers

A. יש לוותר על ה-Packet Filter; ה-WAF רואה יותר ולכן מייתר אותו לחלוטין
B. יש לשמור על שניהם: Packet Filter מסנן בזול ובמהירות נפחי תעבורה גדולים בשכבות 3–4, וה-WAF בודק לעומק בשכבה 7 רק את מה ששרד
C. יש לוותר על ה-WAF ולהשאיר רק את ה-Packet Filter, כי הוא מהיר יותר
D. אין הבדל — אפשר לבחור כל אחד מהם באקראי
E. יש להחליף את שניהם ב-IDS, שאינו צורך משאבים כלל

Correct: B

Explanation: השילוב מנצל את היתרון של כל שכבה: Packet Filter בשכבות 3–4 מסנן בעלות
זניחה נפחי תעבורה עצומים לפי IP ופורט ומעיף את רוב הזבל, וה-WAF בשכבה 7 — שבדיקתו
יקרה ואיטית — מקבל רק את מה ששרד. זהו בדיוק [[Defense in Depth]] מתורגם לשכבות. לכן
B. A מוותר על שכבת הסינון הזולה ומעמיס על ה-WAF את כל התעבורה. C מוותר על בדיקת התוכן
שהיא כל תכלית ה-WAF. D מתעלם מהתפקידים המשלימים. E מייחס ל-IDS "אפס משאבים" ומחליף
מנגנוני מניעה במנגנון גילוי בלבד.

Difficulty: medium

Concepts: Firewall, WAF, Defense in Depth

Bloom: apply

Learning Objective: לנמק את השילוב בין סינון שכבה 3 לבדיקת שכבה 7 כ-Defense in Depth.

Misconception: סטודנטים חושבים שהרכיב שרואה יותר תמיד מייתר את הרכיב הזול שרואה פחות.

---

## Question

id: q-network-model-009
type: true-false
difficulty: hard
cognitive: analyze
estimatedTime: 60
points: 5
concepts:
  - TCP/IP

טענה: "כאשר תעבורה מוצפנת ב-TLS, כותרות ה-IP וה-TCP מוסתרות גם הן, ולכן חומת אש
בשכבה 3 אינה יכולה לנתב או לסנן תעבורה מוצפנת." האם הטענה נכונה?

### Answers

A. נכונה — הצפנת TLS מסתירה את כל המנה כולל הכותרות
B. שגויה — TLS מסתיר רק את תוכן שכבה 7; כותרות ה-IP וה-TCP נשארות גלויות תמיד, אחרת אי אפשר היה לנתב את המנה
C. נכונה — לכן כל התעבורה המוצפנת נחסמת אוטומטית בשכבה 3
D. שגויה — TLS אינו מצפין דבר, הוא רק חותם על המנה
E. נכונה — רק NGFW יכול לנתב תעבורה מוצפנת

Correct: B

Explanation: TLS מצפין את **התוכן** בשכבה 7, אך כותרות ה-IP (שכבה 3) וה-TCP (שכבה 4)
חייבות להישאר גלויות — אחרת אף נתב לא היה יודע לאן להעביר את המנה. לכן סינון בשכבה 3
עובד מצוין גם על תעבורה מוצפנת, ואילו בדיקת תוכן בשכבה 7 היא זו שמחייבת לפענח TLS
תחילה. הטענה שגויה, לכן B. A ו-C מניחים שהכול מוצפן — אז שום דבר לא היה מנותב. D שגוי
כי TLS כן מצפין. E ממציא מגבלה שאינה קיימת — כל רכיב שכבה 3 מנתב תעבורה מוצפנת.

Difficulty: hard

Concepts: TCP/IP

Bloom: analyze

Learning Objective: להבחין בין תוכן מוצפן (שכבה 7) לכותרות ניתוב גלויות (שכבות 3–4).

Misconception: סטודנטים חושבים שהצפנת TLS מסתירה את כל המנה, כולל הכתובות הדרושות לניתוב.

---

## Question

id: q-network-model-010
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - OSI Model
  - TCP/IP

בשפת האבטחה, למה מתייחסים "שכבה 3" ו"שכבה 7"?

### Answers

A. שכבה 3 = Application (התוכן); שכבה 7 = Network (הכתובות)
B. שכבה 3 = Network (כתובות IP); שכבה 7 = Application (התוכן האפליקטיבי)
C. שכבה 3 = Physical (הכבל); שכבה 7 = Transport (הפורטים)
D. שכבה 3 ושכבה 7 הן שתי שכבות פיזיות שונות של אותו כבל
E. שכבה 3 = Social; שכבה 7 = Governance

Correct: B

Explanation: המספור לקוח מ-OSI Model: שכבה 3 היא Network — כתובות ה-IP והניתוב; שכבה
7 היא Application — התוכן האפליקטיבי כמו HTTP. לכן B. A הופך בין השתיים. C משבץ אותן
בשכבות שגויות. D מתאר אותן כשכבות פיזיות, בעוד הן לוגיות. E מבלבל עם שכבות מרחב הסייבר
(Social/Governance), שאינן חלק ממודל הרשת.

Difficulty: easy

Concepts: OSI Model, TCP/IP

Bloom: remember

Learning Objective: לזהות ש"שכבה 3" = Network ו"שכבה 7" = Application במספור OSI.

Misconception: סטודנטים מחליפים בין מספרי השכבות או מבלבלים אותם עם שכבות מרחב הסייבר.
