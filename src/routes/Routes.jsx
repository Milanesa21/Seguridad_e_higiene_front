import App from "../App.jsx";
import { Login } from "../page/Login.jsx";
import { PasswordChange } from "../page/PasswordChange.jsx";
import { SeccionEmergencia } from "../page/SeccionEmergencia.jsx";
import { Registroempleados } from "../page/registroempleados.jsx";
import { Registroempresa } from "../page/registroempresa.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/PasswordChange",
    element: <PasswordChange />,
  },
  {
    path: "/SeccionEmergencia",
    element: <SeccionEmergencia />,
  },
  {
    path: "Registroempleados",
    element: <Registroempleados />,
  },
  {
    path: "Registroempresa",
    element: <Registroempresa />,
  },
];
