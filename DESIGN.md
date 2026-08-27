---
name: The K-Shaped Divide — Field Notes & Anthology
version: 1.0.0
author: Pranith Vincent
institution: Srishti Manipal Institute of Art, Design and Technology
year: 2026
colors:
  paper-base: "#f4eee1"
  paper-light: "#faf6ed"
  paper-dark: "#ece4d3"
  paper-border: "#dfd6c3"
  ink-primary: "#1c1815"
  ink-heading: "#181512"
  ink-secondary: "#40382f"
  ink-muted: "#615749"
  ink-subtle: "#786e60"
  accent-burgundy: "#801b1b"
  accent-burgundy-soft: "rgba(128, 27, 27, 0.08)"
  accent-gold: "#c9a86a"
  accent-gold-dark: "#b58d4a"
  cover-leather: "#1f1b18"
  cover-border: "#3a342e"
typography:
  font-display: "Playfair Display, Georgia, serif"
  font-title: "Cinzel, Times New Roman, serif"
  font-body: "Lora, Georgia, serif"
  font-sans: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
  cover-title:
    fontFamily: "{typography.font-display}"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "1.15"
    letterSpacing: "-0.01em"
  headline-editorial:
    fontFamily: "{typography.font-display}"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: "1.15"
  headline-stacked:
    fontFamily: "{typography.font-display}"
    fontSize: "32px"
    fontWeight: 900
    lineHeight: "1.05"
    letterSpacing: "-0.01em"
  lead-body:
    fontFamily: "{typography.font-body}"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: "1.5"
  pull-quote:
    fontFamily: "{typography.font-body}"
    fontSize: "13.5px"
    fontWeight: 500
    fontStyle: "italic"
    lineHeight: "1.5"
  turning-point:
    fontFamily: "{typography.font-display}"
    fontSize: "16px"
    fontWeight: 700
    fontStyle: "italic"
    lineHeight: "1.35"
  meta-label:
    fontFamily: "{typography.font-sans}"
    fontSize: "9.5px"
    fontWeight: 800
    letterSpacing: "0.16em"
    textTransform: "uppercase"
  folio-number:
    fontFamily: "{typography.font-sans}"
    fontSize: "10.5px"
    fontWeight: 600
    letterSpacing: "0.15em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "32px"
  page-padding: "24px 28px 20px"
components:
  book-stage:
    maxWidth: "1100px"
    aspectRatio: "1.45"
    minHeight: "640px"
  ribbon-bookmark:
    backgroundColor: "{colors.accent-burgundy}"
    width: "22px"
  next-button:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
---

# The K-Shaped Divide: Design Specification

## Overview

**The K-Shaped Divide** is an interactive, tactile digital field-notes anthology and research journal exploring socio-economic divergence in contemporary urban India (with focused fieldwork conducted in Bangalore across Church Street, Indiranagar, Srishti Institute, and Gram Panchayat).

- **Researched, Authored & Designed By**: **Pranith Vincent**
- **Academic Context**: Srishti Manipal Institute of Art, Design & Technology (2026)
- **Fieldwork & Photography**: 100% original on-location photography captured by author Pranith Vincent.
- **Core Concept**: Presenting socio-economic stratification not as dry statistical spreadsheets, but as an intimate, physical two-page open notebook (*The Economist / Financial Times* editorial precision meets artisanal printed research journal).

---

## Creative Direction & Aesthetic Philosophy

1. **Physicality Over SaaS**:
   - The interface is grounded as an authentic open hardcover book with ivory pages, center sewn-binding stitch line, gutter shadow gradient, gilded page edges, and a silk crimson ribbon bookmark (`#801b1b`).
   - No generic cards, no neon gradients, no modern glassmorphism badges, and no stock illustrations.
