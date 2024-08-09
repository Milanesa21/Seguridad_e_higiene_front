import React, { useState, useEffect } from 'react';

export const Panel = () => {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws');
        setWs(socket);

        socket.onmessage = (event) => {
            setMessages(prevMessages => [...prevMessages, event.data]);
        };

        return () => socket.close();
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (ws) {
            ws.send(input);
            setInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Panel</h1>
            <form onSubmit={sendMessage}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    autoComplete="off"
                />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};
