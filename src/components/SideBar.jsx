import React, { useState } from "react";
import { X, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../data/sidebarLinksData";
import { bottomNavData } from "../data/bottomNavData";

const Sidebar = ({ isOpen, onClose }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 flex flex-col bg-[var(--color-primary)] text-white transform transition-transform duration-300 ease-in-out z-110
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* HEADER */}
      <div className="w-full flex justify-between items-center bg-[var(--color-primary-light)] px-4 py-3 sticky top-0 z-10">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-[var(--color-primary)] px-8 py-1 rounded-full font-bold text-xs sm:text-sm"
        >
          LOGIN
        </button>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition">
          <X size={26} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT NAV */}
        <div className="relative flex-1 p-2 flex flex-col overflow-y-auto pb-28 scrollbar-thin scrollbar-thumb-[var(--color-primary-light)] scrollbar-track-blue-[var(--color-primary)]">
          <nav className="flex flex-col space-y-2 sm:space-y-3 text-sm sm:text-base">
            {sidebarLinks.map((link, index) => {
              const handleClick = () => {
                if (link.label === "LOG OUT") {
                  localStorage.clear();
                  onClose();
                  navigate("/login");
                } else {
                  onClose();
                  navigate(link.path);
                }
              };

              return (
                <button
                  key={index}
                  onClick={handleClick}
                  className="flex items-center justify-between w-full hover:bg-[var(--color-primary-light)] p-2.5 rounded-lg transition-all text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <link.icon size={18} />
                    <span className="text-xs sm:text-sm font-medium tracking-wide">
                      {link.label}
                    </span>
                  </div>
                  {link.rightArrow && <ArrowRight size={14} />}
                </button>
              );
            })}
          </nav>

          {/* ABOUT US DROPDOWN */}
          <div className="absolute bottom-0 left-0 w-full">
            <button
              onClick={() => setAboutOpen((prev) => !prev)}
              className="w-full flex justify-between items-center px-4 py-3 bg-[var(--color-primary-light)] hover:bg-blue-700 text-xs sm:text-sm font-semibold transition-all"
            >
              <span>About Us</span>
              {aboutOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>

            <div
              className={`bg-[var(--color-primary-dark)] overflow-hidden transition-all duration-300 ease-in-out ${
                aboutOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {["Terms and Conditions", "Privacy Statement", "Contact Us"].map(
                (text, idx) => (
                  <button
                    key={idx}
                    onClick={onClose}
                    className="block w-full text-left px-5 py-2 text-xs sm:text-sm text-gray-200 hover:bg-[var(--color-primary-light)]"
                  >
                    {text}
                  </button>
                )
              )}
              <div className="px-5 py-2 text-[11px] sm:text-xs text-gray-400 border-t border-[var(--color-primary-light)]">
                App Version: 3.7.0
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT STRIP */}
        <div className="w-18 bg-white text-[var(--color-primary)] flex flex-col justify-between items-center py-12 space-y-6">
          {bottomNavData.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <RightButton
                key={index}
                icon={<Icon size={32} />}
                label={btn.label}
                onClick={() => {
                  onClose();
                  navigate(btn.path);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Make RightButton clickable and remove nested <button>
const RightButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center text-[9px] sm:text-[10px] font-semibold text-center leading-tight hover:scale-105 transition-transform w-full"
  >
    {icon}
    <span className="mt-1">{label}</span>
  </button>
);

export default Sidebar;
