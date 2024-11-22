import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landingimage from "../../public/img/fondoinicio.jpg";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);

  const handleScroll = () => {
    const sections = document.querySelectorAll(".section");
    let currentSection = 0;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSection = index;
      }
    });
    setActiveSection(currentSection);

    // Check if cards are in viewport
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setTimeout(() => {
          setCardsVisible((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 300); // Delay of 300ms between each card
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const section = document.getElementById(`section-${index}`);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e0f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Barra lateral de puntos */}
      <div
        style={{
          position: "fixed",
          right: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        {["section-0", "section-1", "section-2"].map((id, index) => (
          <div
            key={id}
            onClick={() => scrollToSection(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              marginBottom: "8px",
              cursor: "pointer",
              backgroundColor: activeSection === index ? "#fff" : "#888",
              transition: "transform 0.3s",
              boxShadow:
                activeSection === index
                  ? "0 0 10px rgba(255, 255, 255, 0.5)"
                  : "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          />
        ))}
      </div>

      {/* Sección de cabecera */}
      <header
        id="section-0"
        className="section"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${landingimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div
          style={{ position: "relative", textAlign: "center", padding: "1rem" }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            Centinela
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "1.5rem",
              color: "#f0f0f0",
            }}
          >
            Tu asistente en seguridad e higiene laboral
          </p>
          <Link to="/LoginReplace">
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Comienza Ahora
            </button>
          </Link>
        </div>
      </header>

      {/* Sección de características */}
      <section
        id="section-1"
        className="section"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0099cc, #003d66)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              borderTop: "transparent",
              marginBottom: "2rem",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            ¿Por qué elegir Centinela?
          </h2>
          <div
            style={{
              display: "grid",
              gap: "2rem",
              borderTop: "transparent",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {[
              "Consultas en Tiempo Real",
              "Asesoría 24/7",
              "Actualización Continua",
            ].map((text, index) => (
              <div
                key={index}
                className={`card ${cardsVisible[index] ? "visible" : ""}`}
                style={{
                  backgroundColor: "#fff",
                  color: "#007bff",
                  padding: "1.5rem",
                  borderTop: "transparent",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: cardsVisible[index] ? 1 : 0,
                  transform: cardsVisible[index]
                    ? "translateY(0)"
                    : "translateY(50px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    borderTop: "transparent",
                    marginBottom: "1rem",
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {text}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#333",
                    lineHeight: "1.2",
                    textAlign: "center",
                    maxWidth: "80%",
                    margin: "0 auto",
                    letterSpacing: "0.07em",
                  }}
                >
                  {index === 0
                    ? "Obtén respuestas rápidas sobre seguridad laboral y prevención de riesgos."
                    : index === 1
                    ? "Asesoría a cualquier hora, siempre lista para ayudarte."
                    : "Información actualizada con normativas y prácticas de seguridad."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section
        id="section-2"
        className="section"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${landingimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "2.5rem",
              borderTop: "transparent",
              fontWeight: "bold",
              marginBottom: "1rem",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            ¡Únete a Centinela Hoy!
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              maxWidth: "600px",
              margin: "0 auto",
              color: "#f0f0f0",
              lineHeight: "1.6",
            }}
          >
            Mejora la seguridad en tu lugar de trabajo con asesoría profesional
            y siempre actualizada.
          </p>
          <Link to="/MailRegistro">
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#fff",
                color: "#007bff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Regístrate Aqui
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}