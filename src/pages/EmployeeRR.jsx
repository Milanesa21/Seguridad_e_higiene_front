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

export const EmployeeRR = () => {
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
      <div className="formcontainterlr">
        <div className="container">
          <div className="heading">Registro Empleados</div>
          <form onSubmit={handleSubmit} className="form">
            <NumericInput
              numUsuarios={numUsuarios}
              handleChangeNumUsuarios={handleChangeNumUsuarios}
              className="inputlr"
            />
            <select
              id="puesto-select"
              name="puesto_trabajo"
              value={selectedPuesto}
              onChange={handleChangePuesto}
              className="inputlr"
            >
              <option className="Options" value="">
                Seleccione un puesto
              </option>
              <option className="Options" value="Electricidad">
                Electricidad
              </option>
              <option className="Options" value="Construccion">
                Construcción
              </option>
              <option className="Options" value="Quimica">
                Química
              </option>
              <option className="Options" value="Agropecuaria">
                Agropecuaria
              </option>
              <option className="Options" value="Admin">
                Administrador
              </option>
              <option className="Options" value="Area de seguridad">
                Área de seguridad
              </option>
            </select>
            <input type="submit" value="Registrar" className="login-button" />
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
    </>
  );
};

export default EmployeeRR;
