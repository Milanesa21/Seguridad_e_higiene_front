import React, { useState, useRef } from "react";
import "../../public/css/img.css";
import "../../public/css/Login.css";
import "../../public/css/botonanimado.css";
import NumericInput from "../components/Inputnumerico.jsx"; 

export const Registroempleados = () => {
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const [numUsuarios, setNumUsuarios] = useState(1);
  const [pedro, setPedro] = useState(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      puesto_trabajo: selectedPuesto,
      num_usuarios: numUsuarios,  
    };

    console.log("Datos enviados al backend: ", data);

    fetch("http://127.0.0.1:8000/Usuarios/createUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del backend: ", data);
      })
      .catch((error) => console.error("Error:", error));
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

            <div className="input-groupRE">
              <select
                id="puesto-select"
                name="puesto_trabajo"
                value={selectedPuesto}
                onChange={handleChangePuesto}
                className="inputRE"
              >
                <option value="">Seleccione un puesto</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Gato">Gato</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Helicoptero apache">Helicoptero apache</option>
                <option value="Panzer">Panzer</option>
              </select>
              <label className="labelRE" htmlFor="puesto_select">
                Puesto de trabajo
              </label>
            </div>

            <NumericInput 
              numUsuarios={numUsuarios} 
              handleChangeNumUsuarios={handleChangeNumUsuarios} // Pasando las propiedades
            />

            <div className="button-container">
              <button type="submit" className="animated-button">
                <span>Registrar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <audio ref={audioRef} src="/img/Pedro.mp3" />
    </div>
  );
};

export default Registroempleados;
