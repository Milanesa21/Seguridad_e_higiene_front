import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CarouselComponentDB } from "../components/ChartComponentDashB/CarrouselComponentDB";
import { GestorTareas } from "./GestorTareas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Número de incidencias",
      data: [90, 80, 55, 60, 35, 45, 30],
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
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="SECCION">
      <Navbar />

      <div
        style={{
          padding: "20px",
          height: "100vh",
          margin: "70px",
          marginBottom: "0",
        }}
      >
        <Grid container spacing={3}>
          {/* Cuadros principales */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ padding: "16px" }}
                  >
                    Gráfico de Incidencias Mensuales
                  </Typography>
                  <div style={{ padding: "16px" }}>
                    <Line data={data} options={options} />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ padding: "16px" }}
                  >
                    Medidor de Seguridad
                  </Typography>
                  <Box display="flex" justifyContent="center" height="150px">
                    <Gauge
                      value={75}
                      startAngle={-110}
                      endAngle={110}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 24,
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ padding: "16px" }}
                  >
                    Estadísticas de Sectores
                  </Typography>
                  <CarouselComponentDB idEmpresa={null} showArrows />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ height: "100%" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ padding: "16px" }}
                  >
                    Días sin Accidentes
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                  >
                    <Typography variant="h4">{counter}</Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Columna secundaria */}
          <Grid item xs={12} md={4}>
            <Card style={{ height: "100%" }}>
              <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
                Denuncias y Emergencias
              </Typography>
              <Box height={600}>
                <DataGrid
                  rows={[]}
                  columns={[
                    { field: "message", headerName: "Mensaje", width: 300 },
                  ]}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>

      <GestorTareas />
      <Footer />
    </div>
  );
};
