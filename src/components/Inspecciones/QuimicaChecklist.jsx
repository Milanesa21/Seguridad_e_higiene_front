import React, { useState, useCallback } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

// Configuración dinámica para las secciones del checklist
const sections = [
  {
    title: "Sección 1: Equipos de protección personal",
    fields: [
      { label: "¿Se utiliza bata de laboratorio en todo momento?", name: "usoBataLaboratorio" },
      { label: "¿Se utilizan gafas de protección al manejar sustancias químicas?", name: "usoGafasProteccion" },
      { label: "¿Se utilizan guantes adecuados para los productos químicos que se manejan?", name: "usoGuantesAdecuados" },
      { label: "¿Se usa mascarilla si es necesario (para vapores, polvo, etc.)?", name: "usoMascarilla" },
    ],
  },
  {
    title: "Sección 2: Almacenamiento de productos químicos",
    fields: [
      { label: "¿Están todos los productos químicos etiquetados correctamente?", name: "productosEtiquetados" },
      { label: "¿Están los productos químicos almacenados de manera segura?", name: "productosSeguros" },
      { label: "¿Se ha asegurado que los productos químicos incompatibles estén separados?", name: "almacenamientoCompatible" },
      { label: "¿Está el área de almacenamiento adecuadamente ventilada?", name: "ventilacionAdecuada" },
    ],
  },
  {
    title: "Sección 3: Procedimientos de manejo de productos químicos",
    fields: [
      { label: "¿Se siguen los procedimientos de manejo adecuados para cada producto químico?", name: "procedimientosSeguidos" },
      { label: "¿Se cuenta con un procedimiento para controlar derrames químicos?", name: "derramesControlados" },
      { label: "¿Se lleva un registro actualizado de los productos químicos utilizados?", name: "registroProductos" },
      { label: "¿El equipo de emergencia (duchas, lavaojos, extintores) está accesible y funcional?", name: "equipoEmergenciaAccesible" },
    ],
  },
  {
    title: "Sección 4: Estado del equipo de laboratorio",
    fields: [
      { label: "¿Está la campana de extracción funcionando correctamente?", name: "campanaFuncionando" },
      { label: "¿Está el equipo de laboratorio limpio y en buen estado?", name: "equipoLimpio" },
      { label: "¿Está el vidrio de laboratorio (matraces, tubos de ensayo, etc.) libre de daños?", name: "vidrioNoDañado" },
      { label: "¿Se ha verificado la calibración de los equipos de laboratorio?", name: "equiposCalibrados" },
    ],
  },
  {
    title: "Sección 5: Eliminación de residuos químicos",
    fields: [
      { label: "¿Están los residuos químicos correctamente etiquetados?", name: "residuosEtiquetados" },
      { label: "¿Están los residuos químicos almacenados de manera adecuada y segura?", name: "residuosAlmacenadosCorrectamente" },
      { label: "¿Se eliminan los residuos químicos con la frecuencia adecuada?", name: "residuosEliminadosFrecuentemente" },
      { label: "¿Se siguen los procedimientos correctos para la eliminación de residuos?", name: "procedimientosEliminacionCorrectos" },
    ],
  },
];

export const QuimicoChecklistForm = () => {
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN EN LABORATORIO QUÍMICO</h1>
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
