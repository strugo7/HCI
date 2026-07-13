---
id: trustworthy
title: Trustworthy
slug: trustworthy
aliases:
  - ראוי-לאמון
  - ראוי לאמון
  - Trustworthy
  - Trustworthy component
  - רכיב ראוי לאמון
tags:
  - fundamentals
  - trust
related:
  - Trusted
  - CIA
  - Vulnerability
---

# Trustworthy

:::definition
רכיב שיש לנו **ראיות** להאמין שהוא מאובטח וחופשי מפגמים הניתנים לניצול
("A component we have evidence to believe is secure and free from exploitable
flaws"). בניגוד ל[[Trusted]], המעמד הזה אינו נובע מהתלות בו אלא **מבוסס אימות**:
בדיקות, הסמכה, או attestation קריפטוגרפי.
:::

## הסבר פשוט

רכיב ראוי-לאמון (Trustworthy) הוא רכיב ש**הרווח את האמון** — לא כי המערכת נשענת
עליו, אלא כי מישהו בדק אותו והוכיח שמגיע לו. ההבדל מ-[[Trusted]] הוא ההבדל בין
"אני מוכרח לסמוך עליך" ל"יש לי סיבה טובה לסמוך עליך".

המטרה של מהנדס אבטחה היא לצמצם את הפער: להפוך כל רכיב שאנחנו מוכרחים לסמוך עליו
(trusted) לרכיב שגם מגיע לו האמון (trustworthy).

## הסבר טכני

trustworthiness נמדדת בראיות, לא בהצהרות. הראיות מגיעות משלושה מקורות: בדיקות
ואודיטים, הסמכות פורמליות, ו-attestation חומרתי. שלושת הרכיבים שהמרצה מביא
כדוגמה נבנו במפורש כדי להיות trustworthy: **TPM** (Trusted Platform Module)
ו-**HSM** (Hardware Security Module) — רכיבי חומרה ייעודיים שעברו הסמכות כמו
**FIPS 140-3** או **Common Criteria** — וכן microkernel שאומת פורמלית (seL4).

הקשר ל-**Trusted Computing Base (TCB)** ישיר: אם כל רכיב ב-TCB הוא trustworthy,
הבסיס שכל [[CIA]] נשען עליו מגובה בראיות. רכיב trusted שאינו trustworthy הוא
ההפך — [[Vulnerability]] סמויה שממתינה.

:::example
שני HSM-ים אוכפים את אותה מדיניות. הראשון "עובד" אך לא נבדק חיצונית; השני עבר
הסמכת FIPS 140-3 — נבדק, נבחן ואושר מול תקן. שניהם trusted (המערכת נשענת על
שניהם), אך רק השני trustworthy: יש עליו ראיות.
:::

:::warning
הסמכה אינה ערובה נצחית. trustworthiness היא טענה מבוססת-ראיות בנקודת זמן; חולשה
חדשה או תצורה שגויה עלולות לשחוק אותה. הראיות מקטינות את הסיכון — הן אינן
מאפסות אותו.
:::
