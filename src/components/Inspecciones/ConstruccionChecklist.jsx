import React, { useState } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const ConstruccionChecklistForm = () => {
  const [checklistData, setChecklistData] = useState({
    // Sección 1: Seguridad en el sitio de construcción
    accesoControlado: false,
    senalizacionAdecuada: false,
    pasillosDespejados: false,
    equiposEmergenciaDisponibles: false,

    // Sección 2: Uso de equipo de protección personal (EPP)
    cascoSeguridad: false,
    gafasProtectoras: false,
    chalecoReflectante: false,
    calzadoSeguridad: false,
    guantesTrabajo: false,

    // Sección 3: Maquinaria y herramientas
    maquinariaInspeccionada: false,
    herramientasAdecuadas: false,
    equiposCalibrados: false,
    mantenimientoRealizado: false,

    // Sección 4: Procedimientos de trabajo en altura
    lineasVidaInstaladas: false,
    arnesesVerificados: false,
    barandasProteccion: false,
    sistemasPrevencionCaidas: false,

    // Sección 5: Manejo de materiales peligrosos
    almacenamientoAdecuado: false,
    etiquetasCorrectas: false,
    equipoManipulacionDisponible: false,
    ventilacionAdecuada: false,
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN EN CONSTRUCCIÓN</h1>
        <form onSubmit={handleSubmit}>
          {/* Sección 1: Seguridad en el sitio de construcción */}
          <div className="mb-4">
            <h2>Sección 1: Seguridad en el sitio de construcción</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="accesoControlado"
                checked={checklistData.accesoControlado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El acceso al sitio de construcción está controlado para prevenir el ingreso no autorizado?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="senalizacionAdecuada"
                checked={checklistData.senalizacionAdecuada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿La señalización de seguridad está claramente visible y colocada en zonas críticas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="pasillosDespejados"
                checked={checklistData.pasillosDespejados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Los pasillos y áreas de trabajo están despejados de obstáculos y peligros?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equiposEmergenciaDisponibles"
                checked={checklistData.equiposEmergenciaDisponibles}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están disponibles los equipos de emergencia (extintores, primeros auxilios) en el sitio?
              </label>
            </div>
          </div>

          {/* Sección 2: Uso de equipo de protección personal (EPP) */}
          <div className="mb-4">
            <h2>Sección 2: Uso de equipo de protección personal (EPP)</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="cascoSeguridad"
                checked={checklistData.cascoSeguridad}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Todo el personal lleva casco de seguridad?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gafasProtectoras"
                checked={checklistData.gafasProtectoras}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se utilizan gafas de protección adecuadas cuando se trabaja con materiales peligrosos o herramientas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="chalecoReflectante"
                checked={checklistData.chalecoReflectante}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El personal usa chalecos reflectantes en todo momento?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="calzadoSeguridad"
                checked={checklistData.calzadoSeguridad}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se lleva calzado de seguridad adecuado en el sitio de construcción?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="guantesTrabajo"
                checked={checklistData.guantesTrabajo}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El personal usa guantes de trabajo adecuados para las tareas específicas?
              </label>
            </div>
          </div>

          {/* Sección 3: Maquinaria y herramientas */}
          <div className="mb-4">
            <h2>Sección 3: Maquinaria y herramientas</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="maquinariaInspeccionada"
                checked={checklistData.maquinariaInspeccionada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Toda la maquinaria ha sido inspeccionada antes de su uso?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="herramientasAdecuadas"
                checked={checklistData.herramientasAdecuadas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Las herramientas utilizadas son adecuadas para las tareas y están en buen estado?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equiposCalibrados"
                checked={checklistData.equiposCalibrados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Los equipos de medición y maquinaria están correctamente calibrados?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="mantenimientoRealizado"
                checked={checklistData.mantenimientoRealizado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se ha realizado el mantenimiento preventivo a la maquinaria?
              </label>
            </div>
          </div>

          {/* Sección 4: Procedimientos de trabajo en altura */}
          <div className="mb-4">
            <h2>Sección 4: Procedimientos de trabajo en altura</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="lineasVidaInstaladas"
                checked={checklistData.lineasVidaInstaladas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se han instalado líneas de vida para trabajos en altura?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="arnesesVerificados"
                checked={checklistData.arnesesVerificados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se han verificado los arneses de seguridad antes de su uso?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="barandasProteccion"
                checked={checklistData.barandasProteccion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se han instalado barandas de protección en las áreas elevadas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="sistemasPrevencionCaidas"
                checked={checklistData.sistemasPrevencionCaidas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están implementados los sistemas de prevención de caídas?
              </label>
            </div>
          </div>

          {/* Sección 5: Manejo de materiales peligrosos */}
          <div className="mb-4">
            <h2>Sección 5: Manejo de materiales peligrosos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="almacenamientoAdecuado"
                checked={checklistData.almacenamientoAdecuado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se realiza el almacenamiento adecuado de los materiales peligrosos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="etiquetasCorrectas"
                checked={checklistData.etiquetasCorrectas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Los contenedores de materiales peligrosos están debidamente etiquetados?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equipoManipulacionDisponible"
                checked={checklistData.equipoManipulacionDisponible}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Está disponible el equipo adecuado para la manipulación segura de materiales peligrosos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="ventilacionAdecuada"
                checked={checklistData.ventilacionAdecuada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El área de trabajo tiene ventilación adecuada para evitar la exposición a vapores peligrosos?
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
