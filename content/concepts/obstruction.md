---
id: obstruction
title: Obstruction
slug: obstruction
aliases:
  - חסימה
  - חֲסימה
  - Obstruction
  - Volumetric Attack
  - Resource Exhaustion
tags:
  - attacks
  - rfc-2828
  - disruption
  - availability
related:
  - Disruption
  - Availability
  - DDoS
  - Incapacitation
  - Corruption
---

# Obstruction

:::definition
תת-התקפה של [[Disruption]] שבה התוקף **קוטע את אספקת שירותי המערכת על ידי הפרעה
לפעולתה**. בלשון המרצה: "interrupts delivery of system services by hindering
system operation".
:::

## הסבר פשוט

חסימה (Obstruction) היא הדרך השלישית להפיל שירות, והמפתיעה מבין השלוש:
**לא נוגעים במערכת בכלל**.

השרת תקין. הקוד תקין. הנתונים תקינים. אף רכיב לא הושבת ואף בייט לא שונה. פשוט
**אף אחד לא מצליח להגיע** — הצינור אל השירות סתום, או שכל משאב פנוי כבר תפוס.

זו הסיבה שהמרצה בוחר את המילה "hindering" (הכבדה, הפרעה) ולא "disabling"
(השבתה). המערכת חיה. השירות פשוט לא מגיע לאיש.

## הסבר טכני

המרצה מונה שלושה וקטורים (שקופית 53):

- **Volumetric Attacks** — "overload network bandwidth by sending massive amounts
  of data" — מציפים את רוחב הפס. הצינור מלא, ולכן תעבורה לגיטימית לא נכנסת.
- **Resource Exhaustion** — "depleting the resources of a system, such as CPU or
  memory" — מכלים משאבים. השרת רץ, אבל כל חוט (thread) וכל חיבור כבר תפוסים.
- **Lock Contention** — "multiple processes compete for the same resource,
  leading to delays and system crashes" — תחרות על נעילות. בסיס הנתונים נעול,
  והבקשות מצטברות בתור.

הפגיעה היא ב-[[Availability]] בלבד. וכאן המגבלה שהופכת את Obstruction לקשה
להגנה: היא **אינה מנצלת חולשה**. אין CVE לתקן ואין טלאי להתקין — יש רק קיבולת
סופית שאפשר למלא. לכן המיטיגציה שהמרצה מייעד לה אינה "תקן את הבאג" אלא
**Ratelimiting**: "Utilizing ratelimiting mechanisms can mitigate the impact of
DDoS attacks on legitimate user access" (שקופית 55).

:::example
המרצה נותן שני תרחישים (שקופית 54):

**DDoS on API Gateway for Web/Agent Backends** — botnet מציף את נקודות הקצה של
AUTH ו-GraphQL, מכלה חוטים וחיבורים ומבטל את ה-cache. זוהי הדוגמה הקנונית של
Obstruction: [[DDoS]] אינה מוחקת דבר ואינה משנה דבר — היא ממלאת את הצינור.

**Queue Backpressure in Big Data Stream** — זינוק פתאומי באירועים או צרכן איטי
ממלאים את המחיצות וחוסמים את היצרנים. התוצאה: עיכובי עיבוד והפרת SLA. אף רכיב
לא הושבת — התור פשוט לא מתרוקן.
:::

:::warning
**Obstruction אינה Incapacitation.** שתיהן פוגעות בזמינות, אבל דרך מנגנון שונה
לחלוטין (שקופית 46):

- ב-[[Incapacitation]] הרכיב **מושבת** — הוא מת, ולכן אינו מגיב.
- ב-**Obstruction** הרכיב **חי ובריא** — הוא מגיב מצוין, פשוט לא לכם.

מבחן מעשי: כבו את המתקפה. אם השירות חוזר מיד לאוויר בלי שחזור — זו הייתה
Obstruction. אם צריך לשחזר מגיבוי או להקים רכיב מחדש — זו הייתה Incapacitation.
:::

:::diagram
שרת בצד ימין, עם נורית ירוקה המסמנת "up · תקין". משמאל שני זרמים אל אותו שער
כניסה: זרם עבה ואדום של בקשות מ-botnet, וחץ דק ובודד של משתמש לגיטימי. השער
מלא לחלוטין בבקשות האדומות, והחץ של המשתמש הלגיטימי נעצר לפניו ואינו נכנס. ליד
השרת כיתוב: "אף בייט לא נמחק, אף בייט לא שונה — ואף אחד לא מגיע".
:::
