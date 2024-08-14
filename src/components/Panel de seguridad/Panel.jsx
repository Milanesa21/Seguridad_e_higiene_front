import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, Button } from "@mui/material";
import { Navbar } from "../Navbar";

export const Panel = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    setWs(socket);

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => socket.close();
  }, []);

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

    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const sendAlert = (event) => {
    event.preventDefault();
    if (ws) {
      ws.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  const columns = [
    { field: "timestamp", headerName: "Fecha del mensaje", width: 200 },
    { field: "message", headerName: "Mensaje de la denuncia", width: 600 },
  ];

  const rows = messages.map((msg, index) => ({
    id: index, // Agregar un id único para cada fila
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
      </Box>
    </div>
  );
};
