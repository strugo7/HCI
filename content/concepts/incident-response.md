---
id: incident-response
title: Incident Response
slug: incident-response
aliases:
  - IR
  - Incident Response
  - Incident Handling
  - תגובה לאירועים
  - תגובה לאירועי אבטחה
  - טיפול באירוע
  - CSIRT
  - CERT
tags:
  - incident-response
  - operations
related:
  - SIEM
  - SOC
  - Digital Forensics
  - IDS
  - False Positive
---

# Incident Response

:::definition
התהליך המובנה שבו ארגון מזהה אירוע אבטחה שהתרחש, מנתח אותו, מגביל את התפשטותו,
מסלק את התוקף, מחזיר את השירות לפעולה ולומד מן האירוע כדי למנוע את הישנותו.
:::

## הסבר פשוט

Incident Response אינו כלי ואינו מוצר — הוא **תהליך**. הוא מתחיל בדיוק במקום
שבו ההגנה נכשלה: התוקף כבר בפנים, ההתראה כבר נדלקה, והשאלה אינה עוד "איך למנוע"
אלא "מה עושים עכשיו, ובאיזה סדר".

הסדר הוא כל העניין. ארגון שמנקה שרת נגוע לפני שבודד אותו — רק מאפשר לתוקף לחזור.
ארגון שמחזיר שירות לאוויר לפני שסילק את הדלת האחורית — נדבק שוב תוך יום.

## הסבר טכני

שתי מסגרות עבודה מתארות את אותו תהליך בחיתוך שונה:

- **NIST SP 800-61 Rev. 2** — ארבעה שלבים: Preparation · Detection & Analysis ·
  Containment, Eradication & Recovery · Post-Incident Activity.
- **SANS PICERL** — שישה שלבים: Preparation · Identification · Containment ·
  Eradication · Recovery · Lessons Learned.

ההבדל אינו מהותי אלא **חיתוכי**: SANS מפצל את השלב השלישי של NIST לשלושה שלבים
נפרדים. שתי המסגרות מסכימות שהתהליך **מחזורי** — מה שנלמד בסוף חוזר ומזין את
שלב ההכנה של האירוע הבא.

הצוות שמבצע את התהליך מכונה **CSIRT** (Computer Security Incident Response Team)
או **CERT**, והוא חוצה-ארגוני: אנליסטים, חוקרי [[Digital Forensics]], IT, ייעוץ
משפטי, דוברות והנהלה.

:::example
בבוקר יום ראשון מתריעה מערכת ה-[[IDS]] על תעבורה יוצאת מתחנת עבודה אל domain
שלא נראה מעולם. אנליסט ב-[[SOC]] מצליב את ההתראה עם לוגים ב-[[SIEM]] ומאשר: זהו
[[Command and Control]] של [[Dropper]] פעיל. מרגע זה זה כבר אינו "התראה" — זהו
אירוע (incident), ומופעל תהליך ה-Incident Response.
:::

:::warning
Incident Response אינו מתחיל כשמתגלה האירוע — הוא מתחיל **חודשים לפניו**. ארגון
שאין לו playbook כתוב, גיבויים שנבדקו ורשימת אנשי קשר מעודכנת, מגלה זאת בדיוק
בשעה הגרועה ביותר לגלות זאת.
:::

:::diagram
מעגל סגור בארבעה רבעים לפי NIST: Preparation (למעלה) ← Detection & Analysis
(ימין) ← Containment, Eradication & Recovery (למטה) ← Post-Incident Activity
(שמאל), וממנו חץ חוזר אל Preparation. מתחת לכל רבע, בשכבה פנימית, מופיע החיתוך
של SANS: Preparation · Identification · Containment + Eradication + Recovery ·
Lessons Learned — כך שרואים שהרבע השלישי של NIST מתפצל לשלושה בשקופית של SANS.
:::
