import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import Header from "../header/header";
import Sidebar from "../sidebar";
import React from "react";
export default function Layout({ children }) {
  const [sidebarPosition, setSidebarPosition] = useState("left");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebarPosition = () => {
    setSidebarPosition(sidebarPosition === "left" ? "right" : "left");
  };

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center shadow">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleSidebarOpen}
        >
          <LayoutDashboard size={24} />
          <h1 className="text-lg font-bold">
            {isSidebarOpen ? "Hide Menu" : "Show Menu"}
          </h1>
        </div>
        <button
          onClick={toggleSidebarPosition}
          className="bg-white text-blue-600 px-3 py-1 rounded shadow hover:bg-gray-100"
        >
          {sidebarPosition === "left" ? "Right" : "Left"} Sidebar
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && sidebarPosition === "left" && (
          <aside className="w-64 bg-gray-800 text-white p-4 transition-all duration-300">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          {children}
        </main>

        {isSidebarOpen && sidebarPosition === "right" && (
          <aside className="w-64 bg-gray-800 text-white p-4 transition-all duration-300">
            <Sidebar />
          </aside>
        )}
      </div>
    </div>
  );
}
