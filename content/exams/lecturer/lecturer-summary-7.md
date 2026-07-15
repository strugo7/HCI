---
id: lecture-summary-7
kind: lecturer
title: "מבחן סימולציה מתקדם — תשתיות וארכיטקטורה להגנת הסייבר 2"
year: 2026
duration: 5400
source: generated
---

# מבחן סימולציה מתקדם — תשתיות וארכיטקטורה להגנת הסייבר

## Question

id: q-lecture-summary-7-001
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Micro-segmentation
  - East-West Traffic

**סיפור מקרה 1:** חברת פיתוח תוכנה גדולה, "SecureDev", מטמיעה ארכיטקטורת Micro-segmentation כדי להגן על שרתיה הפנימיים בסביבת הענן הפרטי שלה. החברה מפעילה מאות שרתי אפליקציה ושרתי בסיסי נתונים. המטרה היא למנוע תנועה רוחבית (East-West traffic) במקרה של פריצה. מנהל אבטחת המידע הציג את התוכנית להטמעת Firewalls מבוססי-תוכנה על כל שרת ושרת.

איזה מהבאים הוא החיסרון המשמעותי ביותר הנובע מהטמעת Micro-segmentation ברמת השרתים הבודדים, בהשוואה ל-segmentation מסורתי ברמת ה-Switch/Router?

### Answers

A. קושי רב בניהול מדיניות האבטחה (Policy) באופן עקבי מול מאות רכיבי אבטחה מבוזרים.
B. חוסר יכולת לנטר תעבורת North-South היוצאת מהארגון לאינטרנט.
C. המנגנון לא יעיל כנגד תקיפות מסוג SQL Injection המתבצעות ישירות על האפליקציה.
D. צריכת משאבי GPU מוגזמת על שרתי האפליקציה לצורך עיבוד התעבורה המוצפנת.

Correct: A

Explanation: ניהול עקבי של חוקים (Consistency) מול מאות או אלפי נקודות אכיפה מבוזרות (Distributed Firewalls on Hosts) הוא האתגר הגדול ביותר. ללא כלי ניהול מרכזיים (Orchestration), המערכת עלולה להוביל ל"חורי אבטחה" בשל חוקים שאינם תואמים בין שרתים. האפשרויות האחרות אינן נכונות: תעבורת North-South עדיין עוברת פרימטר, ה-Micro-seg מיועד למנוע East-West (רוחבית), ו-Micro-seg מבוסס תוכנה לרוב משתמש ב-CPU ולא GPU לעיבוד.

Learning Objective: להסביר את אתגר הניהול והעקביות של נקודות אכיפה מבוזרות במימוש Micro-segmentation.

---

## Question

id: q-lecture-summary-7-002
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Zero Trust
  - Posture Check

(המשך לסיפור מקרה 1) חברת "SecureDev" מאמצת מודל Zero Trust. כחלק ממדיניות החברה, כל חיבור למשאבי פיתוח מחייב "בדיקת תקינות" (Posture Check) של ציוד הקצה. עובד מתחבר באמצעות עמדת פיתוח ארגונית. למרות שהמשתמש הזדהה בהצלחה (MFA), המערכת חוסמת את גישתו ל-Git Repository.

איזה מהמאפיינים הבאים של בדיקת התקינות סביר ביותר שגרם לחסימה?

### Answers

A. המשתמש הזדהה ממערכת הפעלה לינוקס, בעוד מדיניות הגישה מאשרת רק מערכות ווינדוס.
B. מערכת ה-EDR בתחנת הקצה דיווחה על "תחנה לא תקינה" (Unhealthy/compromised) בשל גילוי Malware זדוני.
C. המשתמש הזדהה מכתובת IP המוכרת כ"כתובת מהימנה" ברשימות הארגון.
D. המשתמש הזדהה מכתובת IP המוכרת כ"כתובת Untrust Zone" הממוקמת בפרימטר הרשת.

Correct: B

Explanation: בדיקת Posture ב-Zero Trust מתמקדת במצב התחנה *בזמן אמת*. דוח מ-EDR על כך שהתחנה נפגעה (Compromised/Malicious activity) הוא גורם ישיר לחסימת גישה, גם אם המשתמש הזדהה בהצלחה. סוג מ"ה אינו Posturing Check אלא אכיפת מדיניות (Policy). האפשרויות האחרות המבוססות על כתובת IP (מהימנה או באזור לא מאובטח) הפוכות או לא רלוונטיות למצב התחנה עצמה.

Learning Objective: לזהות את תפקידו של Posture Check במודל Zero Trust לחסימת גישה מתחנות פגועות בזמן אמת.

---

## Question

id: q-lecture-summary-7-003
type: multiple-choice
difficulty: hard
cognitive: evaluate
estimatedTime: 90
points: 5
concepts:
  - WAF
  - IPS
  - False Positives

