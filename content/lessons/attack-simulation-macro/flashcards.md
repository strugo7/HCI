---
id: attack-simulation-macro-flashcards
lesson: attack-simulation-macro
---

# כרטיסיות — אנטומיית תקיפה: סימולציית Office Macro

## Card

front: מהו Spear Phishing, ובמה הוא נבדל מ-Phishing רגיל?
back: דיוג ממוקד (Spear Phishing) — מייל מותאם שנשלח לכמה עובדים נבחרים, לעומת דיוג המוני. בסימולציה זו נקודת הכניסה של רוברט.
concepts:
  - Phishing

## Card

front: מהן XLM Macros ומדוע תוקפים אוהבים אותן?
back: מאקרו מיושן (XLM Macros) של Office משנות ה-90 שעדיין נתמך לאחור. הוותק הוא היתרון — כלי סינון תוכן רבים מתקשים לזהות אותו.
concepts:
  - Phishing

## Card

front: מה מפעיל את המאקרו בתחנה של רוברט?
back: הלחיצה על "Enable Editing" בקובץ ה-Word המתחזה לקורות חיים. היא פותחת חיבור אל עמדת ה-Command and Control של התוקף.
concepts:
  - Command and Control

## Card

front: מהי עמדת Command and Control (C&C) בתקיפה זו?
back: השרת שאליו התחנה הנגועה יוצרת חיבור חזרה, וממנו התוקף שולט בתקיפה, סורק את הרשת ומכוון את הצעדים הבאים.
concepts:
  - Command and Control

## Card

front: מהו Process Injection ומה מטרתו כאן?
back: העברת קוד התקיפה מתהליך Word אל תהליך Firefox. מטרתו OpSec — תקשורת יוצאת מדפדפן נראית לגיטימית ומתחמקת מגילוי.
concepts:
  - Command and Control

## Card

front: מדוע תקשורת יוצאת מ-Word חשודה יותר מתקשורת מ-Firefox?
back: Word שמתקשר לכתובות אינטרנט חיצוניות הוא דפוס חריג שמערכת ההגנה מסמנת; דפדפן שמתקשר החוצה נראה טבעי לחלוטין.
concepts:
  - Command and Control

## Card

front: מהו OpSec מנקודת מבט התוקף?
back: Operational Security — פעולות שהתוקף נוקט כדי להגן על עצמו מפני זיהוי, כמו הזרקת קוד לתהליך לגיטימי כדי להסוות תקשורת.
concepts:
  - Command and Control

## Card

front: מה התוקף מגלה בשלב הסריקה (Discovery) מתוך הדפדפן?
back: את ה-Domain Controller ואת התחנה של מריה, המנכ"לית — היעדים לתנועה הרוחבית (Lateral Movement) הבאה.
concepts:
  - Lateral Movement

## Card

front: מהו UAC Bypass ולמה התוקף זקוק לו?
back: מעקף למנגנון בקרת החשבון של Windows (UAC Bypass) להעלאת הרשאות. ההרשאות נותנות אחיזה מתמשכת (Persistence) וגניבת נתוני הזדהות.
concepts:
  - Least Privilege

## Card

front: כיצד Least Privilege מקשה על העלאת ההרשאות?
back: הרשאה מינימלית נותנת לתוקף חשבון פתיחה חלש. כדי להתקדם הוא חייב לטפס — צעד רועש וחשוף. היא מייקרת את התקיפה, לא מונעת חדירה.
concepts:
  - Least Privilege

## Card

front: מהו Malop (Malicious Operation)?
back: איגוד כל הפעולות לסיפור תקיפה אחד שלם — מהמייל, ל-Word, להזרקה ל-Firefox, לסריקה — במקום התראות בודדות חסרות הקשר. מקצר את זמן התגובה.
concepts:
  - Command and Control

## Card

front: אילו פעולות תגובה אוטומטיות מציעה המערכת לאנליסט?
back: הרג התהליכים הזדוניים ובידוד (Isolation) המכונה מהרשת — עוד לפני שהתוקף מגיע ליעד. גם זיהוי ה-DGA שבו נוצרה תקשורת ה-C&C.
concepts:
  - Command and Control
