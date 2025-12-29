const express = require("express");
const cors = require("cors");
const mongoose = require("./config/database");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
