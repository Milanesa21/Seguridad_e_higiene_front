import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import "/public/css/pages/perfil.css";
import { EmergencyModal } from "../components/EmergencyModal";

export const Perfil = () => {
  // Estado para manejar la edición
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  // Estado para manejar los datos
  const [formData, setFormData] = useState({
    name: "joaquin phoenix",
    email: "joaquinphoenix@industria.com",
    phone: "+54 11 1234 5678",
  });

  // Manejar el cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para activar la edición
  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Función para aceptar cambios
  const handleAcceptClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // Función para rechazar cambios
  const handleRejectClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }));
    // Revertir los cambios si es necesario
  };

  return (
    <div>
      <Navbar />
      <EmergencyModal />
      <br />
      <br />
      <br />
      <div className="divperfil">
        <h1>Perfil</h1>
        <div className="contenedorperfil">
          <div className="ContenedorLogoPfp">
            <div className="LogoForm">
              <img src="/public/img/sddefault.jpg" alt="" />
            </div>
            <h1>joaquin phoenix</h1>
          </div>

          <div className="Divinfopersonal">
            <h6>Información Personal</h6>
            <ul>
              <li>
                <strong>Nombre Completo: </strong>
                {isEditing.name ? (
                  <div className="editable-field">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      id="ola"
                    />
                    <FaCheck onClick={() => handleAcceptClick("name")} />
                    <FaTimes onClick={() => handleRejectClick("name")} />
                  </div>
                ) : (
                  <span className="view-mode">
                    {formData.name}
                    <FaPencilAlt
                      className="Lapizdelorto"
                      onClick={() => handleEditClick("name")}
                    />
                  </span>
                )}
              </li>
              <li>
                <strong>Correo Electrónico: </strong>
                {isEditing.email ? (
                  <div className="editable-field">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <FaCheck onClick={() => handleAcceptClick("email")} />
                    <FaTimes onClick={() => handleRejectClick("email")} />
                  </div>
                ) : (
                  <span className="view-mode">
                    <a href={`mailto:${formData.email}`}>{formData.email}</a>
                    <FaPencilAlt
                      className="Lapizdelorto"
                      onClick={() => handleEditClick("email")}
                    />
                  </span>
                )}
              </li>
              <li>
                <strong>Número de Teléfono: </strong>
                {isEditing.phone ? (
                  <div className="editable-field">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      id="textoinput"
                    />
                    <FaCheck onClick={() => handleAcceptClick("phone")} />
                    <FaTimes onClick={() => handleRejectClick("phone")} />
                  </div>
                ) : (
                  <span className="view-mode">
                    {formData.phone}
                    <FaPencilAlt
                      className="Lapizdelorto"
                      onClick={() => handleEditClick("phone")}
                    />
                  </span>
                )}
              </li>
              <li>
                <strong>Departamento:</strong>{" "}
                <span className="view-mode">Mantenimiento</span>
              </li>
              <li>
                <strong>Cargo:</strong>{" "}
                <span className="view-mode">Supervisor de Mantenimiento</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="divinfo">
        <div className="divinfospyp">
          <div className="Divinfolaboral">
            <h6>Información Laboral</h6>
            <ul>
              <li>
                <strong>Supervisor Directo:</strong>{" "}
                <span className="view-mode">
                  Juan García, Gerente de Mantenimiento
                </span>
              </li>
              <li>
                <strong>Horario de Trabajo:</strong>{" "}
                <span className="view-mode">Lunes a Viernes, 7:00 - 15:00</span>
              </li>
              <li>
                <strong>Rol:</strong> <span className="view-mode">Usuario</span>
              </li>
              <li>
                <strong>permisos:</strong>{" "}
                <span className="view-mode">Usuario</span>
              </li>
              <li>
                <strong>Ubicación Física:</strong>{" "}
                <span className="view-mode">
                  Planta 2, Edificio B, Oficina 5.
                </span>
              </li>
              <li>
                <strong>Fecha de Creación:</strong>
                <span className="view-mode"> 01/01/2021</span>
              </li>
              <div className="divrespo">
                <li>
                  <strong>Principales Responsabilidades:</strong>
                  <ul id="ULrespo">
                    <li id="LIrespo">
                      <span className="view-mode">
                        Supervisión de equipos de mantenimiento.
                      </span>
                    </li>
                    <li id="LIrespo">
                      <span className="view-mode">
                        Coordinación de reparaciones preventivas y correctivas.
                      </span>
                    </li>
                    <li id="LIrespo">
                      <span className="view-mode">
                        Gestión de inventarios de repuestos.
                      </span>
                    </li>
                    <EmergencyModal/>
                  </ul>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
