import React, { useState, useCallback } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

// Configuración dinámica para las secciones del checklist
const sections = [
  {
    title: "Sección 1: Seguridad en el sitio de construcción",
    fields: [
      { label: "¿El acceso al sitio de construcción está controlado para prevenir el ingreso no autorizado?", name: "accesoControlado" },
      { label: "¿La señalización de seguridad está claramente visible y colocada en zonas críticas?", name: "senalizacionAdecuada" },
      { label: "¿Los pasillos y áreas de trabajo están despejados de obstáculos y peligros?", name: "pasillosDespejados" },
      { label: "¿Están disponibles los equipos de emergencia (extintores, primeros auxilios) en el sitio?", name: "equiposEmergenciaDisponibles" },
    ],
  },
  {
    title: "Sección 2: Uso de equipo de protección personal (EPP)",
    fields: [
      { label: "¿Todo el personal lleva casco de seguridad?", name: "cascoSeguridad" },
      { label: "¿Se utilizan gafas de protección adecuadas cuando se trabaja con materiales peligrosos o herramientas?", name: "gafasProtectoras" },
      { label: "¿El personal usa chalecos reflectantes en todo momento?", name: "chalecoReflectante" },
      { label: "¿Se lleva calzado de seguridad adecuado en el sitio de construcción?", name: "calzadoSeguridad" },
      { label: "¿El personal usa guantes de trabajo adecuados para las tareas específicas?", name: "guantesTrabajo" },
    ],
  },
  {
    title: "Sección 3: Maquinaria y herramientas",
    fields: [
      { label: "¿Toda la maquinaria ha sido inspeccionada antes de su uso?", name: "maquinariaInspeccionada" },
      { label: "¿Las herramientas utilizadas son adecuadas para las tareas y están en buen estado?", name: "herramientasAdecuadas" },
      { label: "¿Los equipos de medición y maquinaria están correctamente calibrados?", name: "equiposCalibrados" },
      { label: "¿Se ha realizado el mantenimiento preventivo a la maquinaria?", name: "mantenimientoRealizado" },
    ],
  },
  {
    title: "Sección 4: Procedimientos de trabajo en altura",
    fields: [
      { label: "¿Se han instalado líneas de vida para trabajos en altura?", name: "lineasVidaInstaladas" },
      { label: "¿Se han verificado los arneses de seguridad antes de su uso?", name: "arnesesVerificados" },
      { label: "¿Se han instalado barandas de protección en las áreas elevadas?", name: "barandasProteccion" },
      { label: "¿Están implementados los sistemas de prevención de caídas?", name: "sistemasPrevencionCaidas" },
    ],
  },
  {
    title: "Sección 5: Manejo de materiales peligrosos",
    fields: [
      { label: "¿Se realiza el almacenamiento adecuado de los materiales peligrosos?", name: "almacenamientoAdecuado" },
      { label: "¿Los contenedores de materiales peligrosos están debidamente etiquetados?", name: "etiquetasCorrectas" },
      { label: "¿Está disponible el equipo adecuado para la manipulación segura de materiales peligrosos?", name: "equipoManipulacionDisponible" },
      { label: "¿El área de trabajo tiene ventilación adecuada para evitar la exposición a vapores peligrosos?", name: "ventilacionAdecuada" },
    ],
  },
];

export const ConstruccionChecklistForm = () => {
  const [checklistData, setChecklistData] = useState(
    sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = false;
      });
      return acc;
    }, {})
  );

  const handleChange = useCallback((e) => {
    const { name, checked } = e.target;
    setChecklistData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Checklist Data:", checklistData);
    // Aquí puedes enviar el data a tu backend usando una llamada a la API
  }, [checklistData]);

  const printForm = useCallback(() => {
    window.print();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN EN CONSTRUCCIÓN</h1>
        <form onSubmit={handleSubmit}>
          {sections.map((section, index) => (
            <div className="mb-4" key={index}>
              <h2>{section.title}</h2>
              {section.fields.map((field) => (
                <div className="form-check" key={field.name}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={field.name}
                    checked={checklistData[field.name]}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{field.label}</label>
                </div>
              ))}
            </div>
          ))}

          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button type="button" className="btn btn-secondary" onClick={printForm}>
            Imprimir
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
