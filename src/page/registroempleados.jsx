import React, { useRef, useState } from "react";
import "../../public/css/img.css";
import "../../public/css/Login.css";
import "../../public/css/botonanimado.css";
import NumericInput from "../components/Inputnumerico.jsx";

export const Registroempleados = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const [pedro, setPedro] = React.useState(true);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    setSelectedCar(e.target.value);
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

            <h4 className="titulo-Login">Registro Empleados</h4>

            <NumericInput min={0} max={100} step={1} />
            <div className="input-groupRE">
              <select
                id="car-select"
                value={selectedCar}
                onChange={handleChange}
                className="inputRE"
              >
                <option className="Options" value="Your Car's Name">
                  Hombre
                </option>
                <option className="Options" value="BMW">
                  Mujer
                </option>
                <option className="Options" value="Bentley">
                  Gato
                </option>
                <option className="Options" value="Mercedes">
                  Mercedes
                </option>
                <option className="Options" value="Audi">
                  Helicoptero apache
                </option>
                <option className="Options" value="Volkswagen">
                  Panzer
                </option>
              </select>
              <label className="labelRE" htmlFor="car-select">
                sexo
              </label>
            </div>
            <div className="button-container">
              <button type="submit" className="animated-button">
                <span>Registrar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src="/img/Pedro.mp3" />
    </div>
  );
};
