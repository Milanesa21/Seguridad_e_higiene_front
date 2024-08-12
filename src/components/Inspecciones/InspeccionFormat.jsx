import React, { useState } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";

export const InspectionForm = () => {
  const [employerData, setEmployerData] = useState({
    centroTrabajo: "",
    razonSocial: "",
    ruc: "",
    domicilio: "",
    tipoActividad: "",
    numTrabajadores: "",
  });

  const [inspectionData, setInspectionData] = useState({
    empresaInspeccionada: "",
    fecha: "",
    hora: "",
    tipoInspeccion: "",
    inspeccionadoPor: "",
    firmaInspeccion: "",
    responsableArea: "",
    firmaResponsable: "",
  });

  const [inspectionResults, setInspectionResults] = useState([]);

  const handleEmployerChange = (e) => {
    setEmployerData({
      ...employerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInspectionChange = (e) => {
    setInspectionData({
      ...inspectionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResultChange = (index, field, value) => {
    const updatedResults = [...inspectionResults];
    updatedResults[index][field] = value;
    setInspectionResults(updatedResults);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedResults = [...inspectionResults];
        updatedResults[index].evidencia = reader.result;
        setInspectionResults(updatedResults);
      };
      reader.readAsDataURL(file);
    }
  };

  const addResult = () => {
    setInspectionResults([
      ...inspectionResults,
      {
        descripcion: "",
        relacionadoCon: "",
        lugar: "",
        actoCondicion: "",
        evidencia: "",
        altoMedioBajo: "",
        accionImplementar: "",
        accionImplementada: "",
        responsable: "",
        fechaLimite: "",
        fechaEjecutada: "",
        evidenciaLevantamiento: "",
        estado: "",
      },
    ]);
  };

  const getColor = (nivel) => {
    switch (nivel) {
      case "alto":
        return "red";
      case "medio":
        return "yellow";
      case "bajo":
        return "green";
      default:
        return "white"; // Color por defecto si no se reconoce el nivel
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employer Data:", employerData);
    console.log("Inspection Data:", inspectionData);
    console.log("Inspection Results:", inspectionResults);
  };

  const printForm = () => {
    window.print();
  };

  return (
    <div>
      <div className="form-container">
        <h1 className="form-title">REGISTRO DE INSPECCIONES</h1>

        <h2 className="section-title">1. Datos del Empleador Principal</h2>
        <form className="inspection-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="centroTrabajo">
              Centro de Trabajo/Proyecto/Contrato:
            </label>
            <input
              className="form-input"
              type="text"
              id="centroTrabajo"
              name="centroTrabajo"
              value={employerData.centroTrabajo}
              onChange={handleEmployerChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="razonSocial">
              Razón Social o Denominación:
            </label>
            <input
              className="form-input"
              type="text"
              id="razonSocial"
              name="razonSocial"
              value={employerData.razonSocial}
              onChange={handleEmployerChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="ruc">
              DNI:
            </label>
            <input
              className="form-input"
              type="text"
              id="ruc"
              name="ruc"
              value={employerData.ruc}
              onChange={handleEmployerChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="domicilio">
              DOMICILIO:
            </label>
            <input
              className="form-input"
              type="text"
              id="domicilio"
              name="domicilio"
              value={employerData.domicilio}
              onChange={handleEmployerChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="tipoActividad">
              Tipo de Actividad Económica:
            </label>
            <input
              className="form-input"
              type="text"
              id="tipoActividad"
              name="tipoActividad"
              value={employerData.tipoActividad}
              onChange={handleEmployerChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="numTrabajadores">
              N° de Trabajadores en el Centro Laboral:
            </label>
            <input
              className="form-input"
              type="text"
              id="numTrabajadores"
              name="numTrabajadores"
              value={employerData.numTrabajadores}
              onChange={handleEmployerChange}
            />
          </div>

          <h2 className="section-title">2. Datos de la Inspección</h2>
          <div className="form-group">
            <label className="form-label" htmlFor="empresaInspeccionada">
              Empresa Inspeccionada:
            </label>
            <input
              className="form-input"
              type="text"
              id="empresaInspeccionada"
              name="empresaInspeccionada"
              value={inspectionData.empresaInspeccionada}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fecha">
              Fecha:
            </label>
            <input
              className="form-input"
              type="date"
              id="fecha"
              name="fecha"
              value={inspectionData.fecha}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="hora">
              Hora:
            </label>
            <input
              className="form-input"
              type="time"
              id="hora"
              name="hora"
              value={inspectionData.hora}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="tipoInspeccion">
              Tipo de Inspección:
            </label>
            <input
              className="form-input"
              type="text"
              id="tipoInspeccion"
              name="tipoInspeccion"
              value={inspectionData.tipoInspeccion}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="inspeccionadoPor">
              Inspeccionado Por:
            </label>
            <input
              className="form-input"
              type="text"
              id="inspeccionadoPor"
              name="inspeccionadoPor"
              value={inspectionData.inspeccionadoPor}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="firmaInspeccion">
              Firma de Inspección:
            </label>
            <input
              className="form-input"
              type="text"
              id="firmaInspeccion"
              name="firmaInspeccion"
              value={inspectionData.firmaInspeccion}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="responsableArea">
              Responsable del Área:
            </label>
            <input
              className="form-input"
              type="text"
              id="responsableArea"
              name="responsableArea"
              value={inspectionData.responsableArea}
              onChange={handleInspectionChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="firmaResponsable">
              Firma Responsable:
            </label>
            <input
              className="form-input"
              type="text"
              id="firmaResponsable"
              name="firmaResponsable"
              value={inspectionData.firmaResponsable}
              onChange={handleInspectionChange}
            />
          </div>

          <h2 className="section-title">3. Resultados de la Inspección</h2>
          {inspectionResults.map((result, index) => (
            <div key={index} className="result-group">
              <h3 className="result-title">Resultado {index + 1}</h3>
              <div className="form-group">
                <label className="form-label" htmlFor={`descripcion-${index}`}>
                  Descripción del Hecho, Acto o Condición Subestandar:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`descripcion-${index}`}
                  name="descripcion"
                  value={result.descripcion}
                  onChange={(e) =>
                    handleResultChange(index, "descripcion", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`relacionadoCon-${index}`}
                >
                  Relacionado con:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`relacionadoCon-${index}`}
                  name="relacionadoCon"
                  value={result.relacionadoCon}
                  onChange={(e) =>
                    handleResultChange(index, "relacionadoCon", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={`lugar-${index}`}>
                  Lugar:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`lugar-${index}`}
                  name="lugar"
                  value={result.lugar}
                  onChange={(e) =>
                    handleResultChange(index, "lugar", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`actoCondicion-${index}`}
                >
                  Acto o Condición Subestándar:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`actoCondicion-${index}`}
                  name="actoCondicion"
                  value={result.actoCondicion}
                  onChange={(e) =>
                    handleResultChange(index, "actoCondicion", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={`evidencia-${index}`}>
                  Evidencia:
                </label>
                <input
                  className="form-input"
                  type="file"
                  id={`evidencia-${index}`}
                  name="evidencia"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {result.evidencia && (
                  <img src={result.evidencia} alt={`Evidencia ${index + 1}`} />
                )}
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`altoMedioBajo-${index}`}
                >
                  Prioridad (Alto, Medio, Bajo):
                </label>
                <select
                  className="form-input"
                  id={`altoMedioBajo-${index}`}
                  name="altoMedioBajo"
                  value={result.altoMedioBajo}
                  onChange={(e) =>
                    handleResultChange(index, "altoMedioBajo", e.target.value)
                  }
                >
                  <option value="bajo">Bajo</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                </select>
                <div
                  className="indicador"
                  style={{ backgroundColor: getColor(result.altoMedioBajo) }}
                >
                  {result.altoMedioBajo.charAt(0).toUpperCase() +
                    result.altoMedioBajo.slice(1)}
                </div>
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`accionImplementar-${index}`}
                >
                  Acción a Implementar:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`accionImplementar-${index}`}
                  name="accionImplementar"
                  value={result.accionImplementar}
                  onChange={(e) =>
                    handleResultChange(
                      index,
                      "accionImplementar",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`accionImplementada-${index}`}
                >
                  Acción Implementada:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`accionImplementada-${index}`}
                  name="accionImplementada"
                  value={result.accionImplementada}
                  onChange={(e) =>
                    handleResultChange(
                      index,
                      "accionImplementada",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={`responsable-${index}`}>
                  Responsable:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`responsable-${index}`}
                  name="responsable"
                  value={result.responsable}
                  onChange={(e) =>
                    handleResultChange(index, "responsable", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={`fechaLimite-${index}`}>
                  Fecha Límite:
                </label>
                <input
                  className="form-input"
                  type="date"
                  id={`fechaLimite-${index}`}
                  name="fechaLimite"
                  value={result.fechaLimite}
                  onChange={(e) =>
                    handleResultChange(index, "fechaLimite", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`fechaEjecutada-${index}`}
                >
                  Fecha Ejecutada:
                </label>
                <input
                  className="form-input"
                  type="date"
                  id={`fechaEjecutada-${index}`}
                  name="fechaEjecutada"
                  value={result.fechaEjecutada}
                  onChange={(e) =>
                    handleResultChange(index, "fechaEjecutada", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor={`evidenciaLevantamiento-${index}`}
                >
                  Evidencia de Levantamiento:
                </label>
                <input
                  className="form-input"
                  type="file"
                  id={`evidenciaLevantamiento-${index}`}
                  name="evidenciaLevantamiento"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {result.evidenciaLevantamiento && (
                  <img
                    src={result.evidenciaLevantamiento}
                    alt={`Evidencia de Levantamiento ${index + 1}`}
                  />
                )}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={`estado-${index}`}>
                  Estado:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id={`estado-${index}`}
                  name="estado"
                  value={result.estado}
                  onChange={(e) =>
                    handleResultChange(index, "estado", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <div className="button-group">
            <button type="button" className="form-button" onClick={addResult}>
              Añadir Resultado
            </button>
            <button type="submit" className="form-button">
              Enviar
            </button>
            <button type="button" className="form-button" onClick={printForm}>
              Imprimir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
