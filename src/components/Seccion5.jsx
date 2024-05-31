import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const Seccion5 = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="Seccion5"></section>
    </div>
  );
};
