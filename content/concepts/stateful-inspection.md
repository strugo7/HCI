---
id: stateful-inspection
title: Stateful Inspection
slug: stateful-inspection
aliases:
  - בדיקת מצב
  - בדיקה מבוססת מצב
  - Stateful Inspection
  - Stateful FW
  - Stateful Firewall
  - Gen 3 firewall
  - Generation 3 firewall
  - Conventional Firewall
  - חומת אש מבוססת מצב
tags:
  - network-security
  - firewall
related:
  - Firewall
  - NGFW
  - IPS
  - Web Application Firewall (WAF)
---

# Stateful Inspection

:::definition
בדיקת מצב (Stateful Inspection) היא מנגנון חומת אש המאפשר או חוסם תעבורה על בסיס
שלושה נתונים: **state, port, protocol**. בשונה מסינון מנות סטטי, כל חבילה נבחנת
בהקשר של החיבור (session) שאליו היא שייכת, ולא כיחידה מנותקת.
:::

## הסבר פשוט

[[Firewall]] קלאסית בודקת כל חבילה בפני עצמה: מאיזה IP היא באה, לאן היא הולכת,
לאיזה פורט. היא אינה זוכרת דבר. חבילה שנראית תקינה — עוברת, בלי קשר לשאלה אם
בכלל התבקשה.

חומת אש מבוססת מצב **זוכרת**. היא יודעת אילו חיבורים פתוחים כרגע ומי פתח אותם,
ולכן היא יכולה לשאול שאלה שהחומה הסטטית לא מסוגלת לשאול: **החבילה הזו שייכת לשיחה
שהתחלנו, או שהיא הופיעה משום מקום?** תשובה שחוזרת משרת שפנינו אליו — מותרת.
אותה חבילה בדיוק, כשאיש לא פנה לשרת — חשודה.

המרצה קורא לחומת אש כזו **"conventional firewall"** — חומת האש ה"רגילה" של ימינו,
ומסמן אותה כ-**Stateful FW (Gen 3)**.

## הסבר טכני

מעבר להחלטת allow/block לפי state, port ו-protocol, המרצה מוסיף שחומת אש מבוססת
מצב **בוחנת מנות ומנטרת** שלושה דברים:

- **Malicious activities** — פעילות זדונית.
- **Suspicious commands** — פקודות חשודות.
- **Questionable session activity patterns** — דפוסי פעילות חשודים ברמת ה-session.

זהו המרכיב השני במשוואת ה-[[NGFW]]:

> Static Packet Filtering + **Stateful Inspection** + Application-level + Intrusion Prevention

וכאן הגבול שלה. המרצה קובע במפורש: **"Standard firewalls — stateful and stateless
— don't perform any packet inspection"** — הן אינן בוחנות את **תוכן** החבילה כדי
לקבוע אם הוא לגיטימי, אלא רק את רמות התעבורה, מקורה וכדומה. לכן Stateful Inspection
לבדה עדיין לא תזהה שמה שרץ על פורט 25 אינו SMTP. לשם כך צריך את שתי השכבות הבאות
במשוואה: **Application-level** ו-**Intrusion Prevention**.

:::example
משתמש פנימי פונה לשרת אינטרנט. חומת האש רושמת את החיבור היוצא בטבלת המצב שלה,
ולכן היא מזהה את תשובת השרת כחלק מאותו session ומעבירה אותה. חבילה זהה לחלוטין
שמגיעה מאותו שרת בלי שאיש פנה אליו — אינה תואמת שום חיבור פתוח, והחומה חוסמת
אותה. חומת אש סטטית, שאינה זוכרת דבר, לא הייתה מבחינה בין שני המקרים.
:::

:::warning
**Stateful אינו Deep Packet Inspection.** חומת אש מבוססת מצב עוקבת אחרי מצב
החיבור — היא **אינה** בודקת את תוכן ה-payload. המרצה אומר זאת מפורשות על שני
הסוגים גם יחד, stateful ו-stateless. מי שבודק תוכן הוא
ה-[[WAF]] בשכבה 7, וה-Application-level של ה-[[NGFW]].
:::

:::tip
**הרחבה שלנו (לא במצגת):** המרצה נותן מספר דור אחד בלבד — **Gen 3** ל-Stateful FW
— ואינו מונה במפורש מהם Gen 1 ו-Gen 2. אל תשננו "שלושת דורות חומת האש" כרשימה;
מה שכן צריך לדעת הוא **סדר ההצטברות** שהוא כן נותן, במשוואת ה-NGFW.
:::

:::diagram
תרשים בשלוש שורות, אותה טופולוגיה Client → Firewall → Server בכל שורה.
שורה 1 (**Static Packet Filtering**): החומה בוחנת חבילה בודדת ומולה תווית "IP,
Port, Protocol". אין זיכרון — מצויר סל ריק שכותרתו "no state".
שורה 2 (**Stateful Inspection**): לצד החומה מצוירת טבלת מצב ובה שורה אחת:
"Client → Server · ESTABLISHED". חץ תשובה מהשרת מסומן בירוק ומחובר בקו מקווקו אל
שורת הטבלה; חץ יזום מהשרת, שאין לו שורה תואמת, נעצר באדום.
שורה 3: מחסנית שכבות 1–5 (Physical, Data Link, Internet Protocol, Transport,
Application) ניצבת ליד החומה, כשהחיצים של Stateful מגיעים עד שכבת ה-Transport
ועוצרים — ומעליהם כיתוב: "Application-level — כאן Stateful כבר לא מגיעה".
:::
