import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * 📚 Docusaurus Sidebar Configuration
 * Structured, scalable, and developer-friendly
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "🧭 Introduction",
    },
    {
      type: "doc",
      id: "getting-started",
      label: "🚀 Getting Started",
    },
    {
      type: "doc",
      id: "examples",
      label: "🧰 Examples & Usage",
    },
    {
      type: "category",
      label: "⚙️ API Reference",
      collapsed: false, // keeps the API section open by default
      link: {
        type: "generated-index",
        title: "API Reference",
        description:
          "Comprehensive documentation for all available API endpoints including Users, Posts, Products, Comments, Likes, Loans, and News.",
        slug: "/api",
      },
      items: [
        {
          type: "doc",
          id: "api/users",
          label: "👥 Users API",
        },
        {
          type: "doc",
          id: "api/posts",
          label: "📝 Posts API",
        },
        {
          type: "doc",
          id: "api/products",
          label: "🛍️ Products API",
        },
        {
          type: "doc",
          id: "api/comments",
          label: "💬 Comments API",
        },
        {
          type: "doc",
          id: "api/likes",
          label: "👍 Likes API",
        },
        {
          type: "doc",
          id: "api/loans",
          label: "💸 Loans API",
        },
        {
          type: "doc",
          id: "api/news",
          label: "📰 News API",
        },
      ],
    },
    // {
    //   type: "doc",
    //   id: "roadmap",
    //   label: "📊 Roadmap & Changelog",
    // },
  ],
};

export default sidebars;
