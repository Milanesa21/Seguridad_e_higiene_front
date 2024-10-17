import { useRegistroEmpleados } from "../hooks/userRegisterEmpleado.js";
import NumericInput from "../components/Inputnumerico.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { Navbar } from "../components/Navbar.jsx";
import { EmergencyModal } from "../components/EmergencyModal.jsx";

const Alert = styled(MuiAlert)(({ theme }) => ({
  "& .MuiAlert-icon": {
    color: theme.palette.success.main,
  },
}));

export const Registroempleados = () => {
  const {
    selectedPuesto,
    numUsuarios,
    open,
    notification,
    audioRef,
    handleChangePuesto,
    handleChangeNumUsuarios,
    handleSubmit,
    handleClose,
  } = useRegistroEmpleados();
  return (
    <>
      <Navbar />
      <EmergencyModal />
      <div className="prueba">
        <div className="ContenedorLogin">
          <div className="contenedordelcontenedor">
            <form onSubmit={handleSubmit} className="ContenedorFormulario">
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
                  <option className="Options" value="Admin">
                    Administrador
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
          <Alert
            onClose={handleClose}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Registroempleados;
