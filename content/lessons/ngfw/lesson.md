---
id: ngfw
title: NGFW — חומת אש מדור חדש
course: computer-security
category: הגנת רשת
difficulty: medium
estimatedTime: 30
tags:
  - ngfw
  - firewall
  - network-security
  - app-id
relatedConcepts:
  - NGFW
  - Stateful Inspection
  - Firewall
  - Web Application Firewall (WAF)
  - IPS
  - Command & Control (C&C)
version: 1
---

# NGFW — חומת אש מדור חדש

## החומה נשארה במקום. העולם זז

[[Firewall]] קלאסית עובדת לפי חוזה פשוט: אתה אומר לה אילו **פורטים** מותרים, והיא
אוכפת. החוזה הזה עבד מצוין כל עוד היה קשר קבוע בין פורט לבין שירות — פורט 25 זה
דואר, פורט 80 זה אתרים, וזהו.

היום הקשר הזה נשבר. המרצה פותח את היחידה הזו בשקופית שמראה ענן של עשרות יישומים —
Skype, BitTorrent, Gmail, Tor, LogMeIn, salesforce, webex — וחומה עם **שני פתחים
בלבד**: Port 80 ו-Port 443. כל החצים הצבעוניים עוברים דרך שני הפתחים האלה. החומה
לא נפרצה. היא פשוט **לא רואה** מה עובר דרכה.
![[NGFW 1.png]]
זו הסיבה שקיים NGFW. הוא לא "חומת אש חזקה יותר" — הוא חומת אש ששואלת שאלה אחרת.

:::objectives
- להסביר מדוע חומת אש קלאסית הפסיקה להספיק — שלוש אי-השוויונות של המרצה.
- לנסח את משוואת ה-NGFW ולהסביר מה כל מרכיב בה מוסיף.
- להסביר מהי Stateful Inspection ומה בדיוק היא **אינה** בודקת.
- להשוות NGFW מול Legacy Firewall ולהראות מה כל אחד מהם מזהה ומה הוא מפספס.
- לזהות את היתרון שהמבחן שואל עליו: זיהוי וחסימה **ברמת האפליקציה**.
:::

---

## שלוש אי-השוויונות ששברו את החומה

המרצה מסכם את כל הבעיה בשלוש שורות. שווה לשנן אותן:

- **Ports ≠ Applications** — הפורט כבר לא מזהה את היישום.
- **IP Addresses ≠ Users** — כתובת ה-IP כבר לא מזהה את המשתמש.
- **Packets ≠ Content** — החבילה כבר לא מעידה על מה שיש בתוכה.

כל אחת מהשלוש שוברת אחד משלושת הדברים היחידים שחומת אש קלאסית יודעת לבדוק. המרצה
מדגיש שהחומה עצמה לא מיותרת: הוא מסמן בהדגשה מיוחדת את המשפט
**"A firewall exists to allow or block traffic"** — זה התפקיד שלה, וזה נשאר. מה
שאבד הוא ה**ראייה**. לכן הוא מסכם את השקופית בפס ירוק בתחתיתה:
**"Need to restore visibility and control in the firewall"**.

ולמה דווקא בחומת האש? כי היא יושבת ב-**trust border** — גבול האמון. זו הנקודה
היחידה שרואה את **כל** התעבורה, ולכן, לדבריו, זהו "the right place to enforce
policy control".

עכשיו הנקודה שמפתיעה סטודנטים, והיא במפורש בשקופית:

:::important
**"Standard firewalls — stateful and stateless — don't perform any packet
inspection"** — חומות אש רגילות, גם מבוססות-מצב וגם סטטיות, **אינן בוחנות את תוכן
החבילה** כדי לקבוע אם הוא לגיטימי. הן מעריכות את **רמות** התעבורה, את מקורה
וכדומה. מי שכן בוחן תוכן הוא ה-[[IPS]] — לפי המרצה, NIPS מבצע packet inspection
ובנוסף גם anomaly, signature ו-policy-based inspections.
:::

