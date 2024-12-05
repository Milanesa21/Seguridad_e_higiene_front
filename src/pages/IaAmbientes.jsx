import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { EmergencyModal } from "../components/EmergencyModal";
import { DenunciasyEmergencias } from "../components/DenunciasyEmergencias";
import { Box, Button, CircularProgress, Alert, Typography, Paper } from "@mui/material";
import styles from "../../public/css/pages/AmbienteEvaluation.module.css";

export const AmbienteEvaluation = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const captureAndEvaluateFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob);

      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/predict/ambiente", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setResult(data.message);
      } catch (error) {
        console.error("Error:", error);
        setResult("An error occurred");
      } finally {
        setLoading(false);
      }
    });
  };

  const startVideoEvaluation = () => {
    const id = setInterval(captureAndEvaluateFrame, 1000); // Captura y envía un fotograma cada segundo
    setIntervalId(id);
  };

  const stopVideoEvaluation = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    startCamera();
    startVideoEvaluation();

    return () => {
      stopVideoEvaluation();
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: "center", width: "700px" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Evaluar Ambiente
          </Typography>
          <div className="mb-3">
            <video ref={videoRef} width="640" height="480" autoPlay style={{ borderRadius: 8 }} />
          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas>

          {loading && (
            <div className="mb-3">
              <CircularProgress sx={{ mt: 2 }} />
            </div>
          )}

          {result && (
            <Alert
              severity={result === "Falla de seguridad" ? "error" : "info"}
              sx={{ mt: 2 }}
            >
              {result}
            </Alert>
          )}
        </Paper>
      </Box>
      <Footer />
      <EmergencyModal />
      <DenunciasyEmergencias />
    </Box>
  );
};
