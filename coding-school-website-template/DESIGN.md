---
version: alpha
name: "Coding school template by 8B"
description: "Part-time coding school for adult career changers, built from flat orange, plum and ice colour planes with a red accent. Free HTML template by 8B, MIT."
colors:
  primary: "#c93418"
  secondary: "#4a3a5f"
  tertiary: "#f29a1f"
  neutral: "#f5f5f7"
  surface: "#ffffff"
  on-surface: "#1e2130"
  caption: "#5e606b"
  accent-coral: "#ec6a52"
  deep-plum: "#2a2137"
  slate: "#8a90a3"
  ice: "#dde8ea"
  hairline: "#dcdde3"
typography:
  headline-lg:
    fontFamily: Matangi
    fontSize: 68px
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Matangi
    fontSize: 34px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: 0.02em
  wordmark:
    fontFamily: Matangi
    fontSize: 27px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.01em
  lead:
    fontFamily: Asta Sans
    fontSize: 23px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.005em
  body-md:
    fontFamily: Asta Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Asta Sans
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.09em
  nav-link:
    fontFamily: Asta Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
  button:
    fontFamily: Asta Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.01em
rounded:
  xs: 2px
  md: 12px
  lg: 24px
  full: 999px
spacing:
  gutter: 64px
  section: 168px
  max-width: 1440px
  bar-height: 96px
  column-gap: 72px
  card-padding: 28px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 0 32px
    height: 56px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: 0 28px
    height: 52px
  nav-link:
    textColor: "{colors.caption}"
    typography: "{typography.nav-link}"
  badge-module:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 0 12px
    height: 30px
  card-fee:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  panel-module:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  input-field:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 52px
---

# Coding school template by 8B

## Overview

A one-page site for a part-time coding school that retrains adults for tech jobs. The idea is that colour does the structural work: flat rectangles of orange, coral, plum and ice, set at angles that settle into order as you scroll, echo the school's pitch of taking a tangled career and restructuring it. The voice is plain, aimed at adults with a job and a family. The feeling is warm and organised rather than techy: a pale ground, one bold red for actions, and uppercase display type that looks like a timetable board.

## Colors

