import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { SectorService } from "../../service/sectorService";

export const PieChartComponent = ({ endpoint, idEmpresa, title }) => {
  const [dataCheck, setDataCheck] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const estadisticas = await SectorService.getEstadisticas(endpoint, idEmpresa)
        const data = await estadisticas.json();
        const fromData = Object.keys(data).map((key) => ({
          id: key,
          value: data[key],
        }));
        setDataCheck(fromData);
      }
      catch (error) {
        console.error("Error al obtener las estadisticas:",error);
    }
  }
    if (idEmpresa !== null && idEmpresa !== undefined){
      fetchData();
    }
  }, [endpoint, idEmpresa]);

  return (
    <div>
      <h2>{title}</h2>
      <PieChart
        series={[
          {
            data: dataCheck,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={400}
      />
    </div>
  );
};

