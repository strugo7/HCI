---
id: waf-flashcards
lesson: waf
---

# כרטיסיות — WAF, בדיקת תוכן בשכבה 7

## Card

front: מה בודק WAF שחומת אש בשכבה 3 אינה בודקת?
back: את **תוכן** החבילה (הבקשה האפליקטיבית), ולא רק את הכותרת — IP, פורט ופרוטוקול.
concepts:
  - WAF

## Card

front: כיצד נקרא המנגנון שבו WAF בודק את תוכן החבילה?
back: Deep Packet Inspection (DPI) — בדיקה עמוקה של מטען החבילה. זהו המונח שהמבחן נוקב בו בשמו.
concepts:
  - WAF

## Card

front: באיזו שכבה פועל WAF, ובאיזו שכבה פועל Firewall קלאסי?
back: WAF בשכבה 7 (שכבת האפליקציה); Firewall קלאסי בשכבה 3 (כתובות ופורטים).
concepts:
  - WAF
  - Firewall

## Card

front: מהם שלושת השמות שהמרצה מפריד ביניהם אך כולם מבטאים בדיקת תוכן בשכבה 7?
back: Layer 7 firewall, Application Gateway (Proxy FW), ו-WAF. שלושתם רעיון אחד.
concepts:
  - WAF

## Card

front: אילו ארבע התקפות ה-Application Firewall (WAF) בודק?
back: SQL Injection, Cross-site Scripting (XSS), Cookie Tampering, Parameter Tampering.
concepts:
  - WAF

## Card

front: מדוע SQL Injection על פורט 443 עובר את חומת האש בשכבה 3?
back: כי מבחינת הכותרות זו חבילת HTTPS תקינה על פורט מותר. ההתקפה מסתתרת ב**תוכן**, ששכבה 3 אינה קוראת.
concepts:
  - WAF
  - Firewall

## Card

front: לפי טבלת שכבה 3 מול שכבה 7 — למי throughput גבוה יותר ולמי נמוך?
back: שכבה 3 — throughput גבוה, מהיר (כותרות בלבד). שכבה 7 — throughput נמוך, איטי (בגלל DPI).
concepts:
  - WAF
  - Firewall

## Card

front: מהו תחום האיומים של כל שכבה בטבלת ההשוואה?
back: שכבה 3 — איומים כלליים ובקרת גישה בסיסית. שכבה 7 — איומים אפליקטיביים מורכבים (SQL Injection, XSS).
concepts:
  - WAF
  - Firewall

## Card

front: מדוע WAF חייב "לסיים TLS" (TLS termination)?
back: כי בדיקת תוכן דורשת לקרוא את התוכן, ותעבורת HTTPS מוצפנת. בלי פענוח ה-TLS ה-WAF רואה רעש חסר משמעות.
concepts:
  - WAF

## Card

front: מהו מחיר בדיקת התוכן בשכבה 7?
back: היא איטית ויקרה (throughput נמוך), ומחייבת סיום TLS כדי לראות תעבורה מוצפנת.
concepts:
  - WAF

## Card

front: האם WAF מחליף את חומת האש בשכבה 3?
back: לא — הוא משלים אותה בשכבה אחרת. שכבה 3 מטפלת בכתובות ונפחים, שכבה 7 בתוכן. NGFW מאחד את שתיהן.
concepts:
  - WAF
  - NGFW

## Card

front: מדוע WAF הוא קו הגנה מרכזי נגד Web Shell?
back: כי Web Shell מועלה דרך HTTP תקין על פורט מותר; רק WAF, הבודק את תוכן הבקשה, יכול לזהות את דפוס ההעלאה הזדוני.
concepts:
  - WAF
  - Web Shell

## Card

front: מהי הצורה המוקדמת של WAF שהמרצה מציג, ולפי מה היא סיננה?
back: Application Gateway (Proxy FW) — "gateway for a specific application", שסינן לפי Traffic contents (תוכן התעבורה).
concepts:
  - WAF

## Card

front: מהי מלכודת המבחן כשפרוטוקול מותר מנוצל להברחת נוזקה?
back: הפתרון אינו לבטל הצפנה או להתעלם מהתוכן, אלא להפעיל DPI וסינון אפליקטיבי — לבדוק את התוכן גם בתוך פורט מותר.
concepts:
  - WAF
