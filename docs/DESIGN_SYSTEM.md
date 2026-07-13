# DESIGN_SYSTEM.md

> **Version:** 1.0
> **Status:** Living Design Document

---

# Purpose

This document defines how CyberAtlas looks, reads, and behaves.

The design system is the visual half of one rule:

> **Content describes what is taught. The design system describes how it is presented.**

Educational content never carries styling.

The renderer maps Knowledge Objects to components, and those components are defined here.

---

# Design Principles

## Learning First

Every visual decision is judged by one question:

> Does this help a student understand the material?

If the answer is no, remove it.

Ornament competes with comprehension.

---

## Calm

The interface is quiet.

Content is loud.

A lesson page should feel like reading a well-set book, not operating a console.

References:

- Notion — structure without noise
- Apple Documentation — density with clarity
- Coursera — the reading experience of a lesson
- Linear — restraint, precision, speed

---

## Explicitly Not This

The platform teaches Computer Security.

It does **not** perform Computer Security.

Forbidden:

| Anti-pattern | Why it is banned |
|---|---|
| Hacker aesthetics | Aestheticizes the subject instead of teaching it |
| Terminal / console UI | Monospace everywhere destroys Hebrew readability |
| Neon-on-black, matrix themes | Low contrast, high fatigue, zero pedagogical value |
| Glitch text, scanlines, CRT effects | Actively harms legibility |
| Decorative animation | Distracts from reading |
| Skull / lock / binary-code iconography | Cliché, not information |

The subject is serious. The interface should be too.

---

## No Decoration

Every element on screen must be one of:

- Content
- Navigation
- Structure that makes content readable
- Feedback about the learner's state

Nothing else is allowed on the page.

---

# Color System

## Tokens

All color lives in HSL CSS variables in `apps/web/src/styles/globals.css`.

Tailwind consumes them through `hsl(var(--token))`, never as literals.

A component that hardcodes a hex value is a bug.

---

## Base Palette

| Token | Light | Dark | Role |
|---|---|---|---|
| `--background` | `0 0% 100%` | `222 47% 8%` | Page surface |
| `--foreground` | `222 47% 11%` | `210 40% 96%` | Body text |
| `--card` | `0 0% 100%` | `222 44% 11%` | Card surface |
| `--card-foreground` | `222 47% 11%` | `210 40% 96%` | Card text |
| `--popover` | `0 0% 100%` | `222 44% 11%` | Popover surface |
| `--primary` | `222 47% 25%` | `210 40% 96%` | Primary action |
| `--primary-foreground` | `210 40% 98%` | `222 47% 11%` | Text on primary |
| `--secondary` | `210 40% 96%` | `217 33% 17%` | Secondary surface |
| `--muted` | `210 40% 96%` | `217 33% 17%` | De-emphasized surface |
| `--muted-foreground` | `215 16% 47%` | `215 20% 65%` | De-emphasized text |
| `--accent` | `210 40% 96%` | `217 33% 17%` | Hover surface |
| `--destructive` | `0 72% 51%` | `0 63% 45%` | Destructive action |
| `--border` | `214 32% 91%` | `217 33% 20%` | Hairlines |
| `--input` | `214 32% 91%` | `217 33% 20%` | Field borders |
| `--ring` | `222 47% 25%` | `213 27% 84%` | Focus ring |

The base palette is a deep desaturated navy.

It is a reading surface, not a brand statement.

---

## The Six Learn Colors

DSL callouts carry **teaching intent**, not a hue.

The token names say what the block is *for*. A rebrand changes six numbers in `globals.css` and touches zero components.

