import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const CambioDatos = () => {
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { user } = useContext(AuthContext);
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

      if (response.ok) {
        if (response.status === 200) {
          const result = await response.json();
          if (result.message === "User data successfully updated") {
            setAlertType("success");
            setAlertMessage("Datos actualizados correctamente");
            setOpen(true);
            setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
          } else {
            setAlertType("error");
            setAlertMessage("Error al actualizar los datos del usuario");
            setOpen(true);
          }
        }
      } else {
        setAlertType("error");
        setAlertMessage("Error en la petición: " + response.status);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertType("error");
      setAlertMessage("Ha ocurrido un error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar Datos</button>
      </form>

      {/* Notificación de éxito o error */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
