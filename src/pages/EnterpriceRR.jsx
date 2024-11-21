import "../../public/LoginReplace.css";
import { Navbar } from "../components/Navbar.jsx";

export const EnterpriceRR = () => {
  return (
    <div className="prueba">
      <Navbar />
      <div className="formcontainterlr">
        <div className="container">
          <div className="heading">Bienvenido</div>
          <form action="" className="form">
            <input
              required
              className="inputlr"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <input
              required
              className="inputlr"
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            />
            <span className="forgot-password">
              <a href="#">Olvidaste tu contraseña ?</a>
            </span>
            <input className="login-button" type="submit" value="Ingresar" />
          </form>
        </div>
      </div>
    </div>
  );
};
