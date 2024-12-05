import React, { useState, useEffect, useCallback } from "react";
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
import { TaskService } from "../service/taskServices";
import { useAuth } from "../context/AuthProvider";

const urgencyColors = {
  Alta: "#FF4C4C", // Rojo
  Media: "#FFA24C", // Naranja
  Baja: "#F6F700", // Amarillo
  Ninguna: "#4CAF50", // Verde
};

export const GestorTareas = () => {
  const [date, setDate] = useState(new Date());
  const [fechaDate, setFechaDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskColor, setTaskColor] = useState("Ninguna");
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setIdEmpresa(user.id_empresa);
    }
  }, [user]);

  // Verifica y convierte las fechas de las tareas en objetos Date válidos
  const validateTasksDates = (tasks) =>
    tasks.map((task) => ({
      ...task,
      date: new Date(task.date),
    }));

  const fetchTasks = useCallback(async () => {
    try {
      setFechaDate(format(date, "yyyy-MM-dd"));
      const response = await TaskService.getTasks(idEmpresa, fechaDate);
      const data = await response.json();
      const validatedTasks = validateTasksDates(data);
      setTasks(validatedTasks);
      setSelectedDateTasks(
        validatedTasks.filter((task) =>
          task.date.toISOString().startsWith(fechaDate)
        )
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
      setSelectedDateTasks([]);
    }
  }, [date, idEmpresa, fechaDate]);

  const fetchAllTasks = useCallback(async () => {
    try {
      const response = await TaskService.getAllTasks(idEmpresa);
      const data = await response.json();
      setAllTasks(validateTasksDates(data));
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      setAllTasks([]);
    }
  }, [idEmpresa]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    if (idEmpresa !== "" && idEmpresa !== undefined && idEmpresa !== null) {
      fetchTasks();
      fetchAllTasks();
    }
  }, [fetchTasks, date, fetchAllTasks, idEmpresa]);

  const handleAddTask = async () => {
    if (!taskTitle) {
      alert("Por favor, ingrese un título para la tarea.");
      return;
    }
    const newTask = {
      title: taskTitle,
      date: format(date, "yyyy-MM-dd"),
      color: taskColor,
      completed: false,
      company_id: idEmpresa,
    };
    try {
      await TaskService.createTask(newTask);
      setTaskTitle("");
      setTaskColor("Ninguna");
      fetchTasks();
      fetchAllTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskTitleChange = (e) => setTaskTitle(e.target.value);
  const handleTaskColorChange = (e) => setTaskColor(e.target.value);

  const handleMarkAsCompleted = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      await TaskService.updateTask(taskId, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      });
      fetchTasks();
      fetchAllTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      fetchTasks();
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const formattedDate = format(date, "d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "20px", gap: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestor de Tareas
      </Typography>

      {/* Calendario */}
      <Box sx={{ display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ flex: "0 1 80%", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <BigCalendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date }) => {
              const tileDate = date.toISOString().split("T")[0];
              const tasksForDate = [...tasks, ...allTasks].filter(
                (task) => task.date.toISOString().split("T")[0] === tileDate
              );
              return tasksForDate.length > 0 ? "has-tasks" : null;
            }}
            tileContent={({ date }) => {
              const tileDate = date.toISOString().split("T")[0];
              const tasksForDate = [...tasks, ...allTasks].filter(
                (task) => task.date.toISOString().split("T")[0] === tileDate
              );

              if (tasksForDate.length > 0) {
                const highestUrgencyColor = tasksForDate.reduce(
                  (highest, task) =>
                    ["Ninguna", "Baja", "Media", "Alta"].indexOf(task.color) >
                    ["Ninguna", "Baja", "Media", "Alta"].indexOf(highest)
                      ? task.color
                      : highest,
                  "Ninguna"
                );
                return (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: urgencyColors[highestUrgencyColor],
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  />
                );
              }
              return null;
            }}
            style={{ width: "100%", maxWidth: "1000px", fontSize: "1.5rem" }}
          />
        </Box>

        {/* Agregar Tarea */}
        <Box sx={{ flex: "0 1 20%", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h6" gutterBottom>
            Agregar Tarea
          </Typography>
          <TextField fullWidth label="Título de la tarea" variant="outlined" value={taskTitle} onChange={handleTaskTitleChange} sx={{ marginBottom: "15px" }} />
          <Select fullWidth value={taskColor} onChange={handleTaskColorChange} displayEmpty sx={{ marginBottom: "15px" }}>
            <MenuItem value="Ninguna">Sin urgencia</MenuItem>
            <MenuItem value="Baja">Baja urgencia</MenuItem>
            <MenuItem value="Media">Media urgencia</MenuItem>
            <MenuItem value="Alta">Alta urgencia</MenuItem>
          </Select>
          <Button fullWidth variant="contained" color="primary" onClick={handleAddTask}>
            Agregar Tarea
          </Button>
        </Box>
      </Box>

      {/* Tareas */}
      <Box sx={{ flex: "1 1 100%", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
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
                  <TableCell>Completada</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDateTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.color}</TableCell>
                    <TableCell>{task.completed ? "Sí" : "No"}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleMarkAsCompleted(task.id)}>{task.completed ? "Desmarcar" : "Marcar como completada"}</Button>
                      <Button onClick={() => handleDeleteTask(task.id)} color="error">
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No hay tareas para la fecha seleccionada.</Alert>
        )}
      </Box>
    </Box>
  );
};
