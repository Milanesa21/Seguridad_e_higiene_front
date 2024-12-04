import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { EmergencyModal } from "../components/EmergencyModal";
import { DenunciasyEmergencias } from "../components/DenunciasyEmergencias";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Typography,
  Paper,
  Input,
} from "@mui/material";

export const AmbienteEvaluation = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("camera"); // 'camera' o 'image'
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

  const handleModeChange = () => {
    if (mode === "camera") {
      stopVideoEvaluation();
      setMode("image");
    } else {
      startCamera();
      startVideoEvaluation();
      setMode("camera");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);

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
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
      startVideoEvaluation();
    }

    return () => {
      stopVideoEvaluation();
    };
  }, [mode]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            width: "100%",
            maxWidth: "800px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Evaluar Ambiente
          </Typography>
          {mode === "camera" ? (
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              autoPlay
              style={{ borderRadius: 8, marginBottom: 16 }}
            />
          ) : (
            <canvas
              ref={canvasRef}
              style={{ display: "block", borderRadius: 8, marginBottom: 16 }}
              width="800"
              height="800"
            />
          )}
          {loading && result && (
            <Alert
              severity={result === "Falla de seguridad" ? "error" : "info"}
              icon={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={24} />
                </Box>
              }
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

        {mode === "camera" ? (
          <Button variant="contained" color="primary" onClick={handleModeChange} sx={{ mb: 2 }}>
            Agregar Imagen
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button variant="contained" color="primary" onClick={handleModeChange} sx={{ mb: 2 }}>
              Activar Cámara
            </Button>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              sx={{ mt: 2 }}
            />
          </Box>
        )}
      </Box>
      <Footer />
      <EmergencyModal />
      <DenunciasyEmergencias />
    </Box>
  );
};