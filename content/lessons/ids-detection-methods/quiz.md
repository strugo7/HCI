---
id: ids-detection-methods-quiz
lesson: ids-detection-methods
title: שאלון — איך IDS מחליט, ולמה הוא טועה
---

## Question

id: q-ids-detection-methods-001
type: scenario
difficulty: medium
cognitive: analyze
estimatedTime: 60
points: 5
concepts:
  - False Positive
  - False Negative

מרכז ניטור הסייבר של ארגון פיננסי חיבר לרשת מערכת IDS חדשה. אנשי הצוות מתלוננים שרוב ההתראות שהמערכת מפיקה אינן מצביעות על איום אמיתי, ושהן מקשות עליהם להתמקד בתחקור אירועים אמיתיים. כיצד ינסח מנהל מרכז הניטור את הבעיה במונחי מטריצת הבלבול?

### Answers

A. המערכת מתריעה כל היום על False Positive — התראות שאין מאחוריהן תקיפה — ולכן קשה לצוות להתמקד באירועים אמיתיים.

B. המערכת מתריעה כל היום על False Negative, ולכן קשה לצוות להתמקד באירועים אמיתיים.

C. המערכת מתריעה כל היום על True Positive, ולכן קשה לצוות להתמקד באירועים אמיתיים.

D. המערכת מתריעה כל היום על True Negative, ולכן קשה לצוות להתמקד באירועים אמיתיים.

E. המערכת סובלת מ-Type II error, המתבטא בריבוי התראות שאינן מצביעות על איום אמיתי.

Correct: A

Explanation: התרחיש מתאר **התראה שנוצרה** (Positive) **ללא תקיפה מאחוריה** (False) — זו ההגדרה המדויקת של False Positive, המכונה גם Type I error. B שגויה: False Negative הוא ההפך הגמור — תקיפה שהתרחשה **ללא** שום התראה, ולכן הוא אינו יכול "להתריע כל היום"; FN הוא הטעות השקטה. C שגויה: True Positive היא התראה **נכונה** על תקיפה אמיתית — בדיוק מה שהצוות רוצה לקבל, ולא מקור התלונה. D שגויה: True Negative פירושו שאין תקיפה ואין התראה — מצב שאינו מייצר עומס כלל, שכן לא נוצרת בו שום התראה. E שגויה כפליים: Type II error הוא השם החלופי של False Negative ולא של False Positive, ולכן היא מצמידה את הסיווג הנכון של התופעה לתווית ההפוכה — בדיוק המלכודת שהשאלה בודקת.

Difficulty: medium

Concepts: False Positive, False Negative

Bloom: analyze

Learning Objective: לזהות התראת שווא כ-False Positive (Type I error) ולהבחין בינה לבין שאר תאי מטריצת הבלבול.

Misconception: סטודנטים מזהים "בעיה בהתראות" ובוחרים False Negative, מפני שהמילה "שגיאה" מתקשרת אצלם לכישלון בזיהוי — בעוד שכאן הכישלון הוא עודף זיהוי.

---

## Question

id: q-ids-detection-methods-002
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Knowledge-based Detection
  - Behavior-based Detection

מדוע מערכת IDS המבוססת על זיהוי חתימות (Knowledge-based) אינה מסוגלת לזהות תקיפת zero-day?

### Answers

A. משום שחתימה נכתבת רק לאחר שהתקיפה כבר זוהתה ותועדה בעולם, ולכן תקיפה שטרם נראתה אינה יכולה להתאים לאף דפוס קיים.

B. משום שזיהוי מבוסס חתימות פועל רק על תעבורה מוצפנת, ותקיפות zero-day מגיעות בתעבורה גלויה.

C. משום שזיהוי מבוסס חתימות דורש משאבי עיבוד גבוהים, ולכן הוא מדלג על חלק מהחבילות בעומס.

D. משום שזיהוי מבוסס חתימות פועל ברמת ה-host בלבד, ותקיפות zero-day מגיעות מהרשת.

E. משום שזיהוי מבוסס חתימות מייצר יותר מדי התראות שווא, והתקיפה נבלעת ביניהן.

Correct: A