- **Primary (#c93418):** the red accent. Filled buttons, the focus outline, the strike line through old jobs, the taster panel, the last module and weeks 20 to 24, the labels in the contact list and the open FAQ icon.
- **Secondary (#4a3a5f):** plum. The graduates section, the footer, the full-screen menu, the second project and fee cards, mentor labels and FAQ icons.
- **Tertiary (#f29a1f):** orange. The first-screen orange plane, the first module and weeks 1 to 5, the first project and fee gradients, and one square of each pixel glyph.
- **Neutral (#f5f5f7):** the page ground, the solid bar after scrolling and the form field fill.
- **Surface (#ffffff):** fee cards, the form panel, text on dark planes and button labels.
- **On-surface (#1e2130):** body text, headings and the dark employer marks.
- **Caption (#5e606b):** lead paragraphs, nav links, notes under fees and struck-through old jobs.
- **Accent-coral (#ec6a52):** the tint behind old jobs, the second module and weeks 6 to 10, and gradient ends.
- **Deep-plum (#2a2137):** the course section background, the button hover wipe and the favicon square.
- **Slate (#8a90a3):** the fourth module and weeks 16 to 19, gradient ends and the field hover border.
- **Ice (#dde8ea):** the mentors and questions sections, new-job rows, the third module and weeks 11 to 15, and lead text on dark sections.
- **Hairline (#dcdde3):** rules between rows, field borders and the shadow line under the solid bar.

## Typography

Two families. Matangi, loaded in weight 500 only, carries every heading, module and mentor name, fee price, menu link and the lowercase wordmark; headings and names are uppercase with 0.02em tracking and a line height near 1. Its tracked capitals give a timetable-board feel. Asta Sans, weights 400 to 600, carries body text, buttons, form fields and the small labels (13px, 600, 0.09em tracking, uppercase) that introduce times, roles and prices.

Section headings use clamp(34px, 4.6vw, 68px); the course heading tops out at 56px and module names at 48px. The full-screen menu links reach 64px. Lead paragraphs run 19 to 23px, body copy 16 to 18px. Never add a third face.

## Layout

Content sits in a column up to 1440px wide with side gutters of 20 to 64px. Most section heads are two columns (heading 1.2fr, lead 1fr) aligned at the bottom, separated by a 72px column gap. Sections pad 96 to 168px top and bottom. The top bar is 96px tall on desktop and 72px on phones.

Below 900px the columns stack, the nav links and Apply button are replaced by a Menu button that opens a full-screen plum overlay, the career rows become stacked old and new blocks, fee cards form one column and the pinned course track uses 84vw panels. The first screen is a single panel as tall as the viewport minus the bar, with at least 560px on desktop and 600px on phones.

## Elevation & Depth

There are no drop shadows. The only shadow is a 1px hairline under the solid top bar. Depth comes from overlapping planes, from sticky project cards that stack and dim, and from one frosted disc: the round See the course link uses a 10px backdrop blur over a translucent deep plum.

## Shapes

Corners are generous and consistent: 24px for fee cards, module panels, project cards and the form, 12px for form fields, fully round for buttons, badges and the schedule photos (cropped to a wide capsule), and small 2 to 4px squares for the pixel glyph, week squares and FAQ icons. The five-square pixel glyph is built from empty elements, not an image, and repeats in the top bar, three section headings and the footer.

## Components

- **button-primary:** red pill, white label, 56px tall. On hover a deep plum slab with a skewed edge wipes in from the left.
- **button-secondary:** outlined pill, 52px tall, used on coloured planes and the menu; the hover wipe turns it white with dark text.
- **nav-link:** muted 16px link with an underline that grows on hover.
- **badge-module:** outlined pill with a tracked uppercase label, used for week ranges and mentor subjects.
- **card-fee:** white card with a gradient header carrying the plan name and price, and a body with a note and a button.
- **panel-module:** a coloured rounded panel with two rotated planes behind its text and a photo beside it (above it on phones).
- **input-field:** pale 12px-radius field with a 1.5px border that darkens on focus.

## Motion

The page loads GSAP 3.13, ScrollTrigger and Lenis (smooth scrolling, lerp 0.09). The one motion idea is order emerging from disorder: things start turned, stacked or struck out and settle straight as you scroll.

- **Top bar:** turns solid after 24px and hides on scroll down, returning on scroll up.
- **First screen:** on load the panel lifts, then the heading, paragraph and button follow in sequence. The colour planes stay still.
- **Careers:** each of six rows is scrubbed: the old job gets a red strike and turns grey, the new job wipes in from the left, the Kept line fades up.
- **Course:** pinned, the five panels slide sideways for about 1.15 times their overflow (roughly 4,200px of scroll at 1440px wide, 1,500px on a 390px phone) while 24 week squares fill in colour order.
- **Schedule and graduates:** headings and quotes rise out of a clip; schedule photos settle from a six-degree tilt; the pixel glyphs assemble from scattered squares.
- **Mentors:** a sticky portrait window; as each card nears the middle the next portrait wipes in on a slant and settles from a 1.16 zoom.
- **Capstones:** sticky cards; the one underneath tilts 2.5 degrees, shrinks to 88% and darkens as the next slides over.
- **Taster:** a red disc grows by circular clip into a panel; the dates rise inside.
- **Fees:** three cards start stacked on one card and are dealt into their columns.
- **Contact:** three planes fall from a tilted heap into bands.

Button wipes take 0.55s; entrances take 0.8 to 1.1s. With reduced motion the entrance and scroll animations and smooth scrolling are switched off: the course track scrolls sideways by hand, the portrait window keeps its first portrait, project cards still stick but do not shrink, and hover wipes and the bar's hide-on-scroll keep running.

## Do's and Don'ts

- Do keep one red accent for actions and the strike line; do not add a second action colour.
- Do keep headings uppercase in Matangi and labels tracked and small; do not set body text in Matangi.
- Do build colour areas from flat gradient planes; do not add stock illustrations, icons or glassy cards.
- Do keep corners at 24px, 12px or fully round; do not mix in square boxes.
- Do keep photos real and people-led, cropped inside planes or capsules.
- Do keep the pixel glyph at five squares; do not replace it with a logo mark of another shape.
- Don't add parallax or scroll effects beyond the ones above; the settling-into-order idea is the whole motion language.
