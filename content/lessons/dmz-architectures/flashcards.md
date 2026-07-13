---
id: dmz-architectures-flashcards
lesson: dmz-architectures
---

# כרטיסיות — ארכיטקטורות DMZ

## Card

front: מהי הטופולוגיה של Three-Legged DMZ (DMZ בחומת אש אחת)?
back: Firewall **אחד** עם 3+ ממשקים: רגל לאינטרנט, רגל ל-DMZ, רגל לרשת הפנימית המהימנה. כל התעבורה עוברת דרך מכשיר אחד.
concepts:
  - Three-Legged DMZ
  - Firewall

## Card

front: מהו החיסרון הקריטי של Three-Legged DMZ?
back: **Single Point of Failure (SPOF)**: "If firewall is compromised, attacker has direct path to all zones. **No defense in depth between DMZ and internal network.**" אותו מכשיר הוא גם השער וגם המחסום הפנימי.
concepts:
  - Three-Legged DMZ
  - Defense in Depth

## Card

front: PROS ו-CONS של Three-Legged DMZ (בלשון המרצה)?
back: PROS: Cost effective · Simple ops · Single policy. CONS: No redundancy · SPOF risk · Limited scale. כל יתרון הוא אותו חיסרון מזווית אחרת.
concepts:
  - Three-Legged DMZ

## Card

front: מהי הטופולוגיה של Screened Subnet (DMZ בשתי חומות אש)?
back: **שתי חומות אש בטור וה-DMZ ביניהן** — Outer Firewall (אינטרנט↔DMZ), DMZ, Inner Firewall (DMZ↔רשת פנימית). אין נתיב מהאינטרנט פנימה שאינו חוצה את שתיהן.
concepts:
  - Screened Subnet
  - DMZ

## Card

front: מדוע Screened Subnet מסומן ENTERPRISE STANDARD?
back: "Two firewalls provide **defense in depth**. Even if external firewall is compromised, **internal firewall protects core assets**." זהו Defense in Depth טהור: שכבה שממשיכה להגן גם אחרי שקודמתה כשלה.
concepts:
  - Screened Subnet
  - Defense in Depth
  - Internal Firewall

## Card

front: PROS ו-CONS של Screened Subnet (בלשון המרצה)?
back: PROS: Defense in depth · Vendor diversity · Better logging. CONS: **Higher cost · Complex ops · More latency**. מסיח שיטען שהיא זולה או פשוטה יותר — הפוך בדיוק.
concepts:
  - Screened Subnet

## Card

front: מהו Vendor Diversity, ולמה זה היתרון **המשמעותי** של Dual Firewall?
back: שתי חומות האש משני **ספקים שונים**: "A **zero-day** in one vendor won't compromise both layers." שתי חומות מאותו דגם חולקות אותו קוד ואותן חולשות — ואז שתי השכבות שוות לאחת. זו התשובה שנבחנה ב-2025.
concepts:
  - Screened Subnet
  - Defense in Depth

## Card

front: מנהל הציב שתי חומות אש זהות מאותו ספק בטור. במה הוא צודק ובמה טועה?
back: צודק בטופולוגיה — שתי נקודות חנק, שתי מערכות לוגים, מדיניות עצמאית, והגנה מטעות תצורה. טועה בעמידות — zero-day באותו דגם מפיל את שתיהן בבת אחת. המרצה מסמן "Single firewall vendor both layers" כחולשה.
concepts:
  - Screened Subnet

## Card

front: מה שתי חומות האש נותנות מעבר להגנה — ברמת התפעול?
back: **Audit trail at both choke points** (שתי נקודות חנק, שתי מערכות לוגים עצמאיות) ו-**Independent policy management** — כל חומה אוכפת מדיניות משלה. ב-Three-Legged שתי השאלות חיות באותה טבלת כללים.
concepts:
  - Screened Subnet
  - Three-Legged DMZ

## Card

front: מהם TRAFFIC FLOW RULES של Three-Tier DMZ?
back: Internet → Tier 1 only · Tier 1 → Tier 2 (specific ports) · Tier 2 → Tier 3 (DB ports only) · **No tier skipping allowed**.
concepts:
  - DMZ
  - Internal Firewall

## Card

front: מדוע "No tier skipping allowed" הוא הכלל שהכל נשען עליו?
back: בלי הכלל, פריצה ל-Tier 1 (השרת החשוף לאינטרנט) שווה לפריצה לנתונים ב-Tier 3. עם הכלל, התוקף נאלץ לפרוץ **שלוש** פעמים — וכל גבול הוא הזדמנות נוספת לזהות אותו.
concepts:
  - Internal Firewall
  - Defense in Depth

## Card

front: מה ה-Internal Firewall אוכף על תעבורה מה-DMZ פנימה?
back: **allow-list only, ללא "any-any"** · **No direct AD/DB access** (רק דרך brokered services) · **Strict egress** · לוגים ל-SIEM רק דרך Log Forwarder — "Never allow DMZ direct access to SIEM".
concepts:
  - Internal Firewall
  - DMZ

## Card

front: מדוע נדרש Internal Firewall **עמוק בתוך** הרשת המהימנה?
back: כי ההנחה ש"כל מה שבפנים מהימן" היא מה שמאפשר Lateral Movement — "To this day, this is the leading cause of breaches being so extensive and damaging." Flat DMZ ללא סגמנטציה = HIGH RISK.
concepts:
  - Internal Firewall
  - Lateral Movement

## Card

front: לפי מה מחליטים אם לפרוס Internal Firewall נוסף?
back: ניהול סיכונים: **הסיכון** (blast radius אם ה-DMZ ייפרץ) · **תקציב** · **מורכבות תפעול**. CISO Decision Framework: "Match architecture to risk appetite, regulatory requirements, and operational capabilities — **not just budget**."
concepts:
  - Internal Firewall
