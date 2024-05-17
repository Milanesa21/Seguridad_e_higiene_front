import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const MuertesRol = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="muertesrol">
        <h2>Mas muertes por rol</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/MPREU.jpeg")}
            >
              EU
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/MPRNA.jpeg")}
            >
              NA
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/MPRKR.jpeg")}
            >
              KR
            </button>
          </div>
          <div className="Yasuo">
            <img src="./img/Yasuo.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
