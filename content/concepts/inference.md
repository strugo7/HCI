---
id: inference
title: Inference
slug: inference
aliases:
  - הסקה
  - Inference
  - התקפת הסקה
  - Inference Attack
  - Membership Inference
  - Attribute Inference
tags:
  - rfc-2828
  - unauthorized-disclosure
  - confidentiality
  - privacy
related:
  - Unauthorized Disclosure
  - Confidentiality
  - Intrusion
  - Interception
  - Authorization
---

# Inference

:::definition
תת-התקפה של [[Unauthorized Disclosure]] שבה גורם לא מורשה ניגש למידע רגיש
**בעקיפין** — הוא גוזר אותו מנתונים שאינם רגישים ("deriving sensitive data from
non-sensitive data").
:::

## הסבר פשוט

הסקה (Inference) היא תת-ההתקפה שהכי קשה לתפוס, מפני שבשום שלב **לא נעשה דבר
אסור**. התוקף אינו נכנס לערוץ, אינו עוקף בקרה ואינו קורא את הנתון המוגן. הוא
מסתכל על מה שמותר לו לראות — ומרכיב מזה את מה שאסור לו לדעת.

זו הנקודה שהופכת את ההסקה למסוכנת: המערכת פועלת **בדיוק כפי שתוכננה**. כל
שאילתה חוקית, כל הרשאה תקינה, כל תשובה לגיטימית. הדליפה נמצאת בצירוף.

## הסבר טכני

המרצה מונה ארבעה וקטורים (שקופית 19):

- **Metadata Leak** — מטא-דאטה של קבצים חושפת מידע על אנשים.
- **Dashboard Risk** — דשבורדים גרנולריים מדי חושפים דפוסי התנהגות של משתמשים.
- **Query Leak** — **גודל** תוצאת השאילתה מלמד על גודל בסיס הנתונים ותוכנו.
- **Public Listings** — רשימות קורס פומביות ב-LinkedIn מאפשרות להסיק מי נכשל.

הדוגמה הקנונית שלו (שקופית 21) היא טבלת עובדים. שני ה-views מותרים: אחד מחזיר
(Position, Salary) ואחד מחזיר (Name, Department). אף אחד מהם אינו חושף משכורת של
אדם מזוהה — אבל **צירוף** תוצאות שתי השאילתות מייצר טבלה נגזרת עם
(Name, Position, Salary, Department), כלומר בדיוק את המשכורות שהמערכת התיימרה
להסתיר.

בדיאגרמה של שקופית 20 המרצה מסמן זאת במפורש: חץ **Authorized access** אל
ה-Non-sensitive data, ו-X על החץ **Unauthorized access** אל ה-Sensitive data.
התוקף אף פעם לא נוגע בנתון הרגיש.

המיטיגציות שהמרצה מייעד להסקה שייכות כולן למשפחה אחת — **צמצום מה שהמערכת
מגלה**: "Limit metadata exposure" (שקופית 26), ולצידן differential privacy,
k-anonymity/l-diversity, query auditing ו-minimum cohort sizes (שקופית 22).

:::example
Membership Inference על API של LLM (שקופית 22): התוקף שולח למודל prompts
מתוכננים ובוחן את דפוסי ה-confidence/logits בתשובות. הוא לעולם אינו רואה את
סט האימון — אבל מדפוס הביטחון של המודל הוא מסיק **האם רשומה מסוימת הייתה בו**.
זו הפרת פרטיות של משתתפי האימון, שנעשתה כולה דרך ממשק ציבורי ולגיטימי.
:::

:::warning
⚠ **המלכודת המרכזית של הנושא: הצפנה ו-VPN אינן מגנות מפני Inference.** שתיהן
מגנות על **הערוץ** ועל **הנתון המוגן** — והתוקף בהסקה אינו זקוק לאף אחד מהם. הוא
עובד עם מטא-דאטה, עם תוצאות שאילתות מותרות, עם דשבורדים ועם רשימות פומביות, וכל
אלה מגיעים אליו **דרך חיבור מוצפן ומאומת לגמרי**. [[Encryption]] מגנה מפני
[[Interception]], לא מפני הסקה.
:::

:::warning
Inference אינה [[Intrusion]]. בהסקה הגישה **מורשית** — התוקף משתמש בהרשאות שיש
לו. ב-Intrusion הוא **עוקף** את הבקרה. זו ההבחנה החדה ביותר בקטגוריית הגילוי,
ובקרות [[Authorization]] חזקות יותר לא יעצרו הסקה.
:::

:::diagram
תרשים משולש. בצד שמאל התוקף. באמצע שני מאגרים: "Non-sensitive data" למעלה
ו-"Sensitive data" למטה. מהתוקף אל המאגר העליון חץ ירוק מלא המסומן "Authorized
access". מהתוקף אל המאגר התחתון חץ אדום מקווקו החתוך ב-X ומסומן "Unauthorized
access — blocked". מהמאגר העליון יוצא חץ שלישי, מקווקו, שעוקף מלמעלה ומגיע אל
תיבה חדשה מימין: "Derived sensitive data" — התוצר של ההסקה.
:::
