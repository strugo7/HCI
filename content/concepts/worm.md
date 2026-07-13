---
id: worm
title: Worm
slug: worm
aliases:
  - תולעת
  - תולעת מחשב
  - Worm
  - Worms
  - Computer Worm
  - Warm
  - Standalone malware
tags:
  - malware
  - self-propagation
  - network-security
related:
  - Virus
  - Malware
  - Lateral Movement
  - Vulnerability
  - Availability
  - Ransomware
---

# Worm

:::definition
תולעת (Worm) היא נוזקה אוטונומית שאינה זקוקה לתוכנית מארחת (host program) וקיימת
כתוכנית עצמאית (standalone, למשל קובץ ‎.exe‎). היא משכפלת את עצמה ומתפשטת ברשתות
בין מחשבים תוך ניצול חולשות במערכת ההפעלה וביישומים — **ללא כל אינטראקציה של
משתמש**.
:::

## הסבר פשוט

וירוס (Virus) הוא טרמפיסט: הוא חייב קובץ שייקח אותו — מסמך Word, קובץ הפעלה — ו
חייב שמישהו יפתח את הקובץ הזה. בלי המארח ובלי הלחיצה, הווירוס לא רץ.

תולעת (Worm) לא צריכה טרמפ. היא **תוכנית בפני עצמה**. אחרי שהיא נוחתת על מחשב
אחד, היא סורקת את הרשת בעצמה, מוצאת מחשב פגיע נוסף, מעתיקה את עצמה אליו, ומשם
ממשיכה הלאה. אף אדם לא לחץ על דבר. אף קובץ לא נפתח.

זו הסיבה שהמרצה חוזר על אותו משפט שלוש פעמים בשלושה שקפים שונים:
**"Unlike a virus, a worm does not need a host program."** כל שאר ההבדלים — מהירות,
היקף, אופן ההפעלה — נגזרים מהמשפט הזה.

## הסבר טכני

המרצה מגדיר תולעת כ-**"Autonomous malware that self-replicates across networks
without user interaction"**, ומונה ארבעה מאפיינים:

| מאפיין | ניסוח המרצה |
| --- | --- |
| **Self-Propagation** (התפשטות עצמית) | "Spreads across networks by exploiting OS and application vulnerabilities — no user action required." |
| **Resource Exploitation** (ניצול משאבים) | "Consumes CPU, memory, and bandwidth, causing severe slowdowns and potential system crashes." |
| **Data Exfiltration** (חילוץ מידע) | "Designed to silently access and steal sensitive data from compromised systems." |
| **Network Disruption** (שיבוש רשת) | "Overwhelms bandwidth and disrupts legitimate communication and service availability." |

וקטור ההתפשטות הוא ניצול [[Vulnerability]] בשירות רשת או במערכת ההפעלה — ולא
שכנוע של משתמש. לכן קצב ההדבקה של תולעת אינו תלוי בהתנהגות אנושית אלא במהירות
הסריקה של הרשת: **"Rapid replication — can infect thousands in minutes"**.

בתוך הרשת הפנימית התולעת היא [[Lateral Movement]] בהתגלמותו — היא נעה ממחשב
למחשב מבלי לחצות שוב את הגבול החיצוני. מכאן גם ההשלכה שהמרצה מסמן בסוף דיאגרמת
הרשת הביתית: **"If you remove a worm from a machine… it often gets reinfected very
quickly"** — ניקוי מכונה בודדת חסר משמעות כל עוד שאר המכונות ברשת עדיין נגועות.

הפגיעה העיקרית של תולעת אינה בהכרח בקובץ מסוים, אלא ב[[Availability]]: היא
מציפה רוחב פס, אוכלת CPU וזיכרון, ו"מאטה תקשורת" — בלשון המרצה, worms
"spread between computers and slow down communication".

:::example
המרצה מציג רשת ביתית: נתב מול ה-ISP, וסביבו מחשב נייד, מחשב נייח, מדפסת,
PlayStation וסמארטפון — כל אחד עם כתובת IP פרטית משלו. התולעת מתפשטת אל **כל**
המכשירים ברשת. איש לא הוריד קובץ ואיש לא לחץ על קישור אחרי ההדבקה הראשונה.
:::

:::warning
תולעת אינה סוג של וירוס. בדיאגרמת ה-Venn של המרצה, Virus ו-Worm הם **שתי קבוצות
נפרדות שאינן חופפות** בתוך הקבוצה הגדולה Malware. כל תולעת היא נוזקה — אך תולעת
אינה "וירוס שמתפשט מהר".
:::

:::diagram
משמאל: אדם בודד ליד מסך, וממנו שלושה חצים אל שלושה מחשבים — כל חץ מסומן "פתיחת
קובץ נגוע". זהו הווירוס: ההפצה עוברת דרך המשתמש בכל פעם מחדש.
מימין: מחשב אחד עם סמל תולעת, וממנו חץ למחשב שני, ממנו לשלישי ולרביעי — שרשרת
מחשב→מחשב. אין דמות אדם בצד הזה כלל. מעל השרשרת התווית: "ניצול חולשה ברשת — ללא
פעולת משתמש".
:::
