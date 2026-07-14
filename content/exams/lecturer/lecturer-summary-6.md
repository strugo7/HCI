---
id: lecture-summary-6
kind: lecturer
title: "מבחן סימולציה מתקדם — תשתיות וארכיטקטורה להגנת הסייבר"
year: 2026
duration: 5400
source: "generated"
---

# מבחן סימולציה מתקדם — תשתיות וארכיטקטורה להגנת הסייבר

<!--
  המבחן נבנה במבנה תואם 1 ל-1 לקובצי המרצה, כולל מאפייני המטא-דאטה, רמת הקושי וההסברים.
-->

## Question

id: q-lecture-summary-6-001
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - DMZ
  - Network Architecture

**סיפור מקרה 1:** חברת "GlobalTech" משדרגת את תשתית הרשת שלה לאחר מעבר לעבודה היברידית. החברה מפעילה שירותי Web הפתוחים ללקוחות (אשר מתארחים מקומית), וכן שרתי מסדי נתונים (DB) פנימיים המכילים מידע רגיש (PII). בנוסף, העובדים ניגשים למשאבי הארגון מרחוק דרך VPN. לאחרונה, החברה רכשה חומת אש מהדור החדש (NGFW) ומערכת NIDS.

היכן המיקום הנכון ביותר בארכיטקטורה להציב את שרתי ה-Web הפומביים של החברה, ומהי תצורת הגישה הנכונה למסדי הנתונים?

### Answers

A. ב-DMZ, כאשר הגישה למסד הנתונים מתבצעת ישירות מהאינטרנט אך ורק לכתובות IP מורשות.
B. ברשת הפנימית (Trust Zone), כדי להגן עליהם עם ה-NGFW, תוך הפניית תעבורת Port 80/443 אליהם.
C. ב-DMZ, תוך מתן הרשאות גישה נקודתיות לשרת ה-Web אל מסד הנתונים שברשת הפנימית בפורט הרלוונטי בלבד.
D. ברשת החיצונית (Untrust Zone) ללא הגנה, על מנת להפחית עומס על חומת האש הארגונית מול תעבורת הלקוחות.

Correct: C

Explanation: ה-DMZ נועד לבודד שירותים ציבוריים מהרשת הפנימית. שרת ה-Web חייב לשבת ב-DMZ כדי למנוע חדירה ישירה לרשת הפנימית במקרה של פריצה. הגישה ממנו ל-DB (שנמצא ברשת הפנימית) חייבת להיות מוגבלת לפורט הספציפי הנדרש, תוך שימוש בחוקי חומת אש.

---

## Question

id: q-lecture-summary-6-002
type: multiple-choice
difficulty: medium
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - VPN
  - Zero Trust
  - IPS

(המשך לסיפור מקרה 1) עובד חברה מתחבר מרחוק באמצעות ה-VPN הארגוני. מהי הגישה הארכיטקטונית הבטוחה ביותר לטיפול בתעבורה שלו?

### Answers

A. הפניית התעבורה המוצפנת שלו ל-DMZ תחילה ומשם לרשת הפנימית.
B. חיבור ישיר לרשת הפנימית (Trust Zone) תוך הסתמכות על הזדהות ה-VPN בלבד.
C. סיום ה-VPN (Termination) באזור ייעודי (כגון DMZ או Segment נפרד) ובדיקת התעבורה עם IPS לפני הכניסה לרשת הפנימית.
D. מעקף של חומת האש לחלוטין כדי למנוע פגיעה בביצועי ה-VPN (Latency).

Correct: C

Explanation: מודל האבטחה המסורתי שנותן אמון אוטומטי לחיבורי VPN אינו מספק כיום (Zero Trust). יש לסיים את החיבור באזור מבודד ולהעביר את התעבורה דרך בקרות אבטחה כגון IPS לפני הגישה למשאבים הפנימיים.

---

## Question

id: q-lecture-summary-6-003
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - NIDS
  - Encrypted Traffic

