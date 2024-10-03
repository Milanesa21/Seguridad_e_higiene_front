import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/file/images/`);
    return response.data.images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const deleteImage = async (public_id) => {
  try {
    await axios.delete(`${API_URL}/file/${public_id}`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};