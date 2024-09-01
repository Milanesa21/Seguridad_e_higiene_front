import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EmergencyModal } from '../components/EmergencyModal';
import styles from "../../public/css/pages/AmbienteEvaluation.module.css";

export const AmbienteEvaluation = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const evaluateImage = async () => {
      if (!image) return;

      setLoading(true);

      const formData = new FormData();
      formData.append('file', image);

      try {
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
    };

    evaluateImage();
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={`${styles.mainContent} container`}>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className={styles.heading}>Evaluar Ambiente</h1>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className={`form-control ${styles.fileInput}`} 
            />

            {loading && (
              <div className="mb-3">
                <div className={`spinner-border text-primary ${styles.spinner}`} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            {imagePreview && !loading && (
              <div className="mb-3">
                <h2>Image Preview:</h2>
                <img 
                  src={imagePreview} 
                  alt="Selected" 
                  className={`img-thumbnail ${styles.imagePreview}`} 
                  style={{ 
                    border: result === 'Falla de seguridad' ? '5px solid red' : '5px solid #dee2e6' 
                  }} 
                />
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
