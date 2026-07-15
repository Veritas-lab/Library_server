const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: "Validation error",
      details: errors,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: "Duplicate field value entered",
    });
  }

  res.status(500).json({
    error: "Internal server error",
  });
};

module.exports = errorHandler;
