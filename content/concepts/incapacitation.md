---
id: incapacitation
title: Incapacitation
slug: incapacitation
aliases:
  - שלילת יכולת
  - Incapacitation
  - השבתת רכיב
tags:
  - attacks
  - rfc-2828
  - disruption
  - availability
related:
  - Disruption
  - Availability
  - Obstruction
  - Corruption
  - Ransomware
---

# Incapacitation

:::definition
תת-התקפה של [[Disruption]] שבה התוקף מונע או קוטע את פעולת המערכת באמצעות
**השבתה של רכיב** מרכיביה. בלשון המרצה: "Prevent/interrupt system operation by
disabling a system component".
:::

## הסבר פשוט

שלילת יכולת (Incapacitation) היא הדרך הישירה ביותר להפיל שירות: **מוציאים רכיב
מכלל פעולה**. שרת שנמחק, דיסק שהוצפן, מכונה וירטואלית שנמחקה, חומרה ששרפה —
בכל המקרים האלה הרכיב עצמו כבר לא קיים או כבר לא מסוגל לתפקד.

זו ההבחנה שמפרידה אותה מהאחיות שלה במשפחה. ב-Incapacitation **הרכיב מת**. הוא
לא מגיב, לא מחשב ולא מחזיר תשובה — לא כי משהו חוסם אותו, אלא כי אין מה שיגיב.

## הסבר טכני

המרצה מונה שלושה וקטורים מרכזיים (שקופית 47):

- **malicious downloads** — הורדה של קוד זדוני שמשבית את הרכיב מבפנים. זהו הנתיב
  שדרכו מגיעה [[Ransomware]] אל השרת.
- **Destructive Commands** — פקודות הרסניות, למשל מחיקה של נפחי אחסון או של
  גיבויים. תוקף שהשיג הרשאות ניהול אינו חייב "לפרוץ" עוד — מספיקה לו פקודה אחת.
- **Hardware Failure** — כשל חומרה. שימו לב שהמרצה מכליל כאן גם כשל שאינו זדוני:
  הרכיב מושבת, ולכן התוצאה זהה.

הפגיעה העיקרית היא ב-[[Availability]]. אבל כאן נמצא הפער שסטודנטים מפספסים:
שלילת יכולת אינה דורשת עומס. תוקף שמצליח למחוק את נפח האחסון של בסיס הנתונים
משבית את השירות בפקודה אחת, בלי לשלוח ולו בקשה אחת מיותרת.

:::example
המרצה נותן שני תרחישים (שקופית 50):

**Ransomware on Cloud Orchestrator Nodes** — התוקף מגיע דרך Phishing אל תחנת
ניהול, ומצפין את מצב האשכול ואת גיבויי ה-etcd. התוצאה: השבתת שירות ועיכובי
שחזור. שרתי האפליקציה אולי עדיין דולקים — אבל הרכיב שמנהל אותם מת.

**Model Serving Capacity Exhaustion (Adversarial Load)** — עומס יריב שמכלה את
קיבולת ה-GPU של שירות ההסקה עד שהוא מפסיק לתפקד.
:::

:::warning
המרצה ממקם את [[Ransomware]] תחת Incapacitation (שקופית 50) — לא תחת
[[Corruption]]. ההיגיון: הכופרה **משביתה** את הרכיב (הקבצים בלתי שמישים,
השירות למטה), היא אינה משנה בשקט את מה שהמערכת עושה. המיטיגציה שהמרצה מייעד
ל-Incapacitation נגזרת ישירות מכך: "Implementing robust offline backups can help
recover from ransomware attacks" — גיבויים **offline**, כדי שהתוקף לא יצפין גם
אותם.
:::

:::diagram
שתי דיאגרמות מקבילות של המרצה. בראשונה (שקופית 48) Bob שולח שיטפון של בקשות
כוזבות אל שרת מרכזי, והשרת קורס — הכיתוב: "BOB OVERLOAD THE SERVER BY GIVING
FALSE REQUEST". בשנייה (שקופית 49) Darth יושב מעל "Internet or other comms
facility" ומנתק את השירות שהשרת מספק ל-Bob ול-Alice — הכיתוב: "Darth disrupts
service provided by server". בשני המקרים היעד הוא **הרכיב עצמו**, לא הערוץ
שמוביל אליו.
:::
