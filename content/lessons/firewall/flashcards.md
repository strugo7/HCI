---
id: firewall-flashcards
lesson: firewall
---

# כרטיסיות — חומת אש: סינון מנות וטבלאות כללים

## Card

front: מהי חומת אש (Firewall) בשכבה 3?
back: רכיב המבודד את הרשת הפנימית מרשת לא-מהימנה ובוחן כל מנה מול טבלת כללים — מעביר (forward) חלק וחוסם (drop) אחרים.
concepts:
  - Firewall

## Card

front: על אילו ארבעה שדות מחליטה חומת אש בשכבה 3 (Packet Filtering)?
back: Source IP, Destination IP, Port ו-Protocol — כולם בכותרת המנה.
concepts:
  - Firewall

## Card

front: מה חומת אש בשכבה 3 לעולם אינה בודקת?
back: את תוכן המנה (payload). היא בודקת את המעטפה, לא את המכתב — לכן נוזקה או SQL Injection בתוך תעבורה מותרת חומקים ממנה.
concepts:
  - Firewall

## Card

front: מדוע חומת אש בשכבה 3 מכונה "Stateless"?
back: מפני שהיא שופטת כל מנה בפני עצמה, בלי לזכור מנות או חיבורים קודמים. זכירת מצב החיבור היא Stateful Inspection, ששייכת ל-NGFW.
concepts:
  - Firewall

## Card

front: מה ההבדל בין Host-based ל-Network-based firewall?
back: Host-based היא תוכנה על מחשב בודד ומגנה עליו בלבד; Network-based היא שילוב חומרה ותוכנה בגבול הרשת ומגנה על רשת שלמה.
concepts:
  - Firewall

## Card

front: מהם ארבעת סוגי הפריסה של חומת אש שהמרצה מונה?
back: Host-based (מחשב בודד), Network-based (רשת שלמה), Stand-alone (חומרה ייעודית) ו-Cloud (בענן).
concepts:
  - Firewall

## Card

front: מהי ACL (Access Control List) בחומת אש?
back: רשימת כללים מסודרת; כל שורה מתירה (ALLOW) או חוסמת (DENY) סוג מנה לפי כתובת, פרוטוקול, יעד ופורט.
concepts:
  - Firewall

## Card

front: כשמנה נבדקת מול טבלת ACL — איזו שורה קובעת את גורלה?
back: השורה הראשונה שמתאימה למנה. חומת האש עוצרת בה ומיישמת אותה, ואינה ממשיכה לחפש — לכן סדר השורות מכריע.
concepts:
  - Firewall

## Card

front: מה המשמעות של הערך ANY בטבלת ACL?
back: כרטיס כללי (wildcard) המתאים לכל ערך בשדה — כל כתובת, כל יעד או כל פורט, לפי העמודה.
concepts:
  - Firewall

## Card

front: מהי מדיניות Implicit Deny?
back: "deny by default" — כל מה שלא הותר במפורש נחסם. הרשימה מכילה רק אישורים; זו allow list (whitelist), גישת ברירת המחדל הבטוחה.
concepts:
  - Firewall

## Card

front: מהי מדיניות Implicit Allow?
back: "allow by default" — כל מה שלא נחסם במפורש מותר. הרשימה מכילה רק חסימות; זו block list (blacklist), נוחה אך מסוכנת.
concepts:
  - Firewall

## Card

front: allow list מול block list — מי בטוח יותר ולמה?
back: allow list (Implicit Deny) בטוח יותר: איום שלא נצפה מראש נחסם אוטומטית. ב-block list כל מה שלא הוסף לרשימה השחורה עובר בחופשיות.
concepts:
  - Firewall

## Card

front: מנה TCP אל פורט 80 מגיעה מכתובת שמופיעה בשורת DENY. האם היא תעבור?
back: לא. כתובת המקור בשורת ה-DENY חוסמת אותה, למרות שהפורט 80 מותר למקורות אחרים — הכתובת קובעת, לא הפורט.
concepts:
  - Firewall

## Card

front: מדוע חומת אש היקפית לבדה אינה מספיקה?
back: חלק מהתקיפות חומקות דרכה (Firewall Breaches), וברגע שתוקף בפנים אין דבר שיעצור אותו. לכן משלבים שכבות נוספות — עקרון ה-Defense in Depth.
concepts:
  - Firewall
  - Defense in Depth
