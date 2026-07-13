---
id: defense-in-depth-flashcards
lesson: defense-in-depth
---

# כרטיסיות — הגנה לעומק (Defense in Depth)

## Card

front: מהי הגנה לעומק (Defense in Depth) במילים של המרצה?
back: "Multiple independent security controls. If one fails, others continue protecting. Layer network, host, and application defenses." (דק 07, שקופית 16)
concepts:
  - Defense in Depth

## Card

front: מהי המילה הקובעת בהגדרת הגנה לעומק — ולמה?
back: **Independent** (עצמאיות). שתי בקרות שנופלות מאותה חולשה אינן שתי שכבות אלא שכבה אחת שנספרה פעמיים.
concepts:
  - Defense in Depth

## Card

front: מהי ההנחה שעליה כל מודל ההגנה לעומק נשען?
back: שפריצה **תקרה** — היא מונחת כנתון, לא כתרחיש קיצון. השאלה אינה אם השכבה תיפול, אלא מה עומד מאחוריה כשזה יקרה.
concepts:
  - Defense in Depth

## Card

front: מה קורה כשיש רק פרימטר, ללא שכבות פנימיות?
back: "One breach = full access to crown jewels" — פריצה אחת פותחת את הכל, והתוקף נע חופשי ברשת (Lateral Movement).
concepts:
  - Perimeter
  - Lateral Movement

## Card

front: מנה את שבע שכבות מודל הבצל (דק 05, שקופית 2), מהליבה החוצה.
back: Data · Application · Host · Internal Network · Perimeter Network · Physical Facility · Users and Organization.
concepts:
  - Defense in Depth

## Card

front: מנה את שבע הקטגוריות בגלגל ה-Defense in Depth (דק 05, שקופית 3).
back: Data Protection (בליבה) · Perimeter Security · Network Security · Endpoint Security · Application Security · Policy Management · Monitoring & Response.
concepts:
  - Defense in Depth

## Card

front: מדוע Data Protection ממוקם בליבת הגלגל ולא Perimeter Security?
back: המידע הוא הנכס — כל שאר השכבות קיימות רק כדי להגן עליו. הפרימטר הוא השכבה החיצונית, כלומר הראשונה ליפול.
concepts:
  - Defense in Depth

## Card

front: מהו Control stack (דק 07, שקופית 24), ומה כותרתו?
back: "Think in layers: network + transport + application + identity + telemetry". שש שכבות: DDoS/CDN → Edge firewall/ACLs → Reverse proxy/LB → WAF/API gateway → IDS/IPS + EDR → Logging + SOAR.
concepts:
  - Defense in Depth

## Card

front: מהו Choke point ומהו Bypass path?
back: Choke point = מקום שבו הבקרה **רואה** את התעבורה. Bypass path = נתיב שעוקף את הבקרות (direct-to-origin, admin side doors). נתיב עקיפה אחד מבטל את כל הערימה.
concepts:
  - Defense in Depth

## Card

front: מדוע Three-Legged DMZ אינו הגנה לעומק, למרות שיש בו שלושה אזורים?
back: יש בו רכיב אכיפה **אחד**. המרצה: "No defense in depth between DMZ and internal network — if firewall is compromised, attacker has direct path to all zones". זהו Single Point of Failure.
concepts:
  - Three-Legged DMZ
  - Defense in Depth

## Card

front: מהו היתרון של Screened Subnet (Dual Firewall) במונחי הגנה לעומק?
back: "Even if external firewall is compromised, internal firewall protects core assets" — שתי בקרות עצמאיות בטור, ולכן נפילת החיצונית אינה פותחת את הפנים.
concepts:
  - Screened Subnet
  - Defense in Depth

## Card

front: מהו Vendor Diversity ולמה הוא חשוב?
back: שתי חומות אש מ**יצרנים שונים**, כדי ש-zero-day באחת לא יפיל את שתיהן ("A zero-day in one vendor won't compromise both layers"). זהו הביטוי הטהור של דרישת העצמאות.
concepts:
  - Screened Subnet
  - Defense in Depth

## Card

front: שכבה נפרצה והתוקף שולט בה. מדוע אין טעם להקשיח את הכללים **בתוכה**?
back: כי התוקף שולט ברכיב ויכול לשנות או לכבות כל הגדרה בו. רק בקרה **אחרת ועצמאית** מאחוריה יכולה להמשיך להגן — למשל Internal Firewall או IDS/IPS.
concepts:
  - Defense in Depth
  - Internal Firewall

## Card

front: הגנה לעומק דורשת גישה רב-שכבתית של שלושה דברים. מהם?
back: "Technology, **training**, and **policy**" (דק 02, שקופית 26). לא רק מוצרים — גם הכשרה וגם נוהל.
concepts:
  - Defense in Depth

## Card

front: מהו עקרון Fail Secure, ומה הקשר שלו להגנה לעומק?
back: "If a firewall fails, it **blocks** all traffic rather than allowing everything through". שכבה שנכשלת **פתוחה** אינה שכבה — היא דלת.
concepts:
  - Defense in Depth

## Card

front: ה-IDS זיהה את הנוזקה והתריע, אך ההתראה לא הגיעה לצוות הניטור. איזו שכבה כשלה?
back: **Monitoring & Response** — לא שכבת הזיהוי. ה-IDS עשה את תפקידו; מה שנשבר הוא סף ההסלמה וניתוב ההתראות. שכבה שאיש אינו קורא את הפלט שלה אינה מגינה על דבר.
concepts:
  - Defense in Depth
  - IDS
