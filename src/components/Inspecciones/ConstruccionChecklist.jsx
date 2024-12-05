import { useState, useCallback, useEffect } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import DenunciasyEmergencias from "../DenunciasyEmergencias";
import { ConstruccionService } from "../../service/Checklists/construccionService";
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
  Alert
} from "@mui/material";

const sections = [
  {
    title: "Sección 1: Seguridad en el sitio de construcción",
    fields: [
      {
        label:
          "¿El acceso al sitio de construcción está controlado para prevenir el ingreso no autorizado?",
        name: "accesoControlado",
      },
      {
        label:
          "¿La señalización de seguridad está claramente visible y colocada en zonas críticas?",
        name: "senalizacionAdecuada",
      },
      {
        label:
          "¿Los pasillos y áreas de trabajo están despejados de obstáculos y peligros?",
        name: "pasillosDespejados",
      },
      {
        label:
          "¿Están disponibles los equipos de emergencia (extintores, primeros auxilios) en el sitio?",
        name: "equiposEmergenciaDisponibles",
      },
    ],
  },
  {
    title: "Sección 2: Uso de equipo de protección personal (EPP)",
    fields: [
      {
        label: "¿Todo el personal lleva casco de seguridad?",
        name: "cascoSeguridad",
      },
      {
        label:
          "¿Se utilizan gafas de protección adecuadas cuando se trabaja con materiales peligrosos o herramientas?",
        name: "gafasProtectoras",
      },
      {
        label: "¿El personal usa chalecos reflectantes en todo momento?",
        name: "chalecoReflectante",
      },
      {
        label:
          "¿Se lleva calzado de seguridad adecuado en el sitio de construcción?",
        name: "calzadoSeguridad",
      },
      {
        label:
          "¿El personal usa guantes de trabajo adecuados para las tareas específicas?",
        name: "guantesTrabajo",
      },
    ],
  },
  {
    title: "Sección 3: Maquinaria y herramientas",
    fields: [
      {
        label: "¿Toda la maquinaria ha sido inspeccionada antes de su uso?",
        name: "maquinariaInspeccionada",
      },
      {
        label:
          "¿Las herramientas utilizadas son adecuadas para las tareas y están en buen estado?",
        name: "herramientasAdecuadas",
      },
      {
        label:
          "¿Los equipos de medición y maquinaria están correctamente calibrados?",
        name: "equiposCalibrados",
      },
      {
        label: "¿Se ha realizado el mantenimiento preventivo a la maquinaria?",
        name: "mantenimientoRealizado",
      },
    ],
  },
  {
    title: "Sección 4: Procedimientos de trabajo en altura",
    fields: [
      {
        label: "¿Se han instalado líneas de vida para trabajos en altura?",
        name: "lineasVidaInstaladas",
      },
      {
        label: "¿Se han verificado los arneses de seguridad antes de su uso?",
        name: "arnesesVerificados",
      },
      {
        label:
          "¿Se han instalado barandas de protección en las áreas elevadas?",
        name: "barandasProteccion",
      },
      {
        label: "¿Están implementados los sistemas de prevención de caídas?",
        name: "sistemasPrevencionCaidas",
      },
    ],
  },
  {
    title: "Sección 5: Manejo de materiales peligrosos",
    fields: [
      {
        label:
          "¿Se realiza el almacenamiento adecuado de los materiales peligrosos?",
        name: "almacenamientoAdecuado",
      },
      {
        label:
          "¿Los contenedores de materiales peligrosos están debidamente etiquetados?",
        name: "etiquetasCorrectas",
      },
      {
        label:
          "¿Está disponible el equipo adecuado para la manipulación segura de materiales peligrosos?",
        name: "equipoManipulacionDisponible",
      },
      {
        label:
          "¿El área de trabajo tiene ventilación adecuada para evitar la exposición a vapores peligrosos?",
        name: "ventilacionAdecuada",
      },
    ],
  },
];

export const ConstruccionChecklistForm = () => {
  const [checklistData, setChecklistData] = useState(
    sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = false;
      });
      return acc;
    }, {})
  );
  const [idEmpresa, setIdEmpresa] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); // Estado para controlar la visibilidad de la alerta
  const [alertMessage, setAlertMessage] = useState(""); // Mensaje de la alerta
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await ConstruccionService.createChecklist(
        checklistData,
        idEmpresa
      );
      const result = await response.json();

      if (response.ok) {
        setAlertMessage("Checklist guardado exitosamente");
        setAlertOpen(true); // Mostrar la alerta de éxito
        console.log("Response:", result);
      } else {
        setAlertMessage("Error al guardar el checklist");
        setAlertOpen(true); // Mostrar la alerta de error
        console.error("Error:", result);
      }
    } catch (error) {
      setAlertMessage("Error al conectar con el backend");
      setAlertOpen(true); // Mostrar la alerta de error
      console.error("Error al conectar con el backend:", error);
    }
  }, [checklistData, idEmpresa]);

  const handleAlertClose = () => {
    setAlertOpen(false); // Cerrar la alerta
  };

  const printForm = useCallback(() => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  const handleAfterPrint = useCallback(() => {
    setIsPrinting(false);
  }, []);

  useEffect(() => {
    window.onafterprint = handleAfterPrint;
    return () => {
      window.onafterprint = null;
    };
  }, [handleAfterPrint]);

  return (
    <div className="">
      {!isPrinting && <Navbar />}
      <Container maxWidth="lg" sx={{ my: 4 }} style={{ marginTop: "80px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          CHECKLIST DE INSPECCIÓN EN CONSTRUCCIÓN
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

      {/* Snackbar para mostrar alertas */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertMessage.includes("Error") ? "error" : "success"}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {!isPrinting && (
        <>
          <Footer />
          <DenunciasyEmergencias />
        </>
      )}
    </div>
  );
};
