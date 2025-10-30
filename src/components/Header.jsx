import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onToggleSidebar }) => (
  <header className="flex flex-row fixed w-full h-13 justify-between bg-[var(--color-primary-light)] text-white p-4 items-center z-100">
    {/* Sidebar Toggle Button */}
    <button onClick={onToggleSidebar} className="mr-4 text-xl">
      ☰
    </button>

    {/* Title as Link */}
    <Link to="/" className="text-xl font-bold hover:underline hover:text-gray-200 transition">
      Texas Lottery
    </Link>

    {/* Login Link */}
    <Link
      to="/login"
      className="text-xs font-bold hover:underline hover:text-gray-200 transition"
    >
      LOGIN
    </Link>
  </header>
);

export default Header;
