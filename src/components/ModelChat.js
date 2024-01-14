import React, { useState } from 'react';
import axios from 'axios';

const ModelChat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    axios.post('http://localhost:8000/predict_sector/', { query: inputMessage })
      .then((response) => {
        const botResponse = response.data.predicted_sector;
        console.log('User input:', inputMessage);
        console.log('Bot response:', botResponse);
        setMessages([...messages, { text: inputMessage, type: 'user' }, { text: botResponse, type: 'bot' }]);
        setInputMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div>
      <div style={{ minHeight: '200px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '5px', color: msg.type === 'user' ? 'blue' : 'green' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ModelChat;
