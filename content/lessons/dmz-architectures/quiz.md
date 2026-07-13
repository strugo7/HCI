---
id: dmz-architectures-quiz
lesson: dmz-architectures
title: שאלון — ארכיטקטורות DMZ
---

## Question

id: q-dmz-architectures-001
type: architecture
difficulty: medium
cognitive: evaluate
estimatedTime: 75
points: 5
concepts:
  - Three-Legged DMZ
  - Screened Subnet
  - Defense in Depth

לפניכם שלוש אפשרויות להפרדה בין הרשת הפנימית של הארגון לבין רשת האינטרנט.
**בהנחה שבשלוש האפשרויות הרכיבים זהים לחלוטין** ברמת חומת האש, ה-DMZ וה-IDS —
איזו אפשרות מספקת את מענה ההגנה החזק ביותר?

### Scenario

- **אפשרות A** — חומת אש אחת, וה-DMZ תלוי ממנה כרגל שלישית, בין הרשת הפנימית
  לאינטרנט הציבורי.
- **אפשרות B** — שתי חומות אש בטור, וה-DMZ ממוקם ביניהן.
- **אפשרות C** — חומת אש אחת בלבד, ללא DMZ כלל.

### Answers

A. אפשרות A — ה-DMZ מנוהל במדיניות אחת, ולכן פחות סביר שתיפול בו טעות תצורה שתיצור פרצה.

B. אפשרות B — כל נתיב מהאינטרנט לרשת הפנימית חוצה שתי חומות אש עצמאיות, ולכן פריצת החומה החיצונית אינה מספיקה כדי להגיע לנכסי הליבה.

C. אפשרות C — צמצום מספר מקטעי הרשת מקטין את משטח התקיפה, ולכן ארכיטקטורה ללא DMZ חשופה פחות.

D. שלוש האפשרויות שקולות, מפני שרמת ההגנה נקבעת על ידי הרכיבים ולא על ידי אופן חיבורם.

E. אפשרות A ואפשרות B שקולות, מכיוון שבשתיהן קיים DMZ — ונוכחות ה-DMZ היא הגורם הקובע.

Correct: B

Explanation: זו הסוגיה המרכזית של הפרק: **ההגנה נקבעת על ידי הטופולוגיה, לא על ידי הרכיבים**. באפשרות B (Screened Subnet) ה-DMZ כלוא בין שתי חומות אש, ולכן אין נתיב מהאינטרנט לרשת הפנימית שאינו חוצה שתי נקודות אכיפה עצמאיות; גם אם החיצונית נפרצה, הפנימית עדיין מגנה על נכסי הליבה. זהו Defense in Depth, והמרצה מסמן ארכיטקטורה זו כ-ENTERPRISE STANDARD (4/5 כוכבי אבטחה). **A שגויה** — Three-Legged הוא Single Point of Failure: אותה חומת אש משמשת גם כשער מהאינטרנט וגם כמחסום בין ה-DMZ לפנים, ולכן "מדיניות אחת" היא חיסרון ולא יתרון (2/5 כוכבים). **C שגויה** — ויתור על ה-DMZ אינו מקטין את משטח התקיפה אלא מבטל את החציצה: השרתים הפומביים והנכסים הפנימיים חולקים אזור אמון אחד, ופריצה אחת מספיקה. **D שגויה** — זו בדיוק ההנחה שהשאלה באה להפריך; רכיבים זהים בחיבור שונה נותנים הגנה שונה. **E שגויה** — עצם קיומו של DMZ אינו מספיק; מה שקובע הוא כמה שכבות אכיפה עומדות בין ה-DMZ לרשת הפנימית.

Difficulty: medium

Concepts: Three-Legged DMZ, Screened Subnet, Defense in Depth

Bloom: evaluate

Learning Objective: להעריך ארכיטקטורות DMZ חלופיות ולקבוע איזו מספקת הגנה חזקה יותר, בהינתן רכיבים זהים.

Misconception: סטודנטים מניחים שרמת ההגנה נגזרת מהציוד שנרכש. בפועל היא נגזרת מהסידור — אותה חומת אש ואותו DMZ, מחוברים אחרת, נותנים 2/5 או 4/5 כוכבי אבטחה.

