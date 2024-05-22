import React, { useRef, useEffect } from "react";
import "../../public/css/img.css";
import "../../public/css/boton.css";
import "../../public/css/inputtext.css";

export const CMasJugado = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const handleKeyUp = (e) => {
      textarea.style.height = "63px";
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    };

    textarea.addEventListener("keyup", handleKeyUp);

    return () => {
      textarea.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="SECCION">
      <section id="cmasjugado">
        <h2>Emergencia</h2>
        <div className="DivSeccion">
          <div className="DivBotones">
            {/* BOTON DE EMERGENCIA */}
            <button className="buttonEmergencia">
              <p className="text">OMAIGAAAAA</p>
            </button>
          </div>
          {/* Contenedor de la imagen */}
          <div className="inputwrapper">
            <h2>Mensaje</h2>
            <textarea
              ref={textareaRef}
              spellCheck="false"
              placeholder="Type something here..."
              required
            ></textarea>
            {/* BOTON DE DENUNCIA */}
            <button className="button">
              <p className="text">OMAIGAAAAA</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