Explanation: המגבלה היא **מבנית ולא מימושית**: השיטה משווה מול מסד נתונים של דפוסים ידועים, וכפי שמנסח המרצה — "Knowledge-based IDS only as good as database of attack signatures". תקיפה חדשה לחלוטין לא תועדה, ולכן אין לה חתימה, ולכן היא עוברת. זהו בדיוק המובן של "low in completeness". B שגויה: השיטה אינה קשורה להצפנה — אתגר התעבורה המוצפנת קיים, אך הוא חל על ה-NIDS בכללותו ולא מסביר את החמצת ה-zero-day. C שגויה והפוכה לעובדות: המרצה מציין דווקא "High performance with minimal processing power" ו-"Fast and explainable". D שגויה: זיהוי מבוסס חתימות מיושם הן ב-NIDS והן ב-HIDS; אין קשר בין השיטה למיקום הפריסה. E שגויה והפוכה: זיהוי מבוסס חתימות מייצר **מעט** התראות שווא ("often lower false positives") — ריבוי התראות השווא מאפיין דווקא את הזיהוי ההתנהגותי.

Difficulty: medium

Concepts: Knowledge-based Detection, Behavior-based Detection

Bloom: understand

Learning Objective: להסביר מדוע החמצת zero-day היא תכונה מבנית של זיהוי מבוסס חתימות ולא כשל במימוש.

Misconception: סטודנטים מייחסים את ההחמצה ל"מערכת חלשה" או ל"מסד נתונים לא מעודכן", ומפספסים שגם מסד נתונים מעודכן לחלוטין אינו יכול להכיל חתימה לתקיפה שטרם התרחשה.

---

## Question

id: q-ids-detection-methods-003
type: comparison
difficulty: hard
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - Behavior-based Detection
  - Knowledge-based Detection
  - False Positive

כמענה לתופעת התראות השווא במערכת ה-IDS, הועלו בדיון מספר הצעות לשינוי תצורת המערכת. איזו הצעה אכן תצמצם באופן משמעותי את **כמות** התראות השווא?

### Answers

A. להסתמך על מודול החתימות (Knowledge-based) כמנוע העיקרי, ולכייל בזהירות את מודול הזיהוי ההתנהגותי לפי קריטיות הנכס.

B. להפעיל את מודול הזיהוי ההתנהגותי (Behavior-based) בלבד, ולכבות לחלוטין את מודול החתימות.

C. להרחיב את מודול הזיהוי ההתנהגותי כך שיסמן כל סטייה מה-baseline, קטנה ככל שתהיה.

D. להוריד את סף הרגישות של כלל המערכת באופן גורף, כך שתתריע רק על אירועים מדרגת החומרה הגבוהה ביותר.

E. לכבות את מודול החתימות, שכן הצורך בעדכונים תכופים הוא מקור הרעש העיקרי במערכת.

Correct: A

Explanation: מקור התראות השווא הוא הזיהוי ההתנהגותי — "Risk: higher false positives if baseline is weak" — בעוד שהחתימות מאופיינות ב-"often lower false positives" וב-"High accuracy". לכן הסתמכות על החתימות ככוח העיקרי, בשילוב כיול ממוקד של המודול ההתנהגותי ("Tune by asset criticality"), מצמצמת רעש **בלי** לוותר על כיסוי. B שגויה והפוכה לחלוטין: הזיהוי ההתנהגותי הוא זה עם ה-"low accuracy" — הפעלתו לבדה **תגדיל** את התראות השווא, לא תקטין אותן. C שגויה: סימון כל סטייה מה-baseline הוא בדיוק המתכון להצפה, שכן "normal" בארגון עסקי משתנה כל הזמן. D שגויה: הורדת רגישות גורפת אכן מקטינה FP — אך היא עושה זאת על ידי הגדלת False Negative, כלומר על חשבון רמת האבטחה, ולא זהו הפתרון המבוקש. E שגויה: הצורך בעדכוני חתימות הוא חיסרון תחזוקתי אמיתי, אך הוא אינו מקור לרעש; כיבוי החתימות מסיר דווקא את המנוע המדויק ביותר ומשאיר את הרועש.

Difficulty: hard

Concepts: Behavior-based Detection, Knowledge-based Detection, False Positive

Bloom: apply

Learning Objective: לבחור תצורת זיהוי המצמצמת התראות שווא, ולזהות שהזיהוי ההתנהגותי — ולא זיהוי החתימות — הוא מקור הרעש.

Misconception: סטודנטים מחליפים בין השיטות ומניחים שהזיהוי ההתנהגותי, בהיותו "חכם יותר", מייצר פחות טעויות — בעוד שהוא בדיוק זה עם ה-low accuracy.

---

## Question

id: q-ids-detection-methods-004
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - False Positive
  - False Negative

### Scenario

בבית החולים "מרכז רפואי לב השרון" הופעלה מערכת IDS חדשה עם מודול זיהוי התנהגותי רגיש. במהלך החודש הראשון קיבל צוות הניטור כ-200 התראות בשבוע, שכמעט כולן התבררו כפעילות רפואית לגיטימית (גיבויים לילייים, העלאת דימות רפואי כבד, התחברות רופאים תורנים בשעות חריגות). בחודש השני החל הצוות לסגור התראות באופן שגרתי בלי לתחקר אותן לעומק. בחודש השלישי חדרה נוזקה לרשת — והתברר בדיעבד שה-IDS **כן** הפיק עליה התראה, אך איש לא פתח אותה.

