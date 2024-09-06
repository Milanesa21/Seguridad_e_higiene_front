import React, { useContext, useState } from "react";
import "/public/css/components/inputtext.css";
import { AuthContext } from "../context/AuthProvider";

export const DenunciasyEmergencias = ({ onEmergency }) => {
  const [denunciaMessage, setDenunciaMessage] = useState("");
  const [notification, setNotification] = useState({ open: false, severity: '', message: '' });

  const { user } = useContext(AuthContext);

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/SendAlertMessage", {
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

  const handleClick = () => {
    onEmergency();
    handleEmergencyClick();
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
              <button
                className="buttonEmergencia"
                onClick={handleClick} // Reinicia el contador al hacer clic
              >
                <p className="text">¡EMERGENCIA!</p>
              </button>
            </div>
          </div>
          <div className="linea-divisoria"></div>

          <div className="inputwrapper">
            <h2>Realice su Denuncia de seguridad</h2>
            <textarea
              spellCheck="false"
              placeholder="Type something here..."
              value={denunciaMessage}
              onChange={(e) => setDenunciaMessage(e.target.value)}
              required
            ></textarea>
            {/* BOTON DE DENUNCIA */}
            <button className="button" onClick={handleDenunciaClick}>
              <p className="text">Denuncia</p>
            </button>
          </div>
        </div>
      </section>

      {notification.open && (
        <div className={`notification ${notification.severity}`}>
          <button onClick={handleCloseNotification} className="close-btn">X</button>
          <h4>{notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)}</h4>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default DenunciasyEmergencias;
