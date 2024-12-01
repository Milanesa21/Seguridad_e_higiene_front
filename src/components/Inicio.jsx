import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Typography, Grid, Card, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { GestorTareas } from "./GestorTareas";
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
import { CarouselComponent } from "../components/ChartComponent/CarrouselComponent";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Registrar Chart.js
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
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(0);
  const [idEmpresa, setIdEmpresa] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8000/Usuarios/alert/messages");
        if (!response.ok) throw new Error("Error al obtener mensajes");
        const data = await response.json();
        setMessages(data);

        // Reiniciar contador si hay mensajes
        if (data.length > 0) setCounter(0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 1000);

    const counterInterval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 60000);

    return () => {
      clearInterval(intervalId);
      clearInterval(counterInterval);
    };
  }, []);

  const rows = messages.map((msg, index) => ({
    id: index,
    puesto_trabajo: msg.puesto_trabajo,
    full_name: msg.full_name,
    message: msg.message,
    urgency: msg.message === "¡Emergencia! Necesito asistencia" ? "red" : "yellow",
  }));

  return (
    <div className="SECCION">
      <Navbar />
  
      <div style={{ padding: "20px", marginTop: "70px" }}>
        <Grid container spacing={2}>
          {/* Gráficos y datos */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "16px", marginBottom: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Días sin Accidentes
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <Typography variant="h4">{counter}</Typography>
              </Box>
            </Card>
  
            <Card style={{ padding: "16px", marginBottom: "16px" }}>
              <Typography variant="h6" gutterBottom>
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
                      transform: "translate(0px, 0px)",
                    },
                  }}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </Box>
            </Card>
  
            <Card style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Gráfico de Incidencias Mensuales
              </Typography>
              <div>
                <Line data={data} options={options} />
              </div>
            </Card>
          </Grid>
  
          {/* Carrusel y denuncias */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "16px", marginBottom: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Estadísticas de Sectores de Trabajo
              </Typography>
              <CarouselComponent idEmpresa={idEmpresa} showArrows />
            </Card>
  
            <Card style={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Denuncias y Emergencias
              </Typography>
              <Box height={300}>
                <DataGrid
                  rows={rows}
                  
                  getRowClassName={(params) => `row-${params.row.urgency}`}
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
  
      {/* Sección de gestión de tareas */}
      <div style={{ padding: "20px" }}>
        <GestorTareas />
      </div>
  
      <Footer />
    </div>
  );
};  