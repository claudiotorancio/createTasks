import { createContext, useState, useEffect } from "react";
import {
  fetchAddTask,
  fetchGetTasks,
  fetchDeleteTask,
  fetchUpdateTask,
} from "../services/taskServices.js";
import ConfirmModal from "../components/confirmModal";

export const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [editModeTaskId, setEditModeTaskId] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    taskId: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchGetTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener tareas:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Proporciona el estado `loading` al contexto
  const contextValue = {
    tasks,
    loading, // Aquí está disponible para los consumidores
    editModeTaskId,
    clearEditMode: () => setEditModeTaskId(null),
    setEditModeTaskId,
    deleteTask: (taskId) => setModalState({ isOpen: true, taskId }),
    createTask: async (newTask) => {
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
    },
    editTask: async (updatedTask) => {
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
    },
  };

  const closeModal = () =>
    setModalState({
      isOpen: false,
      taskId: null,
    });

  const confirmDeleteTask = async () => {
    const { taskId } = modalState;
    try {
      await fetchDeleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar tarea:", error.message);
    }
    closeModal();
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {/* Manejo básico de la carga */}
      {loading ? (
        <div className="text-center text-white">
          <p className="text-xl">Cargando tareas...</p>
        </div>
      ) : (
        children
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={confirmDeleteTask}
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />
    </TaskContext.Provider>
  );
}
