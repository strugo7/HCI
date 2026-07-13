---
id: ngfw-quiz
lesson: ngfw
title: שאלון — NGFW, חומת אש מדור חדש
---

## Question

id: q-ngfw-001
type: comparison
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - NGFW
  - Firewall

מהו היתרון המרכזי של NGFW (חומת אש מדור חדש) לעומת חומת אש מסורתית?

### Answers

A. יכולת לזהות ולחסום איומים ברמת האפליקציה, ללא תלות בפורט או בפרוטוקול שבו הם משתמשים.

B. צריכת משאבי מחשוב נמוכה יותר, מכיוון שכל הבדיקות מרוכזות במעבר אחד על החבילה.

C. תמיכה במספר רב יותר של פרוטוקולי תקשורת ברשימת הכללים.

D. יכולת הצפנה מתקדמת של תעבורת הרשת העוברת דרכה.

E. אינטגרציה טובה יותר עם מערכות ניהול לוגים ו-SIEM.

Correct: A

Explanation: המרצה מנסח את הבעיה בשלוש אי-שוויונות — **Ports ≠ Applications, IP Addresses ≠ Users, Packets ≠ Content** — וה-NGFW הוא התשובה לראשונה שבהן: היכולת הראשונה מבין החמש שהוא מונה היא "Identify applications regardless of port, protocol, evasive tactic or SSL". זו בדיוק תשובה A. **B שגויה והפוכה:** NGFW מוסיף שכבות בדיקה (Application-level + Intrusion Prevention) ולכן דורש **יותר** משאבים, לא פחות; מה שהמרצה מבטיח הוא פריסה multi-gigabit ללא ירידת ביצועים — לא חיסכון במשאבים. **C שגויה:** מספר הפרוטוקולים הנתמכים אינו ההבדל; חומת אש קלאסית יודעת לכתוב כלל על כל פרוטוקול — היא פשוט לא יודעת מה **רץ בתוכו**. **D שגויה:** חומת אש אינה רכיב הצפנה. להפך — הצפנה היא אחד הדברים ש-NGFW נשאר "blind" מולם לפי שקופית המשוואה. **E שגויה:** אינטגרציה עם SIEM היא מאפיין של IDS/IPS ואינה ההבדל שהמרצה מציין; היא גם קיימת בחומות אש מסורתיות.

Difficulty: easy

Concepts: NGFW, Firewall

Bloom: understand

Learning Objective: לזהות שהיתרון המגדיר של NGFW הוא זיהוי וחסימה ברמת האפליקציה, ולא ביצועים או הצפנה.

Misconception: סטודנטים מניחים ש"דור חדש" פירושו "מהיר יותר / חסכוני יותר", ובוחרים מסיח ביצועים במקום המסיח האפליקטיבי.

---

## Question

id: q-ngfw-002
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - NGFW
  - Command & Control (C&C)
  - Firewall

מה תהיה התוצאה עבור תעבורת ה-C&C בכל אחת משתי הארכיטקטורות, ומדוע?

### Scenario

בבנק שני אתרים המוגנים אחרת. באתר א' פועלת חומת אש מסורתית עם הכלל **ALLOW Port 25**, ולצידה App IPS שהוגדר לו חוק יחיד: **Block Bittorrent**. באתר ב' פועל NGFW עם הכלל **ALLOW SMTP**.

תוקף שכבר השיג דריסת רגל בשרת פנימי בכל אחד משני האתרים מנסה להוציא ממנו תקשורת **Command & Control (C&C)** דרך פורט 25.

### Answers

A. באתר א' התעבורה תעבור, כי C&C אינו Bittorrent והפורט מותר; באתר ב' התעבורה תיחסם, כי C&C אינו SMTP.

B. בשני האתרים התעבורה תיחסם, מכיוון ששניהם מפעילים בדיקה ברמת האפליקציה.

C. באתר א' התעבורה תיחסם על ידי ה-App IPS, שמזהה כל תעבורה שאינה דואר על פורט 25; באתר ב' היא תעבור, כי הכלל מתיר SMTP.

D. בשני האתרים התעבורה תעבור, מכיוון שפורט 25 מותר במפורש בשתי מערכות הכללים.

E. באתר א' התעבורה תעבור; באתר ב' היא תעבור גם כן, אך תתועד כהתראה בלבד ללא חסימה.

Correct: A