---

## Question

id: q-dmz-architectures-002
type: comparison
difficulty: medium
cognitive: understand
estimatedTime: 70
points: 5
concepts:
  - Screened Subnet
  - Three-Legged DMZ

בנק שוקל לעבור לפתרון Dual Firewall, במקום חומת אש יחידה שמחלקת **לוגית** בין
החלק המחובר אל מחוץ לארגון לבין החלק המחובר פנימה. מהו היתרון **המשמעותי ביותר**
של המעבר?

### Answers

A. אפשרות להשתמש בשני ספקים או שתי טכנולוגיות חומת אש שונות, כך שכשל או חולשה באחד לא יאפשרו לתוקף לפרוץ בקלות לרשת הפנימית.

B. צמצום דרמטי של עלויות הרישוי והתחזוקה, מכיוון שכל חומת אש מטפלת בכמות תעבורה קטנה יותר.

C. הפחתת ההשהיה (latency) בתעבורה, מכיוון שהעומס מתחלק בין שני מכשירים.

D. פישוט התפעול, שכן כל חומת אש מקבלת מדיניות קצרה יותר ולכן קל יותר לתחזק את שתיהן יחד.

E. ייתור הצורך בהצפנת התעבורה בין ה-DMZ לרשת הפנימית, מכיוון שקיימת חומת אש בכל אחד משני קצוות המקטע.

Correct: A

Explanation: התשובה היא **Vendor Diversity**, ובלשון המרצה: "Use different vendors for each firewall to reduce single-vulnerability exposure. A zero-day in one vendor won't compromise both layers." המפתח הוא המילה "לוגית" בשאלה: חלוקה לוגית לממשקים בתוך מכשיר אחד אינה הפרדה אמיתית — זהו עדיין קוד אחד וחולשה אחת. שני ספקים שונים הופכים את שתי השכבות לבלתי תלויות. **B שגויה והפוכה** — המרצה רושם במפורש Higher cost בעמודת החסרונות; שתי חומות אש עולות יותר, לא פחות. **C שגויה והפוכה** — המרצה רושם More latency: התעבורה עוברת בשתי נקודות בדיקה בטור, ולכן ההשהיה **עולה**. **D שגויה והפוכה** — המרצה רושם Complex ops; ניהול שתי מדיניות עצמאיות מורכב יותר, לא פשוט יותר. **E שגויה** — חומת אש מסננת תעבורה ואינה מצפינה אותה; קיומן של שתיים אינו מייתר הצפנה, ובארכיטקטורה היברידית המרצה דורש להצפין את כל התעבורה בין הסביבות.

Difficulty: medium

Concepts: Screened Subnet, Three-Legged DMZ

Bloom: understand

Learning Objective: להסביר מהו Vendor Diversity ולזהותו כיתרון המשמעותי של Dual Firewall על פני חומת אש יחידה המחולקת לוגית.

Misconception: סטודנטים מחפשים את היתרון בכיוון "יותר זול / יותר פשוט / יותר מהיר" — בעוד ששלושת אלה הם דווקא ה-CONS שהמרצה רושם. היתרון הוא עמידות בפני חולשה משותפת.

---

## Question

id: q-dmz-architectures-003
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Three-Legged DMZ
  - Internal Firewall
  - Defense in Depth

איזו בקרה הייתה יכולה למנוע מהתוקף להגיע לשרתי הליבה?

### Scenario

בית חולים בנה DMZ בארכיטקטורת Three-Legged: חומת אש אחת עם שלושה ממשקים —
לאינטרנט, ל-DMZ (שרת Web ושרת דוא"ל) ולרשת הפנימית (מסדי הנתונים הרפואיים
ו-Active Directory). התוקף ניצל חולשת zero-day בחומת האש עצמה והשתלט עליה.

### Answers

A. הקשחת כללי פתיחת הפורטים באותה חומת אש, כך שתשמש כמעגל הגנה בפני עצמה גם לאחר ההשתלטות.

