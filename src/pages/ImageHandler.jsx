import { useRef, useState } from "react";
import { Button, Box, Typography } from "@mui/material";

export const ImageHandler = ({ onProcess }) => {
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setPreview(e.target.result); // Mostrar la imagen cargada como preview
          const canvas = canvasRef.current;
          if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
              context.drawImage(img, 0, 0, canvas.width, canvas.height);

              canvas.toBlob((blob) => {
                if (blob) onProcess(blob);
              });
            }
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Elegir imagen
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>
      {preview && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            Vista previa:
          </Typography>
          <img
            src={preview}
            alt="Vista previa"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
        </Box>
      )}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
    </Box>
  );
};
