// Navbar.jsx

import React from "react";
import "/public/css/nav.css";

export const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <a href="#">Centinela</a>
        </div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn">
            <i className="fas fa-times"></i>
          </label>
          <p className="pseccion">Secciones</p>
          <li>
            <a onClick={() => scrollToSection("inicio")}>1ra</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Denuncias")}>2da</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion3")}>3ra</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion4")}>4ta</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion5")}>5ta</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion6")}>6ta</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion7")}>7ma</a>
          </li>
          <li>
            <a href="#" class="desktop-item">
              Otras Opciones
            </a>
            <input type="checkbox" id="showDrop"></input>
            <label for="showDrop" class="mobile-item">
              Dropdown Menu
            </label>
            <ul class="drop-menu">
              <li>
                <a href="#">Drop menu 1</a>
              </li>
              <li>
                <a href="#">Drop menu 2</a>
              </li>
              <li>
                <a href="#">Drop menu 3</a>
              </li>
              <li>
                <a href="#">Drop menu 4</a>
              </li>
            </ul>
          </li>
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className="fas fa-bars"></i>
        </label>
      </div>
    </nav>
  );
};
