import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

export const PieChartComponent = ({ endpoint, idEmpresa, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${endpoint}/${idEmpresa}`);
        const estadisticas = response.data;

        // Formatear los datos para el gráfico
        const formattedData = Object.keys(estadisticas).map(key => ({
          id: key,
          value: estadisticas[key],
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [endpoint, idEmpresa]);

  return (
    <div>
      <h2>{title}</h2>
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={400}
      />
    </div>
  );
};

