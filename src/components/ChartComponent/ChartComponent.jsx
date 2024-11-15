import React from 'react';
import { CarouselComponent } from './CarrouselComponent';

export const ChartFinal = () => {
  const idEmpresa = 1; // Reemplaza esto con el ID de la empresa que deseas consultar

  return (
    <div>
      <h1>Estadísticas de Sectores de Trabajo</h1>
      <CarouselComponent idEmpresa={idEmpresa} />
    </div>
  );
};

