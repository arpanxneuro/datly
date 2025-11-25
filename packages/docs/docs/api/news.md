---
id: news
title: News API
sidebar_position: 6
---

# 📰 News API

Generate realistic news articles for testing dashboards, analytics, or feed displays — including headlines, summaries, categories, authors, and optional images.

```http
GET /news?limit=10
```

---

## 🧩 Endpoint

import TryItOut from "@site/src/components/TryItOut";

<TryItOut endpoint="/news" defaultLimit={5} />

---

## ⚙️ Query parameters

- `limit` (number) — how many records to return (default: 10)
- `format` (string) — `json` or `csv` (default: `json`)
- `nulls` (boolean) — set `nulls=true` to inject ~15% null values into nullable fields

Example:

```http
GET /news?limit=20&format=csv
```