Explanation: זהו בדיוק התרחיש שהמרצה בונה בשקופית האחרונה של ההשוואה. שתי המערכות שואלות שאלות **הפוכות**. ה-Legacy Firewall שואל "האם זה **אסור**?" — הכלל שלו הוא על פורט (מותר), וה-App IPS יודע לחסום דבר אחד בלבד: Bittorrent. C&C ≠ Bittorrent, ולכן **Allow**, והדיווח הוא "Packet on Port 25 allowed". ה-NGFW שואל "האם זה **מותר**?" — הכלל שלו הוא ALLOW SMTP, וזה אינו SMTP, ולכן **Deny**, והדיווח הוא "Unknown traffic detected and blocked". **B שגויה:** באתר א' אין בדיקה אפליקטיבית אמיתית — יש חוק חסימה נקודתי אחד; App IPS אינו App-ID. **C שגויה והפוכה לחלוטין:** ה-App IPS אינו מאמת שתעבורת פורט 25 היא דואר; הוא בודק רק את החתימה שהוגדרה לו. וה-NGFW דווקא **כן** חוסם, כי C&C אינו SMTP. **D שגויה:** היא מתעלמת מכך שכלל ה-NGFW הוא על **אפליקציה** ולא על פורט — פורט 25 כלל אינו מופיע במדיניות שלו. **E שגויה:** NGFW הוא רכיב inline החוסם בפועל (הוא כולל Intrusion Prevention); "מתריע בלבד" הוא התנהגות של IDS, לא של NGFW.

Difficulty: hard

Concepts: NGFW, Command & Control (C&C), Firewall

Bloom: analyze

Learning Objective: להסביר מדוע Legacy FW חוסם רק את מה שהוגדר לו במפורש, בעוד NGFW מתיר רק את מה שהוגדר לו במפורש.

Misconception: סטודנטים מניחים ש"הוספת IPS לחומת אש מסורתית = NGFW". הוספת חוק חסימה נקודתי אינה זיהוי אפליקציה, ולכן כל מה שלא נצפה מראש עדיין עובר.

---

## Question

id: q-ngfw-003
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Stateful Inspection
  - Firewall

לפי המרצה, על בסיס מה מחליטה חומת אש מבוססת Stateful Inspection אם להעביר או לחסום תעבורה — ומה היא **אינה** עושה?

### Answers

A. מחליטה לפי state, port ו-protocol — ואינה מבצעת בדיקת תוכן של החבילה (packet inspection).

B. מחליטה לפי תוכן ה-payload של כל חבילה — ואינה עוקבת אחרי מצב החיבור.

C. מחליטה לפי זהות המשתמש ולפי האפליקציה — ואינה מסתמכת על כתובות IP.

D. מחליטה לפי חתימות של נוזקות ידועות — ואינה חוסמת תעבורה שאין לה חתימה.

E. מחליטה לפי כתובת ה-IP בלבד — ואינה מתייחסת לפורט או לפרוטוקול.

Correct: A

Explanation: ההגדרה במילותיו: "A stateful inspection firewall, sometimes known as a 'conventional' firewall, allows or blocks traffic based on **state, port, and protocol**." ובאותה יחידה הוא קובע במפורש: "Standard firewalls — **stateful and stateless** — don't perform any packet inspection". שני המשפטים יחד הם בדיוק תשובה A. **B שגויה והפוכה:** בדיקת תוכן היא מה ש-Stateful דווקא **אינה** עושה; מעקב אחרי מצב החיבור הוא בדיוק מה שהיא **כן** עושה. **C שגויה:** זיהוי משתמש ואפליקציה ללא תלות ב-IP ובפורט הוא תיאור של **NGFW** (שתי היכולות הראשונות מבין החמש), לא של Stateful. **D שגויה:** זיהוי מבוסס חתימות הוא מנגנון של IDS/IPS, לא הבסיס להחלטת חומת אש מבוססת מצב. **E שגויה:** גם חומת אש סטטית פשוטה מסננת לפי פורט ופרוטוקול, לא רק לפי IP — וה-state הוא בדיוק התוספת שמבדילה בין השתיים.

Difficulty: medium

Concepts: Stateful Inspection, Firewall

Bloom: understand

Learning Objective: להגדיר את Stateful Inspection לפי state/port/protocol ולהבחין בינה לבין בדיקת תוכן.

Misconception: סטודנטים מזהים "stateful" עם "מתוחכם" ומניחים שהיא בודקת גם תוכן. המרצה שולל זאת מפורשות עבור stateful ו-stateless כאחד.