:::warning
המרצה מתקן כאן במפורש תפיסה מוטעית, וזו ההצהרה הכי חד-משמעית בכל הדק:
**"It's a misconception that if you have a firewall then an IPS solution isn't
needed to protect your network (or vice versa). This couldn't be further from the
truth. You need both solutions."** חומת אש ו-[[IPS]] חוסמות בשתי רמות שונות
לגמרי — פרוטוקול ופורט מול תוכן החבילה. אחת אינה מחליפה את השנייה.
:::

:::selfcheck
question: ארגון פותח בחומת האש רק את פורט 443 ("רק HTTPS מותר") ומכריז שהרשת מוגנת. מה הפער?
answer: הפער הוא ש-Ports ≠ Applications. פורט 443 פתוח פירושו שכל יישום שיודע להתחפש לתעבורת HTTPS — Skype, Tor, Ultrasurf, ואפילו ערוץ C&C — יעבור. חומת האש עשתה בדיוק את מה שהתבקשה (allow/block לפי פורט), אבל היא לא ראתה מה עבר. זה בדיוק ההבדל בין **בקרה** לבין **ראייה**.
:::

---

## Technology Sprawl & Creep — למה "עוד קופסאות" זה לא הפתרון

התגובה הטבעית של ארגון שגילה שהחומה שלו עיוורת היא לקנות עוד רכיבים: קופסת
URL filtering, קופסת Antivirus, קופסת QoS, קופסת IM, קופסת DLP, Proxy, ומעליהם
ערימת IPS. המרצה מצייר בדיוק את זה — שרשרת ארגזים נפרדים בין הרשת הפנימית לחומת
האש — וקורא לתופעה **Technology Sprawl & Creep**.

והוא פוסל אותה בשלוש שורות:

- **"'More stuff' doesn't solve the problem"** — עוד ציוד אינו פותר את הבעיה.
- **"Firewall 'helpers' have limited view of traffic"** — לכל "עוזר" של חומת האש
  יש ראייה **חלקית** של התעבורה. אף אחד מהם לא רואה את התמונה השלמה.
- **"Complex and costly to buy and maintain"** — מורכב ויקר לרכוש ולתחזק.

מכאן נולד הרעיון. במקום ערימה של ארגזים עם ראייה חלקית וניהול נפרד — **מערכת אחת
מנוהלת מרכזית** שרואה הכל. המרצה מנסח זאת כך:

> "New all-in-one solutions are often called **next-generation firewalls (NGFW)**
> or, for a less self-dating term, **unified threat management (UTM)** firewalls.
> **Neither is a concrete standard**, but rather the concept of putting a complete
> network security solution into a single centrally controlled system."

:::important
[[NGFW]] ו-**UTM** הם **שני שמות לאותו דבר**. זה לא שני מוצרים ולא שתי גישות —
המרצה אומר זאת במילים מפורשות. ושניהם אינם תקן: אין "תעודת NGFW", יש קונספט.
:::

:::selfcheck
question: מנהל אבטחה מציג תוכנית: להוסיף לרשת קופסת DLP, קופסת Antivirus רשתי וקופסת URL filtering, כל אחת עם ממשק ניהול משלה. לפי המרצה — מה הבעיה, ומה החלופה?
answer: זהו בדיוק Technology Sprawl & Creep. הבעיה אינה שהרכיבים גרועים, אלא ש"עוד ציוד לא פותר את הבעיה": לכל "עוזר" יש ראייה חלקית בלבד של התעבורה, ואף אחד מהם לא רואה את התמונה המלאה — בנוסף לעלות ולמורכבות התחזוקה. החלופה היא NGFW/UTM: אותן יכולות בדיוק, אבל בקופסה אחת עם ניהול מרכזי אחד, שיושבת בגבול האמון ורואה את כל התעבורה.
:::

---

## משוואת ה-NGFW

זו השקופית שצריך לזכור בעל פה. המרצה מגדיר את ה-NGFW כסכום:

> **Static Packet Filtering + Stateful Inspection + Application-level + Intrusion Prevention**

ארבעה מרכיבים, בקופסה אחת. נעבור עליהם:

