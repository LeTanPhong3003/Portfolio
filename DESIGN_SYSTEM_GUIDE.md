# Nichol Portfolio Guidance - Le Tan Phong

## 1. Context and Goals

Design intent: Portfolio must present Le Tan Phong as a backend-focused candidate in a dashboard UI that is consistent, accessible, and implementation-ready.

- Product context: dashboard-style personal portfolio
- Primary audience: recruiters, engineering leads, operators
- Outcome goal: communicate backend capability quickly with low cognitive load
- Delivery goal: token-driven UI that can be reused without local visual exceptions

## 2. Design Tokens and Foundations

The implementation must use semantic tokens instead of raw values in component rules.

### 2.1 Typography Tokens

- `font.family.primary`: Sora
- `font.family.stack`: Sora, sans-serif
- `font.size.base`: 16px
- `font.weight.base`: 400
- `font.lineHeight.base`: 24px
- `font.size.xs`: 14px
- `font.size.sm`: 16px
- `font.size.md`: 18px
- `font.size.lg`: 20px
- `font.size.xl`: 22px
- `font.size.2xl`: 24px
- `font.size.3xl`: 26px
- `font.size.4xl`: 40px

### 2.2 Color Tokens

- `color.text.primary`: #050c17
- `color.text.secondary`: #ffffff
- `color.text.inverse`: #994ff5
- `color.border.strong`: #7780a1
- `color.surface.base`: #000000

### 2.3 Spacing and Shape Tokens

- `space.1`: 2px
- `space.2`: 8px
- `space.3`: 10px
- `space.4`: 12px
- `space.5`: 14px
- `space.6`: 16px
- `space.7`: 20px
- `space.8`: 24px
- `radius.xs`: 9999px
- `motion.duration.instant`: 300ms

## 3. Component-Level Rules

Known page density should remain traceable: links (39), buttons (9), inputs (4), lists (4).

### 3.1 Navigation Links

Anatomy: top-level horizontal link list in sticky topbar.

- Default: must use `color.text.secondary` text on transparent surface with `color.border.strong` border.
- Hover: must increase contrast and border emphasis with semantic highlight treatment.
- Focus-visible: must render 2px visible focus ring with non-hidden outline.
- Active: must show pressed transform and filled emphasis.
- Disabled: should not be used for primary nav; if used, must be non-focusable and visually reduced.
- Loading: should not block navigation interactions.
- Error: must render fallback text in case route target fails.

Interaction behavior:

- Keyboard: `Tab`/`Shift+Tab` must move sequentially through links; `Enter` must activate.
- Pointer: click must activate target section.
- Touch: tap must activate with minimum comfortable hit area.

Responsive behavior:

- Must wrap into multi-line rows on narrow viewport.
- Must preserve hit area and readable spacing under 860px.

Edge-case handling:

- Long labels must wrap, not overflow container.

### 3.2 Button Family

Anatomy: primary, ghost, error, disabled, loading variants.

- Default: must use semantic filled/outlined variant token mapping.
- Hover: must provide visible visual change.
- Focus-visible: must expose ring independent from hover color.
- Active: must indicate pressed state.
- Disabled: must reduce opacity and block pointer events.
- Loading: must show spinner and busy state while preserving width.
- Error: must use danger-styled variant for destructive/testing actions.

Interaction behavior:

- Keyboard: `Tab` focus + `Enter/Space` activation must work on all enabled buttons.
- Pointer: click must trigger action once.
- Touch: tap must trigger action once with no ghost activation.

Responsive behavior:

- Should wrap action rows across lines without overlap.

Edge-case handling:

- Long labels must truncate gracefully or wrap while preserving button height consistency.

### 3.3 Form Inputs (4 total)

Anatomy: text, email, subject, textarea.