| Token | Light | Dark | DSL block | Pedagogical meaning |
|---|---|---|---|---|
| `--learn-definition` | `217 91% 60%` | `217 91% 68%` | `:::definition` | **This is the thing itself.** The canonical, precise statement of a concept. Blue reads as neutral and authoritative — a definition is not a warning and not an opinion. |
| `--learn-example` | `142 71% 45%` | `142 61% 55%` | `:::example` | **This is what it looks like in the world.** Concrete, real, verifiable. Green reads as grounded and confirmatory. |
| `--learn-analogy` | `262 83% 58%` | `262 73% 68%` | `:::analogy` | **This is a bridge from what you already know.** Deliberately non-literal. Violet signals *imaginative, not factual* — the student must never mistake an analogy for a definition. |
| `--learn-important` | `38 92% 50%` | `38 92% 60%` | `:::important` | **Remember this.** Exam-relevant, load-bearing. Amber demands attention without implying danger. |
| `--learn-warning` | `0 84% 60%` | `0 74% 68%` | `:::warning` | **This is where students get it wrong.** A misconception, a trap, a dangerous default. Red is reserved for correction — never for topic-is-scary decoration. |
| `--learn-tip` | `199 89% 48%` | `199 79% 58%` | `:::tip` | **Optional shortcut or aid.** Skippable. Cyan is the lightest signal in the set because a tip is never required to pass. |

Rules:

- The six colors are **the only** semantic hues in the product.
- Nothing outside a callout may use a learn color.
- Never introduce a seventh callout color to make a lesson "pop".
- Adding a callout variant is a DSL change first (`LEARNING_DSL.md` → `packages/core`), not a CSS change.

---

## Callout Application

A callout is **not** a filled block of saturated color.

Hebrew body text on a saturated field is unreadable.

Apply the learn color as:

- A **border-inline-start** accent, 3–4px, at full token saturation
- A **tint** of the surface at very low alpha (~5%)
- The **icon** color
- The **label** color (הגדרה, דוגמה, אנלוגיה, …)

Body text inside a callout always stays `--card-foreground`.

```css
/* Correct: the color labels the block. It does not paint it. */
.callout-definition {
  border-inline-start: 4px solid hsl(var(--learn-definition));
  background: hsl(var(--learn-definition) / 0.05);
  color: hsl(var(--card-foreground));
}
```

Note `border-inline-start`, not `border-left`. See the RTL section.

---

# Typography

## Family

```
Heebo → ui-sans-serif → system-ui → sans-serif
```

Heebo is the only text face.

It covers **Hebrew and Latin in one family**, so a line like:

> חומת אש (Firewall) מסננת תעבורה נכנסת

keeps a single vertical rhythm, a single x-height, and a single weight axis across both scripts.

Pairing a Hebrew face with a separate Latin face produces a visible seam on every technical term. This course is full of technical terms. One family is not a preference — it is a requirement.

Weights loaded: 300, 400, 500, 600, 700.

Monospace (`ui-monospace`) appears **only** inside `code`, `pre`, `kbd`, and `samp`.

Monospace is never a UI font here.

---

## The Reading Measure

```css
.prose-lesson {
  @apply max-w-[72ch] text-[1.0625rem] leading-[1.85];
  /* max-width: 72ch · font-size: 17px · line-height: 1.85 */
}
```

Three numbers, each deliberate.

### Why 72ch and not 65ch

The classic Latin measure is 45–75 characters, usually tuned to ~65ch.

Hebrew behaves differently:

- Hebrew has **no capitals** and far less ascender/descender variety. Word shapes are flatter and more uniform, so the eye gets less shape-based help scanning a line.
- Hebrew words are on average **shorter in characters** than their English equivalents — root-and-pattern morphology, and particles (ו־, ה־, ב־, ל־, מ־) attach directly to the word rather than standing alone.
- Net effect: a Hebrew line at 65ch carries **fewer words** than a Latin line at 65ch, and the column reads as cramped.

72ch restores a comfortable word count per line for Hebrew while staying inside the safe upper bound for Latin.

### Why line-height 1.85

Hebrew needs more vertical room than Latin at the same point size:

- Hebrew letterforms fill nearly the whole x-height band with **dense, boxy glyphs** (ם, ס, ט, ח). There is less internal white space per glyph than in Latin.
- **Niqqud**, where present, hangs below the baseline and collides with the next line at typical Latin leading.
- Mixed Hebrew/Latin lines are the norm here, and Latin ascenders (f, l, k) plus descenders (g, p, y) press against the Hebrew band from both sides.

1.85 gives lines room to breathe without turning the column into a list.

Do not tighten it. 1.85 is a legibility floor, not a style choice.

