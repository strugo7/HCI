---
id: falsification
title: Falsification
slug: falsification
aliases:
  - זיוף
  - Falsification
  - Data Forgery
tags:
  - rfc-2828
  - deception
  - attack
related:
  - Deception
  - Masquerade
  - Integrity
  - Corruption
  - Interception
---

# Falsification

:::definition
זיוף (Falsification) הוא תת-התקפה של [[Deception]] שבה **נתונים כוזבים מטעים ישות
מורשית** — הנתונים ששונו או שהוזרקו נראים אמינים, והישות המורשית פועלת על פיהם
כאילו היו אמיתיים.
:::

## הסבר פשוט

זיוף עונה על השאלה: **האם מה שכתוב בהודעה נכון?**

כאן המערכת אינה טועה לגבי הזהות — ייתכן שהשולח הוא באמת מי שהוא טוען שהוא. הטעות
היא ב**תוכן**: מספר החשבון שונה, סכום ההעברה שונה, תשובת הכלי שהסוכן קיבל היא
המצאה.

הנזק אינו בכך שמישהו קרא את המידע, אלא בכך ש**מקבל ההחלטה פועל על סמך שקר** —
והמערכת מדווחת שהכל תקין.

## הסבר טכני

המרצה מונה שלושה וקטורים לזיוף (שקופית 35):

- **Data Manipulation** — שינוי נתונים קיימים כך שיטעו את מי שקורא אותם.
- **Identity Theft** — שימוש בפרטי זהות גנובים ליצירת רשומות ובקשות כוזבות.
- **Credential Forgery** — ייצור פרטי הזדהות או אסימונים מזויפים.

זיוף פוגע ישירות ב-[[Integrity]] — ולכן המיטיגציה שהמרצה מייעד לו אינה אימות זהות
אלא אימות **תוכן**: **Digital Signatures** ("Use digital signatures to verify data
integrity and authenticity", שקופית 42). חתימה דיגיטלית קושרת את הנתון לשולח שלו,
כך שכל שינוי בדרך שובר את החתימה.

:::example
תרחיש **Poisoned Prompt Tools** (שקופית 38): סוכן AI מושך תשובת כלי (tool output)
מ-endpoint שנפרץ. ה-JSON שחוזר בנוי כך שיורה לסוכן לייצא נתונים החוצה. הסוכן —
ישות מורשית לחלוטין — מבצע את הפעולה, כי הנתון שקיבל נראה לו תקין.
:::

:::warning
אל תבלבלו בין Falsification ל-**Corruption**. [[Corruption]] יושבת תחת
[[Disruption]] ומשנה **את פונקציות המערכת או את נתוניה** כדי לפגוע בה. Falsification
יושבת תחת [[Deception]] ומזינה נתונים כוזבים כדי **להטעות ישות מורשית** שתפעל
לפיהם. אותה פעולה טכנית, שתי מטרות שונות.
:::

:::diagram
שתי דיאגרמות זו לצד זו, מעל פס אופקי המסמן "Internet or other comms facility".

משמאל — Bob / Lily / John (שקופית 36): הודעה יוצאת מ-Lily, נעצרת אצל Bob, ויוצאת
ממנו אל John כשהיא שונה. תווית: "BOB MODIFIES THE MESSAGE AND SENDS IT TO JOHN".
שם השולח נשאר Lily.

מימין — Darth / Bob / Alice (שקופית 37): Bob שולח הודעה אל Alice; Darth יושב על
הערוץ ומשנה אותה בדרך. תווית: "Darth modifies message from Bob to Alice".

מתחת: הערה שהדיאגרמה הימנית זהה כמעט לחלוטין לדיאגרמת [[Interception]] (שקופית 16)
— שם Darth רק **קורא** את ההודעה, וכאן הוא **משנה** אותה. זה כל ההבדל, וזה כל
ההבדל בין פגיעה בסודיות לפגיעה בשלמות.
:::