| מרכיב | מה הוא בודק |
| --- | --- |
| **Static Packet Filtering** | חבילה בודדת: source IP, destination IP, port, protocol. זו חומת האש הקלאסית. |
| [[Stateful Inspection]] | **state**, port ו-protocol — כלומר גם ההקשר של החיבור שאליו החבילה שייכת. |
| **Application-level** | מהי האפליקציה שרצה כאן בפועל — לא לפי הפורט, אלא לפי התוכן. זו אותה בדיקת תוכן בשכבה 7 שפגשנו ב-[[WAF]], והמרצה אכן מונה WAF בין יכולות ה-NGFW. |
| **Intrusion Prevention** | [[IPS]] — זיהוי וחסימה של תוכן זדוני בתוך התעבורה המותרת. |

![[משוואת_ה-NGFW__ארבעה_מרכיבים.png]]

### המרכיב שלא פגשתם עדיין: Stateful Inspection

חומת האש הקלאסית שלמדנו היא **חסרת זיכרון**. כל חבילה נבחנת בפני עצמה. חומת אש
מבוססת מצב זוכרת אילו חיבורים פתוחים כרגע, ולכן היא מסוגלת לשאול שאלה חדשה:
*האם החבילה הזו שייכת לשיחה שאנחנו כבר מנהלים?*

המרצה מגדיר: **"A stateful inspection firewall, sometimes known as a
'conventional' firewall, allows or blocks traffic based on state, port, and
protocol."** ומוסיף שהיא בוחנת מנות ומנטרת גם **Malicious activities**,
**Suspicious commands** ו-**Questionable session activity patterns**. הוא מסמן
אותה בכותרת השקופית כ-**Stateful FW (Gen 3)**.

:::warning
זכרו את מה שראינו בסעיף הקודם: **Stateful Inspection עדיין אינה packet
inspection.** היא עוקבת אחרי מצב החיבור, לא אחרי תוכן ה-payload. חומת אש מבוססת
מצב לא תדע שמה שרץ על פורט 25 אינו SMTP. בשביל זה קיימים שני המרכיבים הבאים
במשוואה — Application-level ו-Intrusion Prevention. זו בדיוק הסיבה שהמשוואה
**מצטברת**.
:::
![[המרכיב_שמשנה_את_התמונה.png]]
### חמש היכולות של NG Firewall

| #   | יכולת (במילותיו)                                                                       |
| --- | -------------------------------------------------------------------------------------- |
| 1   | Identify **applications** regardless of port, protocol, evasive tactic or SSL          |
| 2   | Identify **users** regardless of IP address                                            |
| 3   | Protect **in real-time** against threats embedded across applications                  |
| 4   | **Fine-grained visibility** and policy control over application access / functionality |
| 5   | **Multi-gigabit, in-line** deployment with no performance degradation                  |

שתי היכולות הראשונות הן בדיוק התשובה לשתי אי-השוויונות הראשונות: Ports ≠
Applications ו-IP Addresses ≠ Users.
![[5_יכולות_קריטיות_של_NGFW.png]]

:::selfcheck
question: מדוע לא מספיק להוסיף Stateful Inspection לחומת האש כדי לפתור את בעיית ה-"Ports ≠ Applications"?
answer: מפני ש-Stateful Inspection מוסיפה ממד אחד בלבד — **state** — לצד port ו-protocol. היא יודעת אם החבילה שייכת לחיבור קיים, אבל היא עדיין לא בוחנת את התוכן ולכן לא יודעת **איזו אפליקציה** רצה בתוך החיבור הזה. המרצה מפורש: standard firewalls, גם stateful, "don't perform any packet inspection". רק המרכיבים Application-level ו-Intrusion Prevention סוגרים את הפער.
:::

---

## App-ID — לזהות את האפליקציה, לא את הפורט

**App-ID** הוא המנגנון שממש את היכולת הראשונה. במקום לכתוב כלל על פורט, כותבים
כלל על **אפליקציה**. ההבדל נראה זעיר בכתיבה ועצום בתוצאה:

| | NGFW (App-ID) | Legacy Firewall |
| --- | --- | --- |
| **הכלל** | ALLOW **SMTP** | ALLOW **Port 25** |

