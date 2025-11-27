# Datly API + Markdown Documentation Site

A complete, production-ready documentation system with **dual rendering modes**: Server-Side Rendering (SSR) for dynamic serving and Static Site Generation (SSG) for static deployment.

## 🎯 Features

✅ **SSR (Server-Side Rendering)**
- Dynamic markdown to HTML conversion on-demand
- SEO-friendly metadata injection (OpenGraph, Twitter Cards)
- Automatic sidebar/navbar generation
- Real-time documentation updates without rebuilding
- Caching headers for performance optimization

✅ **SSG (Static Site Generation)**
- Pre-render all markdown files to standalone HTML
- Deploy to any static host (Cloudflare Pages, Vercel, GitHub Pages)
- Zero-runtime dependencies for static site
- Perfect for high-traffic sites and CDN distribution

✅ **Security & Performance**
- XSS protection with `sanitize-html`
- Security headers with Helmet.js
- gzip/brotli compression
- Smart caching strategy (10min for docs, 1day for assets)

✅ **Developer Experience**
- Clean, minimal codebase (~350 lines server, ~280 lines build)
- Semantic HTML5 and responsive design
- YAML frontmatter for page metadata
- Organized API endpoints with mock data
- Simple configuration and customization

---

## 📁 Project Structure

```
packages/api/
├── index.js                    # SSR Express server (main entry)
├── build.js                    # SSG build script
├── package.json                # Dependencies and scripts
├── README.md                   # This file
├── server/
│   └── template.ejs           # EJS HTML template for rendering
└── public/                     # Built static site (SSG output)
    ├── index.html
    ├── docs/
    │   ├── intro.html
    │   ├── getting-started.html
    │   └── api/
    │       ├── users.html
    │       ├── products.html
    │       └── ...
    ├── assets/
    │   └── css/
    │       └── theme-datly.css
    └── static/
        ├── robots.txt
        └── img/

packages/docs/                  # Markdown source files
├── README.md                   # Main docs entry (/docs)
├── docs/
│   ├── intro.md               # /docs/intro
│   ├── getting-started.md     # /docs/getting-started
│   ├── examples.md            # /docs/examples
│   └── api/                   # API reference pages
│       ├── users.md
│       ├── products.md
│       ├── posts.md
│       ├── comments.md
│       ├── likes.md
│       ├── loans.md
│       └── news.md
├── assets/
│   └── css/
│       └── theme-datly.css    # Theme variables and styling
└── static/
    ├── robots.txt
    └── img/
        ├── favicon.ico
        ├── logo.png
        └── logo.svg
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd packages/api
npm install
# or
pnpm install
```

### 2. Run SSR Server

```bash
npm start
# or
npm run dev
```

Server starts at `http://localhost:3000`

**Available Routes:**
- `GET /` — API documentation index
- `GET /docs` — Main documentation page (docs/README.md)
- `GET /docs/:section` — Documentation pages (docs/:section.md)
- `GET /docs/:section/:page` — Nested documentation (docs/:section/:page.md)
- `GET /api/users` — Mock users API
- `GET /api/products` — Mock products API
- `GET /api/posts` — Mock posts API
- `GET /api/comments` — Mock comments API
- `GET /api/likes` — Mock likes API
- `GET /api/loans` — Mock loans API
- `GET /api/news` — Mock news API

### 3. Build Static Site (Optional)

```bash
npm run build
# or
npm run build:docs
```

This generates the complete static site in `public/` directory. Deploy `public/` to any static host:
- **Cloudflare Pages**: Connect git repo or upload `public/` folder
- **Vercel**: Upload `public/` as static site
- **GitHub Pages**: Push `public/` to `gh-pages` branch
- **Netlify**: Upload `public/` folder

---

## 📝 Writing Documentation

### Markdown File Format

Create markdown files in `packages/docs/docs/` with optional YAML frontmatter:

```markdown
---
title: "Getting Started"
description: "Quick start guide for Datly API"
author: "Your Name"
date: "2024-01-15"
image: "/assets/img/logo.png"
---

# Getting Started

Your documentation content here...

## Installation

\`\`\`bash
npm install datly
\`\`\`

## Usage

\`\`\`javascript
const datly = require("datly");
datly.start();
\`\`\`
```

### Frontmatter Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | filename | Page title (used in browser tab and OpenGraph) |
| `description` | string | "Documentation page" | Meta description (used in search results and Twitter Cards) |
| `author` | string | "Datly" | Page author (used in meta author tag) |
| `date` | string | current date | Publication date (ISO 8601 format) |
| `image` | string | "/assets/img/logo.png" | Social media preview image (OG image) |

### File Paths → URLs

