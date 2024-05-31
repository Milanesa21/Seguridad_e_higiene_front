import App from "../App.jsx";
import { Login } from "../page/Login.jsx";
import { PasswordChange } from "../page/PasswordChange.jsx";

import { Registroempleados } from "../page/registroempleados.jsx";
import { Registroempresa } from "../page/registroempresa.jsx";
import { Chat } from "../page/Jorgito.jsx";

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
    path: "Registroempleados",
    element: <Registroempleados />,
  },
  {
    path: "Registroempresa",
    element: <Registroempresa />,
  },
  {
    path: "Jorgito",
    element: <Chat />,
  },
];
