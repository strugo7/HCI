---
id: proxy-firewall-flashcards
lesson: proxy-firewall
---

# כרטיסיות — Proxy Firewall

## Card

front: מהו המנגנון המרכזי של Proxy Firewall?
back: הוא מסיים (terminates) את חיבור הלקוח ופותח חיבור שני, נפרד, אל השרת בשם הלקוח. הצדדים לעולם אינם מדברים ישירות.
concepts:
  - Proxy Firewall

## Card

front: מהו ההבדל המבני בין Proxy Firewall ל-Firewall בשכבה 3?
back: חומת אש בשכבה 3 מעבירה את אותה מנה הלאה לאחר בדיקת כותרת; Proxy אינו מעביר את המנה כלל — הוא מנתק ומחבר מחדש בחיבור שני משלו.
concepts:
  - Proxy Firewall
  - Firewall

## Card

front: מה מאפשר ל-Proxy לראות את מלוא התוכן האפליקטיבי?
back: עצם ניתוק החיבור. מי שקורא ומרכיב מחדש את הבקשה — רואה בהכרח את כל תוכנה, לא רק את הכותרת.
concepts:
  - Proxy Firewall

## Card

front: מה ההבדל בין Forward Proxy ל-Reverse Proxy?
back: Forward Proxy יושב מול הלקוחות ושולט ביציאתם החוצה; Reverse Proxy יושב מול השרת, מסתיר אותו, ומתווך את הפניות הנכנסות.
concepts:
  - Proxy Firewall

## Card

front: היכן ממוקם לרוב Reverse Proxy, ולמה?
back: ב-DMZ. כך התוקף מדבר עם המתווך ולא נוגע בשרת הפנימי האמיתי.
concepts:
  - Proxy Firewall
  - DMZ

## Card

front: מה היחס בין Proxy Firewall ל-WAF?
back: ה-Proxy הוא השער הכללי בשכבה 7 (כל פרוטוקול שנכתב לו מנוע); ה-WAF הוא צאצא מתמחה שלו לתעבורת web ולחתימות התקפה כמו SQL Injection.
concepts:
  - Proxy Firewall
  - WAF

## Card

front: מדוע Proxy Firewall איטי מחומת אש בשכבה 3?
back: פירוק כל בקשה עד שכבה 7 והרכבתה מחדש עולים זמן ומשאבים — throughput נמוך יותר. לכן אינו מתאים לצווארי בקבוק של נפח ומהירות.
concepts:
  - Proxy Firewall

## Card

front: מדוע Proxy Firewall "חייב לסיים TLS"?
back: כדי לראות תוכן מוצפן הוא מוכרח לפענח את ה-TLS, לבדוק, ולהצפין מחדש. בלי כך התוכן נראה לו כרעש חסר משמעות.
concepts:
  - Proxy Firewall

## Card

front: למה סיום TLS הוא גם סיכון?
back: ה-Proxy חייב להחזיק מפתחות ולראות את התעבורה בטקסט גלוי ברגע הבדיקה — ולכן הוא נקודת אמון מרכזית ויעד יקר ערך.
concepts:
  - Proxy Firewall

## Card

front: מה משמעות "מודעות לפרוטוקול" (per-protocol) ב-Proxy?
back: ה-Proxy זקוק למנוע ייעודי לכל פרוטוקול שהוא מבין (HTTP, FTP, SMTP). פרוטוקול לא-סטנדרטי שאין לו מנוע לא ייבדק לעומק.
concepts:
  - Proxy Firewall

## Card

front: לאיזה צד בטבלת המרצה (שקופית 30) שייך Proxy Firewall?
back: לצד שכבה 7 — הוא בוחן את התוכן שבתוך המנות, בניגוד לשכבה 3 שמסננת לפי כתובות IP ופורטים.
concepts:
  - Proxy Firewall

## Card

front: האם Proxy Firewall מחליף את חומת האש בשכבה 3?
back: לא. הוא מוצב היכן שבדיקת תוכן שווה את המחיר; שכבה 3 עדיין עוצרת בזול נפחי תעבורה גדולים. ברוב הפריסות היכולת נבלעת ב-NGFW.
concepts:
  - Proxy Firewall
  - NGFW
