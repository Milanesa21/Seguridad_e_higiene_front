import React, { useRef, useState, useContext } from "react";
import "/public/css/components/inputtext.css";
import { AuthContext } from "../context/AuthProvider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { EmergencyModal } from "./EmergencyModal";

export const DenunciasyEmergencias = () => {
  const emergencyRef = useRef(null);
  const denunciaRef = useRef(null);
  const [denunciaMessage, setDenunciaMessage] = useState("");
  const [notification, setNotification] = useState({ open: false, severity: '', message: '' });

  const { user } = useContext(AuthContext);

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/Usuarios/alert/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          full_name: user.full_name,
          puesto_trabajo: user.puesto_trabajo,
          message: message,
        }),
      });

      if (response.ok) {
        setNotification({ open: true, severity: 'success', message: 'Mensaje enviado correctamente' });
      } else {
        const data = await response.json();
        console.log("Error al enviar el mensaje:", data.detail);
        setNotification({ open: true, severity: 'error', message: 'Error al enviar mensaje' });
      }
    } catch (error) {
      console.log("Error al enviar el mensaje:", error);
      setNotification({ open: true, severity: 'error', message: 'Error al enviar mensaje' });
    }
  };

  const handleEmergencyClick = async () => {
    await handleSendMessage("¡Emergencia! Necesito asistencia.");
  };

  const handleDenunciaClick = async () => {
    if (denunciaMessage.trim() !== "") {
      await handleSendMessage(denunciaMessage);
    } else {
      setNotification({ open: true, severity: 'error', message: 'No puedes enviar una denuncia vacía' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="SECCION">
      <section id="Denuncias">
        <h2>Alerta de Seguridad: Denuncias y Emergencias</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            {/* BOTON DE EMERGENCIA */}
            <div className="buttonwrapper">
              <h2>Boton de Emergencias</h2>
              <button className="buttonEmergencia" onClick={handleEmergencyClick} ref={emergencyRef}>
                <p className="text">¡EMERGENCIA!</p>
              </button>
            </div>
          </div>
          <div className="linea-divisoria"></div>
          
          <div className="inputwrapper">
            <h2>Realice su Denuncia de seguridad</h2>
            <textarea
              ref={denunciaRef}
              spellCheck="false"
              placeholder="Type something here..."
              value={denunciaMessage}
              onChange={(e) => setDenunciaMessage(e.target.value)}
              required
            ></textarea>
            {/* BOTON DE DENUNCIA */}
            <button className="button" onClick={handleDenunciaClick} ref={denunciaRef}>
              <p className="text">Denuncia</p>
            </button>
          </div>
        </div>
      </section>

      {notification.open && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity={notification.severity} onClose={handleCloseNotification}>
            <AlertTitle>{notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)}</AlertTitle>
            {notification.message}
          </Alert>
        </Stack>
      )}
    </div>
  );
};
{/*aqui se exporta el componente\*/}
export default DenunciasyEmergencias;      