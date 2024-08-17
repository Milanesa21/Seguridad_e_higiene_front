import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const CambioDatos = () => {
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {user} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí debes hacer las peticiones fetch para cambiar nombre, email y contraseña
      const response = await fetch("http://127.0.0.1:8000/Usuarios/user/updateData", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          new_name: newData.name || null,
          new_email: newData.email || null,
          new_password: newData.password || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const result = await response.json();
      console.log(result);

      if (result.message === "User data successfully updated") {
        // Redirigir a la ruta principal si la actualización fue exitosa
        navigate("/");
      } else {
        console.error("Error al actualizar los datos del usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Cambio de Datos</h2>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newData.name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={newData.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={newData.password}
            required
          />
        </div>
        <button type="submit">Actualizar Datos</button>
      </form>
    </div>
  );
};
