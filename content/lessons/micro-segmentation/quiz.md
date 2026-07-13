---
id: micro-segmentation-quiz
lesson: micro-segmentation
---

# קוויז — מיקרו-סגמנטציה ו-Zero Trust

## Question

id: q-micro-segmentation-001
type: multiple-choice
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - East-West Traffic

איזו תעבורה חומת אש היקפית קלאסית **אינה** רואה ואינה בודקת?

### Answers

A. תעבורה נכנסת מהאינטרנט אל שרת פנימי (north-south)
B. תעבורה יוצאת מהארגון אל האינטרנט (north-south)
C. תעבורה בין שני שרתים פנימיים באותו subnet (east-west)
D. תעבורה מהאינטרנט אל שרת ב-DMZ
E. תעבורה מ-DMZ אל האינטרנט

Correct: C

Explanation: חומת אש היקפית ממוקמת **בגבול** ורואה, בהגדרה, רק תעבורה שחוצה את הגבול —
כלומר תעבורת north-south. A, B, D ו-E כולן חוצות את הגבול בין הארגון לאינטרנט (או
ל-DMZ) ולכן עוברות דרך נקודת האכיפה. C היא תעבורת east-west בין שתי מערכות פנימיות
באותו subnet — היא אינה חוצה שום גבול, ולכן כלל אינה מגיעה לחומת האש. זו בדיוק
התעבורה שהפרימטר מחמיץ, ובה נעה התנועה הרוחבית. לכן C.

Difficulty: easy

Concepts: East-West Traffic

Bloom: understand

Learning Objective: להבחין בין תעבורת north-south ל-east-west ולזהות מי בודק כל אחת.

Misconception: סטודנטים מניחים שחומת אש "רואה את כל התעבורה ברשת", ולא רק את זו שחוצה את הגבול.

---

## Question

id: q-micro-segmentation-002
type: comparison
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Micro-segmentation

מה מבדיל בין סגמנטציה קלאסית (VLAN / subnet) לבין מיקרו-סגמנטציה?

### Answers

A. סגמנטציה קלאסית מצפינה את התעבורה; מיקרו-סגמנטציה אינה מצפינה
B. סגמנטציה קלאסית מחלקת לאזורים שבתוכם התקשורת חופשית; מיקרו-סגמנטציה אוכפת מדיניות ברמת עומס העבודה הבודד
C. מיקרו-סגמנטציה עובדת רק בענן; סגמנטציה קלאסית עובדת רק on-prem
D. סגמנטציה קלאסית בודקת תוכן בשכבה 7; מיקרו-סגמנטציה בודקת רק כותרות
E. אין הבדל מהותי — מיקרו-סגמנטציה היא רק שם שיווקי ל-VLAN

Correct: B

Explanation: ההבדל המהותי הוא **גודל האזור והיכן האכיפה יושבת**. סגמנטציה קלאסית מחלקת
את הרשת לכמה אזורים גסים (VLAN, subnet), אך **בתוך** כל אזור התקשורת חופשית לחלוטין.
מיקרו-סגמנטציה מקטינה את האזור לגודל של נכס בודד ואוכפת כלל מפורש לכל זרימה, קרוב
לעומס העבודה — לכן B. A ממציאה קשר להצפנה שאינו קיים. C שגויה: מיקרו-סגמנטציה קיימת
גם on-prem וגם בענן. D מבלבלת בין רמת האכיפה לבין בדיקת תוכן (WAF / שכבה 7). E שגויה
בעליל — ההבדל הוא מושגי, לא שיווקי: VLAN הוא אזור עם חופש פנימי, מיקרו-סגמנטציה מבטלת
את המושג "בתוך האזור".

Difficulty: medium

Concepts: Micro-segmentation

Bloom: understand

Learning Objective: להבחין בין סגמנטציה גסה לבין מיקרו-סגמנטציה ברמת עומס העבודה.

Misconception: סטודנטים מזהים מיקרו-סגמנטציה עם "עוד VLANs" ומחמיצים שהיא מבטלת את החופש בתוך האזור.

---

## Question

id: q-micro-segmentation-003
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - Zero Trust

מהו העיקרון המרכזי של Zero Trust, כפי שמנוסח בסיסמה שלו?

### Answers

A. "trust but verify" — אמון בסיסי, אך עם בדיקה מדגמית
B. "never trust, always verify" — מיקום ברשת אינו מקנה אמון, וכל בקשה נבדקת מחדש
C. "trust the perimeter" — כל מי שבתוך הגבול מהימן
D. "deny everything" — חסימת כל התעבורה תמיד
E. "verify once, trust forever" — בדיקה חד-פעמית בכניסה, ואז אמון מלא

Correct: B

