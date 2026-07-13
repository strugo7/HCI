---
id: network-model-flashcards
lesson: network-model
---

# כרטיסיות — מודל הרשת: TCP/IP ושכבות התקשורת

## Card

front: מדוע תקשורת רשת בנויה בשכבות?
back: כדי שכל שכבה תפתור בעיה אחת בלבד ותסתיר את פרטיה מהשכבה שמעליה. כך אפשר להחליף מדיום פיזי בלי לגעת באפליקציה, ולהוסיף פרוטוקול חדש בלי לשנות אף נתב.
concepts:
  - TCP/IP

## Card

front: מהן ארבע השכבות של מודל TCP/IP?
back: Application, Transport, Internet ו-Link — כפי שמוגדר ב-RFC 1122.
concepts:
  - TCP/IP

## Card

front: מה ההבדל בין OSI Model ל-TCP/IP?
back: OSI הוא מודל ייחוס בן שבע שכבות (שפה משותפת), ו-TCP/IP הוא המודל בן ארבע השכבות שהאינטרנט מיישם בפועל. המספור שמדברים בו באבטחה לקוח מ-OSI.
concepts:
  - OSI Model
  - TCP/IP

## Card

front: מה חי בשכבה 3 (Network)?
back: כתובות ה-IP והניתוב — Source IP ו-Destination IP. השכבה מעבירה את המנה מרשת לרשת עד ליעד, בלי להתעניין בתוכן.
concepts:
  - TCP/IP

## Card

front: מה חי בשכבה 4 (Transport)?
back: מספרי הפורט ופרוטוקולי TCP/UDP. הכתובת מביאה עד המחשב, והפורט אומר לאיזו תוכנה במחשב. TCP אמין; UDP מהיר וללא הבטחות.
concepts:
  - TCP/IP

## Card

front: מה חי בשכבה 7 (Application)?
back: התוכן האפליקטיבי — בקשת ה-HTTP המלאה: הכתובת המבוקשת, הכותרות, הפרמטרים וגוף הבקשה. גם SQL Injection קיים כאן בלבד.
concepts:
  - TCP/IP

## Card

front: מהו Encapsulation?
back: תהליך שבו כל שכבה עוטפת את המטען שקיבלה מלמעלה בכותרת (header) משלה: HTTP → Segment (כותרת TCP) → Packet (כותרת IP) → Frame (כותרת Ethernet).
concepts:
  - TCP/IP

## Card

front: מהם השמות של יחידת הנתונים בכל שכבה בדרך למטה?
back: בשכבת ה-Transport זה Segment, בשכבת ה-Internet זה Packet, ובשכבת ה-Link זה Frame — כל אחד עוטף את הקודם בכותרת נוספת.
concepts:
  - TCP/IP

## Card

front: מדוע חומת אש בשכבה 3 קוראת את המעטפה ולא את המכתב?
back: בגלל Encapsulation — התוכן עטוף בכותרות TCP ו-IP. חומת אש בשכבה 3 מפרשת רק את הכותרות החיצוניות (כתובות ופורט) ומתייחסת לליבה כמטען אטום.
concepts:
  - Firewall
  - TCP/IP

## Card

front: מדוע הצפנת TLS אינה מונעת ניתוב של המנה?
back: כי TLS מצפין רק את התוכן בשכבה 7. כותרות ה-IP וה-TCP חייבות להישאר גלויות, אחרת אף נתב לא היה יודע לאן להעביר את המנה.
concepts:
  - TCP/IP

## Card

front: באילו שכבות בודק Packet Filter, ומה הוא רואה?
back: בשכבות 3 ו-4. הוא רואה Source IP, Destination IP, פורט ופרוטוקול — ולא את התוכן. מהיר מאוד עם throughput גבוה.
concepts:
  - Firewall

## Card

front: באיזו שכבה בודק WAF / DPI, ומה המחיר?
back: בשכבה 7. הוא קורא את תוכן הבקשה — פרמטרים, כותרות, גוף — ותופס SQL Injection ו-XSS. המחיר: throughput נמוך וחובה לפענח TLS.
concepts:
  - WAF

## Card

front: מה מייחד NGFW במונחי שכבות?
back: הוא מאחד בדיקה בשכבות 3–4 (סינון מנות) יחד עם בדיקה בשכבה 7 (זיהוי אפליקציה, תוכן, IPS) בקופסה אחת.
concepts:
  - NGFW

## Card

front: מדוע משלבים Packet Filter בשכבה 3 עם WAF בשכבה 7?
back: כי הן משלימות: Packet Filter מסנן בזול ובמהירות נפחי תעבורה גדולים, וה-WAF בודק לעומק רק את מה ששרד. זהו Defense in Depth במודל השכבות.
concepts:
  - Firewall
  - WAF
  - Defense in Depth
