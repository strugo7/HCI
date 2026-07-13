---
id: identity-management-flashcards
lesson: identity-management
---

# כרטיסיות — ניהול זהויות

## Card

front: מה שלושת רכיבי מסגרת AAA?
back: Authentication (מי אתה), Authorization (מה מותר לך), Accounting (מי עשה מה — תיעוד ומעקב).
concepts:
  - Authentication
  - Authorization

## Card

front: על איזו שאלה עונה Authentication, ומה בא רק אחריו?
back: "מי אתה?" (Who are you). רק אחרי שהזהות אושרה נכנס Authorization וקובע "מה מותר לך".
concepts:
  - Authentication
  - Authorization

## Card

front: מהו רכיב Accounting ב-AAA, ומדוע הוא מסומן כמקור חיצוני?
back: תיעוד ומעקב — רישום מי עשה מה, מתי ומהיכן, לצורך ביקורת ואי-התכחשות. במצגת הוא מופיע ככותרת בלבד ללא הגדרה; ההגדרה מגיעה ממקור חיצוני (CompTIA/NIST).
concepts:
  - Authorization

## Card

front: מנה את חמשת גורמי האימות.
back: ידע (Knowledge), החזקה (Possession), מהות (Inherence), מיקום (Location), זמן (Time).
concepts:
  - Authentication

## Card

front: תן דוגמה לכל אחד מגורמי הידע, המיקום והזמן (לפי המצגת).
back: ידע — מספר ת"ז / טלפון / PIN. מיקום — חסימת כניסה לבנק הישראלי מסין. זמן — שומר שבת שהמשתמש שלו מתחבר בשבת.
concepts:
  - Authentication

## Card

front: מה ההבדל בין Smart Card לטוקן USB לפי המצגת?
back: שניהם מבוססי חומרה, אך בכרטיס החכם הזהות היא חד-פעמית, בשונה מטוקן ה-USB.
concepts:
  - Authentication

## Card

front: מהן שש השיטות הביומטריות שהמצגת מונה?
back: סורקים ביומטריים, זיהוי פנים, זיהוי קול, סריקת רשתית, ניתוח התנהגות, ואימות רציף.
concepts:
  - Authentication

## Card

front: מהי ההסתייגות המרכזית מביומטריה שהמרצה מדגיש?
back: בגלל סוגיות פרטיות ורגולציה, לא כל ארגון רשאי לאסוף ולאחסן מידע ביומטרי.
concepts:
  - Authentication

## Card

front: מהם שלושת שלבי ציר ההתפתחות של האימות?
back: Single-factor (ידע) ← Two-factor (החזקה) ← Multi-factor (מהות/ביומטריה). מוסיפים גורמים על בסיס גורם הידע.
concepts:
  - Multi-Factor Authentication

## Card

front: מדוע סיסמה + שאלת אבטחה אינן MFA?
back: כי שתיהן גורם ידע (Knowledge). MFA מחייב גורמים מסוגים שונים, כך שדליפה אחת לא חושפת את שניהם.
concepts:
  - Multi-Factor Authentication

## Card

front: מהו החיסרון המובנה של OTP לפי המרצה?
back: כדי לקבל את הקוד צריך מכשיר כלשהו; האמון עובר לערוץ הקבלה — וכשהוא SMS, הוא הופך ליעד.
concepts:
  - Multi-Factor Authentication

## Card

front: כיצד עוקף דיוג בזמן אמת אימות המבוסס על SMS-OTP?
back: אתר מזויף אוסף את הסיסמה ואת קוד ה-SMS מהקורבן ומעביר אותם מיד לאתר האמיתי לפני שהקוד פג. MFA "עבד" והתוקף בכל זאת נכנס.
concepts:
  - Phishing
  - Multi-Factor Authentication

## Card

front: מהו SSO, ומהו הסיכון המרכזי בו? (הרחבה חיצונית)
back: כניסה יחידה — הזדהות אחת שנותנת גישה לכמה מערכות. הסיכון: נקודת האכיפה המרכזית הופכת ליעד — פריצה שלה פורצת את כל המערכות שמאחוריה.
concepts:
  - Authentication

## Card

front: מדוע De-provisioning הוא בקרת אבטחה, וכיצד הוא קשור לאיום פנימי?
back: חשבון של עובד שעזב ולא בוטל הוא הרשאה חיה בידי מי שכבר לא אמור לגשת — משטח שאיום פנימי מנצל. ביטול ההקצאה סוגר את נתיב הגישה.
concepts:
  - Insider Threat
  - Authorization
