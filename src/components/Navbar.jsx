import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { CerrarSesion } from "./CerrarSesion";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "/public/Logoo.webp";
import "../../public/css/components/nav.css";

export const Navbar = () => {
  const { state, user } = useContext(AuthContext);
  const [rolId, setRolId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorElRegistros, setSubMenuAnchorElRegistros] =
    useState(null);
  const [subMenuAnchorElHerramientas, setSubMenuAnchorElHerramientas] =
    useState(null);
  const [subMenuAnchorElChecklists, setSubMenuAnchorElChecklists] =
    useState(null);
  const [subMenuAnchorElIA, setSubMenuAnchorElIA] = useState(null);
  const [subMenuAnchorElPaneles, setSubMenuAnchorElPaneles] =
    useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isSubMenuRegistrosOpen = Boolean(subMenuAnchorElRegistros);
  const isSubMenuHerramientasOpen = Boolean(subMenuAnchorElHerramientas);
  const isSubMenuChecklistsOpen = Boolean(subMenuAnchorElChecklists);
  const isSubMenuIAOpen = Boolean(subMenuAnchorElIA);
  const isSubMenuPanelesOpen = Boolean(subMenuAnchorElPaneles);
  


  
  useEffect(() => {
    if (user?.rol?.id) {
      setRolId(user?.rol?.id);
    } else if (user?.id_role) {
      setRolId(user?.id_role);
    } else {
      setRolId("");
    }
  }, [user]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubMenuAnchorElRegistros(null);
    setSubMenuAnchorElHerramientas(null);
    setSubMenuAnchorElChecklists(null);
    setSubMenuAnchorElIA(null);
    setSubMenuAnchorElPaneles(null);
  };

  const handleSubMenuRegistrosOpen = (event) => {
    setSubMenuAnchorElRegistros(event.currentTarget);
  };

  const handleSubMenuHerramientasOpen = (event) => {
    setSubMenuAnchorElHerramientas(event.currentTarget);
  };

  const handleSubMenuChecklistsOpen = (event) => {
    setSubMenuAnchorElChecklists(event.currentTarget);
  };

  const handleSubMenuIAOpen = (event) => {
    setSubMenuAnchorElIA(event.currentTarget);
  };

  const handleSubMenuPanelesOpen = (event) => {
    setSubMenuAnchorElPaneles(event.currentTarget);
  };

  return (
    <AppBar sx={{ backgroundColor: "#000f1d" }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "60px", marginRight: "15px" }}
          />
          <Typography
            variant="h5"
            component="a"
            href="/inicio"
            color="inherit"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Centinela
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            endIcon={<ExpandMoreIcon />}
          >
            Otras Opciones
          </Button>
          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            {state.logged ? (
              <MenuItem onClick={handleMenuClose}>
                <CerrarSesion />
              </MenuItem>
            ) : (
              <>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/LoginReplace"
                >
                  Inicio de sesión
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/LoginEmpresa"
                >
                  Inicio de sesión como empresa
                </MenuItem>
              </>
            )}

            {/* Submenú "Registros" */}
            <MenuItem onClick={handleSubMenuRegistrosOpen}>
              Registros <ExpandMoreIcon />
            </MenuItem>
            <Menu
              anchorEl={subMenuAnchorElRegistros}
              open={isSubMenuRegistrosOpen}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="/EmployeeRR"
              >
                Registro empleados
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="/EnterpriceRR"
              >
                Registro empresa
              </MenuItem>
            </Menu>
            {/* Submenú "Herramientas" */}
            <MenuItem onClick={handleSubMenuHerramientasOpen}>
              Herramientas <ExpandMoreIcon />
            </MenuItem>
            <Menu
              anchorEl={subMenuAnchorElHerramientas}
              open={isSubMenuHerramientasOpen}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="/Inspeccion"
              >
                Inspecciones de seguridad
              </MenuItem>
              <MenuItem onClick={handleSubMenuChecklistsOpen}>
                Checklists <ExpandMoreIcon />
              </MenuItem>
              {/* Submenú "Checklists" */}
              <Menu
                anchorEl={subMenuAnchorElChecklists}
                open={isSubMenuChecklistsOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/InspeccionChecklist"
                >
                  Inspeccion Checklist
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/ConstruccionChecklist"
                >
                  Construccion Cheklist
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/QuimicaChecklist"
                >
                  Quimica Cheklist
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/ElectricidadChecklist"
                >
                  Electricidad Cheklist
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/AgropecuarioChecklist"
                >
                  Agropecuario Cheklist
                </MenuItem>
              </Menu>
              <MenuItem onClick={handleSubMenuIAOpen}>
                IA <ExpandMoreIcon />
              </MenuItem>
              {/* Submenú "IA" */}
              <Menu
                anchorEl={subMenuAnchorElIA}
                open={isSubMenuIAOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/Jorgito"
                  target="_blank"
                >
                  Asistente virtual
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/IaAmbientes"
                >
                  Reconocimiento de ambientes
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/IaUniformes"
                >
                  Verificación de equipos
                </MenuItem>
              </Menu>
            </Menu>
            <MenuItem onClick={handleSubMenuPanelesOpen}>
              Paneles <ExpandMoreIcon />
            </MenuItem>
            <Menu
              anchorEl={subMenuAnchorElPaneles}
              open={isSubMenuPanelesOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component="a" href="/Panel">
                Panel De Seguridad
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="/PanelPermisos"
              >
                Panel De Permisos
              </MenuItem>
            </Menu>
            <MenuItem
              onClick={handleMenuClose}
              component="a"
              href="/GaleriaInspecciones"
            >
              Galería de inspecciones
            </MenuItem>
          </Menu>
        </Box>
        {state?.logged && (
          <Box ml={2}>
            <Typography>{user?.full_name || "Bruce Wayne"}</Typography>
          </Box>
        )}
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleMenuOpen}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
