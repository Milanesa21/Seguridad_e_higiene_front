import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Fab,
  Container,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { EmailService } from "../service/emailService";
import { useNavigate } from "react-router-dom";

export const MailRegistro = () => {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({
    empresa: "",
    dueno: "",
    email: "",
    telefono: "",
  });

  const handleInputChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empresa) {
      return;
    }
    try {
      EmailService.createCompany(empresa);
      alert("Registro enviado correctamente");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Botón flotante para volver */}
      <Fab
        color="primary"
        aria-label="back"
        onClick={() => navigate("/")}
        style={{ position: "fixed", top: "20px", left: "20px" }}
      >
        <ArrowBackIcon />
      </Fab>

      <Paper elevation={3} style={{ padding: "24px", width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Formulario de Registro
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Complete los siguientes campos para registrar su empresa en nuestra
          aplicación.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <TextField
            label="Nombre de la Empresa"
            name="empresa"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="Nombre del Dueño"
            name="dueno"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="Teléfono de Contacto"
            name="telefono"
            type="tel"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Enviar Registro
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
