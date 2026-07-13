---
id: defense-in-depth
title: Defense in Depth
slug: defense-in-depth
aliases:
  - הגנה לעומק
  - הגנה רב-שכבתית
  - הגנה רב שכבתית
  - Layered Security
  - Layered Defense
  - עקרונות הגנה
  - Defense in depth
  - Control Stack
tags:
  - security-principles
  - perimeter
  - architecture
related:
  - Perimeter
  - Lateral Movement
  - Firewall
  - IDS
  - IPS
  - DMZ
  - Three-Legged DMZ
  - Screened Subnet
  - Internal Firewall
  - Least Privilege
---

# Defense in Depth

:::definition
הגנה לעומק (Defense in Depth) היא עקרון תכנון שלפיו ההגנה נבנית מכמה בקרות אבטחה
**עצמאיות זו מזו**, המסודרות בשכבות מסביב לנכס. אף שכבה אינה נחשבת חסינה, וכישלון
של שכבה אחת אינו מבטל את ההגנה — השכבות שמאחוריה ממשיכות להגן.
:::

:::warning
**מקור ההגדרה — לקרוא לפני שממשיכים.** במצגת ה-Firewall (דק 05) המרצה **אינו
מגדיר** את המונח מילולית: הוא מציג אותו בשתי אינפוגרפיקות בלבד — שכבות בצל (שקופית 2)
וגלגל קטגוריות (שקופית 3). ההגדרה המילולית היחידה בקורס מופיעה במצגת ה-DMZ
(דק 07, שקופית 16), שם Defense in Depth הוא אחד משישה עקרונות הנדסיים המיוחסים
ל-**Saltzer & Schroeder**, ומנוסח כך:

> "Multiple independent security controls. If one fails, others continue protecting.
> Layer network, host, and application defenses."

ההגדרה שלמעלה היא תרגום נאמן של המשפט הזה. **רשימת השכבות**, לעומת זאת, נגזרה
מהאינפוגרפיקות — למרצה אין רשימה מילולית אחת.
:::

## הסבר פשוט

תחשבו על בנק. אין בו מנעול אחד — יש דלת כניסה, מאבטח, מצלמות, דלת פלדה לכספת,
צופן לכספת, ובתוכה תאים נעולים בנפרד. אף אחד מהמנגנונים האלה אינו מושלם, ואיש
אינו מניח שהוא כן. הם קיימים כי מניחים מראש ש**אחד מהם ייכשל**, והשאלה היחידה
שחשובה היא מה עוצר את השודד ברגע שזה קורה.

הגנה לעומק היא בדיוק אותו רעיון ברשת מחשבים. אנחנו לא בונים חומה אחת גבוהה ומקווים
לטוב — אנחנו בונים כמה מעגלי הגנה, כך שכל תוקף שעבר מעגל אחד נתקל מיד בבא אחריו,
מאט, ומשאיר עקבות. המטרה אינה למנוע חדירה לחלוטין (זה בלתי אפשרי), אלא לוודא
שחדירה אחת אינה שווה לאובדן הכל.

## הסבר טכני

העיקרון נשען על שלוש דרישות, וכולן מופיעות במפורש בניסוח של המרצה:

1. **ריבוי בקרות (Multiple controls)** — יותר מבקרה אחת בנתיב אל הנכס.
2. **עצמאות (Independent)** — זו הדרישה שנופלים עליה. שתי בקרות שנשענות על אותו
   רכיב, אותה תצורה או אותו ספק אינן שתי שכבות; הן שכבה אחת שנספרה פעמיים. חולשה
   אחת מפילה את שתיהן.
3. **הבדלי שכבה (Layer network, host, and application)** — הבקרות צריכות לפעול
   ברמות שונות של הערימה, לא לחזור על אותה בדיקה במקום אחר.

המודל קיים משום ש**פריצה מונחת כנתון, לא כתרחיש קיצון**. המרצה מדגים זאת פעמיים:
בשקופית "Firewall Breaches" (דק 05, שקופית 16) התוקף מגביר את התקיפה, הנוזקה עוברת
דרך ה-Network Firewall — וה-Host-based firewalls בקצוות הן שעדיין חוסמות חלק
מהתחנות. ובדק 02 (שקופית 36) הוא כותב במפורש: "Detection requires continuous
monitoring, **not just perimeter defenses**", ומסכם — "Defense in depth is the only
reliable strategy".

מכאן נגזרת המדידה המעשית של העיקרון: לא "כמה בקרות יש לי" אלא **"מה קורה כששכבה N
נופלת"**. אם התשובה היא "התוקף מגיע לנכס", אין הגנה לעומק — יש נקודת כשל יחידה
(**Single Point of Failure**) שמחופשת לארכיטקטורה.

:::example
בארכיטקטורת [[Three-Legged DMZ]] (חומת אש אחת עם שלושה ממשקים) המרצה כותב:
"No defense in depth between DMZ and internal network" — אם חומת האש נפרצה, לתוקף
יש נתיב ישיר לכל האזורים. לעומתה, ב-[[Screened Subnet]] (שתי חומות אש בטור) הוא
כותב: "Even if external firewall is compromised, internal firewall protects core
assets", ומוסיף את אפשרות ה-**Vendor Diversity** — שתי חומות אש מיצרנים שונים, כדי
ש-zero-day באחת לא יפיל את שתיהן. זה ההבדל בין שתי בקרות עצמאיות לבין בקרה אחת
עם שני ממשקים.
:::

:::warning
**הגנה לעומק אינה "לקנות עוד מוצר".** שתי חומות אש מאותו יצרן, עם אותה תצורה ואותה
חולשה, אינן שתי שכבות. עומק נמדד ב**עצמאות** של הבקרות — במה שמפיל אותן, לא במספר
שלהן.
:::

:::warning
**הגנה לעומק אינה טכנולוגיה בלבד.** בדק 02 (שקופית 26) המרצה מנסח זאת כ-"Defense
requires a layered approach: **technology, training, and policy**", ובגלגל של דק 05
שתיים משבע הקטגוריות אינן מוצר כלל: **Policy Management** ו-**Monitoring & Response**.
ארגון שקנה שבעה מוצרים ולא הכשיר איש ולא בנה נוהל — לא בנה עומק.
:::

:::diagram
שתי הצגות של אותו עיקרון, זו לצד זו.

**מימין — מודל הבצל (דק 05, שקופית 2):** שבעה מעגלים קונצנטריים. מהליבה החוצה:
Data · Application · Host · Internal Network · Perimeter Network · Physical Facility ·
Users and Organization. חץ תוקף נכנס מבחוץ וחוצה מעגל אחר מעגל; ליד כל מעגל שנחצה
מופיע הכיתוב "עדיין נותרו N שכבות".

**משמאל — גלגל הקטגוריות (דק 05, שקופית 3):** עוגה מחולקת לשבע קטגוריות סביב ליבה.
הליבה: Data Protection. סביבה, בכיוון השעון: Perimeter Security · Network Security ·
Endpoint Security · Application Security · Policy Management · Monitoring & Response.
בכל קטגוריה רשומים הרכיבים שבתוכה (למשל בתוך Endpoint Security: EDR, Patch
Management, Host Based Firewall).

בין שתי ההצגות חץ דו-כיווני ותווית: "אותו עיקרון, שתי חתכים — הבצל חותך לפי מיקום
ברשת, הגלגל חותך לפי תחום אחריות".
:::
