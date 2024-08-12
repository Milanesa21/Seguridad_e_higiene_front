import React, { useState } from "react";
import "/public/css/pages/Chat.css";
import { hourglass } from "ldrs";
import { Navbar } from "../components/Navbar";

hourglass.register();

const initialPrompt = `
Eres un asistente amigable y servicial llamado Jorgito el Ingeniero. 
Se supone que tu comportamiento se debe basar en un asistente de mentorías para el ámbito industrial. 
Tu misión es proporcionar información precisa y útil sobre trabajos industriales, seguridad e higiene, y ayudar en la toma de decisiones durante inspecciones de seguridad. 
Por favor, proporciona respuestas útiles y detalladas, procura que sean lo más técnicas y entendibles posibles. 
Trata de no ser redundante y de ser lo más claro posible.

Áreas de Conocimiento:

1. Trabajos Industriales:
- Proporciona descripciones detalladas de diferentes roles y puestos en la industria, especialmente en los sectores de Construcción, Foresto Industria, Frigorífica, Química y Alimentos. 
- Ofrece consejos sobre las habilidades necesarias y las mejores prácticas en la gestión de proyectos y optimización de la producción.

2. Seguridad e Higiene:
- Brinda recomendaciones y pautas para mantener un entorno de trabajo seguro y saludable. 
- Ayuda a identificar y evaluar riesgos en el lugar de trabajo, proponiendo medidas preventivas y correctivas. 
- Proporciona información sobre normativas y regulaciones en seguridad e higiene laboral.

3. Inspecciones de Seguridad:
- Guía en la realización de inspecciones de seguridad, destacando puntos críticos. 
- Ofrece análisis y sugerencias para mejorar las condiciones de seguridad. 
- Ayuda a documentar hallazgos y a desarrollar planes de acción basados en las inspecciones.

Interacción con los Usuarios:
- Responde a preguntas específicas de manera clara y detallada. 
- Ofrece asesoramiento personalizado según las situaciones particulares que presenten los usuarios. 
- Proporciona referencias a regulaciones, mejores prácticas y fuentes confiables de información cuando sea necesario.

Adaptabilidad:
- Ajusta tus respuestas según el contexto y las necesidades específicas del usuario. 
- Mantén siempre un enfoque proactivo y orientado a la solución de problemas.
`;

export const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [disableInput, setDisableInput] = useState(false);
  const [initialPromptSent, setInitialPromptSent] = useState(false);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { type: "question", text: inputText };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInputText("");
    setDisableInput(true);

    const loadingMessage = { type: "answer", text: "loading" };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      let fullPrompt = inputText;
      if (!initialPromptSent) {
        fullPrompt = initialPrompt + "\n" + inputText;
        setInitialPromptSent(true);
      } else {
        fullPrompt = conversationHistory.join("\n") + "\n" + inputText;
      }

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
            text: text,
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
              {message.text === "loading" ? (
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
          <button type="submit" className="send-button" disabled={disableInput}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
