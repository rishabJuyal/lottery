import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar.jsx";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet

export default function Layout() {
  const theme = useSelector((state) => state.theme.mode); // Get theme from Redux
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main layout */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header onToggleSidebar={() => setSidebarOpen((open) => !open)} />

        {/* ✅ Use <Outlet /> instead of children */}
        <main className="flex-1 bg-gray-100 mb-18 mt-13">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </>
  );
}
