# 💰 Loans

Generate synthetic loan records for financial dashboards and model testing.
---

## 🧩 Endpoint

### Demo Response (Kaggle-style schema)

Example request:

```http
GET /loans?limit=2
```

Example JSON response:

```json
{
	"total": 2,
	"loans": [
		{
			"Loan_ID": "AB12CD34",
			"Gender": "Male",
			"Married": "Yes",
			"Dependents": "0",
			"Education": "Graduate",
			"Self_Employed": "No",
			"ApplicantIncome": 4500,
			"CoapplicantIncome": 0,
			"LoanAmount": 120.5,
			"Loan_Amount_Term": 360,
			"Credit_History": 1.0,
			"Property_Area": "Urban",
			"Loan_Status": "Y",
			"SanctionedDate": "2024-07-15T00:00:00.000Z"
		},
		{
			"Loan_ID": "EF56GH78",
			"Gender": "Female",
			"Married": "No",
			"Dependents": "1",
			"Education": "Not Graduate",
			"Self_Employed": "Yes",
			"ApplicantIncome": 3200,
			"CoapplicantIncome": 1200,
			"LoanAmount": 85.0,
			"Loan_Amount_Term": 240,
			"Credit_History": 0.0,
			"Property_Area": "Semiurban",
			"Loan_Status": "N",
			"SanctionedDate": "2025-02-01T00:00:00.000Z"
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
GET /loans?limit=5&format=json
```
