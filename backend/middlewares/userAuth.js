const express=require("express");
// const userAuth = express.Router();
const jwt  = require("jsonwebtoken");
const { userModel } = require("../models/User");

const userAuth=async(req,res,next)=>{
 try{
     const {token} = req.cookies;
    if(!token){
      return res.status(401).send("please login")
    }
     const decoded =  jwt.verify(token,"devTinder2025");
     const {_id} = decoded;
     const loggedInUser = await userModel.findById(_id);
     if(!loggedInUser){
      return  res.status(400).send("user not found or may be session expired" )
     }
   //   res.send(loggedInUser);
     req.user= loggedInUser;
     next();
    }
 catch(err){
    res.status(404).send("see userAuth:" + err.message)
 }
};


module.exports={userAuth};