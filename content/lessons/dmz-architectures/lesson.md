---
id: dmz-architectures
title: "ארכיטקטורות DMZ: חומת אש אחת מול שתיים"
course: computer-security
category: פרימטר ו-DMZ
difficulty: medium
estimatedTime: 40
tags:
  - perimeter
  - dmz
  - architecture
  - firewall
  - defense-in-depth
prerequisites:
  - dmz
relatedConcepts:
  - Three-Legged DMZ
  - Screened Subnet
  - Internal Firewall
  - DMZ
  - Firewall
  - Defense in Depth
  - Perimeter
  - Lateral Movement
  - IDS
  - IPS
version: 1
---

# ארכיטקטורות DMZ: חומת אש אחת מול שתיים

## למה יש בכלל יותר מדרך אחת

בשיעור הקודם למדנו **מה** זה [[DMZ]] ולמה הוא קיים. השיעור הזה עונה על השאלה
הבאה, וזו השאלה שמהנדס רשת באמת נתקל בה: **איך בונים אותו?**

הסיבה שיש יותר מתשובה אחת היא שה-DMZ הוא לא רכיב שקונים — הוא **טופולוגיה**.
הוא נוצר מהאופן שבו מחברים חומות אש, מקטעי רשת ושרתים זה לזה. אותם שרתים בדיוק,
אותו [[IDS]] בדיוק, אותה חומת אש בדיוק — יכולים להיות מחוברים בשתי צורות שונות
ולתת שתי רמות הגנה שונות לחלוטין.

זו בדיוק השאלה ששאל המבחן ב-2023: נתונות שלוש אפשרויות חיבור, **הרכיבים בכולן
זהים**, איזו מספקת את ההגנה החזקה ביותר. אם ההגנה נקבעת על ידי הרכיבים — התשובה
הייתה "כולן שוות". היא לא. ההגנה נקבעת על ידי **הסידור**.

בפרק הזה נלמד את שתי הטופולוגיות המרכזיות, נשווה ביניהן בדיוק כפי שהמרצה משווה,
ואז נעמיק פנימה — לתוך הרשת עצמה.

:::objectives
- לתאר את הטופולוגיה של Three-Legged DMZ ושל Screened Subnet — מה מחובר למה.
- לנמק מדוע שתי חומות אש חזקות מאחת, מעבר ל"יש יותר מהן".
- להסביר מהו Vendor Diversity ולמה הוא היתרון המשמעותי של Dual Firewall.
- ליישם את כללי זרימת התעבורה של Three-Tier DMZ, ובראשם "No tier skipping".
- להעריך מתי נדרשת חומת אש פנימית נוספת, ומהם השיקולים בהחלטה.
:::

---

## ארכיטקטורה ראשונה — Three-Legged DMZ

הארכיטקטורה הראשונה, [[Three-Legged DMZ]] (בעברית: DMZ בחומת אש אחת), היא
הפשוטה מבין השתיים — ולכן גם הנפוצה ביותר בארגונים קטנים.

הרעיון בשמה: [[Firewall]] אחד עם **שלושה ממשקים** (3+ interfaces), ומכל ממשק
יוצאת "רגל" לאזור אחר. רגל אחת לאינטרנט, רגל שנייה ל-DMZ, רגל שלישית לרשת
הפנימית המהימנה (Trusted LAN).

המרצה מונה ארבעה מאפיינים: חומת אש יחידה עם 3+ ממשקים, העלות הנמוכה ביותר,
הפשוטה ביותר להגדרה ולניהול, ו-**כל התעבורה עוברת דרך מכשיר אחד**.

זו טבלת היתרונות והחסרונות שלו, מילה במילה:

| PROS | CONS |
| --- | --- |
| Cost effective | No redundancy |
| Simple ops | SPOF risk |
| Single policy | Limited scale |

שימו לב לסימטריה: כל יתרון הוא אותו חיסרון מזווית אחרת. "Single policy" —
מדיניות אחת לנהל, נהדר. גם: מדיניות אחת ליפול.

