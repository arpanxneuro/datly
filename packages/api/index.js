import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";
import { Parser } from "json2csv";

const app = express();
app.use(cors());
app.use(express.json());

// --- Utility Functions ---
const generateArray = (limit, generatorFn) =>
  Array.from({ length: limit }, generatorFn);

const maybeNull = (value, allowNull) => {
  if (!allowNull) return value;
  return Math.random() < 0.15 ? null : value; // ~15% chance to inject nulls
};

const respond = (res, data, format) => {
  if (format === "csv") {
    const parser = new Parser();
    const csv = parser.parse(data);
    res.header("Content-Type", "text/csv");
    return res.send(csv);
  } else {
    res.json(data);
  }
};

// --- USERS ---
app.get("/users", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const users = generateArray(limit, () => ({
    id: faker.string.uuid(),
    fname: maybeNull(faker.person.firstName(), allowNull),
    lname: maybeNull(faker.person.lastName(), allowNull),
    email: maybeNull(faker.internet.email(), allowNull),
    avatar: maybeNull(faker.image.avatar(), allowNull),
    country: maybeNull(faker.location.country(), allowNull),
    joinedAt: maybeNull(faker.date.past(), allowNull),
  }));

  respond(res, { total: users.length, users }, format);
});

// --- PRODUCTS ---
app.get("/products", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const products = generateArray(limit, () => ({
    id: faker.string.uuid(),
    title: maybeNull(faker.commerce.productName(), allowNull),
    price: maybeNull(faker.commerce.price(), allowNull),
    description: maybeNull(faker.commerce.productDescription(), allowNull),
    category: maybeNull(faker.commerce.department(), allowNull),
    rating: maybeNull(
      faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      allowNull
    ),
    stock: maybeNull(faker.number.int({ min: 1, max: 200 }), allowNull),
  }));

  respond(res, { total: products.length, products }, format);
});

// --- POSTS ---
app.get("/posts", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const posts = generateArray(limit, () => ({
    id: faker.string.uuid(),
    title: maybeNull(faker.lorem.sentence(), allowNull),
    body: maybeNull(faker.lorem.paragraphs(2), allowNull),
    author: maybeNull(faker.person.fullName(), allowNull),
    likes: maybeNull(faker.number.int({ min: 0, max: 1000 }), allowNull),
    commentsCount: maybeNull(faker.number.int({ min: 0, max: 50 }), allowNull),
    createdAt: maybeNull(faker.date.recent(), allowNull),
  }));

  respond(res, { total: posts.length, posts }, format);
});

// --- COMMENTS ---
app.get("/comments", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const comments = generateArray(limit, () => ({
    id: faker.string.uuid(),
    postId: maybeNull(faker.string.uuid(), allowNull),
    user: maybeNull(faker.person.fullName(), allowNull),
    comment: maybeNull(faker.lorem.sentence(), allowNull),
    createdAt: maybeNull(faker.date.recent(), allowNull),
  }));

  respond(res, { total: comments.length, comments }, format);
});

// --- LIKES ---
app.get("/likes", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const likes = generateArray(limit, () => ({
    id: faker.string.uuid(),
    postId: maybeNull(faker.string.uuid(), allowNull),
    userId: maybeNull(faker.string.uuid(), allowNull),
    createdAt: maybeNull(faker.date.recent(), allowNull),
  }));

  respond(res, { total: likes.length, likes }, format);
});

// --- LOANS (Enhanced, Kaggle-style Schema) ---
app.get("/loans", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const loans = generateArray(limit, () => ({
    Loan_ID: faker.string.alphanumeric({ length: 8, casing: "upper" }),
    Gender: maybeNull(
      faker.helpers.arrayElement(["Male", "Female"]),
      allowNull
    ),
    Married: maybeNull(faker.helpers.arrayElement(["Yes", "No"]), allowNull),
    Dependents: maybeNull(
      faker.helpers.arrayElement(["0", "1", "2", "3+"]),
      allowNull
    ),
    Education: maybeNull(
      faker.helpers.arrayElement(["Graduate", "Not Graduate"]),
      allowNull
    ),
    Self_Employed: maybeNull(
      faker.helpers.arrayElement(["Yes", "No"]),
      allowNull
    ),
    ApplicantIncome: maybeNull(
      faker.number.int({ min: 1500, max: 25000 }),
      allowNull
    ),
    CoapplicantIncome: maybeNull(
      faker.number.int({ min: 0, max: 20000 }),
      allowNull
    ),
    LoanAmount: maybeNull(
      faker.number.float({ min: 100, max: 700, precision: 0.1 }),
      allowNull
    ),
    Loan_Amount_Term: maybeNull(
      faker.helpers.arrayElement([120, 180, 240, 300, 360, 480]),
      allowNull
    ),
    Credit_History: maybeNull(
      faker.helpers.arrayElement([1.0, 0.0]),
      allowNull
    ),
    Property_Area: maybeNull(
      faker.helpers.arrayElement(["Urban", "Rural", "Semiurban"]),
      allowNull
    ),
    Loan_Status: maybeNull(faker.helpers.arrayElement(["Y", "N"]), allowNull),
    SanctionedDate: maybeNull(faker.date.past(), allowNull),
  }));

  respond(res, { total: loans.length, loans }, format);
});

// --- NEWS ---
app.get("/news", (req, res) => {
  const { limit = 10, format = "json", nulls = "false" } = req.query;
  const allowNull = nulls === "true";

  const news = generateArray(limit, () => ({
    id: faker.string.uuid(),
    headline: maybeNull(faker.lorem.sentence(), allowNull),
    category: maybeNull(
      faker.helpers.arrayElement([
        "Technology",
        "Business",
        "Sports",
        "Science",
        "Entertainment",
        "Politics",
      ]),
      allowNull
    ),
    author: maybeNull(faker.person.fullName(), allowNull),
    summary: maybeNull(faker.lorem.paragraph(), allowNull),
    publishedAt: maybeNull(faker.date.recent({ days: 10 }), allowNull),
    url: maybeNull(faker.internet.url(), allowNull),
    image: maybeNull(faker.image.urlPicsumPhotos(), allowNull),
  }));

  respond(res, { total: news.length, news }, format);
});

// --- ROOT ---
app.get("/", (req, res) => {
  res.send(`
  <h2>💡 Datly API v3 — Data Simulation Platform</h2>
  <p>Generate structured, messy, and analytics-ready mock data.</p>
  <ul>
    <li><code>?format=csv</code> or <code>?format=json</code></li>
    <li><code>?nulls=true</code> to inject missing data</li>
    <li>Example: <a href="/loans?limit=5&format=csv&nulls=true">/loans?limit=5&format=csv&nulls=true</a></li>
  </ul>
  `);
});

const PORT = process.env.PORT || 3125;
app.listen(PORT, () =>
  console.log(`✅ Datly API v3 running at http://localhost:${PORT}`)
);