Explanation: Zero Trust מנוסח בסיסמה "never trust, always verify", והמרצה מציב אותה
מול המודל הישן: מסורתי — "Perimeter = trust boundary"; Zero Trust — "Every request =
verification". המשמעות הטכנית: מיקום ברשת אינו מקנה אמון, וכל בקשה נבדקת מחדש לכל
session. לכן B. A מרכך את המודל ל"trust but verify" שהוא בדיוק ההיפך מהעמדה של Zero
Trust. C מתאר את מודל הפרימטר שאותו Zero Trust בא להחליף. D שגוי — Zero Trust אינו
חוסם הכול אלא מאמת כל בקשה ומאשר את המורשות. E מתאר את ה-implicit trust של הפרימטר
("verify once"), שהוא בדיוק הכשל ש-Zero Trust מתקן.

Difficulty: easy

Concepts: Zero Trust

Bloom: remember

Learning Objective: להסביר את Zero Trust ואת "never trust, always verify".

Misconception: סטודנטים מבלבלים "never trust, always verify" עם "trust but verify" ומרככים את המודל.

---

## Question

id: q-micro-segmentation-004
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Zero Trust

לפי NIST SP 800-207, מהו "implicit trust zone", ומהו הכלל לגביו?

### Answers

A. אזור שבו כל התעבורה מוצפנת; יש להרחיב אותו ככל האפשר
B. אזור שבו כל מה שמעבר לנקודת האכיפה האחרונה נחשב מהימן; יש לצמצם אותו ככל האפשר
C. אזור ה-DMZ בלבד; יש להסירו לחלוטין ב-Zero Trust
D. רשימת הכתובות המורשות בחומת האש; יש לעדכנה מדי חודש
E. האזור שבו יושב ה-Policy Engine; יש להצפינו בנפרד

Correct: B

Explanation: NIST מגדיר את ה-implicit trust zone כאזור שבו כל הישויות נחשבות מהימנות
לפחות ברמת נקודת האכיפה (PDP/PEP) האחרונה — הדוגמה שלו היא אזור השערים בשדה תעופה,
שאחרי ביקורת הביטחון איש אינו נבדק בו שוב. הכלל המפורש של NIST: כדי שהאכיפה תהיה
מדויקת ככל האפשר, אזור האמון המשתמע חייב להיות **קטן ככל האפשר** — לכן B. A ממציאה
קשר להצפנה והופכת את כיוון הכלל. C מצמצם את המושג ל-DMZ בלבד ושגוי. D מבלבל אותו עם
ACL. E מזהה אותו בטעות עם מיקום ה-PE. הרעיון הוא להזיז את האכיפה קרוב למשאב ולכווץ
את אזור האמון — וזו ההצדקה למיקרו-סגמנטציה.

Difficulty: medium

Concepts: Zero Trust

Bloom: understand

Learning Objective: להסביר את implicit trust zone לפי NIST ואת הקשר למיקרו-סגמנטציה.

Misconception: סטודנטים חושבים שיש להרחיב אזורי אמון לנוחות, בעוד NIST דורש לצמצם אותם.

---

## Question

id: q-micro-segmentation-005
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - Micro-segmentation
  - Lateral Movement

בבית חולים, שרת ההדפסה ומסד הנתונים של רשומות המטופלים יושבים באותו subnet. מיושמת
מיקרו-סגמנטציה עם כלל יחיד: שרת היישום רשאי לפנות למסד הנתונים בפורט 1433. מה יקרה
כשתוקף ישתלט על שרת ההדפסה וינסה לפנות למסד הנתונים?

### Scenario

הרשת אינה שטוחה: כל זרימה מותרת רק אם קיים לה כלל מפורש, והאכיפה מתבצעת ברמת עומס
העבודה. הכלל היחיד שהוגדר אל מסד הנתונים מתיר גישה משרת היישום בלבד.

### Answers

A. הפנייה תותר, כי שרת ההדפסה נמצא באותו subnet כמו מסד הנתונים
B. הפנייה תיחסם, כי אין כלל מפורש המתיר לשרת ההדפסה לפנות למסד הנתונים
C. הפנייה תותר, כי התוקף השתלט על שרת לגיטימי שכבר "בפנים"
D. הפנייה תיחסם רק אם חומת האש ההיקפית תזהה את התוקף
E. הפנייה תותר, כי פורט 1433 פתוח בכל הרשת

Correct: B

Explanation: במיקרו-סגמנטציה כל זרימה נחסמת כברירת מחדל, ומותרת רק אם יש לה כלל מפורש.
הכלל היחיד אל מסד הנתונים מתיר גישה **משרת היישום בלבד** — אין כלל שמתיר לשרת ההדפסה
לפנות אליו, ולכן הפנייה נחסמת: B. A שגויה כי מיקרו-סגמנטציה מבטלת את החופש "באותו
subnet" — קרבה רשתית אינה מקנה גישה. C משחזרת בדיוק את ה-Two-Party Fallacy ("כבר
בפנים = מהימן") שהמודל בא לבטל. D שגויה כי האכיפה כאן פנימית וברמת עומס העבודה, לא
תלויה בחומת האש ההיקפית שכלל אינה רואה תעבורת east-west זו. E ממציאה "פורט פתוח בכל
הרשת" — במיקרו-סגמנטציה פורט נפתח לזוג מקור-יעד ספציפי, לא לרשת כולה.

