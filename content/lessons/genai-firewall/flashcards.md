---
id: genai-firewall-flashcards
lesson: genai-firewall
---

# כרטיסיות — AI Firewall

## Card

front: מה זו חומת אש ל-AI (AI Firewall)?
back: רכיב היושב בין המשתמש לאפליקציית ה-LLM, בשכבת App/API/model, ובודק את הפרומפט הנכנס ואת התשובה היוצאת.
concepts:
  - AI Firewall

## Card

front: מהי Request validation בחומת אש ל-AI?
back: בדיקת הפרומפט הנכנס למודל — הרצת כללים ובדיקות כדי לחסום תקיפות ופרומפטים לא רצויים.
concepts:
  - AI Firewall

## Card

front: מהי Response validation בחומת אש ל-AI?
back: בדיקת התשובה שהמודל מוציא — מניעת יציאת PII ותוכן מזיק מהאפליקציה.
concepts:
  - AI Firewall

## Card

front: מהו האיום המרכזי שחומת אש ל-AI מטפלת בו?
back: Prompt Injection — הזרקת הוראות זדוניות בשפה טבעית לתוך הפרומפט. לצידו: data leaks ו-model abuse.
concepts:
  - AI Firewall

## Card

front: למה חומת אש רשת רגילה עיוורת ל-Prompt Injection?
back: התקיפה נמצאת במשמעות הטקסט, לא במבנה התעבורה. עבור Firewall/NGFW זו בקשת HTTPS תקינה עם פורט ופרוטוקול חוקיים.
concepts:
  - AI Firewall
  - NGFW

## Card

front: איזו מקבילה מושגית יש בין Prompt Injection ל-Phishing?
back: שניהם שכנוע דרך טקסט לפעול נגד הכללים — Phishing על אדם, Prompt Injection על מודל. זו הנדסה חברתית של מודל.
concepts:
  - AI Firewall
  - Phishing

## Card

front: במה שונה AI Firewall מ-NGFW מבחינת תוכן נבדק?
back: AI Firewall בודק קלט/פלט בשפה טבעית; NGFW בודק מנות, פורטים, malware ידוע וכותרות פרוטוקול.
concepts:
  - AI Firewall
  - NGFW

## Card

front: באיזו שכבה נפרס כל אחד — AI Firewall מול NGFW?
back: AI Firewall בשכבת App/API/model; NGFW בפרימטר הרשת, בראוטרים ובקצוות VPN.
concepts:
  - AI Firewall
  - NGFW

## Card

front: מהו מסע שכבות חומות האש שחומת האש ל-AI משלימה?
back: Firewall בשכבה 3 (מנות) → WAF בשכבה 7 (תוכן HTTP) → AI Firewall בשכבת ה-AI (סמנטיקה של שפה טבעית).
concepts:
  - AI Firewall
  - Firewall
  - WAF

## Card

front: האם חומת אש ל-AI מחליפה את ה-NGFW ואת ה-WAF?
back: לא. היא שכבה נוספת מעליהם. ה-NGFW עדיין חוסם malware ו-DDoS, ה-WAF חוסם SQLi/XSS, וה-AI Firewall מטפל בכוונת השפה הטבעית.
concepts:
  - AI Firewall
  - WAF
  - NGFW

## Card

front: כמה שאלות מבחן היו על חומת אש ל-AI בשלוש שנות הקורס?
back: אפס. זהו סוג חומת האש החדש והפחות מגובש; לומדים אותו להבנת ההקשר וההבחנה מ-NGFW, לא כי צפויה עליו שאלה.
concepts:
  - AI Firewall
