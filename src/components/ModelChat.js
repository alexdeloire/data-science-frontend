import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelChat = (props) => {

  const dict_url = {
    "PolyChatA": "http://localhost:8000/predict_sectorPolyChatA/",
    "PolyChatI": "http://localhost:8000/predict_sectorPolyChatI/",
    "PolyChatU": "http://localhost:8000/predict_sectorPolyChatU/",
    "PolyChatR": "http://localhost:8000/predict_sectorPolyChatR/",
  }

  const dict_question = {
    "PolyChatA": "Quel est la filière pour laquelle un cours de INSERT était absent et aurait été utile ?",
    "PolyChatI": "Quel est la filière pour laquelle le cours de INSERT était inutile ?",
    "PolyChatU": "Quel est la filière pour laquelle le cours de INSERT était utile ?",
    "PolyChatR": "Quel est la filière pour laquelle le cours de INSERT devrait être renforcé ou appronfondi ?",
  }

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [url, setUrl] = useState(dict_url[props.model]);
  const [question, setQuestion] = useState(dict_question[props.model]);

  useEffect(() => {
    // Update the URL and Question when the model prop changes
    setUrl(dict_url[props.model]);
    setQuestion(dict_question[props.model]);
    // Clear the messages when the model prop changes
    setMessages([]);
  }, [props.model]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    axios.post(url, { query: inputMessage })
      .then((response) => {
        const botResponse = response.data.predicted_sector;
        console.log('User input:', question.replace("INSERT", inputMessage));
        console.log('Bot response:', botResponse);
        setMessages([...messages, { text: question.replace("INSERT", inputMessage), type: 'user' }, { text: botResponse, type: 'bot' }]);
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
