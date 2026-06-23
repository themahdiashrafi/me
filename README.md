# themahdiashrafi.github.io

Personal website for **Mahdi Ashrafi** — Software Engineer.

Live at: `https://themahdiashrafi.github.io`

---

## Structure

```
/
├── index.html        # Main page
├── style.css         # All styles + responsive breakpoints
├── main.js           # Interactions: nav, dots, parallax, fade-in
├── README.md
└── assets/
    ├── avatar.jpg    # Profile photo
    └── gear.png      # Gear icon used in sections
```

## Sections

- **Hero** — headline, avatar card, key stats
- **About** — philosophy, domain depth, stack tags
- **Experience** — Wallex, Kaizeneum, Blue Guardian, WeTrust, FTMO/Propiy
- **What I Build** — dark section with gear icons and showcase
- **Contact** — LinkedIn, Kaizeneum, X, Instagram, GitHub

## Deploying to GitHub Pages

1. Create a repo named exactly `themahdiashrafi.github.io`
2. Push this folder contents to `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Site is live at `https://themahdiashrafi.github.io` within ~60 seconds

## Customization

- **Email** in nav CTA: update `mailto:` in `index.html` nav
- **Colors**: CSS variables at top of `style.css` under `:root`
- **Fonts**: Google Fonts import in `index.html` `<head>`

## Tech

Pure HTML/CSS/JS — no frameworks, no build step, no dependencies.
Fonts loaded from Google Fonts (requires internet on first load).
