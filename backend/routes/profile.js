const express = require("express");
const bcrypt= require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");
const { userModel } = require("../models/User");
const validator= require("validator");
const profileRouter = express.Router();

profileRouter.get("/user/view",userAuth,async(req,res)=>{
   try{
   const loggedInUser=req.user;
    const {email} = loggedInUser;
   
    const userDetails = await userModel.findOne({email});
    if(!userDetails){
        return res.status(400).send("No user with this email ID")
    }
   res.json({
        message:"logged in user details:",
        data: userDetails
    })}
    catch(err){
        res.status(404).send("can't see profile:" + err.message)
    }

});

profileRouter.patch("/user/profile/edit", userAuth, async (req, res) => {
    try {
        const user = req.user; // Assuming `userAuth` middleware attaches `user` to `req`
        const updates = req.body; // Data sent in the request body
        const editAllowed = ["firstName", "lastName", "phNumber", "city", "skills"]; // Valid keys for updates
        
        // Filter updates to only include allowed keys
        const filterUpdate = Object.keys(updates).reduce((acc, key) => {
            if (editAllowed.includes(key)) {
                acc[key] = updates[key];
            }
            return acc;
        }, {});
        

        // Check if any valid updates exist
        if (Object.keys(filterUpdate).length === 0) {
            return res.status(400).send("No valid keys to update");
        }

        // Update user profile
        const updatedProfile = await userModel.findByIdAndUpdate(
            { _id: user._id },
            { $set: filterUpdate },
            { new: true } // Return the updated document
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    } catch (err) {
        res.status(400).send("Error updating profile: " + err.message);
    }
});



 profileRouter.post("/user/profile/password", userAuth, async (req, res) => {
        try {
            const user = req.user; // Authenticated user
            const { email } = req.body;
            const password = user.password;
            if (!email || !password) {
                return res.status(400).send("Email and password are required.");
            }
            const newHashPassword = await bcrypt.hash(password, 10); 
            if (!validator.isStrongPassword(newHashPassword)) {
                return res.status(400).send("Entered password is not strong.");
            };
            const updatedUser = await userModel.findOneAndUpdate(
                { email: email }, 
                { password: newHashPassword }, 
                { new: true } 
            );
    
            if (!updatedUser) {
                return res.status(404).send("User not found.");
            }
    
            res.status(200).send("Password updated successfully.");
        } catch (err) {
            console.error("Error updating password:", err.message);
            res.status(500).send("An error occurred while updating the password: " + err.message);
        }
    });
    

module.exports = {profileRouter};