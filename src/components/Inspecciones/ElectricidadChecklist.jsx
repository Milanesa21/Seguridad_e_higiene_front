import React, { useState } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const ElectricidadChecklistForm = () => {
  const [checklistData, setChecklistData] = useState({
    // Sección 1: Equipos eléctricos
    inspeccionEquipos: false,
    equiposDañados: false,
    etiquetadoCorrecto: false,

    // Sección 2: Cables y conexiones
    cablesAisladosCorrectamente: false,
    conexionesFirmes: false,
    cablesDañados: false,

    // Sección 3: Interruptores y paneles
    interruptoresFuncionando: false,
    panelesEtiquetados: false,
    accesoDespejadoPaneles: false,

    // Sección 4: Protección personal
    usoEquiposProteccion: false,
    guantesAislantes: false,
    gafasProteccion: false,

    // Sección 5: Procedimientos de trabajo
    bloqueoEtiquetado: false,
    procedimientosTrabajoSeguro: false,
    formacionAdecuada: false,

    // Sección 6: Herramientas y equipos de prueba
    herramientasAisladas: false,
    herramientasEnBuenEstado: false,
    equipoPruebasCalibrado: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setChecklistData({
      ...checklistData,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checklist Data:", checklistData);
  };

  const printForm = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN ELÉCTRICA</h1>
        <form onSubmit={handleSubmit}>
          {/* Sección 1: Equipos eléctricos */}
          <div className="mb-4">
            <h2>Sección 1: Equipos eléctricos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="inspeccionEquipos"
                checked={checklistData.inspeccionEquipos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se ha realizado una inspección visual de los equipos eléctricos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equiposDañados"
                checked={checklistData.equiposDañados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Hay equipos eléctricos dañados o defectuosos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="etiquetadoCorrecto"
                checked={checklistData.etiquetadoCorrecto}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están todos los equipos etiquetados correctamente?
              </label>
            </div>
          </div>

          {/* Sección 2: Cables y conexiones */}
          <div className="mb-4">
            <h2>Sección 2: Cables y conexiones</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="cablesAisladosCorrectamente"
                checked={checklistData.cablesAisladosCorrectamente}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están los cables correctamente aislados?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="conexionesFirmes"
                checked={checklistData.conexionesFirmes}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Son las conexiones eléctricas firmes y seguras?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="cablesDañados"
                checked={checklistData.cablesDañados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Hay cables dañados o desgastados?
              </label>
            </div>
          </div>

          {/* Sección 3: Interruptores y paneles */}
          <div className="mb-4">
            <h2>Sección 3: Interruptores y paneles</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interruptoresFuncionando"
                checked={checklistData.interruptoresFuncionando}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Funcionan correctamente los interruptores automáticos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="panelesEtiquetados"
                checked={checklistData.panelesEtiquetados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están los paneles eléctricos etiquetados correctamente?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="accesoDespejadoPaneles"
                checked={checklistData.accesoDespejadoPaneles}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Está el acceso a los paneles eléctricos despejado?
              </label>
            </div>
          </div>

          {/* Sección 4: Protección personal */}
          <div className="mb-4">
            <h2>Sección 4: Protección personal</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoEquiposProteccion"
                checked={checklistData.usoEquiposProteccion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se está utilizando el equipo de protección adecuado?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="guantesAislantes"
                checked={checklistData.guantesAislantes}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se usan guantes aislantes para trabajos en vivo o cerca de corriente?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gafasProteccion"
                checked={checklistData.gafasProteccion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se usan gafas de protección en zonas de riesgo?
              </label>
            </div>
          </div>

          {/* Sección 5: Procedimientos de trabajo */}
          <div className="mb-4">
            <h2>Sección 5: Procedimientos de trabajo</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="bloqueoEtiquetado"
                checked={checklistData.bloqueoEtiquetado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se aplica el procedimiento de bloqueo y etiquetado antes de trabajar en equipos eléctricos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="procedimientosTrabajoSeguro"
                checked={checklistData.procedimientosTrabajoSeguro}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se siguen los procedimientos de trabajo seguro?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="formacionAdecuada"
                checked={checklistData.formacionAdecuada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Ha recibido el personal la formación adecuada en seguridad eléctrica?
              </label>
            </div>
          </div>

          {/* Sección 6: Herramientas y equipos de prueba */}
          <div className="mb-4">
            <h2>Sección 6: Herramientas y equipos de prueba</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="herramientasAisladas"
                checked={checklistData.herramientasAisladas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se utilizan herramientas aisladas para trabajos eléctricos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="herramientasEnBuenEstado"
                checked={checklistData.herramientasEnBuenEstado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están las herramientas en buen estado de funcionamiento?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equipoPruebasCalibrado"
                checked={checklistData.equipoPruebasCalibrado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Está el equipo de pruebas eléctricas debidamente calibrado?
              </label>
            </div>
          </div>

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
