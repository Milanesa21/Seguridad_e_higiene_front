import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import DenunciasyEmergencias from "../DenunciasyEmergencias";
import { AgropecuarioService } from "../../service/Checklists/agropecuarioService";
import "../../../public/css/components/inspecciones/Inspeccion.css";

const sections = [
  {
    title: "Sección 1: Manejo de cultivos",
    fields: [
      {
        label:
          "¿El riego se realiza de manera adecuada según las necesidades del cultivo?",
        name: "riegoAdecuado",
      },
      {
        label: "¿Se está aplicando un control de plagas efectivo y seguro?",
        name: "controlPlagas",
      },
      {
        label:
          "¿Se está aplicando la fertilización de manera adecuada y responsable?",
        name: "fertilizacionAdecuada",
      },
      {
        label: "¿Las herramientas de trabajo están limpias y en buen estado?",
        name: "herramientasLimpias",
      },
    ],
  },
  {
    title: "Sección 2: Manejo de animales",
    fields: [
      {
        label:
          "¿Los animales están en buen estado de salud (vacunas, control veterinario)?",
        name: "saludAnimal",
      },
      {
        label:
          "¿Se está proporcionando una alimentación adecuada y balanceada a los animales?",
        name: "alimentacionAdecuada",
      },
      {
        label: "¿Los animales tienen acceso a agua suficiente y de calidad?",
        name: "aguaSuficiente",
      },
      {
        label:
          "¿Las instalaciones donde están los animales están limpias y en buen estado?",
        name: "instalacionesLimpias",
      },
    ],
  },
  {
    title: "Sección 3: Seguridad en la explotación agropecuaria",
    fields: [
      {
        label:
          "¿El personal usa equipo de protección adecuado (botas, guantes, casco)?",
        name: "usoEquipoProteccion",
      },
      {
        label:
          "¿La maquinaria agrícola está en buen estado y correctamente mantenida?",
        name: "maquinariaEnBuenEstado",
      },
      {
        label:
          "¿Se conocen y siguen los procedimientos de emergencia en caso de accidentes?",
        name: "procedimientosEmergencia",
      },
      {
        label:
          "¿Están los productos químicos (fertilizantes, pesticidas) correctamente almacenados?",
        name: "productosQuimicosAlmacenados",
      },
    ],
  },
  {
    title: "Sección 4: Mantenimiento de maquinaria y equipos",
    fields: [
      {
        label:
          "¿La maquinaria agrícola ha sido mantenida y revisada regularmente?",
        name: "maquinariaMantenida",
      },
      {
        label:
          "¿Los equipos de medición y aplicación (por ejemplo, pulverizadores) están calibrados?",
        name: "equiposCalibrados",
      },
      {
        label:
          "¿Las herramientas y maquinaria son adecuadas para las tareas agrícolas?",
        name: "herramientasAdecuadas",
      },
      {
        label:
          "¿El equipo de seguridad (extintores, kits de primeros auxilios) está disponible?",
        name: "equipoSeguridadDisponible",
      },
    ],
  },
  {
    title: "Sección 5: Procedimientos de sostenibilidad",
    fields: [
      {
        label: "¿Se realiza una adecuada gestión de residuos agrícolas?",
        name: "gestionResiduos",
      },
      {
        label: "¿Se implementan prácticas agrícolas sostenibles?",
        name: "practicasSostenibles",
      },
      {
        label:
          "¿Se hace un uso adecuado y eficiente del agua en las actividades agrícolas?",
        name: "usoAdecuadoAgua",
      },
      {
        label:
          "¿Se emplea energía renovable o técnicas de ahorro energético en la explotación?",
        name: "energiaRenovable",
      },
    ],
  },
];

export const AgropecuarioChecklistForm = () => {
  const [checklistData, setChecklistData] = useState(
    sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = false;
      });
      return acc;
    }, {})
  );
  const [idEmpresa, setIdEmpresa] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false); // Estado para controlar el modo de impresión
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setIdEmpresa(user.id_empresa);
    }
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, checked } = e.target;
    setChecklistData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  }, []);

  const sendDataToBackend = useCallback(async () => {
    try {
      const response = await AgropecuarioService.createChecklist(
        checklistData,
        idEmpresa
      );
      console.log("Response:", response);
      alert("Checklist enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el checklist:", error);
      alert("Error al enviar el checklist");
    }
  }, [checklistData, idEmpresa]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendDataToBackend();
    },
    [sendDataToBackend]
  );

  const printForm = useCallback(() => {
  setIsPrinting(true); // Cambia el estado a true para ocultar los componentes
  setTimeout(() => {
    window.print(); // Llama a la función de impresión después del retraso
  }, 500); // Retraso de 500 ms
}, []);

  const handleAfterPrint = useCallback(() => {
    setIsPrinting(false); // Cambia el estado a false después de que se termine de imprimir
  }, []);

  useEffect(() => {
    window.onafterprint = handleAfterPrint; // Se ejecuta después de la impresión
    return () => {
      window.onafterprint = null; // Limpia el evento cuando el componente se desmonta
    };
  }, [handleAfterPrint]);

  return (
    <div>
      {/* Oculta el Navbar y Footer cuando estamos imprimiendo */}
      {!isPrinting && <Navbar />}
      <Container maxWidth="lg" sx={{ my: 4 }} style={{ marginTop: "80px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checklist de Inspección Agropecuaria
        </Typography>
        <form onSubmit={handleSubmit}>
          {sections.map((section, index) => (
            <Card key={index} sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {section.fields.map((field) => (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={field.name}
                            checked={checklistData[field.name]}
                            onChange={handleChange}
                          />
                        }
                        label={field.label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}

          {/* Oculta los botones cuando estamos imprimiendo */}
          {!isPrinting && (
            <Box display="flex" justifyContent="center" gap={2}>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
              <Button type="button" variant="outlined" onClick={printForm}>
                Imprimir
              </Button>
            </Box>
          )}
        </form>
      </Container>

      {/* Oculta Footer y DenunciasyEmergencias durante la impresión */}
      {!isPrinting && (
        <>
          <Footer />
          <DenunciasyEmergencias />
        </>
      )}
    </div>
  );
};
