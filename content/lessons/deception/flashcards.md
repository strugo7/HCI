---
id: deception-flashcards
lesson: deception
---

# כרטיסיות — הונָאָה (Deception)

## Card

front: על איזה נכס מאיימת Deception (הונָאָה), ומה מייחד אותה?
back: איום על **system integrity או data integrity** — כלומר על Integrity (שקופיות 9, 30). היא אינה דורשת חדירה: המערכת מבצעת פעולה שהיא מורשית לבצע, אבל **האמינה למשהו שאינו נכון**.
concepts:
  - Deception
  - Integrity

## Card

front: מהן שלוש תת-ההתקפות של Deception, וממה מבדילה השאלה ביניהן?
back: Masquerade (התחזות), Falsification (זיוף), Repudiation (דחייה). השאלה המבדילה: **מה בדיוק השקר?** — הישות, הנתונים, או ההכחשה בדיעבד.
concepts:
  - Deception
  - Masquerade
  - Falsification
  - Repudiation

## Card

front: מהי ההגדרה של Masquerade (התחזות), ומהי המיטיגציה?
back: "An unauthorized entity poses as an authorized entity" — התוקף מזייף את ה**זהות**, ועונה על השאלה "מי שלח את זה?". המיטיגציה: **MFA**.
concepts:
  - Masquerade
  - Multi-Factor Authentication (MFA)

## Card

front: מדוע Masquerade קשה במיוחד לזיהוי במערכת ניטור תוכן?
back: מפני שאין פעולה חריגה. התוקף עושה בדיוק את מה שהמשתמש המקורי מורשה לעשות — רק שהוא לא המשתמש המקורי. השקר היחיד הוא הזהות, ולכן ההגנה חייבת לשבת על שכבת **האימות**, לא על התוכן.
concepts:
  - Masquerade

## Card

front: מהי ההגדרה של Falsification (זיוף), ומהי המיטיגציה?
back: "False data deceives an authorized entity" — התוקף מזייף את ה**נתונים**, ועונה על השאלה "האם מה שכתוב נכון?". השולח עשוי להיות אמיתי. המיטיגציה: **חתימות דיגיטליות**.
concepts:
  - Falsification

## Card

front: איך מבחינים בין Masquerade ל-Falsification? (הקו שהמבחן חוצה)
back: לפי **מה מזויף**. Masquerade — הישות מזויפת, התוכן אמיתי, השאלה "מי שלח?". Falsification — הנתונים מזויפים, הזהות עשויה להיות אמיתית, השאלה "האם זה נכון?". בדיקה מהירה: חיזוק אימות זהות = התחזות; אימות תוכן = זיוף.
concepts:
  - Masquerade
  - Falsification

## Card

front: איך מבחינים בין Falsification ל-Interception? (אותה עמדת תוקף)
back: לפי הפועל. Interception — התוקף **קורא** את ההודעה, הנתונים לא השתנו, פגיעה ב-Confidentiality. Falsification — התוקף **משנה** את ההודעה, ישות מורשית פועלת לפי נתון כוזב, פגיעה ב-Integrity. MITM הוא מיקום, לא קטגוריה.
concepts:
  - Falsification
  - Interception

## Card

front: מהי ההגדרה של Repudiation (דחייה), ומי הגורם המזיק?
back: "An entity deceives another by falsely denying responsibility for an act" — הפעולה קרתה באמת, והשקר מגיע **אחר כך**. הגורם המזיק אינו תוקף חיצוני אלא **הישות הלגיטימית עצמה**.
concepts:
  - Repudiation

## Card

front: מהי דוגמת הבנק ל-Repudiation?
back: User A שולח "Transfer USD 1,000,000", הבנק מבצע, וכעבור ימים הוא טוען "מעולם לא ביקשתי". אם הבנק שמר רק לוג טקסט שניתן לערוך — אין לו מה להציג. השאלה אינה "איך נמנע ממנו לשלוח" אלא "במה נסתור אותו?".
concepts:
  - Repudiation

## Card

front: מהי המיטיגציה של Repudiation?
back: **לוגים בלתי ניתנים לשינוי** (tamper-evident) שמתעדים כל פעולה, בתוספת **Non-Repudiation** — קשירה קריפטוגרפית של כל פעולה לזהות שביצעה אותה. לא בקרת גישה ולא הצפנה.
concepts:
  - Repudiation

## Card

front: ⚠ כיצד תוקף מבצע מתקפת Repudiation על קובצי הלוג? (2024, שאלה 18)
back: **שינוי סלקטיבי** של רשומות כדי להסתיר פעולות זדוניות — לא מחיקת כל הלוגים. מחיקה מלאה רועשת ומורגשת מיד; שינוי סלקטיבי משאיר מערכת שנראית תקינה ולוג שנראה שלם. הצורה הרועשת אינה בהכרח הנכונה.
concepts:
  - Repudiation

## Card

front: ארגון מיישם MFA וחותם דיגיטלית על כל הודעה. האם הוא מוגן מפני Repudiation?
back: לא בהכרח. MFA מונע התחזות וחתימה מונעת זיוף — אבל דחייה עוסקת בפעולה שהמשתמש האמיתי אכן ביצע. ההגנה ראייתית: לוגים tamper-evident, חותמות זמן, וקשירת פעולה לזהות. חתימה עוזרת רק אם נשמרת בלוג שאי אפשר לשנות בדיעבד.
concepts:
  - Repudiation
  - Multi-Factor Authentication (MFA)

## Card

front: מדוע Deception מקבלת High ב-Accountability, ולא רק ב-Integrity? (שקופית 69)
back: מפני ששלוש תת-ההתקפות פוגעות בשאלה "מי אחראי למה שקרה": בהתחזות הרישום שקרי, בזיוף הנתון המתועד אינו אמיתי, ובדחייה הישות מכחישה פעולה. הראיות שהמערכת מחזיקה אינן משקפות את מה שקרה באמת.
concepts:
  - Deception
  - Repudiation
