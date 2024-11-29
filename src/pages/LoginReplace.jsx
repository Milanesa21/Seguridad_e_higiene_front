import { useLogin } from "../hooks/userLogin.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar.jsx";
import "../../public/LoginReplace.css";

export const LoginReplace = () => {
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
            <div className="button-container">
              <button type="submit" className="login-button">
                Ingresar
              </button>
            </div>
            <span className="forgot-password">
              <a href="MailRegistro">¿No posees una cuenta?</a>
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
