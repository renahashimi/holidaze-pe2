import React, { useEffect } from "react";
import { BiX } from "react-icons/bi";

/**
 * Modal component renders a customizable modal with an overlay.
 * The modal can display content and includes a close button.
 * Clicking outside the modal will also close it.
 *
 * @param {boolean} isOpen - A boolean indicating if the modal is open.
 * @param {function} onClose - A function to close the modal.
 * @param {JSX.Element} children - The content to be displayed inside the modal.
 * @param {string} [title] - An optional title for the modal.
 * @returns {JSX.Element|null} The Modal component, or null if the modal is closed.
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleButtonClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-70 modal-overlay">
      <div className="bg-custom-deep p-2 rounded-lg shadow-lg max-w-lg w-full relative z-[10000]">
        <button
          onClick={handleButtonClick}
          className="absolute top-2 right-2 text-white hover:text-custom-light text-3xl"
        >
          <BiX />
        </button>
        {title && (
          <h2 className="flex justify-start text-base uppercase p-1 font-prata font-semibold mb-4 text-white overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h2>
        )}
        <div className="max-h-[80vh] overflow-y-auto">{children}</div> {/* Scrollable content */}
      </div>
    </div>
  );
};

export default Modal;
