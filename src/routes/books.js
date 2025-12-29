const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books");
const { validateBook } = require("../middleware/validate");

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBookById);

router.post("/", validateBook, bookController.createBook);

router.put("/:id", validateBook, bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

router.post("/:bookId/borrow", bookController.borrowBook);

router.post("/:bookId/return", bookController.returnBook);

module.exports = router;
