import React, { useState } from 'react';
import './Chat.css';
import { hourglass } from 'ldrs';

hourglass.register();

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { type: 'question', text: inputText };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInputText('');

    const loadingMessage = { type: 'answer', text: 'loading' };
    setMessages(prevMessages => [...prevMessages, loadingMessage]);

    try {
      const response = await fetch('http://localhost:8000/jorgito/query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText, conversation_history: conversationHistory }),
      });

      const responseData = await response.text();

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = { type: 'answer', text: responseData };
        return updatedMessages;
      });

      setConversationHistory([...conversationHistory, inputText]); // Actualizar el historial de conversación
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = { type: 'answer', text: 'Error fetching response' };
        return updatedMessages;
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text === 'loading' ? (
              <div className="loading-container">
                <l-hourglass
                  size="40"
                  bg-opacity="0.1"
                  speed="1.75"
                  color="black"
                ></l-hourglass>
                <p>Jorgito está pensando...</p>
              </div>
            ) : (
              <p>{message.text}</p>
            )}
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

export default Chat