import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthProvider';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const { user } = useContext(AuthContext);

  const connectWebSocket = useCallback(() => {
    if (!user) {
      console.log('Usuario no autenticado o sin id_empresa');
      return;
    }

    const socket = new WebSocket(`ws://localhost:8000/ws/${user.id_empresa}`);

    socket.onopen = () => console.log('WebSocket conectado');
    socket.onclose = () => {
      console.log('WebSocket desconectado');
      // Intenta reconectar después de un tiempo
      setTimeout(connectWebSocket, 3000);
    };
    socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    setWs(socket);
  }, [user]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [user, connectWebSocket]);

  const sendMessage = useCallback((message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }, [ws]);

  return (
    <WebSocketContext.Provider value={{ ws, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);