(המשך לסיפור מקרה 1) מערכת ה-NIDS שהותקנה ברשת הארגונית זיהתה תעבורה חריגה, אך מכיוון שהתעבורה מוצפנת, היא אינה יכולה לקרוא את ה-Payload. כיצד יכולה המערכת לזהות בכל זאת פעילות זדונית מתוך התעבורה המוצפנת?

### Answers

A. NIDS אינה יכולה לנתח תעבורה מוצפנת בשום מצב ללא מפתחות הפענוח.
B. על ידי ניתוח מטא-נתונים (Metadata) כגון קצב החבילות, גדלי החבילות ותדרי התקשורת.
C. המערכת תתקין Agent על שרת היעד (HIDS) שיבצע את הניתוח במקומה.
D. חסימה אוטומטית של כל תעבורה מוצפנת שלא זוהתה מראש בחוקי ה-NGFW.

Correct: B

Explanation: זיהוי אנומליות בתעבורה מוצפנת מסתמך לרוב על מאפיינים תעבורתיים (Metadata) כמו דפוסי זרימה, גדלי חבילות, או בקשות DNS מקדימות, גם מבלי לראות את התוכן הפנימי.

---

## Question

id: q-lecture-summary-6-004
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - RFC 2828
  - Availability
  - DDoS

(המשך לסיפור מקרה 1) במהלך התקפת DDoS על שרת ה-Web של החברה ב-DMZ, משאבי השרת נוצלו עד תום, אך לא שונו קבצים או נגנב מידע. לפי מודל RFC 2828, איזה עיקרון של משולש ה-CIA נפגע, ומהו סוג האיום (Threat Type)?

### Answers

A. שלמות (Integrity) / שיבוש (Modification).
B. זמינות (Availability) / השבתה (Interruption/Disruption).
C. סודיות (Confidentiality) / יירוט (Interception).
D. סודיות (Confidentiality) / התחזות (Deception).

Correct: B

Explanation: התקפת DDoS פוגעת ביכולת המערכת לספק שירות (זמינות). במודל של RFC 2828, תקיפה שמונעת גישה למשאב או מעכבת אותה באופן חריג מסווגת כהשבתה (Disruption/Interruption).

---

## Question

id: q-lecture-summary-6-005
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - NGFW
  - Legacy FW
  - DPI

(המשך לסיפור מקרה 1) ה-NGFW של החברה הוגדר לאפשר תעבורה בפורט 53 בלבד לשרת ה-DNS שב-DMZ. תוקף מנסה להשתמש ב-DNS Tunneling כדי להוציא נתונים (Exfiltration) דרך אותו פורט. מדוע Firewall מסורתי (Legacy) לא היה חוסם את התקיפה, ואיזו יכולת של ה-NGFW מונעת זאת?

### Answers

A. FW מסורתי לא בודק פורטים; NGFW מחייב IPS מובנה בכל חוק.
B. FW מסורתי בודק רק תעבורה נכנסת; NGFW בודק גם יוצאת.
C. FW מסורתי מאשר את התעבורה כי הפורט (53) מותר; NGFW משתמש ב-App-ID או DPI כדי לוודא שהתעבורה היא אכן פרוטוקול DNS תקין.
D. שתי המערכות לא יכולות לחסום זאת כיוון שפורט 53 קריטי לאינטרנט ואין לסנן אותו.

Correct: C

Explanation: FW Legacy מתבסס על שכבות L3/L4 (IP ופורטים). ברגע שפורט מותר, כל תוכן שיעבור דרכו יאושר. NGFW מבצע Deep Packet Inspection או זיהוי אפליקטיבי (App-ID) כדי לוודא שתוכן התעבורה בפורט 53 הוא אכן שאילתות DNS לגיטימיות ולא תעבורת Data ממנהרה.

---

## Question

id: q-lecture-summary-6-006
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - Attack Surface
  - Attack Vector

