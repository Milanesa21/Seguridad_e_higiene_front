import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ValidateService } from "../service/validateService";
import { UserService } from "../service/userService";
import DenunciasyEmergencias from "../components/DenunciasyEmergencias";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar.jsx";
import "../../public/LoginReplace.css";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const PasswordChange = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [isTokenValid, setIsTokenValid] = useState(null); // Para manejar la validez del token
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const { id, token } = useParams(); // Obtener el token de la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Validar el token cuando se cargue el componente
    const validateToken = async () => {
      try {
        const response = await ValidateService.validateTokenPassword(token);
        const data = await response.json();
        if (data) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Error validando el token", error);
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlertType("error");
      setAlertMessage("Las contraseñas no coinciden");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await UserService.chengePassword(id, { new_password: newPassword });
      const data = await response.json();
      if (data.success) {
        setAlertType("success");
        setAlertMessage("Contraseña cambiada con éxito");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/Login"), 2000); // Redirigir al login tras el cambio de contraseña
      } else {
        setAlertType("error");
        setAlertMessage("Error al cambiar la contraseña");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña", error);
      setAlertType("error");
      setAlertMessage("Error al cambiar la contraseña");
      setOpenSnackbar(true);
    }
  };

  if (isTokenValid === null) {
    return <div>Validando token...</div>;
  }

  if (!isTokenValid) {
    return <div>El token es inválido o ha expirado.</div>;
  }

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
          <div className="heading">Cambio de Contraseña</div>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-groupLr">
              <input
                type={passwordType}
                name="new_password"
                className="inputlr"
                id="new_password"
                placeholder="Nueva contraseña"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input-groupLr">
              <input
                type={passwordType}
                name="confirm_password"
                className="inputlr"
                id="confirm_password"
                placeholder="Confirmar contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="containera1" onClick={handleCheckboxChange}>
              <input type="checkbox" defaultChecked={isChecked} />
              {/* SVG de ojo para mostrar u ocultar la contraseña */}
            </div>
            <div className="button-containerLr">
              <button type="submit" className="login-button">
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <DenunciasyEmergencias />
    </div>
  );
};
