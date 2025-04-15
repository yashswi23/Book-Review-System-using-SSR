//Router file 
const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const Review = require("../model/Review");

// View all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("books", { books });
});

// New Book Form
router.get("/new", (req, res) => {
  res.render("newBook");
});

// Submit new book
router.post("/", async (req, res) => {
  await Book.create(req.body);
  res.redirect("/");
});

// Book details + reviews
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ bookId: book._id });
  res.render("bookDetails", { book, reviews });
});

// Submit a review
router.post("/:id/reviews", async (req, res) => {
  await Review.create({
    bookId: req.params.id,
    username: req.body.username,
    comment: req.body.comment
  });
  res.redirect(`/books/${req.params.id}`);
});

module.exports = router;