### Why 17px

`1.0625rem` (17px) is a half-step above the 16px default.

Hebrew glyphs carry more internal detail per em than Latin. At 16px the distinctions ד / ר and ה / ח / ת degrade on non-Retina displays. 17px preserves them at negligible layout cost.

---

## Type Scale

| Role | Size | Weight | Line height |
|---|---|---|---|
| Lesson title (h1) | `2rem` | 700 | 1.3 |
| Section (h2) | `1.5rem` | 600 | 1.4 |
| Topic (h3) | `1.25rem` | 600 | 1.5 |
| Body | `1.0625rem` | 400 | 1.85 |
| Callout label | `0.875rem` | 600 | 1.5 |
| Caption / meta | `0.875rem` | 400 | 1.6 |
| Code | `0.9375rem` | 400 | 1.7 |

Headings get **tighter** leading than body. Body gets the room.

---

## Technical Terms in Hebrew Prose

Latin technology names stay in English: `Firewall`, `DNS`, `TCP/IP`, `OAuth`.

They are never transliterated into Hebrew characters.

The renderer wraps them in `.tech-term`:

```css
.tech-term {
  unicode-bidi: isolate;
  direction: ltr;
  display: inline-block;
}
```

Without isolation, the Unicode bidi algorithm drags adjacent punctuation across the term:

```
Intended:  ...התעבורה נבדקת על ידי Firewall.
Rendered:  ...התעבורה נבדקת על ידי .Firewall
```

The period jumps to the wrong side of the word.

`code`, `pre`, `kbd`, and `samp` already carry this isolation globally.

Authors never write `.tech-term` — content contains no CSS. The renderer applies it.

---

# Spacing & Radius

## Radius

```css
--radius: 0.75rem;
```

| Tailwind | Computed | Use |
|---|---|---|
| `rounded-lg` | `0.75rem` | Cards, callouts, quiz panels |
| `rounded-md` | `0.625rem` | Buttons, inputs, chips |
| `rounded-sm` | `0.5rem` | Badges, small tags |

12px is soft enough to read as approachable, sharp enough to read as serious.

Never `rounded-full` on a content container. Pills are for chips and badges only.

---

## Spacing

Tailwind's default 4px scale. No custom spacing tokens.

Rhythm inside a lesson:

| Utility | Value | Between |
|---|---|---|
| `space-y-4` | 16px | Paragraphs |
| `space-y-6` | 24px | One block and the next |
| `space-y-10` | 40px | Sections |
| `p-6` | 24px | Card padding |
| `py-12` | 48px | Page top / bottom |

Whitespace is a feature. When a page feels crowded, the fix is more space — never smaller type.

---

# RTL

> This is the section that breaks the app if ignored.

The UI is **RTL-first**. Hebrew is the primary language, not a translation layer.

The document root is `dir="rtl"`.

---

## The One Rule

**Always use CSS logical properties. Never use physical ones.**

Physical properties (`left`, `right`, `ml`, `pr`) hardcode an assumption about text direction. They are correct in LTR and silently wrong in RTL.

Logical properties (`start`, `end`, `ms`, `pe`) resolve against `dir`. They are correct in both.

---

## DO / DON'T

| Intent | ✅ DO | ❌ DON'T |
|---|---|---|
| Margin, leading side | `ms-4` | `ml-4` |
| Margin, trailing side | `me-4` | `mr-4` |
| Padding, leading side | `ps-6` | `pl-6` |
| Padding, trailing side | `pe-6` | `pr-6` |
| Text alignment | `text-start` | `text-left` |
| Text alignment, opposite | `text-end` | `text-right` |
| Callout accent border | `border-s-4` | `border-l-4` |
| Border, trailing edge | `border-e` | `border-r` |
| Absolute position | `start-0` | `left-0` |
| Absolute position, opposite | `end-0` | `right-0` |
| Rounded leading corners | `rounded-s-lg` | `rounded-l-lg` |
| Scroll padding | `scroll-ps-4` | `scroll-pl-4` |
| Raw CSS inset | `inset-inline-start` | `left` |
| Raw CSS border | `border-inline-start` | `border-left` |
| Row layout | `dir="rtl"` + `flex-row` | `flex-row-reverse` |

