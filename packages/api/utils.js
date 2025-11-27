import path from "path";
import ejs from "ejs";
import sanitizeHtml from "sanitize-html";
import grayMatter from "gray-matter";
import fs from "fs/promises";
import MarkdownIt from "markdown-it/index.js";

export const generateArray = (limit, fn) => Array.from({ length: limit }, fn);

// Markdown Renderer (SSR)
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

export const maybeNull = (value, allowNull) =>
  allowNull && Math.random() < 0.15 ? null : value;

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

export function renderEJSFile(view, data = {}) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), "views", `${view}.ejs`);
    ejs.renderFile(filePath, data, {}, (err, str) => {
      if (err) return reject(err);
      resolve(str);
    });
  });
}

function minifyHtml(html) {
  // Step 1: Extract <pre> blocks so we don't touch code
  const preBlocks = [];
  html = html.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
    preBlocks.push(match);
    return `@@PRE_BLOCK_${preBlocks.length - 1}@@`;
  });
  // Step 2: Minify the rest of the HTML
  html = html
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, "")
    // Minify <style> blocks
    .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
      const minifiedCss = css
        .replace(/\/\*[\s\S]*?\*\//g, "") // remove CSS comments
        .replace(/\s+/g, " ") // collapse whitespace
        .replace(/\s*([{:;,}])\s*/g, "$1") // trim around syntax chars
        .replace(/;}/g, "}"); // remove trailing semicolons
      return `<style>${minifiedCss}</style>`;
    })
    // Collapse whitespace between HTML tags
    .replace(/>\s+</g, "><")
    // Remove extra newlines
    .replace(/\n+/g, "")
    // Collapse multiple spaces
    .replace(/\s{2,}/g, " ");
  // Step 3: Restore <pre> blocks without changes
  html = html.replace(/@@PRE_BLOCK_(\d+)@@/g, (_, idx) => preBlocks[idx]);

  return html;
}

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

// SSR Renderer: reads markdown file, renders HTML, sends wrapped response
export async function renderMarkdownFile(res, mdPath, reqPath = "") {
  try {
    const raw = await fs.readFile(mdPath, "utf8");
    const { data: frontmatter, content: mdContent } = grayMatter(raw);
    const htmlBody = md.render(mdContent);
    const safeBody = sanitizeHtml(htmlBody, sanitizeOpts);
    const normalizeMeta = (v) => (v ? String(v).replace(/"/g, "&quot;") : "");
    // Extract metadata
    const title = normalizeMeta(frontmatter.title || "Datly");
    const description = normalizeMeta(
      frontmatter.description ||
        "Datly is a developer‑centric REST API platform designed for rapid prototyping and seamless integration — delivering realistic, structured mock data of fake Users, Comments, Posts, Products, Loans, Likes and News, with flexible query parameters for pagination, limits and filters so developers can test, iterate and launch with confidence."
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
