---
id: ids-ips-flashcards
lesson: ids-ips
---

# כרטיסיות — IDS מול IPS

## Card

front: מה ההבדל המהותי בין IDS ל-IPS?
back: מיקום, לא איכות זיהוי. IDS יושב out-of-band ומזהה ומתריע בלבד (no blocking); IPS יושב inline על נתיב התעבורה וגם חוסם.
concepts:
  - IDS
  - IPS

## Card

front: מדוע IDS אינו יכול לחסום, גם אם זיהה מתקפה בוודאות מוחלטת?
back: כי הוא רואה רק עותק של התעבורה (דרך SPAN port או TAP); המקור כלל אינו עובר דרכו. אין לו על מה "ללחוץ" — זו מגבלה מבנית, לא החלטה.
concepts:
  - IDS

## Card

front: היכן יושב ה-IPS, ומה המחיר של המיקום הזה?
back: inline — על נתיב התעבורה, כל חבילה עוברת דרכו. המחיר: השהיה (latency), וסיכון לזמינות אם טעה וחסם תעבורה לגיטימית.
concepts:
  - IPS

## Card

front: מדוע False Positive אינו אותו דבר ב-IDS וב-IPS?
back: ב-IDS הוא רעש שמוביל ל-alert fatigue; ב-IPS הוא חסימה של תעבורה לגיטימית — אותה שגיאה בדיוק, מחיר אחר לגמרי.
concepts:
  - False Positive
  - IDS
  - IPS

## Card

front: האם IDS/IPS מחליפים את ה-Firewall?
back: לא. הם משלימים אותו. ה-Firewall חוסם ברמת פורט ופרוטוקול; IPS ברמת תוכן החבילה. "You need both."
concepts:
  - IDS
  - IPS
  - Firewall

## Card

front: אילו פעולות IPS מבצע בפועל?
back: Drop packets / block flows, Reset TCP connections, Rate-limit, Quarantine an endpoint.
concepts:
  - IPS

## Card

front: מהו detect-only mode ולמה מפעילים אותו?
back: הרצת IPS במצב שמזהה ומדווח בלי לחסום. מפעילים אותו תחילה כדי לכייל, כי שגיאות חסימה עלולות לגרום ל-outages. "IPS is powerful — treat it like a production change."
concepts:
  - IPS

## Card

front: מה רואה NIDS ומה רואה HIDS?
back: NIDS רואה תעבורה — מה שעובר בין המכונות (התמונה הגדולה). HIDS רואה פעילות מערכת על מארח בודד — תהליכים, קבצים, כניסות, פקודות shell.
concepts:
  - NIDS
  - HIDS

## Card

front: מהו היתרון המרכזי של NIDS על HIDS?
back: הוא רואה תקיפות שמתרחשות בין מכשירים — סריקת פורטים, תנועה רוחבית (Lateral Movement). חיישן בודד מכסה תת-רשת שלמה.
concepts:
  - NIDS
  - Lateral Movement

## Card

front: מדוע HIDS הוא החזק ביותר מול Insider Threat?
back: כי שימוש לרעה בגישה מורשית נראה תקין לחלוטין ברמת הרשת, אך חריג ברמת המארח — תהליך, קובץ או פקודה. HIDS רואה מעשים, לא רק חבילות.
concepts:
  - HIDS
  - Insider Threat

## Card

front: על אילו מנגנוני OS auditing נשען HIDS?
back: EventLog (יומני Windows), Health (CPU, זיכרון, Swap), ו-Ps (תהליכים רצים), וכן ניתוח פעילות משתמש כמו פקודות shell.
concepts:
  - HIDS

## Card

front: כיצד NIDS מתמודד עם תעבורה מוצפנת (TLS/HTTPS)?
back: הוא אינו מפענח אותה. הוא מנתח מטא-דאטה: תעודות, טביעות אצבע, תזמון, נפח ויעדים — "envelopes, not letters".
concepts:
  - NIDS

## Card

front: מלכודת מבחן — האם NIDS מפענח TLS בזמן אמת?
back: לא, ולעולם לא. הוא אינו מחזיק את מפתחות המשתמשים. פענוח, אם בכלל, נעשה ברכיב TLS Inspection נפרד שמתפקד כ-proxy, לא בחיישן ה-NIDS.
concepts:
  - NIDS

## Card

front: "המערכת זיהתה, ההתראה נוצרה, והנזק בכל זאת קרה." איפה הכשל?
back: בצינור התגובה, לא במנוע הזיהוי. ההתראה לא הגיעה לטיפול — סף העלאה גבוה מדי או alert fatigue. "IDS is detection. You still need response."
concepts:
  - IDS
