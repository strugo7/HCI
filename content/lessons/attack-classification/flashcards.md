---
id: attack-classification-flashcards
lesson: attack-classification
---

# כרטיסיות — תקיפה אקטיבית מול פסיבית

## Card

front: מהן ארבע הסטיות מ-Normal Flow, ואיזה נכס כל אחת פוגעת בו?
back: Interruption (השבתה) → זמינות · Modification (שינוי) → שלמות · Interception (יירוט) → סודיות · Fabrication (זיוף) → אותנטיקציה/נאותות.
concepts:
  - Interception
  - Availability
  - Integrity
  - Confidentiality

## Card

front: מהו המבחן היחיד שמפריד תקיפה אקטיבית מפסיבית?
back: **האם משאבי המערכת הושפעו?** אם כן — Active Attack. אם לא — Passive Attack. זה הקריטריון היחיד.
concepts:
  - Active Attack
  - Passive Attack

## Card

front: מהי ההגדרה של Active Attack (בלשון המרצה)?
back: "the attacker attempts to **modify system resources or disrupt operations**" — התוקף משנה משאבים או משבש פעולה.
concepts:
  - Active Attack

## Card

front: מהי ההגדרה של Passive Attack (בלשון המרצה)?
back: "gathering information **without affecting system resources**" — איסוף מידע בלבד, למשל האזנה (eavesdropping), בלי להשפיע על משאבי המערכת.
concepts:
  - Passive Attack

## Card

front: שלושה דברים ש**אינם** המבחן לסיווג אקטיבי/פאסיבי — מה הם?
back: חומרת הנזק · מידת המאמץ והתחכום · המיקום ברשת. דליפת מאגר שלם יכולה להיות פאסיבית; בקשה מזויפת אחת היא אקטיבית.
concepts:
  - Active Attack
  - Passive Attack

## Card

front: תוקף Man in the middle יושב על הקו. מתי הוא פאסיבי ומתי אקטיבי?
back: אם הוא רק **קורא** — פאסיבי. אם הוא **משנה** הודעות לפני שהוא מעביר אותן — אקטיבי. המיקום זהה, הסיווג שונה.
concepts:
  - Passive Attack
  - Active Attack
  - Interception

## Card

front: מהי Hybrid Attack?
back: "combines elements of both active and passive attacks... **while remaining undetected**" — פעולה אקטיבית שנשארת מתחת לרדאר, לרוב אחרי שלב פאסיבי ארוך של לימוד המערכת.
concepts:
  - Active Attack
  - Passive Attack

## Card

front: מה ההבדל בין Interception ל-Interruption?
back: ב-Interception הזרימה **מגיעה ליעד**, והתוקף רק לוקח עותק (פגיעה בסודיות). ב-Interruption הזרימה **נעצרת** ואינה מגיעה (פגיעה בזמינות). דמיון השמות באנגלית הוא מקור חצי מהטעויות.
concepts:
  - Interception
  - Availability
  - Confidentiality

## Card

front: מה ההבדל בין Modification ל-Fabrication?
back: ב-Modification התוקף עובד על נתונים **קיימים**. ב-Fabrication הוא **יוצר** נתונים, אירועים או זהויות שלא התקיימו כלל, ומזריק אותם ליעד.
concepts:
  - Integrity
  - Active Attack

## Card

front: ⚠ מהי הסתירה בין שקופית 7 לשקופית 8 במצגת?
back: שקופית 8 מתייגת **Interruption = Passive threat** ו-**Interception = Active threat**. זה הפוך מההגדרה של המרצה עצמו בשקופית 7. שתי הגרסאות קיימות בחומר — הכירו את שתיהן.
concepts:
  - Passive Attack
  - Active Attack

## Card

front: איזו גרסה נכונה מקצועית — שקופית 7 או שקופית 8?
back: **שקופית 7 (ההגדרה).** יירוט טהור = פאסיבי; השבתה = אקטיבי. התיוג בשקופית 8 סותר את ההגדרה עצמה ואת המוסכמה המקצועית — כנראה הצמדת תוויות שגויה. מומלץ לבקש הבהרה מהמרצה.
concepts:
  - Passive Attack
  - Interception

## Card

front: מהי המלכודת הקבועה במבחן (נבחנה 3 פעמים), ואיך מפרקים אותה?
back: המסיחים מצמידים "פאסיבי" ל"שיבוש" ו"אקטיבי" ל"יירוט" — שני צירופים בלתי אפשריים. השיטה: **שלב 1** — מה קרה לזרימה (התעלמו מתוויות הסיווג). **שלב 2** — רק עכשיו: האם משאבי המערכת הושפעו? התשובה הנכונה היא זו ששני הצירים בה מתאימים.
concepts:
  - Active Attack
  - Passive Attack
