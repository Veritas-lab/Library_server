const Book = require("../models/Book");
const User = require("../models/User");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate(
      "borrowedBy",
      "firstName lastName username"
    );
    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "borrowedBy",
      "firstName lastName username"
    );
    if (!book) {
      return res.status(404).json({ error: "Книга не найдена" });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    const newBook = new Book({
      title,
      author,
      year: parseInt(year),
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        year: parseInt(year),
      },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Книга не найдена" });
    }

    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Книга не найдена" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Требуется ID пользователя" });
    }

    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book) {
      return res.status(404).json({ error: "Книга не найдена" });
    }

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ error: "Книга уже забронирована" });
    }

    book.isAvailable = false;
    book.borrowedBy = userId;
    await book.save();

    res.json({
      message: "Книга, успешно получена напрокат",
      book,
    });
  } catch (error) {
    next(error);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Требуется ID пользователя" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Книга не найдена" });
    }

    if (book.isAvailable) {
      return res.status(400).json({ error: "Книга не заимствована" });
    }

    if (book.borrowedBy.toString() !== userId) {
      return res
        .status(400)
        .json({ error: "Этот пользователь не брал книгу напрокат" });
    }

    book.isAvailable = true;
    book.borrowedBy = null;
    await book.save();

    res.json({
      message: "Книга успешно возвращена",
      book,
    });
  } catch (error) {
    next(error);
  }
};
