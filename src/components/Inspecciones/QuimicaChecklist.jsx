import React, { useState } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const QuimicoChecklistForm = () => {
  const [checklistData, setChecklistData] = useState({
    // Sección 1: Equipos de protección personal
    usoBataLaboratorio: false,
    usoGafasProteccion: false,
    usoGuantesAdecuados: false,
    usoMascarilla: false,

    // Sección 2: Almacenamiento de productos químicos
    productosEtiquetados: false,
    productosSeguros: false,
    almacenamientoCompatible: false,
    ventilacionAdecuada: false,

    // Sección 3: Procedimientos de manejo de productos químicos
    procedimientosSeguidos: false,
    derramesControlados: false,
    registroProductos: false,
    equipoEmergenciaAccesible: false,

    // Sección 4: Estado del equipo de laboratorio
    campanaFuncionando: false,
    equipoLimpio: false,
    vidrioNoDañado: false,
    equiposCalibrados: false,

    // Sección 5: Eliminación de residuos químicos
    residuosEtiquetados: false,
    residuosAlmacenadosCorrectamente: false,
    residuosEliminadosFrecuentemente: false,
    procedimientosEliminacionCorrectos: false,
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
        <h1 className="mb-4">CHECKLIST DE INSPECCIÓN EN LABORATORIO QUÍMICO</h1>
        <form onSubmit={handleSubmit}>
          {/* Sección 1: Equipos de protección personal */}
          <div className="mb-4">
            <h2>Sección 1: Equipos de protección personal</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoBataLaboratorio"
                checked={checklistData.usoBataLaboratorio}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se utiliza bata de laboratorio en todo momento?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoGafasProteccion"
                checked={checklistData.usoGafasProteccion}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se utilizan gafas de protección al manejar sustancias químicas?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoGuantesAdecuados"
                checked={checklistData.usoGuantesAdecuados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se utilizan guantes adecuados para los productos químicos que se manejan?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="usoMascarilla"
                checked={checklistData.usoMascarilla}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se usa mascarilla si es necesario (para vapores, polvo, etc.)?
              </label>
            </div>
          </div>

          {/* Sección 2: Almacenamiento de productos químicos */}
          <div className="mb-4">
            <h2>Sección 2: Almacenamiento de productos químicos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productosEtiquetados"
                checked={checklistData.productosEtiquetados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están todos los productos químicos etiquetados correctamente?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productosSeguros"
                checked={checklistData.productosSeguros}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están los productos químicos almacenados de manera segura?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="almacenamientoCompatible"
                checked={checklistData.almacenamientoCompatible}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se ha asegurado que los productos químicos incompatibles estén separados?
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
                ¿Está el área de almacenamiento adecuadamente ventilada?
              </label>
            </div>
          </div>

          {/* Sección 3: Procedimientos de manejo de productos químicos */}
          <div className="mb-4">
            <h2>Sección 3: Procedimientos de manejo de productos químicos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="procedimientosSeguidos"
                checked={checklistData.procedimientosSeguidos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se siguen los procedimientos de manejo adecuados para cada producto químico?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="derramesControlados"
                checked={checklistData.derramesControlados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se cuenta con un procedimiento para controlar derrames químicos?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="registroProductos"
                checked={checklistData.registroProductos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se lleva un registro actualizado de los productos químicos utilizados?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equipoEmergenciaAccesible"
                checked={checklistData.equipoEmergenciaAccesible}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿El equipo de emergencia (duchas, lavaojos, extintores) está accesible y funcional?
              </label>
            </div>
          </div>

          {/* Sección 4: Estado del equipo de laboratorio */}
          <div className="mb-4">
            <h2>Sección 4: Estado del equipo de laboratorio</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="campanaFuncionando"
                checked={checklistData.campanaFuncionando}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Está la campana de extracción funcionando correctamente?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="equipoLimpio"
                checked={checklistData.equipoLimpio}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Está el equipo de laboratorio limpio y en buen estado?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="vidrioNoDañado"
                checked={checklistData.vidrioNoDañado}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Está el vidrio de laboratorio (matraces, tubos de ensayo, etc.) libre de daños?
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
                ¿Se ha verificado la calibración de los equipos de laboratorio?
              </label>
            </div>
          </div>

          {/* Sección 5: Eliminación de residuos químicos */}
          <div className="mb-4">
            <h2>Sección 5: Eliminación de residuos químicos</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="residuosEtiquetados"
                checked={checklistData.residuosEtiquetados}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están los residuos químicos correctamente etiquetados?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="residuosAlmacenadosCorrectamente"
                checked={checklistData.residuosAlmacenadosCorrectamente}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Están los residuos químicos almacenados de manera adecuada y segura?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="residuosEliminadosFrecuentemente"
                checked={checklistData.residuosEliminadosFrecuentemente}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se eliminan los residuos químicos con la frecuencia adecuada?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="procedimientosEliminacionCorrectos"
                checked={checklistData.procedimientosEliminacionCorrectos}
                onChange={handleChange}
              />
              <label className="form-check-label">
                ¿Se siguen los procedimientos correctos para la eliminación de residuos?
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
