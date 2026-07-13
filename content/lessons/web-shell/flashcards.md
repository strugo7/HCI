---
id: web-shell-flashcards
lesson: web-shell
---

# כרטיסיות — Web Shell

## Card

front: מהו Web Shell?
back: סקריפט זדוני המועלה לשרת web ומעניק לתוקף שליטה מרחוק דרך ממשק web סטנדרטי (HTTP/HTTPS). זוהי דלת אחורית קבועה, לא נזק חד-פעמי.
concepts:
  - Web Shell

## Card

front: מהם שלושת המאפיינים המגדירים של Web Shell?
back: מבוסס סקריפט (PHP/ASP/JSP/Python), מוסתר בין הקבצים הלגיטימיים של השרת (Hidden in Plain Sight), ושליטה מרחוק (הרצת פקודות, ניהול קבצים, הוצאת מידע).
concepts:
  - Web Shell

## Card

front: במה שונה Web Shell מווירוס ומתולעת מבחינת המקום שבו הוא פועל?
back: וירוס ותולעת רצים על תחנת הקצה; Web Shell רץ על שרת ה-web של הארגון. הוא גם פסיבי — ממתין עד שהתוקף מפעיל אותו מרחוק, בלי צורך בפעולת משתמש.
concepts:
  - Web Shell

## Card

front: מהן ארבע דרכי ההשתלה של Web Shell?
back: העלאת קבצים ללא הגבלה (Unrestricted File Upload), ניצול חולשה (RFI/LFI, SQL injection, חולשות CMS), פרטי גישה גנובים (FTP/SSH/admin), ומתקפת שרשרת אספקה (תוספים וערכות עיצוב נגועים).
concepts:
  - Web Shell

## Card

front: מהי דרך ההשתלה הנפוצה ביותר, וכיצד מונעים אותה?
back: העלאת קבצים ללא אימות סוג הקובץ. מונעים באמצעות אימות בצד השרת (whitelist), סריקת תוכן, אחסון ההעלאות מחוץ ל-web root ושינוי שמות הקבצים.
concepts:
  - Web Shell

## Card

front: מהי היכולת המסוכנת ביותר של Web Shell לאחר ההשתלה?
back: תנועה רוחבית (Lateral Movement) — שימוש בשרת שנפרץ ב-DMZ כקרש קפיצה לסריקה ותקיפה של השרתים ברשת הפנימית.
concepts:
  - Web Shell
  - Lateral Movement

## Card

front: מדוע Web Shell המוסווה כקובץ לוג לגיטימי הוא הקשה ביותר לזיהוי?
back: מפני שהוא יושב במקום שבו קבצים נכתבים ממילא, נגיש דרך HTTPS על port 443 שאף חומת אש אינה חוסמת, ותעבורתו זהה לתעבורת web רגילה — מנקודת מבט הרשת שום דבר אינו נראה חריג.
concepts:
  - Web Shell

## Card

front: מדוע חומת אש היקפית ו-NIDS מתקשים לזהות Web Shell פעיל?
back: הפקודות עוברות כבקשות HTTP/HTTPS רגילות על port 443 שהשרת חייב לקבל, לעיתים מוצפנות. הפרימטר רואה תעבורה תקינה אל שרת שאמור לקבלה, ולא מבחין בחריגה.
concepts:
  - Web Shell

## Card

front: אילו סימני פשרה (IOC) מסגירים Web Shell?
back: קבצים חדשים או ששונו בספריות web, בקשות HTTP POST חריגות אל קבצים שנראים סטטיים, חיבורים יוצאים חריגים, ותהליך שרת web שמוליד cmd.exe או ‎/bin/sh‎.
concepts:
  - Web Shell

## Card

front: מהי הבקרה הישירה לזיהוי Web Shell שכבר יושב על השרת?
back: ניטור שלמות קבצים (File Integrity Monitoring, FIM) — התרעה על כל קובץ חדש או ששונה בספריות ה-web. הזיהוי הוא על השרת עצמו, לא בפרימטר.
concepts:
  - Web Shell

## Card

front: מדוע הגבלת התעבורה היוצאת מה-DMZ קריטית מול Web Shell?
back: כי היא מכילה את הפגיעה: אם שרת ה-web שנפרץ אינו יכול לפתוח חיבורים אל הרשת הפנימית, ה-Web Shell נותר כלוא בשרת בודד ולא מאפשר תנועה רוחבית.
concepts:
  - Web Shell
  - DMZ

## Card

front: מהו תפקיד ה-WAF בהגנה מפני Web Shell?
back: WAF חוסם בשער האפליקטיבי חתימות מוכרות של web shells, פרמטרים חשודים ו-payloads מקודדים — עוד לפני שהבקשה מגיעה לקובץ על השרת.
concepts:
  - Web Shell
  - WAF

## Card

front: מדוע הגנת פרימטר לבדה אינה מספיקה נגד Web Shell?
back: מפני שלא תופסים אותו בשער — הוא נגיש דרך HTTPS תקין. נדרשת הגנה לעומק: אימות העלאות, פיתוח מאובטח, הקשחת שרת, סגמנטציה, WAF וניטור שלמות קבצים על השרת.
concepts:
  - Web Shell
  - Defense in Depth
