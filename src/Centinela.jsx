import React from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { DenunciasyEmergencias } from "./components/DenunciasyEmergencias.jsx";
import { Inicio } from "./components/Inicio.jsx";
import { Seccion3 } from "./components/Seccion3.jsx";
import { Seccion4 } from "./components/Seccion4.jsx";
import { Seccion5 } from "./components/Seccion5.jsx";
import { Seccion6 } from "./components/Seccion6.jsx";
import { Seccion7 } from "./components/Seccion7.jsx";
import "normalize.css";
import "./App.css";
import LoadingScreen from "./components/Loader/LoadingScreen.jsx";



export const Centinela = () => {
return(    
<>
    <LoadingScreen />
    <Navbar />
    <br />
    <br />
    <br />
    <Inicio />
    <DenunciasyEmergencias />
    <Seccion3 />
    <Seccion4 />
 {/*<Seccion5 />
    <Seccion6 />
    <Seccion7 />
    <br />*/}
    <Footer />
  </>
  )
}