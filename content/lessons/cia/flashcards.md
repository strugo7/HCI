---
id: cia-flashcards
lesson: cia
---

# כרטיסיות — משולש ההגנה CIA

## Card

front: מהן שלוש צלעות משולש ההגנה?
back: Confidentiality (סודיות), Integrity (שלמות), Availability (זמינות).
concepts:
  - CIA

## Card

front: על איזו שאלה עונה Confidentiality?
back: מי מורשה לראות את המידע.
concepts:
  - Confidentiality

## Card

front: על איזו שאלה עונה Integrity?
back: האם המידע מדויק ולא שונה בידי גורם לא מורשה.
concepts:
  - Integrity

## Card

front: על איזו שאלה עונה Availability?
back: האם המידע והשירות נגישים למורשים כשהם נדרשים.
concepts:
  - Availability

## Card

front: מדוע פגיעה בסודיות מתגלה בדרך כלל מאוחר?
back: כי דבר אינו נשבר — המידע לא נמחק, לא שונה, והמערכת ממשיכה לעבוד כרגיל. אין קריסה ואין התרעה.
concepts:
  - Confidentiality

## Card

front: האם שינוי מידע קיים הוא הפגיעה היחידה ב-Integrity?
back: לא. גם יצירת מידע שקרי חדש — רשומה, משתמש או שורת לוג שהומצאו — היא פגיעה בשלמות.
concepts:
  - Integrity

## Card

front: מה מייחד תקיפה על Availability לעומת תקיפה על שתי הצלעות האחרות?
back: היא אינה דורשת חולשה במערכת. שרת מעודכן ומוקשח לחלוטין ייפול תחת מספיק בקשות.
concepts:
  - Availability
  - DDoS

## Card

front: מה Encryption מבטיח, ומה הוא לא מבטיח?
back: מבטיח סודיות בלבד. אינו מונע שינוי מידע (שלמות), ואף עלול לפגוע בזמינות אם המפתח אובד.
concepts:
  - Encryption
  - Confidentiality

## Card

front: מדוע Hashing לבדו אינו מספיק כדי להגן על שלמות מול תוקף?
back: תוקף שמסוגל לשנות את הקובץ מסוגל לרוב לשנות גם את ערך הגיבוב המפורסם לצידו. נדרשת קשירה לסוד — HMAC או חתימה דיגיטלית.
concepts:
  - Hashing
  - Integrity

## Card

front: מה ההבדל בין Authentication ל-Authorization?
back: Authentication עונה על "מי אתה?"; Authorization עונה על "מה מותר לך לעשות?". אלה שני שלבים נפרדים ורצופים.
concepts:
  - Authentication
  - Authorization

## Card

front: תן דוגמה לבקרה שמחזקת סודיות ומחלישה זמינות.
back: הצפנת דיסק מלאה — אובדן המפתח פירושו אובדן המידע. גם MFA: משתמש בלי הטלפון שלו ננעל בחוץ.
concepts:
  - CIA
  - Encryption

## Card

front: כיצד ממופה מתקפת Interception אל המשולש?
back: היא שוללת Confidentiality — התוקף מאזין למידע העובר בלי לשנותו.
concepts:
  - Confidentiality

## Card

front: כיצד ממופות מתקפות Modification ו-Fabrication אל המשולש?
back: שתיהן שוללות Integrity — האחת משנה מידע קיים, השנייה מייצרת מידע או ישות מזויפים.
concepts:
  - Integrity

## Card

front: מהי השאלה הראשונה שיש לשאול כשמתרחש אירוע אבטחה?
back: איזו צלע של המשולש נפגעה — התשובה קובעת מה עושים עכשיו, לא זהות הכלי שבו השתמש התוקף.
concepts:
  - CIA

## Card

front: האם סודיות היא הצלע החשובה ביותר?
back: לא. אין דירוג קבוע. באתר חדשות זמינות מנצחת סודיות; במאגר תעודות זהות ההפך. הנכס קובע, לא המודל.
concepts:
  - CIA
