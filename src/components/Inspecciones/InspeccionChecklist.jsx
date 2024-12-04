import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import DenunciasyEmergencias from "../DenunciasyEmergencias";

const sections = [
  {
    title: "Sección 1: Trabajando en las alturas",
    fields: [
      {
        label: "¿Se han realizado todas las comprobaciones de gas?",
        name: "comprobacionesGas",
      },
      {
        label: "¿Falta de protección de bordes?",
        name: "faltaProteccionBordes",
      },
      {
        label: "¿Protección de bordes insegura o incompleta?",
        name: "proteccionBordesInsegura",
      },
    ],
  },
  {
    title: "Sección 2: Planta y equipamiento",
    fields: [
      {
        label: "¿Planta / equipo incorrecto para el trabajo?",
        name: "plantaEquipoIncorrecto",
      },
      { label: "¿Operadores sin licencia?", name: "operadoresSinLicencia" },
      {
        label: "¿Falta de instrucciones de trabajo seguras?",
        name: "faltaInstruccionesSeguras",
      },
    ],
  },
  {
    title: "Sección 3: Andamios",
    fields: [
      {
        label: "¿Personas sin licencia erigiendo andamios por encima de 4 m?",
        name: "personasSinLicencia",
      },
      {
        label: "¿Falta de protocolo de inspección para andamios?",
        name: "faltaProtocoloInspeccion",
      },
      {
        label: "¿Se superó la carga de trabajo segura (SWL)?",
        name: "cargaTrabajoSegura",
      },
    ],
  },
  {
    title: "Sección 4: Equipos de elevación",
    fields: [
      {
        label: "Cargas elevadas sobre personas o proximidad a obstáculos",
        name: "cargasElevadasObstaculos",
      },
      {
        label: "¿Falta de protocolo de inspección diaria?",
        name: "faltaProtocoloInspeccionDiaria",
      },
      {
        label: "¿Equipo de elevación inseguro o dañado?",
        name: "equipoElevacionInseguro",
      },
      {
        label: "¿Operadores sin licencia?",
        name: "operadoresSinLicenciaElevacion",
      },
    ],
  },
  {
    title: "Sección 5: Arnés y equipo",
    fields: [
      {
        label: "¿Falta o capacitación formal inadecuada para los operadores?",
        name: "faltaCapacitacion",
      },
      {
        label: "¿Falta de protocolo de inspección para arneses y equipos?",
        name: "faltaProtocoloInspeccionEquipos",
      },
      {
        label: "¿Ganchos o equipos incompatibles?",
        name: "ganchosEquiposIncompatibles",
      },
    ],
  },
  {
    title: "Sección 6: Escaleras",
    fields: [
      { label: "¿Escaleras inseguras o dañadas?", name: "escalerasInseguras" },
      {
        label: "¿Posicionamiento inseguro de las escaleras?",
        name: "posicionamientoInseguroEscaleras",
      },
      {
        label: "¿Escalera inadecuada para el trabajo?",
        name: "escaleraInadecuada",
      },
    ],
  },
  {
    title: "Sección 7: Tareas manuales peligrosas",
    fields: [
      {
        label: "¿Controles de riesgo inadecuados?",
        name: "controlesRiesgoInadecuados",
      },
    ],
  },
];

export const ChecklistForm = () => {
  const [checklistData, setChecklistData] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setChecklistData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Checklist Data:", checklistData);
  };

  const printForm = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />
      <br /><br /> <br />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Checklist de Inspección Laboral
        </Typography>
        <form onSubmit={handleSubmit}>
          {sections.map((section, index) => (
            <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {section.title}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                  {section.fields.map((field, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!checklistData[field.name]}
                            onChange={handleChange}
                            name={field.name}
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
          <Box display="flex" justifyContent="center" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
            <Button type="button" variant="outlined" onClick={printForm}>
              Imprimir
            </Button>
          </Box>
        </form>
      </Container>
      <Footer />
      <DenunciasyEmergencias />
    </div>
  );
};
