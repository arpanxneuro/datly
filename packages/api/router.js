import { Router } from "express";
import { faker } from "@faker-js/faker";
import { Parser } from "json2csv";
import { generateArray, maybeNull, respond } from "./utils.js";

const router = Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
  try {
    const format = req.query.format; // allows ?format=json
    respond(
      res,
      {
        message:
          "Welcome to Datly API — your gateway to realistic test data for prototyping and development.",
      },
      format
    );
  } catch (err) {
    console.error("Error in / route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * GET /users
 * Query params: limit=10, format=json, nulls=false
 */
router.get("/users", (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error in /users:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /products
 * Query params: limit=10, format=json, nulls=false
 * Fields: id, title, price, description, category, rating, stock
 */
router.get("/products", (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error in /products:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /posts
 * Query params: limit=10, format=json, nulls=false
 * Fields: id, title, body, author, likes, commentsCount, createdAt
 */
router.get("/posts", (req, res) => {
  try {
    const { limit = 10, format = "json", nulls = "false" } = req.query;
    const allowNull = nulls === "true";

    const posts = generateArray(limit, () => ({
      id: faker.string.uuid(),
      title: maybeNull(faker.lorem.sentence(), allowNull),
      body: maybeNull(faker.lorem.paragraphs(2), allowNull),
      author: maybeNull(faker.person.fullName(), allowNull),
      likes: maybeNull(faker.number.int({ min: 0, max: 1000 }), allowNull),
      commentsCount: maybeNull(
        faker.number.int({ min: 0, max: 50 }),
        allowNull
      ),
      createdAt: maybeNull(faker.date.recent(), allowNull),
    }));

    respond(res, { total: posts.length, posts }, format);
  } catch (err) {
    console.error("Error in /posts:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /comments
 * Query params: limit=10, format=json, nulls=false
 * Fields: id, postId, user, comment, createdAt
 */
router.get("/comments", (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error in /comments:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /likes
 * Query params: limit=10, format=json, nulls=false
 * Fields: id, postId, userId, createdAt
 */
router.get("/likes", (req, res) => {
  try {
    const { limit = 10, format = "json", nulls = "false" } = req.query;
    const allowNull = nulls === "true";

    const likes = generateArray(limit, () => ({
      id: faker.string.uuid(),
      postId: maybeNull(faker.string.uuid(), allowNull),
      userId: maybeNull(faker.string.uuid(), allowNull),
      createdAt: maybeNull(faker.date.recent(), allowNull),
    }));

    respond(res, { total: likes.length, likes }, format);
  } catch (err) {
    console.error("Error in /likes:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /loans
 * Query params: limit=10, format=json, nulls=false
 * Kaggle-style Loan Dataset schema
 * Fields: Loan_ID, Gender, Married, Dependents, Education, etc.
 */
router.get("/loans", (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error in /loans:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /news
 * Query params: limit=10, format=json, nulls=false
 * Fields: id, headline, category, author, summary, publishedAt, url, image
 */
router.get("/news", (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error in /news:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
