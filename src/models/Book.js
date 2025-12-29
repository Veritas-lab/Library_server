const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 0,
      max: new Date().getFullYear(),
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
