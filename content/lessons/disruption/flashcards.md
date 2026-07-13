---
id: disruption-flashcards
lesson: disruption
---

# כרטיסיות — שיבוש (Disruption)

## Card

front: מהי ההגדרה של Disruption (שיבוש), ועל איזה נכס היא מאיימת?
back: "A threat to availability **or system integrity**" (שקופית 46). שלוש תת-התקפות: Incapacitation, Corruption, Obstruction — לא זמינות בלבד.
concepts:
  - Disruption
  - Availability
  - Integrity

## Card

front: מהן שלוש תת-ההתקפות של Disruption, בסדר שנשאל במבחן 2023?
back: **שלילת יכולת · השחתה · חֲסימה** — Incapacitation, Corruption, Obstruction. שם כל אחת הוא תשובה לשאלה "מה בדיוק נשבר?".
concepts:
  - Disruption
  - Incapacitation
  - Corruption
  - Obstruction

## Card

front: מהי ההגדרה של Incapacitation (שלילת יכולת)?
back: "Prevent/interrupt system operation by **disabling a system component**" — מוציאים רכיב מכלל פעולה. הרכיב לא עמוס ולא איטי — הוא פשוט **מת**, ואין מה שיענה.
concepts:
  - Incapacitation

## Card

front: מהם שלושת הווקטורים של Incapacitation?
back: malicious downloads · Destructive Commands · **Hardware Failure**. השורה השלישית כוללת כשל חומרה שאינו זדוני כלל — כי מה שקובע הוא שהרכיב הושבת, לא מי השבית אותו.
concepts:
  - Incapacitation

## Card

front: תחת איזו תת-התקפה ממקם המרצה את Ransomware, ומה המיטיגציה?
back: תחת **Incapacitation** (שקופית 50) — הכופרה **משביתה**, לא משנה בשקט ולא ממלאת צינור. המיטיגציה: גיבויים **offline**, כי גיבוי מחובר לרשת מוצפן גם הוא.
concepts:
  - Ransomware
  - Incapacitation

## Card

front: מהי ההגדרה של Corruption (השחתה)?
back: "**Adversely modifying** system functions or data" — הרכיב **חי, עונה מהר, לוח המחוונים ירוק** — אבל התשובות עצמן שגויות, כי מה שהמערכת עושה כבר לא זהה למה שהיא אמורה לעשות.
concepts:
  - Corruption

## Card

front: מהם הווקטורים והתרחישים המודרניים של Corruption?
back: וקטורים: Faulty Updates · Unauthorized Writes · Deserialization Bugs. תרחישים: Training Data Poisoning ו-Supply-Chain Tampering. משותף: הפגיעה נכנסת **בשלב הבנייה או האימון** — כשהשירות עולה, הוא כבר מושחת.
concepts:
  - Corruption

## Card

front: ⚠ איך מבחינים בין Corruption ל-Falsification? (שתיהן "נתונים שקריים")
back: לפי **מי הקורבן של השקר**. Corruption (Disruption) — **המערכת** מפסיקה לספק שירות תקין. Falsification (Deception) — **ישות מורשית** מקבלת החלטה שגויה. אותה מילה בעברית, שתי קטגוריות, שתי תגובות.
concepts:
  - Corruption
  - Falsification

## Card

front: מהי ההגדרה של Obstruction (חֲסימה)?
back: "Interrupts delivery of system services by **hindering** system operation". השרת, הקוד והנתונים תקינים — אף רכיב לא הושבת ואף בייט לא שונה. **פשוט אף אחד לא מצליח להגיע.**
concepts:
  - Obstruction

## Card

front: מהם שלושת הווקטורים של Obstruction?
back: Volumetric Attacks (רוחב פס) · Resource Exhaustion (CPU/זיכרון/חוטים) · Lock Contention (נעילות בבסיס הנתונים). המיטיגציה: **Ratelimiting**.
concepts:
  - Obstruction

## Card

front: מהו היחס בין DDoS ל-Obstruction?
back: DDoS היא **הדוגמה הקנונית של חסימה — ורק שלה**. היא לא מוחקת דבר, לא משנה דבר ולא נוגעת בשום רכיב — היא ממלאת את הצינור. "שיבוש = DDoS" מחמיץ שני שלישים מהקטגוריה.
concepts:
  - DDoS
  - Obstruction

## Card

front: מהו המבחן המעשי שמפריד בין Obstruction ל-Incapacitation?
back: כבו את המתקפה. אם השירות חוזר **מיד, בלי שחזור** — Obstruction (הרכיב היה חי, רק חסום). אם צריך **לשחזר מגיבוי או להקים רכיב מחדש** — Incapacitation (הרכיב מת).
concepts:
  - Obstruction
  - Incapacitation

## Card

front: מדוע Obstruction קשה להגנה במיוחד, בהשוואה לניצול חולשת תוכנה?
back: מפני שהיא **אינה מנצלת חולשה כלל** — אין CVE לסגור ואין טלאי. היא מנצלת את הקיבולת הסופית של המערכת: צינור בגודל מסוים שאפשר למלא, וחוטים שאפשר לתפוס. לכן המיטיגציה היא Ratelimiting.
concepts:
  - Obstruction

## Card

front: ⚠ מהו המתח בין שקופית 46 לשקופית 69 בעניין Integrity של Disruption?
back: שקופית 46 מגדירה איום על "availability **or system integrity**", אך שקופית 69 נותנת Integrity = Low. היישוב: רק Corruption פוגע בשלמות, ושתי האחיות פוגעות בזמינות — Low הוא **ממוצע הקטגוריה**. שתי הגרסאות בחומר.
concepts:
  - Disruption
  - Corruption
  - Integrity
