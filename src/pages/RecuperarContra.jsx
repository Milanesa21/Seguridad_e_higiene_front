import { useLogin } from "../hooks/userLogin.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar.jsx";
import "../../public/LoginReplace.css";

export const RecuperarContra = () => {
  const {
    open,
    alertType,
    alertMessage,
    handleClose,
  } = useLogin();

  return (
    <div className="prueba">
      <Navbar />
      <div className="formcontainterlr">
        <div className="container">
          <div className="heading">Ingrese su Correo</div>
          <form className="form">
            {/* Campo para Username */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="text"
                name="email"
                id="email"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="button-containerLr">
              <button type="submit" className="login-button">
                Enviar
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
