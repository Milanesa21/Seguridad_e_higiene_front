import React, { useRef } from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";

export const CMasJugado = () => {
  const [pedro, setPedro] = React.useState(true);
  const audioRef = useRef(null);

  // Función para abrir una ventana de imagen con una URL específica
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  const music = () => {
    if (pedro) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="SECCION">
      <section id="cmasjugado">
        <h2>Campeon mas jugado por region</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            {/* Botón para la región EU */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("/img/CMJEU.jpeg")}
            >
              EU
            </button>
            {/* Botón para la región NA */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("/img/CMJNA.jpeg")}
            >
              NA
            </button>
            {/* Botón para la región KR */}
            <button
              className="boton"
              onClick={() => abrirVentanaImagen("/img/CMJKR.jpeg")}
            >
              KR
            </button>
          </div>
          {/* Contenedor de la imagen */}
          <div className={pedro ? "Jinx" : "Pedro"}>
            <img
              src={pedro ? "/img/Jinx.png" : "/img/Pedro.gif"}
              alt=""
              onClick={() => {
                setPedro(!pedro);
                music();
              }}
            />
          </div>
        </div>
      </section>
      <audio ref={audioRef} src="/img/Pedro.mp3" />
    </div>
  );
};
