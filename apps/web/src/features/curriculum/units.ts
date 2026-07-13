import {
  Bug,
  Crosshair,
  Fingerprint,
  Radar,
  Server,
  Shield,
  ShieldCheck,
  Siren,
  Swords,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * The nine units of course 276206, mirroring content/curriculum.yaml.
 *
 * The order is the pedagogical order of the yaml, not the exam weight:
 * vocabulary first, then the attacker, and only then the defense. `examWeight`
 * is kept as metadata for revision priority — it never reorders anything.
 */
export interface CurriculumUnit {
  id: string;
  title: string;
  /** One line a student can read before deciding to open the unit. */
  description: string;
  /** The lecturer's deck this unit is drawn from. */
  source: string;
  lessonCount: number;
  /** Share of the exam, in percent. Zero means the topic was never examined. */
  examWeight: number;
  icon: LucideIcon;
}

export const CURRICULUM_UNITS: CurriculumUnit[] = [
  {
    id: 'foundations',
    title: 'יסודות — מרחב הסייבר ומשולש ההגנה',
    description:
      'אוצר המילים שכל השאר נשען עליו: ארבע שכבות מרחב הסייבר, משולש ה-CIA, קריפטוגרפיה ומונחי התקיפה.',
    source: 'מצגת 01 — Information Security Introduction',
    lessonCount: 6,
    examWeight: 6.7,
    icon: Shield,
  },
  {
    id: 'malware',
    title: 'נוזקות',
    description:
      'הכלי של התוקף, קונקרטי ומוחשי: וירוס, תולעת, כופרה, דרופר ו-Web Shell.',
    source: 'מצגת 02 — Malware',
    lessonCount: 6,
    examWeight: 11.7,
    icon: Bug,
  },
  {
    id: 'attack-anatomy',
    title: 'אנטומיית תקיפה — טקסונומיית RFC 2828',
    description:
      'מיון תקיפות למשפחות: גילוי, הונאה, שיבוש ותפיסה בכוח — ולצדם תקיפה אקטיבית מול פסיבית.',
    source: 'מצגת 03 — RFC 2828',
    lessonCount: 7,
    examWeight: 18.3,
    icon: Crosshair,
  },
  {
    id: 'applied-attack',
    title: 'תקיפה יישומית — MITRE ATT&CK',
    description:
      'הטקסונומיה בפעולה: סימולציית תקיפת Macro מקצה לקצה, והערכת מוצרי הגנה במסגרת MITRE.',
    source: 'תמלולי הרצאה (וידאו)',
    lessonCount: 3,
    examWeight: 0,
    icon: Swords,
  },
  {
    id: 'defense-principles',
    title: 'עקרונות ההגנה — ממודל הטירה עד חומת אש',
    description:
      'כאן מתהפך הצד: הגנה לעומק, חומת אש וטבלאות ACL בשכבה 3, ו-WAF ו-Proxy בשכבה 7.',
    source: 'מצגות 05 — FW · 07 — DMZ',
    lessonCount: 7,
    examWeight: 23.3,
    icon: ShieldCheck,
  },
  {
    id: 'identity-access',
    title: 'ניהול זהויות והרשאות',
    description:
      'ההגנה שאינה ברשת אלא בזהות: חמישה גורמי אימות, MFA, ומודלי הרשאות — RBAC, ABAC, MAC ו-DAC.',
    source: 'מצגת 08 — סיכום מאוחד + מקורות חיצוניים',
    lessonCount: 2,
    examWeight: 13.4,
    icon: Fingerprint,
  },
  {
    id: 'ids-ips',
    title: 'IDS, IPS ו-NGFW',
    description:
      'כשהחסימה לא הספיקה: זיהוי, התרעה וחסימה אקטיבית — ומחיר ההתראות השגויות (False Positive).',
    source: 'מצגת 06 — IDS',
    lessonCount: 3,
    examWeight: 16.7,
    icon: Radar,
  },
  {
    id: 'perimeter-dmz',
    title: 'אבטחה היקפית ו-DMZ',
    description:
      'השיא, ומרכיב את כל הכלים לארכיטקטורה אחת: אזורי אמון, מיקום שירותים וארכיטקטורות DMZ.',
    source: 'מצגת 07 — DMZ',
    lessonCount: 2,
    examWeight: 25,
    icon: Server,
  },
  {
    id: 'incident-response-unit',
    title: 'תגובה לאירועי אבטחה',
    description:
      'מה עושים אחרי שההתראה נדלקה: מחזור NIST בן ארבעת השלבים, PICERL, ו-SIEM/SOC/EDR.',
    source: 'מקורות חיצוניים רשמיים — NIST SP 800-61, SANS',
    lessonCount: 1,
    examWeight: 0,
    icon: Siren,
  },
];

export const COURSE = {
  code: '276206',
  title: 'אבטחת מידע ממוחשב לסייבר',
  unitCount: CURRICULUM_UNITS.length,
  lessonCount: CURRICULUM_UNITS.reduce((sum, unit) => sum + unit.lessonCount, 0),
  conceptCount: 75,
} as const;
