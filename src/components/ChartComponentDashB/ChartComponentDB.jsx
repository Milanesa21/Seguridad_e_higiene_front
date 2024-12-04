import { CarouselComponentDB } from "./CarrouselComponentDB";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

export const ChartFinalDB = () => {
  const { user } = useAuth();
  const [idEmpresa, setIdEmpresa] = useState(null);

  useEffect(() => {
    console.log("user", user);
    setIdEmpresa(user?.id_empresa);
  }, [idEmpresa, user]);

  return (
    <div>
      <h1>Estadísticas de Sectores de Trabajo</h1>
      <CarouselComponentDB idEmpresa={idEmpresa} />
    </div>
  );
};
