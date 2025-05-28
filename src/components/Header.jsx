import React from "react";

function TopBar({ onLogout }) {
  return (
    <div className="w-full h-16 bg-[#0C111D] border-b border-[#1F2937] flex justify-between items-center px-6">
      <div className="text-white text-xl font-bold">BackPilot</div>
      <button
        onClick={onLogout}
        className="text-white px-4 py-2 rounded-md bg-[#1F2937] hover:bg-[#374151] transition"
      >
        Logout
      </button>
    </div>
  );
}

export default TopBar;
