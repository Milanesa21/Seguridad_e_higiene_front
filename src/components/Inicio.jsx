import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Alert,
  Box,
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
import { UserService } from "../service/userService";
import { EmergencyModal } from "./EmergencyModal";
import {DenunciasyEmergencias} from "./DenunciasyEmergencias";
import { MedidorDeSeguridad } from "./MedidorDeSeguridad";

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
  const [counter, setCounter] = useState(0); // Días sin emergencias
  const [message, setMessage] = useState([]);
  const [hasEmergencies, setHasEmergencies] = useState(false); // Indica si hay emergencias activas


  useEffect(() => {
    getMessages();
    const intervalID = setInterval(getMessages, 5000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);



  const rows = message.map((msg, index) => ({
    id: index,
    puesto_trabajo: msg.puesto_trabajo,
    full_name: msg.full_name,
    message: msg.message,
    urgency: msg.message === "¡Emergencia! Necesito asistencia" ? "red" : "yellow",
  }));

  const getMessages = async () => {
    try {
      const response = await UserService.alert();
      const data = await response.json();
      setMessage(data);

      // Verificar si hay emergencias en los mensajes
      const hasEmergency = data.some((msg) => msg.message === "¡Emergencia! Necesito asistencia");

      if (hasEmergency) {
        setHasEmergencies(true);
        setCounter(0); // Reinicia los días sin emergencias
      } else if (!hasEmergencies) {
        setHasEmergencies(false);
        setCounter((prev) => prev + 1); // Incrementa los días sin emergencias solo si no había emergencias antes
      }
    } catch (error) {
      console.error("Error al obtener las alertas:", error);
    }
  };

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
                <MedidorDeSeguridad/>
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
                  <CarouselComponentDB showArrows />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
  <Card
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
    }}
    elevation={3} // Agrega sombra para resaltar la tarjeta
  >
    <Typography
      variant="h6"
      gutterBottom
      style={{
        fontWeight: "bold",
        color: "black", // Cambia el color para destacar
      }}
    >
      Días sin Accidentes
    </Typography>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
      width="100%"
    >
      <Typography
        variant="h1"
        style={{
          fontFamily: "'Roboto Mono', monospace", // Fuente estilo monoespaciado
          fontWeight: "700",
          color: "black", // Color llamativo para los números
        }}
      >
        {counter}
      </Typography>
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
        rows={rows}
        getRowClassName={(params) => `row-${params.row.urgency}`}
        columns={[
          {
            field: "message",
            headerName: "Mensaje",
            width: 445,
            renderCell: (params) => {
              const isEmergency = params.row.message.includes("¡Emergencia!");
              return (
                <Alert
                  severity={isEmergency ? "error" : "info"}
                  style={{ width: "100%", padding: "8px 16px", boxSizing: "border-box" }}
                >
                  {params.row.message}
                </Alert>
              );
            },
          },
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
      <DenunciasyEmergencias />
      <EmergencyModal />
      <Footer />
    </div>
  );
};