---

## Question

id: q-ngfw-004
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - NGFW
  - Web Application Firewall (WAF)

כיצד כדאי לממש את חומת האש כדי לצמצם משמעותית את הסיכון?

### Scenario

בית חולים הטמיע NGFW והגדיר DMZ. הפרוטוקולים HTTPS ו-SMTP מותרים במדיניות, מפני שהם חיוניים לתפעול. צוות האבטחה חושש שתוקף ינצל דווקא את הפרוטוקולים **המותרים** האלה כדי להחדיר נוזקות מתוחכמות פנימה.

### Answers

A. להפעיל Deep Packet Inspection (DPI) וסינון אפליקטיבי, כך שגם בתוך פורט ופרוטוקול מותרים המערכת בוחנת את תוכן החבילה.

B. להגדיר שחומת האש תסנן לפי כתובות IP בלבד ותתעלם מתוכן החבילות, כדי לא לפגוע בביצועים.

C. להתקין חומת אש פיזית נוספת ונפרדת לחלוטין, המוקדשת אך ורק לסינון פרוטוקול הדואר.

D. לבטל את השימוש בהצפנה ולחייב HTTP רגיל, כדי לאפשר צפייה נוחה בתוכן כל החבילות.

E. לצמצם את תדירות עדכוני התוכנה של חומת האש, כדי לשמור על יציבות הגדרות הכללים.

Correct: A

Explanation: כשהפרוטוקול עצמו מותר, ההחלטה ברמת הפורט כבר מוצתה — נותרה רק בדיקה של **התוכן**. זה בדיוק המרכיב Application-level במשוואת ה-NGFW, והמנגנון הוא **Deep Packet Inspection (DPI)** וסינון אפליקטיבי. **B שגויה והפוכה:** התעלמות מהתוכן היא בדיוק החולשה שהתרחיש מתאר — "Ports ≠ Applications" ו-"Packets ≠ Content"; זה מחזיר את בית החולים לנקודת הפתיחה. **C שגויה:** זהו **Technology Sprawl & Creep** — "'More stuff' doesn't solve the problem"; קופסה נוספת עם ראייה חלקית מוסיפה עלות ומורכבות בלי לפתור את הבעיה. **D שגויה ומסוכנת:** ביטול הצפנה פוגע ישירות בסודיות ובשלמות המידע הרפואי; הפתרון לתעבורה מוצפנת הוא TLS inspection, לא ויתור על ההצפנה. **E שגויה והפוכה:** צמצום העדכונים מוריד את יעילות מנגנוני הזיהוי מבוססי החתימות שבתוך ה-NGFW.

Difficulty: medium

Concepts: NGFW, Web Application Firewall (WAF)

Bloom: apply

Learning Objective: ליישם בדיקת תוכן (DPI / סינון אפליקטיבי) כמענה לאיום המנצל פרוטוקול מותר.

Misconception: סטודנטים מניחים שאם הפרוטוקול מותר — חומת האש כבר "אישרה" אותו ואין מה לעשות. בפועל, הפורט המותר הוא בדיוק המקום שבו הבדיקה האפליקטיבית מתחילה.

---

## Question

id: q-ngfw-005
type: architecture
difficulty: medium
cognitive: evaluate
estimatedTime: 75
points: 5
concepts:
  - NGFW
  - IPS

לפי המרצה, מדוע הוספת רכיבים נפרדים לצד חומת האש (URL filtering, Antivirus, DLP, Proxy, IPS) אינה הפתרון הנכון?

### Answers

A. מפני שלכל אחד מה"עוזרים" יש ראייה חלקית בלבד של התעבורה, והמערך כולו מורכב ויקר לרכישה ולתחזוקה.

B. מפני שרכיבים נפרדים אינם יכולים לחסום תעבורה — הם מסוגלים רק להתריע עליה.

C. מפני שהוספת רכיבים בגבול האמון מפרה את עקרון ה-Defense in Depth, הדורש שכבת הגנה יחידה.

D. מפני שהרכיבים הנפרדים חופפים זה לזה ביכולותיהם, ולכן כל תעבורה נבדקת פעמיים ונחסמת בטעות.

E. מפני שרכיבים נפרדים אינם מסוגלים לעבוד בפריסת inline ולכן חייבים לשבת out-of-band.

Correct: A

