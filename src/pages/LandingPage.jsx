import { useEffect, useRef, useState } from "react";
import ShadowDOM from "react-shadow";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

//shadowdom es una verga

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);
  const shadowRootRef = useRef(null);
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
      });
      AOS.refresh();
    };

    if (shadowRootRef.current) {
      const shadowRoot = shadowRootRef.current.shadowRoot;

      // Insertar los estilos de AOS dentro del Shadow DOM
      const aosStyle = document.createElement("link");
      aosStyle.rel = "stylesheet";
      aosStyle.href =
        "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css";
      shadowRoot.appendChild(aosStyle);

      // Agregar también los estilos de Tailwind
      const tailwindStyle = document.createElement("style");
      tailwindStyle.textContent = `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      `;
      shadowRoot.appendChild(tailwindStyle);

      // Inicializar AOS dentro del Shadow DOM
      setTimeout(initAOS, 500);

      // Crear los estilos para la animación de entrada dentro del Shadow DOM
      const animationStyle = document.createElement("style");
      animationStyle.textContent = `
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      shadowRoot.appendChild(animationStyle);

      // Usar IntersectionObserver para activar la animación
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.5 } // El elemento debe estar al 50% en el viewport
      );

      const elements = shadowRoot.querySelectorAll(".fade-in");
      setEffect(elements);
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [effect]);

  const handleScroll = () => {
    const sections =
      shadowRootRef.current.shadowRoot.querySelectorAll(".section");
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
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const section = shadowRootRef.current.shadowRoot.getElementById(
      `section-${index}`
    );
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ShadowDOM.div ref={shadowRootRef}>
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-cyan-400 text-white font-sans">
        {/* Barra lateral de puntos */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-10">
          {["section-0", "section-1", "section-2"].map((id, index) => (
            <div
              key={id}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 transform hover:scale-125 
              ${activeSection === index ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>

        {/* Sección de cabecera */}
        <header
          className="section relative min-h-screen bg-cover bg-center flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-indigo-700"
          style={{
            backgroundImage: `url('../../public/img/fondoinicio.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          id="section-0"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative text-center px-6 md:px-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Centinela
            </h1>
            <p className="text-lg md:text-xl mb-6 font-light">
              Tu asistente en seguridad e higiene laboral
            </p>
            <Link to="/Login">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105">
                Comienza Ahora
              </button>
            </Link>
          </div>
        </header>

        {/* Sección de características */}
        <section
          className="section min-h-screen bg-gradient-to-bl from-blue-700 to-cyan-400 text-center flex items-center justify-center"
          id="section-1"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-white">
              ¿Por qué elegir Centinela?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              <div className="fade-in bg-white text-blue-600 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Consultas en Tiempo Real
                </h3>
                <p>
                  Obtén respuestas rápidas sobre seguridad laboral y prevención
                  de riesgos.
                </p>
              </div>
              <div className="fade-in bg-white text-blue-600 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Asesoría 24/7</h3>
                <p>Asesoría a cualquier hora, siempre lista para ayudarte.</p>
              </div>
              <div className="fade-in bg-white text-blue-600 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Actualización Continua
                </h3>
                <p>
                  Información actualizada con normativas y prácticas de
                  seguridad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de llamada a la acción */}
        <section
          className="section min-h-screen py-16 bg-gradient-to-b from-blue-700 to-cyan-500 text-background text-center flex items-center justify-center"
          id="section-2"
        >
          <div className="text-center">
            <h2 className="text-9xl md:text-5xl font-semibold mb-4">
              ¡Únete a Centinela Hoy!
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
              Mejora la seguridad en tu lugar de trabajo con asesoría
              profesional y siempre actualizada.
            </p>
            <Link to="/MailRegistro">
              <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Regístrate Gratis
              </button>
            </Link>
          </div>
        </section>
      </div>
    </ShadowDOM.div>
  );
}