מהו הניתוח המדויק ביותר של רצף האירועים?

### Answers

A. הצפת ה-False Positive יצרה Alert Fatigue, וזו הפכה התראת True Positive אמיתית להחמצה תפעולית — כלומר עודף התראות שווא הוא שייצר את הכשל.

B. המערכת סבלה מ-False Negative מתמשך לאורך שלושת החודשים, ולכן לא זיהתה את הנוזקה בזמן.

C. מדובר בכשל של מודול החתימות, שלא קיבל עדכון מהספק ולכן לא זיהה את הנוזקה החדשה.

D. המערכת כוונה שמרנית מדי (too quiet), ולכן החמיצה את התקיפה — יש להרפות את הסף ולהגדיל את הרגישות.

E. מדובר ב-True Negative: מאחר שההתראות בחודשים הראשונים היו שגויות, המערכת סיווגה נכון את הפעילות הרפואית כלגיטימית.

Correct: A

Explanation: השרשרת היא בדיוק זו שמנסח המרצה: "Too sensitive → alert fatigue → ignored alerts". ההתראות הרבות היו False Positive (התראה ללא תקיפה); הן שחקו את הצוות; ובנקודת האמת ההתראה האמיתית — טכנית **True Positive** — נבלעה ולא טופלה. התוצאה בעולם זהה ל-False Negative, אך המקור שלה תפעולי ולא טכני. B שגויה: המערכת **כן** הפיקה התראה על הנוזקה, ולכן זו אינה False Negative טכנית — הכשל היה בתגובה, לא בזיהוי. C שגויה: התרחיש קובע במפורש שהמערכת הפיקה התראה, כלומר הזיהוי עבד; בנוסף מודול הזיהוי ההתנהגותי אינו תלוי בעדכוני חתימות. D שגויה והפוכה: המערכת הייתה **רגישה מדי** ולא שקטה מדי — הגדלת הרגישות רק תחריף את ההצפה ואת ה-Alert Fatigue. E שגויה: True Negative פירושו שלא נוצרה שום התראה מלכתחילה; כאן נוצרו מאות התראות, וכל אחת מהן שהתבררה כלגיטימית היא False Positive בהגדרה.

Difficulty: hard

Concepts: False Positive, False Negative

Bloom: analyze

Learning Objective: להסביר את הקשר הסיבתי שבו הצפת False Positive מייצרת החמצה תפעולית, ולהבחין בין כשל בזיהוי לכשל בתגובה.

Misconception: סטודנטים מסווגים כל תקיפה שלא נעצרה כ-False Negative טכני, ומפספסים שהמערכת יכולה לזהות נכון (TP) בעוד הכשל מתרחש בשלב התגובה — שנשחקה בדיוק בגלל עודף ה-FP.

---

## Question

id: q-ids-detection-methods-005
type: scenario
difficulty: hard
cognitive: evaluate
estimatedTime: 90
points: 5
concepts:
  - False Positive
  - IPS
  - IDS

### Scenario

באותו בית חולים שוקלים לעבור ממודל IDS בלבד למודל IPS, ולהחיל חסימה אוטומטית על **כל** סוגי ההתראות, לרבות אלה שמקורן במודול הזיהוי ההתנהגותי.

אילו שיקולים מהותיים צריכים להנחות את מנהל אבטחת המידע בהחלטה?

### Answers

A. החשש מפגיעה בפעילות רפואית קריטית עקב חסימת שווא (False Positive), אל מול הרווח שביכולת לבלום תקיפות בזמן אמת — ולכן מקובל להתחיל ב-detect-only ולהחיל חסימה רק על חוקים בעלי ודאות גבוהה.

B. דרישות רגולטוריות המחייבות שימוש בחתימות מבוססות יצרן בלבד, ולכן אין לאפשר חסימה על בסיס זיהוי התנהגותי.

C. מעבר ל-IPS מייתר את הצורך בכיוונון (Tuning), שכן החסימה האוטומטית מונעת ממילא את הנזק מכל התראה שגויה.

D. שימוש גורף במערכות מבוססות התנהגות (Behavior-based) בלבד, ללא הפעלת מנגנון חתימות, יבטיח כיסוי מלא של האיומים.

E. מאחר שה-IPS יושב inline, הוא מקטין את שיעור ה-False Positive לעומת IDS, ולכן המעבר בטוח מטבעו.

