<p align="center">
  <img src="./packages/docs/static/img/logo.png" alt="Datly Logo" width="120" />
</p>

<h1 align="center">Datly</h1>

<p align="center">
  <strong>A developer-friendly API for generating realistic fake data – Users, Comments, Posts, and more!</strong>
</p>

<p align="center">
  <a href="https://datly-api.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/API-Live-green?style=flat-square" alt="API Live">
  </a>
  <a href="https://datly.pages.dev" target="_blank">
    <img src="https://img.shields.io/badge/Docs-View-blue?style=flat-square" alt="Docs">
  </a>
  <a href="https://github.com/arpanxneuro/datly" target="_blank">
    <img src="https://img.shields.io/github/stars/arpanxneuro/datly?style=flat-square&logo=github" alt="GitHub Stars">
  </a>
  <a href="https://github.com/arpanxneuro/datly/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/arpanxneuro/datly?style=flat-square&logo=github" alt="Issues">
  </a>
</p>

---

## 🌟 Features

- REST API endpoints for **Users, Products, Posts, Likes, Comments, Loans, News**.
- **Customizable query parameters**: pagination, limit, filters.
- **Interactive API Playground** to test endpoints.
- **Developer-friendly docs** built with Docusaurus 3.9.
- Free, open-source, and easy to integrate into any project.
- Future-proof: supports subdomains, GraphQL, and SSR-friendly architecture.

---

## 📌 Keywords / Tags  
`dummy‑data` `api` `fake‑data` `rest‑api` `nodejs` `express` `typescript` `developers‑tool` `open‑source` `data‑generator` `prototyping` `dev‑tool` `testing‑data` `mock‑data` `documentation`

---

## ⚡ API Overview

| Endpoint    | Description           | Sample URL                                         |
| ----------- | --------------------- | -------------------------------------------------- |
| `/users`    | Fetch random users    | `https://datly-api.onrender.com/users?limit=10`    |
| `/products` | Fetch random products | `https://datly-api.onrender.com/products?limit=10` |
| `/posts`    | Fetch random posts    | `https://datly-api.onrender.com/posts?limit=10`    |
| `/comments` | Fetch random comments | `https://datly-api.onrender.com/comments?limit=10` |
| `/likes`    | Fetch random likes    | `https://datly-api.onrender.com/likes?limit=10`    |
| `/loans`    | Fetch random loans    | `https://datly-api.onrender.com/loans?limit=10`    |
| `/news`     | Fetch random news     | `https://datly-api.onrender.com/news?limit=10`     |

> Every endpoint supports the `limit` query param (default: 10). Example response is with `limit: 1`

**Example Response (`/users`)**:

```json
{
  "total": 1,
  "users": [
    {
      "id": "7e7a7aaa-1d4b-42e3-84f2-1e247362c8d1",
      "fname": "Rebekah",
      "lname": "Mann",
      "email": "Amelie50@yahoo.com",
      "avatar": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/97.jpg",
      "country": "Anguilla",
      "joinedAt": "2025-04-02T22:42:17.412Z"
    }
  ]
}
```

**Example Response (`/products`)**:

```json
{
  "total": 1,
  "products": [
    {
      "id": "33366992-9b4c-428a-a0f7-4168edfacf8e",
      "title": "Sleek Steel Chair",
      "price": "180.95",
      "description": "Experience the pink brilliance of our Fish, perfect for jubilant environments",
      "category": "Books",
      "rating": 3.647617737036779,
      "stock": 15
    }
  ]
}
```

**Example Response (`/posts`)**:

```json
{
  "total": 1,
  "posts": [
    {
      "id": "4aea0b3d-1582-4936-915a-588b56460e18",
      "title": "Thesis culpo baiulus spoliatio chirographum videlicet claro.",
      "body": "Turba cinis arma tunc. Aegre itaque adsidue calco colligo similique pariatur deduco sordeo caries. Sumo reprehenderit cerno tam thesaurus.\nDecens aliquid dicta cilicium volaticus impedit consectetur demitto tametsi. Ater alveus tot comis stips vinitor sui arcesso addo videlicet. Illo vulpes dolore viriliter ter aperte contego.",
      "author": "Miss Thelma Lind I",
      "likes": 368,
      "commentsCount": 8,
      "createdAt": "2025-11-07T04:55:59.821Z"
    }
  ]
}
```

**Example Response (`/comments`)**:

```json
{
  "total": 1,
  "comments": [
    {
      "id": "be5f6814-e47c-4529-ae0b-6b21d2d46598",
      "postId": "7975c1ae-9276-49f5-a8f6-834c11b32f5c",
      "user": "Monica Hegmann",
      "comment": "Vetus adficio coadunatio explicabo.",
      "createdAt": "2025-11-07T03:59:06.504Z"
    }
  ]
}
```

**Example Response (`/likes`)**:

```json
{
  "total": 1,
  "likes": [
    {
      "id": "e2210c85-13e1-46d7-8634-b3ebed52c13b",
      "postId": "eb7f9172-54c9-4c75-a823-646c8af7a5cf",
      "userId": "e602a897-d1f7-4f6a-9535-a5cecf5ec583",
      "createdAt": "2025-11-07T01:46:09.056Z"
    }
  ]
}
```

**Example Response (`/loans`)**:

```json
{
  "total": 1,
  "loans": [
    {
      "Loan_ID": "KIMV8X98",
      "Gender": "Male",
      "Married": "No",
      "Dependents": "2",
      "Education": "Not Graduate",
      "Self_Employed": "No",
      "ApplicantIncome": 22555,
      "CoapplicantIncome": 13826,
      "LoanAmount": 149.43561309498557,
      "Loan_Amount_Term": 360,
      "Credit_History": 0,
      "Property_Area": "Rural",
      "Loan_Status": "Y",
      "SanctionedDate": "2025-02-05T03:13:39.284Z"
    }
  ]
}
```

**Example Response (`/news`)**:

```json
{
  "total": 1,
  "news": [
    {
      "id": "7d8a7c41-f0ed-4f8c-9dde-fa2666d2368d",
      "headline": "Supellex vulgaris turbo minus.",
      "category": "Business",
      "author": "Lance Shields-O'Hara",
      "summary": "Cinis tabesco approbo thalassinus cupressus utor unde officia tracto. Bis ter amplus aer audio comptus desino. Alter concedo abstergo creo sol deleniti patruus.",
      "publishedAt": "2025-11-03T06:01:00.133Z",
      "url": "https://best-reconsideration.biz",
      "image": "https://picsum.photos/seed/gyGU7K/1546/2317?grayscale&blur=1"
    }
  ]
}
```
