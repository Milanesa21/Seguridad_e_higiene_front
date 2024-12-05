import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Navbar } from "../components/Navbar.jsx";
import { EmpresaService } from "../service/empresaService";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../public/LoginReplace.css";

export const LoginEmpresa = () => {
  const [empresa, setEmpresa] = useState({
    nombre_empresa: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (empresa.nombre_empresa === "" || empresa.password === "") return;

    try {
      const response = await EmpresaService.login(empresa);
      if (response.status === 200) {
        const data = await response.json();
        if (data) {
          const rol = "admin";
          login(data, rol);
          setAlertType("success");
          setAlertMessage("Logueado correctamente como empresa");
          setOpen(true);
          navigate("/inicio");
        }
      }
    } catch (error) {
      console.error("Error en el login de empresa:", error);
      setAlertType("error");
      setAlertMessage("Credenciales inválidas o error en el sistema");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="prueba">
      {/* Botón flotante para regresar */}
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
          <div className="heading">Login Empresa</div>
          <form
            onSubmit={handleSubmit}
            className="form"
            style={{ width: "300px" }}
          >
            {/* Campo para Nombre de Empresa */}
            <div className="input-groupLr">
              <input
                required
                className="inputlr"
                type="text"
                name="nombre_empresa"
                id="nombre_empresa"
                placeholder="Nombre de Empresa o Correo"
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
              <a href="MailRegistro">¿No posees una cuenta?</a>
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
