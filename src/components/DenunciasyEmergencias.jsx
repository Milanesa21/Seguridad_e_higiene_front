import React, { useRef, useState, useContext } from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";
import "../../public/css/inputtext.css";
import { AuthContext } from "../context/AuthProvider";


export const DenunciasyEmergencias = () => {
  const emergencyRef = useRef(null);
  const denunciaRef = useRef(null);
  const [denunciaMessage, setDenunciaMessage] = useState("");

  const { user } = useContext(AuthContext);



  const handleSendMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/Usuarios/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          user_id: user.id,
          full_name: user.full_name,
          puesto_trabajo: user.puesto_trabajo,
          message: message,
        })
      });


      if (response.ok) {
        alert("Mensaje enviado con éxito");
      } else {
        const data = await response.json();
        console.log("Error al enviar el mensaje:", data.detail);
        alert(`Error: ${data.detail}`);
      }
    } catch (error) {
      console.log("Error al enviar el mensaje:", error);
      alert("Error al enviar el mensaje");
    }
  };

  const handleEmergencyClick = async () => {
    await handleSendMessage("¡Emergencia! Necesito asistencia.");
  };

  const handleDenunciaClick = async () => {
    if (denunciaMessage.trim() !== "") {
      await handleSendMessage(denunciaMessage);
    } else {
      alert("No puedes enviar una denuncia vacía");
    }
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
    </div>
  );
};