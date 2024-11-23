import { createContext, useState, useEffect } from "react";
import {
  fetchAddTask,
  fetchGetTasks,
  fetchDeleteTask,
  fetchUpdateTask,
} from "../services/taskServices.js";
import ConfirmModal from "../components/confirmModal";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  const [editModeTaskId, setEditModeTaskId] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    taskId: null,
  });

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
    if (!newTask.title || !newTask.description) {
      console.error("El título y la descripción son obligatorios.");
      return;
    }

    try {
      const createdTask = await fetchAddTask(
        newTask.title,
        newTask.description
      );
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      console.error("Error al crear tarea:", error.message);
    }
  };

  // Función para abrir el modal de confirmación antes de eliminar
  const openDeleteModal = (taskId) => {
    setModalState({ isOpen: true, taskId });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalState({ isOpen: false, taskId: null });
  };

  // Función para confirmar la eliminación
  const confirmDeleteTask = async () => {
    const { taskId } = modalState;
    try {
      await fetchDeleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar tarea:", error.message);
    }
    closeModal(); // Cerrar el modal después de confirmar
  };

  // Función para editar una tarea
  const editTask = async (updatedTask) => {
    try {
      await fetchUpdateTask(updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
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
        deleteTask: openDeleteModal, // Cambiar deleteTask por la función de abrir modal
        createTask,
        editTask,
      }}
    >
      {props.children}

      {/* Renderizar el modal de confirmación */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={confirmDeleteTask}
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />
    </TaskContext.Provider>
  );
}
