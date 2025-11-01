import React from 'react';
import { useBooks } from '../context/BookContext';

// --- (Component) BookFilter ---
export default function BookFilter() {
  const { filter, setFilter, searchTerm, setSearchTerm } = useBooks();

  return (
    // PERUBAHAN: Ganti bg-gray-100 menjadi bg-sky-50
    <div className="mb-6 p-4 bg-sky-50 rounded-lg shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Pencarian */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Cari Buku (Judul/Penulis)
          </label>
          <input
            type="text"
            id="search"
            placeholder="Cth: Laskar Pelangi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // PERUBAHAN: Ganti warna border/ring
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        
        {/* Tombol Filter Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter Status
          </label>
          <div className="flex flex-wrap gap-2">
            {['all', 'milik', 'baca', 'beli'].map(status => {
              const isActive = filter === status;
              const text = { all: 'Semua', milik: 'Dimiliki', baca: 'Dibaca', beli: 'Ingin Dibeli' }[status];
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  // PERUBAHAN: Ganti warna tombol aktif dan non-aktif
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : 'bg-white text-sky-700 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