**סיפור מקרה 2:** במהלך מבדק חדירות פנימי (Penetration Test), זיהו הבודקים שרת פנימי בעל מספר פורטים פתוחים שלא לצורך (כגון RDP ו-Telnet). באחת ההדגמות, הצליחו הבודקים להעלות קובץ PHP זדוני למערכת ניהול תוכן (CMS), מה שאפשר להם להריץ פקודות מרחוק על השרת.

איזה מהמשפטים הבאים מתאר בצורה המדויקת ביותר את ההבדל בין משטח התקיפה (Attack Surface) לווקטור התקיפה (Attack Vector) בתרחיש זה?

### Answers

A. משטח התקיפה הוא ה-CMS; וקטור התקיפה הוא שרת ה-RDP הפתוח.
B. משטח התקיפה כולל את כל הפורטים והשירותים החשופים; וקטור התקיפה הוא העלאת קובץ ה-PHP הזדוני וניצולו.
C. משטח התקיפה ווקטור התקיפה הם מונחים נרדפים המתארים את הפורטים הפתוחים בשרת.
D. וקטור התקיפה הוא מספר הפורטים הפתוחים; משטח התקיפה הוא קובץ ה-PHP.

Correct: B

Explanation: Attack Surface מייצג את "כלל החשיפה" (כל הפתחים האפשריים: שירותים, פורטים, אפליקציות). Attack Vector מייצג את ה"איך" או הנתיב הספציפי שבו השתמש התוקף (ניצול הפגיעות הספציפית ב-CMS דרך ה-PHP).

---

## Question

id: q-lecture-summary-6-007
type: multiple-choice
difficulty: hard
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - Web Shell
  - Secure Coding

(המשך לסיפור מקרה 2) קובץ ה-PHP הזדוני שהועלה לשרת מהווה דוגמה קלאסית ל-Web Shell. מהי הדרך היעילה ביותר בשכבת האפליקציה (Application Layer) למנוע התקפה מסוג זה בעתיד?

### Answers

A. עדכון חתימות האנטי-וירוס בשרת בתדירות גבוהה יותר.
B. חסימת כל תעבורת ה-HTTP והעברת המערכת ל-HTTPS בלבד.
C. יישום מנגנון רשימה לבנה (Whitelisting) לסוגי קבצים, בדיקת תוכנם (Validation) ואחסונם מחוץ לתיקיית ה-Web Root.
D. פריסת HIDS על השרת שתתריע על כל בקשת POST של משתמשים.

Correct: C

Explanation: הדרך היעילה ביותר למניעת Web Shells בשכבת האפליקציה היא לא לסמוך על קלט המשתמש: לוודא שמועלים רק סוגי קבצים מורשים, לסרוק/לוודא את תוכנם, ולא לשמור אותם בתיקייה נגישה להרצה על ידי שרת ה-Web.

---

## Question

id: q-lecture-summary-6-008
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 90
points: 5
concepts:
  - Ransomware
  - Malware

(המשך לסיפור מקרה 2) לאחר הרצת פקודות בעזרת ה-Web Shell, התוקפים התקינו על השרת תוכנה אשר הצפינה את בסיס הנתונים ודרשה תשלום במטבע וירטואלי לשם שחרורו. זהו סוג של Malware המוכר כ:

### Answers

A. Ransomware
B. Spyware
C. Rootkit
D. Worm

Correct: A

Explanation: תוכנת כופר (Ransomware) חוסמת גישה למערכת או מצפינה קבצים/נתונים, והתוקפים דורשים כופר (בדרך כלל במטבע קריפטוגרפי) כדי לשחרר את הגישה.

---

## Question

id: q-lecture-summary-6-009
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - Rootkit
  - Persistence

(המשך לסיפור מקרה 2) כדי לשמור על אחיזה במערכת (Persistence), התוקפים ביצעו שינוי בהגדרות מערכת ההפעלה של השרת כך שהתוכנה הזדונית תטען לפני כל שירות לגיטימי של מערכת ההפעלה, תוך הסתרת התהליך מפני כלי ניטור רגילים. טכניקה זו מאפיינת ביותר:

### Answers

A. Adware
B. Rootkit
C. Logic Bomb
D. Macro Virus

