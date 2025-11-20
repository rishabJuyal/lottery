import React from "react";
import { Trophy } from "lucide-react";

const FloatingResultButton = ({ onClick }) => {
  return (
    <div
      className="
        fixed !important
        right-4 !important
        bottom-24 !important
        z-40 !important
      "
      style={{ pointerEvents: "auto" }}
    >
      <button
        onClick={onClick}
        className="
          w-20 h-20
          flex flex-col items-center justify-center
          text-white font-extrabold
          select-none
          animate-pulse-fast
          relative
        "
        style={{
          borderRadius: "50%",
          background: "#000",
          boxShadow: "0 0 30px rgba(255, 180, 20, 0.7)", // STRONG WARM GLOW
          position: "relative",
          zIndex: 99999,
        }}
      >
        {/* RGB + THEME Border (Warm Dominant) */}
        <span className="rgb-border absolute inset-0 rounded-full"></span>

        <Trophy className="w-7 h-7 mb-1 neon-text" />

        <span className="text-[12px] tracking-wider neon-text animate-color-cycle">
          RESULTS
        </span>

        <style>{`
          /* Warm Dominant Rotating Border */
          .rgb-border {
            border: 4px dotted transparent;
            animation: rgb-border-rotate 2s linear infinite;
          }

          @keyframes rgb-border-rotate {
            0% {
              border-color: #a20604; /* Red */
              box-shadow: 0 0 14px #a20604;
            }
            25% {
              border-color: #ffed33; /* Yellow */
              box-shadow: 0 0 14px #ffed33;
            }
            50% {
              border-color: #f46d04; /* Orange */
              box-shadow: 0 0 14px #f46d04;
            }
            75% {
              border-color: #ff4500; /* Strong orange-red */
              box-shadow: 0 0 14px #ff4500;
            }
            100% {
              border-color: #a20604;
              box-shadow: 0 0 14px #a20604;
            }
          }

          /* Neon Glow - Warm Colors Dominant */
          .neon-text {
            animation: neon-glow 1.4s ease-in-out infinite alternate;
          }

          @keyframes neon-glow {
            0% {
              text-shadow: 0 0 6px #a20604, 0 0 12px #a20604;
              color: #ff4c4c; /* Red */
            }
            33% {
              text-shadow: 0 0 10px #ffed33, 0 0 16px #ffed33;
              color: #ffed33; /* Yellow */
            }
            66% {
              text-shadow: 0 0 10px #f46d04, 0 0 16px #f46d04;
              color: #f9a664; /* Orange */
            }
            100% {
              text-shadow: 0 0 8px #ff4500, 0 0 14px #ff4500;
              color: #ff7b47; /* Orange-red */
            }
          }

          /* RESULTS Color Cycle — Warm Colors Only */
          .animate-color-cycle {
            animation: color-cycle 2.2s linear infinite;
          }

          @keyframes color-cycle {
            0% { color: #ffed33; }   /* Yellow */
            33% { color: #f46d04; }  /* Orange */
            66% { color: #a20604; }  /* Red */
            100% { color: #ffed33; } /* Back to Yellow */
          }

          /* Faster Pulse Animation */
          .animate-pulse-fast {
            animation: pulse-fast 1.3s ease-in-out infinite;
          }

          @keyframes pulse-fast {
            0% { transform: scale(1); }
            50% { transform: scale(1.18); }
            100% { transform: scale(1); }
          }
        `}</style>
      </button>
    </div>
  );
};

export default FloatingResultButton;
