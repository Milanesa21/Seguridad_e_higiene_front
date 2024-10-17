import React, { useState } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const AgropecuarioChecklistForm = () => {
  const [checklistData, setChecklistData] = useState({
    // Sección 1: Manejo de cultivos
    riegoAdecuado: false,
    controlPlagas: false,
    fertilizacionAdecuada: false,
    herramientasLimpias: false,

    // Sección 2: Manejo de animales
    saludAnimal: false,
    alimentacionAdecuada: false,
    aguaSuficiente: false,
    instalacionesLimpias: false,

    // Sección 3: Seguridad en la explotación agropecuaria
    usoEquipoProteccion: false,
    maquinariaEnBuenEstado: false,
    procedimientosEmergencia: false,
    productosQuimicosAlmacenados: false,

    // Sección 4: Mantenimiento de maquinaria y equipos
    maquinariaMantenida: false,
    equiposCalibrados: false,
    herramientasAdecuadas: false,
    equipoSeguridadDisponible: false,

    // Sección 5: Procedimientos de sostenibilidad
    gestionResiduos: false,
    practicasSostenibles: false,
    usoAdecuadoAgua: false,
    energiaRenovable: false,
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN AGROPECUARIA</h1>
        <form onSubmit={handleSubmit}>
          {/* Sección 1: Manejo de cultivos */}
          <div className="mb-4">
            <h2>Sección 1: Manejo de cultivos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="riegoAdecuado"
                checked={checklistData.riegoAdecuado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El riego se realiza de manera adecuada según las necesidades del cultivo?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="controlPlagas"
                checked={checklistData.controlPlagas}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se está aplicando un control de plagas efectivo y seguro?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="fertilizacionAdecuada"
                checked={checklistData.fertilizacionAdecuada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se está aplicando la fertilización de manera adecuada y responsable?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="herramientasLimpias"
                checked={checklistData.herramientasLimpias}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Las herramientas de trabajo están limpias y en buen estado?
              </label>
            </div>
          </div>

          {/* Sección 2: Manejo de animales */}
          <div className="mb-4">
            <h2>Sección 2: Manejo de animales</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="saludAnimal"
                checked={checklistData.saludAnimal}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Los animales están en buen estado de salud (vacunas, control veterinario)?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="alimentacionAdecuada"
                checked={checklistData.alimentacionAdecuada}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se está proporcionando una alimentación adecuada y balanceada a los animales?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="aguaSuficiente"
                checked={checklistData.aguaSuficiente}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Los animales tienen acceso a agua suficiente y de calidad?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="instalacionesLimpias"
                checked={checklistData.instalacionesLimpias}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Las instalaciones donde están los animales están limpias y en buen estado?
              </label>
            </div>
          </div>

          {/* Sección 3: Seguridad en la explotación agropecuaria */}
          <div className="mb-4">
            <h2>Sección 3: Seguridad en la explotación agropecuaria</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoEquipoProteccion"
                checked={checklistData.usoEquipoProteccion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El personal usa equipo de protección adecuado (botas, guantes, casco)?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="maquinariaEnBuenEstado"
                checked={checklistData.maquinariaEnBuenEstado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿La maquinaria agrícola está en buen estado y correctamente mantenida?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="procedimientosEmergencia"
                checked={checklistData.procedimientosEmergencia}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se conocen y siguen los procedimientos de emergencia en caso de accidentes?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productosQuimicosAlmacenados"
                checked={checklistData.productosQuimicosAlmacenados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están los productos químicos (fertilizantes, pesticidas) correctamente almacenados?
              </label>
            </div>
          </div>

          {/* Sección 4: Mantenimiento de maquinaria y equipos */}
          <div className="mb-4">
            <h2>Sección 4: Mantenimiento de maquinaria y equipos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="maquinariaMantenida"
                checked={checklistData.maquinariaMantenida}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿La maquinaria agrícola ha sido mantenida y revisada regularmente?
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
                ¿Los equipos de medición y aplicación (por ejemplo, pulverizadores) están calibrados?
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
                ¿Las herramientas y maquinaria son adecuadas para las tareas agrícolas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equipoSeguridadDisponible"
                checked={checklistData.equipoSeguridadDisponible}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El equipo de seguridad (extintores, kits de primeros auxilios) está disponible?
              </label>
            </div>
          </div>

          {/* Sección 5: Procedimientos de sostenibilidad */}
          <div className="mb-4">
            <h2>Sección 5: Procedimientos de sostenibilidad</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gestionResiduos"
                checked={checklistData.gestionResiduos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se realiza una adecuada gestión de residuos agrícolas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="practicasSostenibles"
                checked={checklistData.practicasSostenibles}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se implementan prácticas agrícolas sostenibles?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoAdecuadoAgua"
                checked={checklistData.usoAdecuadoAgua}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se hace un uso adecuado y eficiente del agua en las actividades agrícolas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="energiaRenovable"
                checked={checklistData.energiaRenovable}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se emplea energía renovable o técnicas de ahorro energético en la explotación?
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
