import React, { useState } from 'react';
import axios from 'axios';

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseText('');

    try {
      const response = await axios.post('http://localhost:8000/jorgito/', {
        input_text: inputText,
      });

      const responseData = response.data.response;

      // Mostrar respuesta letra por letra
      let index = 0;
      const interval = setInterval(() => {
        if (index < responseData.length) {
          setResponseText((prev) => prev + responseData[index]);
          index++;
        } else {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 50); // Ajusta el tiempo de intervalo para la velocidad de escritura

    } catch (error) {
      console.error("Error fetching response:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputText} 
          onChange={handleChange} 
          placeholder="Hazme tu pregunta" 
        />
        <button type="submit">Enviar</button>
      </form>
      <div>
        {isLoading ? <p>Cargando...</p> : <p>Respuesta: {responseText}</p>}
      </div>
    </div>
  );
};
