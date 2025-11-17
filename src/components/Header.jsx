import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"; // assuming you have api instance like in CheckMyTickets

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
      className="fixed flex items-center justify-between w-full h-13 px-3 text-white z-50"
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
          className="text-xl font-bold hover:underline hover:text-gray-200 transition"
        >
          DEAR LOTTERY
        </Link>
      </div>

      {token ? (
        <div className="flex items-center justify-center py-1 text-[14px] font-bold text-green-200 z-20">
          ₹{balance.toLocaleString()}
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