Correct: B

Explanation: Rootkit מתוכנן לאפשר גישה עמוקה והרשאות ניהול (Root/SYSTEM) למחשב תוך הסתרת נוכחותו מקבצים, תהליכים (Processes) ומערכת ההפעלה עצמה.

---

## Question

id: q-lecture-summary-6-010
type: multiple-choice
difficulty: medium
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - Defense in Depth
  - DLP

על פי עקרון "הגנה לעומק" (Defense in Depth), מי מהאמצעים הבאים נועד להגנה בשכבת ה-Data במקרה של ניסיון גניבת המידע לפני הצפנתו?

### Answers

A. שימוש במערכת WAF מול שרת ה-Web.
B. התקנת Firewall ברשת הפרימטר (Perimeter).
C. שימוש במערכת EDR על עמדות הקצה בארגון.
D. יישום מערכת DLP (Data Loss Prevention) לניטור וחסימת יציאת נתונים רגישים.

Correct: D

Explanation: במודל Defense in Depth, מערכת DLP ממוקדת בשכבת הנתונים (Data) ותפקידה למנוע הדלפת מידע רגיש החוצה, בניגוד ל-WAF (שכבת אפליקציה) או FW (שכבת רשת).

---

## Question

id: q-lecture-summary-6-011
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - RFC 2828
  - Usurpation

על פי RFC 2828, תקיפה בה משתמש לא מורשה משיג גישה למערכת ומשתמש בה כאילו היה משתמש לגיטימי (למשל על ידי שימוש ב-Credentials גנובים) מוגדרת כ:

### Answers

A. Deception
B. Usurpation
C. Fabrication
D. Disruption

Correct: B

Explanation: Usurpation (או Misappropriation) היא תקיפה המאפשרת לישות בלתי מורשית להשתלט על שירותי מערכת או פונקציות. פגיעה כזו עוסקת בשימוש לרעה במשאבים או סמכויות מערכת.

---

## Question

id: q-lecture-summary-6-012
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - IPS
  - Inline Deployment

מערכת IPS (Intrusion Prevention System) ממוקמת בדרך כלל בארכיטקטורת Inline ברשת. מהו החיסרון המשמעותי ביותר הנובע מצורת פריסה זו?

### Answers

A. חוסר יכולת לבצע לוגים לאירועים שנחסמו.
B. במקרה של False Positive, המערכת תחסום תעבורה עסקית לגיטימית ותפגע ברציפות העבודה.
C. היא יכולה לנטר רק תעבורה שיוצאת מהארגון ולא תעבורה נכנסת.
D. היא דורשת סוכן (Agent) על כל תחנת קצה כדי לפעול.

Correct: B

Explanation: מאחר ש-IPS פועל inline (בנתיב התעבורה) ויש לו יכולת חסימה אקטיבית, זיהוי שגוי (False Positive) עלול לחסום משתמשים אמיתיים ולגרום לנזק תפעולי מיידי, לעומת IDS שרק מתריע (Out of band).

---

## Question

id: q-lecture-summary-6-013
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - Cloud Security
  - Perimeter Defense

בסביבות מחשוב ענן (Cloud Environments), מודל ה-Perimeter Security הקלאסי (מרכז נתונים יחיד עם חומת אש קצה) נחשב למיושן ובלתי מספק. מהי הסיבה המרכזית לכך?

### Answers

A. ספקיות הענן לא מאפשרות התקנת חומות אש ברשתות שלהן בשום צורה.
B. תעבורת הענן לעולם אינה מוצפנת, ולכן אין טעם בבדיקת Firewalls בפרימטר.
C. משתמשים ועומסי עבודה (Workloads) נמצאים מחוץ לפרימטר הארגוני המסורתי ומשתנים באופן דינמי.
D. ספקי הענן מספקים הגנה מוחלטת מפני פריצות כך שאין צורך באמצעי אבטחה נוספים מטעם הלקוח.

Correct: C

