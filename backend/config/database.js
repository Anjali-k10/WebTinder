const mongoose  = require("mongoose");

const connectDB=async()=>{
 try{ 
  await mongoose.connect("mongodb+srv://anjali943122:qc7t32h099mrIckL@cluster0.rror4.mongodb.net/webChat");
 
}

  catch(err){
    console.log("error in databse:" + err.message)
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
