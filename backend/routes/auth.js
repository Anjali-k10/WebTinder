const express = require("express");
 const {userModel}=require("../models/User");
const bcrypt= require("bcrypt");
const userRouter= express.Router();
const cookieParser =require("cookie-parser");
const { logIn } = require("../config/login");
const { signup } = require("../config/signup");
const {userAuth}= require("../middlewares/userAuth");

userRouter.post("/signup",async(req,res)=>{
  try{

     await signup(req,res);
    //   res.send("data added successfully");
}
 catch(err){
    res.status(404).send("error in signup:" +err.message)
 }
})

userRouter.post("/login",async(req,res)=>{
   try { 
   await logIn(req,res);
   }
    catch(err){
    res.status(500).send("error in login: " + err.message)
    }
});
userRouter.post("/logout",userAuth,async(req,res)=>{
    try {
        // Clear the "token" cookie
        res.cookie("token", null, {  expires: new Date(0),});
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch(err){
    res.status.send("error in logout: " + err.message)
    }
});

module.exports={userRouter}