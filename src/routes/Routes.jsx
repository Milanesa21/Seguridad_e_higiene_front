import App from "../App.jsx";
import { Login } from "../pages/Login.jsx";
import { PasswordChange } from "../pages/PasswordChange.jsx";
import { ProtectRoutes } from "./ProtectRoutes.jsx";
import { Registroempleados } from "../pages/registroempleados.jsx";
import { Registroempresa } from "../pages/registroempresa.jsx";
import { Chat } from "../pages/Jorgito.jsx";
import { InspectionForm } from "../components/Inspecciones/InspeccionFormat.jsx";
import { Panel } from "../components/Panel de seguridad/Panel.jsx";
import { Perfil } from "../pages/Perfil.jsx";
import { PanelPermisos } from "../components/Panel de seguridad/PanelCambioPermisos.jsx";

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
      },
    ],
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
  {
    path: "Panel",
    element: <Panel />,
  },
  {
    path: "Perfil",
    element: <Perfil />,
  },
  {
    path: 'PanelPermisos',
    element: <PanelPermisos />,
  },
];
