import React from 'react';
import { Navbar } from '../Navbar';
import './Panel.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta o ajusta la ruta según sea necesario.

export const Panel = () => {
  return (
    <div>
        <Navbar />
      <div className="container">
      <div className="parent">
        <div className="div1 content-box div1-box">Content 1</div>
        <div className="div2 content-box div2-box">Content 2</div>
        <div className="div3 content-box div3-box">Content 3</div>
        <div className="div4 content-box div4-box">Content 4</div>
      </div>
      </div>
    </div>
  );
};
