---
name: Unit Converter
description: A soft aqua quick-lookup converter: white cards floating on a cool seafoam gradient, one teal accent.
colors:
  seafoam-mist: "#87e8e0"
  lagoon: "#5cc6c1"
  deep-teal: "#0b4744"
  mist-paper: "#f5f8fa"
  card-white: "#ffffff"
  ink: "#333333"
  ink-soft: "#555555"
  placeholder-ink: "#6b6b6b"
  field-fill: "#f9f9f9"
  field-border: "#688a87"
typography:
  display:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.6
  note:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  md: "0.5rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.seafoam-mist}"
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.lagoon}"
  button-tab-active:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  input-field:
    backgroundColor: "{colors.field-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    padding: "2rem"
  header-banner:
    backgroundColor: "{colors.seafoam-mist}"
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.md}"
    padding: "1.5rem 0"
---

# Design System: Unit Converter

## Overview

**Creative North Star: "The Cool Shallows"**

Light, airy, and translucent: everything feels like clear aqua water with white tiles resting just under the surface. The page is a single seafoam-to-mist gradient; the header, the category tabs, the converter card and the result card sit on it as soft, rounded, gently lifted pieces. One teal accent family carries every interactive element, so the page never asks the visitor to decode more than "this is a button, this is where I type, this is the answer."

The system is small because the product is small. A quick lookup needs a calm, friendly surface that stays out of the way of the value and the result. Density is low, the layout is a single centered column, and personality comes from the water-toned color and the soft corners rather than from ornament.

The logo (`logoconverter.png`, black line mark) is a binding brand asset and sits in the header banner.

**Key Characteristics:**
- One accent family (Seafoam Mist to Lagoon, with Deep Teal for text) used for every action.
- White cards on a tinted gradient; depth is a faint shadow, never a border.
- A single 8px corner radius everywhere.
- Centered, single-column, max 700-800px.
- Atkinson Hyperlegible Next (self-hosted) is the only typeface, including on buttons and form controls.

## Colors

A monochromatic aqua palette over near-white neutrals: pale, cool, and low-contrast by design.

