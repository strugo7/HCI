---
id: worm-summary
lesson: worm
---

:::summary
[[Worm]] היא נוזקה אוטונומית שאינה זקוקה לתוכנית מארחת (host program) וקיימת
כתוכנית עצמאית (‎.exe‎). כל השיעור נשען על משפט אחד שהמרצה חוזר עליו שלוש פעמים:
**"Unlike a virus, a worm does not need a host program."** ממנו נגזר הכל — אין
מארח, ולכן אין צורך בפעולת משתמש; אין צורך במשתמש, ולכן ההתפשטות עצמאית; והתפשטות
עצמאית פירושה מהירות והיקף מסדר גודל אחר מווירוס.

בניגוד ל[[Virus]], שמתפשט רק כאשר משתמש פותח קובץ מארח, התולעת מנצלת חולשות
במערכת ההפעלה וביישומי הרשת ומעתיקה את עצמה ממחשב למחשב בעצמה. בתוך הארגון זו
תנועה east-west — [[Lateral Movement]] — שהפרימטר אינו רואה, ולכן חומת אש בגבול
אינה עוצרת תולעת שכבר בפנים.

ארבעת מאפייני המרצה: Self-Propagation, Resource Exploitation, Data Exfiltration
ו-Network Disruption. הפגיעה האופיינית היא ב[[Availability]] — התולעת "מאטה
תקשורת", מכלה משאבים ומציפה רוחב פס. לזכירת טבלת ההשוואה מספיק לזכור שורה אחת —
**Host Dependency** — ולגזור ממנה את Propagation, Activation ו-Speed. דוגמאות:
WannaCry, Conficker, SQL Slammer (תולעים) מול ILOVEYOU, Melissa, CIH (וירוסים).
:::
