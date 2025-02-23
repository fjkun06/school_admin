import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h2>
        <p className="text-gray-600 mb-4">This action cannot be undone.</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
