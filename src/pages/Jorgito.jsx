import React,{ useState } from "react";
import "/public/css/pages/Chat.css";
import { hourglass } from "ldrs";
import { Navbar } from "../components/Navbar";
import Loader from "../components/Loader/Loader.jsx";
import { EmergencyModal } from "../components/EmergencyModal.jsx";
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import DenunciasyEmergencias from "../components/DenunciasyEmergencias.jsx";

hourglass.register();

export const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  // Estado para manejar el pop-up
  const [showPopup, setShowPopup] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loadingPopup, setLoadingPopup] = useState(false);

  // Mostrar/Ocultar el pop-up
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Cargar PDFs desde localStorage al inicializar
  React.useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedPdfs")) || [];
    setPdfFiles(savedFiles);
  }, []);

  const saveToLocalStorage = (files) => {
    localStorage.setItem("uploadedPdfs", JSON.stringify(files));
  };

  const uploadPdf = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoadingPopup(true);
        const response = await fetch("http://127.0.0.1:8000/jorgito2/upload/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          const updatedFiles = [...pdfFiles, { name: file.name }];
          setPdfFiles(updatedFiles);
          saveToLocalStorage(updatedFiles);
        } else {
          alert("Error al subir el archivo");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingPopup(false);
      }
    } else {
      alert("Por favor, selecciona un archivo PDF.");
    }
  };

  const handleDeletePdf = async (filename) => {
    try {
      setLoadingPopup(true);
      const response = await fetch(`http://127.0.0.1:8000/jorgito2/delete/?doc_name=${filename}`, {
        method: "POST",
      });

      if (response.ok) {
        alert("Archivo y contexto eliminados con éxito");
        const updatedFiles = pdfFiles.filter((file) => file.name !== filename);
        setPdfFiles(updatedFiles);
        saveToLocalStorage(updatedFiles);
      } else {
        alert("Error al eliminar el archivo");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingPopup(false);
    }
  };
  
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
          <div className="button-container">
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
              style={{ cursor: 'pointer' }}
            />
          </div>
        </form>
        <EmergencyModal />
        <DenunciasyEmergencias />
      </div>

      {/* Pop-up para gestión de PDFs */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-96 flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-4">Gestión de PDFs</h2>

            <div className="flex-grow p-4 bg-gray-100 rounded-lg mb-4 overflow-y-auto">
              {pdfFiles.length > 0 ? (
                <ul>
                  {pdfFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white p-2 my-2 rounded shadow"
                    >
                      <span className="text-gray-700">{file.name}</span>
                      <button
                        onClick={() => handleDeletePdf(file.name)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay archivos PDF cargados.</p>
              )}
            </div>

            <input
              type="file"
              accept="application/pdf"
              onChange={uploadPdf}
              className="mb-4"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={togglePopup}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
