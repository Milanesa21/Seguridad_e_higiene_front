import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useWebSocket } from "../context/WebSocketContext";
import { useNotification } from "../context/NotificationContext";


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

export const EmergencyModal = () => {
  const ws = useWebSocket();
  const { showNotification } = useNotification();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'emergency') {
        setEmergencyOpen(true);
        showNotification("Se ha recibido una alerta de emergencia");
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws, showNotification]);

  const handleEmergencyClose = () => setEmergencyOpen(false);

  return (
    <Modal
      open={emergencyOpen}
      onClose={handleEmergencyClose}
      aria-labelledby="emergency-notification-title"
      aria-describedby="emergency-notification-description"
    >
      <Box sx={style}>
        <Typography id="emergency-notification-title" variant="h6" component="h2">
          ¡Emergencia!
        </Typography>
        <Typography id="emergency-notification-description" sx={{ mt: 2 }}>
          Se ha recibido una alerta de emergencia. Por favor, tome las medidas necesarias.
        </Typography>
        <Button variant="contained" onClick={handleEmergencyClose} sx={{ mt: 2 }}>
          Entendido
        </Button>
      </Box>
    </Modal>
  );
};