`flex-row-reverse` earns its own warning. It is a **layout hack** used to fake RTL: it reverses visual order without changing logical order, which desynchronizes tab order, screen-reader order, and keyboard navigation from what the student sees. Set `dir="rtl"` and let `flex-row` do the right thing.

---

## Icons and Direction

Directional icons mirror. Non-directional icons must not.

| Icon | RTL behavior |
|---|---|
| Chevron / arrow (next, back, breadcrumb) | **Mirror.** "Next" points left in RTL. |
| Progress fill | **Mirror.** Progress advances right-to-left. |
| Send / reply | **Mirror.** |
| Checkmark, lock, star, warning triangle | **Do not mirror.** No inherent direction. |
| Logos | **Never mirror.** |
| Media controls (play, skip) | **Never mirror.** Media time is not text direction. |
| Code / terminal glyphs | **Never mirror.** |

Use `rtl:-scale-x-100` on the mirroring set only.

---

## Numbers, Code, and Mixed Content

| Content | Direction | Alignment |
|---|---|---|
| Hebrew prose | RTL | start (visually right) |
| Inline Latin tech term | isolated LTR | flows inside the RTL line |
| Code block | LTR | start-aligned inside an LTR box |
| CLI commands | LTR | LTR |
| Numbers | LTR (always) | flow inside the RTL line |
| URLs, file paths | isolated LTR | LTR |
| Tables | RTL — first column sits at the **right** | headers `text-start` |

Numbers always render LTR under the bidi algorithm. That is correct. Do not "fix" it.

---

## Testing RTL

An RTL bug is invisible to a reviewer looking at English.

Every UI change must be checked against:

1. Real Hebrew content — not Lorem Ipsum, not English placeholders.
2. A Hebrew sentence with an inline Latin tech term **followed by punctuation**.
3. A mixed table: Hebrew headers, Latin cell values.
4. `Tab` traversal — focus must move right-to-left, matching visual order.

If a mockup is in English, the mockup has not been tested.

---

# Component Inventory

Every component below is the render target of exactly one Knowledge Object.

The mapping lives in the renderer's `BlockRegistry` (`packages/markdown-renderer/src/registry.ts`), keyed by `BlockType` from `@cyberatlas/core`. Adding a DSL directive without giving it a component is a **type error** — not a blank space on a student's screen.

---

## Block Components

| Knowledge Object | DSL | Component | Visual treatment |
|---|---|---|---|
| `definition` | `:::definition` | **DefinitionCard** | Card, `border-s-4` in `--learn-definition`, label הגדרה. The most visually settled block on the page — it is the anchor. |
| `example` | `:::example` | **ExampleCard** | Card, `border-s-4` in `--learn-example`, label דוגמה. |
| `analogy` | `:::analogy` | **AnalogyCard** | Card, `border-s-4` in `--learn-analogy`, label אנלוגיה. Distinct enough that it is never mistaken for a definition. |
| `callout` · `important` | `:::important` | **Callout** `variant="important"` | Tinted band, `--learn-important`, icon + label חשוב. |
| `callout` · `warning` | `:::warning` | **Callout** `variant="warning"` | Tinted band, `--learn-warning`, icon + label אזהרה. |
| `callout` · `tip` | `:::tip` | **Callout** `variant="tip"` | Tinted band, `--learn-tip`, icon + label טיפ. Lowest visual weight of the three. |
| `media` · `diagram` | `:::diagram` | **DiagramPlaceholder** | Dashed-border panel rendering the author's *description* of the intended visual. Exists because content describes visuals rather than embedding them: `src` stays null until an asset is produced. **Never renders ASCII art.** |
| `media` · `image` / `animation` / `video` | `:::image` etc. | **DiagramPlaceholder** (variant) | Same contract: description now, asset later. |
| `selfcheck` | `:::selfcheck` | **SelfCheck** | Question always visible; answer behind a Radix Collapsible with `aria-expanded` / `aria-controls`. **Never `<details>`** — that is HTML in content, which the DSL forbids. |
| `objectives` | `:::objectives` | **KeyPoints** `variant="objectives"` | Checklist at the top of a lesson. |
| `keypoints` | `:::keypoints` | **KeyPoints** | Compact checklist closing a section. |
| `summary` | `:::summary` | **Summary** | Muted card. Closes the lesson. |
| `references` | `:::references` | **References** | Plain list in `--muted-foreground`. Lowest visual weight on the page. |
| `quiz-reference` | `:::quiz{ref=…}` | **QuizCard** | A card that *links to* the quiz. It never inlines quiz content. |
| `flashcards-reference` | `:::flashcards{ref=…}` | **Flashcard** deck entry | Links to the deck. |
| `concept-reference` | `[[Firewall]]` | **ConceptReference** chip | Inline chip: subtle background, `rounded-sm`, Radix HoverCard revealing the concept's definition, links to `/glossary/:slug`. |
| `heading` · `paragraph` · `list` · `table` · `code` | plain Markdown | Prose primitives | Styled by `.prose-lesson`. No component chrome. |

