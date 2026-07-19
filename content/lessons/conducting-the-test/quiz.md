---
id: conducting-the-test-quiz
lesson: conducting-the-test
title: "Quiz: Conducting a Usability Test — Roles, Formats, and Think-Aloud"
---

## Question

id: conducting-the-test/q1
type: multiple-choice
difficulty: easy
cognitive: remember
estimatedTime: 60
points: 5
concepts:
  - usability-testing

Which of the following actions would violate the norms of a properly run usability test?

### Answers

A. The Facilitator responds to a hesitant participant with "What would you expect to happen if you clicked there?"

B. The Data Logger records the participant's actions and comments without speaking to them.

C. The Facilitator later tells the participant's manager that they struggled to complete two of the five tasks.

D. The Test Observer sits silently in a separate room and takes notes.

Correct: C
Explanation: הכלל האתי המרכזי בבדיקות שמישות: ביצועיו של משתתף בודד אסורים לשיוך אישי, ואסור לדווח עליהם למנהל שלו — דיווח כזה עלול לגרום למשתתפים עתידיים (ואף לאותו משתתף בבדיקות הבאות) להסתיר קשיים אמיתיים כדי "להיראות טוב", מה שהורס את אמינות הנתונים. תשובות A, B ו-D מתארות התנהגות תקינה בדיוק לפי התפקידים שנלמדו: A היא הנוסח הנכון שממשיך Think-Aloud בלי לרמוז על הפתרון; B מתארת Data Logger שלא מתערב; D מתארת Observer ששותק כנדרש.
Learning Objective: Identify a violation of usability-testing ethics and distinguish it from correct role behavior (Facilitator, Data Logger, Observer).
Misconception: Students often focus only on "don't give hints" as the sole facilitation rule and overlook that individual performance data is confidential — it must never be traced back to a named participant, especially not to their manager.

---

## Question

id: conducting-the-test/q2
type: multiple-choice
difficulty: medium
cognitive: understand
estimatedTime: 60
points: 5
concepts:
  - think-aloud

Why does the Think-Aloud protocol reveal usability problems that silent observation of mouse clicks alone cannot?

### Answers

A. It makes the participant work faster, so more tasks fit into the session.

B. It records the participant's expectations and reasoning in real time, exposing the exact moment their mental model diverges from the system's actual behavior.

C. It replaces the need for a Data Logger, since the participant documents their own actions.

D. It allows the Facilitator to correct the participant's mistakes as they happen.

Correct: B
Explanation: צפייה שקטה מראה רק **מה** המשתמש עשה. Think-Aloud חושף גם **למה** — הציפיות והנחות היסוד שהובילו לכל פעולה. בדיוק ברגע שהמשתמש אומר "ציפיתי שזה יהיה למעלה", נחשף פער בין המודל המנטלי שלו למציאות של הממשק — מידע שלא ניתן לחלץ רק מצפייה בתנועות עכבר. תשובה A שגויה — Think-Aloud למעשה מאט מעט את הביצוע. תשובה C שגויה — עדיין נדרש Data Logger שמתעד את דברי המשתתף. תשובה D הפוכה לחלוטין מהכלל שנלמד: אסור למנחה לתקן או לרמוז למשתתף.
Learning Objective: Explain why the Think-Aloud protocol exposes usability problems that silent observation misses.
Misconception: Students often think Think-Aloud is just "talking while clicking" for documentation convenience. Its real value is exposing the gap between user expectation and system reality.

---

## Question

id: conducting-the-test/q3
type: scenario
difficulty: medium
cognitive: apply
estimatedTime: 75
points: 5
concepts:
  - usability-testing

Based on the course's error classification, how should the following incident be logged?

### Scenario

A participant testing a hotel-booking app is asked to book a room for two nights. She clicks "Book Now" before selecting the number of guests, notices the guest count still shows "1", says "oh wait, I need to fix that", changes it to "2", and completes the booking correctly. The final booking recorded in the system matches the target scenario exactly.

