---
id: behavior-based-detection
title: Behavior-based Detection
slug: behavior-based-detection
aliases:
  - Anomaly-based
  - Anomaly detection
  - Behavior-based IDS
  - Anomaly-based IDS
  - זיהוי מבוסס התנהגות
  - זיהוי אנומליות
tags:
  - ids
  - detection
  - network-security
related:
  - Knowledge-based Detection
  - False Positive
  - False Negative
  - IDS
  - Insider Threat
---

# Behavior-based Detection

:::definition
שיטת זיהוי שבה ה-IDS לומד תחילה מהי התנהגות **נורמלית** של המערכת ושל המשתמשים
(baseline), ומתריע על כל **סטייה** ממנה. בניסוח המרצה: "Detect intrusion by
observing a **deviation from the normal** or expected behavior of the system or
the users". התכונה שלה היא היפוך מדויק של השיטה מבוססת החתימות:
**"High in completeness, but low accuracy"**.
:::

## הסבר פשוט

זיהוי מבוסס התנהגות (Behavior-based Detection, ידוע גם כ-Anomaly-based) אינו
מחזיק רשימת מבוקשים. הוא מחזיק תמונה של "איך נראה יום רגיל" — מי מתחבר, מאיפה,
מתי, כמה מידע עובר ולאן — וכל דבר שנראה **שונה** מעורר אצלו חשד.

זו הסיבה שהוא היחיד שמסוגל לתפוס תקיפה שאיש לא ראה לפניה. הוא אינו שואל "האם
ראיתי את זה קודם ברשימת התקיפות?" אלא "האם ראיתי את זה קודם **כאן, אצלנו**?".
שרת שמעולם לא דיבר עם חו"ל ופתאום שולח 40 ג'יגה החוצה בשתיים לפנות בוקר הוא
חריג — גם אם אין לאף אחד בעולם חתימה עבורו.

## הסבר טכני

התכונות שהמרצה מייחס לשיטה, בהיפוך מדויק לשיטת החתימות:

| תכונה | הניסוח של המרצה |
| --- | --- |
| שלמות | **High in completeness** — Helpful for unknown attacks |
| דיוק | **Low accuracy** — "higher [[False Positive]] if baseline is weak" |
| היכולת הייחודית | "Can detect attempts to exploit new and unforeseen vulnerabilities (**zero-day attacks**)" |
| שימוש נוסף | מועיל מול [[Insider Threat]] — עובד מורשה שמתנהג באופן חריג |

הנקודה הקריטית היא ה-**baseline**: איכות הזיהוי שווה בדיוק לאיכות תמונת ה"נורמלי".
וכאן טמון הכשל המובנה — "normal" בארגון עסקי **משתנה כל הזמן**: אפליקציה חדשה,
עומס עונתי, גיבוי לילי שהוזז, צוות שעבר לעבוד מחו"ל. כל שינוי לגיטימי כזה נראה
למערכת בדיוק כמו תקיפה, והיא מתריעה. זו אינה תקלה — זו המשמעות של "low accuracy".

המסקנה הארכיטקטונית: השיטה קונה כיסוי בכסף של רעש. מנוע הניתוח של [[IDS]] אמיתי
מריץ את שתי השיטות יחד — "Signature **and** anomaly logic" — בדיוק כדי שכל אחת
תכסה את החור של השנייה.

:::example
ארבעת אותות האנומליה שהמרצה מונה (שקופית 17):

- נפח exfiltration חריג בשעה 02:00 בלילה.
- שאילתות DNS ל-domains שמעולם לא נראו קודם.
- התחברות של service account ממדינה חדשה.
- פרוטוקול חדש בתוך סגמנט מוגבל.

לאף אחת מארבע ההתנהגויות אין חתימה. כולן נתפסות **רק** בגלל שהן חורגות מהנורמלי.
:::

:::warning
"מזהה zero-day" אינו "מזהה הכל בוודאות". השיטה מסמנת **חריגות**, ורוב החריגות
בארגון חי הן לגיטימיות לחלוטין. לכן מערכת מבוססת התנהגות עם baseline חלש מציפה
את ה-SOC בהתראות שווא — ומגיעה לנקודה שבה האנליסט מפסיק לקרוא אותן.
:::

:::diagram
גרף ציר-זמן. קו כחול רציף מייצג את ה-baseline של נפח התעבורה היומי, ומסביבו רצועה
אפורה מוצללת המסמנת את טווח ה"נורמלי". שלוש נקודות בולטות מחוץ לרצועה מסומנות
בכתום: אחת בשעה 02:00 (exfiltration), אחת בשם "new country login", ואחת בשם
"unseen domain". חץ צדדי מצביע על הרצועה עצמה עם הכיתוב: "'normal' changes often
— new apps, seasonal spikes", ומראה כיצד רצועה שהוגדרה צר מדי הופכת התנהגות
לגיטימית לאנומליה.
:::
