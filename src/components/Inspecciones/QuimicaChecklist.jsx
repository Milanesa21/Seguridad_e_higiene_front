import { useState, useCallback, useEffect } from "react";
import "/public/css/components/inspecciones/Inspeccion.css";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import DenunciasyEmergencias from "../DenunciasyEmergencias";
import { useAuth } from "../../context/AuthProvider";
import { QuimicaService } from "../../service/Checklists/quimicaService";
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

const sections = [
  {
    title: "Sección 1: Equipos de protección personal",
    fields: [
      { label: "¿Se utiliza bata de laboratorio en todo momento?", name: "usoBataLaboratorio" },
      { label: "¿Se utilizan gafas de protección al manejar sustancias químicas?", name: "usoGafasProteccion" },
      { label: "¿Se utilizan guantes adecuados para los productos químicos que se manejan?", name: "usoGuantesAdecuados" },
      { label: "¿Se usa mascarilla si es necesario (para vapores, polvo, etc.)?", name: "usoMascarilla" },
    ],
  },
  {
    title: "Sección 2: Almacenamiento de productos químicos",
    fields: [
      { label: "¿Están todos los productos químicos etiquetados correctamente?", name: "productosEtiquetados" },
      { label: "¿Están los productos químicos almacenados de manera segura?", name: "productosSeguros" },
      { label: "¿Se ha asegurado que los productos químicos incompatibles estén separados?", name: "almacenamientoCompatible" },
      { label: "¿Está el área de almacenamiento adecuadamente ventilada?", name: "ventilacionAdecuada" },
    ],
  },
  {
    title: "Sección 3: Procedimientos de manejo de productos químicos",
    fields: [
      { label: "¿Se siguen los procedimientos de manejo adecuados para cada producto químico?", name: "procedimientosSeguidos" },
      { label: "¿Se cuenta con un procedimiento para controlar derrames químicos?", name: "derramesControlados" },
      { label: "¿Se lleva un registro actualizado de los productos químicos utilizados?", name: "registroProductos" },
      { label: "¿El equipo de emergencia (duchas, lavaojos, extintores) está accesible y funcional?", name: "equipoEmergenciaAccesible" },
    ],
  },
  {
    title: "Sección 4: Estado del equipo de laboratorio",
    fields: [
      { label: "¿Está la campana de extracción funcionando correctamente?", name: "campanaFuncionando" },
      { label: "¿Está el equipo de laboratorio limpio y en buen estado?", name: "equipoLimpio" },
      { label: "¿Está el vidrio de laboratorio (matraces, tubos de ensayo, etc.) libre de daños?", name: "vidrioNoDañado" },
      { label: "¿Se ha verificado la calibración de los equipos de laboratorio?", name: "equiposCalibrados" },
    ],
  },
  {
    title: "Sección 5: Eliminación de residuos químicos",
    fields: [
      { label: "¿Están los residuos químicos correctamente etiquetados?", name: "residuosEtiquetados" },
      { label: "¿Están los residuos químicos almacenados de manera adecuada y segura?", name: "residuosAlmacenadosCorrectamente" },
      { label: "¿Se eliminan los residuos químicos con la frecuencia adecuada?", name: "residuosEliminadosFrecuentemente" },
      { label: "¿Se siguen los procedimientos correctos para la eliminación de residuos?", name: "procedimientosEliminacionCorrectos" },
    ],
  },
];

export const QuimicoChecklistForm = () => {
  const [checklistData, setChecklistData] = useState(
    sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = false;
      });
      return acc;
    }, {})
  );
  const [idEmpresa, setIdEmpresa] = useState(null);
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
    console.log("Checklist Data:", checklistData);

    try {
      const response = await QuimicaService.createChecklist(checklistData, idEmpresa);

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      const result = await response.json();
      alert(result.mensaje);
    } catch (error) {
      console.error("Error al enviar el checklist:", error);
    }
  }, [checklistData, idEmpresa]);

  const printForm = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="prueba">
      <Navbar />
      <br />
      <br /> <br />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          CHECKLIST DE INSPECCIÓN EN LABORATORIO QUÍMICO
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