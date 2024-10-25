import React, { useState, useCallback } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

// Configuración dinámica para las secciones del checklist
const sections = [
  {
    title: "Sección 1: Equipos eléctricos",
    fields: [
      { label: "¿Se ha realizado una inspección visual de los equipos eléctricos?", name: "inspeccionEquipos" },
      { label: "¿Hay equipos eléctricos dañados o defectuosos?", name: "equiposDañados" },
      { label: "¿Están todos los equipos etiquetados correctamente?", name: "etiquetadoCorrecto" },
    ],
  },
  {
    title: "Sección 2: Cables y conexiones",
    fields: [
      { label: "¿Están los cables correctamente aislados?", name: "cablesAisladosCorrectamente" },
      { label: "¿Son las conexiones eléctricas firmes y seguras?", name: "conexionesFirmes" },
      { label: "¿Hay cables dañados o desgastados?", name: "cablesDañados" },
    ],
  },
  {
    title: "Sección 3: Interruptores y paneles",
    fields: [
      { label: "¿Funcionan correctamente los interruptores automáticos?", name: "interruptoresFuncionando" },
      { label: "¿Están los paneles eléctricos etiquetados correctamente?", name: "panelesEtiquetados" },
      { label: "¿Está el acceso a los paneles eléctricos despejado?", name: "accesoDespejadoPaneles" },
    ],
  },
  {
    title: "Sección 4: Protección personal",
    fields: [
      { label: "¿Se está utilizando el equipo de protección adecuado?", name: "usoEquiposProteccion" },
      { label: "¿Se usan guantes aislantes para trabajos en vivo o cerca de corriente?", name: "guantesAislantes" },
      { label: "¿Se usan gafas de protección en zonas de riesgo?", name: "gafasProteccion" },
    ],
  },
  {
    title: "Sección 5: Procedimientos de trabajo",
    fields: [
      { label: "¿Se aplica el procedimiento de bloqueo y etiquetado antes de trabajar en equipos eléctricos?", name: "bloqueoEtiquetado" },
      { label: "¿Se siguen los procedimientos de trabajo seguro?", name: "procedimientosTrabajoSeguro" },
      { label: "¿Ha recibido el personal la formación adecuada en seguridad eléctrica?", name: "formacionAdecuada" },
    ],
  },
  {
    title: "Sección 6: Herramientas y equipos de prueba",
    fields: [
      { label: "¿Se utilizan herramientas aisladas para trabajos eléctricos?", name: "herramientasAisladas" },
      { label: "¿Están las herramientas en buen estado de funcionamiento?", name: "herramientasEnBuenEstado" },
      { label: "¿Está el equipo de pruebas eléctricas debidamente calibrado?", name: "equipoPruebasCalibrado" },
    ],
  },
];

export const ElectricidadChecklistForm = () => {
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN ELÉCTRICA</h1>
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
