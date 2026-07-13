---
id: virus-quiz
lesson: virus
title: שאלון — וירוס
---

## Question

id: q-virus-001
type: multiple-choice
difficulty: easy
cognitive: understand
estimatedTime: 45
points: 5
concepts:
  - Virus

מהו ההבדל העיקרי בין וירוס (Virus) לתולעת (Worm)?

### Answers

A. וירוס דורש קובץ מארח ופעולת משתמש כדי לרוץ, בעוד שתולעת מתפשטת באופן עצמאי ברשת בלי מארח ובלי משתמש.

B. תולעת דורשת קובץ מארח, בעוד שווירוס הוא תוכנית עצמאית (standalone).

C. וירוס פועל רק ברשתות פנימיות, בעוד שתולעת פועלת רק ברשתות חיצוניות.

D. וירוס מתפשט מהר יותר מתולעת מפני שהוא אינו תלוי בהתנהגות המשתמש.

E. אין הבדל מהותי — שני המונחים מתארים את אותה נוזקה.

Correct: A

Explanation: וירוס מוגדר בשני תנאים — קובץ מארח ופעולת משתמש — ולכן הוא נעצר עד שמישהו יפתח את הקובץ. תולעת היא ההפך: נוזקה עצמאית שמתפשטת ברשת בלי מארח ובלי אינטראקציה, ולכן מהר בהרבה. מסיח B הופך את התלות (התולעת היא הסטנד-אלון, לא הווירוס). מסיח C ממציא חלוקה פנימי/חיצוני שאינה קיימת. מסיח D הפוך: דווקא התלות במשתמש היא שמאטה את הווירוס ביחס לתולעת. מסיח E שגוי — ההבחנה בין השניים היא לב השיעור.

Difficulty: easy

Concepts: Virus, Worm

Bloom: understand

Learning Objective: להבחין בין וירוס לתולעת לפי התלות במארח ובמשתמש.

Misconception: סטודנטים מכנים כל נוזקה "וירוס" ומצמידים לווירוס התפשטות עצמאית — תכונה של תולעת.

---

## Question

id: q-virus-002
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - Virus

מדוע וירוס מסוג Document-Based (כגון קובץ ‎.DOC‎) מצריך שלב הפעלה נוסף בהשוואה לווירוס מסוג Executable-Based (‎.EXE‎)?

### Answers

A. מפני שהקוד הזדוני יושב ב-Macros של המסמך, והמשתמש חייב לאשר enable macros לפני שהוא ירוץ.

B. מפני שמסמך Word אינו יכול להכיל קוד, ולכן הווירוס חייב להוריד רכיב נוסף מהאינטרנט.

C. מפני שקובצי ‎.DOC‎ מוצפנים כברירת מחדל ויש לפענח אותם ידנית.

D. מפני שקובץ הרצה ‎.EXE‎ דורש הרשאות מנהל, בעוד שמסמך אינו דורש.

E. מפני שווירוס מסוג Document-Based אינו זקוק לפעולת משתמש כלל.

Correct: A

Explanation: ב-Document-Based Virus הקוד מוטמע ב-Macros, ו-Macros אינן רצות אלא אם המשתמש מאשר enable macros — זהו שלב ההפעלה הנוסף. ב-Executable-Based עצם ההרצה מפעילה מיד את הווירוס. מסיח B שגוי: מסמך כן מכיל קוד (Macros), וזו כל הנקודה. מסיח C ממציא הצפנה שאינה קיימת. מסיח D מדבר על הרשאות ולא על מספר שלבי ההפעלה, ואינו הסיבה. מסיח E סותר את עצם הגדרת הווירוס — כל וירוס דורש פעולת משתמש.

Difficulty: medium

Concepts: Virus

Bloom: understand

Learning Objective: להסביר את תפקיד ה-Macros כשלב ההפעלה הנוסף בווירוס מבוסס-מסמך.

Misconception: סטודנטים חושבים שמסמך "לא יכול להריץ קוד" ולכן מפספסים את מנגנון ה-Macros.

---

## Question

id: q-virus-003
type: scenario
difficulty: medium
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - Virus
  - Phishing

בהתבסס על התרחיש, מהו הרכיב שבלעדיו הווירוס לא היה רץ כלל?

### Scenario

בחברת הייטק מקבל מהנדס תוכנה דוא"ל שנראה כמגיע ממחלקת הכספים, ובו מצורף קובץ Word
בשם "טופס_החזר_הוצאות.doc". הוא פותח את הקובץ, רואה פס צהוב שמבקש "Enable Content",
ומאשר. תוך דקות מתחילים מסמכים נוספים בתיקייה המשותפת שלו להידבק.

### Answers

A. Microsoft Word — הוא ה-Host Program שהרצתו הפעילה את קוד הווירוס.

B. חיבור האינטרנט של המהנדס.

