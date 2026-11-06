# NEXUS Platform — Assembled Folder

Assembled 2026-11-05 from the cleaned files in this chat. **Not deployed, not pushed to GitHub, not published anywhere.** This is a local folder ready to test / deploy only when Anthony says go.

## What is in here

```
nexus-platform-deploy/
├── index.html                  Master Hub (clean vanilla)
├── getting-started.html        Onboarding, 3 pathways (clean vanilla)
├── ecosystem/
│   ├── curator.html            ANSI Curator — VANILLA, working
│   ├── playground.html         ANSI Playground — VANILLA, working
│   ├── evolutionary.html       Evolutionary Algorithm — VANILLA, working
│   ├── quantumshift.html       QuantumShift — VANILLA, converted from React
│   ├── terminal-poster.html    Terminal Poster — VANILLA, converted from React
│   └── ansi-lab.html           ANSI Lab — VANILLA, converted from React
├── docs/
│   ├── NEXUS-LICENSE.md
│   ├── NEXUS-COPYRIGHT.md
│   ├── README-NEXUS.md
│   ├── NEXUS-DELIVERY.md       (delivery package, cleaned)
│   └── NEXUS-DEPLOYMENT-GUIDE.md
├── nav/
│   └── nexus-nav.html          Navigation component — REBUILT, not original
└── react/
    ├── ansi-curator-react.html
    ├── evolutionary-react.html
    ├── terminal-poster-react.jsx
    ├── quantumshift-react.jsx
    └── ansi-lab-react.jsx
```

## Decisions made in this assembly

- **Vanilla is canonical for Curator and Evolutionary.** Both have a vanilla and a React version. The vanilla ones match the delivery docs' zero-dependency / works-offline claim, so they are the ones in `ecosystem/`. The React versions are kept untouched in `react/`.
- **Nav is rebuilt, not original.** The original `nexus-navigation-component.html` was never found. The rebuilt nav in `nav/` copies the Hub's nav styling and links. It is labelled rebuilt in its own file header.
- **All 6 tools are now vanilla HTML.** QuantumShift, Terminal Poster, and ANSI Lab were converted from their React components to standalone vanilla HTML on 2026-11-05 (20,298 / 13,706 / 17,384 bytes). Their original React sources are kept untouched in `react/`. Small faithful-conversion notes: dead/unused React state was dropped, icons are Unicode glyphs instead of lucide, QuantumShift's HiDPI scaling was corrected, ANSI Lab's download export now escapes backticks/`${` correctly, and Terminal Poster's footer wording was changed from "Built with React" to "Built with Canvas API" because it is no longer a React file (date © 2025 kept as in the source).
- **Vanilla is canonical for Curator and Evolutionary too.** Both have a vanilla and a React version; the vanilla ones are in `ecosystem/`.

## What is NOT done

- No live browser test. The converted scripts passed `node --check` and the folder served HTTP 200 locally, but canvas animation, audio, and clipboard behaviour were not run in a real browser/phone. No Netlify/GitHub Pages deploy, and no link crawl was run on this folder.
- Known inconsistencies from the delivery docs were left as-is, not silently fixed: the docs claim 11 HTML files but list 9 (with Playground duplicated for QuantumShift); size claims differ (~180KB vs ~145KB); README calls Playground "In Development" while the delivery calls it production-ready; QuantumShift's footer says v3.2 vs platform v1.0; Terminal Poster and ANSI Lab footers say © 2025 vs © 2026 elsewhere.
- The deployment guide's SPA fallback (`/*` → `/index.html`) was not tested against the multi-page `/ecosystem/*.html` and `/docs/*.md` links — this is not a single-page app.
- `nexus-cipher-clean.html` was deliberately left out: it is a separate NEXUS Cipher tool, not one of the 6 tools in this delivery package.

## Branding

All files in this folder were verified clean of the banned branding (grep = 0). Two branding-root renames were made when the React files were cleaned, and are preserved here: Terminal Poster's color-scheme name was renamed to `nexus`, and QuantumShift's internal color variable was renamed to `nexusColors`. Removing branding from current files does not erase git history or already-published copies.

- **Footer docs links fixed 2026-11-05:** `index.html` and `getting-started.html` footer links pointed at `NEXUS-LICENSE.md` / `NEXUS-COPYRIGHT.md` / `README-NEXUS.md` at the site root, where those files do not exist — they live in `docs/`. All 6 links now point to `docs/...` and a full link crawl of both pages now resolves (all `/ecosystem/*.html` + docs links OK, 0 banned-branding hits).

## To test locally

Open `index.html` in a browser, or serve the folder with any static server and click through Hub → Getting Started → each tool. All 6 tools in `ecosystem/` should now open as working pages.

## To deploy (only on Anthony's go)

Pick a host / repo first, then deploy this folder as-is (Netlify drag-and-drop, or GitHub Pages). Do not use the banned domain as a target.