2. **Intentional Two-Spread Pacing**:
   - **Spread 01 (Opening Spread)**: *Creates the philosophical question.* Focuses purely on typography, rhythmic cadence, and the stark contrast of choices without revealing the diagram prematurely.
   - **Spread 02 (Introduction & Rich vs Poor)**: *Reveals the K-Curve model.* Explains the divergence with interactive trajectories, side-by-side poverty statistics, and Anatole France’s classic critique on legal equality.
   - **Spreads 03–08 (Case Studies & Divergence)**: Deep-dive field observations, photographic proofs, and micro-economic breakdowns across Upper and Lower trajectories.
   - **Spread 09–10 (Epilogue & Synthesis)**: Concluding broadsheet reflection and author attribution.

---

## Colors & Material Palette

The color system is derived from traditional hot-metal letterpress printing on archival wood-pulp and rag paper:

| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `paper-base` | `#f4eee1` | Dominant warm ivory page background. |
| `paper-light` | `#faf6ed` | High-value paper tint for highlights and crisp contrast. |
| `paper-dark` | `#ece4d3` | Aged outer leaf and book edge beveling tone. |
| `paper-border`| `#dfd6c3` | Subtle 1px framing borders and structural rules. |
| `ink-primary` | `#1c1815` | Deep carbon black ink for body typography, dark buttons, and frames. |
| `ink-heading` | `#181512` | High-density ink for dominant display serif headlines. |
| `ink-secondary`| `#40382f` | Warm graphite for introductory paragraphs and lead text. |
| `ink-muted` | `#615749` | Editorial commentary, closing premises, and captions. |
| `ink-subtle` | `#786e60` | Running heads, kicker labels, and decorative accents. |
| `accent-burgundy` | `#801b1b` | Crimson editorial accent: Ribbon bookmark, pivotal quotes, and Upper/Lower split tags. |
| `accent-gold` | `#c9a86a` | Vintage foil accent: Custom halo cursor, active pagination dot, and chevron arrows. |
| `cover-leather`| `#1f1b18` | Outer book hardcover texture with leatherette shadow. |

---

## Typography & Typesetting Hierarchy

The typography pairs classical serif proportions with geometric sans-serif metadata tokens to achieve an authoritative, literary feel:

### Font Families
1. **`Playfair Display`** (Google Fonts) — Editorial Display Serif used for main headlines, emotional turning points, and oversized pull quote marks.
2. **`Lora`** (Google Fonts) — Literary Serif used for long-form case studies, pull quotes, thesis statements, and italic author attributions.
3. **`Cinzel`** (Google Fonts) — Classical Roman Inscription Serif used for book cover debossing and formal running heads.
4. **`Plus Jakarta Sans`** (Google Fonts) — Precision Geometric Sans used for kicker categories, rhythmic tags, folios, and 2×3 keyword indices.

### Typographic Hierarchy Table

| Role | Family | Size | Weight | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Cover Title** | `Cinzel` / `Playfair` | `36px` | 700 | 1.15 | `-0.01em` | Book cover frontispiece. |
| **Spread Headline** | `Playfair Display` | `30px–32px` | 700 | 1.15 | `0em` | Left page primary title (`A Journey Written in Curves`). |
| **Stacked Opener** | `Playfair Display` | `32px` | 900 | 1.05 | `-0.01em` | Right page magazine opener (`DIFFERENT ROOM TO CHOOSE`). |
| **Sub-lead Copy** | `Lora` | `13.5px` | 400 | 1.50 | `0em` | Context sentence beneath main title. |
| **Rhythmic Sequence**| `Plus Jakarta Sans` | `9.5px` | 800 | 1.00 | `0.16em` | Uppercase cadence (`WORK HARD.` · `TAKE RISKS.` · `KEEP TRYING.`). |
| **Turning Point** | `Playfair Display` | `16px` | 700 (Italic) | 1.35 | `0em` | Burgundy pivot (*“But what if the cost of trying…”*). |
| **Pull Quote** | `Lora` | `13px` | 500 (Italic) | 1.50 | `0em` | Italic inset quote with 2.5px solid ink accent rule. |
| **Running Head** | `Plus Jakarta Sans` | `9.5px` | 800 | 1.00 | `0.18em` | Top spread header (`FIELD NOTES · ENTRY 01` / `THE IDEA`). |
| **Keyword Index** | `Plus Jakarta Sans` | `10.5px` | 700 | 1.00 | `0.12em` | 2×3 metadata grid (`01 CHOICE`, `02 TIME`, etc.). |
| **Folio / Page No** | `Plus Jakarta Sans` | `10.5px` | 600 | 1.00 | `0.15em` | Bottom book pagination (`— 01 —`, `— 02 —`). |

