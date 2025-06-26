const express = require("express");
const app = express();
const path = require("path");
const cookieParser= require("cookie-parser");
const cors = require("cors")
const { connectDB } = require("../config/database");
const { userModel } = require("../models/User");
const {upload } = require("../middlewares/upload")

app.use(cors({
  origin: "https://web-tinder.vercel.app",
  // origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json()); 
app.use(cookieParser());


const {userRouter} =require("../routes/auth");

const {profileRouter} =require("../routes/profile")
const connectionRouter = require("../routes/connection")

app.use("/",userRouter);
app.use("/",profileRouter);
app.use("/user",connectionRouter);
app.use('/uploads', express.static(path.join(__dirname,'..', 'uploads')));

connectDB().then(() => {
    console.log("databse is connected")
    app.listen(7777, () => {
      console.log("app is listen at port 7777");
    });
  })
  .catch((err) => {
    console.error("something went wrong in connection to port" + err.message);
  });
