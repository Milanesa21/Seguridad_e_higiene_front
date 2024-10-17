import App from "../App.jsx";
import { CambioDatos } from "../pages/cambioDatos.jsx";
import { PasswordChange } from "../pages/PasswordChange.jsx";
import { ProtectRoutes } from "./ProtectRoutes.jsx";
import { Registroempleados } from "../pages/registroempleados.jsx";
import { Chat } from "../pages/Jorgito.jsx";
import { Registroempresa } from "../pages/registroempresa.jsx";
import { InspectionForm } from "../components/Inspecciones/InspeccionFormat.jsx";
import { Panel } from "../components/Panel de seguridad/Panel.jsx";
import { Perfil } from "../pages/Perfil.jsx";
import { PanelPermisos } from "../components/Panel de seguridad/PanelCambioPermisos.jsx";
import { useLoading } from "../context/LoadingContext.jsx";
import React, { useEffect } from "react";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import { LoginEmpresa } from "../pages/LoginEmpresa.jsx";
import { Login } from "../pages/Login.jsx";
import { AmbienteEvaluation } from "../pages/IaAmbientes.jsx";
import { UniformeEvaluation } from "../pages/IaUniformes.jsx";
import { ChecklistForm } from "../components/Inspecciones/InspeccionChecklist.jsx";
import { ImageGallery } from "../components/Inspecciones/GaleriaImagenes.jsx";
import { LoginReplace } from "../pages/LoginReplace.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/LoginEmpresa",
    element: <LoginEmpresa />,
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
    path: "/CambioDatos",
    element: <CambioDatos />,
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
    path: "Jorgito",
    element: <Chat />,
  },
  {
    path: "/InspeccionChecklist",
    element: <ChecklistForm />,
  },
  {
    path: "Registroempresa",
    element: <Registroempresa />,
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
  {
    path: "IaAmbientes",
    element: <AmbienteEvaluation />,
  },
  {
    path: "IaUniformes",
    element: <UniformeEvaluation />,
  },
  {
    path: "GaleriaInspecciones",
    element: <ImageGallery />,
  },
  {
    path: "LoginReplace",
    element: <LoginReplace />,
  }
];

export const RoutesComponent = () => {
  const { setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

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
