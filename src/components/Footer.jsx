import React from "react";
import "../../public/css/components/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-column">
          <h5>SRT y ART</h5>
          <p>SRT: Sistema de Riesgos del Trabajo</p>
          <p>ART: Aseguradora de Riesgos del Trabajo</p>
          <p>Más información en: <a href="https://www.srt.gob.ar" target="_blank" rel="noopener noreferrer">www.srt.gob.ar</a></p>
        </div>
        <div className="footer-column">
          <h5>Contacto</h5>
          <p>Dirección: Sarmiento 1962, CABA</p>
          <p>Teléfono: 0-800-666-6778</p>
          <p>Correo electrónico: ayuda@srt.gob.ar</p>
        </div>
        <div className="footer-column">
          <h5>Horario de Atención</h5>
          <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
          <p>Sábados: 10:00 AM - 2:00 PM</p>
          <p>Domingos: Cerrado</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Centinela. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};
