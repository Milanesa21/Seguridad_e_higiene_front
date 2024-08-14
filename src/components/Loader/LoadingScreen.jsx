import React from "react";
import Loader from "./Loader.jsx";
import "/public/css/components/loaders/LoadingScreen.css";
import { useLoading } from "../../context/LoadingContext.jsx"; // Nuevo

const LoadingScreen = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <Loader />
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
