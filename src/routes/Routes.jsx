import App from "../App.jsx";
import { Login } from "../page/Login.jsx";
import { PasswordChange } from "../page/PasswordChange.jsx";
import { ProtectRoutes } from "./ProtectRoutes.jsx";
import { Registroempleados } from "../page/registroempleados.jsx";
import { Registroempresa } from "../page/registroempresa.jsx";
import { Chat } from "../page/Jorgito.jsx";
import { InspectionForm } from "../components/Inspecciones/InspeccionFormat.jsx"

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <ProtectRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      }
    ]
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
    path: "/Inspeccion",
    element: <InspectionForm />,
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