| File Path | URL |
|-----------|-----|
| `docs/README.md` | `/docs` |
| `docs/intro.md` | `/docs/intro` |
| `docs/getting-started.md` | `/docs/getting-started` |
| `docs/api/users.md` | `/docs/api/users` |
| `docs/examples/basic.md` | `/docs/examples/basic` |

**Note**: Both `/docs/intro` and `/docs/intro/` URLs work (redirects handled gracefully).

---

## 🔧 Configuration

### Change Documentation Directory

Edit `index.js` line ~15:

```javascript
const DOCS_SRC = path.join(API_DIR, "../docs/docs");  // Change this path
```

### Change Port

```javascript
const PORT = process.env.PORT || 3000;  // Change default port
```

### Customize Theme

Edit `packages/docs/assets/css/theme-datly.css`:

```css
:root {
  --primary-color: #3399ff;
  --secondary-color: #33ccff;
  --background-color: #0f0f1e;
  --text-color: #e8e8f0;
  --accent-color: #ff3366;
}
```

### Modify Navbar/Sidebar

Edit `server/template.ejs` (search for `<!-- NAVBAR -->` and `<!-- SIDEBAR -->`):

```html
<!-- Add custom nav links -->
<nav class="navbar">
  <!-- ... existing navbar code ... -->
  <a href="https://custom-link.com">Custom Link</a>
</nav>
```

---

## 📊 How It Works

### SSR Flow (Dynamic Rendering)

```
User Request → Express Server
                ↓
            Parse URL → Map to markdown file
                ↓
            Read markdown file
                ↓
            Parse YAML frontmatter
                ↓
            Convert markdown to HTML (markdown-it)
                ↓
            Sanitize HTML (XSS prevention)
                ↓
            Generate metadata object
                ↓
            Render EJS template
                ↓
            Set cache headers
                ↓
            Return HTML response
```

### SSG Flow (Static Generation)

```
npm run build
    ↓
Read package.json (source config)
    ↓
Walk docs/ directory recursively
    ↓
For each .md file:
  - Parse frontmatter
  - Convert to HTML
  - Render with template
  - Save as .html in public/
    ↓
Copy assets/ → public/assets/
    ↓
Copy static/ → public/static/
    ↓
Generate index.html
    ↓
Complete! Ready to deploy public/
```

### Data Flow

```
Markdown File (with YAML frontmatter)
  ↓
gray-matter parses frontmatter
  ↓
markdown-it converts markdown → HTML
  ↓
sanitize-html removes unsafe HTML
  ↓
generateMetadata() creates SEO object
  ↓
EJS template injects all data
  ↓
Complete HTML with metadata tags
```

---

## 🎨 Template Features

The `server/template.ejs` includes:

### SEO Meta Tags
```html
<meta property="og:title" content="<%= title %>">
<meta property="og:description" content="<%= description %>">
<meta property="og:image" content="<%= metadata.image %>">
<meta name="twitter:card" content="summary_large_image">
<meta name="author" content="<%= metadata.author %>">
<meta name="publish-date" content="<%= metadata.date %>">
```

### Responsive Layout
```
Desktop (≥800px):  [Navbar] [Sidebar (260px)] [Content]
Tablet/Mobile:     [Navbar] [Content (full width)]
```

### Semantic HTML5
```html
<header>        <!-- Navigation bar -->
<aside>         <!-- Sidebar navigation -->
<main>          <!-- Main content area -->
<article>       <!-- Markdown content -->
<footer>        <!-- Footer (if added) -->
```

### Syntax Highlighting
Code blocks are preserved with `<pre><code>` tags. Add CSS or JavaScript highlighting library (e.g., highlight.js, Prism.js) to style.

---

## 🚢 Deployment

### Option 1: SSR (Recommended for Dynamic Content)

#### Render.com
1. Fork/connect repo on Render
2. Set Build Command: `npm install`
3. Set Start Command: `npm start` (or `cd packages/api && npm start`)
4. Render builds and deploys automatically

#### Vercel
```bash
vercel --cwd packages/api
```

#### Railway
1. Connect GitHub repo
2. Set Root Directory: `packages/api`
3. Deploy automatically on push

### Option 2: SSG (Recommended for Static Hosting)

#### Cloudflare Pages
1. Run: `npm run build` (generates `public/`)
2. Upload `public/` folder to Cloudflare Pages
3. Or connect git repo and set build output to `packages/api/public/`

#### GitHub Pages
```bash
npm run build
git add public/
git commit -m "Build docs"
git push origin gh-pages
```

