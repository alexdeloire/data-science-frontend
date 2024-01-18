import React from 'react';
import { useState } from 'react';
import '../css/Chat.css';
import ModelChat from './ModelChat';
const Chat = () => {

  const [selectedChat, setSelectedChat] = useState("PolyChatU");

  const dict_string = {
    "PolyChatA": "est absent et aurait été utile",
    "PolyChatI": "était inutile",
    "PolyChatU": "était utile",
    "PolyChatR": "devrait être renforcé ou approfondi",
  }

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
      <h1>{selectedChat}</h1>
      <div style={{ "margin-bottom": "10px" }}>Tapez le nom d'un enseignement et le modèle répondera avec nom de la filière pour laquelle cet enseignement {dict_string[selectedChat]}.</div>

      <div style={{ "margin-bottom": "20px" }}>Exemples: Algo, Hydrologie, Gestion, Anglais etc.</div>
      <ModelChat model={selectedChat} />
    </div>
  );
}
export default Chat;