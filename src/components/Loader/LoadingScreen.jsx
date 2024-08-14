import React, { useEffect, useState } from "react";
import Loader from "./Loader.jsx";
import "/public/css/components/loaders/LoadingScreen.css";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Duración de la pantalla de carga en milisegundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="loading-screen">
          <Loader />
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
