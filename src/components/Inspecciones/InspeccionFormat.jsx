import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const InspectionForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    inspectionDate: '',
    inspector: '',
    responsible: '',
    sections: {
      machining: {
        equipmentCondition: '',
        cleanliness: '',
        personalProtection: '',
        observations: ''
      },
      foundry: {
        equipmentCondition: '',
        cleanliness: '',
        personalProtection: '',
        observations: ''
      },
      warehouse: {
        storageCondition: '',
        fireSafety: '',
        observations: ''
      },
      welding: {
        equipmentCondition: '',
        personalProtection: '',
        observations: ''
      },
      office: {
        generalConditions: '',
        observations: ''
      }
    },
    generalRecommendations: ''
  });

  const handleChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      sections: {
        ...prevData.sections,
        [section]: {
          ...prevData.sections[section],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generatePDF();
  };

  const generatePDF = () => {
    const input = document.getElementById('inspection-form');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth - 20;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save("inspeccion_seguridad.pdf");
      });
  };

  // Estilo común para los inputs y textareas de las inspecciones
  const inspectionStyle = {
    width: '100%',       // Ancho 100% para expandirse dinámicamente
    minHeight: '30px',   // Altura mínima para evitar que se haga muy pequeño
    margin: '5px 0',     // Margen superior e inferior para separación
    padding: '5px',      // Espaciado interno para mejorar la apariencia
    fontSize: 'inherit', // Tamaño de fuente heredado para consistencia
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Inspección de Seguridad</h1>
      </header>
      <form id="inspection-form" onSubmit={handleSubmit} style={{ margin: '20px', maxWidth: '800px' }}>
        <div>
          <label>Nombre de la Empresa:</label>
          <input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} style={inspectionStyle} />
        </div>
        <div>
          <label>Ubicación:</label>
          <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={inspectionStyle} />
        </div>
        <div>
          <label>Fecha de la Inspección:</label>
          <input type="date" value={formData.inspectionDate} onChange={(e) => setFormData({...formData, inspectionDate: e.target.value})} style={inspectionStyle} />
        </div>
        <div>
          <label>Inspector:</label>
          <input type="text" value={formData.inspector} onChange={(e) => setFormData({...formData, inspector: e.target.value})} style={inspectionStyle} />
        </div>
        <div>
          <label>Responsable de Seguridad:</label>
          <input type="text" value={formData.responsible} onChange={(e) => setFormData({...formData, responsible: e.target.value})} style={inspectionStyle} />
        </div>

        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline', marginTop: '20px' }}>Taller de Maquinado</h3>
        <div>
          <label>Condiciones del Equipamiento:</label>
          <input type="text" value={formData.sections.machining.equipmentCondition} onChange={(e) => handleChange('machining', 'equipmentCondition', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Orden y Limpieza:</label>
          <input type="text" value={formData.sections.machining.cleanliness} onChange={(e) => handleChange('machining', 'cleanliness', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Protección Personal:</label>
          <input type="text" value={formData.sections.machining.personalProtection} onChange={(e) => handleChange('machining', 'personalProtection', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea value={formData.sections.machining.observations} onChange={(e) => handleChange('machining', 'observations', e.target.value)} style={inspectionStyle} />
        </div>

        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Área de Fundición</h3>
        <div>
          <label>Condiciones del Equipamiento:</label>
          <input type="text" value={formData.sections.foundry.equipmentCondition} onChange={(e) => handleChange('foundry', 'equipmentCondition', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Orden y Limpieza:</label>
          <input type="text" value={formData.sections.foundry.cleanliness} onChange={(e) => handleChange('foundry', 'cleanliness', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Protección Personal:</label>
          <input type="text" value={formData.sections.foundry.personalProtection} onChange={(e) => handleChange('foundry', 'personalProtection', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea value={formData.sections.foundry.observations} onChange={(e) => handleChange('foundry', 'observations', e.target.value)} style={inspectionStyle} />
        </div>

        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Almacén de Materias Primas</h3>
        <div>
          <label>Condiciones de Almacenamiento:</label>
          <input type="text" value={formData.sections.warehouse.storageCondition} onChange={(e) => handleChange('warehouse', 'storageCondition', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Seguridad contra Incendios:</label>
          <input type="text" value={formData.sections.warehouse.fireSafety} onChange={(e) => handleChange('warehouse', 'fireSafety', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea value={formData.sections.warehouse.observations} onChange={(e) => handleChange('warehouse', 'observations', e.target.value)} style={inspectionStyle} />
        </div>

        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Zona de Soldadura</h3>
        <div>
          <label>Condiciones del Equipamiento:</label>
          <input type="text" value={formData.sections.welding.equipmentCondition} onChange={(e) => handleChange('welding', 'equipmentCondition', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Protección Personal:</label>
          <input type="text" value={formData.sections.welding.personalProtection} onChange={(e) => handleChange('welding', 'personalProtection', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea value={formData.sections.welding.observations} onChange={(e) => handleChange('welding', 'observations', e.target.value)} style={inspectionStyle} />
        </div>

        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Oficina Administrativa</h3>
        <div>
          <label>Condiciones Generales:</label>
          <input type="text" value={formData.sections.office.generalConditions} onChange={(e) => handleChange('office', 'generalConditions', e.target.value)} style={inspectionStyle} />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea value={formData.sections.office.observations} onChange={(e) => handleChange('office', 'observations', e.target.value)} style={inspectionStyle} />
        </div>

        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Recomendaciones Generales</h3>
        <div>
          <textarea value={formData.generalRecommendations} onChange={(e) => setFormData({...formData, generalRecommendations: e.target.value})} style={{ ...inspectionStyle, minWidth: '400px' }} />
        </div>

        <button type="submit">Enviar</button>
        <button type="button" onClick={generatePDF}>Descargar PDF</button>
        <button type="button" onClick={() => window.print()}>Imprimir</button>
      </form>
    </div>
  );
};

