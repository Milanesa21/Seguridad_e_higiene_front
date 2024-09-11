import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EmergencyModal } from '../components/EmergencyModal';
import styles from "../../public/css/pages/AmbienteEvaluation.module.css";

export const AmbienteEvaluation = () => {
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
        const response = await fetch('http://127.0.0.1:8000/predict/ambiente', {
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
    <div className={styles.container}>
      <Navbar />
      <div className={`${styles.mainContent} container`}>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="mb-4">Evaluar Ambiente</h1>
            
            <div className="mb-3">
              <video ref={videoRef} width="300" height="300" autoPlay className="img-thumbnail" />
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="300"></canvas>

            {loading && (
              <div className="mb-3">
                <div className={`spinner-border text-primary ${styles.spinner}`} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            {result && (
              <div className={`alert ${result === 'Falla de seguridad' ? styles.alertDanger : styles.alertInfo} mt-3`}>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <EmergencyModal />
    </div>
  );
};