המרצה בונה השוואה מדורגת על פני ארבע שקופיות. בכל שלב הוא מוסיף עוד תעבורה שמגיעה
לפורט 25 — ומראה מה כל צד עושה איתה:

| התעבורה שמגיעה | NGFW (App-ID) — כלל: ALLOW SMTP | Legacy FW — כלל: ALLOW Port 25 (+ App IPS: Block Bittorrent) |
| --- | --- | --- |
| **SMTP** | SMTP = SMTP → **Allow** | Packet on Port 25 → **Allow** |
| **Bittorrent** | Bittorrent ≠ SMTP → **Deny**. *Bittorrent detected and blocked* | Bittorrent → **Deny** (רק כי הוגדר לו חוק מפורש) |
| **SSH / Skype / Ultrasurf** | כל אחד ≠ SMTP → **Deny**. *כל אפליקציה זוהתה ונחסמה* | Packet ≠ Bittorrent → **Allow**. *Packets on Port 25 allowed* |
| **Command & Control** | C&C ≠ SMTP → **Deny**. *Unknown traffic detected and blocked* | C&C ≠ Bittorrent → **Allow**. *Packet on Port 25 allowed* |

עכשיו קראו את הטבלה שוב, לאורך העמודה הימנית. ה-Legacy Firewall **קיבל תגבור** —
הוסיפו לו App IPS עם חוק "Block Bittorrent". הוא באמת חוסם Bittorrent. אבל SSH,
Skype, Ultrasurf ו-[[Command and Control]] — כולם עוברים.

:::important
זהו הרעיון המרכזי של כל היחידה. ה-Legacy Firewall חוסם **רק את מה שהוגדר לו
במפורש לחסום**. ה-NGFW מתיר **רק את מה שהוגדר לו במפורש להתיר** — וכל השאר, כולל
תעבורה שמעולם לא ראה, נופל החוצה. זו הסיבה שדווקא ה-C&C — התעבורה שאף אחד לא ידע
לצפות לה — היא הדוגמה שהמרצה בוחר לסגור בה.
:::

:::warning
שימו לב לניסוח של המרצה בשורה האחרונה: ה-NGFW מדווח **"Unknown traffic detected
and blocked"** — הוא לא "מזהה C&C". הוא מזהה שזה **לא SMTP**, ומספיק לו שזה לא
מוכר כדי לחסום. בגישת ה-App-ID, "לא זיהיתי" = "לא מתיר".
:::

### מה NGFW עדיין לא רואה

המרצה לא סוגר את היחידה בניצחון. באותה שקופית של המשוואה הוא מונה חמישה דברים
שנשארים **"blind to the scope of compromise"** — עיוורים להיקף ההדבקה — גם אחרי
Point-in-time Detection: **Sleep Techniques**, **Unknown Protocols**,
**Encryption**, **Polymorphism** ו-**Lateral Movement**. והוא מוסיף:
*"Initial Disposition = Clean. If actual Disposition is Bad = Too Late!!"* — קובץ
שנבדק ואושר ברגע הכניסה, ורק אחר כך מתגלה כזדוני, כבר בפנים.

![[נקודות_עיוורות_של_חומת_אש.png]]

:::selfcheck
question: בית חולים מפעיל Legacy Firewall עם הכלל "ALLOW Port 25" ו-App IPS עם החוק "Block Bittorrent". תוקף שכבר בתוך הרשת מוציא תקשורת C&C דרך פורט 25. מה יקרה, ולמה NGFW היה עוצר את זה?
answer: ה-Legacy Firewall יעביר את התעבורה. הכלל שלו הוא על פורט, והפורט מותר; ה-App IPS בודק רק דבר אחד — האם זה Bittorrent — והתשובה היא לא, ולכן "C&C ≠ Bittorrent → Allow". הדיווח שיתקבל: "Packet on Port 25 allowed". ה-NGFW, לעומת זאת, לא שואל "האם זה אסור" אלא "האם זה SMTP". התשובה שלילית, ולכן: "Command & Control ≠ SMTP → Deny", עם דיווח "Unknown traffic detected and blocked".
:::