Explanation: המרצה קורא לתופעה **Technology Sprawl & Creep** ומנמק אותה בשלוש שורות: "'More stuff' doesn't solve the problem"; "Firewall 'helpers' have **limited view** of traffic"; "**Complex and costly** to buy and maintain". תשובה A היא שתי הנקודות האחרונות. החלופה שהוא מציע היא NGFW/UTM — פתרון שלם ב"single centrally controlled system". **B שגויה:** IPS, Proxy ו-DLP הם רכיבים חוסמים לכל דבר; היכולת לחסום אינה הבעיה — הראייה החלקית היא. **C שגויה ומהופכת:** Defense in Depth דורש **ריבוי** שכבות, לא שכבה יחידה; הביקורת של המרצה אינה על הרעיון של שכבות אלא על **פיצול הראייה והניהול** ביניהן. **D שגויה:** הבעיה שהמרצה מציין אינה חפיפה או חסימה כפולה, אלא ההפך — כל רכיב רואה **פחות מדי**. **E שגויה:** רכיבים אלה נפרסים בפועל inline; זו אינה הטענה בשקופית.

Difficulty: medium

Concepts: NGFW, IPS

Bloom: evaluate

Learning Objective: להסביר את Technology Sprawl & Creep ולנמק מדוע ריכוז ההגנה במערכת אחת מנוהלת מרכזית עדיף.

Misconception: סטודנטים מפרשים את ביקורת ה-Technology Sprawl כאילו המרצה שולל ריבוי שכבות הגנה. הוא שולל ריבוי **קופסאות מנותקות** עם ראייה חלקית — לא את עקרון השכבות.

---

## Question

id: q-ngfw-006
type: attack-analysis
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - NGFW
  - IPS

לפי שקופית משוואת ה-NGFW, מפני מה נותרת ההגנה "blind to the scope of compromise" — עיוורת להיקף ההדבקה — גם לאחר שהתעבורה נבדקה בכניסה?

### Answers

A. מפני שהבדיקה היא Point-in-time: קובץ שסווג "Clean" ברגע הכניסה עלול להתגלות כזדוני רק אחר כך, ובינתיים פועלים Sleep Techniques, Encryption, Polymorphism ו-Lateral Movement.

B. מפני שה-NGFW אינו כולל מנגנון Intrusion Prevention, ולכן אינו מסוגל לחסום תעבורה בזמן אמת.

C. מפני שה-NGFW מזהה אפליקציות אך אינו מסוגל לזהות משתמשים, ולכן אינו יודע מי ביצע את הפעולה.

D. מפני שה-NGFW פועל out-of-band על עותק של התעבורה, ולכן אינו נמצא בנתיב שבו מתפשטת ההדבקה.

E. מפני שה-NGFW חוסם רק תעבורה נכנסת ואינו בודק כלל תעבורה יוצאת מהרשת.

Correct: A

Explanation: המרצה מונה במפורש חמישה דברים שמולם ההגנה נשארת עיוורת להיקף ההדבקה: **Sleep Techniques, Unknown Protocols, Encryption, Polymorphism, Lateral Movement** — ומסכם: "Initial Disposition = Clean. If actual Disposition is Bad = **Too Late!!** (no visibility, no scope, no containment)". הכשל הוא בהיותה של הבדיקה **נקודתית בזמן**. **B שגויה:** Intrusion Prevention הוא דווקא המרכיב הרביעי במשוואת ה-NGFW; הוא כן קיים. **C שגויה:** זיהוי משתמשים ללא תלות ב-IP הוא היכולת השנייה מתוך חמש שהמרצה מייחס ל-NG Firewall — הוא כן מזהה משתמשים. **D שגויה:** NGFW נפרס **inline** ("multi-gigabit, in-line deployment"); out-of-band הוא מיקומו של IDS. **E שגויה:** הדוגמה המרכזית של המרצה — חסימת C&C — היא דווקא חסימת תעבורה **יוצאת**.

Difficulty: hard

Concepts: NGFW, IPS

Bloom: analyze

Learning Objective: לזהות את מגבלות ה-NGFW — בדיקה נקודתית בזמן — ואת חמשת הגורמים שמולם היא נשארת עיוורת.

Misconception: סטודנטים מניחים ש-NGFW הוא פתרון סופי שסוגר את הפער. המרצה עצמו מסייג: החסימה נקודתית בזמן, וההדבקה ממשיכה להתפשט אחריה.
