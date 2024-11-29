import { useRef, useState, useEffect } from "react";
import "../../public/LoginReplace.css";
import { Navbar } from "../components/Navbar.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { EmpresaService } from "../service/empresaService";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

// Styled Alert component
const Alert = MuiAlert;

export const EnterpriceRR = () => {
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [notification, setNotification] = useState({
    message: "",
    severity: "success",
  });
  const [open, setOpen] = useState(false);
  const [empresaData, setEmpresaData] = useState({
    nombre_empresa: "",
    nombre_jefe: "",
    correo_jefe: "",
    numero_jefe: "",
    password: "",
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmpresaService.regitro(empresaData);
      if (response.ok) {
        setNotification({
          message: "Empresa registrada exitosamente",
          severity: "success",
        });
      } else {
        setNotification({
          message: "Error al registrar la empresa",
          severity: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "Error al conectar con el servidor",
        severity: "error",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEmpresaData({
      ...empresaData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="prueba">
      <Fab
        color="primary"
        aria-label="back"
        onClick={() => navigate("/Inicio")}
        style={{ position: "fixed", top: "10%", left: "20px" }}
      >
        <ArrowBackIcon />
      </Fab>
      <Navbar />
      <div className="formcontainterlr">
        <div className="container">
          <div className="heading">Registro de Empresa</div>
          <form
            onSubmit={handleSubmit}
            className="form"
            onChange={handleChange}
          >
            {/* Nombre de Empresa */}
            <input
              required
              className="inputlr"
              type="text"
              name="nombre_empresa"
              id="nombre_empresa"
              placeholder="Nombre Empresa"
            />
            {/* Nombre del Dueño */}
            <input
              required
              className="inputlr"
              type="text"
              name="nombre_jefe"
              id="nombre_jefe"
              placeholder="Nombre Dueño"
            />
            {/* Correo del Dueño */}
            <input
              required
              className="inputlr"
              type="email"
              name="correo_jefe"
              id="correo_jefe"
              placeholder="Correo"
            />
            {/* Número de Teléfono */}
            <input
              required
              className="inputlr"
              type="tel"
              name="numero_jefe"
              id="numero_jefe"
              placeholder="Teléfono"
            />
            {/* Contraseña */}
            <div style={{ margin: "0" }} className="input-group">
              <input
                required
                className="inputlr"
                type={passwordType}
                name="password"
                id="password"
                placeholder="Contraseña"
              />
              {/* Checkbox para mostrar/ocultar contraseña */}
            </div>
            {/* Botón de Registro */}
            <input
              className="login-button"
              type="submit"
              value="Registrar Empresa"
            />
          </form>
        </div>
      </div>
      {/* Notificaciones */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
