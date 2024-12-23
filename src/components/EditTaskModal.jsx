import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import ConfirmModal from "./confirmModal";

function EditTaskModal({ task, onClose }) {
  const { editTask } = useContext(TaskContext);
  const [editedTitle, setEditedTitle] = useState(task.title || "");
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const handleEditClick = () => {
    if (editedTitle === task.title && editedDescription === task.description) {
      setErrorMessage("No se han realizado cambios para guardar."); // Mostrar mensaje
      return;
    }

    // Limpiar mensaje de error si hay cambios
    setErrorMessage("");
    setShowConfirmModal(true);
  };

  const confirmEdit = () => {
    editTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
    });

    setShowConfirmModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8  text-black rounded-md relative">
        <h2 className="text-2xl font-bold mb-4">Editar Tarea</h2>

        {/* Mostrar el mensaje de error */}
        {errorMessage && (
          <div className="absolute top-2 left-2 right-2 bg-red-100 text-red-700 p-2 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

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
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmEdit}
        message="¿Estás seguro de que deseas guardar los cambios realizados en esta tarea?"
      />
    </div>
  );
}

export default EditTaskModal;
