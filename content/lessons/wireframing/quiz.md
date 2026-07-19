---
id: wireframing-quiz
lesson: wireframing
title: "Quiz: Wireframing (Low-Fidelity Structural Sketching)"
---

## Question

id: wireframing/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 45
points: 5
concepts:
  - wireframe

Which of the following best defines a **wireframe** in interface design?

### Answers

A. A high-fidelity, full-color mockup that closely resembles the final product.

B. A visual, skeletal representation of a screen's layout, hierarchy, and navigation, created without color, styled typography, or graphics.

C. An interactive simulation that lets users click through a full working flow between screens.

D. A written document listing all functional requirements for a feature.

Correct: B
Explanation: Wireframe הוא ייצוג ויזואלי-שלדי של מסך — הוא מתאר את פריסת הרכיבים, ההיררכיה והניווט, אך תמיד ללא צבע, טיפוגרפיה מעוצבת או גרפיקה. תיאור A מתאר High-Fidelity Prototype, לא Wireframe. תיאור C מתאר Prototype אינטראקטיבי — Wireframe עצמו הוא בדרך כלל סטטי. תיאור D מתאר מסמך דרישות טקסטואלי, לא שרטוט ויזואלי כלל.
Learning Objective: Define what a wireframe is and identify its core characteristics as a skeletal representation of a screen.
Misconception: Students sometimes think any early sketch of a screen counts as a wireframe, even if it includes color or real images. The defining trait is the deliberate stripping of visual design, not just "being early."

---

## Question

id: wireframing/q2
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - wireframe

Why do wireframes use only grayscale (black, white, and shades of gray), never color?

### Answers

A. Because color printers were historically expensive and unavailable to design teams.

B. Because using color prematurely shifts stakeholders' attention from evaluating the structure to judging aesthetics, causing them to react to visual taste instead of layout logic.

C. Because grayscale images load faster on slow internet connections.

D. Because color is only appropriate for high-fidelity prototypes built in Axure.

Correct: B
Explanation: כלל גווני האפור קיים כדי לשמור על מיקוד: צבע נושא איתו החלטות עיצוביות (מיתוג, מצב רגשי) שעדיין לא רלוונטיות בשלב האפיון. כשמכניסים צבע, הצופה מפסיק להעריך מבנה ומתחיל להעריך "האם זה יפה" — בדיוק התופעה שהשיעור מתאר עם דוגמת הלוגו הכחול. תיאור A ו-C אינם הסיבה האמיתית (מדובר בעיקרון תקשורתי-קוגניטיבי, לא טכני). תיאור D הפוך מהעיקרון — כלל גווני האפור חל גם ב-Wireframe שנבנה ב-Axure ברמת Fidelity גבוהה, כל עוד הוא עדיין Wireframe ולא עיצוב סופי.
Learning Objective: Explain why wireframes are always built in grayscale, with minimal fonts, and without graphics — and the purpose behind each rule.
Misconception: Students often think grayscale is a technical or historical constraint rather than a deliberate cognitive strategy to keep the conversation focused on structure, not visual polish.

---

## Question

id: wireframing/q3
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - wireframe

Which of the following correctly follows wireframe conventions for the screen described below?

### Scenario

You are asked to build a wireframe for a mobile app's "profile" screen, similar to an Instagram profile page. The screen needs a profile picture, a short bio text, a row of three stats (posts, followers, following), and a grid of the user's photos below.

### Answers

A. A circle placeholder for the profile picture, gray rectangular text blocks for the bio and stats, and a grid of empty rectangles each marked with an "X" in the center for the photo grid — all in grayscale.

B. The user's real profile picture, real bio text, and a grid of the user's actual recent photos, but arranged in a simplified layout.

C. A full-color mockup with Instagram's actual pink-to-orange gradient branding applied to the stats row, but with placeholder photos.

D. A written paragraph describing what the profile screen should contain, without any visual layout.

Correct: A
Explanation: תשובה A מיישמת נכון את שלושת כללי ה-Wireframe: גווני אפור בלבד, ומלבנים עם X כמציין-מיקום במקום תמונות אמיתיות (כולל תמונת הפרופיל והגריד). תשובה B פוגעת בכלל ההימנעות מגרפיקה — היא משתמשת בתמונות אמיתיות, מה שמסיט את תשומת הלב מהמבנה. תשובה C מפרה את כלל גווני האפור על ידי הכנסת צבעי מיתוג אמיתיים. תשובה D אינה שרטוט ויזואלי כלל — Wireframe הוא תמיד ייצוג חזותי-מרחבי, לא תיאור מילולי.
Learning Objective: Apply the three wireframe creation rules to build a wireframe for a familiar real-world screen.
Misconception: Students sometimes think "simplifying" real content (option B) is equivalent to wireframing. Wireframing isn't about using less real content — it's about replacing all real content with neutral placeholders so the discussion stays on structure.

---

## Question

id: wireframing/q4
type: multiple-choice
difficulty: hard
cognitive: analyze
estimatedTime: 75
points: 5
concepts:
  - wireframe
  - fidelity

A product manager says: "We already built a clickable Axure file where you can tap a button on the login screen and it takes you to the home screen — so this is basically a wireframe, not a prototype." Which statement best analyzes this claim?

### Answers

A. The PM is correct — since the file is still in grayscale and unstyled, it must be classified strictly as a wireframe regardless of its behavior.

B. The PM is mistaken on scope but not on tooling: the file can be a high-fidelity, grayscale wireframe built with a tool like Axure, but the moment it lets users click through a simulated flow between screens, it is functioning as a prototype — wireframe and prototype are about static structure vs. interactive flow, not about visual styling alone.

C. The PM is correct because Axure is officially described as a "wireframing tool," so anything built in it is automatically a wireframe and never a prototype.

D. The PM is mistaken because prototypes must always be full-color and wireframes must always be black-and-white, so a grayscale clickable file cannot exist.

Correct: B
Explanation: ההבחנה בין Wireframe ל-Prototype אינה קשורה לצבע אלא להתנהגות: Wireframe הוא סטטי ועונה "מה יש במסך?", בעוד Prototype מדמה זרימה ועונה "מה קורה כשלוחצים?". קובץ ב-Axure עם קישורים לחיצים בין מסכים — גם אם הוא עדיין בגווני אפור — כבר מתפקד כ-Prototype ברמת Fidelity גבוהה, כי הוא מדמה אינטראקציה וניווט, לא רק מבנה סטטי. תשובה A טועה כי היא מתעלמת מההתנהגות האינטראקטיבית. תשובה C טועה כי Axure הוא כלי גנרי שיכול לבנות גם Wireframes סטטיים וגם Prototypes אינטראקטיביים — הכלי לא קובע את הסיווג. תשובה D טועה כי Fidelity ויזואלית (צבע) והתנהגות אינטראקטיבית הן שני צירים נפרדים לגמרי.
Learning Objective: Distinguish between a wireframe and a prototype based on interactivity rather than visual styling, even when both are built in the same tool.
Misconception: Students often assume the wireframe/prototype distinction is about color or polish. The real distinction is static structure vs. simulated interactive flow — a grayscale file with clickable links between screens is already a prototype in behavior, even if it looks like a wireframe.
