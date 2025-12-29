const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Заголовок обязателен"],
      minlength: [2, "Заголовок должен содержать минимум 2 символа"],
    },
    author: {
      type: String,
      required: [true, "Автор обязателен"],
      minlength: [2, "Имя автора должно содержать минимум 2 символа"],
    },
    year: {
      type: Number,
      required: [true, "Год выпуска обязателен"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