### Answers

A. Critical Error — the participant clicked the wrong button first.

B. Non-Critical Error — the participant recovered from the mistake herself, and the final outcome matches the scenario's target.

C. Critical Error — because any deviation from the ideal path counts as critical, regardless of the outcome.

D. This should not be logged at all, since the task was ultimately completed successfully.

Correct: B
Explanation: ההגדרה הפורמלית: Non-Critical Error היא שגיאה שהמשתתף מתאושש ממנה בעצמו ושאינה משפיעה על התוצאה הסופית. כאן המשתתפת שמה לב לטעות, תיקנה אותה, וההזמנה הסופית תואמת בדיוק ליעד התרחיש — בדיוק ההגדרה. תשובות A ו-C שגויות כי הן מתעלמות מהקריטריון המרכזי: Critical Error מוגדר כסטייה **בסיום המשימה** מהיעד, לא כל סטייה בדרך. תשובה D שגויה — גם Non-Critical Errors חייבים להירשם, כי הם עדיין מצביעים על בעיית עיצוב (למשל, למה ברירת המחדל של כמות האורחים לא הייתה ברורה) שפוגעת ביעילות, גם אם לא בהצלחת המשימה.
Learning Objective: Classify a described incident as a Critical or Non-Critical error using the course's formal definitions.
Misconception: Students often assume any wrong click during the task counts as a "critical" failure. Severity is determined by the outcome at completion and whether the participant recovered, not by the mere existence of a misstep along the way.

---

## Question

id: conducting-the-test/q4
type: scenario
difficulty: hard
cognitive: analyze
estimatedTime: 90
points: 5
concepts:
  - usability-testing

Which testing approach best fits the constraints described below, and why?

### Scenario

A small team has sketched an early paper prototype for a new onboarding flow. They have no budget, one free afternoon before a stakeholder meeting tomorrow, and no formal lab access. They still want some evidence about whether the flow is understandable before investing in development.

### Answers

A. Lab Testing — because it produces the most rigorous, reliable data and should always be the default choice.

B. Remote Testing — because it allows recruiting participants from multiple geographic locations without travel costs.

C. Guerrilla Testing — because it works with a Low-Fidelity prototype, requires only 3–4 improvised volunteers, and can be documented quickly with something as simple as a phone camera.

D. No test should be run — a paper prototype is too rough to produce valid usability data.

Correct: C
Explanation: בדיוק לאילוצים האלה — זמן קצר, תקציב אפסי, אב-טיפוס Low-Fidelity — נועדה שיטת Guerrilla Testing: מתנדבים מזדמנים (3–4), תיעוד מינימלי (מצלמת טלפון), ומטרה לתפוס את "ה-oh shit's" ולא דיוק סטטיסטי. תשובה A שגויה: Lab Testing דורש תיאום, ציוד וזמינות שאין לצוות ביום אחד, וממילא הכלל הנלמד הוא ש"בדיקה מהירה ומלוכלכת עדיפה על בדיקה פורמלית שלא מתבצעת כלל" — Lab אינו "תמיד ברירת המחדל". תשובה B שגויה בהקשר הזה — גיוון גיאוגרפי אינו הצורך כאן, והתיאום הנדרש ל-Remote Testing עדיין גבוה מדי לאחר-צהריים אחד. תשובה D סותרת ישירות את העיקרון המרכזי של גישת ה-Guerrilla: אב-טיפוס גס וזמן מוגבל הם בדיוק המצב שבו כדאי לאלתר, לא לוותר.
Learning Objective: Apply the Lab / Remote / Guerrilla decision criteria to choose the appropriate testing format given time, budget, and prototype-fidelity constraints.
Misconception: Students often assume more rigorous formats (Lab) are always the "better" or "safer" choice. In reality, the right format depends on constraints — a fast, improvised test that actually happens beats a rigorous test that never gets run.
