import "../../public/LoginReplace.css"
import { Navbar } from "../components/Navbar.jsx";

export const LoginReplace = () => {
  return (
    <div className="prueba">
      <Navbar />
      <div className="formcontainterlr">
        <div className="container">
          <div className="heading">Sign In</div>
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
              placeholder="Password"
            />
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
            <input className="login-button" type="submit" value="Sign In" />
          </form>
        </div>
      </div>
    </div>
  );
};

