import React from 'react';
import Slider from 'react-slick';
import { PieChartComponent } from './PieChartComponent';

export const CarouselComponent = ({ idEmpresa }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      <div>
        <PieChartComponent
          endpoint="/Agropecuario/estadisticas"
          idEmpresa={idEmpresa}
          title="Estadísticas Agropecuario"
        />
      </div>
      <div>
        <PieChartComponent
          endpoint="/Construccion/estadisticas"
          idEmpresa={idEmpresa}
          title="Estadísticas Construcción"
        />
      </div>
      <div>
        <PieChartComponent
          endpoint="/Electricidad/estadisticas"
          idEmpresa={idEmpresa}
          title="Estadísticas Electricidad"
        />
      </div>
      <div>
        <PieChartComponent
          endpoint="/Quimica/estadisticas"
          idEmpresa={idEmpresa}
          title="Estadísticas Química"
        />
      </div>
    </Slider>
  );
};
