import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { EmergencyModal } from "./EmergencyModal"; 

export const Inicio = () => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Leer el mensaje de localStorage
    const message = localStorage.getItem("loginSuccess");
    if (message) {
      setNotification(message);
      setOpen(true);
      localStorage.removeItem("loginSuccess"); 
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="SECCION">
      <section id="inicio">
        <div className="DivSeccion">
          <div className="DivPresentacion">
            <h1> ¡Bienvenidos a Centinela!</h1>
            <div className="BoxP">
              <p>
                Somos tu aliado en seguridad industrial, una plataforma diseñada
                para brindarte información precisa y herramientas efectivas para
                proteger tus entornos de trabajo. En un mundo donde la seguridad
                es primordial, Centinela se destaca como tu compañero confiable.
                Nuestro objetivo es simple: proporcionarte la tranquilidad que
                necesitas al ofrecerte soluciones integrales para la protección
                de tus instalaciones industriales.
              </p>
            </div>
          </div>
          <div className="InicioLogo">
            <img className="imagenCortada" src="./img/logo.jpg" alt="" />
          </div>
        </div>
      </section>

      {/* Notificación de éxito */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {notification}
        </Alert>
      </Snackbar>

      <EmergencyModal />
    </div>
  );
};
