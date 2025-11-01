import React from 'react';
import { NavLink } from 'react-router-dom'; // Menggunakan NavLink dari React Router

// --- (Component) Navigation ---
// Diperbarui untuk menggunakan React Router
export default function Navigation() {
  
  const getNavLinkClass = ({ isActive }) => {
    return `px-4 py-2 rounded-md font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  };

  return (
    <nav className="p-4 bg-white shadow-md rounded-lg mb-8">
      <div className="flex justify-center gap-4">
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/stats" className={getNavLinkClass}>
          Statistik
        </NavLink>
      </div>
    </nav>
  );
};
