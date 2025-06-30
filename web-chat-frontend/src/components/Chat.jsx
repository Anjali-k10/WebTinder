import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { Base_URL } from '../utils/constants';
import axios from 'axios';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);   // always an array
  const [text, setText] = useState("");           // input box value
  const user = useSelector((state) => state.user);
  const userId = user?.data?._id;
 
  const { firstName,lastName } = user?.data || {};

  const fetchChatMessage= async()=>{
    try{
      const chat = await axios.get(`${Base_URL}/chat/${targetUserId}`, { withCredentials: true });
    
      console.log("Fetched chat:", chat.data);
      const chatMessages = chat?.data?.messages?.map(msg => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      })) || [];
      
      setMessages(chatMessages);
    }catch(err){
         console.log("Error fetching chat:", err);
    }
    }

  useEffect(()=>{
  console.log("useEffect running, userId:", userId, "targetUserId:", targetUserId);
  if (!userId || !targetUserId) {
     console.log("Missing IDs, skipping fetchChatMessage");
     return;
  }
  fetchChatMessage();
},[userId,targetUserId])


  useEffect(() => {
      if (!userId || !targetUserId) return;
    const Socket = createSocketConnection();
    Socket.emit("JoinChat", { userId, targetUserId });

    Socket.on("messageReceived", ({ firstName,lastName, text }) => {
      // console.log(firstName + ": " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });
    return () => Socket.disconnect();
  }, [userId, targetUserId]);


  const sendMessage = () => {
    const Socket = createSocketConnection();
    Socket.emit("SendMessage", { firstName,lastName, userId, targetUserId, text });
    setText("");
  };

  return (
    <div className='w-1/2 mx-auto my-5 border-gray-600 h-[70vh] flex flex-col p-4 bg-base-300 '>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-y-scroll p-5'>
        {messages.map((msg, index) => (
         <div
  key={index}
  className={
    "chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")
  }
>
            <div className="chat-header">
              {msg.firstName}
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble bg-blue-950 rounded-full">{msg.text}</div>
            <div className="chat-footer opacity-50">seen </div>
          </div>
        ))}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input
          className='flex-1 border border-gray-500 text-white rounded p-2'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className='btn btn-secondary' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

