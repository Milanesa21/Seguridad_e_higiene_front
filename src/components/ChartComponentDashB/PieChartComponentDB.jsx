import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { SectorService } from "../../service/sectorService";

export const PieChartComponentDB = ({ endpoint, idEmpresa, title }) => {
  const [allData, setAllData] = useState({}); // Estado para guardar todos los datos de la API
  const [dataCheck, setDataCheck] = useState([]); // Datos formateados para el gráfico
  const [sectors, setSectors] = useState([]); // Lista de sectores
  const [selectedSector, setSelectedSector] = useState(""); // Sector seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estadisticas = await SectorService.getEstadisticas(
          endpoint,
          idEmpresa
        );
        const data = await estadisticas.json();

        // Guardar todos los datos de la API
        setAllData(data);

        // Obtener sectores disponibles
        const sectorKeys = Object.keys(data);
        setSectors(sectorKeys);

        // Tomar el primer sector como predeterminado
        if (sectorKeys.length > 0) {
          setSelectedSector(sectorKeys[0]);
          setDataCheck(formatSectorData(data, sectorKeys[0]));
        }
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    if (idEmpresa !== null && idEmpresa !== undefined) {
      fetchData();
    }
  }, [endpoint, idEmpresa]);

  const formatSectorData = (data, sector) => {
    // Formatear los datos como porcentajes directos
    const sectorData = data[sector] || {};
    return Object.keys(sectorData).map((key) => ({
      id: key, // Identificador interno
      label: `${key} (${(sectorData[key] * 100).toFixed(0)}%)`, // Etiqueta con porcentaje
      value: sectorData[key], // Valor original (para uso interno del gráfico)
    }));
  };

  const handleSectorChange = (event) => {
    const newSector = event.target.value;
    setSelectedSector(newSector);

    // Actualizar los datos del gráfico según el sector seleccionado
    if (allData[newSector]) {
      setDataCheck(formatSectorData(allData, newSector));
    }
  };

  return (
    <div>
      <h4 style={{ textAlign: "center" }}>{title}</h4>
      {sectors.length > 0 && (
        <div>
          <label htmlFor="sector-select">Seleccionar Sector:</label>
          <select
            id="sector-select"
            value={selectedSector}
            onChange={handleSectorChange}
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      )}
      <PieChart
        series={[
          {
            data: dataCheck,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            labelKey: "label", // Mostrar las etiquetas con nombres y porcentajes
            valueKey: "value", // Usar los valores numéricos para el gráfico
          },
        ]}
        height={300}
      />
    </div>
  );
};
