import { useState, useRef } from "react";
import { UserService } from "../service/userService";
import { useAuth } from "../context/AuthProvider";


export const useRegistroEmpleados = () => {
    const [selectedPuesto, setSelectedPuesto] = useState("");
    const [numUsuarios, setNumUsuarios] = useState(1);
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState({
      message: "",
      severity: "success",
    });
    const audioRef = useRef(null);
  
    const {user} = useAuth()
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
        id_empresa: user?.id_empresa
      };
      console.log(data);
      if (data.puesto_trabajo === "" || data.num_usuarios === 0) return;
  
      try {
        const response = await UserService.register(data)
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

    return {
        selectedPuesto,
        numUsuarios,
        open,
        notification,
        audioRef,
        handleChangePuesto,
        handleChangeNumUsuarios,
        handleSubmit,
        handleClose,
    };
}