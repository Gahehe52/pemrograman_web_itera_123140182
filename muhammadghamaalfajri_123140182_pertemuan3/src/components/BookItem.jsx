import React from 'react';
import { useBooks } from '../context/BookContext';

// --- (Component) BookItem ---
export default function BookItem({ book, onEditClick }) {
  const { deleteBook } = useBooks();

  const getStatusBadge = (status) => {
    switch (status) {
      // PERUBAHAN: Ganti warna badge
      case 'milik':
        return <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">Dimiliki</span>;
      case 'baca':
        return <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">Dibaca</span>;
      case 'beli':
        return <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">Ingin Dibeli</span>;
      default:
        return null;
    }
  };

  return (
    // PERUBAHAN: Ganti shadow-md menjadi shadow
    <li className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 mb-3 sm:mb-0">
        <div className="flex items-center gap-3 mb-1">
          {/* PERUBAHAN: Ganti warna teks */}
          <h3 className="text-lg font-semibold text-sky-900">{book.title}</h3>
          {getStatusBadge(book.status)}
        </div>
        <p className="text-sm text-sky-700">oleh {book.author}</p>
      </div>
      <div className="flex-shrink-0 flex gap-2">
        {/* PERUBAHAN: Ganti style tombol Edit */}
        <button
          onClick={() => onEditClick(book)}
          className="px-3 py-1 bg-sky-100 text-sky-800 rounded-md text-sm font-medium hover:bg-sky-200"
        >
          Edit
        </button>
        {/* PERUBAHAN: Ganti style tombol Hapus */}
        <button
          onClick={() => deleteBook(book.id)}
          className="px-3 py-1 bg-rose-100 text-rose-800 rounded-md text-sm font-medium hover:bg-rose-200"
        >
          Hapus
        </button>
      </div>
    </li>
  );
};
