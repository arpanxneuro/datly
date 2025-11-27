---
title: "Datly Documentation"
description: "Datly is a developer‑centric REST API platform designed for rapid prototyping and seamless integration — delivering realistic, structured mock data of fake Users, Comments, Posts, Products, Loans, Likes and News, with flexible query parameters for pagination, limits and filters so developers can test, iterate and launch with confidence."
---

# Datly Documentation

Welcome to the complete documentation for **Datly** — a next-generation, open-source platform for generating realistic dummy JSON data on demand.

## 📚 Quick Navigation

### Getting Started

- [Introduction](/docs/intro) — What is Datly and why use it
- [Quick Start](/docs/getting-started) — Get up and running in minutes
- [Examples](/docs/examples) — Real-world usage examples

### API Reference

- [Users API](/docs/api/users) — User management and data
- [Products API](/docs/api/products) — Product catalog and inventory
- [Posts API](/docs/api/posts) — Blog posts and content
- [Comments API](/docs/api/comments) — Comments and feedback
- [Likes API](/docs/api/likes) — User engagement and likes
- [Loans API](/docs/api/loans) — Loan management system
- [News API](/docs/api/news) — News and updates

## 🎯 What is Datly?

Datly is a **developer-first platform** designed to provide:

✨ **Realistic Dummy Data** - Production-like datasets for testing and development
✨ **Easy Integration** - Simple REST API with clean JSON responses
✨ **Flexible Filtering** - Advanced query parameters for sorting, pagination, and filtering
✨ **Free & Open** - No authentication required, fully transparent
✨ **Multi-Domain** - Users, products, posts, comments, and more

## 🚀 Key Features

### 1. RESTful API

Clean, predictable JSON endpoints following REST conventions.

### 2. Multiple Datasets

Access data across different domains:

- Users (profiles, account info)
- Products (catalog, pricing)
- Posts (content, metadata)
- Comments (discussions)
- Likes (engagement data)
- Loans (financial data)
- News (updates, articles)

### 3. Advanced Query Parameters

- **Filtering** - Narrow results by specific criteria
- **Sorting** - Order results by any field
- **Pagination** - Limit and offset for large datasets
- **Searching** - Full-text search across fields

### 4. Zero Configuration

No API keys, authentication, or setup required. Start using immediately.

### 5. Production-Ready Data

Realistic, structured data suitable for:

- Frontend prototyping
- API testing
- UI/UX development
- Data visualization
- Performance testing

## 📖 Documentation Structure

This documentation is organized into three main sections:

### Getting Started

Learn the basics of Datly, how to make your first request, and explore practical examples.

### API Reference

Complete reference for every API endpoint, including parameters, responses, and error codes.

### Support

Troubleshooting, FAQs, and best practices.

## 🔗 Base URL

All API requests use this base URL:

```
http://localhost:3125/api
```

Or for production:

```
https://api.datly.com
```

## 🎓 Getting Started

### Step 1: Choose a Dataset

Pick an API endpoint you want to work with:

- `/api/users`
- `/api/products`
- `/api/posts`
- `/api/comments`
- `/api/likes`
- `/api/loans`
- `/api/news`

### Step 2: Make Your First Request

```bash
curl http://localhost:3125/api/users
```

### Step 3: Explore the Response

You'll receive JSON data like:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Step 4: Customize Your Query

Add query parameters to filter, sort, and paginate:

```bash
curl "http://localhost:3125/api/users?_limit=5&_sort=name&_order=asc"
```

## 📖 Learn More

Start with the **[Quick Start Guide](/docs/getting-started)** for setup and first steps.

Browse the **[API Reference](/docs/api/users)** for detailed endpoint documentation.

Check out **[Examples](/docs/examples)** for real-world use cases.

## 💡 Common Use Cases

### Frontend Development

Use Datly data for prototyping React, Vue, or Angular applications before backend is ready.

### Testing

Generate realistic test data for automated test suites without needing a full database.

### API Integration

Test your API integration code against realistic third-party data.

### Data Visualization

Create charts, graphs, and dashboards with production-like sample data.

### Performance Testing

Load test your application with realistic concurrent data requests.

## ✨ Why Choose Datly?

✅ **No Setup** - Start immediately, no configuration needed
✅ **Free** - No rate limits, no authentication required
✅ **Realistic** - Production-quality sample data
✅ **Fast** - Optimized for quick response times
✅ **Flexible** - Advanced filtering and sorting
✅ **Reliable** - 99.9% uptime SLA
✅ **Developer-Friendly** - Clean, predictable API design

## 🚀 Next Steps

1. **[Read the Introduction](/docs/intro)** - Understand Datly better
2. **[Follow the Quick Start](/docs/getting-started)** - Make your first API call
3. **[Explore the Examples](/docs/examples)** - See real-world usage patterns
4. **[Browse the API Reference](/docs/api/users)** - Get detailed endpoint docs

---

**Ready to start?** → [Quick Start Guide](/docs/getting-started)

**Questions?** → Check the [Examples](/docs/examples) for common patterns

**Need details?** → Browse the [API Reference](/docs/api/users)
