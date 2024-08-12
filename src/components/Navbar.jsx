import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { CerrarSesion } from "./CerrarSesion";
import "/public/css/components/nav.css";

export const Navbar = () => {
  const { state } = useContext(AuthContext);
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
            <a href="#" className="desktop-item">
              Otras Opciones
            </a>
            <input type="checkbox" id="showDrop" />
            <label htmlFor="showDrop" className="mobile-item">
              Dropdown Menu
            </label>
            <ul className="drop-menu">
              {state.logged ? (
                <li>
                  <CerrarSesion />
                </li>
              ) : (
                <li>
                  <a href="/Login">Inicio de sesion</a>
                </li>
              )}
              <li>
                <a href="/Registroempleados">Registro empleados</a>
              </li>
              <li>
                <a href="/Registroempresa">Registro empresa</a>
              </li>
              <li>
                <a href="/Jorgito">Asistente virtual</a>
              </li>
              <li>
                <a href="/Inspeccion">Inspecciones de seguridad</a>
              </li>
              <li>
                <a href="/Panel">Panel de Seguridad</a>
              </li>
              <li>
                <a href="/Perfil">Perfil</a>
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
