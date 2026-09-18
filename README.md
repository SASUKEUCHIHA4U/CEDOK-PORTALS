# CEDOK Portal — Modernized Static Web Application

An enhanced, high-performance, and feature-rich static portal for **CEDOK** (Center for Entrepreneurship Development of Karnataka, Government of Karnataka autonomous body).

## Key Features & Senior Developer Polish

- **Modern Glassmorphism Aesthetic**: Redesigned UI featuring custom CSS design variables, glassmorphism cards, smooth animations, curated typography (`Inter` & `Noto Sans Kannada`), and responsive layouts.
- **Global Search Modal (`Cmd/Ctrl + K`)**: Instant keyboard-driven global search across programmes, district directory, resources, and business opportunities.
- **Enhanced District Directory (31 Districts)**: Comprehensive filterable dataset of all 31 Karnataka districts categorized by region (Kittur Karnataka, Kalyana Karnataka, Karavali, Malenadu, South Karnataka), with rich district office detail modals.
- **Interactive Programme Quiz**: 3-step recommendation wizard guiding aspiring entrepreneurs to EDP, EAP, or Skill Training.
- **Resource Document Previewer**: Live modal previewer for downloadable PDF guides (`Business Idea Checklist`, `Project Planning Worksheet`, `Market Research Starter`, `Business Plan Outline`).
- **Bilingual Interface Toggle (English / ಕನ್ನಡ)**: Instant language mode switcher for authentic Karnataka state portal experience.
- **Animated Statistics Counter**: Scroll-triggered counting animation highlighting key institutional metrics.
- **SEO & Accessibility**: Semantic HTML5 markup, ARIA roles, viewport settings, and keyboard accessibility.

## File Structure

```text
cedok-portal/
├── index.html            # Landing page with stats, pathway cards, and quiz launcher
├── programmes.html       # EDP/EAP/Skill training with filters and comparison matrix
├── opportunities.html     # Sector opportunities & 6-point project feasibility check
├── districts.html        # Interactive 31-district search & regional filter directory
├── resources.html        # PDF worksheet guides with outline previewer & downloads
├── about.html            # Mission, institutional history timeline & core objectives
├── registration.html     # Step-by-step registration guide & official form link
├── assets/
│   ├── style.css         # Modern CSS design system & responsive media queries
│   ├── app.js            # Modular ES6 client engine (Search, Quiz, Districts, Modals)
│   └── *.pdf             # Starter PDF worksheets and guides
└── README.md             # Project documentation
```

## Local Development & Deployment

No build tools or servers are required. Open `index.html` directly in any web browser or host on GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
