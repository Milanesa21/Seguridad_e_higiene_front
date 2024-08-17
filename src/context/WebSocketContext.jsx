import React, { createContext, useState, useContext, useEffect } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws'); // Asegúrate de que la URL del WebSocket sea correcta

    socket.onopen = () => console.log('WebSocket conectado');
    socket.onclose = () => console.log('WebSocket desconectado');
    socket.onerror = (error) => {
      console.error('WebSocket error', error);
      // Agrega más información de error si es necesario
      if (error.message) {
        console.error('WebSocket error message:', error.message);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
