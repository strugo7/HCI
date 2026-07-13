---
id: ngfw
title: NGFW
slug: ngfw
aliases:
  - חומת אש מדור חדש
  - NGFW
  - Next-Generation Firewall
  - Next Generation Firewall
  - NG-FW
  - New Generation Firewall
  - UTM
  - Unified Threat Management
  - UTM Firewall
  - חומת אש מאוחדת
  - App-ID
tags:
  - network-security
  - firewall
  - perimeter
related:
  - Firewall
  - Stateful Inspection
  - Web Application Firewall (WAF)
  - IPS
  - IDS
  - Command & Control (C&C)
  - DMZ
---

# NGFW

:::definition
חומת אש מדור חדש (Next-Generation Firewall — NGFW) היא מערכת אחת, מנוהלת מרכזית,
המרכזת בתוכה פתרון אבטחת רשת שלם: סינון מנות סטטי (Static Packet Filtering),
[[Stateful Inspection]], בדיקה ברמת האפליקציה (Application-level) ומניעת חדירות
([[IPS]]). זהו קונספט ולא תקן קונקרטי, ואותו קונספט עצמו מכונה גם UTM (Unified
Threat Management).
:::

## הסבר פשוט

חומת האש הקלאסית שואלת שאלה אחת: **דרך איזה פורט זה מגיע?** אם הכלל אומר "פורט 25
מותר" — כל מה שיגיע לפורט 25 יעבור. הבעיה היא שהעולם הפסיק לשחק לפי הכללים האלה:
כמעט כל יישום מודרני יודע לרוץ מעל פורט 80 או 443, ולכן חומת אש שפותחת אותם
בפועל פותחת הכל.

ה-NGFW שואלת שאלה אחרת: **איזו אפליקציה זו?** לא איזה פורט, לא איזה IP — איזו
אפליקציה. הכלל שלה אינו "ALLOW Port 25" אלא **"ALLOW SMTP"**. אם על פורט 25 תרוץ
תעבורת Bittorrent או תקשורת [[Command and Control]] — היא תזוהה, תיחסם ותדווח,
בדיוק מפני שהיא **אינה** SMTP.

השם השני, UTM, מסביר את הצד השני של אותו רעיון: במקום ערימה של ארגזים נפרדים
(URL filtering, Antivirus, DLP, Proxy, IPS), הכל נכנס לקופסה אחת עם ניהול אחד.
המרצה כותב זאת במפורש — שני השמות מתארים את אותו דבר, ואף אחד מהם אינו תקן.

## הסבר טכני

המרצה נותן ל-NGFW **משוואה**:

> Static Packet Filtering + [[Stateful Inspection]] + Application-level + Intrusion Prevention

זו המשוואה שצריך לדעת. היא מצטברת: כל מרכיב מוסיף שכבת בדיקה מעל הקודם, וכולם
יושבים בקופסה אחת בגבול האמון (trust border) — המקום שרואה את **כל** התעבורה.

חמש היכולות שהמרצה מייחס ל-NG Firewall:

| # | יכולת |
| --- | --- |
| 1 | זיהוי **applications** ללא תלות ב-port, protocol, evasive tactic או SSL |
| 2 | זיהוי **users** ללא תלות בכתובת IP |
| 3 | הגנה **בזמן אמת** מפני איומים המוטמעים בתוך אפליקציות |
| 4 | **Fine-grained visibility** ובקרת מדיניות על גישה ופונקציונליות של אפליקציות |
| 5 | פריסה **inline** מרובת-גיגה, ללא ירידת ביצועים |

היכולת הראשונה היא הלב, והמנגנון שמממש אותה נקרא **App-ID**: החומה מזהה את
האפליקציה מתוך תוכן התעבורה, ולא מתוך מספר הפורט. זה ההבדל שהמבחן חוזר אליו.

מה ש-NGFW **אינה**: היא אינה חומת אש ל-AI (**AI Firewall**), שהיא רכיב אחר לגמרי
היושב בשכבת ה-App/API/model מול איומי **Prompt Injection**. וגם היא, לפי המרצה,
נשארת **"blind to the scope of compromise"** — עיוורת להיקף ההדבקה — מול חמישה
דברים: **Sleep Techniques**, **Unknown Protocols**, **Encryption**,
**Polymorphism** ו-**Lateral Movement**.

:::example
בית חולים הטמיע NGFW והגדיר כלל אחד: **ALLOW SMTP**. תוקף שכבר השיג דריסת רגל
בשרת פנימי מנסה להוציא ממנו תקשורת [[Command and Control]] דרך פורט 25 —
הפורט שממילא פתוח לדואר. חומת אש קלאסית עם הכלל "ALLOW Port 25" הייתה מעבירה את
התעבורה ומדווחת "Packet on Port 25 allowed". ה-NGFW מזהה: **Command & Control ≠
SMTP** → Deny, ומדווחת "Unknown traffic detected and blocked".
:::

:::warning
NGFW **אינו תקן**. המרצה מדגיש: "Neither is a concrete standard, but rather the
concept of putting a complete network security solution into a single centrally
controlled system." לכן אין רשימת יכולות מחייבת, וכל יצרן מגדיר את הקופסה שלו
אחרת. מה שכן קבוע הוא המשוואה שהמרצה נותן.
:::

:::warning
**מלכודת המבחן:** היתרון של NGFW על פני חומת אש מסורתית אינו ביצועים, אינו צריכת
משאבים ואינו הצפנה — אלא **היכולת לזהות ולחסום איומים ברמת האפליקציה**. כל תשובה
שמדברת על "פחות משאבים" או "הצפנה מתקדמת" היא מסיח.
:::

:::diagram
תרשים בשני חצאים, זה מול זה.
משמאל — **NGFW (App-ID)**: קופסה אחת ובה ארבע שכבות מוערמות (Static Packet
Filtering, Stateful Inspection, Application-level, Intrusion Prevention), ועליה
כלל יחיד: "ALLOW SMTP". ארבעה חצים נכנסים אליה מסומנים SMTP, Bittorrent, Skype,
C&C. רק חץ ה-SMTP ממשיך פנימה בירוק; שלושת האחרים נעצרים באדום, וליד כל אחד
הכיתוב "≠ SMTP → Deny · detected and blocked".
מימין — **Legacy Firewall + App IPS**: שתי קופסאות נפרדות בטור, כלל "ALLOW Port
25" בראשונה וכלל "Block Bittorrent" בשנייה. אותם ארבעה חצים נכנסים: Bittorrent
נעצר בקופסה השנייה, אך SMTP, Skype ו-C&C — כולם על פורט 25 — עוברים בירוק, וליד
כל אחד הכיתוב "Packet on Port 25 allowed".
מתחת לתרשים כולו: "Ports ≠ Applications · IP Addresses ≠ Users · Packets ≠
Content".
:::