:::important
החיסרון הקריטי, שהמרצה מסמן בקופסת אזהרה נפרדת, הוא **Single Point of Failure**
(SPOF):

> "If firewall is compromised, attacker has direct path to all zones. **No defense
> in depth between DMZ and internal network.**"

זהו לב העניין. ה-Firewall היחיד הזה ממלא שני תפקידים שונים: הוא גם השער מהאינטרנט,
וגם המחסום שבין ה-DMZ לרשת הפנימית. תוקף שהשתלט עליו לא רק נכנס — הוא קיבל
לידיים את המכשיר שאמור היה לעצור אותו בשלב הבא.
:::

בטבלת ההשוואה של המרצה הארכיטקטורה מקבלת **2 מתוך 5 כוכבי אבטחה**, והוא מייעד
אותה במפורש ל: "Small organizations, development environments, **or as stepping
stone to more robust designs**" — כלומר, גם הוא רואה בה תחנת ביניים.

:::warning
⚠ **סתירה בתוך המצגת עצמה — חשוב למבחן.**

המרצה מצייר "DMZ בחומת אש אחת" בשתי צורות שאינן זהות:

- בשקופיות האנגליות (8, 9) ובדיאגרמה העברית (30), ה-DMZ תלוי כרגל שלישית
  **מתוך** ה-Firewall — כלומר ה-DMZ **מוגן** על ידו.
- בדיאגרמה העברית (28), ה-DMZ מצויר **בין** ה-Firewall לבין האינטרנט — כלומר
  בצד החיצוני, לא מוגן. גם דיאגרמת ה-Bastion Host (שקופית 7) מציבה את המארחים
  בצד הלא-מהימן.

לכן מסיח שיטען "רכיב ה-DMZ פגיע מאחר שאינו מוגן מתקיפות מהאינטרנט" נשמע מוכר
לסטודנט שזוכר שקופית אחת, ומוטעה לסטודנט שזוכר אחרת. **הסיכון המובהק והחזק הוא
של הרשת הפנימית**, והוא נובע מה-SPOF — לא מפרט הציור.
:::

:::selfcheck
question: ארגון בנה Three-Legged DMZ והקפיד להגדיר בו כללי סינון קפדניים מאוד — מה-DMZ אל הרשת הפנימית מותרים שני פורטים בלבד. האם בכך פתר את בעיית ה-SPOF?
answer: לא. כללי הסינון מצוינים כל עוד ה-Firewall שולט בעצמו — אבל הם מוגדרים ונאכפים על ידי אותו מכשיר שהוא ה-SPOF. תוקף שהשתלט על ה-Firewall יכול פשוט לשנות את הכללים. SPOF אינה בעיה של מדיניות אלא של ארכיטקטורה: אין מכשיר אכיפה **שני, עצמאי**, בין ה-DMZ לרשת הפנימית. הפתרון היחיד הוא להוסיף כזה.
:::

---

## ארכיטקטורה שנייה — Screened Subnet

הארכיטקטורה השנייה, [[Screened Subnet]] (בעברית: DMZ בשתי חומות אש), פותרת בדיוק
את מה שהראשונה הותירה פתוח.

הרעיון: **שתי חומות אש נפרדות בטור**, וה-DMZ ביניהן. המרצה קורא לזה "DMZ
sandwiched between layers":

- **Outer Firewall** (חיצוני) — בין האינטרנט ל-DMZ.
- **DMZ** — באמצע.
- **Inner Firewall** (פנימי) — בין ה-DMZ לרשת הפנימית המהימנה.

התוצאה הטופולוגית היא המפתח: **אין נתיב מהאינטרנט לרשת הפנימית שאינו חוצה שתי
חומות אש**. אין קו עוקף. תוקף שעבר את הראשונה מוצא את עצמו ב-DMZ — ומול מכשיר
שני, שהוא עוד לא נגע בו.

וזו טבלת היתרונות והחסרונות שלה, מילה במילה:

| PROS | CONS |
| --- | --- |
| Defense in depth | Higher cost |
| Vendor diversity | Complex ops |
| Better logging | More latency |

:::important
המרצה מסמן את הארכיטקטורה הזו בקופסה ירוקה כ-**ENTERPRISE STANDARD** — זו העדפתו
המוצהרת:

> "Two firewalls provide **defense in depth**. Even if external firewall is
> compromised, **internal firewall protects core assets**."

זהו [[Defense in Depth]] בצורתו הטהורה: לא "עוד שכבה" סתם, אלא שכבה שממשיכה להגן
**גם אחרי** שהשכבה שלפניה כשלה.
:::

שימו לב לפריט "Better logging" ולמאפיין שהמרצה מוסיף: **Audit trail at both choke
points** — שתי נקודות חנק, שתי נקודות שבהן רואים את התעבורה, ושתי מערכות לוגים
עצמאיות. אם ניסיון חדירה עבר את הראשונה, הוא עדיין מותיר עקבות בשנייה.

ומאפיין נוסף: **Independent policy management** — לכל חומת אש מדיניות משלה.
החיצונית עוסקת בשאלה "מה מותר להיכנס מהאינטרנט ל-DMZ", הפנימית בשאלה השונה
לחלוטין "מה מותר לצאת מה-DMZ פנימה". ב-Three-Legged שתי השאלות האלה חיות באותה
טבלת כללים.

:::warning
אל תתעלמו מעמודת ה-CONS. סטודנטים נוטים לזכור ש"שתיים עדיף מאחת" ולשכוח שהמרצה
עצמו רושם שלושה מחירים: **Higher cost**, **Complex ops**, **More latency**.
מסיח שיטען ש-Dual Firewall **מוזיל** עלויות או **מפשט** את התפעול — הוא הפוך
בדיוק מדברי המרצה, וזו מלכודת קלאסית.
:::

:::selfcheck
question: ארגון הציב שתי חומות אש בטור, אך השאיר את ה-DMZ תלוי כרגל צדדית מהחומה החיצונית בלבד. האם זהו Screened Subnet?
answer: לא. Screened Subnet אינו "שתי חומות אש" — הוא **שתי חומות אש שה-DMZ ביניהן**. אם ה-DMZ תלוי מהחיצונית בלבד, התעבורה מה-DMZ אל הרשת הפנימית אינה נאלצת לחצות את הפנימית, וההפרדה הקריטית — זו שבין ה-DMZ לנכסי הליבה — לא הושגה. הטופולוגיה, לא מספר המכשירים, היא שקובעת.
:::

---

## ההשוואה הישירה — וה-Vendor Diversity

עכשיו נניח את שתי הארכיטקטורות זו לצד זו. זו ההשוואה שנבחנת **כל שנה**:

| | Three-Legged DMZ | Screened Subnet |
| --- | --- | --- |
| מבנה | חומת אש אחת עם 3+ ממשקים | שתי חומות אש בטור, DMZ ביניהן |
| Defense in depth בין DMZ לפנימי | **אין** | **יש** — הפנימית מגנה גם אם החיצונית נפרצה |
| מדיניות | Single policy | Independent policy management |
| נקודות חנק לביקורת | אחת | שתיים — audit trail בשתיהן |
| עלות | Cost effective | Higher cost |
| תפעול | Simple ops | Complex ops |
| Latency | — | More latency |
| SPOF | **SPOF risk** | — |
| Vendor diversity | לא אפשרי | **אפשרי** |
| כוכבי אבטחה (טבלת המרצה) | ★★☆☆☆ | ★★★★☆ |
| מיועד ל | SMB, Dev/Test | Enterprise Standard — פיננסים, בריאות |

השורה שסטודנטים מפספסים היא האחת לפני האחרונה.

:::important
**Vendor Diversity** — שתי חומות האש צריכות להיות של **ספקים שונים**. בלשון
המרצה:

> "Use different vendors for each firewall to reduce single-vulnerability exposure.
> **A zero-day in one vendor won't compromise both layers.**"