C. הרשאות המנהל (admin) של תחנת העבודה.

D. מערכת ההפעלה Windows דווקא, שכן הווירוס אינו רץ על מערכות אחרות.

E. שרת הדוא"ל של החברה.

Correct: A

Explanation: הווירוס הוא Document-Based, וקוד הווירוס יושב ב-Macros של מסמך ה-Word. Word הוא ה-Host Program: כשהמסמך נפתח וה-Macros אושרו (enable content), קוד הווירוס רץ יחד עם התוכנית. בלי המארח אין קוד שירוץ. מסיח B שגוי — ההדבקה לתיקייה המקומית אינה דורשת אינטרנט. מסיח C אינו נדרש; הווירוס רץ בהרשאות המשתמש הרגיל. מסיח D ממציא הגבלת פלטפורמה שאינה רלוונטית לשאלה. מסיח E מתאר את נתיב ההגעה, לא את המארח שהריץ את הקוד.

Difficulty: medium

Concepts: Virus, Phishing

Bloom: analyze

Learning Objective: לזהות את ה-Host Program כרכיב ההכרחי להרצת וירוס מבוסס-מסמך.

Misconception: סטודנטים מבלבלים בין נתיב ההגעה (דוא"ל, אינטרנט) לבין המארח שבתוכו הקוד רץ בפועל.

---

## Question

id: q-virus-004
type: attack-analysis
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - Virus
  - Knowledge-based Detection

בית חולים מסתמך על מערכת זיהוי מבוססת-חתימות (Knowledge-based) בלבד. איזו תכונה של וירוס תקשה עליו ביותר לזהות ולסלק את הנוזקה?

### Answers

A. שימוש בטכניקות לשינוי החתימה בבסיס הקוד של הווירוס בכל שכפול (Polymorphism).

B. שימוש בפרוטוקולי תקשורת מוצפנים בין הווירוס לתוקף.

C. מהירות ההתפשטות הגבוהה של הווירוס ברשת.

D. גודל הקובץ הגדול של הווירוס.

E. העובדה שהווירוס נכתב בשפת תכנות מודרנית.

Correct: A

Explanation: זיהוי מבוסס-חתימות מחפש התאמה מדויקת לחתימה ידועה. Polymorphism משכתב את הקוד הבינארי בכל שכפול, כך שלכל עותק חתימה שונה ואין למה להתאים — בדיוק המנגנון שמנטרל את [[Knowledge-based Detection]]. מסיח B נוגע בסודיות התקשורת, לא ביכולת לזהות את החתימה של הקובץ עצמו. מסיח C מקשה על בלימה אך לא על עצם הזיהוי מבוסס-החתימה. מסיחים D ו-E אינם משפיעים על יכולת ההתאמה לחתימה — גודל ושפת כתיבה אינם מסתירים חתימה.

Difficulty: hard

Concepts: Virus, Knowledge-based Detection

Bloom: analyze

Learning Objective: להסביר מדוע Polymorphism מנטרל זיהוי מבוסס-חתימות.

Misconception: סטודנטים מניחים שהצפנת תקשורת היא שמסתירה וירוס מ-IDS, בעוד שהמנגנון הרלוונטי לחתימת הקובץ הוא Polymorphism.

---

## Question

id: q-virus-005
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - Virus

לפי המרצה, איזו מהאמירות הבאות נכונה לגבי דרכי ההתפשטות של וירוס?

### Answers

A. כל דרכי ההתפשטות דורשות בסופו של דבר אינטראקציה כלשהי של המשתמש.

B. Web Exploitation מתפשט אוטומטית לחלוטין, בלי שהמשתמש עשה דבר.

C. וירוס מתפשט ברשת בין מחשבים בלי מעורבות אדם, בדומה לתולעת.

D. הדרך היחידה שבה וירוס מתפשט היא דרך צרופות דוא"ל.

E. וירוס מתפשט רק דרך התקני USB פיזיים.

Correct: A

Explanation: המרצה מדגיש במפורש: "Viruses always require some form of user interaction to execute". כל ארבע דרכי ההתפשטות (File Sharing, Malicious Downloads, Web Exploitation, Social Engineering) מסתכמות בפעולה אנושית. מסיח B שגוי — גם Web Exploitation מתחיל בכך שהמשתמש ביקר באתר. מסיח C מתאר תולעת, לא וירוס. מסיחים D ו-E מצמצמים את ההתפשטות לדרך אחת בלבד, בעוד שהמרצה מונה כמה.

Difficulty: easy

Concepts: Virus

Bloom: remember

Learning Objective: לזכור שכל דרכי ההתפשטות של וירוס דורשות פעולת משתמש.

Misconception: סטודנטים מניחים ש-Web Exploitation הוא "אוטומטי לחלוטין" ומתעלמים מכך שהמשתמש נדרש לבקר באתר.
