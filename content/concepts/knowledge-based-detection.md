---
id: knowledge-based-detection
title: Knowledge-based Detection
slug: knowledge-based-detection
aliases:
  - Signature-based
  - Signature
  - Knowledge-based IDS
  - Signature-based IDS
  - זיהוי מבוסס חתימות
  - חתימות
tags:
  - ids
  - detection
  - network-security
related:
  - Behavior-based Detection
  - False Positive
  - False Negative
  - IDS
  - IPS
---

# Knowledge-based Detection

:::definition
שיטת זיהוי שבה ה-IDS משווה כל אירוע מול מסד נתונים של דפוסי תקיפה ידועים
(signatures) — מחרוזות, domains, hashes ושדות פרוטוקול — ומתריע רק בהתאמה לדפוס
מוכר. המרצה מסכם אותה במשפט: **"High accuracy, but low in completeness"**.
:::

## הסבר פשוט

זיהוי מבוסס חתימות (Knowledge-based Detection, ידוע גם כ-Signature-based) עובד
בדיוק כמו רשימת מבוקשים במשטרה: יש אוסף של פרצופים מוכרים, וכל מי שנכנס מושווה
מולם. אם יש התאמה — התראה. אם אין — הכניסה מאושרת.

מכאן נובעות שתי התכונות של השיטה, ושתיהן הן אותו מטבע משני צדדיו:

- כשהיא מתריעה, היא כמעט תמיד צודקת. הדפוס תואם דפוס תקיפה מתועד.
- היא **עיוורת לחלוטין** לכל מה שאינו ברשימה. תוקף שפרצופו לא מופיע — עובר.

## הסבר טכני

ה-Analysis Engine מריץ התאמת דפוסים על התעבורה המפוענחת: pattern, expression או
bytecode matching, ולעיתים גם חציית סף תדירות (למשל זיהוי port scanning). הכלל
העקרוני, בניסוח המרצה: "if pattern X appears in context Y → alert."

התכונות המדויקות שהמרצה מייחס לשיטה:

| תכונה | הניסוח של המרצה |
| --- | --- |
| דיוק | **High accuracy** — מעט [[False Positive]] |
| שלמות | **Low in completeness** — Misses unknown attacks |
| ביצועים | "Fast and explainable"; "High performance with minimal processing power" |
| תלות | "Knowledge-based IDS **only as good as database** of attack signatures" |
| חיסרון | "need regular **update of knowledge** (malware signatures)" |

המגבלה אינה באיכות המימוש אלא במבנה השיטה: חתימה נכתבת **אחרי** שהתקיפה זוהתה
בעולם. לכן תקיפת **zero-day** — כזו שאיש עדיין לא ראה — אינה יכולה, בהגדרה,
להתאים לחתימה קיימת. מי שמסוגל לתפוס אותה היא [[Behavior-based Detection]].

מכאן גם החולשה מול נוזקה **פולימורפית**, המשנה את קוד עצמה בכל הדבקה: אם ה-hash
והמחרוזות משתנים, החתימה שנכתבה עבור הגרסה הקודמת אינה תופסת את החדשה.

:::example
כלל בסגנון Snort שהמרצה מציג (שקופית 14) — התראה על ניסיון SQL injection:

```
alert tcp any any -> $HOME_NET 80 (
  msg:"Possible SQL injection attempt";
  content:"' OR 1=1"; nocase;
  sid:1000001; rev:1;
)
```

הכלל מחפש את המחרוזת `' OR 1=1` בתעבורה לפורט 80. תוקף שיכתוב את אותה מתקפה
בניסוח שקול אך שונה — `' OR 'a'='a` — יעבור מתחת לרדאר של הכלל הזה.
:::

:::warning
"מעט התראות שווא" **אינו** "בטוח יותר". השיטה משלמת על הדיוק שלה במטבע של
[[False Negative]]: כל מה שאין לו חתימה — עובר בשקט מוחלט. ארגון שמפעיל חתימות
בלבד יראה SOC שקט ורגוע, וזה בדיוק מה שתוקף בעל כלי חדש מקווה לו.
:::

:::diagram
תרשים זרימה: חבילה נכנסת אל תיבת Analysis Engine. מהצד מוזן חץ ממסד נתונים
המסומן "Signature DB" עם כיתוב "requires regular updates". בתוך התיבה שאלה:
"pattern match?" — יציאה "Yes" מובילה לתיבת ALERT (מסומנת "high accuracy"),
יציאה "No" מובילה לתיבת "Pass — traffic allowed" (מסומנת באדום "zero-day passes
here — low completeness").
:::
