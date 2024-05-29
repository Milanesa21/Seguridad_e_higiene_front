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
      <section id="inicio">
        <div className="DivSeccion">
          <div className="DivPresentacion">
            <h1> ¡Bienvenidos a Centinela!</h1>
            <div className="BoxP">
              <p>
                Somos tu aliado en seguridad industrial, una plataforma diseñada
                para brindarte información precisa y herramientas efectivas para
                proteger tus entornos de trabajo. En un mundo donde la seguridad
                es primordial, Centinela se destaca como tu compañero confiable.
                Nuestro objetivo es simple: proporcionarte la tranquilidad que
                necesitas al ofrecerte soluciones integrales para la protección
                de tus instalaciones industriales.
              </p>
            </div>
          </div>
          {/* Contenedor de la imagen */}

          <div className="InicioLogo">
            <img className="imagenCortada" src="./img/logo.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};
