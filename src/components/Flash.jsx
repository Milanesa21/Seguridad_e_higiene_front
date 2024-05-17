import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const Flash = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="flash">
        <h2>Tecla mas usada para el Flash</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/FEU.jpeg")}
            >
              EU
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/FNA.jpeg")}
            >
              NA
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/FKR.jpeg")}
            >
              KR
            </button>
          </div>
          <div className="Jhin">
            <img src="./img/Jhin.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
