# CLAUDE.md — Innovation Inc. Corporate Website

## Project Overview

This is the corporate website for **株式会社イノベーション (Innovation Inc.)**, a fictional Japanese IT consulting company. It is a fully static site with no build step, no package manager, and no JavaScript framework. All content is in Japanese.

The site is production-ready as static files — serve any directory with a static file server or open `index.html` directly in a browser.

---

## File Structure

```
sample_company/
├── index.html      # Main corporate site (371 lines)
├── styles.css      # All CSS — global reset, variables, components (1,013 lines)
├── script.js       # All JavaScript — DOM interactions, modal, form (475 lines)
└── date.html       # Standalone Japanese date display page (55 lines)
```

There are no subdirectories, no build artifacts, and no generated files.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Markup     | HTML5 (semantic elements)         |
| Styling    | CSS3 (custom properties, Grid, Flexbox) |
| Scripting  | Vanilla JavaScript ES6+           |
| Fonts      | Google Fonts — Inter + Noto Sans JP |
| Images     | Unsplash (external URLs)          |
| Build tool | None                              |
| Package mgr| None                              |
| Framework  | None                              |

---

## Running the Site

Open `index.html` in any modern browser. There is no build step.

```bash
# Option A: open directly
open index.html

# Option B: local dev server (any static server works)
python3 -m http.server 8000
# then visit http://localhost:8000
```

`date.html` is a standalone page; open it the same way.

### Testing / Verification

There is no automated test suite. Verify changes by:
1. Opening `index.html` in a browser
2. Checking responsive layouts at 768px and 480px breakpoints
3. Clicking each service card to confirm the modal opens with correct content
4. Submitting the contact form to verify validation and the success notification
5. Checking `date.html` displays the current Tokyo date correctly

---

## Page Sections (`index.html`)

The page uses anchor-based navigation. Sections in document order:

| ID             | Japanese label  | Purpose                              |
|----------------|-----------------|--------------------------------------|
| `#home`        | ホーム          | Hero banner with CTA buttons         |
| `#about`       | 会社概要        | Company description + animated stats |
| `#services`    | サービス        | Four service cards (trigger modal)   |
| `#achievements`| 導入実績        | Three customer case studies          |
| `#news`        | お知らせ        | News/announcement list               |
| `#contact`     | お問い合わせ    | Contact form + company info          |

---

## Architecture & Key Patterns

### CSS Variables (`styles.css` `:root`)

All colours and shadows are defined as CSS custom properties at the top of `styles.css`:

```css
--primary-color: #2563eb
--primary-dark: #1d4ed8
--secondary-color: #64748b
--accent-color: #f1f5f9
--text-primary: #1e293b
--text-secondary: #64748b
--text-light: #94a3b8
--bg-white: #ffffff
--bg-light: #f8fafc
--bg-dark: #0f172a
--border-light: #e2e8f0
--shadow-sm / --shadow-md / --shadow-lg / --shadow-xl
```

Always use these variables for colours and shadows. Do not hardcode hex values in new CSS.

### Responsive Breakpoints

Two breakpoints, mobile-first:
- `768px` — tablet adjustments (hamburger menu appears, grid collapses)
- `480px` — mobile adjustments (tighter spacing, smaller text)

### JavaScript Structure (`script.js`)

All code runs inside a single `DOMContentLoaded` listener. There is no module system; all functions and data are scoped to that callback. No global variables are exposed.

Key components:

**Service modal** — driven by the `serviceData` object (lines 263–380). Each service card has a `data-service` attribute (`cloud`, `ai`, `development`, `dx`) that keys into `serviceData`. `showServiceModal(service)` populates the modal DOM from the data object. To add or edit a service, update both the HTML card and the corresponding `serviceData` entry.

**Scroll animations** — `IntersectionObserver` with `threshold: 0.1` adds the `fade-in` class to elements as they enter the viewport. Elements are unobserved after first trigger (one-shot). The `.fade-in` CSS keyframe is defined in `styles.css`.

**Count-up animation** — a separate `IntersectionObserver` with `threshold: 0.5` targets `.stat-number` elements. It reads the numeric value from `textContent`, strips non-digits, and animates to the final value over 2 seconds at 60fps. Suffix characters (`+`, `%`, `年`) are preserved.

**Contact form** — client-side only. Validation highlights invalid fields with `#ef4444` border. Submission is simulated with a 2-second `setTimeout`. No data is sent anywhere.

**Toast notifications** — `showNotification(message, type)` creates a fixed-position `<div>` that slides in from the right. Types: `success` (#10b981 green), `error` (#ef4444 red), `info` (#2563eb blue). Auto-removes after 5 seconds.

**Debounce utility** — `debounce(func, wait)` is defined locally and used for the scroll event listener. Re-use it for any new scroll or resize handlers.

### `date.html` Pattern

Uses `Intl.DateTimeFormat` with `locale: 'ja-JP'` and `timeZone: 'Asia/Tokyo'`. Parses `formatToParts()` to construct the string `本日は${year}年${month}月${day}日${weekday}です。`. The script runs inline (no external file) with no `DOMContentLoaded` wrapper — the `<script>` is placed at the end of `<body>`.

---

## Code Conventions

### HTML
- Language is `ja`; all user-visible text is in Japanese
- Use semantic sectioning elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- Service cards link to modal data via `data-service="<key>"` attribute
- Modal content containers are empty in HTML and populated by JavaScript

### CSS
- Reset via `* { margin: 0; padding: 0; box-sizing: border-box; }`
- Use `rem` for spacing and font sizes; `px` only for borders and very small values
- Container max-width is 1200px via `.container`
- New sections should follow the alternating light/dark background pattern: `--bg-white` for odd sections, `--bg-light` for even sections
- Do not add CSS preprocessors (no SASS/LESS)

### JavaScript
- ES6+ features are fine (arrow functions, `const`/`let`, template literals, destructuring, `class`)
- Do not use `var`
- No framework or library imports
- New DOM-interaction code goes inside the existing `DOMContentLoaded` callback in `script.js`
- Use `textContent` (not `innerHTML`) when setting text to avoid XSS; use `innerHTML` only for trusted SVG/HTML strings from `serviceData`
- Use the existing `debounce()` for scroll and resize handlers

---

## Git Conventions

**Commit message format:** `Type: Short description`

| Prefix     | When to use                              |
|------------|------------------------------------------|
| `Add:`     | New file or feature                      |
| `Fix:`     | Bug fix                                  |
| `Refactor:`| Code restructure without behavior change |
| `Update:`  | Content or copy change                   |
| `Remove:`  | Deletion of code or file                 |

Examples from history:
```
Fix: Remove DOMContentLoaded to fix display issue
Refactor: Embed script into HTML and remove external file
Add: CLAUDE.md with codebase documentation for AI assistants
```

Branch naming: `claude/<short-description>-<id>` for AI-assisted branches.

---

## What Not To Do

- **Do not add npm / package.json.** This is intentionally dependency-free.
- **Do not introduce a JavaScript framework** (React, Vue, etc.) without explicit discussion.
- **Do not add a build step** (Webpack, Vite, esbuild, etc.) without explicit discussion.
- **Do not add a CSS preprocessor** (SASS, Less, PostCSS) without explicit discussion.
- **Do not hardcode colours** — always use the CSS custom properties defined in `:root`.
- **Do not add `console.log` calls** in committed code.
- **Do not send form data to a real server** without first implementing proper backend handling and privacy compliance (the form is intentionally a mock).