זהו ההיגיון: שתי חומות אש מאותו דגם ומאותו ספק חולקות את **אותו קוד** ואת אותן
חולשות. חולשת zero-day שמפילה את הראשונה תפיל גם את השנייה — ואז שתי השכבות שוות
בדיוק לשכבה אחת, ושילמנו כפול על כלום.

זו הסיבה שהמרצה מסמן "**Single firewall vendor both layers**" כחולשה בטבלת
התצורות השגויות שלו.
:::

הנקודה הזו היא בדיוק התשובה הנכונה בשאלה שחזרה ב-2025: מהו היתרון **המשמעותי
ביותר** של Dual Firewall על פני חומת אש יחידה שמחלקת לוגית בין חוץ לפנים? התשובה
אינה "יש שתיים" ואינה "יותר לוגים" — היא **האפשרות להשתמש בשני ספקים/טכנולוגיות
שונים, כך שכשל או חולשה של אחד לא יאפשרו לתוקף לפרוץ לרשת הפנימית**.

:::tip
שימו לב לניסוח "חומת אש יחידה שמחלקת **לוגית**" — כלומר Three-Legged. חלוקה
לוגית לממשקים אינה הפרדה אמיתית: זהו עדיין מכשיר אחד, קוד אחד, חולשה אחת. הפרדה
לוגית על גבי SPOF נשארת SPOF.
:::

:::selfcheck
question: מנהל רשת רכש שתי חומות אש זהות מאותו ספק ומאותו דגם, והציב אותן בטור עם DMZ ביניהן. הוא טוען שהשיג Defense in Depth. במה הוא צודק ובמה הוא טועה?
answer: הוא צודק בטופולוגיה וטועה בעמידות. הוא אכן קיבל שתי נקודות חנק, שתי מערכות לוגים, ומדיניות עצמאית לכל שכבה — וגם קיבל הגנה מפני **טעות תצורה** באחת מהן. אבל הוא לא קיבל הגנה מפני **חולשה טכנולוגית**: zero-day באותו דגם מפיל את שתי חומות האש בבת אחת, והשכבה השנייה נעלמת ברגע שהראשונה נופלת. זו בדיוק הסיבה ל-Vendor Diversity, והמרצה מסמן "Single firewall vendor both layers" כחולשה.
:::

---

## Three-Tier DMZ — כשההפרדה נכנסת פנימה

עד כאן הפרדנו את הפנים מהחוץ. ה-**Three-Tier DMZ** לוקח את אותו עיקרון ומחיל
אותו **בתוך** האפליקציה: המרצה מתאר אותו כ-"classic n-tier application
architecture with security boundaries at each layer" — ארכיטקטורת יישום קלאסית,
עם גבול אבטחה בין כל שתי שכבות.

שלוש השכבות:

| Tier | מה יושב בו | חומת האש שלפניו |
| --- | --- | --- |
| **Tier 1: Web/Proxy** | Reverse proxies, load balancers, WAF, תוכן סטטי | FW1: Edge/WAF |
| **Tier 2: Application** | שרתי יישום, API gateways, לוגיקה עסקית | FW2: App Tier |
| **Tier 3: Database/Internal** | מסדי נתונים, אחסון קבצים, שירותים פנימיים | FW3: Data Tier |

ואלה **TRAFFIC FLOW RULES** — כללי זרימת התעבורה, מילה במילה כפי שהמרצה כותב
אותם:

- **Internet → Tier 1 only**
- **Tier 1 → Tier 2** (specific ports)
- **Tier 2 → Tier 3** (DB ports only)
- **No tier skipping allowed**

:::important
**"No tier skipping allowed"** — אין דילוג על שכבות.

זהו הכלל שכל השאר נשען עליו. תעבורה מהאינטרנט אינה יכולה לגעת ב-Tier 2, ושרת
ב-Tier 1 אינו יכול לפנות ישירות למסד הנתונים ב-Tier 3. **כל** מעבר הוא בין שכבות
סמוכות בלבד, ורק דרך פורטים מוגדרים.

