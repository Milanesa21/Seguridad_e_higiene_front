import React, { useState } from 'react';
import './Chat.css';

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newMessage = { type: 'question', text: inputText };
  
    // Agregar el nuevo mensaje a la lista de mensajes antes de enviar la solicitud al servidor
    setMessages([...messages, newMessage]);
    
    try {
      const response = await fetch('http://localhost:8000/jorgito/query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText }),
      });
  
      const responseData = await response.text();
  
      // Agregar la respuesta del servidor como un nuevo mensaje
      const newResponseMessage = { type: 'answer', text: responseData };
      
      // Actualizar el estado con los mensajes anteriores y el nuevo mensaje de respuesta
      setMessages(prevMessages => [...prevMessages, newResponseMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setInputText('');
    }
  };
  

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input 
          type="text" 
          value={inputText} 
          onChange={handleChange} 
          placeholder="Hazme tu pregunta" 
          className="input-field"
        />
        <button type="submit" className="send-button">Enviar</button>
      </form>
    </div>
  );
};
