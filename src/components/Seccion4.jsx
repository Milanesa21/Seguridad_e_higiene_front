import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const Seccion4 = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="Seccion4">
        <div className="ChartsDiv">
          <img className="Charts" src="./img/chart (2).png" alt="" />
          <img className="Charts" src="./img/chart (3).png" alt="" />
        </div>
      </section>
    </div>
  );
};