Correct: A

Explanation: זהו לב ה-operational reality של IPS אצל המרצה: "False positives can impact business"; "Blocking errors can cause outages"; "Often run in detect-only first"; "IPS is powerful — treat it like a production change". ב-IDS התראת שווא עולה שעת אנליסט; ב-IPS אותה טעות בדיוק הופכת ל**חסימה** של תעבורה לגיטימית — ובבית חולים משמעותה עצירת פעילות רפואית. B שגויה: אין דרישה כזו, וכיבוי הזיהוי ההתנהגותי היה מבטל את היכולת היחידה לזהות zero-day. C שגויה והפוכה: המעבר ל-IPS **מייקר** את מחיר הטעות ולכן הופך את הכיוונון לקריטי יותר, לא מיותר. D שגויה: הפעלת זיהוי התנהגותי בלבד היא בדיוק התצורה בעלת ה-low accuracy — היא תגדיל דרמטית את חסימות השווא, וזהו התרחיש המסוכן ביותר בבית חולים. E שגויה: המיקום ה-inline אינו משנה דבר בשיעור ה-FP — הוא רק משנה את **התוצאה** של FP מהתראה לחסימה, ולכן מגדיל את הסיכון ולא מקטין אותו.

Difficulty: hard

Concepts: False Positive, IPS, IDS

Bloom: evaluate

Learning Objective: להעריך את הסיכון שבמעבר מ-IDS ל-IPS דרך העלות המשתנה של False Positive, ולהצדיק שימוש ב-detect-only mode.

Misconception: סטודנטים מניחים ש-IPS הוא "IDS משודרג" ולכן בטוח יותר בכל מובן, ומפספסים שהמעבר ל-inline אינו מפחית טעויות אלא רק מייקר אותן.

---

## Question

id: q-ids-detection-methods-006
type: comparison
difficulty: medium
cognitive: evaluate
estimatedTime: 75
points: 5
concepts:
  - False Positive
  - False Negative
  - Knowledge-based Detection

מנהל SOC מהדק את חוקי הזיהוי ומעלה את סף ההתראה, במטרה לצמצם את הרעש במערכת. מה בדיוק הוא **מחליף במה**?

### Answers

A. הוא מפחית False Positive במחיר של הגדלת False Negative — פחות התראות שווא, אך יותר תקיפות שיוחמצו.

B. הוא מפחית גם False Positive וגם False Negative, שכן חוקים מהודקים הם חוקים מדויקים יותר.

C. הוא מפחית False Negative במחיר של הגדלת False Positive — כיסוי רחב יותר תמורת רעש רב יותר.

D. הוא אינו משנה את יחסי הטעויות, אלא רק את עומס העיבוד על מנוע הניתוח.

E. הוא מפחית False Positive מבלי לפגוע בכיסוי, שכן חוקים מהודקים אינם משפיעים על היכולת לזהות תקיפות אמיתיות.

Correct: A

Explanation: המרצה מצייר את ה-Tuning כ**ספקטרום** עם סיכון בכל קצה: "Risk if too quiet: Missed detections (false negatives)" מול "Risk if too noisy: Alert fatigue (false positives)". זו ידית אחת — כל תזוזה לכיוון השקט מפחיתה FP ומגדילה FN. B שגויה: זו בדיוק האשליה שהמטריצה מפריכה; אין נקודה על הספקטרום שבה שני סוגי הטעות יורדים יחד, ולכן המרצה מנסח את המטרה כ-"increase precision **without killing** recall" — כלומר כאילוץ ולא כניצחון כפול. C שגויה: היא מתארת את התזוזה ל**כיוון ההפוך** (הרפיית הסף), לא את הידוק החוקים שהשאלה מתארת. D שגויה: עומס העיבוד עשוי אכן לרדת, אך זו תופעת לוואי — ההשפעה המהותית היא על תמהיל הטעויות. E שגויה: "מבלי לפגוע בכיסוי" היא בדיוק ההבטחה הבלתי אפשרית; הידוק גורף של סף ההתראה **חייב** להקטין כיסוי, ולכן המרצה מחייב "validate with testing & incidents" אחרי כל כיוונון.

Difficulty: medium

Concepts: False Positive, False Negative, Knowledge-based Detection

Bloom: evaluate

Learning Objective: להסביר ש-Tuning הוא סחר-חליפין בין שני סוגי טעות, ושאין תצורה שמאפסת את שניהם.

Misconception: סטודנטים תופסים Tuning כ"שיפור המערכת" ולא כבחירה בין שתי טעויות, ולכן בוחרים במסיח שמבטיח הפחתת רעש ללא מחיר בכיסוי.
