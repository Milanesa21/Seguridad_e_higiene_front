import React from "react";
import "../../public/css/registroempleados.css";

function NumericInput({ numUsuarios, handleChangeNumUsuarios }) {
  // Función para manejar la entrada de teclas y permitir solo números
  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    // Permitir solo números (charCode 48-57)
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <div className="input-group">
      <input
        id="numeric-input"
        className="input"
        type="number"
        value={numUsuarios}
        onChange={handleChangeNumUsuarios}
        onKeyPress={handleKeyPress}
        min="1"
        max="100"
        required
      />
      <label className="label" htmlFor="numeric-input">
        Número de Usuarios
      </label>
    </div>
  );
}

export default NumericInput;
