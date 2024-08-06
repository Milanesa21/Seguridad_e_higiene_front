import React, { useState } from 'react';
import "../Inspecciones/inspeccion.css"

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

  const addResult = () => {
    setInspectionResults([
      ...inspectionResults,
      {
        descripcion: '',
        relacionadoCon: '',
        lugar: '',
        actoCondicion: '',
        evidencia: '',
        altoMedioBajo: '',
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
    <div className="container">
      <h1>REGISTRO DE INSPECCIONES</h1>

      <h2>1. Datos del Empleador Principal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="centroTrabajo">Centro de Trabajo/Proyecto/Contrato:</label>
          <input
            type="text"
            id="centroTrabajo"
            name="centroTrabajo"
            value={employerData.centroTrabajo}
            onChange={handleEmployerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="razonSocial">Razón Social o Denominación:</label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={employerData.razonSocial}
            onChange={handleEmployerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ruc">N° RUC:</label>
          <input
            type="text"
            id="ruc"
            name="ruc"
            value={employerData.ruc}
            onChange={handleEmployerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="domicilio">DOMICILIO:</label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            value={employerData.domicilio}
            onChange={handleEmployerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoActividad">Tipo de Actividad Económica:</label>
          <input
            type="text"
            id="tipoActividad"
            name="tipoActividad"
            value={employerData.tipoActividad}
            onChange={handleEmployerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numTrabajadores">
            N° de Trabajadores en el Centro Laboral:
          </label>
          <input
            type="text"
            id="numTrabajadores"
            name="numTrabajadores"
            value={employerData.numTrabajadores}
            onChange={handleEmployerChange}
          />
        </div>

        <h2>2. Datos de la Inspección</h2>
        <div className="form-group">
          <label htmlFor="empresaInspeccionada">Empresa Inspeccionada:</label>
          <input
            type="text"
            id="empresaInspeccionada"
            name="empresaInspeccionada"
            value={inspectionData.empresaInspeccionada}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={inspectionData.fecha}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={inspectionData.hora}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoInspeccion">Tipo de la Inspección:</label>
          <input
            type="text"
            id="tipoInspeccion"
            name="tipoInspeccion"
            value={inspectionData.tipoInspeccion}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inspeccionadoPor">
            Inspeccionado por. (Nombre y cargo):
          </label>
          <input
            type="text"
            id="inspeccionadoPor"
            name="inspeccionadoPor"
            value={inspectionData.inspeccionadoPor}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firmaInspeccion">Firma:</label>
          <input
            type="text"
            id="firmaInspeccion"
            name="firmaInspeccion"
            value={inspectionData.firmaInspeccion}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="responsableArea">Responsable del área:</label>
          <input
            type="text"
            id="responsableArea"
            name="responsableArea"
            value={inspectionData.responsableArea}
            onChange={handleInspectionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firmaResponsable">Firma:</label>
          <input
            type="text"
            id="firmaResponsable"
            name="firmaResponsable"
            value={inspectionData.firmaResponsable}
            onChange={handleInspectionChange}
          />
        </div>

        <h2>Resultados de la Inspección</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Descripción de Acto/condición Sub-Estándar</th>
              <th>Relacionado con:</th>
              <th>Lugar</th>
              <th>Acto/Condición</th>
              <th>Evidencia de la observación (Opcional)</th>
              <th>Alto/Medio/Bajo</th>
              <th>Acción a implementar (Propuesta)</th>
              <th>Acción implementada</th>
              <th>Responsable</th>
              <th>Fecha Límite</th>
              <th>Fecha Ejecutada</th>
              <th>Evidencia de Levantamiento</th>
              <th>Estado (Abierto/Cerrado)</th>
            </tr>
          </thead>
          <tbody>
            {inspectionResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={result.descripcion}
                    onChange={(e) =>
                      handleResultChange(index, 'descripcion', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.relacionadoCon}
                    onChange={(e) =>
                      handleResultChange(index, 'relacionadoCon', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.lugar}
                    onChange={(e) =>
                      handleResultChange(index, 'lugar', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.actoCondicion}
                    onChange={(e) =>
                      handleResultChange(index, 'actoCondicion', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.evidencia}
                    onChange={(e) =>
                      handleResultChange(index, 'evidencia', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.altoMedioBajo}
                    onChange={(e) =>
                      handleResultChange(index, 'altoMedioBajo', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.accionImplementar}
                    onChange={(e) =>
                      handleResultChange(
                        index,
                        'accionImplementar',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.accionImplementada}
                    onChange={(e) =>
                      handleResultChange(
                        index,
                        'accionImplementada',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.responsable}
                    onChange={(e) =>
                      handleResultChange(index, 'responsable', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={result.fechaLimite}
                    onChange={(e) =>
                      handleResultChange(index, 'fechaLimite', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={result.fechaEjecutada}
                    onChange={(e) =>
                      handleResultChange(
                        index,
                        'fechaEjecutada',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={result.evidenciaLevantamiento}
                    onChange={(e) =>
                      handleResultChange(
                        index,
                        'evidenciaLevantamiento',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
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
        <button type="button" onClick={addResult}>
          Añadir Resultado
        </button>
        <button type="submit">Enviar</button>
        <button type="button" onClick={downloadPDF}>
          Descargar PDF
        </button>
        <button type="button" onClick={printForm}>
          Imprimir
        </button>
      </form>
    </div>
  );
};
