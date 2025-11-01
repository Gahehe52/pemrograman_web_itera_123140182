import React from 'react';
import { NavLink } from 'react-router-dom'; // Menggunakan NavLink dari React Router

// --- (Component) Navigation ---
// Diperbarui untuk menggunakan React Router
export default function Navigation() {
  
  const getNavLinkClass = ({ isActive }) => {
    return `px-4 py-2 rounded-md font-medium transition-colors ${
      isActive 
        // PERUBAHAN: Ganti bg-blue-600 menjadi bg-sky-600
        ? 'bg-sky-600 text-white' 
        // PERUBAHAN: Ganti text-gray-600 hover:bg-gray-100
        : 'text-sky-700 hover:bg-sky-100'
    }`;
  };

  return (
    // PERUBAHAN: Ganti shadow-md menjadi shadow-sm untuk efek lebih lembut
    <nav className="p-4 bg-white shadow-sm rounded-lg mb-8">
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