הסיבה: בלי הכלל הזה, פריצה ל-Tier 1 שוות ערך לפריצה לנתונים. עם הכלל, התוקף
נאלץ לפרוץ **שלוש** פעמים, בשלושה גבולות, וכל אחת מהן היא הזדמנות נוספת לזהות
אותו. כלשון המרצה על ה-DMZ בכלל: הוא "converts single-point failures into
multi-stage attack requirements, increasing attacker cost and detection
opportunities".
:::

הכלל הזה הוא גם מה שעומד מאחורי הפרצה שהמרצה מדרג כ-**HIGH RISK** מספר אחת:
**Direct database access from DMZ to internal** — גישה ישירה ממסד נתונים אל
ה-DMZ. זהו tier skipping בצורתו הקלאסית, וזו התשובה למה שנבחן ב-2024: שרת דוא"ל
ב-DMZ שקיבל גישה ישירה לשרתי הנתונים הפנימיים הוא הסיכון החמור ביותר לרשת.

בטבלת ההשוואה של המרצה, Three-Tier מקבל את הציון הגבוה ביותר — **5 מתוך 5 כוכבי
אבטחה** — במחיר של High complexity ו-$$$, ומיועד ל-Finance ו-Healthcare.

:::diagram
זרימה אנכית מלמעלה למטה. בראש: ענן **INTERNET**. מתחתיו **FW1: Edge/WAF**, ומתחתיו
פס צהוב **TIER 1: Web/Proxy**. מתחתיו **FW2: App Tier**, ומתחתיו פס כתום **TIER 2:
Application**. מתחתיו **FW3: Data Tier**, ומתחתיו פס ירוק **TIER 3:
Database/Internal**. חצים ירוקים מותרים עוברים רק בין שכבות סמוכות, כל אחד מתויג
בפורטים המותרים. שני חצים אדומים מקווקווים, שניהם חסומים ב-X גדול: אחד מהאינטרנט
ישירות ל-Tier 2, ואחד מ-Tier 1 ישירות ל-Tier 3. תווית מתחת לשניהם: **No tier
skipping allowed**.
:::

:::selfcheck
question: צוות פיתוח מבקש לאפשר לשרת ה-Web ב-Tier 1 לגשת ישירות למסד הנתונים ב-Tier 3, "כדי לחסוך latency בשאילתות קריאה בלבד". מדוע זו בקשה שיש לדחות?
answer: מפני שהיא מפרה את "No tier skipping allowed", ובכך מבטלת את שכבת ההגנה שבין השרת החשוף ביותר לאינטרנט לבין הנכס היקר ביותר בארגון. Tier 1 הוא השרת שהכי סביר שייפרץ — הוא זה שמדבר עם האינטרנט. ברגע שהוא מחזיק נתיב ישיר ל-Tier 3, פריצה אחת אליו מספיקה כדי להגיע לנתונים, ו-FW2 ו-FW3 הופכים לחסרי משמעות. "קריאה בלבד" אינה מגבלה אמיתית: תוקף ששולט בשרת שולט גם בשאילתות שהוא שולח. הפתרון הוא שהבקשה תעבור דרך Tier 2, כפי שתוכננה.
:::

---

## Internal Firewall — סגמנטציה בתוך הרשת

הגענו לשלב האחרון, והוא גם המקום שבו המבחן שאל את השאלה בשמה המפורש: מתי פורסים
[[Internal Firewall]] — חומת אש **נוספת בתוך הרשת הארגונית**?

חשוב להבין שזו שאלה **רחבה יותר** מ-Screened Subnet. ב-Screened Subnet ה-Internal
Firewall הוא ה-Inner Firewall שבין ה-DMZ לרשת הפנימית. אבל אותו רעיון בדיוק חל
גם **עמוק בתוך** הרשת המהימנה — בין מקטע לוגיסטיקה למקטע כספים, בין רשת המשרדים
לרשת התעשייתית, בין שכבת היישום לשכבת הנתונים.

