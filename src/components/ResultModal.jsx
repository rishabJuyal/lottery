import React from "react";

const ResultModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-10"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="w-80 p-5 shadow-xl relative"
        style={{
          backgroundColor: "#fff7da",
          border: "3px solid #a20604",
          borderRadius: "0",
          boxShadow: "0 6px 18px rgba(164, 6, 4, 0.4)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
          style={{
            color: "#a20604",
          }}
        >
          ✕
        </button>

        <h2
          className="text-center text-[20px] font-bold uppercase mb-4"
          style={{
            color: "#a20604",
            letterSpacing: "0.05em",
          }}
        >
          Lottery Results
        </h2>

        <p
          className="text-center font-semibold mb-4"
          style={{ color: "#c02d12" }}
        >
          Coming soon... You will see all results here!
        </p>

        <div className="text-center">
          <button
            onClick={onClose}
            className="w-full py-2 font-bold uppercase"
            style={{
              backgroundColor: "#a20604",
              color: "#ffed33",
              border: "2px solid #ffed33",
              borderRadius: "0",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#f46d04")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#a20604")
            }
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
