const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    phNumber:{
        type:Number 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    city:{
        type:String
    },
    skills:{
        type:[String]
    },  bio: {
    type: String
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'] 
  },
  age: {
    type: Number,
    min: 0
  },
   profilePhoto: {
    type: String,
     default: "/uploads/default-profile.png"
    // default: "https://yourdomain.com/default-profile.png" // Replace with your actual default image URL if hosted
  }
});
userSchema.methods.getJWT=async function (req,res) {
    user=this;
    const token = await jwt.sign({_id:user._id},"devTinder2025",{expiresIn:"2d"})
    return token;
}
userSchema.methods.validatePassword=async function (inputPasswordByUser) {
    user=this;
    const isMatch= await bcrypt.compare(inputPasswordByUser,user.password)
    return isMatch
    
}
const userModel = mongoose.model("userModel",userSchema);

module.exports={userModel};