---

## Standalone Components

| Component | Source | Notes |
|---|---|---|
| **QuizCard** | `quiz-engine` output | Question, options, submit, feedback. Options keyboard-navigable via Radix RadioGroup. Correct / incorrect state uses `--learn-example` / `--learn-warning`, never raw green/red. |
| **Flashcard** | `flashcards.md` | Front / back. The flip is a transform, not a navigation. Falls back to a cross-fade under `prefers-reduced-motion`. |

---

## Component Rules

- Components are **stateless**. Educational state lives in the learning engine, never in a card.
- Components receive **exactly their own block** (`BlockComponentProps<T>`) and nothing else.
- A component never reaches for content it was not handed.
- Components build on **shadcn/ui + Radix** primitives. Radix supplies the accessibility contract for free — never hand-roll a Collapsible, Dialog, or RadioGroup.

---

# Accessibility

Accessibility is not a phase. It is a definition-of-done item, per `CLAUDE.md`.

---

## Contrast

| Element | Minimum | Standard |
|---|---|---|
| Body text | 4.5:1 | WCAG AA |
| Large text (≥ 24px) | 3:1 | WCAG AA |
| Borders, focus rings | 3:1 | WCAG AA non-text |
| Callout labels | 4.5:1 | WCAG AA |

The learn colors are used for **borders, icons, and labels** — never as body text on a tinted field. That is precisely why they are allowed to be saturated.

Never signal state with color alone. A warning callout carries a warning **icon** and the label אזהרה. A correct quiz answer carries a checkmark, not just green.

---

## Focus

Focus is always visible.

```css
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

`--ring` is `222 47% 25%` in light and `213 27% 84%` in dark — both clear 3:1 against their background.

Never `outline: none` without an equivalent replacement.

Using `outline` + `outline-offset` (rather than a border) means the ring never shifts layout.

---

## Keyboard

Every interactive element is reachable and operable by keyboard.

| Component | Keys |
|---|---|
| SelfCheck | `Enter` / `Space` toggles the answer |
| Flashcard | `Enter` / `Space` flips |
| QuizCard options | `↑` `↓` move · `Space` selects · `Enter` submits |
| ConceptReference chip | `Enter` navigates; the hover card also opens on focus |
| Sidebar nav | `Tab` traverses in RTL visual order |

Arrow-key semantics follow document direction. Radix handles this when `dir` is set on its provider — confirm that it is.

Tab order must match **visual** RTL order. This is the concrete reason `flex-row-reverse` is banned.

---

## ARIA

- Callouts: `role="note"` with an `aria-label` naming the variant.
- SelfCheck: `aria-expanded` + `aria-controls` on the trigger.
- DiagramPlaceholder: the author's description **is** the accessible text. It is content, never `aria-hidden`.
- ConceptReference: `aria-describedby` pointing at the hover card.
- Meaningful icons get an `aria-label`. Icons beside a text label get `aria-hidden="true"`.
- Pages set `lang="he"` and `dir="rtl"`. Latin technical spans set `lang="en"`.

That last point matters: without `lang="en"`, a screen reader tries to pronounce "Firewall" with Hebrew phonetics.

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is a floor, not a strategy. Any component whose motion carries meaning (the flashcard flip) must provide a **non-motion equivalent** — a cross-fade — not merely a faster animation.

---

# Motion

Framer Motion is the animation library.

Motion faces the same test as everything else: does it help a student understand?

---

## Permitted Motion

| Motion | Duration | Easing | Purpose |
|---|---|---|---|
| Route transition | 150ms | `ease-out` | Confirms navigation happened |
| Card / callout enter | 200ms | `ease-out` | Orients the eye to new content |
| SelfCheck answer reveal | 200ms | `ease-out` | Shows the answer came from the question |
| Flashcard flip | 300ms | `ease-in-out` | The flip *is* the metaphor |
| Accordion open / close | 200ms | `ease-out` | Already defined in `tailwind.config.ts` |
| Hover / focus feedback | 100ms | `ease-out` | Confirms interactivity |

Nothing exceeds **300ms**. A student waiting on an animation is a student not reading.

---

## Forbidden Motion

- Looping or ambient animation
- Parallax
- Scroll-jacking
- Typewriter effects
- Anything that plays without a user action
- Anything that delays access to content

---

## The Reduced-Motion Contract

Every Framer Motion component reads `useReducedMotion()`.

```tsx
const shouldReduce = useReducedMotion();

