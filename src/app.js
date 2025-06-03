const express = require("express");
const app = express();
const cookieParser= require("cookie-parser");

const { connectDB } = require("../config/database");
const { userModel } = require("../models/User");

app.use(express.json()); //to read json data
app.use(cookieParser());


const {userRouter} =require("../routes/auth");
// const {deleteRouter} =require("../routes/delete");
const {profileRouter} =require("../routes/profile")
const {connectionRouter} = require("../routes/connection")

app.use("/",userRouter);
app.use("/",profileRouter);
// app.use("/",deleteRouter);
app.use("/",connectionRouter);

connectDB().then(() => {
    console.log("databse is connected")
    app.listen(7777, () => {
      console.log("app is listen at port 7777");
    });
  })
  .catch((err) => {
    console.error("something went wrong in connection to port" + err.message);
  });
