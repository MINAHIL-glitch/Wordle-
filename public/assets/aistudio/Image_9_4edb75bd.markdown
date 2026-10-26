---
name: Luminous Wordplay
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#9699ff'
  on-tertiary-container: '#1d17b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  tile-correct: '#10B981'
  tile-present: '#F59E0B'
  tile-absent: '#334155'
  tile-empty: '#1E293B'
  tile-border: '#475569'
  key-bg: '#334155'
  glow-success: '#34D399'
  candy-pink: '#EC4899'
  surface-card: '#1E293B'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  tile-letter:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 32px
  keyboard-letter:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system crafts an electric, polished, and tactile gaming environment tailored for daily puzzle enthusiasts who appreciate high visual finesse. The aesthetic fuses tactile modernism with playful, glowing arcade elements—pairing deep, immersive dark surfaces with lush, candy-like feedback states.

The design identity avoids flat, clinical utilitarianism in favor of dimensional micro-surfaces, soft neon underglows, and bouncy, spring-based interactive states. The emotional target is immediate delight, mental clarity, and satisfying dopamine-rich reward sequences during play.

## Colors

The foundation is rooted in midnight slate and deep indigo (`#0F172A`), providing an infinite-depth canvas that elevates chromatic contrast without straining eyes during prolonged gameplay. 

- **Primary (`#10B981`)**: Rich emerald green dedicated to correct tile confirmations, win state sequences, and primary celebratory triggers.
- **Secondary (`#F59E0B`)**: Radiant amber-tangerine indicating present/displaced letters and bonus streak multipliers.
- **Tertiary (`#6366F1`)**: Electric violet-indigo used for specialty progression badges, power-ups, and interactive settings toggles.
- **Neutral (`#0F172A`)**: The deep navy core canvas supporting multiple layered tiers: slate-800 (`#1E293B`) for elevated cards/keyboards and slate-700 (`#334155`) for inactive input surfaces.
- **Candy Accents**: Pulsing pinks (`#EC4899`) and emerald glows (`#34D399`) inject festive arcade energy into victory screens and high-score celebrations.

## Typography

Typography relies entirely on **Plus Jakarta Sans** for its balanced blend of clean geometric construction, wide apertures, and friendly rounded characteristics. Letter tiles utilize extra-bold weights (`800`) to guarantee instant legibility at quick glances and during dynamic flip transitions. 

Stat counters and game badges leverage tightened uppercase letterforms with positive tracking (`0.05em` to `0.08em`) to mimic polished arcade scoreboards.

## Layout & Spacing

Layouts are architected around a mobile-first, vertical viewport lock. 

- **Game Canvas**: On mobile screens, the letter matrix dynamically scales to fit within the viewport height, maintaining 6px to 8px gap spacing between tiles. The total layout max-width restricts to 480px on tablet and desktop screens, centering the playboard gracefully with soft peripheral gutters.
- **Rhythm & Touch Targets**: Spacing between interactive rows strictly observes 4px to 6px margins on the virtual keyboard to prevent mis-taps while maximizing reachability. Modal dialogs and stat summaries utilize `space-lg` (`1.25rem`) inner padding to maintain airy clarity.

## Elevation & Depth

Visual hierarchy blends tactile button physics with radiant colored back-lighting:

- **Game Tiles (Default)**: Flat deep-navy background framed with a 2px semi-translucent stroke (`#475569`). On active input, pop with a 0 0 16px glow matching the tile border.
- **Game Tiles (Flipped/Resolved)**: Subtle 2px bottom bevel highlight combined with a gentle color-tinted dropped shadow (`0 8px 20px -4px rgba(16, 185, 129, 0.35)` for correct emerald tiles; `0 8px 20px -4px rgba(245, 158, 11, 0.35)` for amber tiles).
- **Tactile Keys & Buttons**: Solid bottom borders (3px extrusion effect) that depress 2px on tap/click to create immediate physical responsiveness.
- **Modals & Overlays**: Translucent backdrop blur (`backdrop-blur-md` over `rgba(15, 23, 42, 0.85)`) paired with high-tier floating surfaces bordered by micro-gradient strokes.

## Shapes

The interface embraces organic, bouncy pill-and-squircle aesthetics matching standard mobile hit puzzle ergonomics. 

- Game tiles use `rounded-lg` (0.75rem / 12px) to feel friendly and punchy.
- Virtual keyboard keys feature `rounded-md` (0.5rem / 8px) geometry for clear tactile separation.
- Modal panels and completion summary cards use large, welcoming contours (`rounded-xl`, 1.5rem / 24px).
- Streak counters, category badges, and pill tags use fully circular caps (`rounded-full`).

## Components

### Letter Tiles (Board Matrix)
- **Dimensions**: Aspect-ratio 1:1, auto-scaling up to a maximum of 64px × 64px.
- **States**:
  - *Empty*: Border 2px solid `#334155`, surface transparent.
  - *Pop/Active*: Border 2px solid `#94A3B8`, scale 1.05 transform with subtle bounce.
  - *Correct*: Solid background `#10B981`, white text, 3D bottom bevel, 0 4px 14px emerald glow.
  - *Present*: Solid background `#F59E0B`, white text, 3D bottom bevel, 0 4px 14px amber glow.
  - *Absent*: Solid background `#334155`, muted text `#94A3B8`, borderless.

### Tactile Keyboard
- Key buttons feature minimum 48px height for accessibility.
- Styled in dark slate `#334155` with a 3px simulated lower depth edge (`#1E293B`).
- Synchronize real-time color states with the board results: keys dynamically fill with emerald, amber, or dimmed slate once revealed.

### Action Buttons
- **Primary Play Button**: Emerald gradient fill (`#10B981` to `#059669`), extra-bold text, 3px depth extrusion, scale-95 press state with haptic spring feel.
- **Secondary / Share**: Frosted slate with subtle indigo sheen and pill contours.

### Daily Streak & Stat Badges
- Encapsulated pills featuring mini flame or star glyphs, `#F59E0B` text on `rgba(245, 158, 11, 0.12)` backgrounds, bordered by glowing 1px amber outlines.

### Modals & Dialogs
- Centered cards with subtle glassmorphic top headers, stat histogram bars featuring vibrant emerald progress tracks, and high-contrast numerical readouts.