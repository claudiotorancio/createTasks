import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-lg font-bold mb-4">Confirmación</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

function EditTaskModal({ task, onClose }) {
  const { editTask } = useContext(TaskContext);
  const [editedTitle, setEditedTitle] = useState(task.title || "");
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEditClick = () => {
    setShowConfirmModal(true); // Mostrar modal de confirmación
  };

  const confirmEdit = () => {
    editTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
    });

    setShowConfirmModal(false); // Ocultar modal de confirmación
    onClose(); // Cerrar modal de edición
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

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmEdit}
        message="¿Estás seguro de que deseas guardar los cambios realizados en esta tarea?"
      />
    </div>
  );
}

export default EditTaskModal;
