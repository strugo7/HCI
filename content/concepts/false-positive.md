---
id: false-positive
title: False Positive
slug: false-positive
aliases:
  - FP
  - Type I error
  - התראת שווא
  - התראות שווא
  - שגיאה מסוג I
  - חסימת שווא
tags:
  - ids
  - detection
  - network-security
related:
  - False Negative
  - Knowledge-based Detection
  - Behavior-based Detection
  - IDS
  - IPS
---

# False Positive

:::definition
תוצאה שבה **לא הייתה תקיפה**, אך ה-IDS העלה התראה. במטריצת הבלבול זהו התא
Intrusion = No · Alarm = Positive, והמרצה מכנה אותו גם **Type I error**:
"wrongly raised alarm".
:::

## הסבר פשוט

התראת שווא (False Positive) היא התראה שאין מאחוריה כלום. המערכת צעקה "תקיפה!",
האנליסט עצר את מה שעשה, פתח חקירה, בדק את הלוגים — ומצא גיבוי לגיטימי, סורק
רשת של מחלקת ה-IT, או עובד שהתחבר מחו"ל כי הוא בחופשה.

זו הטעות ה"זולה" לכאורה: שום דבר רע לא קרה. אבל היא זולה רק **פעם אחת**. במאה
פעמים ביום היא הופכת למחיר שהארגון משלם בשעות עבודה — ובסוף, בקשב.

## הסבר טכני

מקומו של ה-FP במטריצת הבלבול של המרצה:

| | Intrusion: Yes | Intrusion: No |
| --- | --- | --- |
| **Alarm: Positive** | **True Positive (TP)** — זיהוי נכון | **False Positive (FP)** — Type I error |
| **Alarm: Negative** | [[False Negative]] (FN) — Type II error | **True Negative (TN)** — אין תקיפה, אין התראה |

שני הסכומים שהמרצה נותן: `Σ Intrusions = TP + FN` ו-`Σ No-Intrusions = FP + TN`.

**מאיפה FP מגיע?** בעיקר מ-[[Behavior-based Detection]] עם baseline חלש: כל
התנהגות לגיטימית חדשה נראית כחריגה. גם חתימה רחבה מדי
ב-[[Knowledge-based Detection]] מייצרת FP, אך פחות — ולכן המרצה מייחס לה "often lower false
positives".

**מדוע FP הוא לא רק מטרד — אלא מייצר סיכון אמיתי:**

1. ב-[[IDS]]: זרם FP קבוע מוליד **Alert Fatigue**. אנליסט מותש מתחיל לסנן
   התראות בעצמו, ובשלב מסוים ההתראה האמיתית — ה-True Positive — נבלעת בערימה
   ולא מטופלת. **הצפה של התראות שווא מייצרת בפועל [[False Negative]] תפעולי.**
   בניסוח המרצה: "Too sensitive → alert fatigue → **ignored alerts**".
2. ב-[[IPS]]: ה-FP אינו התראה בלבד — הוא **חסימה**. "False positives can impact
   business"; "Blocking errors can cause outages". תעבורה עסקית לגיטימית נחתכת.
   זו הסיבה שהמרצה ממליץ להריץ IPS ב-detect-only mode תחילה.

:::example
מרכז ניטור סייבר בארגון פיננסי מתלונן שרוב ההתראות של ה-IDS החדש "אינן מצביעות
על האיום האמיתי". זהו התיאור המדויק של False Positive: התראה ללא תקיפה מאחוריה.
התוצאה אינה חדירה — התוצאה היא שצוות הניטור מתקשה להתמקד בתחקור אירועים אמיתיים.
:::

:::warning
אל תתבלבלו בין **מקור** הטעות לבין **סוג** הטעות. False Positive = הייתה התראה,
לא הייתה תקיפה. False Negative = הייתה תקיפה, לא הייתה התראה. "התראות שווא"
בעברית = **תמיד** False Positive, גם כשהתרחיש מדבר על נזק שנגרם בסופו של דבר.
:::

:::diagram
מטריצה 2×2. הצירים: אופקי — "Intrusion: Yes / No"; אנכי — "Alarm: Positive /
Negative". ארבעת התאים: TP (ירוק, "correct detection"), FP (כתום, "Type I error
— wrongly raised alarm"), FN (אדום, "Type II error — intrusion but no alarm"),
TN (ירוק, "no intrusion and no alarm"). מתחת למטריצה שתי משוואות:
Σ Intrusions = TP + FN, וגם Σ No-Intrusions = FP + TN. חץ מעגלי יוצא מתא ה-FP,
עובר דרך תיבה "Alert Fatigue", ומגיע לתא ה-FN — הלולאה שבה עודף התראות שווא
מייצר החמצות.
:::
