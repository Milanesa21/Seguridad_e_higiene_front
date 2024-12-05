import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import DenunciasyEmergencias from "../DenunciasyEmergencias";
import { ElectricidadService } from "../../service/Checklists/electricidadService";
import { useAuth } from "../../context/AuthProvider";
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
  Snackbar,
  Alert,
} from "@mui/material";

const sections = [
  {
    title: "Sección 1: Equipos eléctricos",
    fields: [
      {
        label:
          "¿Se ha realizado una inspección visual de los equipos eléctricos?",
        name: "inspeccionEquipos",
      },
      {
        label: "¿Hay equipos eléctricos dañados o defectuosos?",
        name: "equiposDañados",
      },
      {
        label: "¿Están todos los equipos etiquetados correctamente?",
        name: "etiquetadoCorrecto",
      },
    ],
  },
  {
    title: "Sección 2: Cables y conexiones",
    fields: [
      {
        label: "¿Están los cables correctamente aislados?",
        name: "cablesAisladosCorrectamente",
      },
      {
        label: "¿Son las conexiones eléctricas firmes y seguras?",
        name: "conexionesFirmes",
      },
      { label: "¿Hay cables dañados o desgastados?", name: "cablesDañados" },
    ],
  },
  {
    title: "Sección 3: Interruptores y paneles",
    fields: [
      {
        label: "¿Funcionan correctamente los interruptores automáticos?",
        name: "interruptoresFuncionando",
      },
      {
        label: "¿Están los paneles eléctricos etiquetados correctamente?",
        name: "panelesEtiquetados",
      },
      {
        label: "¿Está el acceso a los paneles eléctricos despejado?",
        name: "accesoDespejadoPaneles",
      },
    ],
  },
  {
    title: "Sección 4: Protección personal",
    fields: [
      {
        label: "¿Se está utilizando el equipo de protección adecuado?",
        name: "usoEquiposProteccion",
      },
      {
        label:
          "¿Se usan guantes aislantes para trabajos en vivo o cerca de corriente?",
        name: "guantesAislantes",
      },
      {
        label: "¿Se usan gafas de protección en zonas de riesgo?",
        name: "gafasProteccion",
      },
    ],
  },
  {
    title: "Sección 5: Procedimientos de trabajo",
    fields: [
      {
        label:
          "¿Se aplica el procedimiento de bloqueo y etiquetado antes de trabajar en equipos eléctricos?",
        name: "bloqueoEtiquetado",
      },
      {
        label: "¿Se siguen los procedimientos de trabajo seguro?",
        name: "procedimientosTrabajoSeguro",
      },
      {
        label:
          "¿Ha recibido el personal la formación adecuada en seguridad eléctrica?",
        name: "formacionAdecuada",
      },
    ],
  },
  {
    title: "Sección 6: Herramientas y equipos de prueba",
    fields: [
      {
        label: "¿Se utilizan herramientas aisladas para trabajos eléctricos?",
        name: "herramientasAisladas",
      },
      {
        label: "¿Están las herramientas en buen estado de funcionamiento?",
        name: "herramientasEnBuenEstado",
      },
      {
        label: "¿Está el equipo de pruebas eléctricas debidamente calibrado?",
        name: "equipoPruebasCalibrado",
      },
    ],
  },
];

export const ElectricidadChecklistForm = () => {
  const [checklistData, setChecklistData] = useState(
    sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = false;
      });
      return acc;
    }, {})
  );

  const [idEmpresa, setIdEmpresa] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false); // Control de impresión
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
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
      const response = await ElectricidadService.createChecklist(checklistData, idEmpresa);
      console.log("Datos enviados exitosamente:", response.data);
      setSnackbarMessage("Checklist enviado exitosamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setSnackbarMessage("Error al enviar el checklist");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
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
    setIsPrinting(true); // Cambiar estado para ocultar componentes
    setTimeout(() => {
      window.print();
    }, 500); // Retraso para garantizar que los cambios visuales se apliquen antes de imprimir
  }, []);

  const handleAfterPrint = useCallback(() => {
    setIsPrinting(false); // Restaurar el estado después de la impresión
  }, []);

  useEffect(() => {
    window.onafterprint = handleAfterPrint;
    return () => {
      window.onafterprint = null;
    };
  }, [handleAfterPrint]);

  return (
    <div>
      {!isPrinting && <Navbar />}
      <Container maxWidth="lg" sx={{ my: 4 }} style={{ marginTop: "80px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          CHECKLIST DE INSPECCIÓN ELÉCTRICA
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
      {!isPrinting && <Footer />}
      {!isPrinting && <DenunciasyEmergencias />}

      {/* Snackbar para mostrar alertas */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
