const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const connectionRouter = express.Router();
const { connectionModel } = require("../models/connectionReq");
const { userModel } = require("../models/User");

connectionRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
      const user = req.user;
      const fromUserID = user._id;
      const toUserID = req.params.userId;
      const Status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(Status)) {
        return res.status(401).send("you can either like or ignore the user !");
      }
      const User = await userModel.findOne({ _id: toUserID });
      if (!User) {
        return res.status(401).send("user not found. plz enter correct userID");
      }
      // if(fromUserID.equals(toUserID)){
      //   return  res.status(401).send("you can't send request to yourself");
      // }
      const existingConnection = await connectionModel.findOne({
        $or: [
          { fromUserID, toUserID },
          { fromUserID: toUserID, toUserID: fromUserID },
        ],
      });
      if (existingConnection) {
        return res.status(401).send("request already sent!");
      }
      const connectionRequest = new connectionModel({
        fromUserID,
        toUserID,
        Status,
      })
      const Data = await connectionRequest.save();
      const populatedRequest = await connectionModel
    .findById(Data._id)
    .populate("toUserID", ["firstName", "lastName"]);

     res.status(200).json({
      message: "connection request has been sent",
      data:populatedRequest,
    });
      // res.json();
    } catch (err) {
      res.status(401).send("error in sending request :" + err.message);
    }
  }
);

connectionRouter.post("/request/review/:status/:userId", userAuth,async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestedID = req.params.userId;
      const Status = req.params.status;
      const AllowedInputStatus = ["accept", "reject"];
      if (!AllowedInputStatus.includes(Status)) {
        return res
          .status(401)
          .send("you can onlyy accept or reject the connection request");
      }
      const connectionReview = await connectionModel.findOne({
        $and: [
          { _id: requestedID },
          { toUserID: loggedInUser._id },
          { Status: "interested" },
        ],
      });
      if (!connectionReview) {
        return res
          .status(401)
          .send("there is no request from the user with userId:" + requestedID);
      }
      connectionReview.Status = Status;
      const data = await connectionReview.save();
      res.json({
        message: "connection request has been reviewed",
        data: data,
      });
    } catch (err) {
      res
        .status(401)
        .send("check whether you filled something wrong" + err.message);
    }
  }
);

connectionRouter.get("/connection/review", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const SeeAllConnection = await connectionModel.find({ 
      $or: [{Status: "accept", fromUserID: loggedInUser._id }, 
           {Status: "accept", toUserID: loggedInUser._id }],
    }).populate("toUserID",["firstName","lastName"])
      .populate("fromUserID",["firstName","lastName"]);

    if(SeeAllConnection.length===0){
        return res.status(200).json({ message: "You don't have any connections yet." ,
          
        });
    }

    const data= SeeAllConnection.map((row)=>{
        if(row.fromUserID._id.toString() === loggedInUser._id.toString()){
       return   row.toUserID;
        }
     return row.fromUserID;
    })
    res.json({
      message: "here is your all connection",
      data: data,
    });
  } catch (err) {
    res.status(400).send("check your internet:" + err.message);
  }
});

connectionRouter.get("/request/review",userAuth,async(req,res)=>{
     try{
        const loggedInUser = req.user;
        const SeeAllRequest = await connectionModel.find({
          Status:  "interested",
         toUserID: loggedInUser._id 
        }).populate("fromUserID",["firstName","lastName"]);
    
        if(SeeAllRequest.length===0){
            return res.status(200).json({ message: "Their is no request."});
        }
      
        res.json({
          message: "Someone knoks at your profile",
          data: SeeAllRequest,
        });
     }
     catch(err){
        res.status(400).send("check your internet connection:" + err.message);
     }
})

connectionRouter.get("/sent/request/status",userAuth,async(req,res)=>{
     try{
        const loggedInUser = req.user;
        const SeeAllSentRequest = await connectionModel.find({
          Status:  "interested",
         fromUserID: loggedInUser._id 
        }).populate("toUserID",["firstName","lastName"]);
    
        if(SeeAllSentRequest.length===0){
            return res.status(404).json({ message: "you did not send request to anyone."});
        }
        const data = SeeAllSentRequest.map((row)=>{return row.toUserID});
        res.json({
          message: "request status",
          data: data,
        });
     }
     catch(err){
        res.status(400).send("check your internet connection:" + err.message);
     }
})

connectionRouter.get("/feed",userAuth,async(req,res)=>{
    try{
    const loggedInUser=req.user;
        const page=req.query.page ||1;
        let limit=req.query.limit ||10;
        limit = limit>50?50:limit;
        const skip= (page-1)*limit;

      const  Status=["accept","reject","ignored","interested"]
        const SeeAllConnection= await connectionModel.find({
            $or:[
                {fromUserID:loggedInUser,Status:Status},
                {toUserID:loggedInUser,Status:Status}]
    }).select("fromUserID toUserID Status")
    const NotShowInFeed = new Set();
   
    SeeAllConnection.forEach((row)=>{
        NotShowInFeed.add(row.fromUserID.toString()),
        NotShowInFeed.add(row.toUserID.toString())
    });
    const ShowInFeed= await userModel.find({
        $and:[
            {_id:{$nin:Array.from(NotShowInFeed)}},
           { _id:{$ne:loggedInUser._id}}
        ]
    }).skip(skip).limit(limit);
 
    res.send(ShowInFeed);
    }
    catch(err){
        res.status(400).send("something went wrong in feed:" + err.message)
    }
})
module.exports =  connectionRouter;

