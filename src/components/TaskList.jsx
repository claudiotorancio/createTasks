import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-white text-4xl">No hay tareas aún</h1>
        {/* Botón para ir al formulario de tareas */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors duration-300"
        >
          Ir a Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Título para la lista */}
      <h1 className="text-white text-3xl font-bold mb-4 text-center">
        Lista de Tareas
      </h1>

      {/* Grid para las tareas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
