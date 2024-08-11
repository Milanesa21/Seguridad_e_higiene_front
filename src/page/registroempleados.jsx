import React, { useState, useRef } from "react";
import "../../public/css/img.css";
import "../../public/css/Login.css";
import "../../public/css/botonanimado.css";
import NumericInput from "../components/Inputnumerico.jsx";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

// Styled Alert component
const Alert = styled(MuiAlert)(({ theme }) => ({
  '& .MuiAlert-icon': {
    color: theme.palette.success.main,
  },
}));

export const Registroempleados = () => {
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const [numUsuarios, setNumUsuarios] = useState(1);
  const [pedro, setPedro] = useState(true);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    severity: "success",
  });
  const audioRef = useRef(null);

  const handleChangePuesto = (e) => {
    setSelectedPuesto(e.target.value);
  };

  const handleChangeNumUsuarios = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value <= 100) {
      setNumUsuarios(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      puesto_trabajo: selectedPuesto,
      num_usuarios: numUsuarios,
    };

    if (data.puesto_trabajo === "" || data.num_usuarios === 0) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/Usuarios/createUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          message: "Empleados creados correctamente",
          severity: "success",
        });
      } else {
        setNotification({
          message: "Error al crear empleados",
          severity: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "Error al crear empleados",
        severity: "error",
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const music = () => {
    if (pedro) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="prueba">
      <div className="ContenedorLogin">
        <div className="contenedordelcontenedor">
          <form onSubmit={handleSubmit} className="ContenedorFormulario">
            <div className="ContenedorLogo">
              <div className={pedro ? "LogoForm" : "Pedro"}>
                <img
                  src={pedro ? "/img/logo.jpg" : "/img/Pedro.gif"}
                  alt=""
                  onDoubleClick={() => {
                    setPedro(!pedro);
                    music();
                  }}
                />
              </div>
            </div>

            <h4 className="titulo-Login">Registro Empleados</h4>
            <NumericInput
              numUsuarios={numUsuarios}
              handleChangeNumUsuarios={handleChangeNumUsuarios} // Pasando las propiedades
            />
            <div className="input-groupRE">
              <select
                id="puesto-select"
                name="puesto_trabajo"
                value={selectedPuesto}
                onChange={handleChangePuesto}
                className="inputRE"
              >
                <option className="Options" value="">
                  Seleccione un puesto
                </option>
                <option className="Options" value="Electricidad">
                  Electricidad
                </option>
                <option className="Options" value="Construccion">
                  Construccion
                </option>
                <option className="Options" value="Quimica">
                  Quimica
                </option>
                <option className="Options" value="Agropecuaria">
                  Agropecuaria
                </option>
                <option className="Options" value="Metalurgia">
                  Metalurgia
                </option>
                <option className="Options" value="Area de seguridad">
                  Area de seguridad
                </option>
              </select>
              <label className="labelRE" htmlFor="puesto_select">
                Puesto de trabajo
              </label>
            </div>

            <div className="button-container">
              <button type="submit" className="animated-button">
                <span>Registrar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <audio ref={audioRef} src="/img/Pedro.mp3" />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registroempleados;
