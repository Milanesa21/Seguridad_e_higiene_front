import React, { useState } from 'react';
import './Chat.css';
import { hourglass } from 'ldrs';

hourglass.register();

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [disableInput, setDisableInput] = useState(false);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { type: 'question', text: inputText };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInputText('');
    setDisableInput(true); // Desactivar el campo de entrada y el botón de enviar

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

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        text += decoder.decode(value, { stream: true });
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = { type: 'answer', text: text };
          return updatedMessages;
        });
      }

      // Agregar mensaje de la IA al final de cada respuesta
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'answer', text: '¿Necesitas que te ayude con algo más?' }
      ]);

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
      setDisableInput(false); // Habilitar el campo de entrada y el botón de enviar
    }
  };

  const renderMessageText = (text) => {
    return text.split(/\*\*(.*?)\*\*/).map((part, index) => {
      if (index % 2 === 0) {
        return part.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br/>
          </React.Fragment>
        ));
      } else {
        return <strong key={index}>{part}</strong>;
      }
    });
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
              <p>
                {typeof message.text === 'string' ? renderMessageText(message.text) : message.text}
              </p>
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
          disabled={disableInput} // Deshabilitar el campo de entrada mientras se carga la respuesta
        />
        <button type="submit" className="send-button" disabled={disableInput}>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
