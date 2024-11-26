import React from "react";

function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null; // Si no está abierto, no se muestra el modal

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
