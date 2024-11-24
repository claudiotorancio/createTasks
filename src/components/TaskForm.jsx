import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useContext(TaskContext);
  const navigate = useNavigate(); // Hook para navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacíos
    if (!title || !description) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear la tarea
    createTask({
      title,
      description,
    });

    // Limpiar los campos después de enviar
    setTitle("");
    setDescription("");

    // Redirigir a la lista de tareas
    navigate("/tasks");
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-10 mb-4">
        <h1 className="text-2xl font-bold text-white mb-3">Create Tasks</h1>
        <input
          placeholder="Escribe tu tarea"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="bg-slate-300 p-3 w-full mb-2"
          autoFocus
        />
        <textarea
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-300 p-3 w-full mb-2"
          value={description}
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-500 px-3 py-1 text-white"
          disabled={!title || !description} // Deshabilitar si los campos están vacíos
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
