

const socket = require('socket.io');
const { Chat } = require('../models/chat');
// const {createServer} = require('http');

 const intializeSocket=(server)=>{
    const io = socket(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
      }
    });
  io.on("connection", (socket) => {
    socket.on("JoinChat",({userId,targetUserId})=>{
        const roomID = [userId,targetUserId].sort().join("-");
        console.log("user is connected:"+ roomID);
        socket.join(roomID);
    });


    socket.on("SendMessage",async ({firstName,lastName,userId,targetUserId,text})=>{
        try{
          const roomId= [userId,targetUserId].sort().join("-");
          console.log("Message sent to room: " + roomId + firstName + " " + text);
        // console.log("SendMessage payload:", { firstName,lastName, userId, targetUserId, text });

         let chat = await Chat.findOne({
            participants:{$all:[userId,targetUserId]},
         });

         if(!chat){
            chat = new Chat({
                participants:[userId,targetUserId],
                messages:[],
            })
         }
   chat.messages.push({
    senderId:userId,
    text,
   }
)
    await chat.save();
        io.to(roomId).emit("messageReceived",{firstName,lastName,text})
      }
     catch(err){
         console.log(err.message)
     }
       
    });
  
    socket.on("disconnect", () => {
        //  const roomId= [userId,targetUserId].sort().join("-");
      console.log("User disconnected: " + socket.id);
    });
  
   
  });
}
module.exports = {intializeSocket};