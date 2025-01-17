import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Choose a Contact</h2>
        <select name="" id="" className="select-orange">
          <option value="">s</option>
        </select>
        <div className="flex justify-end mt-5">
          <button className="btn-orange-sm" onClick={onClose}>
            Add
          </button>
          <button className="btn-orange-outline-sm ml-2 text-black" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
