---
id: internal-firewall
title: Internal Firewall
slug: internal-firewall
aliases:
  - חומת אש פנימית
  - סגמנטציה פנימית
  - FW פנימי
  - Internal Firewall
  - Inner Firewall
  - Internal Boundary
tags:
  - perimeter
  - dmz
  - segmentation
related:
  - Screened Subnet
  - Three-Legged DMZ
  - DMZ
  - Firewall
  - Defense in Depth
  - Lateral Movement
---

# Internal Firewall

:::definition
חומת אש (Internal Firewall) המוצבת **בתוך** גבולות הארגון, מאחורי הפרימטר
החיצוני, ואוכפת מדיניות בין מקטעי רשת פנימיים — בין ה-DMZ לרשת המהימנה, או בין
מקטעים פנימיים שונים זה מזה.
:::

## הסבר פשוט

ה-Firewall שכולם מכירים יושב בשער: הוא מפריד בין "בחוץ" ל"בפנים". ה-Internal
Firewall יושב **אחריו**, ומפריד בין "בפנים" ל"בפנים אחר".

הסיבה לקיומו פשוטה: הנחת היסוד שכל מה שנמצא בפנים הוא מהימן היא הנחה שגויה, וזה
מה שמאפשר [[Lateral Movement]] — תוקף שהגיע לשרת אחד מטייל משם חופשי לכל השאר.
ה-Internal Firewall שם קיר גם בפנים.

## הסבר טכני

בארכיטקטורת [[Screened Subnet]] ה-Internal Firewall הוא ה-Inner Firewall —
המכשיר שמפריד בין ה-DMZ לרשת המהימנה. המרצה מכנה את הגבול הזה **Internal
Boundary**, להבדיל מה-**Perimeter Boundary** החיצוני: הגבול החיצוני מגן על שכבת
ה-Presentation, והפנימי מגן על ה-Middleware ועל ה-Data Servers — ה-Sensitive
Resources.

אבל התפקיד רחב יותר מ"החומה השנייה של ה-DMZ". המרצה מסמן **Flat DMZ network with
no internal segmentation** כפרצה בדרגת HIGH RISK, ובארכיטקטורת ה-**Three-Tier
DMZ** הוא מציב Firewall בין **כל** שתי שכבות: FW1 בקצה, FW2 לפני שכבת היישום,
FW3 לפני שכבת הנתונים. זו סגמנטציה פנימית, לא פרימטר.

המדיניות שה-Internal Firewall אוכף היא הכלל הנבחן ביותר בפרק:

- מה-DMZ אל הרשת הפנימית — **allow-list בלבד**, רק פורטי היישום הנדרשים, **ללא
  "any-any"**.
- **אין גישה ישירה ל-AD או ל-DB מה-DMZ** — רק דרך שירותים מתווכים (brokered
  services).
- **Egress** קשיח: חסימת יעדים לא מוכרים והתראה על חריגות.

:::example
בבנק, תוקף שניצל חולשה השתלט על שרת ה-Web ב-DMZ. הוא מנסה להתחבר משם ישירות
לשרת מסד הנתונים ברשת הפנימית. ה-Internal Firewall בודק את הבקשה מול allow-list
שמתיר מה-DMZ רק קריאות API אל שרת יישום אחד — מסד הנתונים אינו ברשימה כלל.
החיבור נדחה, והדחייה נרשמת בלוג ומתריעה. השרת ב-DMZ אבד; שרתי הליבה לא.
:::

:::warning
Internal Firewall אינו החלפה של הפרימטר החיצוני ואינו מייתר אותו — הוא **שכבה
נוספת מאחוריו**. הצבתו היא החלטת [[Defense in Depth]], והשיקולים לפריסתו הם
ניהול סיכונים: מה גודל הנזק אם ה-DMZ ייפרץ, מה התקציב, ומהי מורכבות התפעול
שהארגון מסוגל לשאת בפועל.
:::

:::diagram
תרשים בשלוש שכבות אנכיות. למעלה: ענן אינטרנט. מתחתיו Firewall המסומן **Perimeter
Boundary**. מתחתיו אזור **DMZ** עם Presentation Servers. מתחתיו Firewall שני
המסומן **Internal Boundary / Internal Firewall**. מתחתיו הרשת הפנימית, המחולקת
לשני מקטעים נפרדים המופרדים ביניהם בחומת אש שלישית: מקטע Middleware / Application
Servers ומקטע Data Servers + AD. חץ מקווקו אדום יוצא מהשרת ב-DMZ ומנסה להגיע
ישירות ל-Data Servers — ונחסם ב-X על ה-Internal Firewall, עם תווית
"allow-list only · no any-any · no direct AD/DB access".
:::
