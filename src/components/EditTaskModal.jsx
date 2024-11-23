// EditTaskModal.jsx

import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import ConfirmModal from "./confirmModal";

function EditTaskModal({ task, onClose }) {
  const { editTask } = useContext(TaskContext);
  const [editedTitle, setEditedTitle] = useState(task.title || "");
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar el modal de confirmación

  const handleEditClick = () => {
    // Si no hay cambios, no mostrar el modal de confirmación
    if (editedTitle === task.title && editedDescription === task.description) {
      alert("No se han realizado cambios para guardar.");
      return;
    }

    // Mostrar el modal de confirmación
    setShowConfirmModal(true);
  };

  const confirmEdit = () => {
    // Realizamos la edición de la tarea solo después de confirmar
    editTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
    });

    // Cerrar el modal de confirmación y el modal de edición
    setShowConfirmModal(false);
    onClose();
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

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)} // Cerrar el modal de confirmación sin hacer nada
        onConfirm={confirmEdit} // Confirmar y editar la tarea
        message="¿Estás seguro de que deseas guardar los cambios realizados en esta tarea?"
      />
    </div>
  );
}

export default EditTaskModal;
