---
id: attack-terminology-flashcards
lesson: attack-terminology
---

# כרטיסיות — אוצר המילים של תוקף

## Card

front: מהי שרשרת הסיכון על ארבע חוליותיה?
back: Vulnerability → Threat → Attack → Compromise. חולשה (מצב) → איום (פוטנציאל) → תקיפה (פעולה) → פשרה (התוצאה שאחרי תקיפה מוצלחת).
concepts:
  - Vulnerability

## Card

front: מהי חולשה (Vulnerability), והאם היא דורשת שמישהו ינצל אותה כדי להתקיים?
back: נקודת תורפה במערכת — בתכנון, בקוד, בתצורה או בהתנהגות אנושית. היא מצב הקיים בין אם נוצל ובין אם לא, כמו דלת שנשארה לא נעולה.
concepts:
  - Vulnerability

## Card

front: מהם ששת סוגי החולשות שהמרצה מונה?
back: Software Bugs, Misconfigurations, Design Flaws, Human Factors, Supply Chain, Zero-Day.
concepts:
  - Vulnerability

## Card

front: מהו ההבדל בין Attack Surface ל-Attack Vector?
back: משטח = איפה אפשר לנסות (כלל נקודות החשיפה, רחב). וקטור = איך תוקפים בפועל (הנתיב היחיד שנבחר, צר).
concepts:
  - Attack Surface
  - Attack Vector

## Card

front: מהו כלל הזיכרון של המרצה למשטח מול וקטור, ומה סדר הפעולה של התוקף?
back: "Surface = where you can try. Vector = how you try in practice." התוקף קודם ממפה את המשטח, ואז בוחר וקטור מתאים.
concepts:
  - Attack Surface
  - Attack Vector

## Card

front: כיצד שונה ההגנה על המשטח מההגנה על הווקטור?
back: את המשטח מצמצמים (סוגרים פורטים, מסירים שירותים, Least Privilege). את הווקטור חוסמים (סינון דוא"ל, ולידציית קלט, patching).
concepts:
  - Attack Surface
  - Attack Vector

## Card

front: מהם ארבעת משטחי-המשנה של משטח התקיפה?
back: Network Surface, Application Surface, Human Surface, Physical Surface.
concepts:
  - Attack Surface

## Card

front: באנלוגיית הבניין — מהו המשטח ומהו הווקטור?
back: המשטח הוא כל הדלתות והחלונות של הבניין; הווקטור הוא הדלת הספציפית שהפורץ בחר לפרוץ דרכה.
concepts:
  - Attack Surface
  - Attack Vector

## Card

front: מהו דיוג (Phishing), ומדוע הוא הווקטור הנפוץ ביותר?
back: מסר מטעה המתחזה לגורם לגיטימי כדי לגרום לקורבן למסור אישורים או להתקין נוזקה. נפוץ כי הוא תוקף את האדם (Human Surface) ועוקף שכבות הגנה טכניות.
concepts:
  - Phishing

## Card

front: כיצד דיוג בזמן אמת (Real-Time Phishing) עוקף MFA?
back: אתר מזויף מבקש את הסיסמה, מעביר אותה מיד לאתר האמיתי, מבקש גם את קוד האימות שהגיע, ומשתמש בו בשניות לפני שיפוג. גורם שני מבוסס SMS/OTP נופל כך.
concepts:
  - Phishing
  - MFA

## Card

front: מהו Compromise, וכיצד מזהים אותו?
back: המצב שאחרי תקיפה מוצלחת, שבו מדיניות האבטחה הופרה. מזהים דרך Indicators of Compromise (IoC) — למשל תעבורה יוצאת חריגה או סוכני EDR שהושבתו.
concepts:
  - Attack Vector

## Card

front: האם חסימת וקטור תקיפה אחד מצמצמת את משטח התקיפה?
back: לא. שאר נקודות החשיפה נשארות, והתוקף יכול לבחור וקטור אחר. צמצום משטח וחסימת וקטור הן פעולות שונות ומשלימות.
concepts:
  - Attack Surface
  - Attack Vector
