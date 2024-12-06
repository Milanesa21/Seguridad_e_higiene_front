import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Typography,
} from "@mui/material";
import { CameraHandler } from "./CameraHandler";
import { ImageHandler } from "./ImageHandler";

export const AmbienteEvaluation = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("camera");

  const handleCapture = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/predict/ambiente", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === "camera" ? "image" : "camera"));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: "700px",
            height: "640px",
            textAlign: "center",
            marginTop: 7.5,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Evaluación del Ambiente
          </Typography>
          {mode === "camera" ? (
            <CameraHandler onCapture={handleCapture} />
          ) : (
            <ImageHandler onProcess={handleCapture} />
          )}
          {loading && result && (
            <Alert
              severity={result === "Falla de seguridad" ? "error" : "info"}
              icon={<CircularProgress size={24} />}
              sx={{ mt: 2 }}
            >
              {result}
            </Alert>
          )}
          {!loading && result && (
            <Alert
              severity={result === "Falla de seguridad" ? "error" : "info"}
              sx={{ mt: 2 }}
            >
              {result}
            </Alert>
          )}
        </Paper>
        <Button variant="contained" color="primary" onClick={handleModeChange}>
          Cambiar a {mode === "camera" ? "Imagen" : "Cámara"}
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};
