Generate comment data tied to posts — useful for feed testing and UI edge cases.

```http
GET /comments?limit=10
```

---

## 🧩 Endpoint

<!-- Demo response for the Comments endpoint -->
### Demo Response

Below is an example JSON response you can expect from the `/comments` endpoint (default: `limit=10`). Use `?format=csv` to receive CSV instead.

```json
{
	"total": 3,
	"comments": [
		{
			"id": "b6f7a1d4-9c2b-4b1a-8e6f-2a1d3c4e5f6a",
			"postId": "e3c1b2d4-7a8f-4c1b-9d2e-5f6a7b8c9d0e",
			"user": "Aisha Khan",
			"comment": "Really enjoyed this post — great insights!",
			"createdAt": "2025-11-20T12:34:56.789Z"
		},
		{
			"id": "c7d8e9f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f",
			"postId": "d4c3b2a1-9f8e-7d6c-5b4a-3e2d1c0b9a8f",
			"user": "Liam O'Connor",
			"comment": "Could you share the data source for this?",
			"createdAt": "2025-11-21T08:12:34.123Z"
		},
		{
			"id": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
			"postId": "f0e1d2c3-b4a5-6789-0abc-def123456789",
			"user": "Noah Smith",
			"comment": "Thanks for sharing — this helped my testing.",
			"createdAt": "2025-11-22T14:22:11.456Z"
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
GET /comments?limit=10&format=json
```
