import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { CerrarSesion } from "./CerrarSesion";
import "/public/css/components/nav.css";
import logo from "/public/Logoo.webp";
import profile from "/public/img/sddefault.jpg";

export const Navbar = () => {
  const { state, user } = useContext(AuthContext);
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
          <img className="LogoNAV" src={logo} alt="" />
          <a href="/">Centinela</a>
        </div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn">
            <i className="fas fa-times"></i>
          </label>

          <li>
            <a onClick={() => scrollToSection("Denuncias")}>
              Denuncias y Emergencias
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion3")}>
              Graficos seguridad A
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion4")}>
              Graficos seguridad B
            </a>
          </li>
          {/* <li>
            <a onClick={() => scrollToSection("Seccion5")}>5ta</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion6")}>6ta</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("Seccion7")}>7ma</a>
          </li> */}
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
              {user?.rol?.nombre === 'super_admin' || user?.rol?.nombre === 'admin' ? (
                <li>
                  <a href="/Registroempleados">Registro empleados</a>
                </li>
              ): (
                null
              )}
              {user?.rol?.nombre === 'super_admin' && (
                  <li>
                    <a href="/Registroempresa">Registro empresa</a>
                </li>
              )}
              <li>
              <a
                href="https://jorgito-76bcf3.zapier.app"
                target="_blank"
                className="nav-link px-2"
              >
                Asistente virtual
              </a>
            </li>
              {user?.rol?.nombre === 'segurity' || user?.rol?.nombre === 'super_admin' || user?.rol?.nombre === 'admin' ? (
              <li>
                <a href="/Inspeccion">Inspecciones de seguridad</a>
              </li>
              ) : null}
              {user?.rol?.nombre === 'super_admin' || user?.rol?.nombre === 'admin' || user?.rol?.nombre === 'segurity' ? (
                <li>
                  <a href="/Panel">Panel de Seguridad</a>
                </li>
              ) : null}
              {user?.rol?.nombre === 'super_admin' || user?.rol?.nombre === 'admin' ? (
                <li>
                  <a href="/PanelPermisos">Panel de Permisos</a>
                </li>
              ): null}
            </ul>
          </li>
        </ul>

        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className="fas fa-bars"></i>
        </label>
      </div>
      {state?.logged ? (
    <div className="divpfpnav">
      <span className="pseccion">{user.full_name || 'Bruce wayne'}</span>
      <a href="/perfil">
        <img className="LogoPFPNavbar" src={profile} alt="" />
      </a>
    </div>
      ): null}

    </nav>
  );
};
