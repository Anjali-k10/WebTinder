const express = require("express");
const app = express();
const path = require("path");
const cookieParser= require("cookie-parser");
const cors = require("cors")
const { connectDB } = require("../config/database");
const { userModel } = require("../models/User");
const {upload } = require("../middlewares/upload")

const allowedOrigins = [
  "http://localhost:5173",
  "https://web-tinder.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin like curl or Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


const {userRouter} =require("../routes/auth");

const {profileRouter} =require("../routes/profile")
const connectionRouter = require("../routes/connection")

app.use("/",userRouter);
app.use("/",profileRouter);
app.use("/user",connectionRouter);
app.use('/uploads', express.static(path.join(__dirname,'..', 'uploads')));
connectDB()
  .then(() => {
    console.log("Database is connected");
    const PORT = process.env.PORT || 8888;
    app.listen(PORT, () => {
      console.log(`App is listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Something went wrong in connection: " + err.message);
  });

// Optional: Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});
