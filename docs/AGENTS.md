# AGENTS.md - Marketing Célula Codebase Guide

**Project:** Marketing landing pages for Grupo Musical La Célula  
**Type:** Static HTML/CSS/JS site with serverless API  
**Platform:** Vercel  
**Domain:** marketing.grupomusicalcelula.com (subdominio dedicado a marketing)

---

## 🎯 Project Overview

This is a marketing campaign website for a musical group (Grupo La Célula) in Mexico City. It consists of multiple landing pages targeting specific event types (bodas/weddings, XV años/quinceañeras, privada/private events) with lead generation forms that integrate with Google Ads, GTM, and email notifications.

The project runs on a **dedicated marketing subdomain**: `marketing.grupomusicalcelula.com`

**URL Structure:**
- Main: `https://marketing.grupomusicalcelula.com/`
- Bodas: `https://marketing.grupomusicalcelula.com/bodas`
- XV Años: `https://marketing.grupomusicalcelula.com/xv`
- Privada: `https://marketing.grupomusicalcelula.com/privada`

---

## 📂 Project Structure

```
MarketingCelula/
├── Marketing/              # Build output directory (deployed to Vercel)
│   ├── index.html         # Main landing page
│   ├── bodas.html         # Wedding campaign page
│   ├── xv.html            # XV años campaign page
│   ├── privada.html       # Private events campaign page
│   ├── assets/            # Images, logos, fonts, gallery (copied from /assets)
│   ├── css/               # Stylesheets (source lives here, not copied)
│   │   ├── common.css     # Shared styles
│   │   ├── main.css       # Base styles
│   │   ├── marketing-campaign.css  # Campaign page styles
│   │   ├── bodas.css      # Wedding-specific styles
│   │   ├── xv.css         # XV-specific styles
│   │   └── privada.css    # Private event-specific styles
│   └── js/                # JavaScript files (source lives here)
│       ├── common.js      # GTM, Google Ads, common utilities
│       └── form-handler.js # Form validation & submission logic
├── assets/                # Original assets (copied to Marketing/assets/ during build)
│   ├── images/
│   ├── gallery/
│   ├── logo/
│   ├── fonts/
│   ├── icons/
│   └── equipo/
├── api/                   # Vercel serverless functions
│   └── send-form.js       # Email sending API endpoint
├── build.js               # Build script (copies assets to Marketing/)
├── vercel.json            # Vercel deployment configuration
├── package.json           # Dependencies and scripts
└── *.md                   # Documentation files
```

### Key Architecture Points

