import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import fs from "fs/promises";
import sanitizeHtml from "sanitize-html";
import grayMatter from "gray-matter";
import MarkdownIt from "markdown-it";
import { Parser } from "json2csv";

// ESM __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the views folder
export const VIEWS_DIR = path.join(__dirname, "views");

// Markdown Renderer (SSR)
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) =>
    `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`,
});

// Generate array helper
export const generateArray = (limit, fn) => Array.from({ length: limit }, fn);

// Random null helper
export const maybeNull = (value, allowNull) =>
  allowNull && Math.random() < 0.15 ? null : value;

// Response helper
export const respond = (res, data, format) => {
  if (format === "csv") {
    try {
      const parser = new Parser();
      const csv = parser.parse(data);
      res.header("Content-Type", "text/csv");
      return res.send(csv);
    } catch (err) {
      console.error("CSV parsing error:", err);
      return res.status(500).send("Error generating CSV");
    }
  } else {
    return res.json(data);
  }
};

// Render EJS template
export function renderEJSFile(view, data = {}) {
  const filePath = path.join(VIEWS_DIR, `${view}.ejs`);
  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, data, {}, (err, str) => {
      if (err) {
        console.error("EJS render error:", err, "filePath:", filePath);
        return reject(err);
      }
      resolve(str);
    });
  });
}

// Minify HTML while preserving <pre> blocks
function minifyHtml(html) {
  const preBlocks = [];
  html = html.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
    preBlocks.push(match);
    return `@@PRE_BLOCK_${preBlocks.length - 1}@@`;
  });

  html = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
      const minifiedCss = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{:;,}])\s*/g, "$1")
        .replace(/;}/g, "}");
      return `<style>${minifiedCss}</style>`;
    })
    .replace(/>\s+</g, "><")
    .replace(/\n+/g, "")
    .replace(/\s{2,}/g, " ");

  html = html.replace(/@@PRE_BLOCK_(\d+)@@/g, (_, idx) => preBlocks[idx]);
  return html;
}

// Sanitization options for Markdown -> HTML
const sanitizeOpts = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "h3",
    "h4",
    "span",
  ]),
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title"],
    "*": ["class", "id"],
  },
};

// Render Markdown file and wrap in EJS template
export async function renderMarkdownFile(res, mdPath, reqPath = "") {
  try {
    const raw = await fs.readFile(mdPath, "utf8");
    const { data: frontmatter, content: mdContent } = grayMatter(raw);

    const htmlBody = md.render(mdContent);
    const safeBody = sanitizeHtml(htmlBody, sanitizeOpts);

    const normalizeMeta = (v) => (v ? String(v).replace(/"/g, "&quot;") : "");

    const title = normalizeMeta(frontmatter.title || "Datly");
    const description = normalizeMeta(
      frontmatter.description ||
        "Datly is a developer‑centric REST API platform delivering realistic mock data of Users, Comments, Posts, Products, Loans, Likes and News for prototyping."
    );
    const author = normalizeMeta(frontmatter.author || "Datly Team");
    const date = normalizeMeta(frontmatter.date || new Date().toISOString());
    const imageUrl = normalizeMeta(
      frontmatter.image || "/docs/static/img/logo.png"
    );
    const iconUrl = normalizeMeta(
      frontmatter.image || "/docs/static/img/favicon.ico"
    );
    const baseUrl = "https://datly-docs.vercel.app";
    const pagePath = reqPath.startsWith("/") ? reqPath : `/docs/${reqPath}`;
    const canonicalUrl = normalizeMeta(baseUrl + pagePath);

    const rawHtml = await renderEJSFile("docs", {
      title,
      description,
      author,
      canonicalUrl,
      imageUrl,
      safeBody,
      date,
      iconUrl,
    });

    const finalHtml = minifyHtml(rawHtml);
    return res.send(finalHtml);
  } catch (err) {
    console.error("Docs render error:", err);
    return res.status(404).send("Documentation page not found");
  }
}
