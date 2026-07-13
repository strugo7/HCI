---
id: corruption
title: Corruption
slug: corruption
aliases:
  - השחתה
  - Corruption
  - Data Poisoning
  - Supply-Chain Tampering
  - הרעלת נתונים
tags:
  - attacks
  - rfc-2828
  - disruption
  - integrity
related:
  - Disruption
  - Integrity
  - Incapacitation
  - Obstruction
  - Falsification
---

# Corruption

:::definition
תת-התקפה של [[Disruption]] שבה התוקף **משנה באופן מזיק את פונקציות המערכת או את
נתוניה**. בלשון המרצה: "adversely modifying system functions or data".
:::

## הסבר פשוט

השחתה (Corruption) היא הדרך הערמומית להפיל שירות: **לא מכבים אותו — מעוותים
אותו**.

השרת דולק. הוא עונה. הוא מחזיר תשובות בזמן סביר. מבחינת כל לוח מחוונים
שמודד זמינות — הכול ירוק. הבעיה היא שהתשובות עצמן שגויות, כי מה שהמערכת
**עושה** שונה ממה שהיא אמורה לעשות.

זה מה שהופך את Corruption למסוכנת במיוחד: היא לא מפעילה אזעקה. אין קריסה שמישהו
יבחין בה, ולכן היא יכולה לפעול חודשים.

## הסבר טכני

המרצה מונה שלושה וקטורים (שקופית 51):

- **Faulty Updates** — עדכון פגום או זדוני שנדחף לייצור ומשנה את התנהגות המערכת.
- **Unauthorized Writes** — כתיבה לא מורשית אל נתונים או אל קבצי תצורה.
- **Deserialization Bugs** — "Improper deserialization can lead to remote code
  execution and system compromise" — פירוק שגוי של אובייקט מסדרת מאפשר לתוקף
  להריץ קוד ולשנות את פעולת המערכת מבפנים.

Corruption היא הסיבה שהמרצה מגדיר את [[Disruption]] כאיום על **זמינות או
system integrity** (שקופית 46), ולא רק על זמינות. שתי האחיות שלה — [[Incapacitation]]
ו-[[Obstruction]] — פוגעות בזמינות. Corruption פוגעת ב-[[Integrity]] של המערכת
עצמה, ובכל זאת יושבת תחת Disruption, כי היא משבשת את אספקת השירות התקין.

:::example
המרצה נותן שני תרחישים (שקופית 52):

**Training Data Poisoning in LLM Pipeline** — דגימות זדוניות מוזרקות אל
ה-data lake. המודל נלמד עליהן ורוכש הטיה או התנהגות מבוקרת (trigger). התוצאה:
פגיעה בבטיחות ובדיוק, ו-backdoor שהתוקף יודע להפעיל. המודל **עובד** — הוא פשוט
עובד לטובת התוקף.

**Supply-Chain Tampering of Web NPM/PyPI Package** — חטיפה או typosquat של
תלות. ה-build מושך ספרייה עם דלת אחורית, והאפליקציה שנבנתה ממנה מושחתת. מיטיגציה
שהמרצה נוקב בה: lockfiles, **SBOM**, אימות חתימות ו-provenance (**SLSA**).
:::

:::warning
**Corruption אינה Falsification.** שתיהן כרוכות ב"נתונים שקריים", והמרצה מציב
אותן בשתי קטגוריות שונות:

- [[Falsification]] יושבת תחת **Deception** — נתונים כוזבים שמטרתם **להטעות ישות
  מורשית** (שקופית 30). הקורבן הוא **אדם או תהליך** שמקבל החלטה שגויה.
- **Corruption** יושבת תחת **Disruption** — שינוי מזיק של **פונקציות המערכת או
  נתוניה** (שקופית 46). הקורבן הוא **המערכת** עצמה, שמפסיקה לספק שירות תקין.

שאלו את עצמכם: מי בולע את השקר? אם זה משתמש — Falsification. אם זו המערכת —
Corruption.
:::

:::diagram
שני מסלולים מקבילים אל אותו שירות. במסלול העליון ("תקין") קוד ונתונים נקיים
זורמים מ-repository → build → production, והשירות מחזיר תשובה נכונה. במסלול
התחתון ("מושחת") התוקף מזריק תלות זדונית בשלב ה-build ודגימות מורעלות אל
ה-data lake. החץ אל production ממשיך לזרום באותה עוצמה — סימן שהשירות **חי**
— אך התשובה שיוצאת ממנו מסומנת באדום כשגויה. ליד השירות מד זמינות שמראה 100%.
:::