#### Vercel Static
1. Configure `vercel.json`:
```json
{
  "buildCommand": "cd packages/api && npm run build",
  "outputDirectory": "packages/api/public",
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | HTTP server framework |
| `markdown-it` | ^13.0.1 | Markdown to HTML converter |
| `gray-matter` | ^4.0.3 | YAML frontmatter parser |
| `ejs` | ^3.1.9 | Template engine |
| `sanitize-html` | ^2.11.0 | XSS prevention |
| `compression` | ^1.7.4 | gzip/brotli compression |
| `helmet` | ^7.0.0 | Security headers |

**No runtime dependencies for SSG output** — static HTML files work anywhere.

---

## ⚡ Performance

### Caching Strategy

| Resource | Cache Time | Rationale |
|----------|-----------|-----------|
| Docs pages (`.html`) | 10 minutes | Allow quick updates |
| Assets (`.css`, `.js`, images) | 1 day | Versioning via filename |
| Static files (robots.txt) | 1 day | Rarely changes |

### Compression

- Automatic gzip for text responses
- Brotli compression when supported
- ~70% size reduction for HTML/CSS/JS

### Performance Tips

1. **SSR**: Cache at reverse proxy level (nginx, Cloudflare Workers)
2. **SSG**: Use CDN (Cloudflare, Netlify, Vercel)
3. **Images**: Optimize with imagemin before adding to `static/img/`
4. **CSS**: Theme CSS already minifiable (add PostCSS step)

---

## 🔒 Security

✅ **XSS Protection** — All HTML sanitized with `sanitize-html`
✅ **Security Headers** — Helmet.js adds HSTS, CSP, X-Frame-Options
✅ **File Path Traversal** — Path normalization prevents `../../../etc/passwd` attacks
✅ **Safe Markdown** — markdown-it configured with safe defaults

### Customizing Security Headers

Edit `index.js`:
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
    },
  },
}));
```

---

## 🧪 Testing

### Test SSR Rendering

```bash
curl http://localhost:3000/docs
curl http://localhost:3000/docs/getting-started
curl http://localhost:3000/docs/api/users
```

### Test SSG Build

```bash
npm run build
ls -la public/
open public/index.html
```

### Verify SEO Tags

```bash
curl http://localhost:3000/docs/intro | grep "og:title"
```

---

## 🐛 Troubleshooting

### "Cannot find module 'markdown-it'"

**Solution**: Install dependencies
```bash
npm install
```

### Markdown not rendering

**Check**: 
1. File exists at `packages/docs/docs/your-file.md`
2. Filename is lowercase with hyphens (not spaces or underscores)
3. YAML frontmatter is valid (use online YAML validator)

### Images not showing

**Check**:
1. Image files in `packages/docs/static/img/`
2. Markdown uses absolute paths: `![alt](/assets/img/logo.png)`
3. `build.js` copied assets to `public/assets/`

### Styles not applied

**Check**:
1. Theme CSS path in template: `/assets/css/theme-datly.css`
2. CSS file exists at `packages/docs/assets/css/theme-datly.css`
3. Browser cache cleared (or use incognito)

### Build script fails

**Check**:
1. All markdown files have valid YAML frontmatter
2. `packages/docs/docs/` directory exists
3. Permissions allow reading docs and writing to public/
4. Run with: `node build.js` (shows detailed errors)

---

## 📚 Example Markdown File

Create `packages/docs/docs/api/products.md`:

```markdown
---
title: "Products API"
description: "Complete reference for the Products API endpoints"
author: "API Team"
date: "2024-01-15"
image: "/assets/img/logo.png"
---

# Products API

The Products API provides access to product catalog and inventory data.

## Base URL

\`https://api.datly.com/api/products\`

## List Products

Retrieve all products with pagination.

### Request

\`\`\`
GET /api/products
\`\`\`

### Response

\`\`\`json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 99.99,
    "stock": 50
  }
]
\`\`\`

## Get Product

Retrieve a single product by ID.

### Request

\`\`\`
GET /api/products/:id
\`\`\`

### Response

\`\`\`json
{
  "id": 1,
  "name": "Product Name",
  "price": 99.99,
  "stock": 50
}
\`\`\`
```

---

## 🤝 Contributing

To add new documentation:

1. Create markdown file in `packages/docs/docs/`
2. Add YAML frontmatter with title, description, etc.
3. Write markdown content
4. For SSR: Restart server (`npm start`)
5. For SSG: Run build (`npm run build`)

---

## 📄 License

MIT

---

## 🎓 Learning Resources

- [markdown-it Documentation](https://github.com/markdown-it/markdown-it)
- [gray-matter Guide](https://github.com/jonschlinkert/gray-matter)
- [EJS Templating](https://ejs.co/)
- [Express.js Docs](https://expressjs.com/)
- [SEO Meta Tags Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review example markdown files in `packages/docs/docs/`
3. Check `index.js` for available routes and configuration
4. Verify file permissions and paths

---

**Happy documenting! 🚀**
