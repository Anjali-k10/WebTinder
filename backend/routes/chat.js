const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/userAuth");
const chatRouter = express.Router();
const mongoose = require("mongoose"); 
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;
  console.log("userId:", userId);
  console.log("targetUserId:", targetUserId);

  if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
    return res.status(400).json({ message: "Invalid target user ID." });
  }

  const targetObjectId = new mongoose.Types.ObjectId(targetUserId);

  if (userId.equals(targetObjectId)) {
    return res.status(400).json({ message: "Cannot chat with yourself." });
  }

  try {
    console.log("Fetching chat...");
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetObjectId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName"
    });

    if (!chat) {
      console.log("Creating new chat...");
      chat = new Chat({
        participants: [userId, targetObjectId],
        messages: []
      });
      await chat.save();
    }

    res.json(chat);
    console.log("Done!");
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports=chatRouter