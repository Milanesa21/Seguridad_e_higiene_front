import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography, Paper } from "@mui/material";
import { useWebSocket } from "../../context/WebSocketContext";
import { useNotification } from "../../context/NotificationContext";
import { Navbar } from "../Navbar";
import { EmergencyModal } from "../EmergencyModal";
import DenunciasyEmergencias from "../DenunciasyEmergencias";
import { Footer } from "../Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Panel = () => {
  const ws = useWebSocket();
  const { showNotification } = useNotification();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/Usuarios/alert/messages"
        );
        if (!response.ok) throw new Error("Error al obtener mensajes");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const sendAlert = (event) => {
    event.preventDefault();
    if (ws) {
      ws.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendEmergency = () => {
    if (ws) {
      ws.send(JSON.stringify({ message: "Emergencia" }));
      handleClose();
    }
  };

  const columns = [
    { field: "puesto_trabajo", headerName: "Puesto de trabajo", width: 200 },
    { field: "full_name", headerName: "Nombre", width: 200 },
    { field: "message", headerName: "Mensaje de la denuncia", width: 600 },
  ];

  const rows = messages.map((msg, index) => ({
    id: index,
    puesto_trabajo: msg.puesto_trabajo,
    full_name: msg.full_name,
    message: msg.message,
  }));

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <Box p={4} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            Panel de denuncias y emergencias
          </Typography>
          <Box mb={2}>
            <Typography variant="h5" gutterBottom>
              Alertas de seguridad
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </div>
          </Box>
          <Box display="flex" justifyContent="center" mb={2}>
            <Button variant="contained" color="error" onClick={handleOpen}>
              Enviar emergencia
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="emergency-modal-title"
            aria-describedby="emergency-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="emergency-modal-title"
                variant="h6"
                component="h2"
              >
                Confirmación de Emergencia
              </Typography>
              <Typography id="emergency-modal-description" sx={{ mt: 2 }}>
                ¿Está seguro de que desea enviar una alerta de emergencia a
                todos los clientes?
              </Typography>
              <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={sendEmergency}
                >
                  Enviar
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Modal>
        </Paper>
        <EmergencyModal />
      </Box>
      <DenunciasyEmergencias />
      <Footer />
    </div>
  );
};