- Default: must use semantic border and readable placeholder contrast.
- Hover: must increase border emphasis.
- Focus-visible: must show ring and border reinforcement.
- Active: must show pressed/active fill adjustment.
- Disabled: must reduce opacity and prevent edits.
- Loading: should lock submit control while fields remain readable.
- Error: must show error border and helper message tied to validation result.

Interaction behavior:

- Keyboard: users must complete and submit form without mouse.
- Pointer: click places cursor and allows field editing.
- Touch: tap focuses field and opens software keyboard.

Responsive behavior:

- Must collapse from 2 columns to 1 column on small screens.

Edge-case handling:

- Long input content must wrap in textarea and not break layout.
- Empty state must keep helper area reserved to prevent layout shift.

### 3.4 Data Cards and Project Lists

Anatomy: section panel, heading, metadata, bullet list, outbound link.

- Default: must keep consistent tokenized spacing/typography.
- Hover: should apply subtle elevation for cards if interactive.
- Focus-visible: must apply to links inside cards.
- Active: should indicate link press state.
- Disabled: should not appear for static informational cards.
- Loading: should use skeleton placeholders when async data source is introduced.
- Error: must show fallback block if project source fails.

Interaction behavior:

- Keyboard: links in each card must be reachable and activatable.
- Pointer: link click must open external resource.
- Touch: tap must preserve target size and spacing.

Responsive behavior:

- Project cards must auto-fit and stack at narrow widths.

Edge-case handling:

- Overflow text must remain readable and clipped only where intentional.
- Empty project list must render an explicit empty-state message.

## 4. Accessibility Requirements and Acceptance Criteria

All rules below are implementation-testable.

- Focus visibility: every interactive element must show visible focus ring.
  Pass: tabbing through page always shows clear indicator.
  Fail: at least one button/link/input has hidden focus style.

- Keyboard completion: user must complete contact form and submit using keyboard only.
  Pass: no pointer required from first field to submit.
  Fail: interaction trap or unreachable control.

- Contrast compliance: text and controls must meet WCAG 2.2 AA contrast ratios.
  Pass: automated audit reports no contrast failures.
  Fail: low-contrast text or borders below threshold.

- Semantic structure: sections must use heading hierarchy and landmark elements.
  Pass: screen reader exposes clear regions and heading order.
  Fail: skipped heading levels or non-semantic grouping.

- Error messaging: validation feedback must be perceivable and associated with invalid fields.
  Pass: invalid fields are styled and error message is announced.
  Fail: silent failure with no user feedback.

## 5. Content and Tone Standards

Writing style should stay concise, confident, implementation-focused.

- Labels must be descriptive and action-oriented.
  Good: "Gui lien he", "Xem repository"
  Bad: "Click here", "Thong tin them"

- Experience bullets should emphasize measurable technical outcomes.
  Good: "Trien khai Kafka Bridge cho call signaling real-time"
  Bad: "Lam backend cho du an"

- Profile summary should prioritize backend strengths and target role.

## 6. Anti-Patterns and Prohibited Implementations

- Raw hex values must not appear directly in component specs.
- Focus indicator must not be removed via `outline: none` without replacement.
- One-off spacing and typography values must not bypass token scale.
- Ambiguous call-to-action labels must not be used.
- Components must not be shipped without full state definitions.

Migration note:

- If this portfolio is moved into a shared design system, teams should map local CSS variables to global token aliases first, then migrate component by component.

## 7. QA Checklist

- [ ] Every non-negotiable requirement uses "must".
- [ ] Every recommendation uses "should".
- [ ] Components include default, hover, focus-visible, active, disabled, loading, and error states.
- [ ] Keyboard, pointer, and touch behavior is documented for interactive components.
- [ ] Responsive behavior is defined for all component groups.
- [ ] Overflow, long-content, and empty-state behavior is documented.
- [ ] Accessibility checks are testable with pass/fail outcomes.
- [ ] Semantic tokens are used for implementation guidance.
- [ ] Portfolio content reflects Le Tan Phong CV accurately.
