# CEDOK Portal

A responsive static website for the **Centre for Entrepreneurship Development of Karnataka (CEDOK)**. The portal presents CEDOK's institutional information, entrepreneurship programmes, and registration guidance.

## Features

- Responsive government-portal-style layout for desktop and mobile screens.
- Direct navigation links to Home, About Us, Programmes & EDP, and Registration. The navigation does not use dropdown menus.
- Global search modal opened by the Search button or `Ctrl + K` / `Cmd + K`.
- Programme Finder quiz with recommendations for EDP, EAP, and skill training.
- Programme filters on the Programmes page.
- English / Kannada language toggle with the selected language stored locally in the browser.
- Accessibility font-size controls and keyboard-friendly navigation.
- Animated homepage statistics and modal/toast UI helpers.
- Registration link to the official CEDOK Google Form.

## Pages

- `index.html` — Homepage, programme pathways, statistics, and calls to action.
- `about.html` — CEDOK overview, mission, objectives, and institutional information.
- `programmes.html` — EDP, EAP, and skill-training cards, filters, comparison table, and quiz launcher.
- `registration.html` — Registration instructions, quiz access, and official form link.

## File Structure

```text
cedok-portal/
├── index.html            # Landing page with stats, pathway cards, and quiz launcher
├── about.html            # Institutional overview and mission
├── programmes.html       # Training programmes, filters, and comparison table
├── registration.html     # Registration guidance and official form access
├── assets/
│   ├── app.js            # Navigation, search, quiz, filters, language, and accessibility logic
│   ├── style.css         # Shared design system and responsive styling
│   ├── logo.jpeg         # CEDOK branding asset
│   ├── business-idea-checklist.pdf       # Reference document asset
│   ├── project-planning-worksheet.pdf    # Reference document asset
│   ├── market-research-starter.pdf       # Reference document asset
│   └── business-plan-outline.pdf         # Reference document asset
└── README.md             # Project documentation
```

## Local Development

No build tools or package installation are required. Open `index.html` directly in a browser, or run a local static server from the project folder:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000`.

The site can also be deployed as static files to GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