Explanation: בעידן הענן והמיחשוב המבוזר, אין יותר נקודת כניסה אחת (Perimeter) מוגדרת היטב. השירותים נפרסים אצל מספר ספקים, המשתמשים ניגשים מכל מקום, ועומסי העבודה משתנים באופן דינמי.

---

## Question

id: q-lecture-summary-6-014
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 90
points: 5
concepts:
  - Identity Management
  - Authentication

תהליך זהות והזדהות (Authentication & Authorization) ברשת ארגונית חל על אילו ישויות?

### Answers

A. משתמשים אנושיים בלבד (עובדים ולקוחות).
B. רכיבי חומרה ותשתית בלבד (שרתים, נתבים).
C. ניהול זהות למשתמשים והזדהות למכונות בלבד.
D. כלל הישויות הפועלות ברשת - הן משתמשים אנושיים והן רכיבי רשת ומערכות המחוברות אליה.

Correct: D

Explanation: אבטחה ארגונית מודרנית מחייבת ניהול תהליכי זהות והזדהות מול בני אדם ומול מכונות (Machine Identities, שירותים, API, וכו'), במיוחד בארכיטקטורות Zero Trust.

---

## Question

id: q-lecture-summary-6-015
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - IPS
  - Signature Based
  - Zero-Day

חוק בחומת האש בארגון מגדיר: "ALLOW ANY ANY PORT 22". מערכת IPS שמבוססת על זיהוי חתימות (Signature Based) מותקנת מאחורי חומת האש. תוקף משתמש בפרצת Zero-Day (שאינה מוכרת לקהילת האבטחה) כנגד שרת ה-SSH בפורט 22. מה תהיה תגובת מערך ההגנה?

### Answers

A. ה-FW יחסום את התעבורה כי היא זדונית, וה-IPS יתריע על חריגה.
B. ה-FW יאפשר את התעבורה, וה-IPS יחסום אותה מכיוון שהיא מזהה אנומליות באופן אוטומטי.
C. התעבורה תעבור את ה-FW (הפורט מותר), וה-IPS לא יחסום כי אין לו חתימה עבור ה-Zero-Day.
D. שתי המערכות יקרסו עקב חוסר תאימות בפרוטוקול.

Correct: C

Explanation: ה-FW המסורתי מאפשר את הפורט. מאחר שה-IPS במקרה זה מבוסס חתימות (Knowledge-based), הוא מוגבל לזיהוי איומים מוכרים. התקפת Zero-Day נטולת חתימה, ולכן ה-IPS לא יזהה ויאפשר לה לעבור.

---

## Question

id: q-lecture-summary-6-016
type: multiple-choice
difficulty: medium
cognitive: compare
estimatedTime: 90
points: 5
concepts:
  - HIDS
  - NIDS

אחד היתרונות הבולטים של מערכת Host-based Intrusion Detection System (HIDS) על פני Network-based IDS (NIDS) הוא:

### Answers

A. יכולת לזהות שינויים בקבצי מערכת מקומיים של תחנת הקצה (File Integrity Monitoring).
B. היעדר מוחלט של צורך בהתקנת תוכנה מקומית על השרתים.
C. יכולת לנתח את כלל התעבורה העוברת דרך ה-Switch הארגוני בזמן אמת בצורה יעילה יותר.
D. עמידות גבוהה יותר בפני מתקפות DDoS ארגוניות על נתבים מרכזיים.

Correct: A

Explanation: HIDS מותקן על המכונה עצמה ולכן יכול לראות תהליכים, לוגים ושינויים בקבצי מערכת מקומיים. NIDS ממוקם ברשת ויכול לראות רק תעבורה חולפת, אך אין לו גישה לנעשה בתוך הדיסק הקשיח או בזיכרון התחנה המקומית.

---

## Question

id: q-lecture-summary-6-017
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - Data Classification
  - Defense in Depth

מה המשמעות של סיווג מידע (Data Classification) כחלק מתהליך Defense in Depth בארגון?

### Answers

A. הגדרת כל המידע בארגון בסיווג "סודי ביותר" כדי להבטיח את רמת האבטחה המקסימלית.
B. הצפנת כל התעבורה היוצאת מהארגון ללא הבחנה.
C. קטלוג המידע לפי רמות רגישות וערך לארגון, לצורך החלת בקרות אבטחה מותאמות וחיסכון במשאבים.
D. הפרדת ה-DMZ מהרשת הפנימית באמצעות שתי חומות אש מיצרנים שונים.

Correct: C

Explanation: לא כל המידע בארגון דורש אותה רמת הגנה. Data Classification מסייע בהפניית משאבי האבטחה המתאימים (הצפנה, בקרות גישה) למידע הרגיש והחשוב ביותר, ולאפשר נגישות נוחה יותר למידע פומבי או זניח.

---

## Question

id: q-lecture-summary-6-018
type: multiple-choice
difficulty: hard
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - DMZ
  - Trust Zone
  - Firewall Rules

כחלק ממימוש DMZ תקין, כיצד אמורה להתבצע התקשורת מה-DMZ לכיוון הרשת הפנימית (Trust Zone)?

### Answers

A. תקשורת חופשית, מכיוון שה-DMZ הוא אזור בשליטת הארגון.
B. מוגבלת לחלוטין וללא יוצא מן הכלל (Deny All) – לעולם לא מאפשרים קשר מ-DMZ פנימה.
C. מאושרת על ידי פתיחת פורטים ספציפיים ומוגדרים מראש אל שרתים יעודיים בלבד (לדוגמה פורט SQL ל-DB).
D. מנותבת תמיד דרך רשת האינטרנט כדי לוודא שספקיות התקשורת מסננות את התעבורה קודם.

Correct: C

Explanation: שירותים ב-DMZ (כגון שרת Web) חייבים לפעמים לגשת למאגרי נתונים פנימיים כדי לפעול. הגישה חייבת להיות מבוקרת (Least Privilege), מוגדרת היטב, ולהיות בפיקוח Firewall.

---

## Question

id: q-lecture-summary-6-019
type: multiple-choice
difficulty: medium
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - RFC 2828
  - Disruption
  - LLM Threats

באיומי AI ו-LLM, תוקף מציף את ה-Endpoint של המודל במספר אדיר של שאילתות מורכבות במטרה לנצל את משאבי ה-GPU/CPU עד קריסה. על פי מודל ה-RFC 2828, לאיזו קטגוריה שייך תרחיש זה?

### Answers

A. Disclosure
B. Deception
C. Disruption
D. Usurpation

Correct: C

Explanation: פעולה שמציפה משאבים ופוגעת בזמינות המערכת וברציפות השירות, תוך יצירת מניעת שירות (כמו DDoS או Resource Exhaustion), שייכת לקטגוריית ההפרעה (Disruption - פגיעה בזמינות).

---

## Question

id: q-lecture-summary-6-020
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - WAF
  - Application Security
  - XSS

מנהל אבטחה התבקש לתכנן ארכיטקטורה חדשה שתאפשר הקמת יישום ווב חדש. הארגון חושש מטכניקות כגון SQL Injection ו-Cross-Site Scripting (XSS). איזה רכיב הגנה יעניק את המענה הממוקד והיעיל ביותר נגד איומים אלו?

### Answers

A. Network Firewall קלאסי (L3/L4).
B. WAF (Web Application Firewall) המוצב לפני שרתי ה-Web.
C. מערכת DLP (Data Loss Prevention) לאכיפת מדיניות המידע.
D. מערכת NAC (Network Access Control) לאימות ציוד הקצה.

Correct: B

Explanation: התקפות XSS ו-SQL Injection הן התקפות אפליקטיביות (שכבה 7 - HTTP/S). חומת אש אפליקטיבית ל-Web מתוכננת במיוחד לנתח בקשות HTTP ולזהות Payload זדוני כמו פקודות SQL או סקריפטים שהושתלו. רכיבי רשת קלאסיים לא יזהו התקפות אלו כיוון שהן מתבצעות על גבי פרוטוקול ותעבורה לגיטימיים לכאורה.
