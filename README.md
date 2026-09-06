# مكتب العاصمة الهندسي — Capital Group Engineering Consultants
## Website — Quick Start Guide

---

## How to Open

**Option 1 — Direct browser open (simplest):**
1. Navigate to `capital-group/` folder
2. Double-click `index.html`
3. Website opens in your default browser

**Option 2 — Local server (recommended for best experience):**

If Python is installed:
```bash
# In the capital-group folder:
python -m http.server 8080
# Then open: http://localhost:8080
```

If VS Code is installed, use the **Live Server** extension (right-click `index.html` → "Open with Live Server").

---

## Files

```
capital-group/
├── index.html          ← Main website (open this)
├── styles.css          ← All styles (brand colors, animations, RTL)
├── app.js              ← All animations & interactions
├── config.js           ← ★ CONFIGURE THIS FIRST ★
└── assets/
    ├── logo.png        ← ★ ADD YOUR LOGO HERE ★
    └── logo-placeholder.svg  ← Fallback if logo.png missing
```

---

## ★ IMPORTANT — First Steps Before Going Live

### 1. Add Your Logo
Place your Capital Group logo file as:
```
assets/logo.png
```
The website will automatically use it in the Navbar, Hero, and Footer.
If `logo.png` is missing, a branded SVG placeholder displays automatically.

### 2. Fill in Contact Details
Open `config.js` and fill in:
```javascript
PHONE_NUMBER: '+966XXXXXXXXX',       // Your phone number
WHATSAPP_NUMBER: '966XXXXXXXXX',     // WhatsApp (no + sign)
EMAIL: 'info@yourcompany.com',        // Email address
```

### 3. Fill in Analytics IDs (after setting up Google Ads / GA4)
```javascript
GA4_ID: 'G-XXXXXXXXXX',
GOOGLE_ADS_ID: 'AW-XXXXXXXXX',
GOOGLE_ADS_CONVERSION_LABEL_LEAD: '...',
GOOGLE_ADS_CONVERSION_LABEL_WA: '...',
GOOGLE_ADS_CONVERSION_LABEL_PHONE: '...',
```

---

## Sections Included

| # | Section | Description |
|---|---------|-------------|
| — | Navbar | Transparent → glass scroll, Arabic nav, language switcher |
| 01 | Hero | Cinematic animated hero with particles & SVG line drawing |
| 02 | Intro Statement | Large statement with text reveal |
| 03 | About | Split layout with masked image reveal |
| 04 | Services | 6 animated service cards (charcoal + gold) |
| 05 | Project Journey | Animated 6-step timeline with gold line |
| 06 | Problem / Solution | Dark section with "اتركها علينا" reveal |
| 07 | Why Capital Group | 5 expandable feature rows |
| 08 | Blueprint | Live-drawn engineering blueprint SVG |
| 09 | Deliverables | 6 animated delivery cards |
| 10 | Lead Form | Full form with validation + success animation |
| — | Footer | Dark premium footer with animated gold top line |

---

## Features Included

- ✅ Full RTL Arabic layout
- ✅ IBM Plex Sans Arabic premium font
- ✅ Custom gold cursor (desktop)
- ✅ Transparent → glass navbar on scroll
- ✅ Language switcher (AR ↔ EN toggle)
- ✅ Hero particle canvas + SVG architectural line drawing
- ✅ GSAP-style scroll animations via Intersection Observer
- ✅ Staggered card animations
- ✅ Blueprint SVG drawing animation
- ✅ Journey timeline with animated gold line
- ✅ Magnetic button hover effects
- ✅ Lead form with validation + loading + success states
- ✅ WhatsApp floating button with pulse animation + tooltip
- ✅ Mobile sticky bottom bar (Call | WhatsApp | Request)
- ✅ Analytics tracking (GA4 + Google Ads conversion)
- ✅ SEO: title, meta, Open Graph, LocalBusiness schema, semantic HTML
- ✅ `prefers-reduced-motion` respected
- ✅ Mobile responsive (all breakpoints)
- ✅ No build step required — pure HTML/CSS/JS

---

## Connect to Form Backend

Currently, the form shows a success state after 1.8 seconds (simulated).

To connect to a real backend, find this code in `app.js`:
```javascript
// Simulate API call (replace with actual endpoint)
setTimeout(function() {
  ...
}, 1800);
```

Replace with a `fetch()` call to your API:
```javascript
fetch('https://your-api.com/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, phone, city, projectType, service, details })
})
.then(function(res) { ... })
.catch(function(err) { ... });
```

---

## Deployment

The website is a **static site** — upload all files to any web host:

- **cPanel / File Manager**: Upload `capital-group/` contents to `public_html/`
- **Netlify**: Drag and drop the `capital-group/` folder
- **Vercel**: Connect git repo and deploy root folder
- **Cloudflare Pages**: Upload via dashboard

---

## Browser Support

Chrome, Safari, Firefox, Edge — all modern browsers. IE11 not supported.

---

*Built for Capital Group Engineering Consultants — Riyadh, Saudi Arabia*
