---
id: products
title: Products API
sidebar_position: 2
---

# 🛍️ Products API

Retrieve realistic, mock e-commerce product data from **Datly** — perfect for frontend prototyping, dashboard demos, and marketplace simulations.

```http
GET /products?limit=10
```

---

## 🧩 Endpoint

Try it live below 👇

import TryItOut from "@site/src/components/TryItOut";

<TryItOut endpoint="/products" defaultLimit={5} />

---

## ⚙️ Query parameters

- `limit` (number) — how many records to return (default: 10)
- `format` (string) — `json` or `csv` (default: `json`)
- `nulls` (boolean) — set `nulls=true` to inject ~15% null values into nullable fields

Example (JSON):

```http
GET /products?limit=5&format=json
```

---