//TaskCard.jsx

import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ task }) {
  const { deleteTask, setEditModeTaskId } = useContext(TaskContext);
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg mx-auto w-full sm:w-96 max-w-full">
      <h1 className="text-lg sm:text-xl font-bold capitalize">{task.title}</h1>
      <p className="text-gray-500 text-sm sm:text-base mt-2">
        {task.description}
      </p>
      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
        <button
          className="bg-red-500 px-3 py-1 text-sm sm:text-base rounded-md hover:bg-red-400 w-full sm:w-auto"
          onClick={() => deleteTask(task.id)}
        >
          Eliminar Tarea
        </button>
        <button
          className="bg-blue-500 px-3 py-1 text-sm sm:text-base rounded-md hover:bg-blue-400 w-full sm:w-auto"
          onClick={() => setEditModeTaskId(task.id)}
        >
          Actualizar Tarea
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
