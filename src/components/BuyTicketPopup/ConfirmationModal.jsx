import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-w-sm w-full p-6 relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff7da",
          border: "3px solid #a20604",
          borderRadius: "0",
          boxShadow: "0 6px 16px rgba(164, 6, 4, 0.4)",
        }}
      >
        {/* Header */}
        <h3
          className="text-center text-[20px] font-bold uppercase mb-4"
          style={{ color: "#a20604", letterSpacing: "0.05em" }}
        >
          {message}
        </h3>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold uppercase flex items-center justify-center gap-1"
            style={{
              backgroundColor: "#ffe3b3",
              color: "#a20604",
              border: "2px solid #f46d04",
              borderRadius: "0",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9a664")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffe3b3")}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold uppercase flex items-center justify-center gap-1"
            style={{
              backgroundColor: "#a20604",
              color: "#ffed33",
              border: "2px solid #ffed33",
              borderRadius: "0",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f46d04")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#a20604")}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