Difficulty: medium

Concepts: Micro-segmentation, Lateral Movement

Bloom: apply

Learning Objective: ליישם מיקרו-סגמנטציה כדי לחסום תנועה רוחבית בין שכנים באותו subnet.

Misconception: סטודנטים מניחים שקרבה רשתית (אותו subnet) או "כבר בפנים" מקנה גישה גם במיקרו-סגמנטציה.

---

## Question

id: q-micro-segmentation-006
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Micro-segmentation

מהי המטרה המרכזית של מיקרו-סגמנטציה, המנוסחת במונח "blast radius"?

### Answers

A. למנוע כל חדירה לרשת, כך שאף תוקף לא ייכנס לעולם
B. להצפין את כל התעבורה הפנימית בין השרתים
C. לצמצם את היקף המערכות שתוקף יכול להגיע אליהן מנקודת חדירה אחת
D. להאיץ את התעבורה בין השרתים על ידי הסרת בקרות
E. להחליף לחלוטין את חומת האש ההיקפית ואת ה-DMZ

Correct: C

Explanation: blast radius הוא היקף המערכות שתוקף יכול להגיע אליהן מנקודת חדירה אחת,
ומיקרו-סגמנטציה נועדה **לצמצם** אותו — פריצה לשרת אחד נשארת שרת אחד (מטאפורת התאים
האטומים בצוללת). לכן C. A שגויה: המטרה אינה למנוע חדירה — הגישה מניחה מראש שחדירה
תקרה, ומתמקדת בהגבלת הנזק. B ממציאה מטרת הצפנה שאינה עיקר העניין. D הפוכה: הגישה
מוסיפה בקרות, לא מסירה אותן. E שגויה כי מיקרו-סגמנטציה מרחיבה את ה-DMZ ואת הפרימטר
("complements, not competitors"), לא מחליפה אותם.

Difficulty: medium

Concepts: Micro-segmentation

Bloom: understand

Learning Objective: להגדיר blast radius ולנמק מדוע צמצומו הוא המטרה של מיקרו-סגמנטציה.

Misconception: סטודנטים חושבים שמטרת מיקרו-סגמנטציה היא מניעת חדירה, ולא הגבלת הנזק לאחר חדירה.

---

## Question

id: q-micro-segmentation-007
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Micro-segmentation

צוות רשת מפעיל מיקרו-סגמנטציה ורוצה לאכוף "deny by default" כבר בלילה הראשון, בלי
שלב ביניים. למחרת בבוקר, יישומים תקינים רבים אינם עובדים. מה השתבש, ומה היה הסדר
הנכון?

### Scenario

הרשת הייתה שטוחה שנים, ומעולם לא מופה איזה שירות מדבר עם איזה שירות. הצוות הפעיל
אכיפה מלאה שחוסמת כל זרימה שאין לה כלל מפורש.

### Answers

A. שום דבר לא השתבש — נפילת היישומים היא ראיה שהאכיפה עובדת, ויש להשאירה
B. חומת האש ההיקפית נפלה; יש להחליפה לפני הפעלת מיקרו-סגמנטציה
C. זרימות לגיטימיות שלא הוגדר להן כלל נחסמו; היה צריך visibility (מיפוי זרימות) לפני אכיפה
D. השרתים לא הוצפנו; יש להפעיל TLS ואז לאכוף שוב
E. ה-Policy Engine עמוס מדי; יש להוסיף שרתים ולאכוף מיד

Correct: C

Explanation: אכיפת "deny by default" חוסמת כל זרימה שאין לה כלל מפורש. כשהרשת מעולם
לא מופתה, זרימות **לגיטימיות** רבות פשוט אין להן כלל — ולכן נחסמו, והיישומים נשברו.
אכיפה עיוורת אינה מבחינה בין זרימה חסרת-כלל לתקיפה. הסדר הנכון הוא visibility לפני
אכיפה: קודם למפות את כל הזרימות במצב ניטור בלבד, לבנות מהמפה את רשימת הכללים המותרים,
ורק אז לעבור ל-deny by default. לכן C. A טועה: נפילת ייצור אינה "הצלחה" — היא בדיוק
הסיכון שיש להימנע ממנו. B ו-D ממציאים כשל בחומת אש היקפית או בהצפנה שאינם קשורים
לתקלה. E מזהה בטעות עומס PE כגורם, בעוד הבעיה היא היעדר מיפוי מוקדם.

