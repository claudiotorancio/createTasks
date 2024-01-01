import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function EditTaskModal({ task, onClose }) {
  const { editTask } = useContext(TaskContext);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleEditClick = () => {
    editTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
    });

    onClose(); // Cerrar el modal después de completar la edición
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Editar Tarea</h2>
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="bg-slate-300 p-3 w-full mb-2"
        />
        <input
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="bg-slate-300 p-3 w-full mb-2"
        />
        <div className="flex justify-end">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-400 mr-2"
          >
            Editar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
