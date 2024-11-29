import "/public/css/pages/registroempleados.css";

function NumericInput({ numUsuarios, handleChangeNumUsuarios }) {
  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <div className="inputnumerico">
      <label className="label" htmlFor="numeric-input">
        Número de Usuarios
      </label>
      <input
        id="numeric-input"
        className="inputNum"
        type="number"
        value={numUsuarios}
        onChange={handleChangeNumUsuarios}
        onKeyPress={handleKeyPress}
        min="1"
        max="100"
        required
      />
    </div>
  );
}

export default NumericInput;
