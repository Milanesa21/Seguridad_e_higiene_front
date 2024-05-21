import React, { useState } from "react";
import "../../public/css/registroempleados.css";

function NumericInput({ min = 0, max = 100, step = 1 }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue <= max && newValue > min) {
      setValue(newValue);
    }
    if (e.target.value === "") {
      setValue("");
    }
  };

  return (
    <div>
      <div className="input-group">
        <input
          id="numeric-input"
          type="number"
          value={value}
          onChange={handleChange}
          className="input"
          min={min}
          max={max}
          step={step}
          required
        />
        <label className="label" htmlFor="numeric-input">
          Número
        </label>
      </div>
    </div>
  );
}

export default NumericInput;