---

## Layout & Spatial System

- **Aspect Ratio**: Standard notebook spread ratio calibrated to **`1.45 : 1`** (`max-width: 1100px`, `min-height: 640px`).
- **Gutter & Binding**: Center spine featuring a 16px sewn-binding gutter with vertical stitch perforations and dual-sided radial shadow gradients.
- **Folio Placement**: Centered at the base of every page (`— 01 —`, `— 02 —`).
- **Right Edge Margin Controls**: Recessed tactile `▲` and `▼` control tabs positioned on the right page margin for fluid step-by-step navigation.

---

## Photography & Asset Provenance

All photographic assets within this research publication are primary fieldwork artifacts:

- **Photographer & Author**: **Pranith Vincent**
- **Institutes & Field Sites**:
  - *Church Street, Bangalore*: Urban commercial interface, independent street vendors vs. retail stores.
  - *Indiranagar, Bangalore*: High-income consumer lifestyle, gourmet eateries, specialty coffee.
  - *Gram Panchayat & Sub-Urban Outskirts*: Agrarian labor, systemic barriers, and resource access.
  - *Srishti Manipal Institute of Art, Design and Technology*: Academic design research hub and studio prototyping.
- **Visual Presentation**: Framed in crisp matte borders with archival paper captions and crosshatch sketch stamps.

---

## Motion, Interactions & Audio Engine

1. **Entrance Sequence Choreography (2.7 Seconds)**:
   - Left Title fade-in (`0.1s`) → Sub-lead (`0.3s`) → Rhythmic Sequence steps (`0.6s`, `0.9s`, `1.2s`) → Burgundy Turning Point (`1.5s`) → Pull quote & Left premise (`1.8s`) → Right Stacked Opener (`1.8s–2.1s`) → Core Thesis & Keyword Index (`2.4s`) → Next Transition Button (`2.7s`).
2. **Volumetric Cloud Shader Backdrop**:
   - Raymarched GLSL fragment shader (mathematical formulation by Inigo Quilez) rendered on a background `<canvas>` behind the book, graded in subtle sepia tones to evoke atmospheric contemplation.
3. **Procedural Web Audio Ambient Soundscape**:
   - Real-time synthesised chord progressions cycling warm jazz voicings (`Dmaj9 → Bm9 → Gmaj9 → A7sus4`) with low-pass breathing sweeps (320Hz–520Hz) and pentatonic kalimba droplets.
4. **Boundary Navigation Locks**:
   - Synchronous ref tracking (`currIndexRef`) guarantees that downward scrolling on Page 10 will **never** loop back to Page 1, reserving restart actions exclusively for explicit user clicks.

---

## Do’s and Don’ts

### Do’s
- ✅ Keep the ivory paper and ink contrast razor sharp.
- ✅ Maintain generous breathing room and typographic hierarchy instead of enclosing everything in box cards.
- ✅ Use burgundy (`#801b1b`) sparingly for emotional pivot points and critical divide callouts.
- ✅ Attribute all fieldwork photography to Pranith Vincent.

### Don’ts
- ❌ Do NOT reveal the visual K-Curve diagram on Spread 01 (Spread 01 must create the curiosity; Spread 02 reveals the diagram).
- ❌ Do NOT use bright primary colors (electric blue, neon purple, lime green).
- ❌ Do NOT use generic SaaS UI elements (glassmorphism cards, glowing pill badges, gradient borders).
- ❌ Do NOT allow automated scroll-looping past the final reflection page.
