import React from "react";

export const Seccion3 = () => {
  const abrirVentanaImagen = (urlImagen) => {
    window.open(urlImagen, "_blank", "width=400,height=400");
  };

  return (
    <div className="SECCION">
      <section id="Seccion3">
        <div className="ChartsDiv">
          <img className="Charts" src="./img/chart.png" alt="" />
          <img className="Charts" src="./img/chart (1).png" alt="" />
        </div>
      </section>
    </div>
  );
};
