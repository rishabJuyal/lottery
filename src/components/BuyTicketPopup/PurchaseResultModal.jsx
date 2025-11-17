import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseResultModal = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="max-w-sm w-full p-6 relative shadow-lg"
        style={{
          backgroundColor: "#fff7da",
          border: "3px solid #a20604",
          borderRadius: "0",
          boxShadow: "0 6px 16px rgba(164, 6, 4, 0.4)",
        }}
      >
        {/* Header */}
        <h2
          className="text-center text-[20px] font-bold uppercase mb-4 flex items-center justify-center gap-2"
          style={{ color: "#a20604", letterSpacing: "0.05em" }}
        >
          Purchased Ticket
        </h2>

        {/* Message */}
        <p className="text-sm font-semibold mb-2" style={{ color: "#a20604" }}>
          {message}
        </p>
        <p className="text-xs mb-6" style={{ color: "#e63820" }}>
          To view your tickets, go to{" "}
          <span className="font-bold" style={{ color: "#f46d04" }}>
            Check My Tickets
          </span>.
        </p>

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
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#f9a664")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#ffe3b3")
            }
          >
            Close
          </button>
          <button
            onClick={() => navigate("/check-ticket")}
            className="px-4 py-2 text-sm font-bold uppercase flex items-center justify-center gap-1"
            style={{
              backgroundColor: "#a20604",
              color: "#ffed33",
              border: "2px solid #ffed33",
              borderRadius: "0",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#f46d04")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#a20604")
            }
          >
            Check My Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseResultModal;
