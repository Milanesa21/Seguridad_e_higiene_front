import Slider from 'react-slick';
import { PieChartComponent } from './PieChartComponent';

export const CarouselComponent = ({ idEmpresa }) => {
  console.log('idEmpresa', idEmpresa);
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
    { sector: 'Agropecuario', title: 'Estadísticas Agropecuario' },
    { sector: 'Construccion', title: 'Estadísticas Construcción' },
    { sector: 'Electricidad', title: 'Estadísticas Electricidad' },
    { sector: 'Quimica', title: 'Estadísticas Química' },
    
  ];

  return (
    <Slider {...settings}>
      {sectores.map(({ sector, title }) => (
        <PieChartComponent key={sector} endpoint={sector} idEmpresa={idEmpresa} title={title} />
      ))}
    </Slider>
  );
};
