# Google Stitch Project Prompt: Auto AS Sklep Motoryzacyjny

This document contains a structured, high-fidelity prompt to feed into Google Stitch. It references the design system, copywriting, and physical image assets present in the project folder to generate a premium web interface.

---

## 🎯 The Stitch System Prompt

```markdown
Generate a modern, responsive single-page web application (SPA) for "Auto AS" (a car parts and automotive store located in Siepraw, Poland) using the following structured system data, copywriting files, design systems, and photo assets.

---

### 1. DESIGN SYSTEM & VISUAL RULES (Single Source of Truth)
Apply the complete design token system from "docs/DESIGN.md":
- **Theme:** Technical cockpit, high-density dashboard/automotive interface.
- **Base Background:** Jet Black (#060709) margins, Dark Obsidian (#0D1117) section blocks.
- **Elevation/Panels:** Deep Navy Slate (#161C24) with 1px Graphene borders (#24272C).
- **Accents:** Calibrated Cyber Blue (#1A80E6) for active highlights, focus rings, and primary action triggers. Warm Copper Amber (#A3623B) for warnings and alerts. Muted Sage Green (#527E6A) for success states and "Open now" status badges.
- **Typography:**
  - Headlines: Satoshi or Outfit (Bold, track-tight letter spacing).
  - Body: Satoshi (Regular, line length max 65 characters, Light Platinum Grey (#D1D5DB) on dark background).
  - Numbers, hours, metrics, parts, VIN examples: JetBrains Mono or Geist Mono.
- **Motion:** Spring physics for buttons and transitions. Staggered cascade loads for sections and list elements.
- **Anti-patterns (BANNED):** No Inter font, no emojis, no pure black background surfaces (#000000), no centered hero sections, no repeating 3-equal-card grids, no generic placeholder text/names.

---

### 2. PAGE STRUCTURE & LAYOUT SECTIONS

Build a single-page app layout containing the following sections:

#### A. Header & Sticky Navigation
- **Logo Text:** Auto AS (styled as bold, tech-themed branding) + "sklep motoryzacyjny" sub-label.
- **Status Indicator:** Dynamic indicator displaying:
  - "OTWARTE" (Open) in Muted Sage Green (#527E6A) with an active pulse animation if current time is Monday-Friday 08:30–17:00 or Saturday 08:30–14:00.
  - "ZAMKNIĘTE" (Closed) in Warm Copper Amber (#A3623B) outside these hours.
- **Nav Links:** O nas | Asortyment | Dlaczego my | Opinie | Kontakt.
- **CTA:** "Zadzwoń teraz" button showing the number +48 12 270 58 40 (styled in Monospace).

#### B. Hero Section (Asymmetric Split Layout)
- **Layout:** Left column (60%) holds typography, tagline, and call to action. Right column (40%) holds an asymmetric image grid featuring store photos.
- **Copy:** Use **Wariant A** from `docs/COPY_WRITING/01_HERO.md`:
  - Main Headline: "Części samochodowe od ręki. Od 1989 roku."
  - Subheadline: "Fachowe doradztwo, błyskawiczne zamówienia i asortyment, którego nie znajdziesz u konkurencji. Siepraw, pow. myślenicki."
  - Primary CTA Button: "Sprawdź asortyment →" (smoothly scrolls to the product section).
  - Secondary CTA Button: "Zadzwoń do nas" (initiates call).
- **Badges:** Include micro-badges under the copy showing "⭐ 4.9/5 Google Maps" and "🏆 Laureat TOP 100".
- **Hero Image Integration:** Use `photos/643311848_1492531212880229_1268244639632777098_n.jpg` (storefront facade showing Auto AS signage) inside a clean, rounded mask with subtle parallax.

#### C. O Nas (About Us) Section
- **Layout:** Two-column offset block.
- **Copy:** Integrate copy from `docs/COPY_WRITING/02_O_NAS.md`. Include:
  - Heading: "Znamy się na częściach. I na ludziach, którzy ich potrzebują."
  - Narrative: The 35+ years history block highlighting Mr. Tomasz Bętkowski's ability to identify the correct part from memory.
  - Value Cards (Bento-style layout using `#161C24` backgrounds):
    1. **Fachowość** (35+ lat w branży)
    2. **Szybkość** (Zamawiasz rano - odbierasz popołudniu)
    3. **Indywidualne podejście** (Klient to relacja, nie transakcja)
    4. **Uczciwe ceny** (Bez ukrytych gwiazdek)
- **Image:** Use `photos/706583297_1573300518136631_6794956052555147039_n.jpg` (showing interior store layout / shelves of oil/filters) to visually support the physical stock availability.

