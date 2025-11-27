# 👥 Users

Retrieve dynamically generated user data from **Datly** — ideal for mock testing, frontend development, or AI-driven prototypes.

---

## 🧩 Endpoint

### Demo Response

Example request:

```http
GET /users?limit=3
```

Example JSON response:

```json
{
	"total": 3,
	"users": [
		{
			"id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
			"fname": "Maya",
			"lname": "Patel",
			"email": "maya.patel@example.com",
			"avatar": "https://example.com/avatar/1.png",
			"country": "India",
			"joinedAt": "2025-11-10T09:12:34.567Z"
		},
		{
			"id": "a3b1c2d3-e4f5-6789-abcd-0123456789ab",
			"fname": "Liam",
			"lname": "Nguyen",
			"email": "liam.nguyen@example.com",
			"avatar": "https://example.com/avatar/2.png",
			"country": "United States",
			"joinedAt": "2025-10-05T14:22:11.123Z"
		},
		{
			"id": "b2c3d4e5-f6a7-8901-b234-56789abcdef0",
			"fname": "Sara",
			"lname": "Gonzalez",
			"email": "sara.gonzalez@example.com",
			"avatar": "https://example.com/avatar/3.png",
			"country": "Spain",
			"joinedAt": "2025-09-30T07:45:00.000Z"
		}
	]
}
```

---

## ⚙️ Query parameters

- `limit` (number) — how many records to return (default: 10)
- `format` (string) — `json` or `csv` (default: `json`)
- `nulls` (boolean) — set `nulls=true` to inject ~15% null values into nullable fields

Example (CSV with nulls):

```http
GET /users?limit=5&format=csv&nulls=true
```
