import React, { useState, useEffect } from 'react';
import './style.css';

const Calendar = ({ tasks, addTask }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const generateCalendar = () => {
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const totalDays = lastDayOfMonth.getDate();
      
      const newDays = [];

      for (let i = 0; i < firstDayOfWeek; i++) {
        newDays.push(null);
      }

      for (let day = 1; day <= totalDays; day++) {
        newDays.push(day);
      }

      setDays(newDays);
    };

    generateCalendar();
  }, []);

  return (
    <div className="calendar-grid">
      {days.map((day, index) => (
        <div
          key={index}
          className={`calendar-day${day ? '' : ' blank-day'}`}
          id={`day-${day}`}
        >
          {day}
          {tasks
            .filter(task => task.date.getDate() === day)
            .map((task, i) => (
              <div key={i} className="task" onClick={() => task.edit()}>
                {task.description}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

const AddTaskModal = ({ isOpen, close, addTask }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (description && !isNaN(new Date(date).getDate())) {
      addTask({ date: new Date(date), description });
      close();
    } else {
      alert('Please enter a valid date and task description!');
    }
  };

  return (
    <div className={`modal${isOpen ? ' open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={close}>&times;</span>
        <h2>Add Task</h2>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Task Description"
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export const Gestor = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, {
      ...task,
      edit: () => {
        const newDescription = prompt('Edit your task:', task.description);
        if (newDescription !== null && newDescription.trim() !== '') {
          setTasks(tasks.map(t => (t === task ? { ...t, description: newDescription } : t)));
        }
      }
    }]);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t !== task));
    }
  };

  return (
    <div className="planner">
      <h1>Event Calendar</h1>
      <Calendar tasks={tasks} addTask={handleAddTask} />
      <button className="add-task-btn" onClick={() => setModalOpen(true)}>Add Task</button>
      <AddTaskModal isOpen={isModalOpen} close={() => setModalOpen(false)} addTask={handleAddTask} />
    </div>
  );
};

