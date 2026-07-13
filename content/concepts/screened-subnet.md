---
id: screened-subnet
title: Screened Subnet
slug: screened-subnet
aliases:
  - DMZ בשתי חומות אש
  - שתי חומות אש
  - Screened Subnet
  - Dual Firewall DMZ
  - Dual Firewall
  - Outer/Inner Firewall
  - Outer Firewall
  - External FW
tags:
  - perimeter
  - dmz
  - architecture
related:
  - DMZ
  - Three-Legged DMZ
  - Internal Firewall
  - Firewall
  - Defense in Depth
---

# Screened Subnet

:::definition
ארכיטקטורת DMZ שבה שתי חומות אש נפרדות מוצבות בטור, וה-DMZ ממוקם ביניהן:
Firewall חיצוני (Outer / External FW) מפריד בין האינטרנט ל-DMZ, ו-Firewall פנימי
(Inner / Internal FW) מפריד בין ה-DMZ לרשת הפנימית המהימנה.
:::

## הסבר פשוט

במקום שומר אחד בשלוש דלתות, יש כאן שני שומרים בשתי דלתות עוקבות, וה-DMZ הוא
החדר שביניהן. המרצה קורא לזה "DMZ sandwiched between layers" — ה-DMZ כלוא בין
שתי שכבות האכיפה.

המשמעות המעשית: **אין שום נתיב מהאינטרנט לרשת הפנימית שאינו עובר דרך שתי חומות
אש**. תוקף שהצליח לעקוף את הראשונה מוצא את עצמו ב-DMZ — ומול מכשיר אכיפה שני,
שהוא עוד לא נגע בו.

## הסבר טכני

ארבעת המאפיינים שהמרצה מונה: שתי חומות אש נפרדות בטור, DMZ "sandwiched" ביניהן,
ניהול מדיניות עצמאי לכל אחת (Independent policy management), ו-Audit trail בשתי
נקודות החנק.

היתרונות: **Defense in depth**, **Vendor diversity**, **Better logging**.
החסרונות שהמרצה עצמו רושם, ואסור לשכוח אותם: **Higher cost**, **Complex ops**,
**More latency**.

המרצה מסמן את הארכיטקטורה הזו במפורש, בקופסה ירוקה, כ-**ENTERPRISE STANDARD**:
"Two firewalls provide defense in depth. Even if external firewall is compromised,
internal firewall protects core assets." בטבלת ההשוואה שלו היא מקבלת 4 מתוך 5
כוכבי אבטחה, ומיועדת ל-"Mid-to-large enterprises, financial institutions,
healthcare organizations".

:::important
**Vendor Diversity** — שתי חומות האש צריכות להיות של **ספקים שונים**. בלשון
המרצה: "Use different vendors for each firewall to reduce single-vulnerability
exposure. **A zero-day in one vendor won't compromise both layers.**"

שתי חומות אש מאותו דגם ומאותו ספק נופלות מאותה חולשה, ואז שתי השכבות שוות
לשכבה אחת. בטבלת החולשות הנפוצות המרצה אכן מסמן "Single firewall vendor both
layers" כסיכון.
:::

:::example
בנק המאפשר ללקוחות פעולות מרחוק מציב את שרתי ה-Front-End שלו ב-DMZ. ה-Firewall
החיצוני (Palo Alto) מתיר מהאינטרנט רק HTTPS אל אותם שרתים. ה-Firewall הפנימי
(Check Point — ספק אחר בכוונה) מתיר מה-DMZ אל הרשת הפנימית רק קריאות API אל
שרת יישום מוגדר, בפורט אחד. תוקף שניצל חולשת zero-day ב-Palo Alto והשתלט על
ה-Firewall החיצוני עדיין עומד מול Check Point — שלא הושפע מאותה חולשה.
:::

:::warning
Screened Subnet אינו "שתי חומות אש" בלבד — הוא **שתי חומות אש שה-DMZ ביניהן**.
ארגון שמציב שתי חומות אש בטור ומשאיר את ה-DMZ תלוי כרגל צדדית מהחיצונית לא בנה
Screened Subnet, ולא קיבל את ההפרדה שהיא מספקת.
:::

:::diagram
שרשרת ליניארית משמאל לימין: ענן "רשת פנימית" (Trusted LAN) עם אשכול תחנות →
מכשיר Firewall המסומן **Inner Firewall** → קופסת **DMZ** ובה שני שרתים →
מכשיר Firewall שני המסומן **Outer Firewall** → ענן אינטרנט (WAN).
מעל כל אחת משתי חומות האש מסומנת נקודת חנק (choke point) עם אייקון לוג, לציון
ה-Audit trail הכפול. הדגשה חזותית: אין קו עוקף — כל תעבורה מהאינטרנט לרשת
הפנימית חייבת לחצות את שתי חומות האש ואת ה-DMZ שביניהן.
:::
