import React from "react";
import "/public/css/components/boton.css";

export const Seccion7 = () => {
  // Función para abrir una ventana de imagen con una URL específica
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="Seccion7"></section>
    </div>
  );
};
