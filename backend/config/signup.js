const { userModel } = require("../models/User");
const bcrypt = require("bcrypt");
const { validateValue } = require("../middlewares/validate");
 


const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phNumber } = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 5);
    await validateValue(req, res, hashPassword);
    const user = new userModel({
      // firstName:req.body.firstName,
      // lastName:req.body.lastName,
      // email:req.body.email,
      firstName,
      lastName,
      email,
      phNumber,
      password: hashPassword,
    });
    await user.save();
    res.status(201).send(`data added for ${firstName}`);
  } catch (err)  {
     if (err.code === 11000) {
      return res.status(409).send("This email address already exists");
    }
     res.status(500).send("Error during signup: " + err.message);
  }
};

module.exports = {
  signup,
};
