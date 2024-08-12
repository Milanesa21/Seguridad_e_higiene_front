import React from "react";
import { Navbar } from "../components/Navbar";
import "/public/css/pages/Perfil.css";

export const Perfil = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="divperfil">
        <h1>Perfil</h1>
      </div>
      <div className="divinfo">
        <h1>Informacion</h1>
      </div>
    </div>
  );
};