(המשך לסיפור מקרה 1) לאחר הטמעת ה-Micro-segmentation, החברה פריסה WAF מול שרת ה-DevOps המרכזי. המפתחים מתלוננים כי ה-WAF חוסם בקשות לגיטימיות של העלאת קוד (Push) המתבצעות באמצעות API, בטענה שהן מסווגות כמתקפות Remote Code Execution (RCE). המפתח טוען שהבקשות אינן זדוניות וכי החוק ב-WAF חייב להשתנות.

כיצד על מנהל האבטחה לטפל במצב זה מבלי לפגוע באבטחת המערכת?

### Answers

A. לשנות את ה-WAF ממצב "Blocking" למצב "Alerting" לצורך ניטור הפעילות בלבד.
B. להגדיר "Exception" (חריגה) ב-WAF לחוק ה-RCE עבור כתובת ה-IP הספציפית של תחנת הפיתוח.
C. לבחור באפשרות "Tuning" (כיוונון) של החוק: להוסיף 'Exception' ספציפי בתוך חוק ה-RCE, כך שיאשר את סוג התוכן הלגיטימי (Payload) המתקבל מהמפתח, מבלי לבטל את החוק כולו.
D. להסיר את ה-WAF ולהסתמך על IPS Inline המותקן בפרימטר של הרשת כולה.

Correct: C

Explanation: False Positive הוא אתגר גדול ב-WAF. חסימת בקשות לגיטימיות פוגעת בעבודה. הפתרון הנכון הוא Tuning: כיוונון עדין של החוק, לא ביטולו או שינוי מצבו. יש לבחון את ה-Payload של המפתח ולהוסיף חריגה נקודתית המאשרת *רק* את סוג הקוד הזה, ולא Exception כללי ל-IP (שכן אז ה-IP הזה יכול לבצע התקפה). ביטול Blocking או הסרת WAF פוגעים באבטחה.

Learning Objective: להסביר כיצד לבצע כיוונון (Tuning) של חוקי WAF לפתרון False Positive מבלי לפגוע באבטחה.

---

## Question

id: q-lecture-summary-7-004
type: multiple-choice
difficulty: medium
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - HIDS
  - File Integrity Monitoring

(המשך לסיפור מקרה 1) בסריקת HIDS המתבצעת מדי יום על שרת ה-DevOps, המערכת מתריעה על שינוי בלתי מורשה בקובץ `config.json` השייך למערכת ה-Deployment. בדיקה נוספת העלתה כי השינוי בוצע על ידי תהליך `git-sync`.

איזה מהצעדים הבאים הנכון ביותר ליישום בקונטקסט של File Integrity Monitoring?

### Answers

A. לעדכן את מדיניות ה-HIDS כך שתאשר את התהליך `git-sync` כ"תהליך מהימן" לשינוי קבצים בתיקיית ה-Configuration הספציפית הזו.
B. להוסיף Exception ב-FW הארגוני לפורט הגישה של שרת ה-DevOps.
C. להחליף את ה-HIDS במערכת DPI המבוססת על Deep Packet Inspection בפרימטר.
D. לחסום את התהליך `git-sync` ולהסיר את ה-HIDS מהשרת.

Correct: A

Explanation: File Integrity Monitoring (מנגנון ב-HIDS) מתריע על שינויים בקבצים קריטיים. אם התברר שהשינוי בוצע על ידי תהליך לגיטימי של המערכת (כמו `git-sync`), יש לעדכן את מדיניות ה-HIDS (Whitelist) כך שהמערכת תכיר בתהליך זה כמהימן לביצוע שינויים באותו מיקום ספציפי, ובכך למנוע התרעות שגאות בעתיד (False Positive Management).

Learning Objective: ליישם ניהול False Positives ב-File Integrity Monitoring (FIM) על ידי הגדרת תהליכים מורשים.

---

## Question

id: q-lecture-summary-7-005
type: multiple-choice
difficulty: medium
cognitive: evaluate
estimatedTime: 90
points: 5
concepts:
  - Honeytokens

(המשך לסיפור מקרה 1) כדי לזהות הדלפת קוד מקור, מנהל האבטחה משתיל קבצים בעלי שמות מבלבלים כגון `git-config-prod.json` אשר מכילים מפתחות API פיקטיביים אך לגיטימיים לכאורה. מפתחות אלו רשומים ב-Honeytoken Management System.

מהו היתרון המרכזי בשימוש ב-Honeytokens ברמת האפליקציה?

### Answers

A. הם מונעים מתקפות מסוג SQL Injection על בסיס הנתונים הארגוני.
B. הם מאטים את קצב הגלישה של המפתחים כדי למנוע טעויות אנוש.
C. הם מספקים התרעה מיידית כאשר גורם חיצוני או פנימי ניגש או מנסה להשתמש במידע הפיקטיבי, ובכך מוכיחים פריצה.
D. הם מחליפים את הצורך ב-WAF Inline בפרימטר של רשת הפיתוח.

Correct: C

