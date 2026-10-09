---
name: Clarity Flow
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#950029'
  on-tertiary: '#ffffff'
  tertiary-container: '#c20038'
  on-tertiary-container: '#ffd0d2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b6'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920028'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 41px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-tablet: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system embodies an iOS-native modern minimalist philosophy crafted for high-performance personal productivity. Designed to evoke effortless focus, calm control, and tactile delight, it clears cognitive overhead through pristine surface separation and scrupulous typographic hierarchy.

Rooted in modern iOS human-centric aesthetics, the aesthetic fuses precision functional minimalism with gentle spatial depth. Interface elements leverage iOS continuous curvature (squircles), disciplined white space, and purposeful chromatic anchors to make complex task queues feel lightweight and actionable.

## Colors

The palette is engineered around high legibility, clean spatial layers, and rapid categorical triage.

### Surface Hierarchy
- **Canvas Base**: `#F8FAFC` (Slate 50) provides an anti-glare, calm backdrop that lets active cards breathe.
- **Surface Layer**: `#FFFFFF` (Pure White) serves as the elevated task container layer.
- **Subtle Stroke**: `#E2E8F0` (Slate 200) defines crisp, low-contrast structural boundaries without visual clutter.

### Typographic Hierarchy
- **Primary Text**: `#0F172A` (Slate 900) for screen titles, active task titles, and primary metrics.
- **Secondary Text**: `#334155` (Slate 700) for supporting subheaders and modal content.
- **Tertiary / Placeholder Text**: `#64748B` (Slate 500) for timestamps, metadata, and placeholder copy.

### Action & Accents
- **Primary Accent**: `#4F46E5` (Electric Indigo) drives key conversion items, Floating Action Buttons (FAB), completed checkbox fills, and active bottom navigation states.
- **Secondary Accent**: `#3B82F6` (Royal Blue) indicates interactive links, selected filter chips, and progress indicators.

### Semantic Priority Tokens
- **Priority High**: Background `#FEE2E2` (Rose 100), Border `#FECDD3` (Rose 200), Label `#E11D48` (Rose 600).
- **Priority Medium**: Background `#FEF3C7` (Amber 100), Border `#FDE68A` (Amber 200), Label `#D97706` (Amber 600).
- **Priority Low**: Background `#DCFCE7` (Emerald 100), Border `#BBF7D0` (Emerald 200), Label `#16A34A` (Emerald 600).

## Typography

Inter mirrors the neutral clarity, geometric rhythm, and optical weights of Apple's system font architecture.

- Use `headline-xl` (and `headline-xl-mobile`) exclusively for large collapsible navigation titles.
- Use `headline-sm` for card titles, task names, and modal view headers.
- Use `body-md` for standard list body contents, descriptive metadata, and inputs.
- Use `label-md` and `label-sm` with tight letter tracking for priority badges, status indicators, and category tags.
- Cross-platform fallbacks must point to `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display"`.

## Layout & Spacing

This layout adheres strictly to an 8pt baseline system, scaling down to 4pt micro-steps for compact control components.

- **Mobile Canvas**: 4-column fluid layout with `16px` outer horizontal margins and `12px` interior gutters. Top and bottom areas respect iOS safe areas (minimum 44px top header, 34px bottom home indicator clearance).
- **Tablet & Split-View**: 8-column layout with `24px` margins and `16px` gutters. Adapts dynamically to master-detail column splits (320px sidebar list alongside dynamic inspection panel).
- **Desktop / Web Preview**: 12-column layout maxing out at `1024px` content width with `32px` margins to maintain comfortable scanning lines for task items.

## Elevation & Depth

Visual hierarchy uses ultra-soft ambient light to create subtle tactile separation, avoiding heavy drops.

- **Level 0 (Flat Canvas)**: `#F8FAFC`, no shadow, base background.
- **Level 1 (Resting Card / Tile)**: `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Active / Hover / Dragging Task)**: `#FFFFFF`, border `1px solid rgba(79, 70, 229, 0.15)`, shadow `0 8px 16px -4px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Modals / Action Sheets / Floating Action Button)**: `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)`.
- **Level 4 (Floating Bottom Navigation Bar)**: Background `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(20px)`, top border `1px solid rgba(226, 232, 240, 0.8)`.

## Shapes

The interface embraces Apple-standard continuous corner squircle curves to balance structure with soft tactility.

- **Base Radius (`0.5rem` / 8px)**: Used for small tags, priority badges, and micro checkboxes.
- **Large Radius (`1rem` / 16px)**: Used for task row cards, form inputs, segmented view controls, and interactive category pills.
- **Extra Large Radius (`1.5rem` / 24px)**: Used for task detail sheets, bottom modal dialogs, and primary floating action buttons.
- **Full Radius (Pill / 9999px)**: Reserved for primary tap action pills and circular status toggles.

## Components

### Task Row Cards
- Structure: Surface `#FFFFFF`, border `1px solid #E2E8F0`, border radius `16px`, internal padding `12px 16px`.
- Layout: Checkbox aligned left, title and category metadata stacked centered, priority badge right-aligned.
- Completed State: Text switches to `#64748B` with a strike-through; card opacity transitions to `0.7`.

### Checkboxes
- Size: 22px × 22px squircle (radius 7px).
- Unchecked: 1.5px solid border `#CBD5E1`, background `transparent`.
- Checked: Fill `#4F46E5`, border `#4F46E5`, displaying a crisp white centered check icon with an iOS-style spring scale animation.

### Buttons & CTAs
- **Primary Button**: Background `#4F46E5`, text `#FFFFFF` (`label-md`), height `48px`, radius `14px`, shadow `0 4px 12px rgba(79, 70, 229, 0.25)`. Pressed state scales down to `0.98`.
- **Secondary Button**: Background `#F1F5F9`, text `#334155`, height `48px`, radius `14px`. Pressed state transitions to `#E2E8F0`.

### Priority Badges
- Fixed height `22px`, horizontal padding `8px`, corner radius `6px`.
- High: `#FEE2E2` fill, `#E11D48` text (`label-sm`).
- Medium: `#FEF3C7` fill, `#D97706` text (`label-sm`).
- Low: `#DCFCE7` fill, `#16A34A` text (`label-sm`).

### Category Pills
- Height `32px`, horizontal padding `12px`, corner radius `16px`.
- Inactive: Background `#F1F5F9`, text `#475569`, border `1px solid #E2E8F0`.
- Active: Background `#EEF2FF`, text `#4F46E5`, border `1px solid #C7D2FE`.

### Input Fields
- Height `48px`, background `#FFFFFF`, border `1px solid #E2E8F0`, radius `12px`, padding `0 14px`, typography `body-md`. Focus state uses border `#4F46E5` and outer glow `0 0 0 3px rgba(79, 70, 229, 0.12)`.