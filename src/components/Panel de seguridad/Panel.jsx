import React, { useState, useEffect } from 'react';

export const Panel = () => {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws');
        setWs(socket);

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        return () => socket.close();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:8000/Usuarios/alert/messages');
                if (!response.ok) throw new Error('Error al obtener mensajes');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Inicializa la carga de mensajes
        fetchMessages();

        // Configura el polling para cada 5 segundos
        const intervalId = setInterval(fetchMessages, 5000);

        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []);

    const sendAlert = (event) => {
        event.preventDefault();
        if (ws) {
            ws.send(JSON.stringify({ message: input }));
            setInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Panel</h1>
            <form onSubmit={sendAlert}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    autoComplete="off"
                    placeholder="Type alert message..."
                />
                <button type="submit">Send Alert</button>
            </form>
            <div>
                <h2>Alerts and Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
