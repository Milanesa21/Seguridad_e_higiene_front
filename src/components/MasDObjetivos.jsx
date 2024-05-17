import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const MasDObjetivos = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="masdobjetivos">
        <h2>Mas daño por objetivos</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/DPOEU.jpeg")}
            >
              EU
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/DPONA.jpeg")}
            >
              NA
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/DPOKR.jpeg")}
            >
              KR
            </button>
          </div>
          <div className="Kaedetosuzu">
            <img src="./img/Nasus.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
