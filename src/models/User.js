const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Имя обязательно"],
      minlength: [2, "Имя должно содержать минимум 2 символа"],
    },
    lastName: {
      type: String,
      required: [true, "Фамилия обязательна"],
      minlength: [2, "Фамилия должна содержать минимум 2 символа"],
    },
    username: {
      type: String,
      required: [true, "Username обязателен"],
      minlength: [5, "Username должен содержать минимум 5 символов"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
