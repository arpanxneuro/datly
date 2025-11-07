import { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Datly API",
  tagline: "A free fake JSON API for testing, prototyping, and demos",
  favicon: "img/favicon.ico",

  // 🌍 SEO + SSG URLs
  url: process.env.DOCUSAURUS_URL ?? "http://localhost:3000",
  baseUrl: "/",

  organizationName: "arpanxneuro", // GitHub org/user
  projectName: "datly-docs", // Repo name

  trailingSlash: false, // better SEO URLs (no `/` duplication)
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // 👇 Custom global constants (available via useDocusaurusContext)
  customFields: {
    apiBase: process.env.DOCUSAURUS_API_BASE,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          routeBasePath: "/", // docs at root domain
          editUrl: "https://github.com/arpanxneuro/datly-docs/edit/main/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],

  // 🧠 SEO-optimized theme configuration
  themeConfig: {
    image: "img/social-card.png", // used for Open Graph
    metadata: [
      {
        name: "keywords",
        content: "fake api, json api, datly, free api, dummy data",
      },
      {
        name: "description",
        content:
          "Datly API provides free fake JSON data for developers, prototypes, and demos.",
      },
    ],
    navbar: {
      title: "Datly",
      logo: {
        alt: "Datly Logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "/", label: "Docs", position: "left" },
        {
          href: "https://github.com/arpanxneuro/datly-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{ label: "Getting Started", to: "/" }],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/arpanxneuro/datly-docs",
            },
            { label: "Twitter", href: "https://twitter.com/arpanxneuro" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Datly. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