Explanation: Honeytokens הם "מידע פיתיון" (deception) ברמת האפליקציה או הנתונים. הגישה אליהם אינה לגיטימית. ברגע שמישהו (תוקף חיצוני או פנימי) ניגש אליהם או מנסה להשתמש בהם (כמו שימוש ב-API Key פיקטיבי), המערכת יודעת ב-100% שיש פריצה, ומספקת התרעה קריטית. אין להם תפקיד חסימה או האטה, והם אינם מחליפים WAF.

Learning Objective: להסביר את היתרון של שימוש ב-Honeytokens כמנגנון Deception לזיהוי חדירות מהימן.

---

## Question

id: q-lecture-summary-7-006
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - DDoS
  - DNS Reflection
  - Network Architecture

![[ddos attack exam question.png]]



עיין בטופולוגיה ובסיטואציה המבצעית באיור 1.
אחד מהנכסים הקריטיים של הארגון, שרת Web Cluster ב-DMZ (192.168.1.10), נמצא תחת מתקפת DDoS מאסיבית.
נתיב התעבורה הראשי של ה-DDoS הוא ה-Untrust Zone -> NGFW. ה-IPS/IDS Inline כשל מלחסום את התעבורה.

בהסתמך על הטופולוגיה, מהי החולשה הארכיטקטונית המשמעותית ביותר המנוצלת כדי להגביר את המתקפה, וכיצד היא מתבצעת?

### Answers

A. ה-NGFW מאשר תעבורת SYN Flood בפורט 443 המגיעה ישירות ל-Web Cluster.
B. תוקפים ב-Internal Trust Zone (10.0.0.0/16) משתמשים בעמדות משתמשים כדי לבצע מתקפת Reflection DDoS על ה-Web Cluster.
C. תוקפים חיצוניים (Untrust Zone) מנצלים את שרת ה-DNS הפנימי (10.0.0.5) כ-Reflection Amplifier, על ידי שליחת שאילתות קטנות המזוייפות מכתובת ה-IP של ה-Web Cluster, וכך שרת ה-DNS מציף אותו בתשובות ה-DNS הגדולות והמוגברות (כפי שמראים החצים הכתומים היוצאים מ-DNS פנימה אל הDMZ).
D. ה-DB Proxy ב-DMZ מחובר ישירות לאינטרנט ומשמש כמקור ל-DDoS.

Correct: C

Explanation: זוהי שאלה קשה הדורשת ניתוח של נתיבי התעבורה באיור 1.
1. ה-Web Cluster (192.168.1.10) ב-DMZ הוא היעד (DDoS Target).
2. ישנן שתי תעבורות DDoS באיור: אדומה וכתומה.
3. התעבורה האדומה (הישירה) עוברת NGFW, כאשר ה-IPS Inline נכשל לחסום אותה.
4. החולשה הארכיטקטונית היא *התעבורה הכתובה* ("Reflection Traffic Path"). תוקפים ב-Internet שולחים שאילתות DNS (פורט 53) קטנות לשרת ה-DNS הפנימי (10.0.0.5). כתובת ה-IP *המקורית* של השאילתות הללו זוייפה (Spoofed) להיות כתובת ה-IP של ה-Web Cluster (192.168.1.10). שרת ה-DNS הפנימי מציף את ה-Web Cluster בDMZ בתשובות ה-DNS הגדולות והמוגברות (כפי שמראים החצים הכתומים היוצאים מ-DNS פנימה אל הDMZ). האפשרות לפיה עמדות משתמש פנימיות מנוצלות אינה נכונה שכן התנועה היא חיצונית. כמו כן, ה-DB Proxy מבודד ואינו יכול לשמש כמקור חיצוני של המתקפה.

Learning Objective: לנתח מתקפת Reflection/Amplification DDoS המנצלת שרת DNS פנימי כנגד נכס ב-DMZ.

---

## Question

id: q-lecture-summary-7-007
type: multiple-choice
difficulty: hard
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - SSL/TLS Inspection
  - Network Architecture

