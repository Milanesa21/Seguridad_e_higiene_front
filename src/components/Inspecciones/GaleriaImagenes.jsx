import React, { useEffect, useState } from 'react';
import { getImages, deleteImage } from './api'; // Añadimos deleteImage
import { List, ListItem, ListItemText, Button, Snackbar, Alert, Typography, CircularProgress, Container, Box } from '@mui/material';
import {Navbar} from '../Navbar';
import {Footer} from '../Footer';

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
        const urls = imageList.map(image => ({
          ...image,
          uploaded_at: new Date(image.uploaded_at) // Convertir la fecha a Date
        })); 
        setImageUrls(urls);
        setAlertMessage('Imágenes cargadas correctamente');
        setAlertType('success');
        setOpen(true);
      } catch (err) {
        setError(err);
        setAlertType('error');
        setAlertMessage('Error al cargar las imágenes');
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (public_id) => {
    try {
      await deleteImage(public_id); // Llamada a la función para eliminar la imagen
      setImageUrls(imageUrls.filter(image => image.public_id !== public_id)); // Remover de la lista
      setAlertMessage('Imagen eliminada correctamente');
      setAlertType('success');
    } catch (err) {
      setAlertType('error');
      setAlertMessage('Error al eliminar la imagen');
    }
    setOpen(true);
  };

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
        Error al cargar las imágenes: {error.message}
      </Typography>
    );
  }

  return (
    <>
      <Navbar />
      <br />
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Galería de Imágenes
        </Typography>
        {imageUrls.length === 0 ? (
          <Typography variant="body1" align="center">
            No hay imágenes disponibles
          </Typography>
        ) : (
          <List>
            {imageUrls.map((image, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Imagen subida el ${image.uploaded_at.toLocaleDateString()}`}
                  secondary={image.url}
                />
                <Button variant="outlined" color="primary" href={image.url} target="_blank">
                  Ver inspección
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(image.public_id)}>
                  Eliminar
                </Button>
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
      <Footer />
    </>
  );
};
