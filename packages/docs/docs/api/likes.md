Generate lightweight like records for posts — useful for metrics dashboards and social interactions.

---

## 🧩 Endpoint

### Demo Response

Example request:

```http
GET /likes?limit=3
```

Example JSON response:

```json
{
	"total": 3,
	"likes": [
		{
			"id": "f1e2d3c4-b5a6-7890-cdef-0123456789ab",
			"postId": "a1b2c3d4-e5f6-7089-0abc-def123456789",
			"userId": "9f8e7d6c-5b4a-3210-abcdef123456",
			"createdAt": "2025-11-20T11:22:33.444Z"
		},
		{
			"id": "0a1b2c3d-4e5f-6789-0abc-def123456789",
			"postId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
			"userId": "8e7d6c5b-4a3b-210f-edcb-a98765432101",
			"createdAt": "2025-11-21T09:10:11.222Z"
		},
		{
			"id": "abc12345-def6-7890-abcd-ef0123456789",
			"postId": "0f1e2d3c-4b5a-6978-1234-abcdef012345",
			"userId": "fedcba98-7654-3210-fedc-ba9876543210",
			"createdAt": "2025-11-22T14:55:00.000Z"
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
GET /likes?limit=20&format=csv
```
