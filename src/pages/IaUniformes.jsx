import { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EmergencyModal } from '../components/EmergencyModal';
import styles from "../../public/css/pages/AmbienteEvaluation.module.css";
import { DenunciasyEmergencias } from "../components/DenunciasyEmergencias";


export const UniformeEvaluation = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const captureAndEvaluateFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob);

      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/predict/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResult(data.message);
      } catch (error) {
        console.error('Error:', error);
        setResult('An error occurred');
      } finally {
        setLoading(false);
      }
    });
  };

  const startVideoEvaluation = () => {
    const id = setInterval(captureAndEvaluateFrame, 1000); // Captura y envía un fotograma cada segundo
    setIntervalId(id);
  };

  const stopVideoEvaluation = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    startCamera();
    startVideoEvaluation();

    return () => {
      stopVideoEvaluation();
    };
  }, []);

  return (
    <div className={`container-fluid ${styles.container}`}>
      <Navbar />
      <div className={`d-flex flex-column justify-content-center align-items-center  ${styles.mainContent}`}>
        
          <div className="text-center">
            <h1 className="mb-4">Evaluar uniformes de Seguridad</h1>
            
            <div className="mb-3">
              <video ref={videoRef} width="800" height="800" autoPlay className={`img-thumbnail ${styles.largerVideo}`} />
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} width="800" height="800"></canvas>

            {loading && (
              <div className="mb-3">
                <div className={`spinner-border text-primary ${styles.spinner}`} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            {result && (
               <div className={`alert ${result === 'Indumentaria no Correspondiente' ? styles.alertDanger : styles.alertInfo} mt-3`}>
                <p>{result}</p>
              </div>
            )}
          </div>
    
      </div>
      <Footer />
      <EmergencyModal />
      <DenunciasyEmergencias />
    </div>
  );
};