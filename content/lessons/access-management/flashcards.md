---
id: access-management-flashcards
lesson: access-management
---

# כרטיסיות — בקרת גישה

## Card

front: על איזו שאלה עונה בקרת גישה (Authorization), בשונה מאימות?
back: על "מה מותר לך לעשות?" — לאחר שאימות (Authentication) כבר קבע "מי אתה?".
concepts:
  - Authorization
  - Authentication

## Card

front: מה ההבדל בין כשל אימות לכשל הרשאה?
back: כשל אימות מכניס תוקף מתחזה; כשל הרשאה נותן למשתמש לגיטימי לגעת במה שאסור לו.
concepts:
  - Authentication
  - Authorization

## Card

front: מהם ארבעת מודלי בקרת הגישה?
back: DAC, MAC, RBAC ו-ABAC. הם נבדלים בעיקר בשאלה מי קובע את המדיניות.
concepts:
  - RBAC
  - ABAC

## Card

front: ב-DAC — מי קובע מי ניגש למשאב?
back: בעל המשאב עצמו (Discretionary). גמיש אך מבוזר וקל לטעות בו. דוגמה: שיתוף קובץ בכונן.
concepts:
  - Authorization

## Card

front: ב-MAC — מי קובע את המדיניות?
back: המערכת, לפי סיווגים קשיחים (Mandatory). איש — גם לא בעל המשאב — אינו יכול לעקוף. נפוץ בצבא וביטחון.
concepts:
  - Authorization

## Card

front: כיצד עובד RBAC?
back: הרשאות מוקצות לתפקידים (roles), והמשתמש מקבל אותן דרך שיוך לתפקיד — לא ישירות. ברירת המחדל בארגונים גדולים.
concepts:
  - RBAC

## Card

front: כיצד עובד ABAC?
back: ההחלטה מחושבת בזמן אמת מתוך תכונות של המשתמש, המשאב, הפעולה והסביבה (שעה, מיקום, רגישות), מול מדיניות.
concepts:
  - ABAC

## Card

front: מתי RBAC אינו מספיק ונדרש ABAC?
back: כשההחלטה תלויה בהקשר משתנה בזמן אמת — למשל "רק בשעות המשמרת" או "רק אם המטופל במחלקתי". RBAC נשען על שיוך תפקיד סטטי.
concepts:
  - RBAC
  - ABAC

## Card

front: מהו עקרון ההרשאה המינימלית (Least Privilege)?
back: כל גורם מקבל את ההרשאות המצומצמות ביותר הדרושות לתפקידו — כי הרשאות של חשבון שנפרץ הופכות להרשאות התוקף.
concepts:
  - Least Privilege

## Card

front: מהי הפרדת תפקידים (Separation of Duties) ומה היא מוסיפה על הרשאה מינימלית?
back: פעולה רגישה מחייבת יותר מאדם אחד, כך שאיש בודד אינו יכול להשלימה ולנצלה לרעה. היא מונעת ריכוז כוח, גם כשההרשאה עצמה מינימלית.
concepts:
  - Least Privilege

## Card

front: מהי זחילת הרשאות (Privilege Creep)?
back: הצטברות שקטה של הרשאות כשעובד עובר תפקיד ומקבל הרשאות חדשות בלי שנשללות הישנות. מתרחשת גם תחת RBAC.
concepts:
  - Least Privilege
  - RBAC

## Card

front: מדוע המעבר ל-RBAC אינו פותר לבדו זחילת הרשאות?
back: RBAC מרכז הרשאות בתפקידים אך אינו שולל אותן מעצמו. נדרשת אוטומציה של שלילת גישה (de-provisioning) וסקירת הרשאות תקופתית.
concepts:
  - RBAC
  - Least Privilege

## Card

front: מהו השלב שנכשל הכי הרבה במחזור חיי ההרשאות?
back: שלילת הגישה (de-provisioning) בעזיבה או בשינוי תפקיד. הפתרון: אוטומציה המחוברת למקור אמת ארגוני (למשל מערכת משאבי אנוש).
concepts:
  - Least Privilege
  - Insider Threat
