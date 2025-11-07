// DownloadMarquee.jsx
import React from "react";

const Marquee = () => {
  return (
    <div className="h-9 border-y-8 border-red-800 bg-orange-100 overflow-hidden whitespace-nowrap relative font-sans">
      {/* Scrolling content */}
      <div
        className="flex items-center"
        style={{
          width: "200%",
          animation: "scroll-left 20s linear infinite",
        }}
      >
        <span className="text-blue-500 font-bold text-sm px-8">
          WELCOME TO DEAR LOTTERY
        </span>
        <span className="text-blue-500 font-bold text-sm px-8">
          WELCOME TO DEAR LOTTERY
        </span>
      </div>

      {/* Inline CSS animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
