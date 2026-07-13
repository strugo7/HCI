---
id: dropper-summary
lesson: dropper
title: סיכום — Dropper
---

:::summary
דרופר (Dropper) הוא נוזקה שכל תכליתה להעביר ולהתקין נוזקה אחרת — ה-payload — מעבר להגנות ואל מכונת הקורבן. הנקודה הקריטית, וזו שהמבחן בודק: הדרופר **אינו מזיק בעצמו**. הוא אינו מצפין, אינו גונב ואינו מאט — כל אלה פעולות של ה-payload שהוא מתקין (RAT, Keylogger, Rootkit או Ransomware). הדרופר מתמחה בכניסה; הנוזקה שהוא מוריד מתמחה בנזק.

מבחינים בין Single-Stage Dropper, שנושא את ה-payload בתוך הקוד ואינו זקוק לרשת, לבין Two-Stage Dropper (Downloader), שמוריד אותו משרת מרוחק. נתיב ההגעה מתחיל כמעט תמיד ב-spear phishing, ונמשך דרך קליק, הורדת הדרופר, התקנת ה-payload, C2 Beaconing ושליטה מרחוק — כאשר תפקיד הדרופר מסתיים כבר בשלב ההתקנה.

שש טכניקות התחמקות (Code Obfuscation, Fileless, Legitimate-Looking Wrappers, Sandbox Detection, Polymorphism, Staged Delivery) מביסות זיהוי מבוסס חתימות; רק זיהוי מבוסס התנהגות עשוי לתפוס דרופר חמקמק. ההגנה רב-שכבתית, ובראשה עומדת ההרשאה המינימלית (Least Privilege) — היחידה שמגבילה את הנזק גם כשהדרופר כבר רץ בהצלחה.
:::
