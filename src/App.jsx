import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { CMasJugado } from "./components/CMasJugado.jsx";
import { CMasKills } from "./components/CMasKills.jsx";
import { Flash } from "./components/Flash.jsx";
import { MasDObjetivos } from "./components/MasDObjetivos.jsx";
import { RolMasJugado } from "./components/RolMasJugado.jsx";
import { MuertesRol } from "./components/MuertesRol.jsx";
import { CMasVictorias } from "./components/CMasVictorias.jsx";
import { CMasDerrotas } from "./components/CMasDerrrotas.jsx";

function App() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <CMasJugado />
      <CMasKills />
      <Flash />
      <MasDObjetivos />
      <MuertesRol />
      <RolMasJugado />
      <CMasVictorias />
      <CMasDerrotas />
      <br />
      <Footer />
    </>
  );
}

export default App;