---

## AI Firewall — הרחבה, לא חומר מבחן

:::important
**סעיף בעל תשואה נמוכה.** נושא ה-AI Firewall מופיע במצגת ה-Firewall (דק 05), אך
**לא נשאלה עליו ולו שאלה אחת באף אחד משלושת מבחני העבר**. קראו אותו פעם אחת
להיכרות והמשיכו הלאה — אל תשקיעו בו זמן חזרה.
:::

**GEN AI FW** (Firewall for AI) הוא רכיב שיושב בין ה-Front end / API Call לבין
מודל ה-LLM, ומבצע שתי בדיקות:

- **Request validation** — "Run detection and validation checks + rules to block
  attacks and unwanted prompts" — חוסם התקפות ופרומפטים לא רצויים בכניסה.
- **Response validation** — "Run detection and validation to prevent PII and
  harmful content to leave the application" — מונע יציאת מידע אישי (PII) ותוכן
  מזיק בחזרה החוצה.

האיום המרכזי שהוא מטפל בו נקרא **Prompt Injection**. ההבדל מ-[[NGFW]] הוא הבדל של
**שכבה**:

| | AI Firewall | NGFW |
| --- | --- | --- |
| **מיקוד** | LLMs, AI applications, GenAI workflows | Network layer, application protocols |
| **מה נבדק** | קלט ופלט בשפה טבעית | Packets, ports, known malware, protocol headers |
| **יכולות** | Prompt filtering, output redaction, API control | IDS/IPS, antivirus, WAF, URL filtering |
| **שכבת פריסה** | App / API / model layer | Network perimeter, routers, VPN endpoints |
| **סוגי איום** | Prompt injection, data leaks, model abuse | DDoS, malware, phishing, ransomware |

:::selfcheck
question: מדוע AI Firewall אינו "עוד יכולת בתוך NGFW"?
answer: כי הוא פועל בשכבה אחרת לגמרי. NGFW יושב בפרימטר הרשת ובודק חבילות, פורטים ופרוטוקולים; AI Firewall יושב בשכבת ה-App/API/model ובודק **טקסט בשפה טבעית** — פרומפט נכנס ותשובה יוצאת. תעבורת prompt injection היא HTTPS תקין לחלוטין מבחינת NGFW.
:::

---

:::keypoints
- הבעיה: **Ports ≠ Applications · IP Addresses ≠ Users · Packets ≠ Content**. החומה הקלאסית עדיין חוסמת — אבל היא כבר לא רואה.
- חומות אש רגילות, **stateful ו-stateless כאחד, אינן מבצעות packet inspection**. מי שבודק תוכן הוא ה-IPS.
- **Technology Sprawl & Creep**: "עוד קופסאות" אינן פתרון — לכל "עוזר" יש ראייה חלקית, והתחזוקה יקרה ומורכבת.
- **NGFW = UTM.** שני שמות לאותו קונספט, ואף אחד מהם אינו תקן: פתרון אבטחה שלם במערכת אחת מנוהלת מרכזית.
- **המשוואה:** Static Packet Filtering + Stateful Inspection + Application-level + Intrusion Prevention.
- **Stateful Inspection** = allow/block לפי **state, port, protocol**. היא מוסיפה זיכרון של חיבורים — לא בדיקת תוכן.
- **App-ID** = הכלל הוא "ALLOW SMTP", לא "ALLOW Port 25". מה שאינו SMTP — נחסם, גם אם מעולם לא ראינו אותו.
- Legacy FW חוסם רק את מה שהוגדר לו לחסום; NGFW מתיר רק את מה שהוגדר לו להתיר. לכן C&C עובר אצל האחד ונחסם אצל השני.
- **התשובה שהמבחן מחפש:** היתרון של NGFW הוא זיהוי וחסימת איומים **ברמת האפליקציה** — לא ביצועים ולא הצפנה.
:::

![[Gen AI FW2.png]]

:::quiz{ref="ngfw-quiz"}:::

:::flashcards{ref="ngfw"}:::