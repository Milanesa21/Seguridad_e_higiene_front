import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography, Paper, Grid, IconButton, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer"

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const gridStyles = {
  height: 400,
  width: "100%",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#1976d2",
    color: "white",
    fontSize: 16,
  },
  "& .MuiDataGrid-cell": {
    backgroundColor: "background.default",
    borderBottom: "1px solid #e0e0e0",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#f5f5f5",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#e3f2fd",
    "&:hover": {
      backgroundColor: "#d0e7fa",
    },
  },
  "& .MuiCheckbox-root": {
    color: "#1976d2",
  },
};

export const PanelPermisos = () => {
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Usuarios/user/all");
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/permiso/role/getPermissions");
      if (response.ok) {
        const data = await response.json();
        setPermissions(data);
      } else {
        console.error("Failed to fetch permissions");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Usuarios/user/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data.Usuario || null);
      } else {
        console.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchUsers();
  }, []);

  const handleOpen = (user) => {
    fetchUserById(user.id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const handlePermissionAdd = async (permission, user) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/permiso/role/addPermission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_user: user.id, id_permiso: permission.id }),
      });
      if (response.ok) {
        fetchUserById(user.id);
      } else {
        console.error("Error adding permission:", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handlePermissionRemove = async (permission, user) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/permiso/role/removePermission", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_user: user.id, id_permiso: permission.id }),
      });
      if (response.ok) {
        fetchUserById(user.id);
      } else {
        console.error("Error removing permission:", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleCheckboxChange = (permission, user) => {
    if (!selectedUser) return;
    const userHasPermission = selectedUser.rol.permisos.includes(permission.nombre_permiso);
    userHasPermission ? handlePermissionRemove(permission, user) : handlePermissionAdd(permission, user);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre de Usuario", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    nombre: user.full_name,
    email: user.email,
  }));

  return (
    <div>
      <Navbar /><br/><br/><br/><br/>
      <br/> 
      <Box p={3} component={Paper} elevation={3} sx={{ borderRadius: 2, mt: 3, mx: 'auto', maxWidth: 900 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios y Permisos
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          Administra los permisos asignados a los usuarios del sistema.
        </Typography>
        <Box sx={gridStyles}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-permission-modal-title"
        aria-describedby="edit-permission-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-permission-modal-title" variant="h6" component="h2" mb={2}>
            Permisos de {selectedUser?.full_name}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Permiso</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.map((permission) => {
                  const userHasPermission = selectedUser?.rol.permisos.includes(permission.nombre_permiso);
                  return (
                    <TableRow key={permission.id}>
                      <TableCell>{permission.nombre_permiso}</TableCell>
                      <TableCell style={{ color: userHasPermission ? "green" : "red" }}>
                        {userHasPermission ? "Permitido" : "No permitido"}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={userHasPermission}
                          onChange={() => handleCheckboxChange(permission, selectedUser)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
                Confirmar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" onClick={handleClose} fullWidth>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};
