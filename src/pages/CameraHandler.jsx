import { useEffect, useRef, useCallback } from "react";

export const CameraHandler = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef?.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) onCapture(blob);
        });
      }
    }
  }, [onCapture]);

  useEffect(() => {
    startCamera();

    const intervalId = setInterval(() => {
      captureFrame();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [captureFrame]);

  return (
    <>
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        style={{ borderRadius: 8 }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          display: "none",
        }}
      />
    </>
  );
};
