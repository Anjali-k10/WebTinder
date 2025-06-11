const mongoose =require("mongoose");
const { userModel } = require("./User");

const connectionSchema = new mongoose.Schema({
    fromUserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:userModel
    },
    toUserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:userModel
    },
    Status:{
        type:String,
        enum:{
            values:["accept","reject","interested","rejected"],
            message: '{VALUE} is not defined in Status entry'
        } 
    },   
});
const connectionModel = mongoose.model("connectionModel",connectionSchema);

module.exports={connectionModel}