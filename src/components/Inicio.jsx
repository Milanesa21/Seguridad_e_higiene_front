import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { EmergencyModal } from "./EmergencyModal";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {DenunciasyEmergencias} from "./DenunciasyEmergencias.jsx"

// Material UI components for dashboard
import { Card, Box, Typography, Stack, Grid, List, ListItem, ListItemText } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart"; // IMPORTADO pieArcLabelClasses

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"], // Simulación de datos de meses
  datasets: [
    {
      label: "Número de incidencias",
      data: [30, 45, 35, 60, 55, 80, 90],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Gráfico de Incidencias Mensuales",
    },
  },
};

export const Inicio = () => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [counter, setCounter] = useState(0); // Contador que se incrementará

  useEffect(() => {
    // Leer el mensaje de localStorage
    const message = localStorage.getItem("loginSuccess");
    if (message) {
      setNotification(message);
      setOpen(true);
      localStorage.removeItem("loginSuccess");
    }

    // Función para incrementar el contador cada 60 segundos
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1); // Aumentar el contador en 1 cada 60 segundos
    }, 60000); // 60000ms = 60 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  // Datos para el gráfico Pie
  const pieChartData = [
    {
      data: [
        { id: 0, value: 25, label: 'Tipo A', color: '#4caf50' }, // Verde para Tipo A
        { id: 1, value: 35, label: 'Tipo B', color: '#ff9800' }, // Naranja para Tipo B
        { id: 2, value: 40, label: 'Tipo C', color: '#2196f3' }, // Azul para Tipo C
      ],
    },
  ];

  return (
    <div className="SECCION">
      <Navbar />

      {/* Notificación de éxito */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {notification}
        </Alert>
      </Snackbar>

      {/* Sección de Dashboard */}
      <div style={{ padding: "20px", height:"100vh", margin:"70px"}}>
        <Typography variant="h4" gutterBottom>
          Dashboard de Seguridad
        </Typography>
        
        {/* Sección para los cuadros y columna */}
        <Grid container spacing={3}>
          {/* Bloques de Cuadros */}
          <Grid item xs={12} md={8}> {/* Cuadros ocupan menos espacio (8 partes en lugar de 9) */}
            <Grid container spacing={3}>
              {/* Fila 1 con 2 cuadros */}
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
                    Gráfico de Incidencias Mensuales
                  </Typography>
                  <div style={{ padding: "16px" }}>
                    <Line data={data} options={options} />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
                    Medidor de Seguridad
                  </Typography>
                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      justifyContent: "center",
                      height: "300px", // Agregando altura para visualizar el gráfico
                    }}
                  >
                    <Gauge
                      value={75}
                      startAngle={-110}
                      endAngle={110}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                          transform: "translate(0px, 0px)",
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
                  </div>
                </Card>
              </Grid>

              {/* Fila 2 con 2 cuadros */}
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
                    Distribución de Incidencias
                  </Typography>
                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      justifyContent: "center",
                      height: "300px", // Agregando altura para visualizar el gráfico
                    }}
                  >
                    <PieChart
                      series={pieChartData}
                      innerRadius={30}
                      outerRadius={100}
                      paddingAngle={5}
                      cornerRadius={5}
                      startAngle={-45}
                      endAngle={225}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fontWeight: 'bold',
                        },
                      }}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
                    Contador en Tiempo Real
                  </Typography>
                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px", // Establecer la altura
                    }}
                  >
                    <Typography variant="h4">{counter}</Typography>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Columna a la derecha */}
          <Grid item xs={12} md={4}> {/* Columna ahora ocupa 4 partes en lugar de 3 */}
            <Card style={{ height: "100%" }}>
              <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
                Lista de Alertas Recientes
              </Typography>
              <div style={{ padding: "16px" }}>
                <List>
                  <ListItem>
                    <ListItemText primary="Alerta: Fuga de gas detectada" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Alerta: Mal estado de equipo de seguridad" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Alerta: Fallo en la luz de emergencia" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Alerta: Incidente en la zona de producción" />
                  </ListItem>
                </List>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>

      <EmergencyModal />
      <DenunciasyEmergencias/>
      <Footer />
    </div>
  );
};
