---
id: usurpation-flashcards
lesson: usurpation
---

# כרטיסיות — תפיסה בכוח (Usurpation)

## Card

front: מהי Usurpation (תְפיסה בְּכֹח), ועל איזה נכס היא מאיימת?
back: המשפחה הרביעית ב-RFC 2828. בלשון המרצה: "Is a threat to system integrity". שתי תת-התקפות בלבד — Misappropriation ו-Misuse.
concepts:
  - Usurpation

## Card

front: מהן שתי תת-ההתקפות של Usurpation?
back: Misappropriation (ניכוס פסול) ו-Misuse (שימוש לרעה). זו המשפחה היחידה בטקסונומיה עם שתיים בלבד.
concepts:
  - Usurpation
  - Misappropriation
  - Misuse

## Card

front: מהי ההגדרה של Misappropriation?
back: "unauthorized logical or physical control of a system resource" — שליטה לא מורשית, לוגית או פיזית, במשאב של המערכת.
concepts:
  - Misappropriation

## Card

front: מהי ההגדרה של Misuse?
back: "Causes system to perform a function or service detrimental to security" — גורם למערכת לבצע פונקציה או שירות הפוגעים באבטחה.
concepts:
  - Misuse

## Card

front: בשאלה אחת — איך מבחינים בין Misappropriation ל-Misuse?
back: בניכוס פסול שואלים "מי שולט במשאב?" והתשובה היא התוקף. בשימוש לרעה שואלים "מי ביצע את הפעולה?" והתשובה היא המערכת. אחד לוקח שליטה, השני מסלף תפקוד.
concepts:
  - Misappropriation
  - Misuse

## Card

front: מהם שלושת הווקטורים של Misappropriation?
back: Insider Access, Weak IP Controls, Overbroad Permissions — כולם מובילים לאותה נקודה: לזהות יש יותר כוח ממה שהיא צריכה.
concepts:
  - Misappropriation

## Card

front: מהו Cloud Credit Abuse ולאיזו תת-התקפה הוא שייך?
back: מפתחות גישה דלופים משמשים תוקף להרים אשכולות GPU בחשבון הארגון ולכרות עליהם קריפטו. הנזק: עלות עצומה ומיצוי מכסות. זו הדוגמה הקנונית ל-Misappropriation.
concepts:
  - Misappropriation

## Card

front: מהו מודל ה-MisUseCase / MisActor, ומה הוא מלמד?
back: הרחבת UML — MisActor מקושר ב-«communicate» ל-MisUseCase ("Uses system wrongly because of bad design"), שנמצא ביחס «attacks» לפונקציית המערכת התקינה. המסקנה: שימוש לרעה אינו באג, הוא תוצאה של תכן לקוי.
concepts:
  - Misuse

## Card

front: כיצד דוגמת ה-Keyless Go ממחישה Misuse?
back: הגנב (MisActor) מיירט ומשדר מחדש את אות הרדיו, והרכב נפתח — בדיוק כפי שתוכנן. אף רכיב לא נפרץ; מערכת הרכב עצמה ביצעה את הפעולה המזיקה. הדרישה TP-R-0042: למדוד את משך שידור האות כדי לזהות ממסר מרוחק.
concepts:
  - Misuse

## Card

front: מדוע Firewall, אנטי-וירוס וזיהוי מבוסס חתימות אינם מזהים Misuse?
back: מפני שאין מה לזהות — הפעולה חוקית לגמרי. משתמש מורשה מפעיל פונקציה תקינה של המערכת. החריגה היא בהקשר ובהיקף, ולכן היא ניתנת לאיתור רק בניטור, auditing וזיהוי אנומליות.
concepts:
  - Misuse

## Card

front: מהן המיטיגציות שהמרצה מייעד לכל אחת משתי תת-ההתקפות?
back: ל-Misappropriation — בקרות גישה נוקשות, שימנעו השגת שליטה בנכסים מלכתחילה. ל-Misuse — auditing וניטור מקיפים, שיזהו וירתיעו שימוש בלתי הולם. את הניכוס מונעים; את השימוש לרעה תופסים.
concepts:
  - Misappropriation
  - Misuse

## Card

front: מהי הבקרה המרכזית של משפחת Usurpation כולה?
back: Least Privilege — "Grant users the minimum access necessary for tasks". לצדה בקטלוג: Access logging, Regular audits, Digital Rights (DRM), Anomaly detection, Awareness training.
concepts:
  - Usurpation

## Card

front: מהי הסתירה במצגת סביב הנכס שנפגע ב-Usurpation?
back: שקופית 59 מגדירה אותה כאיום על system integrity, אך טבלת המיפוי בשקופית 69 נותנת ל-Usurpation: Confidentiality = High, Integrity = Medium, Availability = Low, Accountability = Medium. שתי הגרסאות בחומר.
concepts:
  - Usurpation
  - Integrity