<motion.div
  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: shouldReduce ? 0 : 0.2 }}
/>
```

Note `y`, not `x`. Vertical motion is direction-agnostic and needs no RTL handling.

Horizontal motion must be authored in logical terms and flipped for RTL — one more reason to prefer vertical.

---

# Dark Mode

## Mechanism

Class-based (`darkMode: ['class']`), not media-query-based.

The user chooses. The system only suggests.

State lives in `apps/web/src/providers/theme-provider.tsx` and persists.

---

## It Is a Real Theme, Not an Inversion

Dark mode is **not** `filter: invert()`.

It is a second, separately tuned set of the same tokens. Two adjustments define it.

**1. Surfaces lift; they do not merely darken.**

`--background: 222 47% 8%` is not black, and `--card: 222 44% 11%` sits *above* it. Elevation in dark mode is communicated by lightness, because shadows are nearly invisible on a dark surface.

**2. The learn colors lift in lightness.**

| Token | Light L | Dark L |
|---|---|---|
| `--learn-definition` | 60% | 68% |
| `--learn-example` | 45% | 55% |
| `--learn-analogy` | 58% | 68% |
| `--learn-important` | 50% | 60% |
| `--learn-warning` | 60% | 68% |
| `--learn-tip` | 48% | 58% |

A hue that clears contrast against white will fail against a dark surface at the same lightness. The lift is what keeps callouts legible.

Saturation also **drops** on several tokens (`--learn-example` 71% → 61%, `--learn-warning` 84% → 74%). Saturated colors vibrate against dark backgrounds and cause eye strain over a long reading session.

---

## Dark Mode Is Not the Hacker Theme

Restating, because this is where it usually goes wrong:

- Background is **navy**, not `#000`.
- Text is **soft white** (`210 40% 96%`), not `#0f0`.
- Callouts are **desaturated**, not neon.
- There is no glow, no bloom, no terminal cursor.

Dark mode exists for people reading at night. It does not exist for atmosphere.

---

# Related Documents

| Document | Purpose |
|---|---|
| `CLAUDE.md` | Engineering philosophy and development rules |
| `ARCHITECTURE.md` | System architecture and layer boundaries |
| `LEARNING_DSL.md` | The DSL these components render |
| `CONTENT_SPEC.md` | Educational content specification |
| `PARSER_SPEC.md` | Knowledge Object production |
| `ROADMAP.md` | Delivery phases |

---

# Change Policy

A visual change that requires editing a component in order to change a color is a **design system bug**.

Fix the token, not the component.

If a new DSL block needs a new component, the order is fixed:

```
1. LEARNING_DSL.md      define the block
2. packages/core        add the directive + schema
3. markdown-parser      build the Knowledge Object
4. DESIGN_SYSTEM.md     define the component
5. markdown-renderer    implement it in the registry
```

Never start at step 5.