המרצה קורא לגבול הזה **Internal Boundary**, להבדיל מה-**Perimeter Boundary**
החיצוני: הגבול החיצוני מגן על שכבת ה-Presentation, והפנימי מגן על ה-Middleware
ועל ה-Data Servers — מה שהוא מכנה Sensitive Resources.

למה זה נחוץ? כי ההנחה ש"כל מה שבפנים מהימן" היא בדיוק מה שמאפשר
[[Lateral Movement]]. בלשון המרצה: "Assuming all internal systems inside are 'trusted' leads
to easy lateral spread of attacks... **To this day, this is the leading cause of
breaches being so extensive and damaging.**"

זו גם הסיבה שהוא מסמן **Flat DMZ network with no internal segmentation** — רשת
שטוחה, בלי סגמנטציה פנימית — כפרצה בדרגת HIGH RISK.

### מה ה-Internal Firewall אוכף

כאן נמצאים הכללים המדויקים שהמרצה נותן לתעבורה מה-DMZ אל הרשת הפנימית:

- **DMZ → internal: allow-list only** — רק פורטי היישום הנדרשים, ו**ללא
  "any-any"**.
- **No direct AD/DB access from DMZ** — גישה למסד נתונים או ל-Active Directory
  רק דרך שירותים מתווכים (brokered services).
- **Strict egress** — חסימת יעדים לא מוכרים, התראה על חריגות. **Outbound
  any-any from DMZ** הוא HIGH RISK.
- **Never allow DMZ direct access to SIEM** — הלוגים עוברים דרך **Log Forwarder**
  שיושב ב-DMZ, ומשם דרך ה-Firewall אל ה-SIEM הפנימי.

:::tip
מיקום ה-[[IDS]] או ה-[[IPS]] קשור ישירות לכאן. המרצה מציג שלושה מיקומים אפשריים:
לפני ה-DMZ, **בין ה-DMZ לרשת הפנימית**, ובתוך ה-DMZ. המיקום האמצעי הוא זה שנותן
את השכבה הנוספת מאחורי ה-DMZ — בדיוק בגבול שבו ה-Internal Firewall אוכף.
:::

### השיקולים בהחלטה

ומהם השיקולים כשמחליטים אם לפרוס Internal Firewall נוסף? זו אינה שאלה טכנית אלא
**שאלת ניהול סיכונים**, ושלושת מרכיביה:

1. **הסיכון** — מה גודל הנזק אם ה-DMZ ייפרץ בהצלחה? (המרצה: "blast radius")
2. **התקציב** — Higher cost, כפי שהוא עצמו רושם בעמודת ה-CONS.
3. **מורכבות התפעול** — Complex ops. ארגון שאין לו יכולת לתחזק שתי מדיניות
   עצמאיות יקבל שתי חומות אש שאחת מהן מוגדרת גרוע.

זהו בדיוק ה-**CISO Decision Framework** של המרצה: *"Match architecture to risk
appetite, regulatory requirements, and operational capabilities — **not just
budget**."*

:::warning
שני מסיחים שהמבחן אוהב, ושניהם שגויים:

- **"העלות בלבד"** — החלטה על סמך תקציב בלי הערכת סיכונים סותרת במפורש את
  ה-CISO Decision Framework.
- **"חשש שה-Firewall הפנימי יכשיל את הסינון ב-DMZ החיצוני"** — שתי חומות האש
  אוכפות מדיניות **עצמאית** ואינן מבטלות זו את זו. זהו בדיוק ההפך מ-Defense in
  Depth.
:::

:::selfcheck
question: תוקף ניצל חולשה בחומת האש שמחברת את ה-DMZ אל מחוץ לארגון והשתלט עליה. אילו בקרות היו יכולות למנוע ממנו להגיע לשרתי הליבה, למרות שהשליטה בחומת האש כבר אבדה?
answer: רק בקרות שאינן תלויות בחומת האש שנפלה. הקשחת כללי ניתוב או פורטים **באותה** חומת אש חסרת ערך — התוקף שולט בה ויכול לשנות את הכללים. מה שכן עוזר: מכשיר אכיפה **עצמאי** מאחורי ה-DMZ — Internal Firewall ו/או IPS/IDS — שבודק את התעבורה בדרכה פנימה, אוכף allow-list ללא any-any, וחוסם גישה ישירה ל-AD ול-DB. זהו בדיוק ההיגיון של Screened Subnet, וזו הסיבה שהוא ה-ENTERPRISE STANDARD.
:::

