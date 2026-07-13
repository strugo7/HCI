---
id: mitre-attack-analysis-flashcards
lesson: mitre-attack-analysis
---

# כרטיסיות — ניתוח תוצאות MITRE ATT&CK

## Card

front: מהן שלוש רמות הכיסוי האנליטי (Analytic Coverage) לפי מידת ה-Actionability?
back: General (משהו לא טוב קורה), Tactic (למה התוקף פועל), Technique (הטכניקה המדויקת).
concepts:
  - Analytic Coverage

## Card

front: איזו רמת כיסוי אנליטי היא האיכותית ביותר ומדוע?
back: רמת Technique — היא מצביעה על הטכניקה המדויקת ומאפשרת לאנליסט לדלג על החקירה ולעבור ישר לתגובה.
concepts:
  - Analytic Coverage

## Card

front: מה ההבדל בין רמת Tactic לרמת Technique?
back: Tactic אומרת *למה* התוקף פועל (למשל לבסס C&C) אך לא *איך*; Technique נותנת את הפעולה המדויקת.
concepts:
  - Analytic Coverage

## Card

front: על מה קובע גיוון מקורות המידע (Data Sources)?
back: על היקף הנראות. ככל שיש יותר מקורות, מצטמצמים ה"אזורים החשוכים" שבהם התוקף פועל בלי להתגלות.
concepts:
  - Data Sources

## Card

front: אילו שלושה סוגי מקורות מידע (Data Sources) שואפים לשלב, ומהיכן מגיע רובם כיום?
back: תחנות קצה (Endpoints), רשת (Network) וזהויות (Identity). כיום רוב המידע מגיע מתחנות הקצה.
concepts:
  - Data Sources

## Card

front: מדוע לא כל שלבי התקיפה נתפסים על תחנת הקצה?
back: כי חלק מהשלבים מתרחשים ברמת הרשת או ניהול הזהויות — לכן נדרש גיוון מקורות מידע (Data Sources).
concepts:
  - Data Sources

## Card

front: מהי האסימטריה בכיסוי מערכות ההפעלה שחושף דוח MITRE?
back: פתרונות רבים מצטיינים ב-Windows אך מציגים כיסוי דל ב-Linux, אף ש-Linux קריטי בשרתים, ב-Data Centers ובענן.
concepts:
  - MITRE ATT&CK

## Card

front: מדוע חובה לפרק ציון כיסוי כולל גבוה לפי מערכת הפעלה?
back: כי הציון הכולל יכול לנבוע מכיסוי מושלם ב-Windows שמסתיר כיסוי דל ב-Linux, ולהשאיר ארגון ענן חשוף כמעט לחלוטין.
concepts:
  - MITRE ATT&CK

## Card

front: מהן בקרות מפצות (Compensating Controls) בהקשר של פערי כיסוי?
back: בקרות זיהוי/הגנה נוספות שארגון שוקל כדי לכסות אזור חשוך שהמוצר מפספס — למשל בשרתי Linux.
concepts:
  - MITRE ATT&CK

## Card

front: מה בעצם בוחן מבחן המניעה (Protection) של MITRE?
back: לא זריקת נוזקה מוכרת, אלא חסימת רצף התנהגויות לגיטימיות לכאורה (RDP, קובץ מעורפל) שהקומבינציה שלהן מעידה על תקיפה.
concepts:
  - MITRE ATT&CK

## Card

front: מדוע חסימה מוקדמת ככל האפשר אינה בהכרח התוצאה הטובה ביותר?
back: חסימת הצעד הראשון (חיבור RDP לגיטימי) תעצור את התקיפה אך תשבית עבודה תקינה ותייצר התראות שווא (False Positive). המבחן הוא חסימה בזמן הנכון.
concepts:
  - False Positive

## Card

front: מהי התראת שווא (False Positive), ומדוע היא מדד מפתח במבחן המניעה?
back: זיהוי שגוי של פעילות תקינה כזדונית. מוצר טוב חוסם את הרצף המסוכן בלי לשבש משתמשים לגיטימיים ובלי להציף התראות שווא.
concepts:
  - False Positive

## Card

front: מה חושפים "שינויי תצורה" (Configuration Changes) בדוח?
back: האם המוצר הגיע להישגיו "מהקופסה" או שהיצרן נאלץ לשנות הגדרות רבות תוך כדי המבחן — מה שעלול להעיד על תפעול לא ריאלי.
concepts:
  - MITRE ATT&CK

## Card

front: מהם "גילויים מעוכבים" (Delayed Detections) ומדוע הם מסוכנים?
back: מקרים שבהם המערכת לא זיהתה אוטומטית ונדרשה התערבות אנושית. העיכוב הוא חלון זמן שבו התוקף יכול להגיע לאימפקט.
concepts:
  - Analytic Coverage
