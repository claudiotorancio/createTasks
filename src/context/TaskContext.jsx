import { createContext, useState, useEffect } from "react";
import { fetchAddTask, fetchGetTasks } from "../services/taskServices.js";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  const [editModeTaskId, setEditModeTaskId] = useState(null);

  function clearEditMode() {
    setEditModeTaskId(null);
  }

  // Función para obtener tareas desde el backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchGetTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener tareas:", error.message);
      }
    };
    fetchTasks(); // Obtén las tareas al montar el componente
  }, []);

  // Función para crear una nueva tarea usando fetchAddTask
  const createTask = async (newTask) => {
    // Validar que el título y la descripción no estén vacíos
    if (!newTask.title || !newTask.description) {
      console.error("El título y la descripción son obligatorios.");
      return; // No enviar la solicitud si falta información
    }

    try {
      const createdTask = await fetchAddTask(
        newTask.title,
        newTask.description
      );
      setTasks((prevTasks) => [...prevTasks, createdTask]); // Agregar la tarea creada al estado
    } catch (error) {
      console.error("Error al crear tarea:", error.message);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteTask/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Actualiza el estado local
    } catch (error) {
      console.error("Error al eliminar tarea:", error.message);
    }
  };

  // Función para editar una tarea
  const editTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/editTask/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTaskData.id ? updatedTaskData : task
        )
      );
    } catch (error) {
      console.error("Error al editar tarea:", error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editModeTaskId,
        clearEditMode,
        setEditModeTaskId,
        deleteTask,
        createTask,
        editTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
