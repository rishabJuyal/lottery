import React from "react";
import { bottomNavData } from "../data/BottomNavData";
import { useNavigate } from "react-router-dom"; // 👈 import navigation hook

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around p-2 text-blue-900 gap-5 z-30">
      {bottomNavData
        .filter((btn) => btn.label !== "RETAILER LOCATOR") // exclude specific items
        .map((btn, index) => {
          const Icon = btn.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(btn.path)} // 👈 navigate on click
              className="flex flex-col w-20 items-center hover:text-blue-600 transition-colors"
            >
              <Icon size={32} />
              <span className="mt-1 text-[10px] font-semibold">{btn.label}</span>
            </button>
          );
        })}
    </footer>
  );
};

export default BottomNav;