1. **Marketing/** is the output directory - it's what gets deployed
2. **CSS/JS source files live inside Marketing/** - they are NOT copied during build
3. **assets/** in root is copied to **Marketing/assets/** during build
4. The build process does NOT transpile or bundle - it's a simple file copy operation

---

## 🛠️ Essential Commands

### Development
```bash
npm run dev              # Start Vercel dev server on localhost:3000
```

### Build
```bash
npm run build            # Run build.js to copy assets to Marketing/
```

### Deploy
```bash
vercel                   # Deploy preview (test deployment)
vercel --prod            # Deploy to production
npm run deploy           # Alias for vercel --prod
```

### Linting
```bash
npm run lint             # Run ESLint on src/js/**/*.js (note: may need path adjustment)
```

### Verification
```bash
bash verify-deployment.sh  # Pre-deployment checks (verifies structure, runs build)
```

---

## 🔧 Configuration Files

### vercel.json

Critical configuration:
- **buildCommand:** `npm run build`
- **outputDirectory:** `Marketing`
- **framework:** `null` (no framework, plain HTML)
- **cleanUrls:** `true` (serves `/bodas` instead of `/bodas.html`)
- **Node version:** 18

#### Important Rewrites
```json
{
  "source": "/bodas",
  "destination": "/bodas.html"
}
```
This allows clean URLs without `.html` extensions.

#### Security Headers
All pages include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

#### Cache Strategy
- Assets (`/assets/*`): 1 year cache (`max-age=31536000, immutable`)
- CSS/JS (`/css/*`, `/js/*`): 1 year cache (`max-age=31536000, immutable`)

### package.json

**Dependencies:**
- `@google/generative-ai` - Gemini AI integration (currently unused in forms)
- `@vercel/analytics` - Vercel Analytics
- `@vercel/speed-insights` - Speed metrics
- `node-fetch` - For API calls

**Dev Dependencies:**
- `cssnano` - CSS minification (not currently used in build)
- `eslint` - Linting
- `postcss` - CSS processing (not currently used in build)
- `vercel` - Vercel CLI

**Node requirement:** >= 18.0.0

---

## 📝 Code Conventions

### HTML Structure

All campaign pages follow this pattern:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Google tag (gtag.js) with GT-5MXH55ZG -->
    <!-- Google Ads conversion snippet (AW-943484255) -->
    <!-- Meta tags (SEO, OG, Twitter Card) -->
    <!-- Preconnect to external resources -->
    <!-- Preload LCP images and fonts -->
    <!-- CSS: common.css, marketing-campaign.css, [page-specific].css -->
    <!-- Vercel Analytics & Speed Insights -->
    <!-- common.js (deferred) -->
</head>
<body>
    <!-- Header with navigation -->
    <!-- Hero section with CTA -->
    <!-- Events/Benefits sections -->
    <!-- Contact form with id="eventoForm" -->
    <!-- GTM noscript -->
    <!-- form-handler.js (deferred) -->
</body>
</html>
```

### CSS Organization

**Loading order:**
1. `common.css` - Shared base styles
2. `marketing-campaign.css` - Campaign page layout and components
3. `[page].css` - Page-specific styles (bodas.css, xv.css, privada.css)

**Naming convention:** BEM-like approach
- `.marketing-hero-section`
- `.marketing-hero-content`
- `.hero-cta-button`
- `.discount-badge`

**Colors:** Primarily dark theme with gold accents
- Background: `#000`, `#1a1a1a`
- Accent: `#FFD700` (gold)
- Text: `#fff`, `#ccc`

### JavaScript Structure

#### common.js
Responsibilities:
- Handle scroll arrow clicks (smooth scroll to #eventos)
- Handle mobile menu toggle

**No tracking code** - GTM is loaded directly in HTML, not via JavaScript

#### form-handler.js
Responsibilities:
- Form validation (phone, date, required fields)
- Submit form data to `/api/send-form`
- Push GTM events via `dataLayer`
- Open WhatsApp with pre-filled message
- Handle loading states and errors

**Form data attributes:**
- `data-campaign-title` - Human-readable campaign name
- `data-campaign-name` - Machine-readable campaign identifier (bodas, xv, privada)

**GTM event pushed:**
```javascript
window.dataLayer.push({
    event: 'form_submission',
    formName: 'bodas',      // Campaign identifier
    eventType: 'Boda',      // Event type from form
    eventDate: '2025-01-15', // Event date
    formValue: 5.0          // Estimated lead value
});
```

---

## 🔌 API Endpoints

### POST /api/send-form

**Location:** `api/send-form.js`  
**Type:** Vercel serverless function  
**Runtime:** Node.js

**Request body:**
```json
{
  "nombre": "Juan Pérez",
  "telefono": "5535412631",
  "evento": "Boda",
  "fecha": "2025-06-15",
  "comentarios": "Optional comments",
  "campaignTitle": "Música para Bodas",
  "campaignName": "bodas"
}
```

**Response (success):**
```json
{
  "success": true,
  "message": "Formulario enviado correctamente",
  "data": {
    "nombre": "Juan Pérez",
    "evento": "Boda",
    "fecha": "sábado, 15 de junio de 2025"
  },
  "gtmEvent": {
    "event": "form_submission",
    "formName": "bodas",
    "eventType": "Boda",
    "eventDate": "2025-06-15"
  }
}
```

**Email services supported:**
1. **Resend** (preferred) - Set `RESEND_API_KEY` env var
2. **SendGrid** - Set `SENDGRID_API_KEY` env var
3. **Development mode** - Logs only if neither key is set

**Environment variables:**
- `RESEND_API_KEY` or `SENDGRID_API_KEY` - Email service API key
- `EMAIL_TO` - Recipient email (default: `contacto@grupomusicalcelula.com`)
- `EMAIL_FROM` - Sender email (default: `noreply@grupomusicalcelula.com`)

**Email template:** HTML email with campaign tracking, formatted event details, and WhatsApp link

---

## 📊 Analytics & Tracking

### Google Tag Manager
**Container ID:** `GTM-5783XFN4`  
**Integration:** Loaded directly in HTML `<head>` and `<body>`

**⚠️ IMPORTANT:** All tracking is now centralized in GTM. No direct gtag.js or Google Ads snippets in code.

**GTM Tags configured:**
1. **Conversion Linker** (fires on All Pages) - Required for Google Ads tracking
2. **Google Ads Conversion Tracking** (fires on `form_submission` event)
   - Conversion ID: `943484255`
   - Conversion Label: `jZjxCKPzodYbEN_a8cED`
   - Value: Dynamic from `{{DL - formValue}}`
   - Currency: MXN

**DataLayer events:**
- `form_submission` - When form is submitted (pushed from form-handler.js)

**DataLayer variables captured:**
- `formName` - Campaign identifier (bodas, xv, privada)
- `eventType` - Type of event (Boda, XV años, etc.)
- `eventDate` - Event date
- `formValue` - Estimated lead value (5.0)

### Google Ads
**Account ID:** `AW-943484255`  
**Conversion Label:** `jZjxCKPzodYbEN_a8cED` (form submissions)

**⚠️ Managed entirely through GTM** - No direct Google Ads code in HTML/JS

### Vercel Analytics
Included via inline script in all HTML pages:
```html
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
```

### Vercel Speed Insights
Included via inline script in all HTML pages:
```html
<script>window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

---

## 🔄 Build Process

### build.js Workflow

1. **Clean Marketing directory** (preserves HTML files)
2. **Copy `/assets` → `/Marketing/assets`** (recursive, overwrites existing)
3. **Skip CSS/JS** (already live in Marketing/)
4. **Copy static files** (if present):
   - `manifest.json`
   - `robots.txt`
   - `sitemap.xml`
   - `sw.js`
   - `_headers`

**Important:** CSS and JS are NOT copied because their source files already live in `Marketing/css/` and `Marketing/js/`. Only assets from root need copying.

### Vercel Build Process

1. Vercel runs: `npm run build` (executes build.js)
2. Vercel serves files from: `Marketing/` directory
3. Rewrites apply (e.g., `/bodas` → `/bodas.html`)
4. Clean URLs enabled (removes .html extension)

---

## 🎨 Styling Patterns

### Responsive Design
Mobile-first approach with breakpoints:
- Base: Mobile (< 768px)
- Tablet: 768px+
- Desktop: 1024px+

### Typography
**Font families:**
- Primary: 'Montserrat' (weights: 300, 400, 600, 700)
- Accent/Display: 'Lobster' (for decorative headings)
- Fonts loaded from Google Fonts with `&display=swap`

**Font preloading:**
```html
<link rel="preload" href="../assets/fonts/open-sans-v34-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/fonts/lobster-v28-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
```

### Performance Optimizations
- **Preconnect:** Google Fonts, YouTube (for embedded videos)
- **Preload:** LCP images (logo), critical fonts
- **Lazy loading:** Images below the fold
- **Deferred JS:** All scripts use `defer` attribute
- **Long cache:** 1-year cache on static assets

---

## 🚨 Important Gotchas

### 1. **CSS/JS Paths are RELATIVE**
In HTML, paths must be relative to the file location:
```html
<!-- In bodas.html, xv.html, privada.html (in Marketing/ root): -->
<link rel="stylesheet" href="css/common.css">
<script src="js/common.js"></script>

<!-- Assets can use relative or absolute: -->
<img src="./assets/logo/logo.webp">
<img src="/assets/logo/logo.webp">
```

### 2. **Assets are Copied, CSS/JS are Not**
- To change assets: Edit in `/assets`, then run `npm run build`
- To change CSS/JS: Edit directly in `/Marketing/css` or `/Marketing/js` (no build needed)

### 3. **Clean URLs Require Rewrites**
The `vercel.json` rewrites map clean URLs to HTML files:
- User visits: `/bodas`
- Vercel serves: `/bodas.html`
- Browser URL stays: `/bodas`

### 4. **Form Must Have Correct Data Attributes**
Form handler expects:
```html
<form id="eventoForm" data-campaign-title="Música para Bodas" data-campaign-name="bodas">
```
Missing these will cause `campaignTitle` and `campaignName` to default to "Campaña" and "general".

### 5. **GTM ID Differs from GA ID**
- **GTM Container:** `GTM-5783XFN4` (in common.js)
- **Google Tag:** `GT-5MXH55ZG` (in HTML head)
- **Google Ads:** `AW-943484255` (in common.js and conversion snippets)

These are three different tracking systems - don't confuse their IDs.

### 6. **WhatsApp Number is Hardcoded**
Phone number for WhatsApp is hardcoded in `form-handler.js`:
```javascript
const whatsappUrl = `https://wa.me/525535412631?text=${encodeURIComponent(mensaje)}`;
```
To change, edit `Marketing/js/form-handler.js`.

### 7. **Email Service Requires Environment Variables**
The `/api/send-form` endpoint will only send emails if you set:
- `RESEND_API_KEY` or `SENDGRID_API_KEY` in Vercel environment variables

In development/preview without these, it logs to console and returns success.

### 8. **Microfrontend Integration**
These pages are designed to be served from the main site via Vercel rewrites:
```json
{
  "source": "/bodas",
  "destination": "https://marketing-celula.vercel.app/bodas"
}
```
See `INTEGRATION_GUIDE.md` for full details.

### 9. **All Conversion Tracking is Through GTM**
⚠️ **UPDATED:** All tracking is now centralized in Google Tag Manager.

**How it works:**
1. Form submits → `form-handler.js` pushes to `dataLayer`
2. GTM detects `form_submission` event
3. GTM fires Google Ads conversion tag automatically
4. API response still includes `gtmEvent` for logging

**Never add direct gtag.js or Google Ads snippets to HTML** - manage everything in GTM dashboard.

### 10. **No Build Tooling for CSS/JS**
Unlike modern frameworks, there's no:
- Webpack/Vite/Rollup bundling
- CSS preprocessing (Sass/Less)
- JS transpilation (Babel)
- Minification in the build step

All CSS/JS is plain, unbundled, and served as-is. This is intentional for simplicity.

---

## 🧪 Testing

### Local Testing
```bash
npm run dev
```
Open http://localhost:3000 and test:
- Form submissions (will hit local API endpoint)
- Navigation between pages
- Responsive design
- GTM events (check Network tab for dataLayer pushes)

### Pre-deployment Verification
```bash
bash verify-deployment.sh
```
Checks:
- All required files exist
- Build succeeds
- Package.json scripts configured
- Vercel.json has required settings

### Manual Testing Checklist
- [ ] All pages load without console errors
- [ ] Forms validate correctly (phone, date, required fields)
- [ ] Form submission opens WhatsApp with correct message
- [ ] GTM events fire (check `dataLayer` in console)
- [ ] Google Ads conversions fire (check Network tab for `/pagead/conversion`)
- [ ] Images load (check assets path)
- [ ] CSS loads (check relative paths)
- [ ] Mobile menu works
- [ ] Scroll arrow works
- [ ] Clean URLs work (`/bodas` not `/bodas.html`)

---

## 📧 Email Setup

See `EMAIL_SETUP.md` for details, but quick setup:

**Option 1: Resend (Recommended)**
1. Sign up at resend.com
2. Get API key
3. Set env var in Vercel: `RESEND_API_KEY=re_xxxxx`
4. Set `EMAIL_FROM=noreply@yourdomain.com`
5. Verify domain in Resend

**Option 2: SendGrid**
1. Sign up at sendgrid.com
2. Create API key with Mail Send permission
3. Set env var: `SENDGRID_API_KEY=SG.xxxxx`
4. Verify sender email

**Environment variables to set in Vercel:**
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_TO=contacto@grupomusicalcelula.com
EMAIL_FROM=noreply@grupomusicalcelula.com
```

---

## 🚀 Deployment

### First Deployment

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy preview (first time)
vercel

# Answer prompts:
# - Set up and deploy? Y
# - Which scope? [your account]
# - Link to existing project? N
# - Project name? marketing-celula
# - Directory? ./ (press enter)
# - Override settings? N

# 4. Vercel will auto-detect:
#    - Build Command: npm run build
#    - Output Directory: Marketing
#    - Install Command: npm install

# 5. Deploy to production
vercel --prod
```

### Subsequent Deployments

**Option 1: Git-based (Automatic)**
1. Connect repo to Vercel project
2. Push to `master` branch → automatic production deploy
3. Push to other branches → preview deploys

**Option 2: Manual CLI**
```bash
npm run build    # Verify build works
vercel --prod    # Deploy to production
```

### Domain Setup

In Vercel dashboard:
1. Go to project Settings → Domains
2. Add domain: `grupomusicalcelula.com`
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🐛 Troubleshooting

### Build fails with "assets not found"
**Cause:** `/assets` directory missing or empty  
**Fix:** Ensure `/assets` exists in project root with all required images

### CSS/JS not loading
**Cause:** Incorrect relative paths in HTML  
**Fix:** Check paths are relative to HTML file location (`css/main.css` not `../css/main.css`)

### Form submission fails
**Cause:** API endpoint not working or CORS issue  
**Fix:** 
- Check `/api/send-form.js` exists
- Check Vercel function logs
- Verify `vercel.json` has rewrite for `/api/send-form`

### Email not sending
**Cause:** No API key set or invalid key  
**Fix:**
- Set `RESEND_API_KEY` or `SENDGRID_API_KEY` in Vercel env vars
- Verify key is valid
- Check Vercel function logs for errors

### GTM events not firing
**Cause:** GTM container not loaded or dataLayer syntax error  
**Fix:**
- Check `common.js` loads correctly (Network tab)
- Verify `GTM-5783XFN4` is correct container ID
- Check browser console for errors
- Inspect `dataLayer` array: `console.log(window.dataLayer)`

### Images return 404
**Cause:** Assets not copied during build  
**Fix:** Run `npm run build` to copy assets to Marketing/

### Clean URLs don't work locally
**Cause:** `npm run dev` doesn't apply rewrites the same as production  
**Fix:** This is expected. Test with Vercel preview deployment instead.

---

## 📚 Related Documentation

- `README.md` - Quick start guide
- `DEPLOYMENT.md` - Detailed deployment instructions
- `INTEGRATION_GUIDE.md` - How to integrate with main site
- `EMAIL_SETUP.md` - Email service configuration
- `GTM_EVENTS_REPORT.md` - GTM events documentation
- `KEYWORDS_CAMPAIGNS_REPORT.md` - SEO and campaign keywords

---

## 🔐 Security Notes

1. **Environment Variables:** Never commit API keys. Set them in Vercel dashboard.
2. **CORS:** API allows all origins (`*`). Restrict in production if needed.
3. **Rate Limiting:** No rate limiting on form submissions. Consider adding if spam becomes an issue.
4. **Input Validation:** Basic validation in form-handler.js. More validation in API endpoint.
5. **XSS Protection:** Headers set in vercel.json. Always sanitize user input in emails.

---

## 🎯 Common Agent Tasks

### Add a new campaign page

1. Copy an existing page: `cp Marketing/bodas.html Marketing/nueva.html`
2. Create page-specific CSS: `Marketing/css/nueva.css`
3. Update HTML:
   - Change title, description, keywords
   - Update canonical URL
   - Update OG/Twitter meta tags
   - Update form `data-campaign-name="nueva"`
   - Update form `data-campaign-title="Nueva Campaña"`
4. Add CSS link: `<link rel="stylesheet" href="css/nueva.css">`
5. Update `vercel.json` redirects and rewrites:
   ```json
   {
     "source": "/nueva.html",
     "destination": "/nueva",
     "permanent": true
   },
   {
     "source": "/nueva",
     "destination": "/nueva.html"
   }
   ```
6. Test locally: `npm run dev`
7. Deploy: `vercel --prod`

### Update tracking IDs

**GTM Container:**
- Edit `Marketing/js/common.js` line 6: Change `GTM-5783XFN4`

**Google Analytics:**
- Edit all HTML files `<head>`: Change `GT-5MXH55ZG`

**Google Ads:**
- Edit `Marketing/js/common.js` line 33: Change `AW-943484255/...`
- Edit conversion snippets in HTML `<head>` of each page

### Change WhatsApp number

Edit `Marketing/js/form-handler.js` line 103:
```javascript
const whatsappUrl = `https://wa.me/52XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
```

### Add new email service

Edit `api/send-form.js`, add new section in `sendEmail()` function:
```javascript
if (process.env.NEW_SERVICE_API_KEY) {
    // Implement new service
}
```

### Update styles

**Global changes:** Edit `Marketing/css/common.css` or `Marketing/css/marketing-campaign.css`  
**Page-specific:** Edit `Marketing/css/bodas.css`, `xv.css`, or `privada.css`

**No build step needed** - changes are live after editing.

### Debug form submissions

1. Open browser console
2. Submit form
3. Check Network tab for:
   - POST to `/api/send-form` (should return 200)
   - POST to `https://www.googletagmanager.com/...` (GTM tracking)
   - GET to `https://www.googletagmanager.com/gtag/js` (Google Ads)
4. Check Console for:
   - `dataLayer` pushes
   - Any JavaScript errors
5. Check WhatsApp opens with correct message

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Google Tag Manager:** https://support.google.com/tagmanager
- **Google Ads Conversions:** https://support.google.com/google-ads/answer/6095821
- **Resend Docs:** https://resend.com/docs
- **SendGrid Docs:** https://docs.sendgrid.com/

---

**Last Updated:** December 2024  
**Maintained By:** Development Team
