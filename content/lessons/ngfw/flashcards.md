---
id: ngfw-flashcards
lesson: ngfw
---

# כרטיסיות — NGFW חומת אש מדור חדש

## Card

front: מהן שלוש אי-השוויונות ששברו את החומה הקלאסית?
back: **Ports ≠ Applications** · **IP Addresses ≠ Users** · **Packets ≠ Content**. כל אחת שוברת אחד משלושת הדברים שחומת אש קלאסית יודעת לבדוק.
concepts:
  - NGFW
  - Firewall

## Card

front: מהי משוואת ה-NGFW?
back: **Static Packet Filtering + Stateful Inspection + Application-level + Intrusion Prevention** — ארבעה מרכיבים בקופסה אחת. המשוואה מצטברת.
concepts:
  - NGFW
  - Stateful Inspection
  - IPS

## Card

front: מהי Stateful Inspection?
back: חומת אש שמתירה או חוסמת תעבורה לפי **state, port, protocol** — היא זוכרת אילו חיבורים פתוחים ושואלת: האם החבילה שייכת לשיחה קיימת? המרצה מסמן אותה כ-Stateful FW (Gen 3).
concepts:
  - Stateful Inspection

## Card

front: מה Stateful Inspection **אינה** בודקת?
back: היא **אינה packet inspection**. היא עוקבת אחרי מצב החיבור, לא אחרי תוכן ה-payload. לא תדע שמה שרץ על פורט 25 אינו SMTP. לכן דרושים Application-level ו-IPS.
concepts:
  - Stateful Inspection

## Card

front: האם חומת אש רגילה מבצעת packet inspection?
back: לא. "Standard firewalls — **stateful and stateless — don't perform any packet inspection**." מי שבוחן תוכן הוא ה-IPS (NIPS מבצע packet inspection + anomaly/signature/policy).
concepts:
  - Stateful Inspection
  - IPS

## Card

front: האם חומת אש מייתרת IPS (או להפך)?
back: לא. "It's a misconception... **You need both solutions.**" הן חוסמות בשתי רמות שונות — פרוטוקול ופורט מול תוכן החבילה. אחת אינה מחליפה את השנייה.
concepts:
  - IPS
  - Firewall

## Card

front: מהו Technology Sprawl & Creep, ומדוע נפסל?
back: הוספת ערימת קופסאות נפרדות (URL filtering, AV, DLP, Proxy, IPS). נפסל: "More stuff doesn't solve the problem" · לכל "עוזר" ראייה **חלקית** בלבד · מורכב ויקר לתחזק.
concepts:
  - NGFW

## Card

front: מה הקשר בין NGFW ל-UTM?
back: **שני שמות לאותו דבר.** "next-generation firewalls (NGFW) or... unified threat management (UTM) firewalls. **Neither is a concrete standard**" — קונספט של פתרון אבטחה שלם במערכת אחת מנוהלת מרכזית, לא תקן.
concepts:
  - NGFW

## Card

front: מהו App-ID, ומה ההבדל מכלל Legacy?
back: App-ID כותב כלל על **אפליקציה** ולא על פורט: **ALLOW SMTP** במקום **ALLOW Port 25**. הוא מזהה את האפליקציה regardless of port, protocol, evasive tactic or SSL.
concepts:
  - NGFW

## Card

front: מדוע C&C עובר ב-Legacy Firewall ונחסם ב-NGFW?
back: Legacy חוסם **רק את מה שהוגדר לו לחסום** (C&C ≠ Bittorrent → Allow על פורט 25). NGFW מתיר **רק את מה שהוגדר לו להתיר** (C&C ≠ SMTP → Deny). "Unknown traffic detected and blocked".
concepts:
  - NGFW
  - Command & Control (C&C)

## Card

front: מה NGFW מדווח על C&C — ומה זה מלמד על גישת App-ID?
back: **"Unknown traffic detected and blocked"** — הוא לא "מזהה C&C", הוא מזהה שזה **לא SMTP** ודי בכך. בגישת App-ID: "לא זיהיתי" = "לא מתיר".
concepts:
  - NGFW
  - Command & Control (C&C)

## Card

front: מה NGFW עדיין נשאר עיוור אליו ("blind to the scope of compromise")?
back: Sleep Techniques · Unknown Protocols · Encryption · Polymorphism · Lateral Movement. "Initial Disposition = Clean. If actual Disposition is Bad = Too Late!!" — קובץ שאושר בכניסה ומתגלה כזדוני אחר כך כבר בפנים.
concepts:
  - NGFW

## Card

front: מהי התשובה שהמבחן מחפש ליתרון של NGFW על חומת אש מסורתית?
back: זיהוי וחסימת איומים **ברמת האפליקציה** (Application-level / DPI) — לא ביצועים ולא הצפנה. App-ID מזהה את האפליקציה עצמה, לא את הפורט.
concepts:
  - NGFW
