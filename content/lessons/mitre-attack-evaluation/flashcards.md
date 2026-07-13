---
id: mitre-attack-evaluation-flashcards
lesson: mitre-attack-evaluation
title: כרטיסיות — הערכת פתרונות אבטחה באמצעות MITRE ATT&CK
---

## Card

front: מהי הערכת MITRE ATT&CK (Evaluation)?
back: הסטנדרט המוביל להערכת פתרונות זיהוי ותגובה (Detection & Response). לא מבחן אנטי-וירוס — סימולציה מלאה בת ארבעה ימים של תקיפה שלמה.
concepts:
  - MITRE ATT&CK

## Card

front: כמה זמן נמשכת ההערכה, ומי מול מי?
back: ארבעה ימים. צוות אדום (Red Team) של MITRE מול צוות כחול (Blue Team) של יצרן האבטחה הנבדק, המגלגל תקיפה מאפס ועד לאימפקט.
concepts:
  - MITRE ATT&CK

## Card

front: מדוע הערכת MITRE אינה מבחן אנטי-וירוס?
back: מבחן AV זורק דגימות נוזקה בודדות ובודק חסימה. ההערכה מדמה שרשרת תקיפה שלמה של קבוצת אמת, כולל פעולות לגיטימיות בפני עצמן.
concepts:
  - MITRE ATT&CK

## Card

front: מהי נראות (Visibility / Telemetry) בהערכה?
back: היכולת של המוצר בכלל לראות שצעד בתקיפה קורה. נשענת על גיוון מקורות המידע (Data Sources). בלעדיה — המגן עיוור ואי אפשר להתריע.
concepts:
  - Data Sources

## Card

front: מהו כיסוי אנליטי (Analytic Coverage)?
back: מה המוצר יודע לעשות עם הנתונים שקלט, והאם הוא הופך אותם למידע בר-פעולה. איסוף נתונים לבדו אינו מספיק.
concepts:
  - Analytic Coverage

## Card

front: מה ההבדל בין נראות לכיסוי אנליטי?
back: נראות = האם המוצר בכלל קלט את הפעולה. כיסוי אנליטי = האם הוא הבין אותה והפך אותה להתראה בת-פעולה. נראות תנאי הכרחי אך לא מספיק.
concepts:
  - Data Sources
  - Analytic Coverage

## Card

front: מהן שלוש רמות ההעשרה של הכיסוי האנליטי?
back: General (משהו לא טוב קורה, בלי פירוט), Tactic (למה התוקף פועל, אך לא איך), Technique (בדיוק באילו טכניקות השתמש).
concepts:
  - Analytic Coverage

## Card

front: איזו רמת העשרה בעלת הערך הרב ביותר למגן, ומדוע?
back: Technique. היא מזהה את הטכניקות המדויקות של התוקף, מקצרת דרמטית את זמן החקירה ומאפשרת תגובה מהירה.
concepts:
  - Analytic Coverage

## Card

front: מה קורה כשמוצר משיג נראות 100% אך רק רמת General?
back: הוא ראה הכל אך הבין מעט. האנליסט מקבל ערמת נתונים גולמיים ולא יודע מה מהם תקיפה — הוא טובע במידע.
concepts:
  - Analytic Coverage

## Card

front: האם MITRE מדרגת מוצרים ומכריזה על מנצח?
back: לא. אין טבלת ליגה ואין דירוג. MITRE מנגישה נתונים גולמיים ושקופים כדי שמנהלי אבטחה ינתחו בעצמם את הכיסוי ופערי האבטחה.
concepts:
  - MITRE ATT&CK

## Card

front: אילו שתי קבוצות תקיפה מודלו בהערכה מספר 4?
back: Wizard Spider — מניע פיננסי, עולם הכופרות (Ransomware). Sandworm — קבוצה מדינתית רוסית, נוזקות הרסניות כמו NotPetya.
concepts:
  - MITRE ATT&CK

## Card

front: איזה מידע נוסף מספקים צילומי המסך בדוחות MITRE?
back: הם מאפשרים לאמוד קלות שימוש — למשל אם גם אנליסטים זוטרים (Tier 1) יפעילו את המערכת ביעילות, ולא רק מומחים.
concepts:
  - MITRE ATT&CK
