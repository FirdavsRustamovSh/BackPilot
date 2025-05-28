import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Logs", path: "/logs" }
];

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#0C111D] border-r border-[#1F2937] p-4">
      <nav className="space-y-2 mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-white hover:bg-[#1A1F2E] transition ${
                isActive ? "bg-[#1A1F2E]" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
