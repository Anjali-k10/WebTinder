const validator = require("validator");

const validateValue = async (req, res, rawPassword) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).send("Full name is required");
  }

  if (firstName.length < 3 || firstName.length > 20) {
    return res.status(400).send("First name must be between 3 and 20 characters");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Enter a valid email");
  }

  if (!validator.isStrongPassword(rawPassword)) {
    return res.status(400).send("Password is not strong");
  }


  return true;
};

module.exports = { validateValue };
