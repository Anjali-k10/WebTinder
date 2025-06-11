const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/User");

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json("Email is not correct");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ _id: user._id }, "devTinder2025");

    res.cookie("token", token, {
      maxAge: 8 * 3600000,
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // change to true in production
    });

    const { password: pwd, ...userData } = user._doc;
    console.log("Sending login success response for user:", user.email);
   return res.status(200).json({ message: "Login successful", data : userData });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).send("Error logging in: " + err.message);
  }
};

module.exports = { logIn };