### Primary
- **Seafoam Mist** (#87e8e0): the light end of every gradient: page background, header banner, button gradients.
- **Lagoon** (#5cc6c1): the deeper end of the same gradients.
- **Deep Teal** (#0b4744): every piece of text and every state or focus indicator on aqua or white: header title, button labels, the active tab label and border, converter card headings, input focus border and ring, text selection. 5.2:1 on Lagoon, 7.3:1 on Seafoam Mist, 10.5:1 on white.

### Neutral
- **Mist Paper** (#f5f8fa): the pale end of the page gradient.
- **Card White** (#ffffff): converter cards, result card, and the active tab fill.
- **Ink** (#333333): body and result text.
- **Ink Soft** (#555555): supporting text, form labels, and the result lead-in sentence.
- **Placeholder Ink** (#6b6b6b): input placeholder text (5.1:1 on Field Fill).
- **Field Fill** (#f9f9f9): input and select background.
- **Field Border** (#688a87): resting input and select border, a muted teal-grey at 3.8:1 on white (3.6:1 on Field Fill) so fields are findable in bright light.

### Named Rules
**The One Family Rule.** Every accent is Seafoam Mist or Lagoon. No second hue is introduced for status, category or decoration.

**The Gradient Direction Rule.** Surfaces fade from Seafoam Mist toward Mist Paper (page, 135deg) or toward Lagoon (header, 90deg; buttons, 45deg). Hover reverses a button's gradient rather than changing hue.

**The Deep Teal Text Rule.** Text on Seafoam Mist or Lagoon is Deep Teal, never white (white is 1.4-2:1 there). Lagoon is a fill, never a text or indicator color on white.

## Typography

**Display Font:** Atkinson Hyperlegible Next (self-hosted variable WOFF2, latin subset, weights 400/600/700, with system-ui as fallback)
**Body Font:** Atkinson Hyperlegible Next, same stack
**Label/Mono Font:** none

**Character:** One friendly, highly legible sans chosen for its unambiguous numerals (slashed zero, distinct 1/l/I), which matter in a tool whose output is a number. Hierarchy comes from size, weight and tone; headings use 1.2 line height and -0.01em tracking, body 1.6.

### Hierarchy
- **Display** (700, 2rem, 1.2): the "Unit Converter" title in the header, Deep Teal on aqua; also the result value, which scales fluidly from 1.5rem to 2rem (`clamp(1.5rem, 7.5vw, 2rem)`) so long numbers fit narrow screens.
- **Headline** (600, 1.25rem, 1.2): the page lead "Convert Units of Measurement" in Ink.
- **Title** (700, 1.5rem, 1.2): each converter card's title, Deep Teal.
- **Body** (400, 1rem, 1.6): intro text (Ink Soft), inputs, and button labels (600 weight on buttons).
- **Label** (600, 1rem, 1.6): form labels in Ink Soft, left-aligned above their field.
- **Note** (400, 0.875rem, 1.6): the data-source credit under the Cooking converter, Ink Soft with Deep Teal links. The only role below 1rem.

### Named Rules
**The Plain Sans Rule.** One family, no italics, no uppercase, no letter-spacing tricks. Emphasis is weight 600/700 only.

**The Number Leads Rule.** The converted value is set at Display size, 700, Deep Teal, tabular figures, on its own line; the sentence that introduces it is Body in Ink Soft. Form inputs and selects use tabular figures and Ink (#333333), not the browser default black.

## Layout

A single centered column. The body is a flex column centered on the page with 1rem vertical padding; the header spans up to 800px and all content up to 700px. Blocks are separated by 2rem; inside a card padding is 2rem; inside a form, fields are stacked with a 1rem gap, each label above its full-width control. The category tabs sit in a centered, wrapping row with a 1rem gap.

Responsive behavior is minimal: at 600px and below the header stacks (logo above the title, in flow instead of absolutely positioned), the tab buttons become a two-column grid, and converter cards drop to 1.5rem padding. The page keeps 1rem side padding so cards never touch the viewport edge.

## Elevation & Depth

Tonal layering with one faint shadow vocabulary. Depth comes from white cards sitting on a tinted gradient; shadows only soften the card edges.

### Shadow Vocabulary
- **Header lift** (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)`): the header banner.
- **Card rest** (`box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05)`): converter cards and the result card.

### Named Rules
**The Faint Lift Rule.** Shadows are ambient and nearly invisible. Interactivity is signalled by a 2px upward translate on hover, not by a heavier shadow.

## Shapes

One radius: 0.5rem (8px) on the header, cards, buttons, inputs and selects. Edges are rounded but never pill-shaped or circular. Borders are used only on form fields (1px Field Border, shifting to Deep Teal on focus) and on the active tab (2px Deep Teal). Every button carries a 2px transparent border so the active state never shifts layout.

## Components

Soft and friendly: rounded corners, gentle gradients, a light lift on hover. Approachable rather than technical.

### Buttons
- **Shape:** 8px radius, no border.
- **Primary (category tabs, Convert, Reset):** a 45deg gradient from Seafoam Mist to Lagoon, Deep Teal 600-weight label, 0.75rem 1.5rem padding (Reset 0.75rem 1.25rem).
- **Hover:** the gradient reverses (Lagoon to Seafoam Mist) and the button rises 2px over 0.3s ease (no rise under reduced motion).
- **Focus:** a 3px Deep Teal outline offset 2px on keyboard focus.
- **Active tab:** white fill, Deep Teal label, 2px Deep Teal border; `aria-pressed` mirrors it.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** Card White.
- **Shadow Strategy:** Card rest.
- **Internal Padding:** 2rem for converter cards, 1.5rem for the result card. Content is centered; form labels are left-aligned.

### Inputs / Fields
- **Style:** full width, Field Fill background, 1px Field Border, 8px radius, 0.75rem 1rem padding, 1rem text.
- **Ingredient search:** the Cooking converter puts a plain search field (same style as other inputs) above the ingredient select; typing narrows the select live, and a hidden status line announces the match count.
- **Focus:** the border becomes Deep Teal with a 2px Deep Teal outline offset 1px. The number input accepts any decimal (`step="any"`).
- **Error / Disabled:** no styled states; invalid input currently raises a browser `alert`. A converter that fails to load shows a white notice card with `role="alert"`.

### Navigation
The category tabs (Length, Weight, Volume, Cooking, Temperature) are the whole navigation: a centered wrapping row of primary buttons, a two-column grid on narrow screens with the odd last tab spanning the full width. The active category takes the white-with-border treatment.

### Header Banner
A Seafoam Mist to Lagoon horizontal gradient bar, 8px radius, max 800px. The logo sits absolutely at the left (80px wide) and the Deep Teal title is centered. Under 600px the logo moves above the title.

## Do's and Don'ts

### Do:
- **Do** keep every interactive element in the Seafoam Mist to Lagoon gradient with Deep Teal text and reverse the gradient on hover.
- **Do** use the single 8px radius on every surface and control.
- **Do** keep depth to Card rest and Header lift; place white cards on the tinted gradient.
- **Do** keep layout a single centered column, 700px for content and 800px for the header.
- **Do** keep the existing logo as the brand mark in the header.

### Don't:
- **Don't** introduce a second accent hue for status, category or decoration.
- **Don't** use borders or heavy shadows to separate cards; tone and a faint shadow do that.
- **Don't** set white text on Seafoam Mist or Lagoon, or use Lagoon as text or an indicator on white; use Deep Teal.
- **Don't** remove a focus indicator without replacing it with an equally visible Deep Teal one.
- **Don't** use pill shapes, uppercase labels, or decorative type; the system is one plain sans at a few sizes.
