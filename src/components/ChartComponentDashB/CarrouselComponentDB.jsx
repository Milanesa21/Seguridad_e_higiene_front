import Slider from "react-slick";
import { PieChartComponentDB } from "./PieChartComponentDB";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export const CarouselComponentDB = () => {
  const [idEmpresa, setIdEmpresa] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setIdEmpresa(user.id_empresa);
    }
  }, [user]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const sectores = [
    { sector: "Agropecuario", title: "Estadísticas Agropecuario" },
    { sector: "Construccion", title: "Estadísticas Construcción" },
    { sector: "Electricidad", title: "Estadísticas Electricidad" },
    { sector: "Quimica", title: "Estadísticas Química" },
  ];

  // Renderizar solo componentes que tienen datos
  const renderCharts = sectores.map(({ sector, title }) => (
    <PieChartComponentDB
      key={sector}
      endpoint={sector}
      idEmpresa={idEmpresa}
      title={title}
    />
  )).filter((chart) => chart !== null); // Filtrar componentes nulos

  if (renderCharts.length === 0) {
    return <p style={{ textAlign: "center" }}>No hay datos disponibles.</p>; // Mostrar mensaje si no hay datos
  }

  return <Slider {...settings}>{renderCharts}</Slider>;
};
