import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useWebSocket } from "../../context/WebSocketContext";
import { useNotification } from "../../context/NotificationContext";
import { Navbar } from "../Navbar";
import { EmergencyModal } from "../EmergencyModal";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
        const response = await fetch("http://localhost:8000/Usuarios/alert/messages");
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
    { field: "timestamp", headerName: "Fecha del mensaje", width: 200 },
    { field: "message", headerName: "Mensaje de la denuncia", width: 600 },
  ];

  const rows = messages.map((msg, index) => ({
    id: index,
    timestamp: new Date(msg.timestamp).toLocaleString(),
    message: msg.message,
  }));

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <Box p={2}>
        <h1>Panel de denuncias y emergencias</h1>
        <Box mb={2}>
          <h2>Alertas de seguridad</h2>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </Box>
        <Button variant="contained" color="error" onClick={handleOpen}>
          Enviar emergencia
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="emergency-modal-title"
          aria-describedby="emergency-modal-description"
        >
          <Box sx={style}>
            <Typography id="emergency-modal-title" variant="h6" component="h2">
              Confirmación de Emergencia
            </Typography>
            <Typography id="emergency-modal-description" sx={{ mt: 2 }}>
              ¿Está seguro de que desea enviar una alerta de emergencia a todos los clientes?
            </Typography>
            <Button variant="contained" color="error" onClick={sendEmergency} sx={{ mt: 2 }}>
              Enviar
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
              Cancelar
            </Button>
          </Box>
        </Modal>
        <EmergencyModal />
      </Box>
    </div>
  );
};
