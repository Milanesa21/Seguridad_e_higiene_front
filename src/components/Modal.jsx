import React, { useState } from "react";
import { Modal, Button, Input } from "antd"; // Asegúrate de instalar antd si no lo has hecho

const UploadModal = ({ onClose, onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Por favor, selecciona un archivo PDF.");
    }
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    } else {
      alert("Por favor, selecciona un archivo PDF.");
    }
  };

  return (
    <Modal
      title="Subir archivo PDF"
      visible
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpload}>
          Subir
        </Button>,
      ]}
    >
      <Input type="file" onChange={handleFileChange} />
    </Modal>
  );
};

export default UploadModal;