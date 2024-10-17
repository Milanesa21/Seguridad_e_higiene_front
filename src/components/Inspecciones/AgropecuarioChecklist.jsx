import React, { useState, useCallback } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

// Configuración dinámica para las secciones del checklist
const sections = [
  {
    title: "Sección 1: Manejo de cultivos",
    fields: [
      { label: "¿El riego se realiza de manera adecuada según las necesidades del cultivo?", name: "riegoAdecuado" },
      { label: "¿Se está aplicando un control de plagas efectivo y seguro?", name: "controlPlagas" },
      { label: "¿Se está aplicando la fertilización de manera adecuada y responsable?", name: "fertilizacionAdecuada" },
      { label: "¿Las herramientas de trabajo están limpias y en buen estado?", name: "herramientasLimpias" },
    ],
  },
  {
    title: "Sección 2: Manejo de animales",
    fields: [
      { label: "¿Los animales están en buen estado de salud (vacunas, control veterinario)?", name: "saludAnimal" },
      { label: "¿Se está proporcionando una alimentación adecuada y balanceada a los animales?", name: "alimentacionAdecuada" },
      { label: "¿Los animales tienen acceso a agua suficiente y de calidad?", name: "aguaSuficiente" },
      { label: "¿Las instalaciones donde están los animales están limpias y en buen estado?", name: "instalacionesLimpias" },
    ],
  },
  {
    title: "Sección 3: Seguridad en la explotación agropecuaria",
    fields: [
      { label: "¿El personal usa equipo de protección adecuado (botas, guantes, casco)?", name: "usoEquipoProteccion" },
      { label: "¿La maquinaria agrícola está en buen estado y correctamente mantenida?", name: "maquinariaEnBuenEstado" },
      { label: "¿Se conocen y siguen los procedimientos de emergencia en caso de accidentes?", name: "procedimientosEmergencia" },
      { label: "¿Están los productos químicos (fertilizantes, pesticidas) correctamente almacenados?", name: "productosQuimicosAlmacenados" },
    ],
  },
  {
    title: "Sección 4: Mantenimiento de maquinaria y equipos",
    fields: [
      { label: "¿La maquinaria agrícola ha sido mantenida y revisada regularmente?", name: "maquinariaMantenida" },
      { label: "¿Los equipos de medición y aplicación (por ejemplo, pulverizadores) están calibrados?", name: "equiposCalibrados" },
      { label: "¿Las herramientas y maquinaria son adecuadas para las tareas agrícolas?", name: "herramientasAdecuadas" },
      { label: "¿El equipo de seguridad (extintores, kits de primeros auxilios) está disponible?", name: "equipoSeguridadDisponible" },
    ],
  },
  {
    title: "Sección 5: Procedimientos de sostenibilidad",
    fields: [
      { label: "¿Se realiza una adecuada gestión de residuos agrícolas?", name: "gestionResiduos" },
      { label: "¿Se implementan prácticas agrícolas sostenibles?", name: "practicasSostenibles" },
      { label: "¿Se hace un uso adecuado y eficiente del agua en las actividades agrícolas?", name: "usoAdecuadoAgua" },
      { label: "¿Se emplea energía renovable o técnicas de ahorro energético en la explotación?", name: "energiaRenovable" },
    ],
  },
];

export const AgropecuarioChecklistForm = () => {
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN AGROPECUARIA</h1>
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
