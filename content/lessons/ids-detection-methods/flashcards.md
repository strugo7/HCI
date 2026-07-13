---
id: ids-detection-methods-flashcards
lesson: ids-detection-methods
---

# כרטיסיות — איך IDS מחליט, ולמה הוא טועה

## Card

front: אילו שתי שיטות זיהוי — ורק שתיים — עומדות לרשות IDS?
back: זיהוי מבוסס חתימות (Knowledge-based / Signature-based) וזיהוי מבוסס התנהגות (Behavior-based / Anomaly-based). זו הרשימה כולה.
concepts:
  - Knowledge-based Detection
  - Behavior-based Detection

## Card

front: השלם את הניסוח המדויק: Knowledge-based Detection היא ___ accuracy, ___ completeness.
back: **High accuracy, but low in completeness**. כשהיא מתריעה — היא צודקת; אבל היא רואה רק את מה שכבר תועד.
concepts:
  - Knowledge-based Detection

## Card

front: השלם את הניסוח המדויק: Behavior-based Detection היא ___ completeness, ___ accuracy.
back: **High in completeness, but low accuracy**. היא תופסת כמעט הכל — ומרעישה תוך כדי. זהו ההיפוך המדויק של Knowledge-based.
concepts:
  - Behavior-based Detection

## Card

front: על מה בדיוק מתריע זיהוי מבוסס התנהגות?
back: על **deviation from the normal** — סטייה מהתנהגות רגילה או צפויה של המערכת או המשתמשים. הוא לומד תחילה baseline של "normal", ומסמן חריגה ממנו.
concepts:
  - Behavior-based Detection

## Card

front: מדוע זיהוי מבוסס חתימות **אינו יכול** לתפוס zero-day? (הסיבה המבנית)
back: חתימה נכתבת רק **אחרי** שהתקיפה זוהתה ותועדה בעולם. תקיפה שאיש טרם ראה אינה יכולה, בהגדרה, להתאים לדפוס שנכתב בעבר. זו אינה תקלת מימוש ולא "מסד נתונים לא מעודכן" — גם מסד מעודכן לחלוטין לא יכיל חתימה לתקיפה שטרם התרחשה.
concepts:
  - Knowledge-based Detection

## Card

front: איזו שיטת זיהוי מסוגלת לתפוס zero-day, ומדוע דווקא היא?
back: **רק Behavior-based**. היא אינה שואלת "האם ראיתי את התקיפה הזו קודם?" אלא "האם ראיתי את ההתנהגות הזו קודם, כאן?" — ולכן נוזקה חדשה לגמרי שמתנהגת בחריגות תיתפס גם בלי שום חתימה בעולם.
concepts:
  - Behavior-based Detection

## Card

front: איזו משתי שיטות הזיהוי מייצרת **יותר** התראות שווא? (זהירות — מלכודת)
back: **Behavior-based** — היא זו עם ה-low accuracy: "higher false positives if baseline is weak". החתימות דווקא מאופיינות ב-"often lower false positives". מסיח שמציע לכבות חתימות ולהשאיר אנומליות "כדי להפחית התראות שווא" הופך את היוצרות.
concepts:
  - Behavior-based Detection
  - False Positive

## Card

front: מהו הכלל לפענוח כל תא במטריצת הבלבול, בלי להתבלבל?
back: קוראים שתי מילים בסדר קבוע: המילה **השנייה** (Positive/Negative) = **מה המערכת עשתה** — התריעה או שתקה. המילה **הראשונה** (True/False) = **האם צדקה**.
concepts:
  - False Positive
  - False Negative

## Card

front: מהו False Positive, ומה שמו החלופי?
back: **התראה בלי תקיפה** — המערכת התריעה (Positive) וטעתה (False). שמו החלופי: **Type I error**. "התראות שווא" הן תמיד FP.
concepts:
  - False Positive

## Card

front: מהו False Negative, ומה שמו החלופי?
back: **תקיפה בלי התראה** — המערכת שתקה (Negative) וטעתה (False). שמו החלופי: **Type II error**. זו הטעות ה**שקטה**: היא אינה מייצרת שום נתון ונראית בדיוק כמו שקט תקין.
concepts:
  - False Negative

## Card

front: מה עולה False Positive, ומה עולה False Negative?
back: FP עולה **שעת אנליסט** — מישהו רדף אחרי כלום. FN עולה **פריצה** — תוקף ששהה ברשת חודשים, זז לרוחב והדליף. אלה אינם מחירים באותו סדר גודל.
concepts:
  - False Positive
  - False Negative

## Card

front: מהי Alert Fatigue, ומהי השרשרת שמובילה אליה?
back: הנקודה שבה האנליסט, אחרי מאות התראות שווא, מפסיק לקרוא התראות ברצינות — הוא אינו עצלן, הוא מסתגל. בניסוח המרצה: **"Too sensitive → alert fatigue → ignored alerts"**.
concepts:
  - False Positive

## Card

front: מהו הקשר הסיבתי שבין שני סוגי הטעויות — ולמה "ליתר ביטחון נתריע יותר" היא מסקנה שגויה?
back: **הצפת False Positive מייצרת False Negative.** ההתראה ה-151 היא אמיתית (טכנית TP), אך היא נבלעת בערימה ואיש לא פותח אותה — והתוצאה בעולם זהה ל-FN: הייתה תקיפה, ואיש לא עצר אותה. מערכת רגישה מדי שוחקת את המשאב היחיד שיכול להגיב.
concepts:
  - False Positive
  - False Negative

## Card

front: מה בדיוק Tuning מחליף במה, והאם יש הגדרה עם אפס טעויות משני הסוגים?
back: זו **ידית אחת על סרגל אחד**: הידוק הסף מפחית FP ומגדיל FN; הרפייתו מפחיתה FN ומציפה ב-FP. **אין נקודה שבה שני המספרים אפס.** לכן Tuning אינו "תיקון באג" אלא החלטה עסקית — "Tune by asset criticality, then validate with testing & incidents"; המטרה: "increase precision without killing recall".
concepts:
  - False Positive
  - False Negative

## Card

front: מדוע False Positive ב-IPS מסוכן הרבה יותר מאשר ב-IDS?
back: ב-IDS ה-FP הוא **התראה** — עולה שעת אנליסט. ב-IPS ה-FP הוא **חסימה** של תעבורה לגיטימית: "Blocking errors can cause outages". אותה טעות בדיוק, מחיר אחר לגמרי — ולכן מריצים IPS ב-detect-only mode תחילה.
concepts:
  - False Positive
  - IPS
