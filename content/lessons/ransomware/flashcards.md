---
id: ransomware-flashcards
lesson: ransomware
---

# כרטיסיות — כופרה (Ransomware)

## Card

front: מהי כופרה (Ransomware) — בהגדרה שנגזרת מהמצגות?
back: Malware שמצפינה את קבצי הקורבן, הופכת אותם ללא-נגישים, ודורשת כופר (בדרך כלל Bitcoin) בתמורה למפתח הפענוח. אין לה הגדרה טקסטואלית במצגות — היא נגזרת משרשראות התקיפה.
concepts:
  - Ransomware

## Card

front: מהי שרשרת התקיפה של כופרה, לפי המרצה?
back: מייל Phishing מזויף → Dropper מתקין את הכופרה (Cryptolocker) → הורדת Public key מ-C&C דרך TOR → הצפנת הקבצים בהדרגה → תשלום ב-Bitcoin → מסירת ה-Private key.
concepts:
  - Ransomware
  - Phishing
  - Dropper

## Card

front: מדוע ה-Private key הופך את התשלום לערוץ הפענוח היחיד?
back: הכופרה מורידה מה-C&C רק את ה-Public key ומצפינה איתו. ה-Private key המתאים נשאר אצל התוקף ולעולם אינו יורד למחשב הקורבן, כך שבלי גיבוי אין דרך מתמטית לפענח.
concepts:
  - Ransomware
  - Encryption

## Card

front: מהי ההגנה האמיתית היחידה מפני כופרה, לפי המרצה?
back: גיבויים offline (מנותקים מהרשת). המרצה: "robust offline backups can help recover from ransomware". גיבוי מקוון עלול להיצפן יחד עם המקור.
concepts:
  - Ransomware
  - Availability

## Card

front: איזו צלע ב-CIA נשללת בכופרה קלאסית, ומדוע לא סודיות?
back: זמינות (Availability). הקבצים לא נגנבים (לא סודיות) ולא משתנים בתוכנם (לא שלמות) — הם רק נעשים לא-נגישים. לכן המרצה ממקם אותה תחת Incapacitation.
concepts:
  - Ransomware
  - Availability
  - Incapacitation

## Card

front: מהי הסתירה בין המצגות לגבי הצלע שכופרה פוגעת בה?
back: אנטומיית התקיפה (שקופית 50) ממקמת כופרה תחת Availability. אך מצגת הפתיחה (שקופית 17) מונה אותה גם כאיום Integrity — "destructive: encryption or corruption of critical files".
concepts:
  - Ransomware
  - Availability
  - Integrity

## Card

front: מהו תפקידו של ה-C&C server בכופרה?
back: השרת בשליטת התוקף שממנו הכופרה מורידה את ה-Public key (דרך TOR) לפני ההצפנה. בלי הקשר אל ה-C&C אין לכופרה מפתח להצפין איתו.
concepts:
  - Command and Control
  - Ransomware

## Card

front: מהי המלכודת החוזרת לגבי ה-Dropper בהקשר כופרה?
back: ה-Dropper אינו מזיק בעצמו. תפקידו רק להתקין את הכופרה ולהקים את ערוץ ה-C&C. הנזק — ההצפנה — מגיע מהכופרה, לא מהדרופר. (מבחן 2023 שאלה 4.)
concepts:
  - Dropper
  - Command and Control

## Card

front: מדוע חסימת ערוץ ה-C&C יכולה לעצור כופרה לפני שקובץ אחד הוצפן?
back: מפני שהכופרה מקבלת את ה-Public key מה-C&C לפני שהיא מצפינה. אם הערוץ נחסם (למשל על ידי NGFW), אין לה מפתח, ובלי מפתח אין הצפנה.
concepts:
  - Command and Control
  - Ransomware

## Card

front: מהו Cryptolocker בהקשר השיעור?
back: הכופרה הספציפית שהמרצה מציג בציר הזמן שלו (שקופית 18) — "Cryptolocker installed". דוגמה קנונית לכופרה.
concepts:
  - Ransomware

## Card

front: מדוע Encryption בכופרה היא "נשק ולא הגנה"?
back: בשיעור ה-CIA הצפנה היא בקרת סודיות של המגן. בכופרה אותו כלי משמש את התוקף — הוא מצפין את הקבצים שלכם נגדכם. הצפנה חזקה יותר = מתקפה חזקה יותר.
concepts:
  - Encryption
  - Ransomware

## Card

front: מהי "Ransomware Evolution" שהמרצה מציין כמגמה עדכנית?
back: double/triple extortion, פלטפורמות RaaS (Ransomware-as-a-Service), ותקיפת תשתיות קריטיות — בתי חולים, מים, רשתות חשמל (מצגת הפתיחה, שקופית 31).
concepts:
  - Ransomware

## Card

front: מהו הקצב שהמרצה מדגיש בציר הזמן של הכופרה?
back: חלק מהשלבים אורכים שעות או שבועות (איתור כתובות, הכנת PDF, המתנה ללחיצה), אך ההצפנה עצמה אורכת שניות. כשמגלים — כבר מאוחר.
concepts:
  - Ransomware
