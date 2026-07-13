---
id: dropper-flashcards
lesson: dropper
---

# כרטיסיות — Dropper

## Card

front: מהו Dropper?
back: נוזקה שכל תכליתה להעביר ולהתקין נוזקה אחרת (ה-payload) מעבר להגנות ואל מכונת הקורבן. הוא נשא (carrier), לא כלי נזק.
concepts:
  - Dropper

## Card

front: מהי המלכודת המרכזית לגבי דרופר במבחן?
back: דרופר **אינו** גורם נזק בעצמו. הוא אינו מצפין, לא גונב ולא מאט — אלה פעולות ה-payload. הדרופר רק מוריד ומתקין.
concepts:
  - Dropper

## Card

front: מה ההבדל בין Single-Stage ל-Two-Stage Dropper?
back: Single-Stage נושא את ה-payload בתוך הקוד שלו ואינו צריך רשת. Two-Stage (Downloader) מוריד את ה-payload משרת מרוחק לאחר ההרצה.
concepts:
  - Dropper

## Card

front: מהו השם הנוסף ל-Two-Stage Dropper?
back: Downloader — כי הוא מוריד את המטען משרת מרוחק במקום לשאת אותו בתוכו.
concepts:
  - Dropper

## Card

front: מהם ששת שלבי שרשרת התקיפה של דרופר?
back: 1. Spear Phishing → 2. User Clicks Link → 3. Dropper Downloaded → 4. Payload Deployed → 5. C2 Beaconing → 6. Remote Control.
concepts:
  - Dropper

## Card

front: באיזה שלב בשרשרת מסתיים תפקיד הדרופר?
back: בשלב ההתקנה (Payload Deployed). מרגע זה הנוזקה המותקנת פועלת עצמאית — C2 ושליטה מרחוק שייכים לה, לא לדרופר.
concepts:
  - Dropper

## Card

front: איך מגיעה Ransomware אל המכונה בעזרת דרופר?
back: הדרופר מגיע דרך spear phishing, רץ, ומתקין את ה-Ransomware. הדרופר הוא הדלת; ה-Ransomware היא שמצפינה ודורשת כופר.
concepts:
  - Dropper
  - Ransomware

## Card

front: מהן שש טכניקות ההתחמקות של דרופר?
back: Code Obfuscation, Fileless Techniques, Legitimate-Looking Wrappers, Sandbox Detection, Polymorphism, Staged Delivery.
concepts:
  - Dropper

## Card

front: מדוע Polymorphism מביס זיהוי מבוסס חתימות?
back: כל עותק של הדרופר מקבל חתימה בינארית שונה, ולכן אין דפוס קבוע שזיהוי מבוסס חתימות (Knowledge-based) יכול להתאים מולו.
concepts:
  - Dropper
  - Knowledge-based Detection

## Card

front: איזה סוג זיהוי עשוי לתפוס דרופר חמקמק, ולמה?
back: זיהוי מבוסס התנהגות (Behavior-based) — הוא בוחן רצף פעולות חריג (כמו PDF שמפעיל cmd.exe) ולא את מראה הקובץ.
concepts:
  - Dropper
  - Behavior-based Detection

## Card

front: מהי הדוגמה של המרצה להתנהגות חשודה ש-EDR מסמן?
back: "a PDF spawning a cmd.exe" — מסמך PDF שמפעיל שורת פקודה. אין לכך סיבה לגיטימית, ולכן זה מסגיר דרופר.
concepts:
  - Dropper

## Card

front: מהן שש שכבות ההגנה מפני דרופרים?
back: Email Security Gateways, EDR, Network Monitoring, User Awareness Training, Least Privilege, Threat Intelligence & IOCs.
concepts:
  - Dropper
  - Least Privilege

## Card

front: מדוע Least Privilege ייחודית בין ההגנות מפני דרופר?
back: היא ההגנה היחידה שעובדת **אחרי** שהדרופר כבר רץ בהצלחה — היא מגבילה את הנזק שה-payload יכול לגרום, במקום לנסות למנוע כניסה.
concepts:
  - Least Privilege
  - Dropper

## Card

front: מהם דוגמאות ל-payload שדרופר מתקין?
back: RAT, Keylogger, Rootkit, ולעיתים Ransomware. אלה הנוזקות שעושות את הנזק בפועל.
concepts:
  - Dropper
