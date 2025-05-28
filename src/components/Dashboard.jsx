import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Header";

function DashboardLayout({ children }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/logs";
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen bg-[#0C111D]">
        <TopBar onLogout={handleLogout} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
