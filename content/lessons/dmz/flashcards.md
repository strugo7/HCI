---
id: dmz-flashcards
lesson: dmz
---

# כרטיסיות — אזור מפורז (DMZ)

## Card

front: מהו DMZ (Demilitarized Zone)?
back: מקטע רשת היושב בין הרשת הפנימית המהימנה לבין רשת חיצונית לא-מהימנה, ומספק שכבת אבטחה נוספת. הוא אזור אמון נפרד, בעל מדיניות מפורשת משלו.
concepts:
  - DMZ

## Card

front: מהם שני התפקידים של DMZ לפי המרצה?
back: Isolation — הפרדת השירותים הפונים לציבור מהמערכות הפנימיות. Control — סינון וניטור מפורטים של התעבורה.
concepts:
  - DMZ

## Card

front: מה מקור המונח DMZ, ומה המטאפורה מלמדת?
back: האזור המפורז הקוריאני — buffer בין טריטוריות עוינות שבו לאף צד אין שליטה מלאה. הלקח: ה-DMZ אינו אזור בטוח, אלא אזור שאין בו אמון — ולכן הוא נשלט.
concepts:
  - DMZ

## Card

front: מהם שלושת אזורי האמון במודל של המרצה?
back: Trust zone (הרשת הפנימית — שרתים, תחנות, DB) · DMZ zone (האזור החוצץ) · Untrust zone (האינטרנט, התוקף).
concepts:
  - DMZ

## Card

front: מהו הכלל המסכם למיקום שירות — ב-DMZ או פנימי?
back: "If it talks to the internet, it belongs in DMZ. If it holds crown jewels, it stays internal." — אם זה מדבר עם האינטרנט, מקומו ב-DMZ; אם הוא מחזיק תכשיטי כתר, הוא נשאר פנימי.
concepts:
  - DMZ

## Card

front: אילו שירותים שייכים ל-DMZ (BELONGS IN DMZ)?
back: Web servers (מאחורי Reverse Proxy) · Email gateways (MTA/MX) · External DNS (authoritative) · VPN concentrators · FTP/SFTP · API gateways · Load balancers · WAF appliances · Jump/Bastion hosts.
concepts:
  - DMZ

## Card

front: אילו שירותים נשארים פנימיים (KEEP INTERNAL)?
back: מסדי נתונים (כל הסוגים) · Active Directory / LDAP · Internal DNS resolvers · שרתי קבצים · Application servers · שרתי דואר פנימיים · SIEM ואוספי לוגים · מערכות גיבוי · מסופי ניהול.
concepts:
  - DMZ

## Card

front: External DNS או Internal DNS — מי מהם ב-DMZ?
back: External DNS (authoritative) — ב-DMZ, כי הוא עונה לשאילתות מהעולם. Internal DNS (resolver) — נשאר פנימי. אותה הבחנה קיימת בין Email gateway (ב-DMZ) לשרת דואר פנימי (פנימי).
concepts:
  - DMZ

## Card

front: מהו עקרון-העל של המדיניות בכל גבול?
back: Deny by default, permit by exception — ברירת המחדל היא חסימה, וכל חוק שמתיר תעבורה הוא חריג מנומק לשירות ולפורט מסוימים.
concepts:
  - DMZ

## Card

front: מה מותר לזרום מה-DMZ אל הרשת הפנימית?
back: allow-list בלבד — רק פורטי האפליקציה הנדרשים, ללא "any-any". אין גישה ישירה ל-Active Directory או למסד נתונים; משתמשים בשירותים מתווכים (brokered services).
concepts:
  - DMZ

## Card

front: מדוע חוק "outbound any-any" מה-DMZ הוא HIGH RISK?
back: כי שרת שנפרץ זקוק לתעבורה יוצאת לשני דברים: ערוץ אל שרת ה-C&C, וחילוץ המידע החוצה. חוק any-any נותן לו את שניהם. החלופה: egress control — allow-list של יעדים ופורטים מפורשים.
concepts:
  - DMZ

## Card

front: כיצד מגיעים לוגים משרתי DMZ אל ה-SIEM?
back: DMZ Hosts → Log Forwarder (בתוך ה-DMZ) → Firewall → SIEM (פנימי). הכלל המפורש: "Never allow DMZ direct access to SIEM."
concepts:
  - DMZ

## Card

front: מנה את תצורות ה-HIGH RISK ב-DMZ.
back: גישה ישירה ממסד נתונים · Outbound any-any · שרתי DMZ מחוברים לדומיין (domain-joined) · credentials משותפים בין DMZ לפנים · Flat DMZ ללא סגמנטציה · שירותים לא מעודכנים חשופים לאינטרנט.
concepts:
  - DMZ

## Card

front: מדוע שרת DMZ המחובר לדומיין (domain-joined) מסוכן במיוחד?
back: כי הוא מחזיק אישורי גישה תקפים מול ה-Active Directory. תוקף שפרץ אותו אינו צריך לפרוץ את ה-AD — הוא יורש גישה לגיטימית אליו, וזהו גשר ישיר ל-Lateral Movement.
concepts:
  - DMZ
  - Lateral Movement

## Card

front: מהם כללי זרימת התעבורה ב-Three-Tier DMZ?
back: Internet → Tier 1 בלבד · Tier 1 → Tier 2 (פורטים מוגדרים) · Tier 2 → Tier 3 (פורטי DB בלבד) · No tier skipping allowed — אסור לדלג על שכבה.
concepts:
  - DMZ

## Card

front: מהו The Two-Party Fallacy?
back: הכשל בהנחה "טובים בפנים, רעים בחוץ". התוקף אינו שובר את חומת האש — הוא פורץ לשרת Web או דואר שב-DMZ (שירות שפרסמנו בעצמנו), וממשיך משם אל מסדי הנתונים או אל משתמש פנימי.
concepts:
  - DMZ
  - Lateral Movement

## Card

front: האם DMZ מת בעולם של Zero Trust?
back: לא — הוא מתפתח. הם משלימים ולא מתחרים: ה-DMZ מצמצם את משטח התקיפה, ו-Zero Trust מקבל החלטת גישה בכל בקשה. DMZ עדיין נדרש לשירותים ציבוריים, ליישומי legacy ולדרישות רגולציה.
concepts:
  - DMZ

## Card

front: מהי הסתירה בין המצגות בנוגע ל-DMZ?
back: דק 05 (שקופית 7) מתאר DMZ כרשת "שאינה מוגנת בחומת אש". דק 07 — הדק שמלמד את הנושא — מציג אותו כאזור אמון נפרד ומוגן בחומת אש אחת או שתיים. אמצו את דק 07: ה-DMZ חשוף, אך אינו בלתי מוגן.
concepts:
  - DMZ
