import App from "../App.jsx";

import { PasswordChange } from "../pages/PasswordChange.jsx";
import { ProtectRoutes } from "./ProtectRoutes.jsx";
import { Registroempleados } from "../pages/registroempleados.jsx";
import { Registroempresa } from "../pages/registroempresa.jsx";
import { Chat } from "../pages/Jorgito.jsx";
import { InspectionForm } from "../components/Inspecciones/InspeccionFormat.jsx";
import { Panel } from "../components/Panel de seguridad/Panel.jsx";
import { Perfil } from "../pages/Perfil.jsx";
import { PanelPermisos } from "../components/Panel de seguridad/PanelCambioPermisos.jsx";
import { useLoading } from "../context/LoadingContext.jsx"; // Nuevo
import React, { useEffect } from "react";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import { Login } from "../pages/Login.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    // path: "/",
    // element: <ProtectRoutes />,
    // children: [
    //   {
    //     path: "/Login",
    //     element: <Login />,
    //   },
    // ],
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
    path: "PanelPermisos",
    element: <PanelPermisos />,
  },
];

export const RoutesComponent = () => {
  const { setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo según prefieras

    return () => clearTimeout(timeout);
  }, [location, setIsLoading]);

  return (
    <RouterRoutes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </RouterRoutes>
  );
};