---

:::keypoints
- ה-DMZ הוא טופולוגיה, לא רכיב. אותם רכיבים בדיוק, מחוברים אחרת, נותנים הגנה שונה.
- **Three-Legged DMZ** — Firewall אחד עם 3+ ממשקים. זול ופשוט, אך **Single Point of Failure**: אין Defense in Depth בין ה-DMZ לרשת הפנימית.
- **Screened Subnet** — שתי חומות אש בטור, DMZ ביניהן. המרצה מסמן אותה **ENTERPRISE STANDARD**: גם אם החיצונית נפרצה, הפנימית מגנה על נכסי הליבה.
- מחיר ה-Screened Subnet, בלשון המרצה: Higher cost · Complex ops · More latency. אל תמכרו אותה כ"זולה יותר".
- **Vendor Diversity** הוא היתרון המשמעותי של Dual Firewall: שני ספקים שונים, כדי ש-zero-day באחד לא יפיל את שתי השכבות.
- **Three-Tier DMZ**: Internet → Tier 1 בלבד · Tier 1 → Tier 2 בפורטים מוגדרים · Tier 2 → Tier 3 בפורטי DB בלבד · **No tier skipping allowed**.
- מה-DMZ פנימה: **allow-list בלבד, ללא any-any, ואין גישה ישירה ל-AD/DB**.
- ההחלטה על Internal Firewall היא ניהול סיכונים — סיכון, תקציב ומורכבות תפעול. לא תקציב לבדו.
:::

:::quiz{ref="dmz-architectures-quiz"}
:::

:::flashcards{ref="dmz-architectures"}
:::

:::references
- מצגת הקורס — Perimeter Security & DMZ (ד"ר יצחק אביב), שקופית 7 — Single Firewall / Bastion host.
- שם, שקופיות 8–9 — Single Firewall DMZ (Three-Legged): מאפיינים, PROS/CONS, קופסת SINGLE POINT OF FAILURE.
- שם, שקופיות 10–11 — Dual Firewall DMZ (Screened Subnet): מאפיינים, PROS/CONS, ENTERPRISE STANDARD, VENDOR DIVERSITY OPTION.
- שם, שקופית 12 — Three-Tier DMZ Architecture ו-TRAFFIC FLOW RULES ("No tier skipping allowed").
- שם, שקופית 20 — LOG ARCHITECTURE ("Never allow DMZ direct access to SIEM").
- שם, שקופית 22 — Common DMZ Vulnerabilities: HIGH RISK (Direct DB access from DMZ, Flat DMZ, Outbound any-any, Single firewall vendor both layers).
- שם, שקופית 23 — Architecture Comparison Matrix ו-CISO Decision Framework.
- שם, שקופית 26 — תרחיש התקיפה והבקרות: "DMZ → internal allow-list only; no 'any-any'; no direct AD/DB access".
- שם, שקופיות 27–30 — הדיאגרמות העבריות: DMZ בשתי חומות אש, DMZ בחומת אש אחת, ו-Three-Legged.
- שם, שקופיות 32–33 — רשת תעשייתית (חומת אש אחת מול שתיים) ו-Corporate Networks עם IDS/IPS משני צדי ה-DMZ.
- שם, שקופית 65 — Typical Perimeter Architecture: Perimeter Boundary מול Internal Boundary.
- שם, שקופית 67 — Common perimeter topology patterns: B (3-legged) ו-C (Screened subnet).
- שם, שקופית 77 — lateral / east-west movement כ-"leading cause of breaches being so extensive and damaging".
:::
