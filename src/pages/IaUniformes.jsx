import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { EmergencyModal } from "../components/EmergencyModal";
import { DenunciasyEmergencias } from "../components/DenunciasyEmergencias";
import { Box, Button, CircularProgress, Alert, Typography, Paper, Input } from "@mui/material";

export const UniformeEvaluation = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("camera"); // 'camera' o 'image'
  const [selectedImage, setSelectedImage] = useState(null);
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

  const captureFrame = () => {
    if (!canvasRef.current) {
      console.error("Canvas no está listo todavía.");
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (mode === "camera" && videoRef.current) {
      const video = videoRef.current;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else if (mode === "image" && selectedImage) {
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  };

  const evaluateFrame = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob);

      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/predict", {
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

  const startEvaluation = () => {
    captureFrame(); // Capturar una vez inmediatamente
    const id = setInterval(() => {
      captureFrame();
      evaluateFrame();
    }, 1000); // Enviar cada segundo
    setIntervalId(id);
  };

  const stopEvaluation = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleModeChange = () => {
    stopEvaluation(); // Detenemos cualquier evaluación previa
    if (mode === "camera") {
      setMode("image");
    } else {
      setMode("camera");
      startCamera();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Guardar la imagen seleccionada
        setMode("image"); // Cambiar al modo imagen automáticamente
        stopEvaluation(); // Detener evaluación previa, si existía
        startEvaluation(); // Iniciar evaluación con la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
      startEvaluation();
    } else {
      stopEvaluation();
    }

    return () => {
      stopEvaluation();
    };
  }, [mode]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: "center", width: "700px" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Evaluar Uniformes de Seguridad
          </Typography>
          {mode === "camera" ? (
            <video ref={videoRef} width="640" height="480" autoPlay style={{ borderRadius: 8 }} />
          ) : (
            <canvas ref={canvasRef} width="640" height="480" style={{ borderRadius: 8 }} />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas>
          {loading ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : (
            result && (
              <Alert
                severity={result === "Falla en el uniforme" ? "error" : "info"}
                sx={{ mt: 2 }}
              >
                {result}
              </Alert>
            )
          )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button variant="contained" onClick={handleModeChange}>
              {mode === "camera" ? "Cambiar a Imagen" : "Cambiar a Cámara"}
            </Button>
            {mode === "image" && (
              <label htmlFor="image-upload">
                <Input type="file" accept="image/*" onChange={handleImageUpload} id="image-upload" style={{ display: "none" }} />
                <Button variant="outlined" component="span">
                  Elegir Imagen
                </Button>
              </label>
            )}
          </Box>
        </Paper>
      </Box>
      <Footer />
      <EmergencyModal />
      <DenunciasyEmergencias />
    </Box>
  );
};