import { useState } from "react";
import { EmailService } from "../service/emailService";
export const MailRegistro = () => {
  const [empresa, setEmpresa] = useState({
    empresa: "",
    dueno: "",
    email: "",
    telefono: "",
  });

  const handleInputChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empresa){
      return;
    }
    try{
      EmailService.createCompany(empresa);
      alert('Registro enviado correctamente');
    }
    catch (error){
      console.error('Error:', error);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "24px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "16px",
          textAlign: "center",
          color: "#333333",
        }}
      >
        Formulario de Registro
      </h2>
      <p
        style={{
          color: "#666666",
          marginBottom: "24px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          width: "70%",
          fontSize: "0.8rem",
        }}
      >
        Complete los siguientes campos para registrar su empresa en nuestra
        aplicación.
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>
        <div>
          <label
            style={{ color: "#333333", fontWeight: "600", fontSize: "0.95rem" }}
          >
            Nombre de la Empresa
          </label>
          <input
            type="text"
            placeholder="Nombre legal de la empresa"
            onChange={handleInputChange}
            name="empresa"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "8px",
              border: "1px solid #cccccc",
              borderRadius: "4px",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div>
          <label
            style={{ color: "#333333", fontWeight: "600", fontSize: "0.95rem" }}
          >
            Nombre del Dueño
          </label>
          <input
            type="text"
            placeholder="Nombre y cargo"
            onChange={handleInputChange}
            name="dueno"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "8px",
              border: "1px solid #cccccc",
              borderRadius: "4px",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div>
          <label
            style={{ color: "#333333", fontWeight: "600", fontSize: "0.95rem" }}
          >
            Correo Electrónico de Contacto
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            onChange={handleInputChange}
            name="email"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "8px",
              border: "1px solid #cccccc",
              borderRadius: "4px",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div>
          <label
            style={{ color: "#333333", fontWeight: "600", fontSize: "0.95rem" }}
          >
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            placeholder="Número de teléfono"
            onChange={handleInputChange}
            name="telefono"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "8px",
              border: "1px solid #cccccc",
              borderRadius: "4px",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "16px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            fontWeight: "600",
            borderRadius: "4px",
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Enviar Registro
        </button>
      </form>
    </div>
  );
};
