import { useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserService } from "../service/userService";

export const useLogin = () => {
    const [isChecked, setIsChecked] = useState(true);
    const [passwordType, setPasswordType] = useState("password");
    const audioRef = useRef(null);
    const [user, setUser] = useState({
      full_name: "",
      puesto_trabajo: "",
      password: "",
      id_empresa: "",
    });
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
  
    const { login } = useAuth();
    const navigate = useNavigate();

  
    console.log(user);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      setPasswordType(passwordType === "password" ? "text" : "password");
    };
  
    const handleChange = (e) => {
      console.log(e.target.name, e.target.value); // Depuración
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (user.full_name === "" || user.password === "") return;
  
      try {
        const response = await UserService.login(user);
  
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
  
        if (response.status === 200) {
          const data = await response.json();
          if (data) {
            login(data);
            localStorage.setItem("token", data);
            localStorage.setItem("loginSuccess", "Logueado correctamente");
            setAlertType("success");
            setAlertMessage("Logueado correctamente");
            setOpen(true);
            if (user.full_name.includes("Usuario N")) {
              navigate("/cambioDatos");
            } else {
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertType("error");
        setAlertMessage("Ha ocurrido un error");
        setOpen(true);
      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const setEmpresaSeleccionada = (empresaId) => {
      setUser({
        ...user,
        id_empresa: empresaId,
      });
    }
return {
    isChecked,
    passwordType,
    audioRef,
    user,
    open,
    alertType,
    alertMessage,
    handleCheckboxChange,
    handleChange,
    handleSubmit,
    handleClose,
    setEmpresaSeleccionada,
  };
}