B. הגדרת כללי ניתוב גמישים באותה חומת אש, שינתבו מחדש תעבורה חשודה בחזרה אל ה-DMZ.

C. הצבת מכשיר אכיפה עצמאי נוסף מאחורי ה-DMZ — Internal Firewall ו/או IPS — שיבדוק את התעבורה בדרכה פנימה ויאכוף allow-list ללא any-any.

D. הצפנת כל התעבורה בין ה-DMZ לרשת הפנימית ב-TLS, כך שהתוקף לא יוכל לקרוא את תוכן הבקשות שהוא מעביר.

E. הגדלת תדירות עדכוני החתימות ב-IDS שממוקם בתוך ה-DMZ, כדי שיזהה את התוקף מוקדם יותר.

Correct: C

Explanation: ברגע שחומת האש היחידה נפלה, **כל בקרה שמתבצעת בתוכה חסרת ערך** — התוקף שולט בה ויכול לשנות כל כלל. זהו בדיוק ה-Single Point of Failure: "If firewall is compromised, attacker has direct path to all zones. No defense in depth between DMZ and internal network." רק מכשיר אכיפה **עצמאי**, שלא הושפע מהפריצה, יכול לעצור את התוקף בדרכו פנימה — וזהו ההיגיון שמאחורי Screened Subnet. **A ו-B שגויות מאותה סיבה בדיוק, וזו המלכודת המרכזית של השאלה**: שתיהן מציעות להקשיח כללים באותה חומת אש שכבר בשליטת התוקף. הקשחת פורטים או ניתוב במכשיר שנפרץ אינה מגינה מפני מי שמחזיק במכשיר. **D שגויה** — הצפנה מגנה על סודיות התעבורה מפני מאזין, אך אינה מונעת מהתוקף ליזום חיבורים לגיטימיים-לכאורה אל מסדי הנתונים; הוא אינו צריך לקרוא את התעבורה, הוא זה שמייצר אותה. **E שגויה** — IDS מתריע אך אינו חוסם, ומיקומו **בתוך** ה-DMZ אינו מכסה את הגבול שבין ה-DMZ לרשת הפנימית; המרצה מציין את המיקום "בין ה-DMZ לרשת הפנימית" כמיקום הרלוונטי.

Difficulty: hard

Concepts: Three-Legged DMZ, Internal Firewall, Defense in Depth

Bloom: analyze

Learning Objective: לנתח את השלכות ה-SPOF ולזהות שרק בקרה עצמאית מהמכשיר שנפרץ מספקת הגנה בשלב שלאחר הפריצה.

Misconception: סטודנטים מציעים "להגדיר כללים קשוחים יותר" כתשובה כמעט אוטומטית — ולא שמים לב שהכללים הללו נאכפים על ידי המכשיר שכבר אבד. בקרה שהתוקף שולט בה אינה בקרה.

---

## Question

id: q-dmz-architectures-004
type: architecture
difficulty: medium
cognitive: apply
estimatedTime: 70
points: 5
concepts:
  - Internal Firewall
  - DMZ

חברת הייטק בנתה Three-Tier DMZ: Tier 1 (Web/Proxy), Tier 2 (Application) ו-Tier 3
(Database). צוות הפיתוח מבקש לפתוח נתיב ישיר משרת ה-Web ב-Tier 1 אל מסד הנתונים
ב-Tier 3, "לשאילתות קריאה בלבד, כדי לחסוך latency". מהי התשובה הנכונה?

### Answers

A. יש לדחות את הבקשה — היא מפרה את הכלל "No tier skipping allowed", ומעניקה לשרת החשוף ביותר לאינטרנט נתיב ישיר אל הנכס היקר ביותר.

B. יש לאשר את הבקשה, בתנאי שהחיבור מוגבל לשאילתות קריאה בלבד — שאילתת קריאה אינה יכולה לשנות נתונים ולכן אינה מסכנת את שלמות מסד הנתונים.

C. יש לאשר את הבקשה, בתנאי שהתעבורה בין Tier 1 ל-Tier 3 תוצפן ב-TLS ותיחתם בתעודה הדדית.

