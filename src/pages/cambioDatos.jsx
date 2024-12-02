import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar.jsx";
import { UserService } from "../service/userService";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CambioDatos = () => {
  const [newData, setNewData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNewData({
        id: user.id,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newData.password !== newData.confirmPassword) {
      setAlertType("error");
      setAlertMessage("Las contraseñas no coinciden");
      setOpen(true);
      return;
    }

    try {
      const response = await UserService.updateUser(newData);
      if (response.ok) {
        if (response.status === 200) {
          setAlertType("success");
          setAlertMessage("Datos actualizados correctamente");
          setOpen(true);
          setTimeout(() => navigate("/"), 2000);
        } else {
          setAlertType("error");
          setAlertMessage("Error al actualizar los datos del usuario");
          setOpen(true);
        }
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
    <div className="prueba">
      <Fab
        color="primary"
        aria-label="back"
        onClick={() => navigate("/")}
        style={{ position: "fixed", top: "10%", left: "20px" }}
      >
        <ArrowBackIcon />
      </Fab>

      <Navbar />
      <div className="formcontainterlr">
        <div className="container">
          <div className="heading">Cambio de Datos</div>
          <form onSubmit={handleSubmit} className="form">
            {/* Campo para Nombre */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="text"
                name="name"
                value={newData.name}
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>
            {/* Campo para Email */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="email"
                name="email"
                value={newData.email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            {/* Campo para Contraseña */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="password"
                name="password"
                value={newData.password}
                placeholder="Contraseña"
                onChange={handleChange}
              />
            </div>
            {/* Campo para Confirmar Contraseña */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="password"
                name="confirmPassword"
                value={newData.confirmPassword}
                placeholder="Confirmar Contraseña"
                onChange={handleChange}
              />
            </div>
            {/* Botón de envío */}
            <div className="button-containerLr">
              <button type="submit" className="login-button">
                Actualizar Datos
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Snackbar para mostrar alertas */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
