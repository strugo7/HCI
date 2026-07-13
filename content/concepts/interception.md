---
id: interception
title: Interception
slug: interception
aliases:
  - יירוט
  - האזנה
  - Interception
  - Man-in-the-Middle
  - Man in the Middle
  - MITM
  - MitM
  - Eavesdropping
  - Packet Sniffing
tags:
  - rfc-2828
  - unauthorized-disclosure
  - confidentiality
  - network-security
related:
  - Unauthorized Disclosure
  - Confidentiality
  - Exposure
  - Encryption
  - Passive Attack
  - Active Attack
---

# Interception

:::definition
תת-התקפה של [[Unauthorized Disclosure]] שבה גורם לא מורשה **ניגש ישירות למידע
רגיש בזמן מעבר** ("An unauthorized entity directly accesses sensitive data in
transit").
:::

## הסבר פשוט

ביירוט (Interception) התוקף אינו מחכה שהמידע ידלוף אליו — הוא **נכנס לתוך ערוץ
התקשורת** שבו המידע זורם. המידע ממשיך להגיע ליעדו, המערכת ממשיכה לעבוד, ואף אחד
לא מרגיש דבר. זו הפגיעה השקטה ביותר ב-[[Confidentiality]], וזו בדיוק הסיבה
שהיא מסוכנת.

הצורה המוכרת ביותר של יירוט היא **Man in the Middle (MITM)**: התוקף ממקם את
עצמו בין שני הצדדים, מנתק את החיבור המקורי, ופותח שני חיבורים חדשים — אחד לכל
צד. שניהם חושבים שהם מדברים זה עם זה; בפועל שניהם מדברים עם התוקף.

## הסבר טכני

המרצה מונה חמישה וקטורי יירוט (שקופית 15):

| וקטור | מה מאפשר את היירוט |
| --- | --- |
| **Open Wi-Fi** | רשת ציבורית לא מאובטחת — התעבורה גלויה לכל מי שבטווח |
| **Missing TLS** | ללא הצפנה, המידע עובר בטקסט גלוי |
| **Weak Ciphers** | אלגוריתמי הצפנה מיושנים שניתן לשבור |
| **HTTP Passwords** | פרוטוקול לא מאובטח חושף שמות משתמש וסיסמאות |
| **Packet Sniffing** | לכידת תעבורת רשת לא מוגנת וניתוחה |

שימו לב שכל החמישה מצביעים על אותו כשל: **הערוץ אינו מוגן**. מכאן שהמיטיגציה
שהמרצה מייעד ליירוט היא ישירה — "Use TLS encryption for securing data
transmission channels" (שקופית 26). [[Encryption]] של הערוץ הופכת את מה שהתוקף
לוכד לחסר ערך.

בדיאגרמות המרצה (שקופיות 16–17): Darth קורא את תוכן ההודעה שנשלחה מ-Bob
ל-Alice מעל "Internet or other comms facility"; ובדיאגרמת ה-MITM, החיבור המקורי
בין ה-User ל-Web Application מנותק (מסומן ב-X), וה-Perpetrator יוצר New
Connection לשני הצדדים.

:::example
תרחיש ה-LLM של המרצה (שקופית 18): שירות הרצת מודל שאין בו mTLS בין הרכיבים —
תוקף שמצליח להשתלב בין ה-client לבין ה-model server קורא את כל ה-prompts ואת כל
התשובות שעוברות. התרחיש המקביל בעולם ה-Web: האזנה לערוץ WebSocket של סוכן AI
בזמן אמת.
:::

:::warning
MITM אינו מושג נפרד מ-Interception — הוא **הצורה המובהקת שלו**. דיאגרמת ה-MITM
של המרצה (שקופית 17) יושבת בתוך בלוק ה-Interception. אל תסווגו MITM כ-Masquerade
רק מפני שהתוקף "מתחזה": כל עוד המטרה היא **לקרוא** את המידע העובר — זה יירוט,
והנכס שנפגע הוא סודיות.
:::

:::warning
⚠ **סתירה במצגת.** בשקופית 7 המרצה מגדיר [[Passive Attack]] כאיסוף מידע "without
affecting system resources" — הגדרה שמתאימה בדיוק ליירוט. אך בשקופית 8, כשהוא
מתייג את דיאגרמת ארבעת סוגי ההתקפות, הוא מסמן את **Interception כ-Active threat**
ואת Interruption כ-Passive — הפוך מהמוסכמה ומההגדרה שלו עצמו. זו ככל הנראה טעות
בהצמדת התוויות. דעו ששתי הגרסאות קיימות בחומר.
:::

:::diagram
תרשים בשתי שכבות. למעלה: Bob ו-Alice, וביניהם ענן המסומן "Internet or other
comms facility". חץ ישר מ-Bob ל-Alice מסמן את ההודעה. Darth יושב מעל הענן וחץ
מקווקו יורד ממנו אל הערוץ — הוא **קורא** את ההודעה, אך ההודעה ממשיכה ליעדה.
למטה, וריאנט ה-MITM: החיבור המקורי בין User ל-Web Application מסומן ב-X, ובמקומו
שני חיבורים חדשים — User ↔ Perpetrator ו-Perpetrator ↔ Web Application.
:::
