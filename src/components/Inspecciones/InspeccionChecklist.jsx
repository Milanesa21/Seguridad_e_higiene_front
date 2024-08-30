import React, { useState } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer} from "../Footer"
import { Navbar } from "../Navbar";

export const ChecklistForm = () => {
  const [checklistData, setChecklistData] = useState({
    // Sección 1: Trabajando en las alturas
    comprobacionesGas: false,
    faltaProteccionBordes: false,
    proteccionBordesInsegura: false,

    // Sección 2: Planta y equipamiento
    plantaEquipoIncorrecto: false,
    operadoresSinLicencia: false,
    faltaInstruccionesSeguras: false,

    // Sección 3: Andamios
    personasSinLicencia: false,
    faltaProtocoloInspeccion: false,
    cargaTrabajoSegura: false,

    // Sección 4: Equipos de elevación
    cargasElevadasObstaculos: false,
    faltaProtocoloInspeccionDiaria: false,
    equipoElevacionInseguro: false,
    operadoresSinLicenciaElevacion: false,

    // Sección 5: Arnés y equipo
    faltaCapacitacion: false,
    faltaProtocoloInspeccionEquipos: false,
    ganchosEquiposIncompatibles: false,

    // Sección 6: Escaleras
    escalerasInseguras: false,
    posicionamientoInseguroEscaleras: false,
    escaleraInadecuada: false,

    // Sección 7: Tareas manuales peligrosas
    controlesRiesgoInadecuados: false,
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN LABORAL</h1>
        <form onSubmit={handleSubmit}>
          {/* Sección 1: Trabajando en las alturas */}
          <div className="mb-4">
            <h2>Sección 1: Trabajando en las alturas</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="comprobacionesGas"
                checked={checklistData.comprobacionesGas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se han realizado todas las comprobaciones de gas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="faltaProteccionBordes"
                checked={checklistData.faltaProteccionBordes}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Falta de protección de bordes?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="proteccionBordesInsegura"
                checked={checklistData.proteccionBordesInsegura}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Protección de bordes insegura o incompleta?
              </label>
            </div>
          </div>

          {/* Sección 2: Planta y equipamiento */}
          <div className="mb-4">
            <h2>Sección 2: Planta y equipamiento</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="plantaEquipoIncorrecto"
                checked={checklistData.plantaEquipoIncorrecto}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Planta / equipo incorrecto para el trabajo? (p. ej., discos abrasivos para cortar)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="operadoresSinLicencia"
                checked={checklistData.operadoresSinLicencia}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Operadores sin licencia?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="faltaInstruccionesSeguras"
                checked={checklistData.faltaInstruccionesSeguras}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Falta de instrucciones de trabajo seguras?
              </label>
            </div>
          </div>

          {/* Sección 3: Andamios */}
          <div className="mb-4">
            <h2>Sección 3: Andamios</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="personasSinLicencia"
                checked={checklistData.personasSinLicencia}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Personas sin licencia erigiendo andamios por encima de 4 m?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="faltaProtocoloInspeccion"
                checked={checklistData.faltaProtocoloInspeccion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Falta de protocolo de inspección para andamios?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="cargaTrabajoSegura"
                checked={checklistData.cargaTrabajoSegura}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se superó la carga de trabajo segura (SWL)? (herramientas, materiales almacenados, número de personas)
              </label>
            </div>
          </div>

          {/* Sección 4: Equipos de elevación */}
          <div className="mb-4">
            <h2>Sección 4: Equipos de elevación</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="cargasElevadasObstaculos"
                checked={checklistData.cargasElevadasObstaculos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Cargas elevadas sobre personas, proximidad a obstáculos ¿líneas de alta tensión?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="faltaProtocoloInspeccionDiaria"
                checked={checklistData.faltaProtocoloInspeccionDiaria}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Falta de protocolo de inspección diaria?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equipoElevacionInseguro"
                checked={checklistData.equipoElevacionInseguro}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Equipo de elevación inseguro o dañado, incluidas cuerdas, eslingas, cadenas, ganchos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="operadoresSinLicenciaElevacion"
                checked={checklistData.operadoresSinLicenciaElevacion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Operadores sin licencia?
              </label>
            </div>
          </div>

          {/* Sección 5: Arnés y equipo */}
          <div className="mb-4">
            <h2>Sección 5: Arnés y equipo</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="faltaCapacitacion"
                checked={checklistData.faltaCapacitacion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Falta o capacitación formal inadecuada para los operadores?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="faltaProtocoloInspeccionEquipos"
                checked={checklistData.faltaProtocoloInspeccionEquipos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Falta de protocolo de inspección para arneses y equipos de protección personal?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="ganchosEquiposIncompatibles"
                checked={checklistData.ganchosEquiposIncompatibles}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Ganchos o equipos incompatibles?
              </label>
            </div>
          </div>

          {/* Sección 6: Escaleras */}
          <div className="mb-4">
            <h2>Sección 6: Escaleras</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="escalerasInseguras"
                checked={checklistData.escalerasInseguras}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Escaleras inseguras o dañadas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="posicionamientoInseguroEscaleras"
                checked={checklistData.posicionamientoInseguroEscaleras}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Posicionamiento inseguro de las escaleras?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="escaleraInadecuada"
                checked={checklistData.escaleraInadecuada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Escalera inadecuada para el trabajo?
              </label>
            </div>
          </div>

          {/* Sección 7: Tareas manuales peligrosas */}
          <div className="mb-4">
            <h2>Sección 7: Tareas manuales peligrosas</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="controlesRiesgoInadecuados"
                checked={checklistData.controlesRiesgoInadecuados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Controles de riesgo inadecuados?
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Enviar</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={printForm}>Imprimir</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};