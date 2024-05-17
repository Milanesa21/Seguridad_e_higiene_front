import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const CMasVictorias = () => {
  // Función para abrir una ventana de imagen con una URL específica
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="cmasvictorias">
        <h2>Campeones con mas victorias</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            {/* Botón para la región EU */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("/img/CMVEU.jpeg")}
            >
              EU
            </button>
            {/* Botón para la región NA */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("/img/CMVNA.jpeg")}
            >
              NA
            </button>
            {/* Botón para la región KR */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("/img/CMVKR.jpeg")}
            >
              KR
            </button>
          </div>
          {/* Contenedor de la imagen */}
          <div className="Zed">
            <img src="./img/Zed.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
