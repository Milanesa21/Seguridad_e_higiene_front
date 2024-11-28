import App from "../App.jsx";
import {  Inicio} from "../components/Inicio.jsx"
import { CambioDatos } from "../pages/cambioDatos.jsx";
import { PasswordChange } from "../pages/PasswordChange.jsx";
import { Registroempleados } from "../pages/registroempleados.jsx";
import { Chat } from "../pages/Jorgito.jsx";
import { Chat2 } from "../pages/Jorgito2.jsx";
import { Registroempresa } from "../pages/registroempresa.jsx";
import { InspectionForm } from "../components/Inspecciones/InspeccionFormat.jsx";
import { Panel } from "../components/Panel de seguridad/Panel.jsx";
import { PanelPermisos } from "../components/Panel de seguridad/PanelCambioPermisos.jsx";
import { useLoading } from "../context/LoadingContext.jsx";
import { useEffect } from "react";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import { LoginEmpresa } from "../pages/LoginEmpresa.jsx";
import { Login } from "../pages/Login.jsx";
import { AmbienteEvaluation } from "../pages/IaAmbientes.jsx";
import { UniformeEvaluation } from "../pages/IaUniformes.jsx";
import { ChecklistForm } from "../components/Inspecciones/InspeccionChecklist.jsx";
import { ImageGallery } from "../components/Inspecciones/GaleriaImagenes.jsx";
import { LoginReplace } from "../pages/LoginReplace.jsx";
import { ConstruccionChecklistForm } from "../components/Inspecciones/ConstruccionChecklist.jsx";
import { QuimicoChecklistForm } from "../components/Inspecciones/QuimicaChecklist.jsx";
import { AgropecuarioChecklistForm } from "../components/Inspecciones/AgropecuarioChecklist.jsx";
import { ElectricidadChecklistForm } from "../components/Inspecciones/ElectricidadChecklist.jsx";
import { ChartFinal } from "../components/ChartComponent/ChartComponent.jsx"
import { MailRegistro } from "../pages/MailRegistro.jsx";
import { RegisterReplace } from "../pages/RegisterReplace.jsx";
import { EmployeeRR } from "../pages/EmployeeRR.jsx";
import { EnterpriceRR } from "../pages/EnterpriceRR.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Inicio",
    element: <Inicio />
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
    path: "/PasswordChange/:id/:token",
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
    path: "Jorgito2",
    element: <Chat2 />,
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
  },
  {
    path: "ConstruccionChecklist",
    element: <ConstruccionChecklistForm />,
  },
  {
    path: "QuimicaChecklist",
    element: <QuimicoChecklistForm />,
  },
  {
    path: "ElectricidadChecklist",
    element: <ElectricidadChecklistForm />,
  },
  {
    path: "AgropecuarioChecklist",
    element: <AgropecuarioChecklistForm />,
  },
  {
    path: "ChartFinal",
    element: <ChartFinal />,
  },
  {
    path: "MailRegistro",
    element: <MailRegistro />,
  },
  {
    path: "RegisterReplace",
    element: <RegisterReplace />,
  },
  {
    path: "EmployeeRR",
    element: <EmployeeRR />,
  },
  {
    path: "EnterpriceRR",
    element: <EnterpriceRR />,
  },
  {
    path: "Inicio",
    element: <Inicio />,
  },
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
