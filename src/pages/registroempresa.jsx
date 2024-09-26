import { useRef, useState, useEffect, useContext } from "react";
import "/public/css/components/img.css";
import "/public/css/pages/Login.css";
import "/public/css/components/botonanimado.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { Navbar } from "../components/Navbar";
import { EmergencyModal } from "../components/EmergencyModal";
// Styled Alert component
const Alert = styled(MuiAlert)(({ theme }) => ({
  "& .MuiAlert-icon": {
    color: theme.palette.success.main,
  },
}));
import { AuthContext } from "../context/AuthProvider";



export const Registroempresa = () => {
  const [isChecked, setIsChecked] = useState(true);
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
    id_superuser:''
  })
  const audioRef = useRef(null);
  const { userId } = useContext(AuthContext);



  useEffect(() => {
    if (userId) {
      setEmpresaData((prevData) => ({
        ...prevData,
        id_superuser: userId,
      }));
    }
  }, [userId]);
  console.log(userId);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/empresas/registrar_empresa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresaData),
      });
      

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
  }

  console.log(empresaData)
  return (
    <>
      <Navbar />
      <div className="prueba">
        <div className="ContenedorLoginre">
          <div className="contenedordelcontenedor">
            <div className="ContenedorFormulario">
              <h4 className="titulo-Login">Bienvenido</h4>

<form onSubmit={handleSubmit} onChange={handleChange}>
  {/* INPUT DE NOMBRE DE EMPRESA */}
  <div className="input-group">
    <input
      type="text"
      name="nombre_empresa"
      className="input"
      id="inputField"
      required
    />
    <label className="label" htmlFor="inputField">
      Nombre Empresa
    </label>
  </div>
  {/* INPUT DE NOMBRE DEL DUEÑO */}
  <div className="input-group">
    <input
      type="text"
      name="nombre_jefe"
      className="input3"
      id="inputFieldOwner"
      required
    />
    <label className="label3" htmlFor="inputFieldOwner">
      Nombre Dueño
    </label>
  </div>
  {/* INPUT DEL CORREO */}
  <div className="input-group">
    <input
      type="email"
      name="correo_jefe"
      className="input4"
      id="inputFieldEmail"
      required
    />
    <label className="label4" htmlFor="inputFieldEmail">
      Correo
    </label>
  </div>
  {/* INPUT DEL NÚMERO DE TELÉFONO */}
  <div className="input-group">
    <input
      type="tel"
      name="numero_jefe"
      className="input5"
      id="inputFieldPhone"
      required
    />
    <label className="label5" htmlFor="inputFieldPhone">
      Teléfono
    </label>
  </div>
  {/* INPUT DE LA CONTRASEÑA */}
  <div className="input-group">
    <input
      type={passwordType}
      name="password"
      className="input1"
      id="inputFieldPassword"
      required
    />
    <label className="label1" htmlFor="inputFieldPassword">
      Contraseña
    </label>
    {/* BOTÓN DE VISIBILIDAD PARA CONTRASEÑA */}
    <div className="containera">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <svg
        className="eye"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 576 512"
        style={{ display: isChecked ? "block" : "none" }}
      >
        {/* Contenido SVG */}
      </svg>
      <svg
        className="eye-slash"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 640 512"
        style={{ display: isChecked ? "none" : "block" }}
      >
        {/* Contenido SVG */}
      </svg>
    </div>
  </div>
  {/* BOTÓN DE REGISTRO */}
  <div className="button-container">
    <button type="submit" className="animated-button">
      <span>Registrar</span>
    </button>
  </div>
</form>

            </div>
          </div>
        </div>
        <audio ref={audioRef} src="/img/Pedro.mp3" />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
        <EmergencyModal />
      </div>
    </>
  );
};

export default Registroempresa;
