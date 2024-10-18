import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, Snackbar, Alert, Typography, CircularProgress, Container, Box } from '@mui/material';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { ImageService } from '../../service/imageService';
import { useAuth } from '../../context/AuthProvider';

export const ImageGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [empresaId, setEmpresaId] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user && (user?.id_empresa !== undefined || user?.id_empresa !== null)) {
      setEmpresaId(user.id_empresa);
    }
  }, [empresaId, user]);

  useEffect(() => {
    const fetchImages = async () => {
      if (empresaId === undefined || empresaId === '') return;
      console.log(empresaId);
      try {
        const response = await ImageService.getImages(empresaId);
        const imageList = await response.json();
  
        // Verificar que imageList y imageList.images estén definidos
        if (imageList && Array.isArray(imageList.images)) {
          if (imageList.images.length === 0) {
            setAlertMessage('No hay imágenes cargadas.');
            setAlertType('info'); // Cambiar a 'info' para mensajes informativos
            setOpen(true);
            setImageUrls([]); // Establecer imageUrls como vacío
          } else {
            const urls = imageList.images.map(image => ({
              ...image,
              uploaded_at: new Date(image.uploaded_at),
              id_empresa: empresaId
            }));
            setImageUrls(urls);
            setAlertMessage('Imágenes cargadas correctamente');
            setAlertType('success');
            setOpen(true);
          }
        } else {
          // Manejar el caso en que imageList.images no está definido
          setAlertMessage('No se pudo cargar las imágenes.');
          setAlertType('error');
          setOpen(true);
          setImageUrls([]);
        }
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
  }, [empresaId]);
  

  const handleDelete = async (public_id) => {
    setDeleting(true);
    try {
      await ImageService.deleteImage(public_id);
      setImageUrls(imageUrls.filter(image => image.public_id !== public_id));
      setAlertMessage('Imagen eliminada correctamente');
      setAlertType('success');
    } catch (err) {
      setAlertType('error');
      setAlertMessage('Error al eliminar la imagen');
    } finally {
      setOpen(true);
      setDeleting(false);
    }
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(image.public_id)}
                  disabled={deleting}
                >
                  {deleting ? <CircularProgress size={24} /> : 'Eliminar'}
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