ארגון מטמיע SSL/TLS Inspection ב-NGFW של הפרימטר. המטרה היא לאפשר ניתוח Payload של תעבורת HTTPs. הארגון מספק תעודות CA ארגוניות (Private CA) לכל תחנות הקצה. משתמש פנימי מנסה לגשת לאתר הבנק שלו (למשל, https://bank.com). המשתמש מקבל התרעת אבטחה בדפדפן על "תעודת CA לא מהימנה". המשתמש מתקשר למוקד התמיכה ומתלונן על ניסיון פריצה.

בהנחה שה-SSL Inspection עובד כהלכה לשאר האתרים, מהי הסיבה המרכזית לתקלה, ומהי הדרך הנכונה ביותר לפתור אותה לפי "הגנה לעומק" ורגולציה?

### Answers

A. תעודת ה-CA הארגונית לא הותקנה כראוי במאגר ה-Trusted Root CAs של תחנת הקצה.
B. ה-FW מבצע SSL Inspection גם לתעבורה פיננסית/רגישה, והדפדפן מזהה שהתעודה נחתמה על ידי ה-CA הארגונית במקום על ידי ה-CA הציבורית המהימנה של הבנק, ובכך חוסם ניסיון הונאה. הפתרון: ביטול ה-SSL Inspection לחלוטין.
C. ה-CA הארגוני פג תוקף. הפתרון: הנפקת CA חדש.
D. הארגון מחויב רגולטורית (ולפי עקרונות פרטיות) *לא לנטר* תעבורה בעלת רגישות גבוהה (כגון בנקים/בריאות). יש להגדיר Exception (חריגה) ב-SSL Inspection של ה-NGFW, המאפשרת מעקף של SSL Decryption עבור קטגוריית "Finance" או ה-Domain הספציפי.

Correct: D

Explanation: SSL Inspection הוא חיובי אך דורש עדינות. בדיקת Payloads של תעבורת בנק היא פגיעה חמורה בפרטיות (ולעיתים אינה חוקית רגולטורית). הדפדפנים המודרניים משתמשים ב-Cert Pinning (או מנגנונים דומים) כדי לזהות שהתעודה נחתמה על ידי הCA האמיתי, ולעולם לא יסמכו על CA ארגוני. הטמעת SSL Inspection *חייבת* לכלול Exceptions (חריגות) לקטגוריות רגישות כמו Finance או Health, גם כדי למנוע False Positives וגם כדי לשמור על פרטיות. ביטול ה-SSL Inspection לחלוטין אינו נכון שכן הוא פוגע בעיקרון של "הגנה לעומק".

Learning Objective: להסביר את הצורך בהחרגת קטגוריות רגישות (כגון פיננסים/בריאות) מתהליכי SSL Inspection.

---

## Question

id: q-lecture-summary-7-008
type: multiple-choice
difficulty: medium
cognitive: remember
estimatedTime: 90
points: 5
concepts:
  - RFC 2828
  - Disclosure

על פי RFC 2828, תקיפה בה גורם לא מורשה משיג גישה לקרוא קובץ מוצפן על שרת הארגון, ובעזרת יכולת עיבוד גבוהה מצליח לפענח אותו ולחשוף את המידע הסודי המצוי בו (PII), מוגדרת כפגיעה באיזה עקרון ואיזה סוג איום?

### Answers

A. שלמות (Integrity) / שיבוש (Modification).
B. זמינות (Availability) / הפרעה (Disruption).
C. סודיות (Confidentiality) / חשיפה (Disclosure).
D. סודיות (Confidentiality) / התחזות (Deception).

Correct: C

Explanation: חשיפת מידע מוצפן (או כל מידע סודי) בפני גורם שאינו מורשה לראותו היא פגיעה ישירה בסודיות (Confidentiality). במותל RFC 2828, פעולה זו מסווגת כחשיפה (Disclosure).

Learning Objective: לזהות פגיעה בעיקרון הסודיות (Confidentiality) וסיווגה כ-Disclosure לפי RFC 2828.

---

## Question

id: q-lecture-summary-7-009
type: multiple-choice
difficulty: hard
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - IPS
  - WAF

מערכת IDS ממוקמת בטופולוגיה Out-of-Band (מחוץ לנתיב התעבורה). היא מנטרת תעבורת ווב (Web traffic) היוצאת אל שרתי ה-DMZ. תוקף חיצוני מנסה לבצע מתקפת SQL Injection מורכבת על שרת ה-Web דרך פרוטוקול HTTPS מוצפן.
מי מהבאים מתאר בצורה המדויקת ביותר את הפגיעות בטכנולוגיות ההגנה השונות?

### Answers

A. ה-IDS לא יראה את המתקפה כלל, כי היא מוצפנת. ה-WAF (אם קיים inline) יחסום אותה כי הוא מבצע Decryption ומנתח Payloads.
B. ה-IDS יתריע על המתקפה, אך לא יחסום אותה, כי הוא Out-of-Band. ה-WAF לא מיועד לחסום SQL Injection.
C. שתי המערכות יכשלו לחלוטין בזיהוי המתקפה, כי היא מבוססת על Zero-Day Payload.
D. ה-IDS יחסום את המתקפה כי יש לו חתימה עבורה, בעוד ה-WAF יכשל.

Correct: A

Explanation:
1. **IDS (Out-of-Band):** ממוקם מחוץ לנתיב. הוא *לא מנטר* HTTPS (מוצפן) כי אין לו יכולת SSL Decryption. הוא כמעט לעולם לא יראה את ה-SQL Injection.
2. **IPS (Inline):** נמצא בנתיב, אך לרוב IDS אינו Inline.
3. **WAF (Inline):** ממוקם ב-L7, inline. הוא *כן מבצע* SSL Decryption, ולכן הוא רואה את ה-Payload של ה-HTTP ויכול לזהות ולחסום SQL Injection (שאינהZero-Day).

Learning Objective: להשוות בין יכולת הפענוח והניתוח של WAF Inline לבין מגבלות IDS Out-of-Band בתעבורה מוצפנת.

---

## Question

id: q-lecture-summary-7-010
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - Authentication
  - Authentication Factors

תהליך ההזדהות (Authentication) הארגוני מחייב MFA (Multifactor Authentication). משתמש נדרש להזין סיסמה (Knowledge), ולהשתמש באפליקציית Authenticator המותקנת על הטלפון שלו (Possession).
החברה שוקלת להוסיף סריקת טביעת אצבע (Biometric).

לאיזו קטגוריה שייך הגורם השלישי הזה, והאם הוספתו הופכת את התהליך ל-Three-Factor Authentication (3FA)?

### Answers

A. Possession / כן, הוא הופך ל-3FA כי יש עכשיו שלושה פקטורים שונים.
B. Inheritance / כן, כי טביעת אצבע שייכת לפקטור ה-Inheritance, וקיימים כעת שלושה פקטורים שונים.
C. Inheritance / לא, כי טביעת אצבע שייכת לפקטור ה-Possession.
D. Knowledge / כן, הוא הופך ל-3FA.

Correct: B

Explanation: פקטורי אימות:
1. **Something you know:** סיסמה.
2. **Something you have (Possession):** טלפון, מפתח USB.
3. **Something you are (Inheritance):** טביעת אצבע, זיהוי פנים.
טביעת אצבע היא Inheritance. ברגע שיש שלושה פקטורים משלוש קטגוריות שונות (Know, Have, Are), התהליך הופך ל-3FA (פקטורים מרובים).

Learning Objective: לסווג גורמי אימות לקטגוריות השונות (Knowledge, Possession, Inheritance) ולהגדיר 3FA.

---

## Question

id: q-lecture-summary-7-011
type: multiple-choice
difficulty: hard
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - IoT Security
  - Attack Surface

ארגון מטמיע מכשירי IoT רבים (כגון מצלמות חכמות וחיישנים) בתוך רשת ה"Internal Trust Zone" שלו. ארגון האבטחה מתנגד נחרצות, וטוען כי יש להציב אותם ב-Segment מבודד. מנהל הפרויקט טוען שהדבר יפגע בתפעול ויגדיל Latency.

איזה מהבאים הוא הטיעון החזק ביותר של ארגון האבטחה, המדגיש את הגידול ב-Attack Surface?

### Answers

A. מכשירי IoT דורשים פורטים פתוחים רבים בפרימטר של הרשת, ובכך מגדילים את משטח התקיפה הנכנס.
B. למכשירי IoT יש לעיתים קרובות יכולות אבטחה חלשות, עדכוני firmware נדירים, ואינם ניתנים להתקנת Agents. הימצאותם ב-Internal Zone מאפשרת תנועה רוחבית (East-West) קלה לשאר הנכסים הקריטיים במקרה של פריצה.
C. מכשירי IoT אינם יכולים לגלוש לאינטרנט כלל, ולכן אין טעם בהצבתם ב-Segment מבודד.
D. המכשירים משתמשים בפרוטוקולים מוצפנים בצורה מאובטחת, ולכן אין סיכון בקרבתם לנכסים פנימיים.

Correct: B

Explanation: מכשירי IoT מוגדרים לרוב כחוליה חלשה (Shadow IT). האבטחה בהם דלה, לעיתים יש בהם קוד פגיע, והם אינם תומכים בEDR Agents. אם הם יושבים ב-Internal Trust Zone יחד עם שרתי פיתוח/נתונים, פריצה למצלמת IoT אחת מאפשרת תנועה רוחבית (Lateral Movement) ישירה לנכסים אלו. הצבתם ב-Segment מבודד ומוגדר Least Privilege ב-Zero Trust היא קריטית.

Learning Objective: להסביר את הסיכונים של אי-הפרדת מכשירי IoT (Shadow IT) מהרשת הפנימית המאובטחת.

---

## Question

id: q-lecture-summary-7-012
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - DDoS
  - Application DDoS

תוקף מציף את שרת ה-Web של הארגון ב-DMZ במספר אדיר של בקשות HTTP GET תקניות, הנשלחות ישירות ל-URI הספציפי האחראי על תהליך Login מורכב. כל בקשה גורמת לשרת לבצע מספר שאילתות קשות מול בסיס הנתונים (DB), ובכך גורמת ל-DB Proxy לקרוס עקב עומס יתר על ה-CPU, למרות שתעבורת הרשת בפרימטר היא תקנית לחלוטין.

איזה סוג DDoS התרחש כאן, ואיזה רכיב יזהה אותו בצורה היעילה ביותר?

### Answers

A. Network Layer DDoS (SYN Flood) / Network Firewall.
B. Application Layer DDoS (L7 DDoS) / WAF.
C. Network Layer DDoS (SYN Flood) / IPS.
D. DNS DDoS / DNS Server.

Correct: B

Explanation: התקפה זו מתבצעת ברמת האפליקציה (שכבה 7): בקשות HTTP GET לגיטימיות המכוונות לנקודה חלשה באפליקציה כדי לייצר עומס משאבים (CPU) על ה-Backend. Firewall מסורתי (L3/L4) לא יזהה התקפה זו כי התעבורה היא לגיטימית. WAF, הממוקם ב-L7 ומנתח את קצב ה-Requests הספציפי ל-URI, הוא הרכיב היעיל ביותר לזיהוי וחסימת התקפה זו.

Learning Objective: להבחין בין מתקפות DDoS בשכבת הרשת לשכבת האפליקציה ולזהות את רכיבי ההגנה המתאימים.

---

## Question

id: q-lecture-summary-7-013
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Identity Management
  - Federation

חברת האם הצרפתית, "ParentCorp", רכשה חברה ישראלית, "Acquiree". שתי החברות משתמשות במערכות Identity Management שונות לחלוטין. המטרה היא לאפשר לעובדי החברה הישראלית לגשת למערכת הפורטל הארגונית של חברת האם הצרפתית, מבלי להנפיק להם יוזרים חדשים במערכת הצרפתית.
הארגון בחר להשתמש ב-Identity Federation מבוסס SAML.

איזה מהגופים הבאים משמש כ-Service Provider (SP) ואיזה כ-Identity Provider (IdP) בתרחיש זה, ואיפה נשמרים המפתחות הקריפטוגרפיים?

### Answers

A. החברה הישראלית (Acquiree) היא ה-IdP; חברת האם הצרפתית (ParentCorp) היא ה-SP. המפתחות הפרטיים לחתימת ה-Assertion נשמרים אצל החברה הצרפתית (SP).
B. החברה הצרפתית (ParentCorp) היא ה-IdP; החברה הישראלית (Acquiree) היא ה-SP. המפתחות הפרטיים נשמרים אצל החברה הצרפתית (IdP).
C. החברה הישראלית (Acquiree) היא ה-IdP; חברת האם הצרפתית (ParentCorp) היא ה-Service Provider (SP). המפתחות הפרטיים לחתימת ה-SAML Assertion נשמרים אצל החברה הישראלית (IdP), והמפתחות הציבוריים לאימות החתימה נמסרים לחברה הצרפתית (SP).
D. אין צורך במפתחות קריפטוגרפיים ב-Federation.

Correct: C

Explanation: SAML Federation:
1. עובדי החברה הישראלית (Acquiree) רוצים גישה. לכן, Acquiree היא ה-IdP (מספקת את הזהות/ההזדהות).
2. הפורטל של ParentCorp הוא השירות המבוקש. ParentCorp היא ה-Service Provider (SP).
3. ה-IdP (הישראלית) מאמתת את המשתמש ומנפיקה SAML assertion. ה-assertion הזה נחתם קריפטוגרפית על ידי ה-IdP באמצעות המפתח הפרטי (הנשמר אצל ה-IdP). ה-assertion החתום נשלח ל-SP (ParentCorp). ה-SP מאמת את החתימה בעזרת המפתח הציבורי של ה-IdP (שנמסר לו מראש).

Learning Objective: לתאר את יחסי הגומלין וחלוקת המפתחות בין Identity Provider (IdP) לבין Service Provider (SP) ב-SAML Federation.

---

## Question

id: q-lecture-summary-7-014
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - WAF
  - Threat Intelligence

בסריקת SIEM של הארגון, זוהו אלפי אירועי False Positives מ-WAF Inline בפרימטר של שרת DevOps חדש. ה-WAF חוסם בקשות REST API לגיטימיות של המפתחים, בטענה שהן מסווגות כמתקפות SQL Injection. הארגון רכש שירות Threat Intelligence (TI) יקר המציג רשימת IP addresses של בבוטים וקבוצות תקיפה מוכרות.

איזה מהמהלכים הבאים הוא הניצול היעיל והחכם ביותר של ה Threat Intelligence (TI) כדי לפתור את הFalse Positive בWAF?

### Answers

A. לעדכן את ה-WAF Inline כך שיחסום אוטומטית כל בקשה המגיעה מכתובות ה-IP המופיעות ב-Threat Intelligence Feed.
B. להתעלם לחלוטין מה-False Positive מהWAF, כי Threat Intelligence Feed אינו מספק מידע על payloads של API.
C. לבצע Tuning (כיוונון עדין) לחוק ב-WAF. במקביל, להשתמש ב-Threat Intelligence Feed *רק* כדי להוריד את רמת החשד הכללית (Security Posture) על כתובות ה-IP של המפתחים הפנימיים, בכדי שה-WAF יתייחס אליהם בפחות חשדנות מלכתחילה.
D. להחליף את ה-WAF inline במערכת DLP בפרימטר, המסתמכת על הTI feed.

Correct: C

Explanation: Threat Intelligence (TI) מספק מידע על *מי* תוקף (IP addresses). WAF מטפל *באיך* תוקפים (Payload). TI אינו כלי Tuning. כדי לפתור False Positive Payload-based, חייבים לעשות Tuning (כיוונון עדין של החוקים). אולם, ניתן להשתמש ב-TI כדי לזהות שכתובות ה-IP של המפתחים הן "מהימנות" ובכך להוריד את סף ה"רעש" (Heuristic threshold) עליהן, מה שיוריד את הסיכוי ל-False Positive מלכתחילה. האפשרויות האחרות אינן פותרות את בעיית ה-Payload.

Learning Objective: להסביר כיצד לשלב בין מנגנון Threat Intelligence לבין כיוונון חוקי WAF לצמצום False Positives.

---

## Question

id: q-lecture-summary-7-015
type: multiple-choice
difficulty: medium
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Incident Response Steps
  - Containment
  - Eradication

מהלך Incident Response (IR) לזיהוי Malware עוין שהתגלה על שרת קריטי ב-Internal Trust Zone. מנהל האירוע פוקד: "לנתק מיידית את השרת מהרשת הפיזית". לאחר מכן, מנהל האירוע פוקד: "לבצע ניקוי מלא של השרת, להתקין מחדש מערכת הפעלה ולהשחזר קבצי גיבוי מורשים".

איזה מהשלבים הבאים של תהליך Incident Response steps התבצעו כעת?

### Answers

A. הניתוק הוא Eradication; הניקוי הוא Containment.
B. הניתוק הוא Containment; הניקוי הוא Eradication.
C. שני הצעדים שייכים לשלב ה-Preparation.
D. שני הצעדים שייכים לשלב ה-Lesson Learned.

Correct: B

Explanation: שלבי Incident Response:
1. **Preparation:** מניעה.
2. **Detection/Analysis:** זיהוי.
3. **Containment:** בלימה. ניתוק השרת מהרשת פועל *מיידית* לבלימת ההתפשטות East-West ולמניעת C&C.
4. **Eradication:** ניקוי. ניקוי המערכת, התקנה מחדש של OS, והחזרת קבצים בריאים פועלים *לניקוי* האיום מהשרת עצמו.
5. **Recovery:** החזרה לעבודה.
6. **Lesson Learned.**

Learning Objective: להבחין בין שלבי Containment (בלימה) ל-Eradication (ניקוי) בתהליך תגובה לאירוע (Incident Response).

---

## Question

id: q-lecture-summary-7-016
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 90
points: 5
concepts:
  - Rootkit
  - Malware

סוג מ Malware המתוכנן לאפשר גישה עמוקה והרשאות ניהול (Root/SYSTEM) למחשב, תוך הסתרת נוכחותו מקבצים, תהליכים (Processes), ומערכת ההפעלה עצמה. מנגנונים אלו הופכים את ה-Malware לעמיד בפני כלי ניטור מסורתיים. Malware זה נקרא ביותר:

### Answers

A. Adware
B. logic bomb
C. Macro Virus
D. Rootkit

Correct: D

Explanation: Rootkit.

Learning Objective: לזהות את מאפייני האחיזה (Persistence) וההסוואה של Rootkit ברמת מערכת ההפעלה.

---

## Question

id: q-lecture-summary-7-017
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Software Supply Chain Security

מתקפת סייבר מתוחכמת על חברת תוכנה מובילה. התוקפים הצליחו לשתול קוד פגיע (Malware Payload) בתוך ספרייה המהווה קובץ מקור (Source code) של רכיב קוד פתוח (Open Source) פופולרי. הקוד הזדוני נטען לתוך עשרות מוצרים סופיים של חברות אחרות המשתמשות באותה ספרייה.
זהו סוג של איום המוכר ביותר כ:

### Answers

A. Network Layer DDoS.
B. SQL Injection.
C. Software Supply Chain Attack.
D. Authentication Bypass.

Correct: C

Explanation: זוהי מתקפת Software Supply Chain Attack. התקיפה אינה מכוונת ישירות לחברה הפגיעה, אלא לחברה הנמצאת למעלה ב"שרשרת האספקה" של התוכנה (כגון חברת קוד פתוח). פגיעה בחוליה החלשה גורמת להדבקה של כל המוצרים המסתמכים על אותו רכיב, ובכך מגדילה את היקף הפריצה בצורה אדירה.

Learning Objective: להגדיר Software Supply Chain Attack ולהבין כיצד היא משפיעה על מוצרי קצה.

---

## Question

id: q-lecture-summary-7-018
type: multiple-choice
difficulty: hard
cognitive: apply
estimatedTime: 90
points: 5
concepts:
  - Legacy Systems
  - Virtual Patching

ארגון מפעיל שרתLegacy פנימי ב Internal Trust Zone אשר מריץ מערכת הפעלה Windows Server 2008 R2 (שפגה תוקפה). שרת זה קריטי לתפעול אך אינו ניתן לעדכון. התגלה פגיעות Zero-Day קריטית ב-SMB של הLegacy, אך החברה לא יכולה להנפיק טלאי אבטחה. הארגון מפעיל IPS Inline הממוקם מאחורי הפרימטר.

על פי עקרון "הגנה לעומק" (Defense in Depth) ובהיעדר ה Patch, מהו הפתרון היעיל ביותר לצמצום הסיכון, תוך ניצול ה-IPS?

### Answers

A. לעדכן את ה-WAF המותקן מול הDevOps ה Legacy.
B. יישום מנגנון Virtual Patching: הטמעת חתימת אבטחה ממוקדת ב-IPS המזהה את ה Zero-Day, בכדי שה-IPS יחסום את הPayload הזדוני המכוון לפורט הSMB (445) של ה Legacy ה Legacy *מבלי* לעדכן את ה-OS.
C. ניתוק ה Legacy ה Legacy ה Legacy ה Legacy מהרשת הפיזית לצמיתות.
D. החלפת ה-IPS Inline במערכת DLP בפרימטר.

Correct: B

Explanation: Virtual Patching הוא טכניקת אבטחה קריטית למערכות Legacy שאינן ניתנות לעדכון. במקום Patch על הOS, מטמיעים חתימת אבטחה ב-IPS inline הממוקם מאחוריו. החתימה מזהה את ה payload ספציפי של ה zero-day. ה-IPS חוסם את התעבורה הזדונית בדרכה לשרת Legacy, ובכך "מטליא" את הפגיעות ברמת הרשת (Virtual) מבלי לשנות את השרת הפגיע עצמו. WAF/DLP אינם רלוונטיים. ניתוק אינו אפשרי לפי הסיפור.

Learning Objective: להסביר כיצד Virtual Patching מגן על מערכות Legacy באמצעות חוקי IPS.

---

## Question
id: q-lecture-summary-7-019
type: multiple-choice
difficulty: hard
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - RFC 2828
  - Fabrication

על פי RFC 2828, תקיפה בה תוקף מצליח להזריק קוד PHP זדוני לתוך שרת Web בDMZ, ובכך לגרום לשרת לטעון קוד שלא היה קיים בו קודם ולהריץ אותו, מוגדרת כפגיעה באיזה עקרון ואיזה סוג איום?

### Answers

A. סודיות (Confidentiality) / חשיפה (Disclosure).
B. שלמות (Integrity) / שיבוש (Modification).
C. שלמות (Integrity) / ייצור / זיוף (Fabrication).
D. זמינות (Availability) / הפרעה (Disruption).

Correct: C

Explanation: הזרקת קוד (Code Injection) היא יצירה או "ייצור" (Fabrication) של נתונים או פונקציות שלא היו קיימים קודם בתוך המערכת הפגיעה, תוך פגיעה בשלמות המערכת. RFC 2828 מגדיר פעולה זו כ Fabrication. אפשרות השיבוש (Modification) אינה נכונה שכן מדובר בשינוי של ה*קוד* (Code modified but not new functions). ב Fabrication נוצר משהו חדש לחלוטין.

Learning Objective: להבחין בין Fabrication לבין Modification בסיווג איומים לפי RFC 2828.

---

## Question
id: q-lecture-summary-7-020
type: multiple-choice
difficulty: hard
cognitive: understand
estimatedTime: 90
points: 5
concepts:
  - WAF
  - Threat Intelligence

ארגון מפעיל WAF Inline מול שרת ה DevOps. לאחר Tuning מוצלח (כמו ב-C בשאלה 3), הארגון רכש שירות Threat Intelligence (TI) יקר המציג רשימת IP addresses של בבוטים וקבוצות תקיפה מוכרות. הארגון מטמיע את הTI feed אוטומטית לתוך הWAF.

כיצד על הארגון לטפל ב False Positive ה payloads בWAF, כעת לאחר הטמעת הTI feed?

### Answers

A. להחליף את הWAF inline במערכת DLP בפרימטר המסתמכת על הTI feed.
B. להתעלם לחלוטין מה false positive ה payloads בWAF, כי הTI feed מטפל כעת בכל התוקפים.
C. לבצע tuning (כיוונון עדין) לחוק בWAF (כמו ב-C בשאלה 3), במקביל לשימוש ב-TI feed המעדכן את ה-IP reputation של הכתובות.
D. להסיר את הWAF Inline לחלוטין ולהסתמך רק על TI feeds פרימטריים.

Correct: C

Explanation: Threat Intelligence (TI) מספק מידע על *מי* תוקף (IP reputation). WAF מטפל *באיך* תוקפים (Payload behavior). שניהם נחוצים (Defense in Depth). TI feed יחסום תוקפים מוכרים בL3/L4/L7 *מבלי* צורך ב-payload analysis (כיוון שהם מסווגים כ-malicious IPs). אולם, כיוון שה-DevOps עדיין פגיע ל-payload based attacks (zero-days) ממקורות לא מוכרים (False Positives), עדיין חייבים כיוונון של חוקי ה-WAF (Tuning) במקביל לשימוש ב-TI. הם אינם מחליפים אחד את השני. TI גם לא פותר payloads.

Learning Objective: להסביר את ההבדל וההשלמה ההדדית בין ניתוח Payload ב-WAF לבין סינון כתובות ב-Threat Intelligence.