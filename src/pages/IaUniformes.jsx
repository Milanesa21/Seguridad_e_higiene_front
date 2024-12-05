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

export const UniformeEvaluation = () => {
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
        const response = await fetch("http://127.0.0.1:8000/predict/", {
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
          context.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("file", blob);

            try {
              setLoading(true);
              const response = await fetch("http://127.0.0.1:8000/predict/", {
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
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              width: "700px",
              height: "640px",
              textAlign: "center",
              padding: 3,
              gap: 2,
              marginTop: 7.5,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Evaluar Uniformes de Seguridad
            </Typography>
            {mode === "camera" ? (
              <video
                ref={videoRef}
                width="640"
                height="480"
                autoPlay
                style={{ borderRadius: 8 }}
              />
            ) : (
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                style={{
                  borderRadius: 8,
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            )}
            {/* Mensaje de alerta */}
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {mode === "camera" ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleModeChange}
              >
                Cambiar a Imagen
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModeChange}
                >
                  Cambiar a Cámara
                </Button>
                <label htmlFor="image-upload">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-upload"
                    style={{ display: "none" }}
                  />
                  <Button variant="outlined" component="span">
                    Elegir imagen
                  </Button>
                </label>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
      <EmergencyModal />
      <DenunciasyEmergencias />
    </Box>
  );
};