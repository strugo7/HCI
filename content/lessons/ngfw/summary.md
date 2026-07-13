---
id: ngfw-summary
lesson: ngfw
---

:::summary
[[Firewall]] קלאסית מחליטה לפי פורט, פרוטוקול וכתובת IP — והעולם שבר בדיוק את
שלושת אלה: **Ports ≠ Applications, IP Addresses ≠ Users, Packets ≠ Content**.
כשכל יישום יודע לרוץ מעל פורט 80 או 443, החומה עדיין חוסמת אך כבר לא רואה. הפתרון
אינו להוסיף עוד קופסאות (**Technology Sprawl & Creep** — "עוד ציוד לא פותר את
הבעיה"; לכל "עוזר" יש ראייה חלקית), אלא לרכז את כל ההגנה במערכת אחת מנוהלת מרכזית:
[[NGFW]], שהמרצה מציין במפורש שהוא אותו דבר בדיוק כמו **UTM**, ושאף אחד משני
השמות אינו תקן.

המשוואה שיש לדעת: **Static Packet Filtering + Stateful Inspection +
Application-level + Intrusion Prevention**, בקופסה אחת. [[Stateful Inspection]]
(שהמרצה מסמן כ-Gen 3) מוסיפה זיכרון של חיבורים — allow/block לפי **state, port,
protocol** — אך היא **אינה** בודקת תוכן: "standard firewalls, stateful and
stateless, don't perform any packet inspection". רק שני המרכיבים האחרונים במשוואה
סוגרים את הפער, ולכן חומת אש ו-[[IPS]] אינן מחליפות זו את זו — לפי המרצה, "you
need both".

הביטוי המעשי הוא **App-ID**: הכלל הוא "ALLOW SMTP" ולא "ALLOW Port 25". Legacy
Firewall חוסם רק את מה שהוגדר לו לחסום, ולכן SSH, Skype, Ultrasurf ותקשורת
[[Command and Control]] כולם עוברים לו על פורט 25; ה-NGFW מתיר רק את מה שהוגדר
לו להתיר, ולכן כל מה שאינו SMTP נחסם ומדווח. זו התשובה שהמבחן מחפש: היתרון של
NGFW על פני חומת אש מסורתית הוא **זיהוי וחסימת איומים ברמת האפליקציה** — לא
ביצועים, לא צריכת משאבים ולא הצפנה.
:::
