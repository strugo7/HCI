---
id: intrusion
title: Intrusion
slug: intrusion
aliases:
  - התערבות
  - Intrusion
  - חדירה
tags:
  - rfc-2828
  - unauthorized-disclosure
  - confidentiality
  - access-control
related:
  - Unauthorized Disclosure
  - Confidentiality
  - Inference
  - MFA
  - Least Privilege
  - IDS
---

# Intrusion

:::definition
תת-התקפה של [[Unauthorized Disclosure]] שבה גורם לא מורשה **עוקף את מנגנוני
ההגנה של המערכת** כדי להגיע למידע רגיש ("An unauthorized entity circumvents
system's security protections").
:::

## הסבר פשוט

התערבות (Intrusion) היא מה שרוב האנשים מדמיינים כשהם שומעים "פריצה": יש בקרה
שאמורה לעצור את התוקף — סיסמה, הרשאה, שער כניסה — והתוקף **עובר אותה**. מכאן
ואילך הוא נמצא בתוך המערכת ורואה את מה שרק מורשים היו אמורים לראות.

ההבדל מכל שאר תתי-ההתקפות של הגילוי הוא נקודת הכשל: לא הערוץ נכשל (יירוט), לא
המשתמש שחרר מידע (חשיפה), ולא ההיגיון של השאילתות הסגיר סוד (הסקה) — **הבקרה
עצמה נעקפה**.

## הסבר טכני

המרצה מונה שלוש בעיות (שקופית 23):

- **Weak credentials** — סיסמאות חלשות או ברירת מחדל.
- **Exposed admin panels** — ממשקי ניהול חשופים לאינטרנט.
- **Unpatched services** — שירותים לא מעודכנים שנותרים פתוחים לניצול (Exploit).

בדיאגרמה שלו (שקופית 24) מוצגת רשת ארגונית מלאה — Engineering, Marketing,
Corporate network, Web server, Email server, Router, Internal firewall ו-External
firewall — ובתוכה תוקף שחדר. שני חיישני [[IDS]] מפיקים "Alert!". זהו הרעיון
המרכזי: **התערבות היא תת-ההתקפה היחידה מבין הארבע שמערכות ההתראה של הרשת
מתוכננות לתפוס**, כי היא היחידה שמייצרת פעולה חריגה מול בקרה.

המיטיגציה שהמרצה מייעד להתערבות היא **אימות רב-שלבי** — "Enforce multifactor
authentication to prevent unauthorized access" ([[MFA]], שקופית 26) — ולצידה
[[Least Privilege]] וסגירת נתיבי הגישה (שקופית 25).

:::example
תרחיש הענן של המרצה (שקופית 25): חשבון שירות (service account) בענן נפרץ, ודרכו
התוקף ניגש ל-Data Lake הארגוני. התרחיש המקביל ב-Web: מתקפת **SSRF** על
האפליקציה גורמת לה לפנות ל-metadata endpoint של הענן, לשלוף משם tokens זמניים,
ולקרוא באמצעותם את מאגר המודלים. בשני המקרים המנגנון זהה — בקרת גישה נעקפה.
:::

:::warning
Intrusion אינה [[Inference]]. בהתערבות התוקף **עוקף בקרה** — הוא עושה משהו שאסור
לו. בהסקה הוא משתמש בגישה **מורשית לחלוטין** ומסיק מהמותר את האסור. לכן חיזוק
בקרות הגישה עוצר התערבות, אך אינו עוצר הסקה.
:::

:::diagram
תרשים רשת ארגונית. משמאל ענן Internet, אחריו External firewall, אחריו אזור עם
Web server ו-Email server, אחריו Router ו-Internal firewall, ומימין הרשתות
הפנימיות: Engineering, Marketing, Corporate. דמות תוקף מחוברת אל הרשת הפנימית
דרך נתיב שעוקף את הבקרות. שני חיישני IDS ממוקמים על הקווים — אחד לפני ה-Internal
firewall ואחד בתוך הרשת הפנימית — ומכל אחד יוצאת תיבת "Alert!" אל תחנת ה-Administrator.
:::
