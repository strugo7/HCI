---
id: incident-response-flashcards
lesson: incident-response
---

# כרטיסיות — תגובה לאירועי אבטחה

## Card

front: מה ההבדל בין Event, Alert ו-Incident?
back: Event = תצפית גולמית (רובן תקינות). Alert = event שתאם כלל או חתימה חשודה. Incident = אירוע שאושר בחקירה כפגיעה ממשית. כל incident הוא event, אך רוב ה-events אינם incidents.
concepts:
  - Incident Response

## Card

front: מדוע IDS אינו יכול "להכריז על incident"?
back: כי IDS מפיק Alert בלבד — הוא אינו יודע אם ההתראה נכונה (זו המשמעות של False Positive). ההכרזה על incident היא החלטה אנושית שמתקבלת אחרי triage ב-SOC.
concepts:
  - Incident Response
  - SOC

## Card

front: מהם ארבעת שלבי מחזור החיים של NIST SP 800-61?
back: Preparation · Detection & Analysis · Containment, Eradication & Recovery · Post-Incident Activity. התהליך מחזורי — הלקחים מזינים את ההכנה הבאה.
concepts:
  - Incident Response

## Card

front: מהם ששת שלבי SANS PICERL, ובמה הם נבדלים מ-NIST?
back: Preparation · Identification · Containment · Eradication · Recovery · Lessons Learned. ההבדל היחיד: SANS מפצל את השלב השלישי של NIST (Containment, Eradication & Recovery) לשלושה שלבים נפרדים.
concepts:
  - Incident Response

## Card

front: מדוע Preparation הוא השלב שקובע את הצלחת התגובה?
back: כי בזמן אירוע אין זמן להכין דבר — מה שלא הוכן מראש לא יהיה. Playbook, Runbook, עץ אנשי קשר, גיבויים שנבדקו וסמכויות מוגדרות הם ההבדל בין שבע שעות לשבע דקות עד התגובה.
concepts:
  - Incident Response

## Card

front: מה ההבדל בין Playbook ל-Runbook?
back: Playbook = החלטות שהתקבלו מראש לכל סוג אירוע (מי מחליט, מה עושים, באיזה סדר). Runbook = ההוראות התפעוליות הקונקרטיות שמממשות אותו (איך בדיוק מבודדים, איזו פקודה מריצים).
concepts:
  - Incident Response

## Card

front: מדוע גיבוי "שקיים" אינו מספיק בהכנה לאירוע?
back: כי גיבוי שלא שוחזר בפועל לאחרונה הוא הנחה, לא נכס. רק גיבוי שנבדק בשחזור מוצלח נחשב מוכן — במיוחד מול Ransomware, שם השחזור הוא קו ההגנה האחרון.
concepts:
  - Incident Response
  - Ransomware

## Card

front: מהו הסחר-חליפין המרכזי בשלב ה-Containment?
back: בידוד או כיבוי מיידי עוצרים את הנזק אך משמידים ראיות נדיפות — הזיכרון (RAM), התהליכים הפעילים וכתובת ה-C&C נעלמים בכיבוי. לכן ההחלטה היא מה לאסוף לפני הבידוד.
concepts:
  - Incident Response
  - Digital Forensics

## Card

front: מה מכריע בין בלימה קצרת-טווח לבלימה ארוכת-טווח?
back: קצב הנזק. כופרה שמצפינה בזמן אמת ⇒ בלימה קצרת-טווח מיד (מנתקים). תוקף שקט שיושב חודשיים ומדליף ⇒ בלימה ארוכת-טווח: אוספים ראיות ומפים את ההיקף תחילה, כי ניתוק חפוז יזהיר אותו וימחק ראיות.
concepts:
  - Incident Response

## Card

front: מה ההבדל בין Eradication ל-Recovery, ומדוע הסדר חשוב?
back: Eradication מוציא את התוקף ואת שורש הבעיה מהסביבה; Recovery מחזיר את השירות לפעולה. השבה לפני סילוק = הדבקה חוזרת — מחזירים לרשת מכונה שהדלת האחורית עדיין בתוכה, או משחזרים גיבוי שכבר נגוע.
concepts:
  - Incident Response

## Card

front: מדוע לא לדלג על Lessons Learned / post-mortem?
back: כי הפלט שלו (כלל SIEM חדש, Playbook מעודכן, חולשה שנסגרה בכל הארגון) הוא הקלט של Preparation הבא. דילוג שובר את מחזוריות התהליך ומבטיח שאותו אירוע יחזור. הסקירה חייבת להיות blameless — לתקן מערכת, לא להעניש אדם.
concepts:
  - Incident Response

## Card

front: כיצד הצפת False Positive מייצרת False Negative בתגובה לאירועים?
back: הצפת התראות שווא גורמת ל-Alert Fatigue: האנליסט מפסיק לקרוא ברצינות, וההתראה האמיתית נקברת יחד עם השווא. התוצאה בעולם זהה ל-False Negative — הייתה תקיפה, ואיש לא הגיב.
concepts:
  - False Positive
  - SOC

## Card

front: מהם IOCs, ואיך הם משמשים בשלב הגילוי והניתוח?
back: Indicators of Compromise — סימני היכר קונקרטיים של פריצה (hash של קובץ, IP של C&C, domain). ברגע שזוהה IOC אחד, מחפשים אותו בכל הארגון כדי לקבוע את היקף הפגיעה (scope) — כמה מכונות נגועות, לא רק זו שהתריעה.
concepts:
  - Incident Response

## Card

front: מהו עקרון סדר התנודתיות (Order of Volatility)?
back: אוספים ראיות מהתנודתי ביותר (אוגרי מעבד, RAM, חיבורים פעילים) אל היציב ביותר (דיסק, יומנים מרוחקים, מדיה מאורכבת), כי התנודתי נעלם ראשון. מוגדר ב-RFC 3227.
concepts:
  - Digital Forensics

## Card

front: מהי שרשרת הראיות (Chain of Custody)?
back: תיעוד רצוף של כל נגיעה בראיה — מי אסף, מתי, באיזה כלי, מי החזיק ומי בדק — עם ערך גיבוב (hash) לכל פריט. שרשרת שנקטעה עלולה לפסול את הראיה, גם אם היא נכונה עובדתית.
concepts:
  - Digital Forensics

## Card

front: מה עושה SIEM, ובמה הוא נבדל מ-SOC?
back: SIEM היא המערכת שאוספת, מנרמלת ומצליבה (correlation) לוגים מכל המקורות. SOC הם האנשים והתהליך שיושבים מולה, מבצעים triage ומכריזים על אירוע. אפשר לקנות SIEM; אי אפשר לקנות SOC.
concepts:
  - SIEM
  - SOC

## Card

front: מהו CSIRT / CERT, ומדוע אינו צוות טכני בלבד?
back: Computer Security Incident Response Team — הצוות שמפעיל את תהליך התגובה. הוא חוצה-ארגוני: לצד אנליסטים ו-Forensics נדרשים IT, ייעוץ משפטי (דיווח לרגולטור), דוברות והנהלה (סמכות להשבית שירות). אירוע רציני מפעיל החלטות שאינן טכניות.
concepts:
  - Incident Response
