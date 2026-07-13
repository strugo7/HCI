---
id: dos-ddos-flashcards
lesson: dos-ddos
---

# כרטיסיות — מתקפות מניעת שירות: DoS ו-DDoS

## Card

front: מהי מתקפת DoS (Denial of Service)?
back: מתקפה שמטרתה לשלול ממשתמשים לגיטימיים גישה לשירות, על ידי הצפתו בבקשות או בתעבורה מעבר לקיבולת שלו. היא אינה פורצת פנימה ואינה גונבת דבר.
concepts:
  - DDoS

## Card

front: מה ההבדל בין DoS ל-DDoS?
back: ההבדל הוא הביזור: ב-DDoS (Distributed) המתקפה מגיעה בו-זמנית ממספר רב של מקורות, ואילו DoS מגיע ממקור יחיד.
concepts:
  - DDoS

## Card

front: מדוע חסימת כתובת IP אחת חסרת ערך מול DDoS?
back: כי התעבורה מבוזרת על פני עשרות אלפי כתובות לגיטימיות למראה. חסימת אחת מותירה את השאר פעילות, ואי אפשר לחסום את כולן בלי לפגוע גם במשתמשים אמיתיים.
concepts:
  - DDoS

## Card

front: מהו Botnet?
back: רשת גדולה של מכשירים מחוברי-רשת שנפרצו והודבקו בנוזקה, ונשלטים כולם בו-זמנית על ידי תוקף יחיד דרך ערוץ Command and Control. כל מכשיר נקרא bot או zombie.
concepts:
  - Botnet

## Card

front: מהם שלושת שלבי חייו של Botnet?
back: גיוס (recruit) — סריקה והדבקה של מכשירים פגיעים; שליטה (command) — כל מכשיר פותח ערוץ C&C ומחכה להוראות; הצפה (flood) — פקודה אחת מפעילה הצפה המונית של היעד.
concepts:
  - Botnet

## Card

front: מה הקשר בין Botnet ל-Command and Control?
back: ה-Botnet נשלט דרך ערוץ C&C — אותו מנגנון "phone home" שנלמד ביחידת הנוזקות. דרכו התוקף מוציא פקודה אחת וכל המכשירים מציפים את היעד בו-זמנית.
concepts:
  - Botnet
  - Command and Control

## Card

front: מהן שלוש משפחות מתקפות מניעת השירות?
back: Volumetric (הצפת רוחב פס, L3/L4), Protocol (הכליית מצב חיבור כמו SYN flood, L3/L4), ו-Application-layer (הכליית משאבי יישום בבקשות שנראות אמיתיות, L7).
concepts:
  - DDoS

## Card

front: כיצד עובדת מתקפת SYN flood ולמה היא "protocol" ולא "volumetric"?
back: התוקף שולח אלפי SYN עם מקור מזויף ולעולם לא משלים ב-ACK, ממלא את טבלת החיבורים חצי-הפתוחים של השרת. היעד הוא מצב החיבור (state), לא רוחב הפס — ולכן היא דורשת תעבורה מועטה יחסית.
concepts:
  - DDoS

## Card

front: מדוע מתקפת application-layer (L7) קשה במיוחד לזיהוי?
back: כי הבקשות נראות כמו תעבורת גולשים אמיתית — בקשות HTTP תקינות אל פורט מותר. ברמת הרשת הכול נראה נורמלי, אך כל בקשה יקרה לשרת ומכלה את משאבי היישום.
concepts:
  - DDoS

## Card

front: כיצד עובדת מתקפת amplification/reflection?
back: התוקף שולח בקשה קטנה לשרת ציבורי (DNS/NTP) עם כתובת מקור מזויפת = כתובת הקורבן. השרת עונה בתשובה גדולה בהרבה, ומכיוון ש-UDP אינו מאמת מי שאל — התשובה נשלחת אל הקורבן, לא אל התוקף.
concepts:
  - DDoS

## Card

front: מהי ההגנה השורשית נגד spoofing שמאפשר reflection?
back: Ingress filtering (BCP 38) — ספקי אינטרנט שדוחים תעבורה יוצאת שכתובת המקור שלה מזויפת. זו בעיה קולקטיבית: המתקפה מתאפשרת בגלל רשתות שאינן מסננות.
concepts:
  - DDoS

## Card

front: מדוע DDoS ייחודית בכך שהיא "אינה דורשת חולשה"?
back: כל תקיפה אחרת מנצלת פגם שאפשר לתקן (באג, הגדרה, סיסמה). DDoS מנצלת עובדה — לכל מערכת קיבולת סופית. שרת מוקשח ומעודכן לחלוטין ייפול בדיוק כמו מוזנח. אין CVE לסגור.
concepts:
  - DDoS

## Card

front: מדוע חומת אש בשכבה 3 לבדה אינה יכולה לעצור DDoS volumetric?
back: הקו שמוביל אליה נסתם עוד לפני הסינון; היא מסננת לפי כתובת, וכל שורת DENY חוסמת אחת מעשרות אלפי מקורות; והיא לא רואה תוכן L7, כך שבקשות application-layer נראות לה תקינות.
concepts:
  - DDoS
  - Firewall

## Card

front: מהן שלוש המיטיגציות המרכזיות ל-DDoS?
back: Rate limiting (הגבלת קצב לכל מקור — המיטיגציה שהמרצה מייעד ל-Obstruction), Scrubbing centers (מרכזי שטיפה שמסננים לפני השרת), ו-CDN/Anycast absorption (פיזור התעבורה על פני רשת עולמית).
concepts:
  - DDoS

## Card

front: לאיזו צלע של CIA שייכת DDoS, ותחת איזו קטגוריה ב-RFC 2828?
back: Availability בלבד — היא חוסמת גישה, לא חושפת ולא משנה. ב-RFC 2828 היא הדוגמה הקנונית של Obstruction (הרכיב חי וחסום), להבדיל מ-Incapacitation (הרכיב מושבת).
concepts:
  - DDoS
  - Obstruction
  - Availability
