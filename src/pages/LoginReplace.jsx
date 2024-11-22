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
            <input
              required
              className="inputlr"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={handleChange}
            />
            <input
              required
              className="inputlr"
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
            <input className="login-button" type="submit" value="Ingresar" />
            <span className="forgot-password">
              <a href="MailRegistro">No Posees una Cuenta?</a>
            </span>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
