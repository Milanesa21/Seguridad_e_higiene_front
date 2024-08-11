import React, { useRef, useState, useContext } from "react";
import "../../public/css/img.css";
import "../../public/css/Login.css";
import "../../public/css/botonanimado.css";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Login = () => {
  const [pedro, setPedro] = React.useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const audioRef = useRef(null);
  const [user, setUser] = useState({
    full_name: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { login } = useContext(AuthContext);

  const music = () => {
    if (pedro) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.full_name === "" || user.password === "") return;

    try {
      const response = await fetch("http://127.0.0.1:8000/Usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (data) {
        login(data);
        localStorage.setItem('token', data);
        localStorage.setItem('loginSuccess', 'Logueado correctamente');
        window.location.href = "/";
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertType("error");
      setAlertMessage("Ha ocurrido un error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="prueba">
      <div className="ContenedorLogin">
        <div className="contenedordelcontenedor">
          <div className="ContenedorFormulario">
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

            <h4 className="titulo-Login">Bienvenido</h4>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <div className="input-group">
                <input
                  type="text"
                  name="full_name"
                  className="input"
                  id="inputField"
                  required
                />
                <label className="label" htmlFor="inputField">
                  Username
                </label>

                <br />
                <br />
                <input
                  type={passwordType}
                  name="password"
                  className="input1"
                  id="inputFieldPassword"
                  required
                />
                <label className="label1" htmlFor="inputFieldPassword">
                  Password
                </label>
                <div className="containera" onClick={handleCheckboxChange}>
                  <input type="checkbox" defaultChecked={isChecked} />
                  <svg
                    className="eye"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    style={{ display: isChecked ? "block" : "none" }}
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                  </svg>
                  <svg
                    className="eye-slash"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                    style={{ display: isChecked ? "none" : "block" }}
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c18.7 0 36.6-3.7 53-10.1c6.3-2.5 9.7-9.6 7.4-15.8c-2.3-6.2-9.1-9.5-15.4-7z"></path>
                  </svg>
                </div>
              </div>


              <div className="button-container">
                <button type="submit" className="animated-button">
                  <span>Login</span>
                </button>
              </div>
              </form>
          </div>
        </div>

        {/* Notificación de éxito o error */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <audio ref={audioRef} src="/path/to/audio/file.mp3" />
      </div>
    </div>
  );
};