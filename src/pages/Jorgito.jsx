import React, { useState } from "react";
import "/public/css/pages/Chat.css";
import { hourglass } from "ldrs";
import { Navbar } from "../components/Navbar";
import Loader from "../components/Loader/Loader.jsx";
import { EmergencyModal } from "../components/EmergencyModal.jsx";

hourglass.register();

export const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [disableInput, setDisableInput] = useState(false);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      return;
    }

    const newMessage = { type: "question", text: inputText };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInputText("");
    setDisableInput(true);

    const loadingMessage = { type: "answer", text: "" };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const fullPrompt = conversationHistory.join("\n") + "\n" + inputText;

      const response = await fetch("http://localhost:8000/jorgito/query/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: fullPrompt }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        text += decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            type: "answer",
            text: text,  // Se actualiza el mensaje con el texto recibido
          };
          return updatedMessages;
        });
      }

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        inputText,
        text,
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "answer", text: "¿Necesitas que te ayude con algo más?" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          type: "answer",
          text: "Error fetching response",
        };
        return updatedMessages;
      });
    } finally {
      setLoading(false);
      setDisableInput(false);
    }
  };

  const renderMessageText = (text) => {
    return text.split(/\*\*(.*?)\*\*/).map((part, index) => {
      if (index % 2 === 0) {
        return part.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ));
      } else {
        return <strong key={index}>{part}</strong>;
      }
    });
  };

  return (
    <div className="chat">
      <Navbar />
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {loading && message.text === "" ? (
                <div className="loading-container">
                  <Loader />
                  <p>Jorgito está pensando...</p>
                </div>
              ) : (
                <p>
                  {typeof message.text === "string"
                    ? renderMessageText(message.text)
                    : message.text}
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
            disabled={disableInput}
          />
          <button
            type="submit"
            className="send-button"
            disabled={disableInput || !inputText.trim()}
          >
            Enviar
          </button>
        </form>
        <EmergencyModal />
      </div>
    </div>
  );
};

export default Chat;
