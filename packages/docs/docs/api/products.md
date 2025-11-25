Retrieve realistic, mock e-commerce product data from **Datly** — perfect for frontend prototyping, dashboard demos, and marketplace simulations.`

---

## 🧩 Endpoint

### Demo Response

Example request:

```http
GET /products?limit=2
```

Example JSON response:

```json
{
	"total": 2,
	"products": [
		{
			"id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
			"title": "Wireless Noise-Cancelling Headphones",
			"price": "199.99",
			"description": "Comfortable over-ear headphones with active noise cancellation.",
			"category": "Electronics",
			"rating": 4.5,
			"stock": 120
		},
		{
			"id": "0f1e2d3c-4b5a-6978-1234-abcdef012345",
			"title": "Organic Cotton T-Shirt",
			"price": "24.50",
			"description": "Soft, breathable t-shirt made from organic cotton.",
			"category": "Apparel",
			"rating": 4.1,
			"stock": 54
		}
	]
}
```

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