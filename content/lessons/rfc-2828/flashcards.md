---
id: rfc-2828-flashcards
lesson: rfc-2828
---

# כרטיסיות — ארבע משפחות האיום (RFC 2828)

## Card

front: לפי מה RFC 2828 ממיין התקפות?
back: לפי **התוצאה** — מה התוקף השיג בסוף. לא לפי הטכניקה, לא לפי הכלי ולא לפי רצף השלבים. אותה טכניקה בדיוק יכולה ליפול בשתי משפחות שונות אם התוצאה שונה.
concepts:
  - RFC 2828

## Card

front: מנו את ארבע משפחות האיום של RFC 2828 — באנגלית ובעברית של המרצה.
back: Unauthorized Disclosure (גִלוי) · Deception (הונָאָה) · Disruption (שיבוש) · Usurpation (תְפיסה בְּכֹח). ארבע משפחות, שתים-עשרה תת-התקפות — אין חמישית.
concepts:
  - RFC 2828
  - Unauthorized Disclosure
  - Deception
  - Disruption
  - Usurpation

## Card

front: מהן ארבע תת-ההתקפות של Unauthorized Disclosure (גִלוי)?
back: Exposure (חֲשיפה) · Interception (יירוט) · Inference (הסקה) · Intrusion (התערבות). המשפחה מאיימת על Confidentiality.
concepts:
  - Unauthorized Disclosure
  - Confidentiality

## Card

front: מהן שלוש תת-ההתקפות של Deception (הונָאָה)?
back: Masquerade (התחזות) · Falsification (זיוף) · Repudiation (דחייה). המשפחה מאיימת על שלמות המערכת או שלמות הנתונים.
concepts:
  - Deception
  - Integrity

## Card

front: מהן שלוש תת-ההתקפות של Disruption (שיבוש)?
back: Incapacitation (שלילת יכולת) · Corruption (השחתה) · Obstruction (חֲסימה). המשפחה מאיימת על זמינות **או** על שלמות המערכת.
concepts:
  - Disruption
  - Availability

## Card

front: מהן שתי תת-ההתקפות של Usurpation (תְפיסה בְּכֹח)?
back: Misappropriation (ניכוס פסול) ו-Misuse (שימוש לרעה). זו המשפחה היחידה עם שתיים בלבד, והיחידה שהמרצה מגדיר בתכונה אחת: שלמות המערכת.
concepts:
  - Usurpation
  - Misappropriation
  - Misuse

## Card

front: איך מבחינים בין Exposure ל-Interception?
back: לפי הכיוון. ב-Exposure המידע **יוצא** מהמערכת אל התוקף (bucket ציבורי, מייל לכתובת שגויה). ב-Interception התוקף **נכנס** לתוך הערוץ שבו המידע כבר זורם.
concepts:
  - Exposure
  - Interception

## Card

front: איך מבחינים בין Inference ל-Intrusion?
back: ב-Inference התוקף משתמש בגישה **מורשית לחלוטין** ורק מצליב נתונים. ב-Intrusion הוא **עוקף** בקרה. ההבחנה קובעת אילו מיטיגציות בכלל רלוונטיות.
concepts:
  - Inference
  - Intrusion

## Card

front: ⚠ האם הצפנה ו-VPN מגנות מפני Inference?
back: **לא.** הן פותרות Interception בלבד. ב-Inference הכול מוצפן כהלכה והתוקף פשוט משתמש בהרשאות שיש לו. המיטיגציה: צמצום חשיפת מטא-דאטה והגבלת שאילתות.
concepts:
  - Inference
  - Interception
  - Encryption

## Card

front: איך מבחינים בין Masquerade ל-Falsification?
back: לפי מה מזויף. ב-Masquerade מזויפת ה**ישות** — התוקף מזייף את מי ששלח. ב-Falsification מזויפים ה**נתונים** — מה שנשלח. אותו תוקף ואותו ערוץ, שתי תת-התקפות שונות.
concepts:
  - Masquerade
  - Falsification

## Card

front: מדוע Corruption אינה Falsification, אף ששתיהן משנות נתונים?
back: Corruption שייכת ל-Disruption ופוגעת בתפקוד המערכת. Falsification שייכת ל-Deception ומטרתה **להטעות ישות מורשית**. שאלו מה הייתה התוצאה: מערכת שלא מתפקדת, או ישות מורשית שהאמינה לשקר.
concepts:
  - Corruption
  - Falsification

## Card

front: מהי העמודה הרביעית שהמרצה מוסיף לטבלת המיפוי מעבר ל-CIA, ומדוע?
back: **Accountability** — היכולת לייחס פעולה לגורם שביצע אותה. היא נכנסת בגלל Repudiation: מי שמכחיש פעולה אינו פוגע בסודיות, בשלמות או בזמינות, אלא ביכולת להצביע על האחראי.
concepts:
  - Repudiation
  - CIA Triad

## Card

front: לאיזו תכונת אבטחה ממופה כל משפחה כ-High בטבלת המיפוי?
back: Unauthorized Disclosure → Confidentiality. Deception → Integrity. Disruption → Availability. Usurpation → Confidentiality. אך אף משפחה אינה פוגעת בתכונה אחת בלבד.
concepts:
  - RFC 2828
  - CIA Triad
