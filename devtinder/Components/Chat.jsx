import React,{ useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import axios from 'axios';

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const  {targetUserId} = useParams();
  console.log(targetUserId);
  const [newMessage,setNewMessage] = useState("");
  const [messages,setMessages] = useState([]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage',{firstName : user.firstName,lastName:user.lastName,userId,targetUserId,newMessage});
    setNewMessage("");
  }

  const fetchMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId,{
      withCredentials : true,
    });
    console.log(chat);
    const messages = chat?.data?.messages;
    const chatMessages = messages.map((msg) => {
      return{
        sender : msg?.senderId?._id,
        firstName : msg?.senderId?.firstName,
        lastName : msg?.senderId?.lastName,
        text : msg?.text,
      }
    })
    setMessages(chatMessages);
    console.log(chatMessages);
  }

  useEffect(() => {
    fetchMessages();
  },[]);

  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit('joinChat',{firstName : user?.firstName ,lastName : user?.lastName, userId , targetUserId});

    socket.on("messageReceived", ({ userId,firstName,lastName,newMessage }) => {
      console.log(userId + " " + newMessage);
      setMessages((prev) => [...prev, { sender: userId,firstName,lastName, text: newMessage }]);
    });

    
  },[userId,targetUserId]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="flex flex-col w-full max-w-2xl h-[90vh] bg-white shadow-lg rounded-lg">

    <div className="bg-primary text-white text-center py-4 text-xl font-semibold shadow-md rounded-t-lg">
      Chat
    </div>

    <div className="flex-grow p-4 overflow-y-auto">
      {
        messages.map((message, index) => {
          return (
            <div key={index} className={`chat ${message.sender === userId ? "chat-end" : "chat-start"}`}>
               <div className="chat-header text-black">
                {`${message.firstName} ${message.lastName}`}
                <time className="text-xs opacity-50 text-black">Just now</time>
              </div>
              <div className={`chat-bubble ${message.sender === userId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                {message.text}
              </div>
              <div className="chat-footer opacity-50 text-black">Seen</div>
            </div>
          );
        })
      }
    </div>

    <div className="bg-gray-50 p-4 flex items-center shadow-md rounded-b-lg">
      <input
        type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow p-2 border rounded-lg outline-none text-gray-900 
                  focus:ring-2 focus:ring-primary selection:bg-primary selection:text-white"
      />
      <button className="ml-3 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition" onClick={sendMessage}>
        Send
      </button>
    </div>
  </div>
</div>

  );
};

export default Chat;
