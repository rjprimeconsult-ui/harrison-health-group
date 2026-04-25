# Harrison Health Group — Design Brainstorm

## Brand Context
Health insurance brokerage. Tier-level luxury website (like Prime Health Consultants).
Color palette: **White, Purple, Black**. No web form yet. Blank team flip cards (headshots pending).

---

<response>
<probability>0.07</probability>
<text>

## Idea A — "Dark Velvet Authority"

**Design Movement:** Dark Luxury Minimalism meets Architectural Brutalism

**Core Principles:**
1. Deep black backgrounds with rich purple as the sole accent — no competing hues
2. Asymmetric section layouts — content bleeds to edges, never centered-box
3. Typography as architecture — oversized display text creates structural columns
4. Restraint as luxury — generous negative space signals premium positioning

**Color Philosophy:**
- Background: Near-black `#0A0A0F` — not pure black, has a subtle purple undertone
- Primary Purple: `#7C3AED` (Violet-600) — electric, confident
- Accent Purple: `#A78BFA` (Violet-400) — for glows and highlights
- White: Pure `#FFFFFF` for text on dark surfaces
- Glass surfaces: `rgba(124, 58, 237, 0.08)` — purple-tinted glass cards
- Borders: `rgba(167, 139, 250, 0.15)` — barely visible purple outlines

**Layout Paradigm:**
- Full-bleed sections with diagonal clip-path cuts between sections
- Hero: Left-weighted text column (60%) + right floating glass card (40%)
- Team section: Horizontal scroll on mobile, asymmetric masonry on desktop
- Stats: Full-width horizontal band with large numerals

**Signature Elements:**
1. Purple gradient orbs (blurred, 800px diameter) floating behind content as ambient light
2. Thin purple horizontal rule lines as section dividers with animated width-grow on scroll
3. Glass morphism cards with `backdrop-filter: blur(20px)` and purple border glow

**Interaction Philosophy:**
- Hover states reveal purple glow beneath cards
- CTA buttons have a liquid fill animation on hover (purple floods from bottom)
- Scroll-triggered reveals use a clip-path wipe rather than fade-up

**Animation:**
- Hero headline: Letter-by-letter reveal with 0.03s stagger
- Section entries: Clip-path wipe from left (0% → 100%)
- Ambient orbs: Slow drift (60s loop, subtle scale pulse)
- Button hover: `background-position` shift on gradient

**Typography System:**
- Display: **Cormorant Garamond** — editorial, authoritative, luxury serif
- Body: **DM Sans** — clean, modern, highly legible
- Accent labels: **DM Mono** — small caps tracking for section labels

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B — "White Marble Prestige"

**Design Movement:** Neo-Luxury Editorial — inspired by high-end financial branding (BlackRock, Fidelity Private Wealth)

**Core Principles:**
1. White-dominant canvas with black typography — purple used sparingly as a power accent
2. Editorial grid — content follows a strict 12-column newspaper-style layout
3. Contrast through scale — massive headline numerals against small body text
4. Tactile texture — subtle paper/grain texture on white sections for depth

**Color Philosophy:**
- Background: Off-white `#FAFAF9` — warmer than pure white, feels premium
- Deep Black: `#0D0D0D` — near-black for headings and footer
- Royal Purple: `#5B21B6` (Violet-800) — used only for CTAs and key accents
- Light Purple: `#EDE9FE` (Violet-100) — section background tints
- Border: `#E5E7EB` — light gray for structure

**Layout Paradigm:**
- Light sections alternate with black sections (no purple backgrounds)
- Hero: Full-width with large centered serif headline + purple underline accent
- Team cards: Grid with white cards, black borders, purple hover state
- Stats: Black band with white numbers

**Signature Elements:**
1. Purple underline accents on key words in headlines (animated draw-in)
2. Black-and-white photography treatment for team photos (when added)
3. Thin grid lines as decorative background texture

**Interaction Philosophy:**
- Minimal motion — transitions are purposeful, not decorative
- Purple reveals on hover (border color change, text color shift)
- Smooth section transitions via opacity + slight scale

**Animation:**
- Headlines: Word-by-word fade-up with 0.06s stagger
- Cards: Subtle lift (y: -6px) on hover
- Purple accents: Draw-in via SVG stroke-dashoffset animation

**Typography System:**
- Display: **Playfair Display** — classic prestige serif
- Body: **Inter** — clean and professional
- Labels: **Inter** with wide letter-spacing, uppercase, small size

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea C — "Midnight Gradient Luxury" ✅ SELECTED

**Design Movement:** Premium Dark Gradient — inspired by luxury SaaS and fintech (Stripe, Linear, Vercel)

**Core Principles:**
1. Deep black-to-dark-purple gradient canvas — immersive, cinematic depth
2. Purple as the primary brand color — used for CTAs, highlights, and glows
3. White text hierarchy — pure white for headlines, 70% opacity for body
4. Layered depth — multiple z-layers of blur, glow, and glass create dimensionality

**Color Philosophy:**
- BG Primary: `#08080E` — deepest black with purple undertone
- BG Secondary: `#110D1E` — dark purple-black for alternating sections
- BG Accent: `#1A1033` — mid-dark purple for card backgrounds
- Purple Primary: `#8B5CF6` (Violet-500) — main brand purple
- Purple Bright: `#A78BFA` (Violet-400) — hover states, glows
- Purple Deep: `#6D28D9` (Violet-700) — gradients, depth
- White: `#FFFFFF` — primary text
- White Muted: `rgba(255,255,255,0.65)` — secondary text
- Border: `rgba(139, 92, 246, 0.2)` — purple-tinted borders
- CTA Green: `#22C55E` — sticky call button only (universal conversion color)

**Layout Paradigm:**
- Full-viewport hero with parallax background and floating glass form placeholder
- Diagonal clip-path section transitions (alternating directions)
- Team section: 3-column grid of flip cards with purple glow on hover
- Stats: Full-width dark band with animated count-up numbers
- Asymmetric "Why Us" — 3 cards in a staggered offset grid

**Signature Elements:**
1. Large ambient purple gradient orbs (radial, blurred) as background atmosphere
2. Glass morphism cards: `backdrop-filter: blur(16px)`, purple border, subtle inner glow
3. Animated purple gradient border on CTA buttons (rotating conic-gradient)

**Interaction Philosophy:**
- Every interactive element has a purple glow response
- Flip cards use 3D perspective transform (rotateY 180deg)
- Buttons use spring physics for hover/tap feedback

**Animation:**
- Hero: Ken Burns drift (28s) + light streak sweep (14s repeat)
- Headlines: Word-by-word stagger reveal (0.08s/word)
- Section entries: FadeUp with spring easing
- Orbs: Slow drift + scale pulse (40s loop)
- Marquee: Infinite CSS scroll (28s)

**Typography System:**
- Display: **Cormorant Garamond** (700) — editorial luxury serif for H1/H2
- Subheadings: **DM Sans** (600) — modern, clean
- Body: **DM Sans** (400) — highly legible
- Labels/Tags: **DM Mono** — monospace for section labels and stats

</text>
</response>

---

## Selected Design: **Idea C — "Midnight Gradient Luxury"**

Deep black-to-purple canvas, glass morphism cards, Cormorant Garamond display type, ambient orb atmosphere, and spring-physics interactions. Every section reinforces premium positioning for Harrison Health Group.
