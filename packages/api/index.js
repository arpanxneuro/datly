import express from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import helmet from "helmet";
import router from "./router.js";
import { renderMarkdownFile } from "./utils.js";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP if you want to configure later
    crossOriginEmbedderPolicy: false, // Optional for some cross-origin cases
  })
);
app.use(cors());
app.use(express.json());
app.use(compression()); // enable gzip/deflate compression globally
// ESM __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Docs Paths Configuration
const DOCS_ROOT = path.join(__dirname, "..", "docs"); // packages/docs
const DOCS_MD_ROOT = path.join(DOCS_ROOT, "docs"); // markdown files
const DOCS_STATIC = path.join(DOCS_ROOT, "static"); // robots.txt, images
const DOCS_ASSETS = path.join(DOCS_MD_ROOT, "assets"); // CSS, theme
export const VIEWS_DIR = path.join(__dirname, "views");
app.set("views", VIEWS_DIR);// or wherever your template files live

// Serve static files (images, robots.txt, _redirects, etc.)
app.use("/docs/static", express.static(DOCS_STATIC));
// Serve docs CSS and assets
app.use("/docs/assets", express.static(DOCS_ASSETS));
// Sanitization Config (prevent XSS)

app.use("/api", router);

// ROOT WELCOME PAGE
app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.get("/docs", async (req, res) => {
  const readme = path.join(DOCS_ROOT, "README.md");
  return renderMarkdownFile(res, readme, "Datly Docs");
});

app.get(/^\/docs\/(.*)$/, async (req, res) => {
  const rel = req.params[0] || "";
  if (rel.startsWith("assets/") || rel.startsWith("static/")) {
    return res.status(404).end();
  }
  const mdRel = rel.replace(/\/$/, "");
  const candidatePaths = [
    path.join(DOCS_MD_ROOT, mdRel + ".md"),
    path.join(DOCS_MD_ROOT, mdRel, "README.md"),
  ];

  for (const p of candidatePaths) {
    try {
      await fs.access(p);
      return renderMarkdownFile(res, p, mdRel || "Datly Docs");
    } catch (e) {
      // Try next candidate
    }
  }

  // No markdown file found
  return res.status(404).send("Documentation page not found");
});

// SERVER STARTUP
const PORT = process.env.PORT || 3125;
app.listen(PORT, () => {
  console.log(`✅ Datly API v3 running on port ${PORT}`);
});
