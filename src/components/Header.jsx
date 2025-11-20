import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"; // assuming you have api instance like in CheckMyTickets
import { Coins } from "lucide-react";
import logo from '../assets/logo1.png'

const Header = ({ onToggleSidebar }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [balance, setBalance] = useState(0);

  // Fetch balance function
  const fetchBalance = async () => {
    try {
      const response = await api.get("/gamma/users/me");
      if (response?.balance !== undefined) {
        setBalance(Number(response.balance));
        localStorage.setItem("balance", Number(response.balance));
      }
    } catch (err) {
      console.error("Failed to fetch balance", err);
    }
  };

  // Initial fetch + interval every 2 seconds
  useEffect(() => {
    fetchBalance(); // fetch immediately

    const interval = setInterval(fetchBalance, 2000); // fetch every 2 seconds

    // Listen to token change in localStorage
    const handleStorage = () => setToken(localStorage.getItem("authToken"));
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <header
      style={{ background: "var(--bg-gradient)" }}
      className="fixed flex items-center justify-between w-full max-w-md mx-auto h-13 px-2 text-white z-50"
    >
      <button
        onClick={onToggleSidebar}
        className="text-xl flex items-center justify-center h-full z-20"
      >
        ☰
      </button>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link
          to="/"
        >
          <img
            src={logo} // Replace with your image path
            alt="Dear Lottery"
            className="h-11 w-auto object-contain"
          />
        </Link>
      </div>

      {token ? (
        <div className="flex items-center justify-center bg-white px-2 py-1 rounded-[2px] text-xs font-bold text-red-700 hover:underline hover:text-red-300 transition z-20">
          <Coins className="w-3 h-3 text-amber-600 mr-1" /> {/* coin icon */}
          {balance.toLocaleString()}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center justify-center bg-white px-3 py-1 rounded-[2px] text-xs font-bold text-red-700 hover:underline hover:text-red-300 transition z-20"
        >
          LOGIN
        </Link>
      )}
    </header>
  );
};

export default Header;
