import React, { useState, useEffect, useRef } from 'react';
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

  // Refs para acceder a los elementos dinámicamente
  const inputRefs = {
    companyName: useRef(null),
    location: useRef(null),
    inspectionDate: useRef(null),
    inspector: useRef(null),
    responsible: useRef(null),
    machining: {
      equipmentCondition: useRef(null),
      cleanliness: useRef(null),
      personalProtection: useRef(null),
      observations: useRef(null)
    },
    foundry: {
      equipmentCondition: useRef(null),
      cleanliness: useRef(null),
      personalProtection: useRef(null),
      observations: useRef(null)
    }, 
    warehouse: {
      storageCondition: useRef(null),
      fireSafety: useRef(null),
      observations: useRef(null)
    },
    welding: {
      equipmentCondition: useRef(null),
      personalProtection: useRef(null),
      observations: useRef(null)
    },
    office: {
      generalConditions: useRef(null),
      observations: useRef(null)
    },
    generalRecommendations: useRef(null)
  };

  // Efecto para ajustar la altura del textarea según el contenido
  useEffect(() => {
    const handleKeyUp = (e, refName) => {
      const { current } = inputRefs[refName];
      if (current) {
        current.style.height = "30px"; // Altura inicial mínima
        const scrollHeight = current.scrollHeight;
        current.style.height = `${scrollHeight}px`;
      }
    };

    // Agregar event listener para cada input y textarea
    const addEventListeners = (ref, refName) => {
      if (ref.current) {
        ref.current.addEventListener('keyup', (e) => handleKeyUp(e, refName));
      }
    };

    // Recorrer inputRefs para agregar event listeners
    Object.keys(inputRefs).forEach(refName => {
      const ref = inputRefs[refName];
      if (typeof ref === 'object') {
        Object.keys(ref).forEach(subRefName => {
          addEventListeners(ref[subRefName], subRefName);
        });
      } else {
        addEventListeners(ref, refName);
      }
    });

    // Limpiar event listeners al desmontar el componente
    return () => {
      Object.keys(inputRefs).forEach(refName => {
        const ref = inputRefs[refName];
        if (typeof ref === 'object') {
          Object.keys(ref).forEach(subRefName => {
            if (ref[subRefName].current) {
              ref[subRefName].current.removeEventListener('keyup', (e) => handleKeyUp(e, subRefName));
            }
          });
        } else {
          if (ref.current) {
            ref.current.removeEventListener('keyup', (e) => handleKeyUp(e, refName));
          }
        }
      });
    };
  }, [inputRefs]);

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

  // Estilo común para inputs y textareas
  const inputStyle = {
    resize: 'vertical',
    minHeight: '30px',
    padding: '5px',
    width: '100%',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Inspección de Seguridad</h1>
      </header>
      <form id="inspection-form" onSubmit={handleSubmit} style={{ margin: '20px', maxWidth: '800px' }}>
      <div>
  <label>Nombre de la Empresa:</label>
  <textarea 
    value={formData.companyName} 
    onChange={(e) => setFormData({...formData, companyName: e.target.value})} 
    ref={inputRefs.companyName} 
    style={{ ...inputStyle, minHeight: '30px' }} 
  />
</div>
<div>
  <label>Ubicación:</label>
  <textarea 
    value={formData.location} 
    onChange={(e) => setFormData({...formData, location: e.target.value})} 
    ref={inputRefs.location} 
    style={{ ...inputStyle, minHeight: '30px' }} 
  />
</div>
<div>
  <label>Fecha de la Inspección:</label>
  <textarea 
    value={formData.inspectionDate} 
    onChange={(e) => setFormData({...formData, inspectionDate: e.target.value})} 
    ref={inputRefs.inspectionDate} 
    style={{ ...inputStyle, minHeight: '30px' }} 
  />
</div>
<div>
  <label>Inspector:</label>
  <textarea 
    value={formData.inspector} 
    onChange={(e) => setFormData({...formData, inspector: e.target.value})} 
    ref={inputRefs.inspector} 
    style={{ ...inputStyle, minHeight: '30px' }} 
  />
</div>
<div>
  <label>Responsable de Seguridad:</label>
  <textarea 
    value={formData.responsible} 
    onChange={(e) => setFormData({...formData, responsible: e.target.value})} 
    ref={inputRefs.responsible} 
    style={{ ...inputStyle, minHeight: '30px' }} 
  />
</div>

<h3 style={{ fontWeight: 'bold', textDecoration: 'underline', marginTop: '20px' }}>Taller de Maquinado</h3>
<div>
  <label>Condiciones del Equipamiento:</label>
  <textarea 
    value={formData.sections.machining.equipmentCondition} 
    onChange={(e) => handleChange('machining', 'equipmentCondition', e.target.value)} 
    ref={inputRefs.machining.equipmentCondition} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Orden y Limpieza:</label>
  <textarea 
    value={formData.sections.machining.cleanliness} 
    onChange={(e) => handleChange('machining', 'cleanliness', e.target.value)} 
    ref={inputRefs.machining.cleanliness} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Protección Personal:</label>
  <textarea 
    value={formData.sections.machining.personalProtection} 
    onChange={(e) => handleChange('machining', 'personalProtection', e.target.value)} 
    ref={inputRefs.machining.personalProtection} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Observaciones:</label>
  <textarea 
    value={formData.sections.machining.observations} 
    onChange={(e) => handleChange('machining', 'observations', e.target.value)} 
    ref={inputRefs.machining.observations} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>

<h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Área de Fundición</h3>
<div>
  <label>Condiciones del Equipamiento:</label>
  <textarea 
    value={formData.sections.foundry.equipmentCondition} 
    onChange={(e) => handleChange('foundry', 'equipmentCondition', e.target.value)} 
    ref={inputRefs.foundry.equipmentCondition} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Orden y Limpieza:</label>
  <textarea 
    value={formData.sections.foundry.cleanliness} 
    onChange={(e) => handleChange('foundry', 'cleanliness', e.target.value)} 
    ref={inputRefs.foundry.cleanliness} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Protección Personal:</label>
  <textarea 
    value={formData.sections.foundry.personalProtection} 
    onChange={(e) => handleChange('foundry', 'personalProtection', e.target.value)} 
    ref={inputRefs.foundry.personalProtection} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Observaciones:</label>
  <textarea 
    value={formData.sections.foundry.observations} 
    onChange={(e) => handleChange('foundry', 'observations', e.target.value)} 
    ref={inputRefs.foundry.observations} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>

<h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Almacén de Materias Primas</h3>
<div>
  <label>Condiciones de Almacenamiento:</label>
  <textarea 
    value={formData.sections.warehouse.storageCondition} 
    onChange={(e) => handleChange('warehouse', 'storageCondition', e.target.value)} 
    ref={inputRefs.warehouse.storageCondition} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Seguridad contra Incendios:</label>
  <textarea 
    value={formData.sections.warehouse.fireSafety} 
    onChange={(e) => handleChange('warehouse', 'fireSafety', e.target.value)} 
    ref={inputRefs.warehouse.fireSafety} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Observaciones:</label>
  <textarea 
    value={formData.sections.warehouse.observations} 
    onChange={(e) => handleChange('warehouse', 'observations', e.target.value)} 
    ref={inputRefs.warehouse.observations} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>

<h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Zona de Soldadura</h3>
<div>
  <label>Condiciones del Equipamiento:</label>
  <textarea 
    value={formData.sections.welding.equipmentCondition} 
    onChange={(e) => handleChange('welding', 'equipmentCondition', e.target.value)} 
    ref={inputRefs.welding.equipmentCondition} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Protección Personal:</label>
  <textarea 
    value={formData.sections.welding.personalProtection} 
    onChange={(e) => handleChange('welding', 'personalProtection', e.target.value)} 
    ref={inputRefs.welding.personalProtection} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Observaciones:</label>
  <textarea 
    value={formData.sections.welding.observations} 
    onChange={(e) => handleChange('welding', 'observations', e.target.value)} 
    ref={inputRefs.welding.observations} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>

<h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Oficina Administrativa</h3>
<div>
  <label>Condiciones Generales:</label>
  <textarea 
    value={formData.sections.office.generalConditions} 
    onChange={(e) => handleChange('office', 'generalConditions', e.target.value)} 
    ref={inputRefs.office.generalConditions} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>
<div>
  <label>Observaciones:</label>
  <textarea 
    value={formData.sections.office.observations} 
    onChange={(e) => handleChange('office', 'observations', e.target.value)} 
    ref={inputRefs.office.observations} 
    style={{ ...inputStyle, minHeight: '50px' }} 
  />
</div>

<h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Recomendaciones Generales</h3>
<div>
  <textarea 
    value={formData.generalRecommendations} 
    onChange={(e) => setFormData({...formData, generalRecommendations: e.target.value})} 
    ref={inputRefs.generalRecommendations} 
    style={{ ...inputStyle, minHeight: '100px', minWidth: '400px' }} 
  />
</div>

<button type="button" onClick={generatePDF}>Descargar PDF</button>
<button type="button" onClick={() => window.print()}>Imprimir</button>

      </form>
    </div>
  );
};

