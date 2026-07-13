/**
 * Key Terms sidebar — matching the design's key terms panel.
 *
 * Shows concepts related to the lesson as small cards with title and description.
 */
import type { ReactNode } from 'react';

// Temporary mock definitions until we have a real concepts endpoint.
const MOCK_DEFINITIONS: Record<string, string> = {
  'cia': 'מודל משולש ההגנה, המסגרת הבסיסית לסיווג אירועי אבטחה.',
  'confidentiality': 'סודיות — הבטחה שרק מי שמורשה רשאי לגשת למידע, מבלי לשנותו.',
  'integrity': 'שלמות — הבטחה שהמידע אמין, מדויק, ולא שונה או זויף ללא הרשאה.',
  'availability': 'זמינות — הבטחה שהמערכת והמידע נגישים וזמינים למורשים כשהם זקוקים להם.',
  'encryption': 'הצפנה — מנגנון המגן על סודיות על ידי הפיכת המידע לבלתי קריא ללא מפתח.',
  'hashing': 'פונקציית גיבוב — כלי לזיהוי שינויים במידע, המסייע בשמירה על שלמות.',
  'authentication': 'אימות זהות — תהליך בדיקת זהותו של המבקש לגשת למערכת.',
  'authorization': 'הרשאה — קביעת הפעולות המותרות למשתמש לאחר שזהותו אומתה.',
  'ddos': 'מתקפת מניעת שירות מבוזרת — פגיעה בזמינות על ידי העמסת המערכת בבקשות רבות.',
};

interface LessonNotesProps {
  /** Concept slugs related to this lesson. */
  readonly concepts: readonly string[];
}

export function LessonNotes({ concepts }: LessonNotesProps): ReactNode {
  // Filter concepts to those we have mock definitions for, and limit to 4 to match design
  const displayConcepts = concepts
    .filter((c) => MOCK_DEFINITIONS[c.toLowerCase()])
    .slice(0, 4);

  if (displayConcepts.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-20 hidden w-64 shrink-0 lg:block">
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground text-end">
          מונחי מפתח
        </h3>
        
        <div className="flex flex-col gap-4">
          {displayConcepts.map((slug, index) => (
            <div key={slug} className="flex flex-col">
              {index > 0 && <hr className="mb-4 border-muted/50" />}
              <h4 className="mb-1.5 font-bold text-foreground capitalize">
                {slug}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {MOCK_DEFINITIONS[slug.toLowerCase()]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
