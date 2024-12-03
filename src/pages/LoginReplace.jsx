import { useLogin } from "../hooks/userLogin.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar.jsx";
import "../../public/LoginReplace.css";
import { ConstruccionChecklistForm } from './../components/Inspecciones/ConstruccionChecklist';
import {Fab} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


export const LoginReplace = () => {
  const navigate = useNavigate();
  const {
    open,
    alertType,
    alertMessage,
    handleChange,
    handleSubmit,
    handleClose,
  } = useLogin();

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
          <div className="heading">Bienvenido</div>
          <form onSubmit={handleSubmit} className="form">
            {/* Campo para Username */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="text"
                name="full_name"
                id="username"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            {/* Campo para contraseña */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                onChange={handleChange}
              />
            </div>
            {/* Botón de envío */}
            <div className="button-containerLr">
              <button type="submit" className="login-button">
                Ingresar
              </button>
            </div>
            <span className="forgot-password">
              <a href="LoginEmpresa">Iniciar Como Empresa</a>
            </span>
            <span className="forgot-password">
              <a href="CorreoRecuperacion">¿No recuerdas tu contraseña?</a>
            </span>
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
