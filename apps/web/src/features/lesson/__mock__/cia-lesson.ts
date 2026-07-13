/**
 * Mock CIA lesson data — a hand-built Lesson knowledge object that mirrors
 * content/lessons/cia/lesson.md. Used to develop and test the lesson template
 * until the parser is operational.
 *
 * ⚠ This file will be DELETED once the parser can produce Lesson objects
 *   from the markdown source. It exists solely to give the template real
 *   data to render during development.
 */
import type { Lesson } from '@cyberatlas/core';

export const CIA_LESSON_MOCK: Lesson = {
  id: 'cia',
  type: 'lesson',
  frontmatter: {
    id: 'cia',
    title: 'משולש ההגנה — CIA',
    lessonNumber: 2,
    course: 'computer-security',
    category: 'יסודות',
    difficulty: 'easy',
    estimatedTime: 30,
    tags: ['cia', 'fundamentals', 'security-model'],
    prerequisites: [],
    relatedLessons: [],
    relatedConcepts: [
      'CIA',
      'Confidentiality',
      'Integrity',
      'Availability',
      'Encryption',
      'Hashing',
      'Authentication',
      'Authorization',
      'DDoS',
    ],
    version: 1,
  },

  sections: [
    /* ============================================================== *
     * Section 1 — למה בכלל צריך מודל?                                 *
     * ============================================================== */
    {
      id: 'why-model',
      type: 'section',
      title: 'למה בכלל צריך מודל?',
      slug: 'why-model',
      blocks: [
        {
          id: 'p-intro-1',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'עולם אבטחת המידע מוצף במונחים: ' },
            { type: 'inline-code', value: 'Firewall' },
            { type: 'text', value: ', ' },
            { type: 'inline-code', value: 'IDS' },
            { type: 'text', value: ', ' },
            { type: 'inline-code', value: 'Ransomware' },
            { type: 'text', value: ', ' },
            { type: 'inline-code', value: 'Phishing' },
            { type: 'text', value: ', ' },
            { type: 'inline-code', value: 'DMZ' },
            { type: 'text', value: ', ' },
            { type: 'inline-code', value: 'MFA' },
            { type: 'text', value: '. סטודנט שמתחיל ללמוד מרגיש שהוא נדרש לשנן רשימה אינסופית של איומים וכלים, בלי שום דבר שמחזיק אותה יחד.' },
          ],
        },
        {
          id: 'p-intro-2',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'המשולש הוא התשובה לתחושה הזו. הוא לא עוד מונח ברשימה — הוא ' },
            { type: 'strong', value: 'המסגרת שהרשימה כולה נתלית עליה' },
            { type: 'text', value: '. שלוש תכונות בלבד, ואחריהן אפשר לשאול על כל איום "במה הוא פוגע?" ועל כל בקרה "על מה היא מגנה?".' },
          ],
        },
        {
          id: 'p-intro-3',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'זו הסיבה ש-' },
            { type: 'concept-reference', id: 'ref-cia', target: 'cia', label: 'CIA' },
            { type: 'text', value: ' הוא המושג הראשון בכל קורס אבטחת מידע, וזו הסיבה שהוא נשאר רלוונטי גם כשהטכנולוגיה מתחלפת. הכלים משתנים כל חמש שנים; שלוש השאלות לא.' },
          ],
        },
        {
          id: 'obj-1',
          type: 'objectives',
          items: [
            'להגדיר את שלוש צלעות משולש ההגנה ולהבחין ביניהן.',
            'לסווג אירוע אבטחה נתון לצלע או לצלעות שנפגעו בו.',
            'להסביר מדוע חיזוק צלע אחת בא לעיתים קרובות על חשבון אחרת.',
            'לזהות שהמשולש אינו מדרג חשיבות אלא מסגרת סיווג התלויה בנכס.',
          ],
        },
        {
          id: 'callout-event-def',
          type: 'callout',
          variant: 'important',
          children: [
            { type: 'text', value: 'אירוע אבטחה מוגדר כפגיעה בלפחות אחת משלוש הצלעות. אם שום צלע לא נפגעה — לא קרה אירוע אבטחה, גם אם קרה משהו מטריד.' },
          ],
        },
      ],
    },

    /* ============================================================== *
     * Section 2 — סודיות                                               *
     * ============================================================== */
    {
      id: 'confidentiality',
      type: 'section',
      title: 'סודיות — מי מורשה לראות?',
      slug: 'confidentiality',
      blocks: [
        {
          id: 'p-conf-1',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'הצלע הראשונה, ' },
            { type: 'concept-reference', id: 'ref-conf', target: 'confidentiality', label: 'Confidentiality' },
            { type: 'text', value: ', עוסקת בשאלה מי רשאי לגשת למידע.' },
          ],
        },
        {
          id: 'p-conf-2',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'הדבר החשוב להבין בפגיעה בסודיות הוא ' },
            { type: 'strong', value: 'מה היא לא עושה' },
            { type: 'text', value: '. המידע לא נמחק. המידע לא שונה. המערכת ממשיכה לעבוד בדיוק כמו קודם. הפגיעה היחידה היא שמישהו ראה משהו שלא היה אמור לראות.' },
          ],
        },
        {
          id: 'p-conf-3',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'מכאן נגזרת התכונה המסוכנת ביותר של הצלע הזו: היא ' },
            { type: 'strong', value: 'שקטה' },
            { type: 'text', value: '. אין קריסה, אין התרעה, אין משתמש מתלונן. ארגונים רבים מגלים שהמאגר שלהם דלף רק חודשים לאחר מכן — כשהוא מוצע למכירה.' },
          ],
        },
        {
          id: 'p-conf-4',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'סודיות אינה מושגת בבקרה אחת אלא בשילוב של שלוש:' },
          ],
        },
        {
          id: 'list-conf-controls',
          type: 'list',
          ordered: false,
          items: [
            [
              { type: 'concept-reference', id: 'ref-enc', target: 'encryption', label: 'Encryption' },
              { type: 'text', value: ' — הופך את המידע לבלתי קריא למי שאין לו מפתח.' },
            ],
            [
              { type: 'concept-reference', id: 'ref-authn', target: 'authentication', label: 'Authentication' },
              { type: 'text', value: ' — מוודא מי הגורם שמבקש גישה.' },
            ],
            [
              { type: 'concept-reference', id: 'ref-authz', target: 'authorization', label: 'Authorization' },
              { type: 'text', value: ' — קובע למה בדיוק אותו גורם רשאי לגשת.' },
            ],
          ],
        },
        {
          id: 'p-conf-5',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'אף אחת מהן אינה מספיקה לבדה. הצפנה שכולם מחזיקים את מפתחה אינה מסתירה דבר; בקרת גישה על מידע לא מוצפן נעקפת בגישה ישירה לדיסק או להאזנה לרשת.' },
          ],
        },
        {
          id: 'ex-conf-1',
          type: 'example',
          children: [
            { type: 'text', value: 'מסד נתונים של חברת ביטוח מאוחסן בענן, והוגדר בטעות כנגיש לציבור. איש לא פרץ, איש לא ניצל חולשה, ולא הופעלה נוזקה — פשוט הייתה תצורה שגויה. מיליוני רשומות לקוחות נחשפו. זו פגיעת סודיות מלאה, ללא תוקף.' },
          ],
        },
        {
          id: 'warn-conf-1',
          type: 'callout',
          variant: 'warning',
          children: [
            { type: 'text', value: 'פגיעה בסודיות אינה דורשת האקר. עובד ששולח קובץ לכתובת דוא"ל שגויה, או תיקייה משותפת שהוגדרה פתוחה מדי, מייצרים בדיוק את אותה פגיעה.' },
          ],
        },
        {
          id: 'sc-conf-1',
          type: 'selfcheck',
          question: 'מנהל מערכת גילה שקובץ גיבוי של מאגר הלקוחות הועתק בשלמותו לשרת חיצוני. הקובץ המקורי במקומו, תקין ונגיש. אילו צלעות של המשולש נפגעו?',
          answer: 'סודיות בלבד. המידע נחשף לגורם לא מורשה, אך לא שונה (שלמות נשמרה) והמערכת המשיכה לפעול (זמינות נשמרה). זהו המקרה הטהור של פגיעת סודיות — ומכיוון שדבר לא נשבר, זו גם הפגיעה שקשה ביותר לגלות בזמן אמת.',
        },
      ],
    },

    /* ============================================================== *
     * Section 3 — שלמות                                                *
     * ============================================================== */
    {
      id: 'integrity',
      type: 'section',
      title: 'שלמות — האם המידע נכון?',
      slug: 'integrity',
      blocks: [
        {
          id: 'p-int-1',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'הצלע השנייה, ' },
            { type: 'concept-reference', id: 'ref-int', target: 'integrity', label: 'Integrity' },
            { type: 'text', value: ', עוסקת בשאלה האם המידע שאני רואה הוא המידע האמיתי.' },
          ],
        },
        {
          id: 'p-int-2',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'זו הצלע שקל ביותר לזלזל בה. אינטואיטיבית, גניבת מידע נשמעת חמורה יותר משינוי שלו. בפועל ההפך הוא הנכון: מידע שדלף גורם נזק שאפשר לכמת, אבל מידע ש' },
            { type: 'strong', value: 'שונה בלי שידעתם' },
            { type: 'text', value: ' גורם לכם לקבל החלטות שגויות על סמך שקר — בזמן שהמערכת מדווחת שהכל תקין.' },
          ],
        },
        {
          id: 'p-int-3',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'חשוב להרחיב את ההגדרה: פגיעה בשלמות אינה רק שינוי של מידע קיים. גם ' },
            { type: 'strong', value: 'יצירה של מידע שקרי חדש' },
            { type: 'text', value: ' — רשומת תשלום שלא הייתה, משתמש שלא נרשם, שורת לוג שהומצאה — היא פגיעה בשלמות מלאה.' },
          ],
        },
        {
          id: 'p-int-4',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'השמירה על שלמות פועלת בשתי רמות:' },
          ],
        },
        {
          id: 'tbl-int-1',
          type: 'table',
          headers: ['רמה', 'מטרה', 'מנגנון'],
          rows: [
            ['מניעה', 'שהשינוי לא יקרה מלכתחילה', 'Authorization, הפרדת תפקידים'],
            ['גילוי', 'שאם השינוי קרה — נדע', 'Hashing, חתימה דיגיטלית'],
          ],
        },
        {
          id: 'ex-int-1',
          type: 'example',
          children: [
            { type: 'text', value: 'תוקף שחדר לרשת של בית חולים אינו גונב את תיקי המטופלים. הוא משנה מינון תרופה ברשומה אחת. שום קובץ לא דלף, שום שירות לא הושבת, שום התרעה לא נדלקה — והנזק עלול להיות קטלני.' },
          ],
        },
        {
          id: 'warn-int-1',
          type: 'callout',
          variant: 'warning',
          children: [
            { type: 'inline-code', value: 'Hashing' },
            { type: 'text', value: ' לבדו מגלה שיבוש מקרי, אך אינו עוצר תוקף. מי שמסוגל לשנות את הקובץ מסוגל לרוב לשנות גם את ערך הגיבוב שמפורסם לצידו. שלמות מול יריב פעיל דורשת קשירת הגיבוב לסוד — חתימה דיגיטלית או ' },
            { type: 'inline-code', value: 'HMAC' },
            { type: 'text', value: '.' },
          ],
        },
        {
          id: 'sc-int-1',
          type: 'selfcheck',
          question: 'חברה מצפינה את כל בסיס הנתונים שלה בהצפנה חזקה. האם בכך היא הבטיחה גם את שלמות המידע?',
          answer: 'לא. Encryption מגן על סודיות בלבד — הוא מונע קריאה, לא שינוי. תוקף יכול לשבש בייטים בקובץ מוצפן בלי לפענח אותו, והתוצאה תהיה מידע פגום. שלמות דורשת מנגנון נפרד: Hashing לגילוי, ובקרת הרשאות כתיבה למניעה.',
        },
      ],
    },

    /* ============================================================== *
     * Section 4 — זמינות                                               *
     * ============================================================== */
    {
      id: 'availability',
      type: 'section',
      title: 'זמינות — האם המערכת עובדת?',
      slug: 'availability',
      blocks: [
        {
          id: 'p-avl-1',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'הצלע השלישית, ' },
            { type: 'concept-reference', id: 'ref-avl', target: 'availability', label: 'Availability' },
            { type: 'text', value: ', עוסקת בשאלה האם המידע והשירות נגישים למי שזכאי להם, כשהוא זקוק להם.' },
          ],
        },
        {
          id: 'p-avl-2',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'זו הצלע היחידה שהמשתמשים מרגישים ' },
            { type: 'strong', value: 'מיד' },
            { type: 'text', value: '. דליפה יכולה להישאר חבויה חודשים; שינוי נתונים יכול להתגלות רק כשמישהו משווה מקורות; השבתה מורגשת בשנייה הראשונה.' },
          ],
        },
        {
          id: 'p-avl-3',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'וכאן טמון ההבדל המהותי שהופך את הצלע הזו לחריגה: תקיפה על זמינות ' },
            { type: 'strong', value: 'אינה דורשת חולשה במערכת' },
            { type: 'text', value: '. כדי לפגוע בסודיות או בשלמות, התוקף חייב למצוא דרך פנימה. כדי לפגוע בזמינות מספיק לו להעמיס. שרת מעודכן לחלוטין, מוקשח ומוגן, ייפול תחת מספיק בקשות — וזה בדיוק המנגנון של ' },
            { type: 'concept-reference', id: 'ref-ddos', target: 'ddos', label: 'DDoS' },
            { type: 'text', value: '.' },
          ],
        },
        {
          id: 'callout-avl-1',
          type: 'callout',
          variant: 'important',
          children: [
            { type: 'text', value: 'זמינות אינה "השרת למעלה". שרת שמגיב אחרי 90 שניות הוא, מבחינת המשתמש, שרת לא זמין. איטיות קיצונית היא פגיעה בזמינות לכל דבר.' },
          ],
        },
        {
          id: 'sc-avl-1',
          type: 'selfcheck',
          question: 'מדוע מתקפת DDoS נחשבת קשה להגנה יותר ממתקפה המנצלת חולשת תוכנה?',
          answer: 'מפני שהיא אינה מנצלת חולשה כלל. חולשת תוכנה אפשר לתקן בעדכון, ואז המתקפה מפסיקה לעבוד. DDoS משתמשת בבקשות שנראות לגיטימיות ומנצלת את הקיבולת הסופית של המערכת — ואת זה אי אפשר "לתקן", רק לספוג, לסנן או להרחיב.',
        },
      ],
    },

    /* ============================================================== *
     * Section 5 — הצלעות מושכות זו בזו                                *
     * ============================================================== */
    {
      id: 'tradeoffs',
      type: 'section',
      title: 'הצלעות מושכות זו בזו',
      slug: 'tradeoffs',
      blocks: [
        {
          id: 'p-trade-1',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'עד כאן למדנו את שלוש הצלעות בנפרד. עכשיו החלק שהופך את המשולש מרשימה למודל: ' },
            { type: 'strong', value: 'שלוש הצלעות מתחרות זו בזו' },
            { type: 'text', value: '.' },
          ],
        },
        {
          id: 'p-trade-2',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'זו אינה תופעת לוואי של יישום גרוע. זו תכונה מובנית. כמעט כל בקרה שמחזקת צלע אחת מחלישה אחרת:' },
          ],
        },
        {
          id: 'tbl-trade-1',
          type: 'table',
          headers: ['הבקרה', 'מחזקת', 'מחלישה'],
          rows: [
            ['הצפנת דיסק מלאה', 'סודיות', 'זמינות — אובדן מפתח פירושו אובדן המידע'],
            ['אימות רב־שלבי (MFA)', 'סודיות', 'זמינות — משתמש בלי טלפון נעול בחוץ'],
            ['הרשאות מינימליות', 'סודיות, שלמות', 'זמינות — עובד ממתין לאישור גישה'],
            ['גיבויים רבים ומפוזרים', 'זמינות', 'סודיות — יותר עותקים, יותר משטח לדלוף ממנו'],
            ['בדיקת שלמות על כל בקשה', 'שלמות', 'זמינות — עלות חישובית, השהיה'],
          ],
        },
        {
          id: 'p-trade-3',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'המסקנה המעשית: ' },
            { type: 'strong', value: 'אין תצורת אבטחה "נכונה" אחת' },
            { type: 'text', value: '. יש איזון, והוא נגזר מהנכס המסוים ומהסיכון שלו. לכן השאלה הראשונה בכל תכנון אבטחה אינה "אילו כלים נתקין?" אלא "מה אנחנו מגנים עליו, ומה הכי כואב אם ייפגע?".' },
          ],
        },
        {
          id: 'analogy-1',
          type: 'analogy',
          children: [
            { type: 'text', value: 'כספת בנק ממחישה את המתח היטב. ככל שהכספת מסורבלת יותר לפתיחה — יותר מנעולים, יותר מורשי חתימה, יותר בדיקות — כך היא בטוחה יותר וכך גם קשה יותר להוציא ממנה כסף כשבאמת צריך. בנק שמחליט להקשיח את הכספת עד הסוף פוגע ביכולת שלו לתת שירות. זהו בדיוק המתח בין סודיות לזמינות.' },
          ],
        },
        {
          id: 'media-triangle',
          type: 'media',
          variant: 'diagram',
          description: 'משולש שווה־צלעות ובקודקודיו Confidentiality, Integrity ו-Availability. בין כל זוג קודקודים חץ דו־כיווני המסמן מתח.',
          src: null,
          alt: 'משולש ה-CIA — מתח מובנה בין שלוש הצלעות',
        },
        {
          id: 'sc-trade-1',
          type: 'selfcheck',
          question: 'ארגון החליט להצפין כל קובץ ולדרוש MFA בכל גישה, ולאחר מכן גילה שצוות התמיכה אינו מצליח לטפל בתקלות דחופות. מה קרה במונחי המשולש?',
          answer: 'הארגון חיזק את הסודיות עד לנקודה שבה הזמינות נפגעה. זו אינה תקלה ביישום אלא ביטוי של המתח המובנה במשולש: כל שכבת אימות והצפנה מוסיפה חיכוך לגישה לגיטימית. הפתרון אינו לוותר על הבקרות, אלא לבחור איזון שמתאים לנכס — למשל נתיב גישת חירום מבוקר ומתועד.',
        },
      ],
    },

    /* ============================================================== *
     * Section 6 — איך תוקף רואה את המשולש                             *
     * ============================================================== */
    {
      id: 'attacker-view',
      type: 'section',
      title: 'איך תוקף רואה את המשולש',
      slug: 'attacker-view',
      blocks: [
        {
          id: 'p-atk-1',
          type: 'paragraph',
          children: [
            { type: 'text', value: 'עד עכשיו הסתכלנו מנקודת המבט של המגן. אותו משולש בדיוק משמש גם את התוקף — רק שהוא קורא אותו הפוך: כל צלע היא ' },
            { type: 'strong', value: 'מטרה לשלילה' },
            { type: 'text', value: '.' },
          ],
        },
        {
          id: 'tbl-atk-1',
          type: 'table',
          headers: ['משפחת המתקפה', 'מה התוקף עושה', 'הצלע שנשללת'],
          rows: [
            ['Interception', 'מאזין למידע העובר, בלי לשנותו', 'Confidentiality'],
            ['Modification', 'משנה מידע קיים', 'Integrity'],
            ['Fabrication', 'מייצר מידע או ישות מזויפים', 'Integrity'],
            ['Interruption', 'משבש או משבית את השירות', 'Availability'],
          ],
        },
        {
          id: 'tip-atk-1',
          type: 'callout',
          variant: 'tip',
          children: [
            { type: 'text', value: 'כשאתם נתקלים בכלי אבטחה חדש שאינכם מכירים, שאלו עליו שאלה אחת: על איזו צלע הוא מגן? כמעט תמיד תגלו שהתשובה מסבירה גם את המגבלות שלו.' },
          ],
        },
        {
          id: 'sc-atk-1',
          type: 'selfcheck',
          question: 'קבוצת תקיפה משביתה את אתר החברה במתקפת DDoS, ובמקביל — בזמן שצוות האבטחה עסוק בהחזרת השירות — מחלצת בשקט את מאגר הלקוחות. אילו צלעות נפגעו?',
          answer: 'שתיים. ה-DDoS פגע בזמינות, וחילוץ המאגר פגע בסודיות. זהו דפוס מוכר שבו הפגיעה הרועשת בזמינות משמשת הסחה לפגיעה השקטה בסודיות — ומדגים מדוע אין לסגור טיפול באירוע ברגע שהשירות חזר לאוויר.',
        },
      ],
    },

    /* ============================================================== *
     * Section 7 — טעויות נפוצות                                       *
     * ============================================================== */
    {
      id: 'common-mistakes',
      type: 'section',
      title: 'טעויות נפוצות',
      slug: 'common-mistakes',
      blocks: [
        {
          id: 'warn-cm-1',
          type: 'callout',
          variant: 'warning',
          children: [
            { type: 'strong', value: '"סודיות היא הצלע החשובה ביותר."' },
            { type: 'text', value: ' לא. אין דירוג קבוע. עבור אתר חדשות זמינות מנצחת סודיות — התוכן ממילא פומבי, אבל השבתה עולה כסף בכל דקה. עבור מאגר תעודות זהות ההפך המוחלט. הדירוג נקבע על ידי הנכס, לא על ידי המודל.' },
          ],
        },
        {
          id: 'warn-cm-2',
          type: 'callout',
          variant: 'warning',
          children: [
            { type: 'strong', value: '"הצפנתי, אז אני מוגן."' },
            { type: 'text', value: ' ' },
            { type: 'inline-code', value: 'Encryption' },
            { type: 'text', value: ' מטפל בסודיות בלבד. הוא לא מונע שינוי (שלמות) ולא מונע השבתה (זמינות) — ולמעשה הוא עלול לפגוע בזמינות בעצמו, אם המפתח אובד.' },
          ],
        },
        {
          id: 'warn-cm-3',
          type: 'callout',
          variant: 'warning',
          children: [
            { type: 'strong', value: '"אף אחד לא נכנס למערכת, אז לא היה אירוע אבטחה."' },
            { type: 'text', value: ' מתקפת ' },
            { type: 'inline-code', value: 'DDoS' },
            { type: 'text', value: ' מוכיחה את ההפך: אפשר לפגוע קשות בלי לחדור לשום מקום. חדירה היא אמצעי, לא הגדרה.' },
          ],
        },
      ],
    },

    /* ============================================================== *
     * Section 8 — סיכום + קישורים                                     *
     * ============================================================== */
    {
      id: 'summary',
      type: 'section',
      title: 'סיכום',
      slug: 'summary',
      blocks: [
        {
          id: 'kp-1',
          type: 'keypoints',
          items: [
            'CIA הוא מסגרת סיווג, לא רשימת דרישות ולא דירוג חשיבות.',
            'סודיות = מי מורשה לראות. פגיעה בה שקטה ולכן מתגלה מאוחר.',
            'שלמות = האם המידע נכון. כוללת גם יצירת מידע שקרי, לא רק שינוי מידע קיים.',
            'זמינות = האם המערכת עובדת. הצלע היחידה שאפשר לתקוף בלי לנצל חולשה.',
            'שלוש הצלעות מתחרות זו בזו — חיזוק אחת נוטה להחליש אחרת.',
            'האיזון הנכון נגזר מהנכס המוגן, ולעולם אינו אחיד לכל המערכות.',
          ],
        },
        {
          id: 'quiz-ref-1',
          type: 'quiz-reference',
          ref: 'cia-quiz',
        },
        {
          id: 'flash-ref-1',
          type: 'flashcards-reference',
          ref: 'cia',
        },
        {
          id: 'refs-1',
          type: 'references',
          items: [
            'סילבוס הקורס 276206 — "הגדרת הליבה (CIA)", תוצרי למידה.',
            'מצגות הקורס — יחידת הפתיחה ואנטומיית תקיפה (סיווג RFC 2828).',
            'Principles of Computer Security: CompTIA Security+ and Beyond (2022), Conklin.',
          ],
        },
      ],
    },
  ],

  summary: [],
  quizRef: 'cia-quiz',
  flashcardsRef: 'cia',
  concepts: [
    'cia',
    'confidentiality',
    'integrity',
    'availability',
    'encryption',
    'hashing',
    'authentication',
    'authorization',
    'ddos',
  ],
};
