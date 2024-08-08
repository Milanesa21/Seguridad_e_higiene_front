import React, { useState } from 'react';
import "../Inspecciones/Inspeccion.css"

export const InspectionForm = () => {
  const [employerData, setEmployerData] = useState({
    centroTrabajo: '',
    razonSocial: '',
    ruc: '',
    domicilio: '',
    tipoActividad: '',
    numTrabajadores: '',
  });

  const [inspectionData, setInspectionData] = useState({
    empresaInspeccionada: '',
    fecha: '',
    hora: '',
    tipoInspeccion: '',
    inspeccionadoPor: '',
    firmaInspeccion: '',
    responsableArea: '',
    firmaResponsable: '',
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
        descripcion: '',
        relacionadoCon: '',
        lugar: '',
        actoCondicion: '',
        evidencia: '',
        altoMedioBajo: '', // Cambiado a cadena vacía para opciones de select
        accionImplementar: '',
        accionImplementada: '',
        responsable: '',
        fechaLimite: '',
        fechaEjecutada: '',
        evidenciaLevantamiento: '',
        estado: '',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employer Data:', employerData);
    console.log('Inspection Data:', inspectionData);
    console.log('Inspection Results:', inspectionResults);
  };

  const downloadPDF = () => {
    console.log('Download PDF functionality not implemented yet.');
  };

  const printForm = () => {
    console.log('Print functionality not implemented yet.');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">REGISTRO DE INSPECCIONES</h1>

      <h2 className="section-title">1. Datos del Empleador Principal</h2>
      <form className="inspection-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="centroTrabajo">Centro de Trabajo/Proyecto/Contrato:</label>
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
          <label className="form-label" htmlFor="razonSocial">Razón Social o Denominación:</label>
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
          <label className="form-label" htmlFor="ruc">DNI:</label>
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
          <label className="form-label" htmlFor="domicilio">DOMICILIO:</label>
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
          <label className="form-label" htmlFor="tipoActividad">Tipo de Actividad Económica:</label>
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
          <label className="form-label" htmlFor="empresaInspeccionada">Empresa Inspeccionada:</label>
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
          <label className="form-label" htmlFor="fecha">Fecha:</label>
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
          <label className="form-label" htmlFor="hora">Hora:</label>
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
          <label className="form-label" htmlFor="tipoInspeccion">Tipo de la Inspección:</label>
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
            Inspeccionado por. (Nombre y cargo):
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
          <label className="form-label" htmlFor="firmaInspeccion">Firma:</label>
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
          <label className="form-label" htmlFor="responsableArea">Responsable del área:</label>
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
          <label className="form-label" htmlFor="firmaResponsable">Firma:</label>
          <input
            className="form-input"
            type="text"
            id="firmaResponsable"
            name="firmaResponsable"
            value={inspectionData.firmaResponsable}
            onChange={handleInspectionChange}
          />
        </div>

        <h2 className="section-title">Resultados de la Inspección</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th className="table-header">N°</th>
              <th className="table-header">Descripción de Acto/condición Sub-Estándar</th>
              <th className="table-header">Relacionado con:</th>
              <th className="table-header">Lugar</th>
              <th className="table-header">Acto/Condición</th>
              <th className="table-header">Evidencia de la observación (Opcional)</th>
              <th className="table-header">Alto/Medio/Bajo</th>
              <th className="table-header">Acción a implementar (Propuesta)</th>
              <th className="table-header">Acción implementada</th>
              <th className="table-header">Responsable</th>
              <th className="table-header">Fecha Límite</th>
              <th className="table-header">Fecha Ejecutada</th>
              <th className="table-header">Evidencia de Levantamiento</th>
              <th className="table-header">Estado (Abierto/Cerrado)</th>
            </tr>
          </thead>
          <tbody>
            {inspectionResults.map((result, index) => (
              <tr key={index}>
                <td className="table-data">{index + 1}</td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.descripcion}
                    onChange={(e) =>
                      handleResultChange(index, 'descripcion', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.relacionadoCon}
                    onChange={(e) =>
                      handleResultChange(index, 'relacionadoCon', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.lugar}
                    onChange={(e) =>
                      handleResultChange(index, 'lugar', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.actoCondicion}
                    onChange={(e) =>
                      handleResultChange(index, 'actoCondicion', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e)}
                  />
                  {result.evidencia && (
                    <img
                      className="evidence-image"
                      src={result.evidencia}
                      alt={`Evidencia ${index + 1}`}
                    />
                  )}
                </td>
                <td className="table-data">
                  <select
                    className="table-select"
                    value={result.altoMedioBajo}
                    onChange={(e) =>
                      handleResultChange(index, 'altoMedioBajo', e.target.value)
                    }
                  >
                    <option value="">Seleccione nivel</option>
                    <option value="Alto">Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Bajo">Bajo</option>
                  </select>
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.accionImplementar}
                    onChange={(e) =>
                      handleResultChange(index, 'accionImplementar', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.accionImplementada}
                    onChange={(e) =>
                      handleResultChange(index, 'accionImplementada', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.responsable}
                    onChange={(e) =>
                      handleResultChange(index, 'responsable', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="date"
                    value={result.fechaLimite}
                    onChange={(e) =>
                      handleResultChange(index, 'fechaLimite', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="date"
                    value={result.fechaEjecutada}
                    onChange={(e) =>
                      handleResultChange(index, 'fechaEjecutada', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.evidenciaLevantamiento}
                    onChange={(e) =>
                      handleResultChange(index, 'evidenciaLevantamiento', e.target.value)
                    }
                  />
                </td>
                <td className="table-data">
                  <input
                    className="table-input"
                    type="text"
                    value={result.estado}
                    onChange={(e) =>
                      handleResultChange(index, 'estado', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-group">
          <button type="button" className="form-button" onClick={addResult}>
            Añadir Resultado
          </button>
          <button type="submit" className="form-button">Enviar</button>
          <button type="button" className="form-button" onClick={downloadPDF}>
            Descargar PDF
          </button>
          <button type="button" className="form-button" onClick={printForm}>
            Imprimir
          </button>
        </div>
      </form>
    </div>
  );
};
