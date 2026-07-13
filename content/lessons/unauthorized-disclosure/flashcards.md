---
id: unauthorized-disclosure-flashcards
lesson: unauthorized-disclosure
---

# כרטיסיות — גִלוי (Unauthorized Disclosure)

## Card

front: מהן ארבע תת-ההתקפות של Unauthorized Disclosure, ומה משותף לכולן?
back: Exposure (חֲשיפה) · Interception (יירוט) · Inference (הסקה) · Intrusion (התערבות). כולן מסתיימות בפגיעה ב-Confidentiality — **התוצאה אינה מבדילה ביניהן, רק המנגנון**.
concepts:
  - Unauthorized Disclosure
  - Confidentiality

## Card

front: מהי ההגדרה של Exposure (חֲשיפה)?
back: "Sensitive data is directly released to an unauthorized entity" — המידע **משוחרר ישירות** לגורם לא מורשה. המידע יוצא; אף אחד לא נכנס. לעיתים קרובות אין תוקף כלל.
concepts:
  - Exposure

## Card

front: מהן שלוש הבעיות שהמרצה מונה תחת Exposure, ומהי המיטיגציה?
back: מיילים שנשלחו בטעות · דלי S3 ציבורי · לינקים משותפים ללא אימות. הכשל הוא **בתצורה או בהתנהגות**, לא בטכנולוגיה. המיטיגציה: **DLP** — סינון המידע היוצא.
concepts:
  - Exposure

## Card

front: מהי ההגדרה של Interception (יירוט), ומהי המיטיגציה?
back: התוקף **ניגש ישירות** למידע **בזמן מעבר** (in transit) — הוא נכנס לתוך הערוץ. וקטורים: Open Wi-Fi, Missing TLS, Weak Ciphers, HTTP Passwords, Packet Sniffing. המיטיגציה: **TLS**.
concepts:
  - Interception
  - Encryption

## Card

front: מהו היחס בין MITM ל-Interception?
back: MITM אינו התקפה נפרדת — הוא **הצורה המובהקת של Interception**. אל תסווגו אותו כהתחזות רק מפני שהתוקף "מתחזה": כל עוד המטרה היא **לקרוא**, זה יירוט והנכס שנפגע הוא סודיות.
concepts:
  - Interception
  - Masquerade

## Card

front: מהי ההגדרה של Inference (הסקה)?
back: "Deriving sensitive data from non-sensitive data" — התוקף ניגש למידע הרגיש **בעקיפין**: הוא גוזר אותו ממה שמותר לו לראות. בשום שלב לא נעשה דבר אסור.
concepts:
  - Inference

## Card

front: מהי דוגמת טבלת העובדים, ומדוע היא Inference?
back: שני views מותרים — (Position, Salary) ו-(Name, Department). אף אחד לא מקשר אדם למשכורת, אבל **צירוף** התוצאות מייצר טבלה נגזרת עם כולם יחד. התוקף לא עקף שום בקרה ולא ניגש לשדה אסור.
concepts:
  - Inference

## Card

front: ⚠ מדוע הצפנה ו-VPN אינן מגנות מפני Inference? (נבחן פעמיים ב-2024)
back: שתיהן מגנות על **הערוץ** ועל **הנתון המוגן** — ובהסקה התוקף אינו זקוק לאף אחד מהם. הוא עובד עם מטא-דאטה, שאילתות מותרות ודשבורדים, וכל אלה מגיעים אליו דרך חיבור מוצפן ולגיטימי.
concepts:
  - Inference
  - Encryption

## Card

front: אילו מיטיגציות כן עובדות נגד Inference?
back: רק אלה שמצמצמות את **מה שהמערכת מגלה**: הגבלת חשיפת מטא-דאטה, query auditing, מינימום גודל קבוצה בתשובות, differential privacy ו-k-anonymity/l-diversity.
concepts:
  - Inference

## Card

front: מהי ההגדרה של Intrusion (התערבות), ומהי המיטיגציה?
back: התוקף **עוקף את מנגנוני ההגנה** של המערכת ("circumvents system's security protections"). בעיות: Weak credentials, Exposed admin panels, Unpatched services. המיטיגציה: **MFA** ולצידה Least Privilege.
concepts:
  - Intrusion
  - Multi-Factor Authentication (MFA)
  - Least Privilege

## Card

front: מדוע Intrusion היא היחידה מבין הארבע שה-IDS בנוי לתפוס?
back: מפני שהיא היחידה שמייצרת פעולה חריגה **מול בקרה**. Exposure עוברת בנתיב לגיטימי, Interception קורה מחוץ לרשת שלכם, ו-Inference נראית כמו שימוש רגיל.
concepts:
  - Intrusion
  - IDS

## Card

front: אנליסט בעל הרשאה מלאה מריץ שאילתות אגרגטיביות מותרות ומשחזר מהן יתרות של לקוחות. Inference או Intrusion?
back: **Inference.** הוא השתמש בהרשאות שיש לו ולא עקף שום בקרה. המבחן המהיר: "האם התוקף עשה משהו שאסור לו?" — אם לא, זו הסקה, ובקרות גישה או MFA לא היו מונעות את האירוע.
concepts:
  - Inference
  - Intrusion

## Card

front: מהי טבלת המיטיגציה של ארבע תת-ההתקפות?
back: Exposure → **DLP**. Interception → **TLS**. Inference → **הגבלת חשיפת מטא-דאטה**. Intrusion → **MFA**. ארבעה מנגנונים שונים משמעם ארבע מיטיגציות שונות.
concepts:
  - Exposure
  - Interception
  - Inference
  - Intrusion

## Card

front: ⚠ מהי הסתירה בין שקופית 7 לשקופית 8 בעניין Interception?
back: שקופית 7 מגדירה Passive Attack כאיסוף מידע "מבלי להשפיע על משאבי המערכת" — הגדרה שמתארת יירוט. אך שקופית 8 מתייגת **Interception כ-Active** ו-Interruption כ-Passive. שתי הגרסאות בחומר.
concepts:
  - Interception
  - Passive Attack
  - Active Attack
