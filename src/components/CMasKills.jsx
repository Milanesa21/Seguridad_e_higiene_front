import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const CMasKills = () => {
  // Función para abrir una ventana de imagen con una URL específica
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="cmaskills">
        <h2>Campeon con mas kills</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            {/* Botón para la región EU */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/CMKEU.jpeg")}
            >
              EU
            </button>
            {/* Botón para la región NA */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/CMKNA.jpeg")}
            >
              NA
            </button>
            {/* Botón para la región KR */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/CMKKR.jpeg")}
            >
              KR
            </button>
          </div>
          {/* Contenedor de la imagen */}
          <div className="Lee">
            <img src="./img/Lee.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
