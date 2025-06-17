const mongoose  = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
  }
}
// connectDB().then(() => {
//   console.log("databse is connected")
//   app.listen(7777, () => {
//     console.log("app is listen at port 7777");
//   });
// })
// .catch((err) => {
//   console.error("something went wrong in connection to port" + err.message);
// });

module.exports={connectDB}
