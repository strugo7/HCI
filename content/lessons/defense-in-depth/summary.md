---
id: defense-in-depth-summary
lesson: defense-in-depth
---

:::summary
[[Defense in Depth]] אינה עוד בקרה ברשימה — היא ההנחה שמתחת לרשימה כולה: **כל בקרה
תיכשל**, ותפקיד הארכיטקטורה הוא לוודא שכישלון אחד אינו כישלון הכל. המרצה מנסח זאת
כ-"Multiple **independent** security controls. If one fails, others continue
protecting", ומראה את הכשל של המודל הישן בשורה אחת: ב-[[Perimeter]] לבדו,
"One breach = full access to crown jewels".

השכבות מוצגות בשתי אינפוגרפיקות. מודל הבצל חותך לפי מיקום — Data בליבה, וסביבו
Application, Host, Internal Network, Perimeter Network, Physical Facility ו-Users
and Organization. גלגל ה-Defense in Depth חותך לפי תחום אחריות — **Data Protection**
בליבה, וסביבו **Perimeter Security**, **Network Security**, **Endpoint Security**,
**Application Security**, **Policy Management** ו-**Monitoring & Response**. שתי
השכבות החיצוניות בבצל ושתיים מהקטגוריות בגלגל אינן טכנולוגיה כלל: "Defense requires
a layered approach: technology, **training**, and **policy**".

המילה הקובעת היא **עצמאות**. שתי בקרות שנופלות מאותה חולשה אינן שתי שכבות — הן שכבה
אחת שנספרה פעמיים, וזה בדיוק ההיגיון שמאחורי **Vendor Diversity** ומאחורי ההבדל בין
[[Three-Legged DMZ]] ("No defense in depth between DMZ and internal network") לבין
[[Screened Subnet]] ("Even if external firewall is compromised, internal firewall
protects core assets"). מכאן גם שנתיב עקיפה יחיד מבטל ערימה שלמה: בקרה שאינה יושבת
ב-choke point ואינה רואה את התעבורה — אינה בקרה.

לכן המבחן על היחידה הזו לעולם אינו שואל "מהי הגנה לעומק". הוא שואל: **השכבה נפלה —
מה עוצר את התוקף עכשיו?**
:::
