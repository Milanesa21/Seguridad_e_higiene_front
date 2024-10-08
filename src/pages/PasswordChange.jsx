import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const PasswordChange = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [isTokenValid, setIsTokenValid] = useState(null); // Para manejar la validez del token
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams(); // Obtener el token de la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Validar el token cuando se cargue el componente
    const validateToken = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/validate-token/${token}`);
        const data = await response.json();
        if (data.valid) {
          setIsTokenValid(true); // Token es válido
        } else {
          setIsTokenValid(false); // Token no es válido
        }
      } catch (error) {
        console.error("Error validando el token", error);
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Contraseña cambiada con éxito");
        navigate("/Login"); // Redirigir al login tras el cambio de contraseña
      } else {
        alert("Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña", error);
    }
  };

  if (isTokenValid === null) {
    return <div>Validando token...</div>;
  }

  if (!isTokenValid) {
    return <div>El token es inválido o ha expirado.</div>;
  }

  return (
    <div className="prueba">
      <div className="ContenedorLogin">
        <div className="contenedordelcontenedor">
          <div className="ContenedorFormulario">
            <h4 className="titulo-Login">Cambio de Contraseña</h4>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type={passwordType}
                  name="new_password"
                  className="input1"
                  id="inputFieldPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="label1" htmlFor="inputFieldPassword">
                  Nueva contraseña
                </label>

                <br />
                <br />

                <input
                  type={passwordType}
                  name="confirm_password"
                  className="input"
                  id="inputFieldConfirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label className="label" htmlFor="inputFieldConfirmPassword">
                  Confirmar contraseña
                </label>

                <div className="containera1" onClick={handleCheckboxChange}>
                  <input type="checkbox" defaultChecked={isChecked} />
                  {/* SVG de ojo para mostrar u ocultar la contraseña */}
                  {/* Aquí sigue tu SVG */}
                </div>
              </div>

              <div className="button-container">
                <button type="submit" className="animated-button">
                  <span>Confirmar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
