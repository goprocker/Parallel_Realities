# The K-Shaped Divide — Interactive Field Notes & Anthology

> A tactile, interactive digital notebook exploring the K-shaped economic divide in urban India. Built as an open hardcover book interface with 10 navigable spreads, original field photography, procedural ambient audio, and a GLSL cloud shader backdrop.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Credits](#credits)
- [Live Preview](#live-preview)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [File Structure](#file-structure)
- [Page Map (10 Spreads)](#page-map-10-spreads)
- [Typography System](#typography-system)
- [Color Palette](#color-palette)
- [Key Components](#key-components)
- [Audio Engine](#audio-engine)
- [Cloud Shader Background](#cloud-shader-background)
- [Navigation & Interaction Model](#navigation--interaction-model)
- [Photography & Assets](#photography--assets)
- [Design Specification](#design-specification)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)

---

## About the Project

**The K-Shaped Divide** is a research-driven interactive web publication that visualises socio-economic stratification through the metaphor of a K-shaped recovery curve. Rather than presenting data in charts and spreadsheets, it wraps the entire experience inside a realistic open hardcover notebook — complete with ivory pages, a sewn-binding gutter, gilded page edges, a silk crimson ribbon bookmark, and hand-set editorial typography.

The publication contains four original case studies drawn from fieldwork in Bangalore (Church Street, Indiranagar, Srishti Manipal campus, and Gram Panchayat settlements), exploring how wealth shapes not what people buy, but how much room they have to choose, fail, and try again.

---

## Credits

| Role | Person |
| :--- | :--- |
| **Research, Content, Design Direction & Photography** | **Pranith Vincent** — Srishti Manipal Institute of Art, Design & Technology (2026) |
| **Code, Development & Technical Architecture** | **Gopinath** |

- All photographs in the publication are original fieldwork artifacts captured by **Pranith Vincent**.
- The conceptual framework, written essays, editorial layout direction, and case study narratives are authored by **Pranith Vincent**.
- The codebase — React components, CSS architecture, GLSL shader, Web Audio engine, SVG diagrams, scroll mechanics, and all technical implementation — is engineered by **Gopinath**.

---

## Tech Stack

| Layer | Technology | Version |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `16.2.6` |
| **UI Library** | [React](https://react.dev/) | `19.2.6` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.9.3` |
| **Styling** | Vanilla CSS (no Tailwind in production) | — |
| **Fonts** | Google Fonts (Playfair Display, Lora, Cinzel, Plus Jakarta Sans) | — |
| **Graphics** | Raw SVG, WebGL / GLSL Fragment Shaders | — |
| **Audio** | Web Audio API (procedural synthesis, no audio files) | — |
| **Build Tool** | Turbopack (via Next.js) | — |
| **Deployment** | Vercel | — |
| **Node** | `22.x` | — |

**Zero external UI libraries.** No component libraries, no animation frameworks, no charting libraries. Every visual element — the book interface, K-curve SVG, animated entrance sequences, ambient audio, and volumetric clouds — is built from scratch.

---

## Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser / Client                     │
├──────────┬──────────┬────────────┬───────────────────────┤
│  Next.js │  React   │   Vanilla  │  WebGL + Web Audio    │
│  App     │  19      │   CSS      │  APIs                 │
│  Router  │          │            │                       │
├──────────┴──────────┴────────────┴───────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  page.tsx     │  │ CloudShader     │  │ ambientAudio│ │
│  │  (1106 lines) │  │ Background.tsx  │  │ .ts         │ │
│  │              │  │ (GLSL Shader)   │  │ (Web Audio) │ │
│  │  • 10 Pages  │  └─────────────────┘  └─────────────┘ │
│  │  • State Mgmt│                                       │
│  │  • Navigation│  ┌─────────────────┐  ┌─────────────┐ │
│  │  • Layouts   │  │ IntroKDiagram   │  │ CustomCursor│ │
│  │  • Copy/Text │  │ .tsx (SVG)      │  │ .tsx        │ │
│  └──────────────┘  └─────────────────┘  └─────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │                 globals.css (2450+ lines)             ││
│  │  • Book chrome (cover, spine, gutter, ribbon)        ││
│  │  • Page typography & editorial hierarchy             ││
│  │  • K-curve SVG styling & animation                   ││
│  │  • Article cards & pull quotes                       ││
│  │  • Entrance choreography keyframes                   ││
│  │  • Opening magazine spread styles                    ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Single-Page Application**: The entire 10-spread book lives in one `page.tsx` client component. No routing — page transitions are state-driven with CSS animations.
2. **No Runtime Dependencies**: Zero npm packages for UI, animation, or audio. Everything is hand-written against browser APIs.
3. **Physicality Over Interface**: The book metaphor is maintained throughout — leather cover, paper texture, folio numbers, running heads, binding stitches — so the reader forgets they are in a browser.

---

## File Structure

```
pranith/
├── app/
│   ├── page.tsx                     # Main application (10-spread book, state, navigation, layouts)
│   ├── layout.tsx                   # Root layout with metadata and font loading
│   ├── globals.css                  # Complete design system (2450+ lines of hand-written CSS)
│   ├── components/
│   │   ├── CloudShaderBackground.tsx # WebGL GLSL raymarched volumetric cloud shader
│   │   ├── CustomCursor.tsx          # Gold halo cursor with magnetic hover detection
│   │   └── IntroKDiagram.tsx         # Interactive explanatory K-shaped SVG diagram
│   └── utils/
│       └── ambientAudio.ts           # Procedural Web Audio API ambient soundscape
├── public/
│   ├── favicon.svg
│   └── pics/                         # Original field photography by Pranith Vincent
│       ├── abhimanyu.png             # Case 01: Freedom to Choose
│       ├── brikoven.png              # Case 02: Can Afford to Fail
│       ├── churchstreet.jpg          # Case 03: Child Labour on Church Street
│       ├── povertyloop.png           # Case 04: The Poverty Loop
│       ├── newspaper_intro.png       # Print broadsheet: Introduction spread
│       ├── newspaper_upper_k.png     # Print broadsheet: Upper K spread
│       ├── newspaper_lower_k.png     # Print broadsheet: Lower K spread
│       └── 1.jpeg                    # Additional fieldwork photo
├── DESIGN.md                         # Full design specification (tokens, typography, colors)
├── package.json                      # Dependencies and scripts
├── next.config.ts                    # Next.js configuration (output: dist/)
├── vercel.json                       # Vercel deployment config
├── tsconfig.json                     # TypeScript configuration
└── eslint.config.mjs                 # ESLint configuration
```

---

## Page Map (10 Spreads)

The book contains 10 double-page spreads, each with a left and right panel:

| # | Page Kind | Left Page | Right Page |
| :--- | :--- | :--- | :--- |
| **01** | `home` | Editorial opener: headline, rhythmic sequence, turning point, pull quote | Magazine opener: stacked typography, keyword index, "NEXT: THE K-CURVE →" |
| **02** | `intro` | Anatole France quote, stats (poverty/hunger), "Explore the Divide" CTA | Interactive K-Diagram (SVG with hover states and navigation) |
| **03** | `upper` | Upper Curve explanation and navigation guide | Interactive SVG K-Curve (ascending trajectory with 4 clickable nodes) |
| **04** | `article` | Photo card: Abhimanyu at his drawing desk | Case Study 01: "Freedom to Choose" (essay with pull quote) |
| **05** | `article` | Photo card: Brik Oven storefront | Case Study 02: "Can Afford to Fail" (essay with pull quote) |
| **06** | `lower` | Lower Curve explanation and navigation guide | Interactive SVG K-Curve (descending trajectory with 4 clickable nodes) |
| **07** | `article` | Photo card: Church Street vendors | Case Study 03: "Child Labour from Church Street" (essay with pull quote) |
| **08** | `article` | Photo card: Panchayat welfare | Case Study 04: "The Poverty Loop" (essay with pull quote) |
| **09** | `print_spread_1` | Broadsheet newspaper scan: Untold Stories | Broadsheet newspaper scan: The Upper K |
| **10** | `print_spread_2` | Broadsheet newspaper scan: The Lower K | Epilogue: "Until The Next Page" with author credits |

---

## Typography System

Four Google Fonts create the editorial hierarchy:

| Font | Role | Where Used |
| :--- | :--- | :--- |
| **Playfair Display** | Editorial display serif | Main headlines, emotional turning points, stacked opener titles |
| **Lora** | Literary body serif | Case study essays, pull quotes, thesis statements, closing premises |
| **Cinzel** | Classical inscription serif | Book cover debossing, formal title treatments |
| **Plus Jakarta Sans** | Geometric sans-serif | Kicker labels, running heads, folios, keyword indices, meta-badges |

### Hierarchy (Largest → Smallest)

1. `32px` — Stacked magazine opener (Playfair, weight 900)
2. `30px` — Spread editorial headline (Playfair, weight 700)
3. `16px` — Emotional turning point (Playfair, italic, weight 700, burgundy)
4. `14.5px` — Core thesis lead (Playfair, weight 700)
5. `13.5px` — Body lead / pull quotes (Lora, weight 400–500)
6. `12px` — Thesis body / closing statements (Lora, weight 400)
7. `10.5px` — Keyword index / folios (Plus Jakarta Sans, weight 600–700)
8. `9.5px` — Running heads / rhythmic tags (Plus Jakarta Sans, weight 800)

---

## Color Palette

The palette is derived from letterpress printing on archival paper:

| Swatch | Hex | Name | Usage |
| :--- | :--- | :--- | :--- |
| 🟫 | `#f4eee1` | Paper Base | Page background |
| 🟫 | `#faf6ed` | Paper Light | Highlight tint |
| ⬛ | `#1c1815` | Ink Primary | Body text, dark buttons |
| ⬛ | `#181512` | Ink Heading | Display headlines |
| 🟤 | `#40382f` | Ink Secondary | Lead paragraphs |
| 🟤 | `#615749` | Ink Muted | Captions, citations |
| 🔴 | `#801b1b` | Burgundy | Ribbon bookmark, pivotal quotes, accent |
| 🟡 | `#c9a86a` | Gold | Custom cursor halo, active pagination, chevrons |
| ⬛ | `#1f1b18` | Cover Leather | Hardcover outer shell |

---

## Key Components

### `page.tsx` — Core Application (1106 lines)

The entire book lives in a single client component:

- **State management**: `useState` for page index, direction, book open/close, and audio toggle.
- **`pages[]` array**: 10 `PageData` objects defining each spread's kind, content, kicker, title, subtitle, and optional article data (paragraphs, quotes, images).
- **`Curve` component**: Inline SVG with 4 clickable nodes along a cubic Bézier path for Upper/Lower K-curve navigation.
- **`renderCopyPanel()`**: Renders the left-page editorial text based on `kind` (home, intro, article, upper, lower, etc.).
- **`renderHomeRightPanel()`**: Renders the bold magazine opener right page for Spread 01.
- **`renderVisualCard()`**: Renders article photo cards with matte borders and crosshatch fallback.
- **Scroll/touch/keyboard handlers**: `useEffect` with `wheel`, `touchstart/touchend`, and `keydown` listeners with 700ms debounce cooldown.
- **Boundary lock**: `currIndexRef` (synchronous ref) prevents scrolling past Page 10 or before Page 1.

### `CloudShaderBackground.tsx` — GLSL Volumetric Clouds

A WebGL fragment shader rendering raymarched volumetric clouds behind the book:

- Uses `requestAnimationFrame` for continuous rendering.
- Custom FBM (Fractal Brownian Motion) noise for cloud density.
- Sepia-graded color output matching the book's warm tone.
- Based on mathematical formulations by Inigo Quilez.

### `IntroKDiagram.tsx` — Interactive K-Curve Explanation

An explanatory SVG diagram for Spread 02 (Introduction page):

- 3 milestone labels per branch (Upper: Opportunity → Education → Security; Lower: Limited Access → Unstable Work → Debt).
- Concentric intersection origin labelled "SAME SOCIETY / Different trajectories."
- Interactive hover: highlighting one branch dims the other.
- Click-to-navigate badges linking directly to case study pages.

### `CustomCursor.tsx` — Gold Halo Cursor

A custom cursor rendered via `requestAnimationFrame`:

- Smooth `lerp` tracking (0.15 interpolation factor).
- Gold ring (`#c9a86a`) with scale-up on interactive element hover.
- Native cursor hidden via CSS `cursor: none`.

---

## Audio Engine

`ambientAudio.ts` provides a procedural ambient soundscape with zero audio files:

- **Chord progression**: `Dmaj9 → Bm9 → Gmaj9 → A7sus4` cycling every ~4 seconds.
- **Dual oscillators**: Per voice with ±3.5 cents detuning for stereo chorus warmth.
- **Low-pass filter**: Breathing sweeps between 320Hz and 520Hz.
- **Pentatonic chimes**: Random kalimba-style droplets through a warm 0.42s stereo delay.
- **Toggle control**: User can enable/disable from the book UI (🔇/🔊 button).

All synthesis uses the native Web Audio API — no external audio libraries or mp3/wav files.

---

## Cloud Shader Background

The atmospheric cloud backdrop uses a GLSL fragment shader compiled and rendered on a full-screen `<canvas>`:

- **Technique**: Raymarching through a volumetric density field.
- **Noise**: Multi-octave FBM (Fractal Brownian Motion) creating organic cloud formations.
- **Color grading**: Warm sepia tones (`#f4eee1` family) to integrate with the book's paper aesthetic.
- **Performance**: Runs at display refresh rate via `requestAnimationFrame`. The canvas is positioned behind the book with `z-index: 0`.

---

## Navigation & Interaction Model

Users navigate the book through multiple input methods:

| Input | Action |
| :--- | :--- |
| **Mouse wheel** (scroll down) | Next page (with 700ms debounce) |
| **Mouse wheel** (scroll up) | Previous page |
| **Touch swipe** (up) | Next page |
| **Touch swipe** (down) | Previous page |
| **Arrow keys** (→ / ↓) | Next page |
| **Arrow keys** (← / ↑) | Previous page |
| **Escape** | Close book (return to cover) |
| **▲ / ▼ margin tabs** | Previous / Next page |
| **Pagination dots** | Jump to any spread |
| **K-curve nodes** | Jump to specific case study |
| **"NEXT: THE K-CURVE →"** | Navigate from Spread 01 to Spread 02 |
| **"Restart journey ↺"** | Return to Spread 01 from the epilogue |

### Boundary Enforcement

- **Last page (Spread 10)**: Scrolling down is strictly blocked. The user must click "Restart journey ↺" to return to the beginning.
- **First page (Spread 01)**: Scrolling up is blocked.
- Implementation uses a synchronous `useRef` (`currIndexRef`) to avoid stale-closure issues in event handlers.

---

## Photography & Assets

**All photographs are original fieldwork artifacts captured by Pranith Vincent.**

| File | Subject | Location |
| :--- | :--- | :--- |
| `abhimanyu.png` | Abhimanyu at his drawing desk | Srishti Manipal Institute |
| `brikoven.png` | Brik Oven storefront & wood-fired oven | Indiranagar, Bangalore |
| `churchstreet.jpg` | Street vendors and perception of poverty | Church Street, Bangalore |
| `povertyloop.png` | Panchayat welfare & systemic gaps | Gram Panchayat, Bangalore |
| `newspaper_intro.png` | SMI broadsheet: introduction spread | Studio print |
| `newspaper_upper_k.png` | SMI broadsheet: upper K spread | Studio print |
| `newspaper_lower_k.png` | SMI broadsheet: lower K spread | Studio print |
| `1.jpeg` | Additional fieldwork photography | Bangalore |

---

## Design Specification

A complete machine-readable design specification exists at [`DESIGN.md`](./DESIGN.md) in the project root. It contains:

- YAML design tokens (colors, typography, spacing, rounded corners, components)
- Typographic hierarchy table
- Color palette with semantic roles
- Layout & spatial system
- Motion choreography timeline
- Do's and Don'ts

---

## Getting Started

### Prerequisites

- **Node.js** `22.x`
- **npm** (bundled with Node)

### Installation

```bash
git clone https://github.com/goprocker/pranith.git
cd pranith
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Start Next.js development server with hot reload |
| `build` | `npm run build` | Create optimised production build (output: `dist/`) |
| `start` | `npm start` | Serve the production build locally |
| `lint` | `npm run lint` | Run ESLint across the codebase |

---

## Deployment

The project is configured for deployment on **Vercel**:

```json
{
  "framework": "nextjs"
}
```

Push to `main` branch triggers automatic deployment via Vercel's GitHub integration.

---

## License

- **Code**: Engineered by **Gopinath**. All rights reserved.
- **Content, Research & Photography**: © 2026 **Pranith Vincent**. All photographs, essays, and editorial content are the intellectual property of the author. All rights reserved.
- **Cloud Shader Mathematics**: Based on formulations by Inigo Quilez (educational reference).
