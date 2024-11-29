import React, { useState, useCallback } from "react";
import BigCalendar from "react-calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-calendar/dist/Calendar.css";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";

const urgencyColors = {
  Alta: "#FF4C4C", // Rojo
  Media: "#FFA24C", // Naranja
  Baja: "#F6F700", // Amarillo
  Ninguna: "#4CAF50", // Verde
};

let taskId = 0; // Contador para generar IDs únicos

export const GestorTareas = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskColor, setTaskColor] = useState("Ninguna");
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);

  const handleDateChange = useCallback(
    (newDate) => {
      setDate(newDate);
      const formattedDate = newDate.toDateString();
      const tasksForDate = tasks.filter(
        (task) => new Date(task.date).toDateString() === formattedDate
      );
      setSelectedDateTasks(tasksForDate);
    },
    [tasks]
  );

  const handleAddTask = () => {
    if (!taskTitle) {
      alert("Por favor, ingrese un título para la tarea.");
      return;
    }
    const newTask = {
      id: taskId++, // Asignar un ID único a la tarea
      title: taskTitle,
      date: date.toISOString(),
      color: taskColor,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskColor("Ninguna");
    handleDateChange(date);
  };

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskColorChange = (e) => {
    setTaskColor(e.target.value);
  };

  const handleMarkAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    handleDateChange(date);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    handleDateChange(date);
  };

  const formattedDate = format(date, "d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        gap: "20px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Gestor de Tareas
      </Typography>
      {/* Fila superior: Calendario y Controles */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Bloque del Calendario */}
        <Box
          sx={{
            flex: "0 1 80%",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center", // Centra el calendario horizontalmente
            alignItems: "center", // Centra el calendario verticalmente
          }}
        >
          <BigCalendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date }) => {
              const formattedDate = date.toDateString();
              return tasks.some(
                (task) => new Date(task.date).toDateString() === formattedDate
              )
                ? "react-calendar__tile--highlight-task"
                : null;
            }}
            tileContent={({ date }) => {
              const formattedDate = date.toDateString();
              const dayTasks = tasks.filter(
                (task) => new Date(task.date).toDateString() === formattedDate
              );

              if (dayTasks.length > 0) {
                const highestUrgencyColor = dayTasks.reduce((highest, task) => {
                  const colorRank = ["Ninguna", "Baja", "Media", "Alta"];
                  return colorRank.indexOf(task.color) >
                    colorRank.indexOf(highest)
                    ? task.color
                    : highest;
                }, "Ninguna");

                return (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: urgencyColors[highestUrgencyColor],
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  ></div>
                );
              }

              return null;
            }}
            style={{
              width: "100%", // Ajusta el ancho completo del contenedor
              maxWidth: "1000px", // Tamaño máximo para que no crezca demasiado
              fontSize: "1.5rem", // Incrementa el tamaño del texto
            }}
          />
        </Box>

        {/* Bloque de Controles */}
        <Box
          sx={{
            flex: "0 1 20%",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Agregar Tarea
          </Typography>
          <TextField
            fullWidth
            label="Título de la tarea"
            variant="outlined"
            value={taskTitle}
            onChange={handleTaskTitleChange}
            sx={{ marginBottom: "15px" }}
          />
          <Select
            fullWidth
            value={taskColor}
            onChange={handleTaskColorChange}
            displayEmpty
            sx={{ marginBottom: "15px" }}
          >
            <MenuItem value="Ninguna">Sin urgencia</MenuItem>
            <MenuItem value="Baja">Baja urgencia</MenuItem>
            <MenuItem value="Media">Media urgencia</MenuItem>
            <MenuItem value="Alta">Alta urgencia</MenuItem>
          </Select>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddTask}
          >
            Agregar Tarea
          </Button>
        </Box>
      </Box>

      {/* Bloque de Tareas */}
      <Box
        sx={{
          flex: "1 1 100%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tareas del {formattedDate}
        </Typography>
        {selectedDateTasks.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Urgencia</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDateTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: urgencyColors[task.color],
                        color: "#fff",
                      }}
                    >
                      {task.color}
                    </TableCell>
                    <TableCell>
                      {task.completed ? (
                        <Typography color="success">Cumplida</Typography>
                      ) : (
                        <Typography color="error">Pendiente</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color={task.completed ? "secondary" : "success"}
                        onClick={() => handleMarkAsCompleted(task.id)}
                        sx={{ marginRight: "10px" }}
                      >
                        {task.completed ? "Pendiente" : "Cumplida"}
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No hay tareas para esta fecha.</Alert>
        )}
      </Box>
    </Box>
  );
};
