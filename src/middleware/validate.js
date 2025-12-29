const validateUser = (req, res, next) => {
  const { firstName, lastName, username } = req.body;
  const errors = [];

  if (!firstName || firstName.length < 2) {
    errors.push("First name must be at least 2 characters long");
  }

  if (!lastName || lastName.length < 2) {
    errors.push("Last name must be at least 2 characters long");
  }

  if (!username || username.length < 5) {
    errors.push("Username must be at least 5 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation error",
      details: errors,
    });
  }

  next();
};

const validateBook = (req, res, next) => {
  const { title, author, year } = req.body;
  const errors = [];

  if (!title || title.length < 2) {
    errors.push("Title must be at least 2 characters long");
  }

  if (!author || author.length < 2) {
    errors.push("Author must be at least 2 characters long");
  }

  if (!year || isNaN(year) || year < 0 || year > new Date().getFullYear()) {
    errors.push("Year must be a valid number between 0 and current year");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation error",
      details: errors,
    });
  }

  next();
};

module.exports = { validateUser, validateBook };
