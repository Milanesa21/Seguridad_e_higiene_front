import React, { useState } from "react";
import "/public/css/pages/Chat.css";
import { hourglass } from "ldrs";
import { Navbar } from "../components/Navbar";
import Loader from "../components/Loader/Loader.jsx";
import { EmergencyModal } from "../components/EmergencyModal.jsx";
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField 
} from '@mui/material';

hourglass.register();

export const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  
  // Estado para el modal de subida de PDF
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
        return;
    }

    const newMessage = { type: "question", text: inputText };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setInputText("");
    setDisableInput(true);

    const loadingMessage = { type: "answer", text: "" };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const response = await fetch("http://localhost:8000/jorgito2/query/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputText }),
    });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let text = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            for (const char of chunk) {
                text += char;
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = {
                        type: "answer",
                        text: text,
                    };
                    return updatedMessages;
                });
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }

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
                text: "Error al obtener respuesta",
            };
            return updatedMessages;
        });
    } finally {
        setLoading(false);
        setDisableInput(false);
    }
  };

  const handlePDFUpload = async () => {
    if (!selectedPDF) {
      alert("Por favor, selecciona un archivo PDF");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedPDF);

    try {
      const response = await fetch("http://localhost:8000/jorgito2/upload", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      // Añadir mensaje de confirmación
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          type: "answer", 
          text: result.status || "PDF procesado exitosamente" 
        }
      ]);

      // Cerrar modal
      setOpenPDFModal(false);
      setSelectedPDF(null);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Error al subir el PDF");
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
          <div
            className="button-container"
            style={{ display: "flex", flexDirection: "row" , padding:"0"}}
          >
            <button
              type="submit"
              className="send-button"
              disabled={disableInput || !inputText.trim()}
            >
              Enviar
            </button>
            <CreateNewFolderTwoToneIcon
              className="folder-icon"
              onClick={() => setOpenPDFModal(true)}
              style={{ cursor: "pointer", marginLeft:"4px",fontSize: "2.5rem"}}
              color="primary"
              
            />
          </div>
        </form>
        <EmergencyModal />

        {/* Modal para subir PDF */}
        <Dialog
          open={openPDFModal}
          onClose={() => setOpenPDFModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
            Subir Documento PDF
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button
              variant="outlined"
              component="label"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
              
            >
              Seleccionar Archivo
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => setSelectedPDF(e.target.files[0])}
              />
            </Button>
            {selectedPDF && (
              <p style={{ margin: "0", fontSize: "0.9rem", color: "#555" }}>
                <strong>Archivo seleccionado:</strong> {selectedPDF.name}
              </p>
            )}
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-between", padding: "0 1.5rem 1rem" }}
          >
            <Button
              onClick={() => setOpenPDFModal(false)}
              variant="outlined"
              color="secondary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handlePDFUpload}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Subir
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};