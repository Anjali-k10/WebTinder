const { userModel } = require("../models/User");
const bcrypt = require("bcrypt");
const { validateValue } = require("../middlewares/validate");

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phNumber,
      password,
      age,
      gender,
      bio,
    } = req.body;

    const profilePhotoPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!password) {
      return res.status(400).send("Password is required");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    await validateValue(req, res, hashPassword);

    const user = new userModel({
      firstName,
      lastName,
      email,
      phNumber,
      password: hashPassword,
      age,
      gender,
      bio,
      profilePhoto: profilePhotoPath,
    });

    await user.save();
res.status(201).json({
  message: `data added for ${firstName}`,
  data: user  ,
   
});
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send("This email address already exists");
    }
    res.status(500).send("Error during signup: " + err.message);
  }
};

module.exports = {
  signup,
};
