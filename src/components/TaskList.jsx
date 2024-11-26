import TaskCard from "./TaskCard";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext"; // Importar contexto
import { useNavigate } from "react-router-dom";
import { fetchGetTasks } from "../services/taskServices";
// import TaskEdit from "./TaskEdit";

function TaskList() {
  const { tasks, setTasks } = useContext(TaskContext); // Acceso a tareas y función para actualizarlas
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchGetTasks(); // Traer las tareas del servicio
        setTasks(data); // Guardar tareas en el contexto
      } catch (error) {
        console.error("Error al cargar las tareas", error.message);
      } finally {
        setLoading(false); // Marcar carga como finalizada
      }
    };
    loadTasks();
  }, [setTasks]); // Dependencia para ejecutar solo una vez

  if (loading) {
    return <p className="text-white"> Cargando tareas...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-white text-4xl">No hay tareas aún</h1>
        <button
          onClick={() => navigate("/")} // Botón para redirigir
          className="mt-4 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors duration-300"
        >
          Ir a Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-white text-3xl font-bold mb-4 text-center">
        Lista de Tareas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} /> // Mostrar las tareas
        ))}
      </div>
    </div>
  );
}

export default TaskList;
