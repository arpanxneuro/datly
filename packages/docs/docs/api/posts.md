# 📝 Posts

Retrieve dynamically generated blog posts from **Datly** — perfect for frontend testing, prototype feeds, or AI prompt data generation.

---

## 🧩 Endpoint

### Demo Response

Example request:

```http
GET /posts?limit=2
```

Example JSON response:

```json
{
	"total": 2,
	"posts": [
		{
			"id": "d3f1c2b4-5a6e-7b8c-9d0e-1f2a3b4c5d6e",
			"title": "How to build fast prototypes",
			"body": "Rapid prototyping can help you validate ideas quickly...",
			"author": "Olivia Reed",
			"likes": 42,
			"commentsCount": 7,
			"createdAt": "2025-11-15T10:05:00.000Z"
		},
		{
			"id": "c4b3a2d1-e0f9-8a7b-6c5d-4e3f2a1b0c9d",
			"title": "Testing UX with synthetic data",
			"body": "Using mock data to stress test layouts and edge cases...",
			"author": "Noah Park",
			"likes": 18,
			"commentsCount": 3,
			"createdAt": "2025-11-12T08:30:22.000Z"
		}
	]
}
```

---

## ⚙️ Query parameters

- `limit` (number) — how many records to return (default: 10)
- `format` (string) — `json` or `csv` (default: `json`)
- `nulls` (boolean) — set `nulls=true` to inject ~15% null values into nullable fields

Example (JSON with nulls):

```http
GET /posts?limit=3&nulls=true
```
