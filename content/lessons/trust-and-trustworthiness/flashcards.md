---
id: trust-and-trustworthiness-flashcards
lesson: trust-and-trustworthiness
---

# כרטיסיות — מהימן מול ראוי-לאמון

## Card

front: מהו רכיב Trusted (מהימן)?
back: רכיב שאנחנו מוכרחים לסמוך עליו כדי שהמערכת תאכוף את מדיניות האבטחה שלה — קביעה על התלות, שנקבעת על ידי הארכיטקטורה. עשוי להכיל חולשות.
concepts:
  - Trusted

## Card

front: מהו רכיב Trustworthy (ראוי-לאמון)?
back: רכיב שיש לנו ראיות שהוא מאובטח וחופשי מפגמים הניתנים לניצול — אומת בבדיקות, הסמכה או attestation קריפטוגרפי.
concepts:
  - Trustworthy

## Card

front: על איזו שאלה עונה "Trusted" ועל איזו עונה "Trustworthy"?
back: Trusted עונה על "האם המערכת תלויה בו?"; Trustworthy עונה על "האם מגיע לו?" (האם יש ראיה שהוא מאובטח).
concepts:
  - Trusted
  - Trustworthy

## Card

front: מהו ה-Key Insight היחיד שהמרצה מסמן בשיעור זה?
back: רכיב יכול להיות trusted מבלי להיות trustworthy. היעד: להפוך כל רכיב trusted גם ל-trustworthy, או לצמצם את ה-TCB.
concepts:
  - Trusted
  - Trustworthy

## Card

front: מדוע רכיב trusted-אבל-לא-trustworthy הוא סיכון?
back: הוא Vulnerability סמויה — הסתמכנו עליו לחלוטין בלי ראיה שהוא מאובטח. כשהוא נופל, בהיותו trusted, הוא מפיל איתו את כל מה שנשען עליו.
concepts:
  - Trusted
  - Vulnerability

## Card

front: מהו Trusted Computing Base (TCB)?
back: אוסף כל הרכיבים שהמערכת מוכרחה להניח שהם תקינים כדי שההגנה תחזיק. ככל שה-TCB קטן יותר, כך פחות רכיבים שכשל באחד מהם מפיל את הכל.
concepts:
  - Trusted

## Card

front: אילו רכיבים מביא המרצה כדוגמאות ל-Trustworthy, ולמה?
back: TPM, HSM (מוסמך FIPS 140-3 או Common Criteria) ו-microkernel מאומת (seL4) — רכיבים שתוכננו במפורש להציג ראיה (הסמכה/אימות), לא רק לבקש אמון.
concepts:
  - Trustworthy

## Card

front: כיצד ההבחנה trusted/trustworthy מתחברת ל-CIA?
back: כל בקרות ה-CIA נאכפות על ידי רכיבים trusted (קרנל, שירות זיהוי, firmware). אם הם אינם trustworthy, שלוש התכונות נשענות על בסיס שלא הוכח — כאן CIA נאכף או נשבר.
concepts:
  - CIA
  - Trusted
