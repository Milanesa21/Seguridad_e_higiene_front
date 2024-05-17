import React from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const RolMasJugado = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="rolmasjugado">
        <h2>Rol mas jugado</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/RMJEU.jpeg")}
            >
              EU
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/RMJNA.jpeg")}
            >
              NA
            </button>
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("../../public/img/RMJKR.jpeg")}
            >
              KR
            </button>
          </div>
          <div className="Lucian">
            <img src="./img/Lucian.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
