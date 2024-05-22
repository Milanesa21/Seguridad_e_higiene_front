import React, { useState } from "react";
import "../../public/css/registroempleados.css";

function NumericInput({ numUsuarios, handleChangeNumUsuarios }) {
  return (
    <div className="input-group">
      <input
        id="numeric-input"
        type="number"
        value={numUsuarios}
        onChange={handleChangeNumUsuarios}
        className="input"
        min="1"
        required
      />
      <label className="label" htmlFor="numeric-input">
        Número de Usuarios
      </label>
    </div>
  );
}

export default NumericInput;
