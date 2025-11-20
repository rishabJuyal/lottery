import React from "react";
import { bottomNavData } from "../data/bottomNavData";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer
      className="w-full max-w-md mx-auto fixed bottom-0 left-0 right-0 flex justify-around p-1 gap-5 z-30 border-t border-[var(--color-primary-dark)]"
      style={{
        background: "linear-gradient(to bottom, #a20604, #e63820)", // 🔥 red gradient
        color: "white",
      }}
    >
      {bottomNavData
        .filter((btn) => btn.label !== "RETAILER LOCATOR") // optional exclusion
        .map((btn, index) => {
          const Icon = btn.icon;
          const isActive = location.pathname === btn.path;

          return (
            <button
              key={index}
              onClick={() => navigate(btn.path)}
              className={`flex flex-col w-20 items-center transition-all duration-200 leading-3 
                ${isActive ? "scale-110" : "opacity-80 hover:opacity-100"}
              `}
            >
              <div
                className={`p-1 rounded-full my-1 transition-all duration-200 ${
                  isActive
                    ? " shadow-lg"
                    : "bg-transparent text-white"
                }`}
              >
                <Icon size={26} />
              </div>

              <span
                className={`text-[10px] font-semibold tracking-wide uppercase ${
                  isActive ? "text-white" : "text-gray-200"
                }`}
              >
                {btn.label}
              </span>
            </button>
          );
        })}
    </footer>
  );
};

export default BottomNav;
