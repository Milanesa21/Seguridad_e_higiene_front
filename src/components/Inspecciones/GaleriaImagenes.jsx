import React, { useEffect, useState } from 'react';
import { getImages } from './api';
import { List, ListItem, ListItemText, Snackbar, Alert, Typography, CircularProgress, Container, Box } from '@mui/material';

export const ImageGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageList = await getImages();
        const urls = imageList.map(image => image.url); // Extraer solo las URLs
        setImageUrls(urls);
        setAlertMessage('URLs cargadas correctamente');
        setAlertType('success');
        setOpen(true);
      } catch (err) {
        setError(err);
        setAlertType('error');
        setAlertMessage('Error al cargar las URLs');
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error al cargar las URLs: {error.message}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Lista de URLs de Imágenes
      </Typography>
      {imageUrls.length === 0 ? (
        <Typography variant="body1" align="center">
          No hay imágenes disponibles
        </Typography>
      ) : (
        <List>
          {imageUrls.map((url, index) => (
            <ListItem key={index} button component="a" href={url} target="_blank">
              <ListItemText primary={url} />
            </ListItem>
          ))}
        </List>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