D. יש לאשר את הבקשה, בתנאי שיוצב IDS על הנתיב החדש שינטר את השאילתות ויתריע על חריגות.

E. יש לדחות את הבקשה ולפתור את הבעיה בהעברת מסד הנתונים אל Tier 2, כך שהנתיב מ-Tier 1 יהיה לשכבה סמוכה בלבד.

Correct: A

Explanation: **"No tier skipping allowed"** הוא כלל מפורש ב-TRAFFIC FLOW RULES של המרצה: Internet → Tier 1 only · Tier 1 → Tier 2 (specific ports) · Tier 2 → Tier 3 (DB ports only). Tier 1 הוא השרת שמדבר עם האינטרנט ולכן הסביר ביותר להיפרץ; נתיב ישיר ממנו ל-Tier 3 הופך פריצה אחת לגישה לנתונים, ומרוקן את FW2 ו-FW3 ממשמעות. זוהי גם הפרצה שהמרצה מדרג כ-HIGH RISK ראשונה: "Direct database access from DMZ to internal". **B שגויה** — "קריאה בלבד" אינה מגבלה מול תוקף ששולט בשרת: הוא זה שמנסח את השאילתות, ובלאו הכי דליפת נתונים רפואיים או פיננסיים היא פגיעת סודיות חמורה גם ללא שינוי. **C שגויה** — הצפנה מגנה על התעבורה בדרך, לא על **מי** רשאי ליזום אותה; ערוץ מוצפן מ-Tier 1 ל-Tier 3 הוא עדיין tier skipping. **D שגויה** — IDS מתריע ואינו חוסם, ולכן הוא מקטין את זמן הגילוי אך אינו מונע את הגישה; הוא אינו תחליף לגבול אכיפה. **E שגויה** — העברת מסד הנתונים ל-Tier 2 אינה פותרת אלא מבטלת את ההפרדה: שכבת הנתונים תשב יחד עם שכבת היישום, בניגוד לכל היגיון ה-n-tier.

Difficulty: medium

Concepts: Internal Firewall, DMZ

Bloom: apply

Learning Objective: ליישם את כללי זרימת התעבורה של Three-Tier DMZ ולזהות הפרה של "No tier skipping allowed".

Misconception: סטודנטים מאמינים ש"קריאה בלבד" או "מוצפן" מנטרלים את הסיכון בנתיב עוקף שכבות. שניהם אינם רלוונטיים: הבעיה אינה בתוכן התעבורה אלא בעצם קיומו של נתיב ישיר מהשרת החשוף אל הנתונים.

---

## Question

id: q-dmz-architectures-005
type: scenario
difficulty: hard
cognitive: evaluate
estimatedTime: 80
points: 5
concepts:
  - Internal Firewall
  - Defense in Depth

בארגון גדול בסדר גודל של בנק, מהם השיקולים המרכזיים שיש לקחת בחשבון כאשר מחליטים
אם לפרוס חומת אש נוספת **בתוך** הרשת הארגונית (Internal Firewall)?

### Answers

A. ניהול סיכונים המשלב את היקף הנזק הצפוי אם ה-DMZ ייפרץ בהצלחה, את התקציב העומד לרשות הבנק, ואת רמת מורכבות התפעול שהארגון מסוגל לשאת.

B. העלות הכוללת של רכישת החומרה ושל כוח האדם התפעולי, מבלי להידרש להערכת סיכונים — התקציב הוא האילוץ המחייב היחיד.

C. הרצון לרכז את כל שכבות האבטחה על אותו מכשיר פיזי, כדי לקצר את זמן התגובה בעת אירוע ולפשט את הניהול.

D. היכולת לאפשר לכל גורם שמתחבר ל-DMZ לגשת אוטומטית גם לרשת הפנימית, לצורך מתן מענה מהיר ללקוחות.

E. החשש שחומת האש הפנימית תשבש את יכולות הסינון של חומת האש החיצונית, ולכן תפחית בפועל את רמת ההגנה הכוללת.

Correct: A

