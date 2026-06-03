# Design System: Auto AS

## 1. Visual Theme & Atmosphere
A dark, high-density, technical cockpit-style interface designed for automotive enthusiasts and everyday drivers alike. The layout is asymmetric and offset (Variance 8, Motion 6, Density 7) to avoid typical templated structures. The aesthetic feels premium and tactile—incorporating matte finishes, micro-borders, and subtle hardware-inspired physics.

The interface leverages high-contrast typography, structural grid borders, and deep canvas backdrops to establish strong visual hierarchy without rely on excessive color.

---

## 2. Color Palette & Roles
All surfaces are calibrated to maintain a unified, dark-mode technical ecosystem.

*   **Jet Black** (`#060709`) — Absolute deepest base, used for margins, outer canvas edges, and high-contrast letterboxing.
*   **Dark Obsidian** (`#0D1117`) — Primary background surface for content containers and page sections.
*   **Deep Navy Slate** (`#161C24`) — Elevated panels, bento cards, and interactive component backgrounds.
*   **Graphene Border** (`#24272C`) — 1px tactical borders, grid lines, and input field boundaries.
*   **Muted Steel Blue** (`#5C93B4`) — Secondary typography, subheaders, and helper states.
*   **Refined Cyber Blue** (`#1A80E6`) — Single brand accent for focus states, primary actions, and active markers (calibrated below 80% saturation to avoid generic AI neon glow).
*   **Pure White** (`#FFFFFF`) — High-contrast headlines and primary labels.
*   **Light Platinum Grey** (`#D1D5DB`) — Secondary body copy, paragraphs, and passive states.
*   **Muted Sage Green** (`#527E6A`) — Success states, open indicators, and tactical badges.
*   **Warm Copper Amber** (`#A3623B`) — Warning alerts, special highlights, and vintage durability tags.

---

## 3. Typography Rules
*   **Display / Headlines:** `Outfit` or `Satoshi` (Sans-serif)
    *   *Rules:* Track-tight (`tracking-tight`), extra-bold weights, controlled scaling. Large headlines must avoid screaming colors; use pure white or soft gradients from White (`#FFFFFF`) to Light Platinum Grey (`#D1D5DB`).
*   **Body Text:** `Satoshi`
    *   *Rules:* Relaxed leading, maximum 65 characters per line (`max-w-[65ch]`) to prevent eye fatigue.
*   **Technical / Numbers:** `JetBrains Mono` or `Geist Mono` (Monospace)
    *   *Rules:* Used for hours, phone numbers, parts catalog IDs, GPS coordinates, and rating numbers to enforce the "technical cockpit" feel.
*   **Banned Fonts:** `Inter` (banned to avoid generic look), default system serif/sans-serif stacks.

---

## 4. Layout Principles
*   **Asymmetric Split Hero:** The main hero section is split asymmetric (e.g., 60% text/CTA left, 40% visual canvas right). No centered hero layouts.
*   **Bento Grid Architecture:** Content sections use asymmetric grids with varying column spans (e.g., 1/3 and 2/3 splits) rather than repeating 3-column rows.
*   **Negative Space & Grid Dividers:** Use 1px Graphene borders (`#24272C`) instead of heavy card background fills where possible to divide information cleanly.
*   **Viewports & Responsiveness:**
    *   Mobile-first: Below 768px, all grids collapse to a clean single column.
    *   No horizontal overflow is permitted.
    *   Touch targets for buttons and interactive rows must be at least `44px` high.
    *   Headlines must scale fluidly using `clamp()`.

---

## 5. Component Stylings
*   **Buttons:**
    *   *Primary:* Flat Refined Cyber Blue (`#1A80E6`) background, Pure White text. No outer glow. On active click, translates `-1px` vertically for tactile feedback.
    *   *Secondary:* Outlined Graphene (`#24272C`) with Light Platinum Grey text. Subtle highlight on hover.
*   **Cards:**
    *   Used only to group highly related interactive elements. Generously rounded (e.g., `1.5rem` / `24px`).
    *   Background uses Deep Navy Slate (`#161C24`). Shadows are tightly diffused and tinted towards the background color (no dark gray drop shadows on black).
*   **Input Fields:**
    *   Label is placed strictly above the input. Error text is positioned below in Warm Copper Amber (`#A3623B`). Focus ring applies Refined Cyber Blue (`#1A80E6`).
*   **Interactive List Items:**
    *   Hover state triggers a subtle background slide-in or a left border highlight in Cyber Blue.
*   **Skeletal Loaders:**
    *   Instead of spinners, use linear animations that mimic the exact wireframe layout of the target component.

---

## 6. Motion & Interaction
*   **Spring Physics:** Apply realistic, weighted spring physics to all user-initiated transitions (default baseline: `stiffness: 100, damping: 20`). Avoid linear/robotic transitions.
*   **Micro-interactions:** Passive elements (like the "Open Now" badge or calling numbers) have subtle, infinite pulsing or typewriter loops.
*   **Waterfall Mounts:** List rows, reviews, and parts category grids fade and translate vertically with staggered delays (`50ms` increments).
*   **Animations:** Exclusively hardware-accelerated (`transform`, `opacity`). Never animate width, height, or absolute top/left coordinates.

---

## 7. Anti-Patterns (Banned)
*   **NO** emojis anywhere in the layout (use custom clean SVGs or micro-icons if necessary).
*   **NO** `Inter` font.
*   **NO** pure black (`#000000`) for surfaces or gradients.
*   **NO** overlapping text layers, absolute-positioned graphics that overlap text, or decorative background shapes that obscure readability.
*   **NO** generic placeholder text (always use the real copy provided in the `/docs/COPY_WRITING/` files).
*   **NO** generic names like "John Doe" or placeholder reviews (always use real customer reviews from `/docs/REVIEWS.md`).
*   **NO** generic AI stock phrases ("seamlessly integration", "next-gen solutions", "synergize your experience").
*   **NO** scroll-arrows or bouncing chevrons to prompt scrolling.
