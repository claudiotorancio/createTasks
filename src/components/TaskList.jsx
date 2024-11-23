import React, { useEffect, useState } from "react";
import { fetchGetTasks } from "../services/taskServices";
import TaskCard from "./TaskCard"; // Importar el componente TaskCard

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchGetTasks();
        console.log(data);
        setTasks(data); // Guardamos las tareas en el estado
      } catch (error) {
        console.error("Error al obtener las tareas:", error.message);
      }
    };

    fetchTasks();
  }, []); // El segundo parámetro [] asegura que la solicitud solo se haga una vez al cargar el componente

  return (
    <div className="task-list">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de Tareas</h1>
      <div className="grid gap-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} /> // Pasamos cada tarea como prop
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
