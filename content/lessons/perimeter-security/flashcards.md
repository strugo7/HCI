---
id: perimeter-security-flashcards
lesson: perimeter-security
---

# כרטיסיות — אבטחה היקפית: מודל הטירה והתפוררותו

## Card

front: כיצד המרצה מנסח את הרעיון שמוליד את הפרימטר, ומהי ההנחה שתחתיו?
back: "נקים חומה שתמנע נזק מבחוץ — פרימטר הגנתי". ההנחה שתחתיו היא מודל הטירה: "בפנים הכל בסדר, יש אויבים בחוץ" — כל מה שבצד הפנימי של החומה נחשב מהימן.
concepts:
  - Perimeter

## Card

front: מה קרה ל-Discoverability ול-Repercussions לאחר הקמת הפרימטר?
back: הם ירדו ל-LOW — אך **רק מצד האינטרנט**. בתוך הארגון הם נשארו HIGH. הפרימטר הקשה על ההגעה פנימה, אך לא הפך את הפנים לבטוח.
concepts:
  - Perimeter

## Card

front: מהם שבעת רכיבי שכבת הפרימטר, לפי סדר הצטברותם אצל המרצה?
back: Firewall → IDS → IPS → DLP → Email Gateway → SWG → VPN.
concepts:
  - Perimeter
  - Firewall
  - IDS
  - IPS

## Card

front: מהן שלוש הפונקציות של בקרות הפרימטר?
back: Ingress (פרסום שירותים החוצה בבטחה), Egress (בקרה על תעבורה יוצאת — SWG, DLP, DNS security), ו-Remote & partner access (VPN, ZTNA, MFA, Jump host).
concepts:
  - Perimeter

## Card

front: מהם שני הגבולות בארכיטקטורת פרימטר טיפוסית?
back: Perimeter Boundary — חומת האש החיצונית (אחרי ה-Border Router), המגנה על שכבת ה-Presentation. Internal Boundary — חומת אש שנייה, המגנה על ה-Middleware ועל שרתי הנתונים.
concepts:
  - Perimeter
  - Defense in Depth

## Card

front: מהי The Two-Party Fallacy?
back: ההנחה השגויה שיש רק שני צדדים — טובים בפנים, רעים בחוץ. התוקף אינו פורץ את החומה: הוא נכנס דרך שרת Web ב-DMZ ודרך שרת הדואר, ומשם ממשיך פנימה.
concepts:
  - Perimeter
  - Lateral Movement

## Card

front: מהי Lateral Movement (תנועה רוחבית)?
back: תנועה של תוקף בין רכיבים **בתוך** הרשת הפנימית, לאחר שכבר השיג דריסת רגל באחד מהם. נקראת גם east-west movement.
concepts:
  - Lateral Movement

## Card

front: מה ההבדל בין תעבורת north-south לתעבורת east-west מבחינת נראות?
back: north-south (ארגון↔אינטרנט) עוברת דרך הפרימטר ונבדקת. east-west (בין מערכות פנימיות) אינה חוצה את הגבול — ולכן אף בקרת פרימטר אינה רואה אותה.
concepts:
  - Lateral Movement
  - Perimeter

## Card

front: מה המרצה אומר על lateral / east-west movement?
back: "To this day, this is the leading cause of breaches being so extensive and damaging" — הסיבה המובילה לכך שפריצות הן כה נרחבות ומזיקות.
concepts:
  - Lateral Movement

## Card

front: אילו בקרות עוצרות תנועה רוחבית?
back: allow-list בלבד מה-DMZ פנימה (ללא any-any), איסור גישה ישירה ל-AD/DB מה-DMZ, Internal Firewall וסגמנטציה, IDS/IPS בין ה-DMZ לרשת הפנימית, ו-Least Privilege ללא credentials משותפים.
concepts:
  - Lateral Movement
  - Internal Firewall
  - Least Privilege

## Card

front: תוקף השתלט על חומת האש שמחברת את ה-DMZ החוצה. מה יעצור אותו מלהגיע לשרתי הליבה?
back: רק בקרה **שכבה אחת פנימה** — Internal Firewall, סגמנטציה ו-IDS/IPS מאחורי ה-DMZ. כל פתרון שמסתמך על אותה חומת אש שכבר נפרצה אינו בקרה.
concepts:
  - Internal Firewall
  - Defense in Depth

## Card

front: כמה זמן נעים תוקפים ברשת בממוצע לפני שמזהים אותם, לפי המרצה?
back: כ-300 ימים של תנועה רוחבית באין מפריע. ואם התוקף מנתק מגע אחרי כ-100 ימים — אף אחד אפילו לא יידע שהיה אירוע אבטחתי.
concepts:
  - Lateral Movement

## Card

front: מדוע VPN הוא גם בקרת פרימטר וגם סיכון?
back: הוא מאפשר למשתמש חיצוני "punch through the firewall" ולהתחבר לרשת הפנימית — וברגע שהוא "inside", החיבור מטופל כמהימן.
concepts:
  - Perimeter

## Card

front: מהם ארבעת גורמי השינוי שהחלישו את מודל הפרימטר?
back: מיגרציה לענן; משתמשים ניידים ו-IoT; רשתות ציבוריות והצפנת SSL; איומים מתוחכמים בכל הרמות — ותחתיו המרצה כותב "שיטת הפרימטר כבר לא רלוונטית".
concepts:
  - Perimeter

## Card

front: מהי ההשפעה המרכזית של מודל ה-Perimeter Security על תפיסת האבטחה הארגונית?
back: הוא יוצר אשליה של ביטחון מוחלט בתוך גבולות הארגון — ולכן הארגון מפסיק להשקיע בבקרות פנימיות.
concepts:
  - Perimeter

## Card

front: מהו "הפרימטר המבוזר החדש"?
back: משתמש / התקן / אפליקציה. הגבול אינו הרשת — כל משתמש, התקן ואפליקציה הפכו לנקודת כניסה בפני עצמה.
concepts:
  - Perimeter
