const express = require("express");
const app = express();
const cookieParser= require("cookie-parser");
const cors = require("cors")
const { connectDB } = require("../config/database");
const { userModel } = require("../models/User");


app.use(cors({
  origin:"http://localhost:5173",
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

connectDB().then(() => {
    console.log("databse is connected")
    app.listen(7777, () => {
      console.log("app is listen at port 7777");
    });
  })
  .catch((err) => {
    console.error("something went wrong in connection to port" + err.message);
  });
