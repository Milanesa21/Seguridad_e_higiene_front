import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { CerrarSesion } from "./CerrarSesion";
import "/public/css/components/nav.css";
import logo from "/public/Logoo.webp";

export const Navbar = () => {
  const { state, user } = useContext(AuthContext);
  const [rolId, setRolId] = useState("");
  const [showPanelOptions, setShowPanelOptions] = useState(false);

  const togglePanelOptions = () => {
    setShowPanelOptions((prev)=> !prev);
  }

  useEffect(() => {
    if (user?.rol?.id) {
      setRolId(user?.rol?.id);
    } else if ( user?.id_role) {
      setRolId(user?.id_role);
    } else{
      setRolId('');
    }
  }, [user]);

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
          <img className="LogoNAV" src={logo} alt="logo" />
          <a href="/inicio">Centinela</a>
        </div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn">
            <i className="fas fa-times"></i>
          </label>

          <li>
            <a href="#" className="desktop-item">Otras Opciones</a>
            <input type="checkbox" id="showDrop" />
            <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
            <ul className="drop-menu">
              {state.logged ? (
                <li>
                  <CerrarSesion />
                </li>
              ) : (
                <>
                  <li>
                    <a href="/LoginReplace">Inicio de sesión</a>
                  </li>
                  <li>
                    <a href="/LoginEmpresa">Inicio de sesión como empresa</a>
                  </li>
                </>
              )}

              {rolId === 1 || rolId === 2 ? ( 
                <li>
                  <a href="/EmployeeRR">Registro empleados</a>
                </li>
              ) : null}

              {rolId === 1 && (
                <li>
                  <a href="/EnterpriceRR">Registro empresa</a>
                </li>
              )}

              <li>
                <a href="/Jorgito" target="_blank" className="nav-link px-2">
                  Asistente virtual
                </a>
              </li>

              {rolId === 3 || rolId === 1 || rolId === 2 ? ( 
                <li>
                  <a href="/Inspeccion">Inspecciones de seguridad</a>
                </li>
              ) : null}

              {rolId === 1 || rolId === 2 || rolId === 3 ? (
                <li>
                  <a onClick={togglePanelOptions} href="#" className='panel-options'>Panel</a>
                  {showPanelOptions && (
                    <ul className="panel-options-menu">
                      <li>
                        <a href="/Panel">Panel de Seguridad</a>
                      </li>
                      <li>
                        <a href="/PanelPermisos">Panel de Permisos</a>
                      </li>
                    </ul>
                  )}
                </li>
              ) : null}

              {rolId === 1 || rolId === 2 || rolId === 3 ? (
                <li>
                  <a href="/GaleriaInspecciones">Galeria de inspecciones</a>
                </li>
              ) : null}
            </ul>
          </li>
        </ul>

        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className="fas fa-bars"></i>
        </label>
      </div>

      {state?.logged && (
        <div className="divpfpnav">
          <span className="pseccion">{user?.full_name || "Bruce Wayne"}</span>
        </div>
      )}
    </nav>
  );
};