#### D. Asortyment (Product Categories)
- **Layout:** High-density interactive catalog board/grid.
- **Copy:** Integrate categories from `docs/COPY_WRITING/03_ASORTYMENT.md`.
- **Interactivity:** Clicking a category card highlights it, opens a detailed drawer or sub-pane displaying what's included, and provides a quick call-out action.
- **Categories to display:**
  1. **Części eksploatacyjne** (Filtry, klocki, tarcze, elementy zawieszenia)
  2. **Oleje silnikowe** (Syntetyki, półsyntetyki, mineralne - Shell, Castrol, Valvoline, etc.)
  3. **Chemia i płyny** (Chłodnicze, hamulcowe, kosmetyki)
  4. **Detailing i pielęgnacja** (Woski, szampony, mikrofibry)
  5. **Akcesoria** (Dywaniki, wycieraczki, żarówki, narzędzia)
- **Visuals:** Integrate `photos/706297449_1573300574803292_5722139937315665108_n.jpg` (shelves stacked with motor oils and engine additives) in this section.
- **Bottom Callout:** "Nie widzisz tego, czego szukasz? Zadzwoń: 12 270 58 40. Zamówimy w kilka godzin."

#### E. Dlaczego My & Opinie (Social Proof Grid)
- **Layout:** Clean bento grid split: Left column features key stats, Right column features testimonial cards with staggered fade-in animations.
- **Key Stats:**
  - **4.9 / 5** (Google Maps rating based on real reviews)
  - **9.8 / 10** (TOP 100 of Poland client satisfaction index)
  - **35+ lat** (presence on the local market since 1989)
- **Testimonials:** Integrate the 5-star real reviews from `docs/COPY_WRITING/05_OPINIE.md` (and cross-referenced in `docs/REVIEWS.md`):
  - **Przemo 84:** "Pan zamówił części rano, po południu były... zadzwoniłem o 16:59 czy poczeka, powiedział że tak."
  - **Jarek W:** "Po wymianie tylnych sanek potrzebowałem wahacza... Pan z głowy podał markę pasującą."
  - **Michał Wodziański:** "Pan Tomasz to specjalista i tworzy świetną atmosferę..."
  - **Łukasz Wyka:** "Ceny normalne... załatwiłem tu części, które inne sklepy określały jako niedostępne."

#### F. Kontakt & Lokalizacja (Contact / Map Section)
- **Layout:** Split layout. Left: contact details, phone numbers, hours table. Right: interactive map block displaying location coordinates.
- **Store Details:** From `docs/COPY_WRITING/06_KONTAKT.md` & `docs/INFO.md`:
  - Adres: ul. Zagórze 1, 32-447 Siepraw
  - Telefon główny: +48 12 270 58 40
  - Telefon pomocniczy: (12) 274 55 05
  - Godziny pracy: Pon-Pt 8:30 - 17:00, Sob 8:30 - 14:00.
- **Interactive Helper (VIN Input):**
  - Include a minor VIN lookup simulator box. Users can type a simulated VIN or select a car model/year/part to show an example of how Auto AS verifies compatible components before purchasing.
- **Map:** Use GPS coordinates `49.931465, 19.980394` to show an embed or style a custom interactive dark-themed vector map. Include a "Pokaż trasę dojazdu" button linking to Google Maps.

#### G. FAQ (Frequently Asked Questions)
- **Layout:** Accordion list with smooth slide-open transitions utilizing spring physics.
- **Copy:** Include the top 6 Q&A blocks from `docs/COPY_WRITING/07_FAQ.md` (covering ordering speed, part matching, oil selection, payments, phone orders, and location).

#### H. Stopka (Footer)
- **Layout:** Structured 4-column layout following `docs/COPY_WRITING/08_FOOTER.md`.
- **Content:** Brand disclaimer, company details (NIP: 6790002432, REGON: 351008484, Owner: FH ATB Tomasz Bętkowski), hours, and site navigation links.

---

### 3. ASSETS MAPPING
Integrate the following actual project files:
- **Design Tokens:** `docs/DESIGN.md`
- **Main Store Image:** `photos/643311848_1492531212880229_1268244639632777098_n.jpg`
- **Interior Stock Image:** `photos/706583297_1573300518136631_6794956052555147039_n.jpg`
- **Detailing / Oils Rack Image:** `photos/706297449_1573300574803292_5722139937315665108_n.jpg`
- **Alternative Asset:** `photos/unnamed.webp`
- **Interactive VIN tool example code / layout:** Include a mock form field with placeholder "Wpisz numer VIN (np. WAUZZZ8K...)" to make the design feel premium, fully detailed, and highly functional.
```
