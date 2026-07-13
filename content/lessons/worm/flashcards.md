---
id: worm-flashcards
lesson: worm
---

# כרטיסיות — תולעת (Worm) ולמה היא אינה וירוס

## Card

front: מהי תולעת (Worm) בהגדרת המרצה?
back: נוזקה אוטונומית (Autonomous malware) שאינה זקוקה לתוכנית מארחת, קיימת כתוכנית עצמאית (‎.exe‎), ומשכפלת את עצמה ומתפשטת ברשתות ללא אינטראקציה של משתמש.
concepts:
  - Worm

## Card

front: מהו המשפט שהמרצה חוזר עליו שלוש פעמים (שקפים 13, 16, 17), וממנו נגזר כל השיעור?
back: "Unlike a virus, a worm does not need a host program." תולעת אינה זקוקה לתוכנית מארחת — זה השורש שכל שאר ההבדלים מווירוס נגזרים ממנו.
concepts:
  - Worm
  - Virus

## Card

front: מהי השרשרת הסיבתית שמובילה מהיעדר מארח ועד למהירות ההתפשטות?
back: אין מארח ← אין צורך בפעולת משתמש ← ההתפשטות עצמאית ← ולכן מהירה (אלפי מכונות בדקות).
concepts:
  - Worm

## Card

front: כיצד תולעת מתפשטת אם אינה נשענת על משתמש?
back: היא מנצלת חולשות (Vulnerabilities) במערכת ההפעלה וביישומי הרשת, נכנסת דרך שירות פגיע ומעתיקה את עצמה — Self-Propagation, "no user action required".
concepts:
  - Worm
  - Vulnerability

## Card

front: מהם ארבעת המאפיינים שהמרצה מייחס לתולעת (שקף 14)?
back: Self-Propagation (התפשטות עצמית), Resource Exploitation (ניצול משאבים), Data Exfiltration (חילוץ מידע), Network Disruption (שיבוש רשת).
concepts:
  - Worm

## Card

front: מהו סוג הפגיעה העיקרי של תולעת, וממה הוא נובע?
back: פגיעה בזמינות (Availability) — התולעת מכלה CPU, זיכרון ורוחב פס ו"מאטה תקשורת" (Resource Exploitation + Network Disruption). אין צורך במחיקה או הצפנה כדי לשתק.
concepts:
  - Worm
  - Availability

## Card

front: השלימו את טבלת ההשוואה — Host Dependency: תולעת מול וירוס.
back: תולעת — אינה זקוקה לקובץ מארח (standalone). וירוס — זקוק לקובץ או תוכנית מארחת.
concepts:
  - Worm
  - Virus

## Card

front: השלימו את טבלת ההשוואה — Activation: תולעת מול וירוס.
back: תולעת — מופעלת אוטומטית דרך ניצול חולשה. וירוס — דורש אינטראקציה של משתמש עם הקובץ הנגוע.
concepts:
  - Worm
  - Virus

## Card

front: השלימו את טבלת ההשוואה — Speed: תולעת מול וירוס.
back: תולעת — שכפול מהיר, אלפי מכונות בדקות. וירוס — התפשטות איטית, תלויה בהתנהגות המשתמש.
concepts:
  - Worm
  - Virus

## Card

front: דוגמאות לתולעים מול דוגמאות לווירוסים (לפי המרצה).
back: תולעים: WannaCry, Conficker, SQL Slammer. וירוסים: ILOVEYOU, Melissa, CIH.
concepts:
  - Worm
  - Virus

## Card

front: מדוע חומת אש היקפית אינה עוצרת תולעת שכבר בפנים?
back: מפני שהתפשטות התולעת בין מכונות פנימיות היא תנועה רוחבית (east-west) שאינה חוצה את הגבול — הפרימטר בודק north-south בלבד. התולעת היא דוגמה חיה ל-Lateral Movement.
concepts:
  - Worm
  - Lateral Movement

## Card

front: מה המרצה אומר על ניקוי תולעת ממכונה בודדת?
back: "If you remove a worm from a machine… it often gets reinfected very quickly." כל עוד מכונות אחרות ברשת נגועות, הן ידביקו מחדש את המכונה שנוקתה — תולעת היא בעיה של הרשת כולה.
concepts:
  - Worm

## Card

front: האם תולעת היא תת-סוג של וירוס?
back: לא. בדיאגרמת ה-Venn של המרצה, Virus ו-Worm הן שתי קבוצות נפרדות שאינן חופפות בתוך Malware. שתיהן נוזקה — אך שונות במהותן, לא בדרגתן.
concepts:
  - Worm
  - Virus
  - Malware

## Card

front: אילו aliases חשוב לזכור עבור Worm, וכיצד היא הופיעה בבחינת 2023?
back: תולעת / Worm / Computer Worm — ובבחינת 2023 (שאלה 3) המילה נכתבה בשגיאת כתיב "Warm". זו אותה נוזקה בדיוק.
concepts:
  - Worm
