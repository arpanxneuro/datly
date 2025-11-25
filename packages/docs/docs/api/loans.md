---
id: loans
title: Loans API
sidebar_position: 6
---

# 💸 Loans API

Generate synthetic loan records for financial dashboards and model testing.

```http
GET /loans?limit=10
```

---

## 🧩 Endpoint

import TryItOut from "@site/src/components/TryItOut";

<TryItOut endpoint="/loans" defaultLimit={5} />

---

## ⚙️ Query parameters

- `limit` (number) — how many records to return (default: 10)
- `format` (string) — `json` or `csv` (default: `json`)
- `nulls` (boolean) — set `nulls=true` to inject ~15% null values into nullable fields

Example:

```http
GET /loans?limit=5&format=json
```
