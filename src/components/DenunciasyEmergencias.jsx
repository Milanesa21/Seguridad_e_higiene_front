import { useRef, useState, useContext } from "react";
import { Fab, Modal, Box, TextareaAutosize, Button, Stack, Alert, AlertTitle } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import EmergencyIcon from "@mui/icons-material/Warning"; // Icono para el botón flotante
import "../../public/css/components/inputtext.css";
import "../../public/css/components/boton.css";

export const DenunciasyEmergencias = () => {
  const emergencyRef = useRef(null);
  const denunciaRef = useRef(null);
  const [denunciaMessage, setDenunciaMessage] = useState("");
  const [notification, setNotification] = useState({ open: false, severity: "", message: "" });
  const [openModal, setOpenModal] = useState(false);

  const { user } = useContext(AuthContext);

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/Usuarios/SendAlertMessage", {
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
        setNotification({ open: true, severity: "success", message: "Mensaje enviado correctamente" });
      } else {
        const data = await response.json();
        console.error("Error al enviar el mensaje:", data.detail);
        setNotification({ open: true, severity: "error", message: "Error al enviar mensaje" });
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setNotification({ open: true, severity: "error", message: "Error al enviar mensaje" });
    }
  };

  const handleEmergencyClick = async () => {
    await handleSendMessage("¡Emergencia! Necesito asistencia.");
  };

  const handleDenunciaClick = async () => {
    if (denunciaMessage.trim() !== "") {
      await handleSendMessage(denunciaMessage);
      setDenunciaMessage(""); // Limpia el campo después de enviar
    } else {
      setNotification({ open: true, severity: "error", message: "No puedes enviar una denuncia vacía" });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      {/* Botón flotante */}
      <Fab
        color="primary"
        aria-label="emergencia"
        onClick={handleOpenModal}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 10,
        }}
        className="emergency-button"
      >
        <EmergencyIcon />
      </Fab>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ animation: "fadeInModal 0.5s ease-out" }} // Animación de entrada del modal
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {/* Botón de Emergencia */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleEmergencyClick}
            style={{
              marginBottom: "1rem",
              fontSize: "1.5rem", // Tamaño de la fuente más grande
              padding: "16px 32px", // Más espacio en los bordes para hacer el botón más grande
              height: "60px", // Establecer una altura fija (opcional)
            }}
            className="emergency-modal-button"
          >
            ¡Emergencia!
          </Button>

          {/* Área de texto y botón de Denuncia */}
          <TextareaAutosize
            ref={denunciaRef}
            minRows={3}
            placeholder="Escribe tu denuncia aquí..."
            value={denunciaMessage}
            onChange={(e) => setDenunciaMessage(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "none",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDenunciaClick}
          >
            Enviar Denuncia
          </Button>
        </Box>
      </Modal>

      {/* Notificación */}
      {notification.open && (
        <Stack sx={{ width: "100%", position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }} spacing={2}>
          <Alert severity={notification.severity} onClose={handleCloseNotification}>
            <AlertTitle>{notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)}</AlertTitle>
            {notification.message}
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default DenunciasyEmergencias;