Explanation: ההחלטה על Internal Firewall היא **החלטת ניהול סיכונים**, וזהו בדיוק ה-CISO Decision Framework של המרצה: "Match architecture to risk appetite, regulatory requirements, and operational capabilities — **not just budget**." שלושת המרכיבים: היקף הנזק (blast radius) אם ה-DMZ ייפרץ, התקציב (Higher cost), ומורכבות התפעול (Complex ops) — שהמרצה עצמו רושם כשני החסרונות של הארכיטקטורה. **B שגויה** — היא סותרת ישירות את "not just budget"; תקציב הוא אילוץ, לא קריטריון החלטה יחיד. **C שגויה, וזהו בדיוק ההפך מהמטרה** — ריכוז כל שכבות האבטחה על מכשיר אחד הוא הגדרת ה-Single Point of Failure, ו-Internal Firewall קיים כדי לפרק אותו. **D שגויה** — גישה אוטומטית מה-DMZ פנימה היא "outbound any-any" שהמרצה מדרג HIGH RISK; הכלל הוא allow-list בלבד וללא גישה ישירה ל-AD/DB. **E שגויה** — שתי חומות האש אוכפות מדיניות **עצמאית** ואינן מבטלות זו את זו; זהו כל הרעיון של Defense in Depth, ו"אם אחת נכשלת, האחרות ממשיכות להגן".

Difficulty: hard

Concepts: Internal Firewall, Defense in Depth

Bloom: evaluate

Learning Objective: להעריך את השיקולים לפריסת Internal Firewall כהחלטת ניהול סיכונים, ולא כהחלטה תקציבית או טכנית בלבד.

Misconception: סטודנטים בוחרים במסיח התקציבי ה"מפוכח", או חוששים ששכבה שנייה "תפריע" לראשונה. שתי חומות אש עצמאיות אינן מתנגשות — הן מגבות זו את זו, וזו הגדרת Defense in Depth.

---

## Question

id: q-dmz-architectures-006
type: comparison
difficulty: easy
cognitive: remember
estimatedTime: 50
points: 5
concepts:
  - Screened Subnet
  - Three-Legged DMZ

לפי המרצה, מהם שלושת החסרונות (CONS) של ארכיטקטורת Dual Firewall DMZ
(Screened Subnet)?

### Answers

A. Higher cost · Complex ops · More latency.

B. No redundancy · SPOF risk · Limited scale.

C. Single policy · Cost effective · Simple ops.

D. Flat network · Domain-joined servers · Outbound any-any.

E. Lower throughput · No audit trail · No vendor diversity.

Correct: A

Explanation: אלה שלושת החסרונות שהמרצה רושם בטבלת ה-CONS של Dual Firewall: עלות גבוהה יותר, תפעול מורכב יותר, והשהיה גדולה יותר (התעבורה חוצה שתי נקודות בדיקה בטור). **B שגויה** — אלה שלושת החסרונות של ה-**Single** Firewall DMZ (Three-Legged), והחלפה ביניהם היא המלכודת המרכזית. **C שגויה** — אלה שלושת ה-**PROS** של Three-Legged, לא חסרונות של אף ארכיטקטורה. **D שגויה** — אלה תצורות שגויות (misconfigurations) שהמרצה מדרג HIGH RISK, ולא חסרונות מובנים של הארכיטקטורה. **E שגויה** — "No audit trail" ו-"No vendor diversity" הם ההפך הגמור מהמצב: Dual Firewall מספק דווקא audit trail בשתי נקודות חנק, ו-Vendor Diversity הוא היתרון המובהק שלו.

Difficulty: easy

Concepts: Screened Subnet, Three-Legged DMZ

Bloom: remember

Learning Objective: לשחזר את טבלאות ה-PROS/CONS של שתי הארכיטקטורות ולא להחליף ביניהן.

Misconception: סטודנטים זוכרים ש"שתיים עדיף מאחת" ולכן מייחסים ל-Dual Firewall רק יתרונות, או מדביקים לו בטעות את חסרונות ה-Single Firewall (SPOF). ל-Dual Firewall יש מחיר מפורש: עלות, מורכבות והשהיה.
