import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Estado para almacenar la imagen
  const { createTask } = useContext(TaskContext);
  const navigate = useNavigate(); // Hook para navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacíos
    if (!title || !description || !image) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear la tarea
    createTask({
      title,
      description,
      image, // Incluir la imagen en el objeto de la tarea
    });

    // Limpiar los campos después de enviar
    setTitle("");
    setDescription("");
    setImage(null);

    // Redirigir a la lista de tareas
    navigate("/tasks");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Almacenar el archivo seleccionado
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-black text-3xl font-bold mb-4 text-center">Inicio</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-10 mb-4"
        encType="multipart/form-data"
        action="/api/addTask"
        method="POST"
      >
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-slate-300 p-3 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-indigo-500 px-3 py-1 text-white"
          disabled={!title || !description || !image} // Deshabilitar si los campos están vacíos
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