Difficulty: hard

Concepts: Micro-segmentation

Bloom: analyze

Learning Objective: לנמק מדוע נדרש visibility לפני אכיפה, ולזהות את הסיכון של אכיפה עיוורת.

Misconception: סטודנטים מניחים שאפשר להפעיל deny by default מיד, ומתעלמים מהצורך למפות זרימות קיימות תחילה.

---

## Question

id: q-micro-segmentation-008
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Micro-segmentation
  - Least Privilege

באיזה מובן מיקרו-סגמנטציה היא יישום של עקרון ה-Least Privilege?

### Answers

A. היא מעניקה לכל משתמש הרשאות אדמין כדי לפשט את הניהול
B. היא מיישמת "הרשאה מינימלית" על זרימות רשת — כל עומס עבודה מדבר רק עם מה שנדרש לתפקודו
C. היא מבטלת את הצורך בהרשאות, כי כל התעבורה מוצפנת
D. היא מעניקה הרשאות לפי ותק העובד ברשת
E. אין קשר בין מיקרו-סגמנטציה ל-Least Privilege

Correct: B

Explanation: Least Privilege קובע שכל גורם מקבל את ההרשאות המצומצמות ביותר הדרושות
לתפקידו. מיקרו-סגמנטציה מיישמת בדיוק את העיקרון הזה על **זרימות רשת**: כל עומס עבודה
רשאי לתקשר רק עם מה שנדרש לתפקודו, וכל שאר הזרימות נחסמות (Palo Alto: "based on the
principle of least privilege"). לכן B. A הפוכה לחלוטין מ-Least Privilege. C ממציאה
קשר להצפנה ומבטלת הרשאות — בדיוק ההיפך. D ("לפי ותק") אינו קריטריון הרשאה מינימלית
אלא שרירותי. E שגויה — הקשר הוא לב העניין: מיקרו-סגמנטציה היא Least Privilege מתורגם
מ"מה משתמש רשאי לעשות" ל"עם מי שרת רשאי לדבר".

Difficulty: medium

Concepts: Micro-segmentation, Least Privilege

Bloom: understand

Learning Objective: לחבר מיקרו-סגמנטציה לעקרון Least Privilege כמיושם על זרימות רשת.

Misconception: סטודנטים תופסים Least Privilege כשייך רק למשתמשים, ולא מזהים אותו כעיקרון מאחורי סגמנטציה רשתית.

---

## Question

id: q-micro-segmentation-009
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Zero Trust
  - DMZ

מנהל טוען: "עברנו ל-Zero Trust, אז אפשר לפרק את ה-DMZ ואת חומות האש ההיקפיות —
הן מיושנות". לפי המרצה והמקורות, מה הכשל בטענה?

### Scenario

הארגון מפעיל שירותים פומביים מול האינטרנט, יישומים ישנים ללא זהות מובנית, ונמצא
תחת דרישות רגולציה לסגמנטציית רשת.

### Answers

A. אין כשל — Zero Trust אכן מחליף לחלוטין את ה-DMZ ואת הפרימטר
B. הכשל הוא ש-Zero Trust ו-DMZ הם "complements, not competitors" — Zero Trust מרחיב את ה-DMZ ולא מחליפו
C. הכשל הוא ש-Zero Trust יקר מדי, ולכן עדיף להישאר עם הפרימטר בלבד
D. הכשל הוא ש-Zero Trust עובד רק בענן, ולא בשירותים פומביים
E. אין כשל, אך צריך קודם להצפין את כל השירותים הפומביים

Correct: B

Explanation: המרצה שואל במפורש "Is DMZ dead in a Zero Trust world?" ועונה "NO, IT'S
EVOLVING" — Zero Trust ו-DMZ הם "complements, not competitors". ה-DMZ מצמצם את משטח
החשיפה ("shrink the attack surface"), ו-Zero Trust מוסיף החלטת גישה לכל בקשה — כל
סגמנט הופך ל-micro-DMZ. לכן פירוק ה-DMZ, במיוחד עם שירותים פומביים, יישומים ישנים
ודרישות רגולציה, מסיר שכבה ולא מחליף אותה — B. A משחזרת בדיוק את הכשל. C ו-D ממציאות
מגבלות עלות/ענן שאינן הטיעון. E מרככת ל"אין כשל" בעוד הכשל מהותי: הסרת שכבה מגנה.

Difficulty: hard

Concepts: Zero Trust, DMZ

Bloom: analyze

Learning Objective: להסביר מדוע Zero Trust ומיקרו-סגמנטציה מרחיבים את ה-DMZ ולא מחליפים אותו.

Misconception: סטודנטים חושבים ש-Zero Trust "הורג את ה-DMZ", בעוד המרצה קובע שהוא מפתח אותו ("complements, not competitors").
