---
id: micro-segmentation-flashcards
lesson: micro-segmentation
---

# כרטיסיות — מיקרו-סגמנטציה ו-Zero Trust

## Card

front: מהי "רשת שטוחה" (flat network) ומדוע היא הבעיה?
back: רשת שבתוך אזור פנימי כל מכונה יכולה לפנות לכל מכונה בלי בקרה. זו הבעיה: תוקף שהשיג דריסת רגל על שרת אחד נע ממנו בחופשיות לכל השאר (Lateral Movement).
concepts:
  - Micro-segmentation
  - Lateral Movement

## Card

front: מה ההבדל בין תעבורת North-South ל-East-West?
back: North-South חוצה את גבול הארגון (בין הרשת לאינטרנט) והפרימטר בודק אותה; East-West זורמת בין מערכות פנימיות ואיש היסטורית לא בדק אותה — והיא רוב התעבורה.
concepts:
  - East-West Traffic

## Card

front: מדוע חומת אש היקפית אינה רואה תעבורת east-west?
back: כי היא ממוקמת בגבול ורואה בהגדרה רק תעבורה שחוצה אותו. שני שרתים פנימיים המדברים ביניהם אינם חוצים שום גבול, ולכן התעבורה כלל אינה מגיעה לנקודת האכיפה.
concepts:
  - East-West Traffic
  - Firewall

## Card

front: מה ההבדל בין סגמנטציה קלאסית (VLAN) למיקרו-סגמנטציה?
back: סגמנטציה מחלקת לאזורים גסים שבתוכם התקשורת חופשית; מיקרו-סגמנטציה מקטינה את האזור לנכס בודד ואוכפת כלל מפורש לכל זרימה, קרוב לעומס העבודה. Cisco: "לפי אזורים" מול "לפי זהות ותכלית".
concepts:
  - Micro-segmentation

## Card

front: מהי מיקרו-סגמנטציה (Micro-segmentation)?
back: שיטת אבטחה האוכפת מדיניות גישה ברמת עומס העבודה הבודד (workload). כל זרימה מותרת רק אם יש לה כלל מפורש, והאכיפה קרובה לנכס ולא בנקודת חנק היקפית.
concepts:
  - Micro-segmentation

## Card

front: מהן שלוש דרכי האכיפה של מיקרו-סגמנטציה?
back: Agent-based (סוכן על עומס העבודה), Network-based (מתגים, NGFW, SDN) ו-Native cloud (Security Groups של ספק הענן).
concepts:
  - Micro-segmentation

## Card

front: מהי הסיסמה של Zero Trust, ומה משמעותה הטכנית?
back: "never trust, always verify". מיקום ברשת אינו מקנה אמון — כל בקשת גישה נבדקת מחדש לכל session. מסורתי: "Perimeter = trust boundary"; Zero Trust: "Every request = verification".
concepts:
  - Zero Trust

## Card

front: מהו התקן הרשמי של Zero Trust, ומה הוא מניח על הרשת?
back: NIST SP 800-207 (Zero Trust Architecture). הוא מניח שהרשת עצמה כבר נחשבת compromised — כלומר שהתוקף כבר בפנים — ולכן כל בקשה נבדקת מחדש.
concepts:
  - Zero Trust

## Card

front: מהו "implicit trust zone" לפי NIST, ומה הכלל לגביו?
back: אזור שבו כל מה שמעבר לנקודת האכיפה האחרונה נחשב מהימן (כמו אזור השערים בשדה תעופה). הכלל: הוא חייב להיות קטן ככל האפשר, כדי לקרב את האכיפה למשאב.
concepts:
  - Zero Trust

## Card

front: מהם שלושת רכיבי ה-ZTA לפי NIST?
back: Policy Engine (PE) — מחליט לאשר/לדחות; Policy Administrator (PA) — פותח וסוגר את נתיב התקשורת; Policy Enforcement Point (PEP) — נקודת האכיפה שדרכה עוברת כל בקשה למשאב.
concepts:
  - Zero Trust

## Card

front: כיצד מיקרו-סגמנטציה קשורה ל-Zero Trust?
back: NIST מונה אותה כאחת משלוש הגישות למימוש ZTA — כל משאב מאחורי רכיב שער שמתפקד כ-PEP. היא הזרוע הרשתית של Zero Trust.
concepts:
  - Micro-segmentation
  - Zero Trust

## Card

front: מהו blast radius, ומדוע צמצומו הוא המטרה?
back: היקף המערכות שתוקף מגיע אליהן מנקודת חדירה אחת. מיקרו-סגמנטציה אינה מנסה למנוע חדירה אלא להבטיח שפריצה לשרת אחד תישאר שרת אחד (מטאפורת התאים האטומים בצוללת).
concepts:
  - Micro-segmentation

## Card

front: מהו הסיכון התפעולי המרכזי של מיקרו-סגמנטציה?
back: מדיניות שגויה מפילה ייצור — כלל חסר בין שני שירותים לגיטימיים נראה כמו תקיפה, והזרימה נחסמת. לכן חובה visibility (מיפוי זרימות) לפני אכיפה.
concepts:
  - Micro-segmentation

## Card

front: באיזה מובן מיקרו-סגמנטציה היא Least Privilege?
back: היא מיישמת "הרשאה מינימלית" על זרימות רשת: כל עומס עבודה מדבר רק עם מה שנדרש לתפקודו. במקום "מה משתמש רשאי לעשות" — "עם מי שרת רשאי לדבר".
concepts:
  - Micro-segmentation
  - Least Privilege

## Card

front: האם Zero Trust מבטל את ה-DMZ ואת הפרימטר?
back: לא. המרצה: "Is DMZ dead in a Zero Trust world? NO, IT'S EVOLVING". הם "complements, not competitors" — Zero Trust מרחיב את ה-DMZ (כל סגמנט הופך ל-micro-DMZ), לא מחליפו.
concepts:
  - Zero Trust
  - DMZ
