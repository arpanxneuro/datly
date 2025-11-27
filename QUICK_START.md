# Datly API + Docs SSR — Quick Reference

## ✅ What's Done

Your backend server now serves **both** the Mock Data API and Server-Side Rendered documentation in a single Node.js server.

## 📁 Project Structure

```
datly/
├── packages/
│   ├── api/
│   │   ├── index.js             ← Main server (API + Docs SSR)
│   │   ├── package.json
│   │   └── pnpm-lock.yaml
│   │
│   └── docs/
│       ├── README.md            ← Main docs entry
│       ├── docs/
│       │   ├── intro.md
│       │   ├── getting-started.md
│       │   ├── examples.md
│       │   └── api/             ← API reference pages
│       │       ├── users.md
│       │       ├── products.md
│       │       ├── posts.md
│       │       ├── comments.md
│       │       ├── likes.md
│       │       ├── loans.md
│       │       └── news.md
│       ├── assets/css/
│       │   └── theme-datly.css
│       └── static/
│           ├── robots.txt
│           ├── _headers
│           ├── _redirects
│           └── img/
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd packages/api
pnpm install
# or: npm install
```

### 2. Start the Server

```bash
# From repo root with pnpm workspace
pnpm --filter datly-api start

# Or directly from packages/api
npm start
```

Output:
```
✅ Datly API v3 running on port 3125
```

### 3. Test the Server

**API routes (mock data):**
- http://localhost:3125/users
- http://localhost:3125/products?limit=5
- http://localhost:3125/posts?format=csv
- http://localhost:3125/loans?limit=10&nulls=true

**Docs SSR routes:**
- http://localhost:3125/docs (main docs)
- http://localhost:3125/docs/intro
- http://localhost:3125/docs/api/posts
- http://localhost:3125/docs/api/users
- http://localhost:3125/docs/getting-started

## 📋 Routes Summary

| Route | Purpose | Params |
|-------|---------|--------|
| `GET /` | API welcome page | - |
| `GET /users` | Generate users | `limit`, `format`, `nulls` |
| `GET /products` | Generate products | `limit`, `format`, `nulls` |
| `GET /posts` | Generate posts | `limit`, `format`, `nulls` |
| `GET /comments` | Generate comments | `limit`, `format`, `nulls` |
| `GET /likes` | Generate likes | `limit`, `format`, `nulls` |
| `GET /loans` | Generate loan data | `limit`, `format`, `nulls` |
| `GET /news` | Generate news | `limit`, `format`, `nulls` |
| `GET /docs` | Docs home (SSR) | - |
| `GET /docs/*` | Docs pages (SSR) | - |
| `GET /docs/assets/*` | CSS/styling | - |
| `GET /docs/static/*` | Images/robots.txt | - |

## 📚 What's in index.js

The `index.js` file is organized into clear sections:

1. **File Header** — High-level overview of the server
2. **Imports** — Required packages
3. **ESM Setup** — `__dirname` polyfill for ES modules
4. **Docs Configuration** — File paths for markdown, static files
5. **SSR Renderer** — Markdown-to-HTML with `markdown-it` + sanitization
6. **Root Welcome Page** — GET / with quick links
7. **Mock Data Routes** — 7 endpoints with JSDoc comments
8. **Docs SSR Routes** — GET /docs and /docs/* with detailed routing logic
9. **Server Startup** — Listen on PORT

Each route has:
- Clear JSDoc comment describing purpose and params
- Query parameter handling
- Error handling
- Response formatting (JSON/CSV)

## 🔧 Dependencies

Required packages (already in `package.json`):
- `express@^5.1.0` — Web server
- `cors@^2.8.5` — CORS middleware
- `@faker-js/faker@^10.1.0` — Mock data generation
- `json2csv@6.0.0-alpha.2` — CSV export
- `markdown-it@^13.0.1` — Markdown to HTML
- `sanitize-html@^2.11.0` — XSS prevention

## 📖 Additional Documentation

See `SSR_SETUP.md` for:
- Detailed architecture explanation
- Full local testing guide
- Deployment options (Render, Vercel, Cloudflare, Heroku)
- Environment variables
- Troubleshooting
- Next steps (caching, nav generation, etc.)

## 🎯 Next Steps (Optional)

- Add caching for rendered markdown pages (Redis or in-memory)
- Generate sidebar/navbar server-side (parse `_sidebar.md`)
- Add API authentication/keys
- Deploy to production (Render, Vercel, Railway, etc.)
- Set up CI/CD for automated deployments

## ❓ Troubleshooting

**Port already in use?**
```bash
PORT=3126 npm start
```

**Docs page not rendering?**
- Check that markdown file exists: `packages/docs/docs/<path>.md`
- Verify the file path matches the URL
- Example: `/docs/api/posts` → `packages/docs/docs/api/posts.md`

**CSS not loading?**
- Open browser DevTools (F12) → Network tab
- Check for 404 on `/docs/assets/css/theme-datly.css`
- Ensure static middleware is running

## 📞 Support

- GitHub: https://github.com/arpanxneuro/datly
- Issues: Create an issue in the repo with details

---

**Status:** ✅ All core functionality implemented and tested.  
**Last Updated:** November 27, 2025
