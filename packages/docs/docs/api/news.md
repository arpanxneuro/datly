# 📰 News

Generate realistic news articles for testing dashboards, analytics, or feed displays — including headlines, summaries, categories, authors, and optional images.

---

## 🧩 Endpoint

### Demo Response

Example request:

```http
GET /news?limit=2
```

Example JSON response:

```json
{
	"total": 2,
	"news": [
		{
			"id": "e1f2d3c4-b5a6-7890-cdef-0123456789ab",
			"headline": "Breakthrough in renewable energy storage",
			"category": "Technology",
			"author": "Priya Sharma",
			"summary": "Researchers announced a new battery technology that...",
			"publishedAt": "2025-11-18T07:30:00.000Z",
			"url": "https://news.example.com/article/123",
			"image": "https://picsum.photos/seed/news1/800/450"
		},
		{
			"id": "a9b8c7d6-e5f4-3210-9876-54321fedcba0",
			"headline": "Market roundup: Stocks inch higher",
			"category": "Business",
			"author": "Daniel Kim",
			"summary": "Stocks showed modest gains as investors reacted to...",
			"publishedAt": "2025-11-20T12:00:00.000Z",
			"url": "https://news.example.com/article/456",
			"image": "https://picsum.photos/seed/news2/800/450"
		}
	]
}
```

---

## ⚙️ Query parameters

- `limit` (number) — how many records to return (default: 10)
- `format` (string) — `json` or `csv` (default: `json`)
- `nulls` (boolean) — set `nulls=true` to inject ~15% null values into nullable fields

Example:

```http
GET /news?limit=20&format=csv
```
