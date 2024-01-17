import React from 'react';
import { useState } from 'react';
import '../css/Chat.css';
import ModelChat from './ModelChat';
const Chat = () => {

 const [selectedChat, setSelectedChat] = useState("PolyChatA");

 const handleChatChange = (e) => {
   setSelectedChat(e.target.value);
 
 }

 return (
   <div className="wrapper">
    <div className="select-wrapper">
    <label htmlFor="yearSelect" id="yearSelectLabel">
      Sélectionnez une question :
    </label>
    <select id="yearSelect" onChange={handleChatChange} value={selectedChat}>
      
        <option key="PolyChatA" value="PolyChatA">
        PolyChatA
        </option>
        <option key="PolyChatI" value="PolyChatI">
        PolyChatI
        </option>
        <option key="PolyChatU" value="PolyChatU">
        PolyChatU
        </option>
        <option key="PolyChatR" value="PolyChatR">
        PolyChatR
        </option>

    </select>
  </div>
     <h1>Chat {selectedChat}</h1>
     <ModelChat model={selectedChat} />
   </div>
 );
}
export default Chat;