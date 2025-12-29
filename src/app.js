const express = require("express");
const cors = require("cors");
require("./config/database");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    message: "📚 Library API is running!",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      books: "/api/books",
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    suggestion: "Try GET / or GET /api/users",
  });
});

app.use(errorHandler);

module.exports = app;
