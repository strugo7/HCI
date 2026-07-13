---
id: virus-flashcards
lesson: virus
---

# כרטיסיות — וירוס

## Card

front: מהם שני התנאים שחייבים להתקיים כדי שווירוס ירוץ?
back: קובץ מארח (host file) שהווירוס נצמד אליו, וגם פעולת משתמש שמפעילה את המארח. שניהם יחד.
concepts:
  - Virus

## Card

front: מהו ההבדל בשורה אחת בין וירוס לתולעת?
back: וירוס מחכה שתפתחו קובץ (מארח + משתמש); תולעת מתפשטת ברשת לבדה בלי מארח ובלי משתמש.
concepts:
  - Virus
  - Worm

## Card

front: מהו Host Program, ומה הדוגמה החוזרת של המרצה?
back: הקובץ או התוכנית שבתוכם הווירוס חי, ושבהרצתם רץ גם קוד הווירוס. הדוגמה: Microsoft Word.
concepts:
  - Virus

## Card

front: היכן יושב הקוד הזדוני בווירוס מסוג Document-Based, ומה ה-trigger שלו?
back: הקוד יושב ב-Macros של המסמך. ה-trigger הוא אישור המשתמש: enable macros.
concepts:
  - Virus

## Card

front: במה נבדל Executable-Based Virus מ-Document-Based מבחינת שלבי ההפעלה?
back: Executable-Based פועל מיד עם הרצת הקובץ (שלב אחד); Document-Based דורש שלב נוסף — אישור enable macros.
concepts:
  - Virus

## Card

front: מהי Key Insight המודגשת של המרצה על וירוסים?
back: "A virus always needs a host file and user action to activate" — וירוס תמיד זקוק גם למארח וגם לפעולת משתמש.
concepts:
  - Virus

## Card

front: מנה את ארבע דרכי ההתפשטות של וירוס לפי המרצה.
back: File Sharing, Malicious Downloads, Web Exploitation, Social Engineering. כולן דורשות אינטראקציה של המשתמש.
concepts:
  - Virus

## Card

front: מהו Polymorphism בהקשר של וירוס?
back: הווירוס משכתב את הקוד הבינארי של עצמו בכל שכפול, כך שלכל עותק חתימה (signature) שונה.
concepts:
  - Virus

## Card

front: מדוע Polymorphism מנטרל זיהוי מבוסס-חתימות (Knowledge-based Detection)?
back: זיהוי מבוסס-חתימות מחפש התאמה לחתימה יציבה וידועה. כשהקוד משתנה בכל עותק אין חתימה קבועה להתאים אליה, ולכן הווירוס מתחמק.
concepts:
  - Virus
  - Knowledge-based Detection

## Card

front: מהו Payload של וירוס?
back: מה שהווירוס מבצע בפועל אחרי שהופעל — גניבת מידע, השחתה, או המשך הפצה (replication).
concepts:
  - Virus

## Card

front: מה תפקידו של Malware Dropper בשרשרת מתקפת וירוס דרך מסמך Word?
back: הוא מתפוצץ מתוך המסמך שנפתח ויוצר קבצים שעושים את הנזק; אחד מהם (למשל PlugX) "מתקשר הביתה" אל התוקף.
concepts:
  - Virus
  - Dropper

## Card

front: כיצד מוצגת הצמדת קוד הווירוס למארח בשתי רמות?
back: Physically — הקוד נדבק פיזית לקובץ; Logically — הקובץ נראה כרצף Virus Code (a) → Original Program → Virus Code (b).
concepts:
  - Virus
