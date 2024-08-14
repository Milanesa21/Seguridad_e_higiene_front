import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import "/public/css/pages/perfil.css";

export const Perfil = () => {
  // Estado para manejar la edición
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  // Estado para manejar los datos
  const [formData, setFormData] = useState({
    name: "Carlos López",
    email: "carlos.lopez@industria.com",
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
      <br />
      <br />
      <br />
      <div className="divperfil">
        <h1>Perfil</h1>
        <div className="contenedorperfil">
          <div className="ContenedorLogo">
            <div className="LogoForm">
              <img src="/public/img/sddefault.jpg" alt="" />
            </div>
          </div>
          <h1>Carlos López</h1>
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
                <strong>Departamento:</strong> Mantenimiento
              </li>
              <li>
                <strong>Cargo:</strong> Supervisor de Mantenimiento
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
                <strong>Supervisor Directo:</strong> Juan García, Gerente de
                Mantenimiento
              </li>
              <li>
                <strong>Horario de Trabajo:</strong> Lunes a Viernes, 7:00 -
                15:00
              </li>
              <li>
                <strong>Rol:</strong> Usuario
              </li>
              <li>
                <strong>permisos:</strong> Usuario
              </li>
              <li>
                <strong>Ubicación Física:</strong> Planta 2, Edificio B, Oficina
                5.
              </li>
              <li>
                <strong>Fecha de Creación:</strong> 01/01/2021
              </li>
              <li>
                <strong>Principales Responsabilidades:</strong>
                <ul>
                  <li>Supervisión de equipos de mantenimiento.</li>
                  <li>
                    Coordinación de reparaciones preventivas y correctivas.
                  </li>
                  <li>Gestión de inventarios de repuestos.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
