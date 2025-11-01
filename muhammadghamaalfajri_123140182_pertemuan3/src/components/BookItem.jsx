import React from 'react';
import { useBooks } from '../context/BookContext';

// --- (Component) BookItem ---
export default function BookItem({ book, onEditClick }) {
  const { deleteBook } = useBooks();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'milik':
        return <span className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">Dimiliki</span>;
      case 'baca':
        return <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full">Dibaca</span>;
      case 'beli':
        return <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">Ingin Dibeli</span>;
      default:
        return null;
    }
  };

  return (
    <li className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 mb-3 sm:mb-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
          {getStatusBadge(book.status)}
        </div>
        <p className="text-sm text-gray-600">oleh {book.author}</p>
      </div>
      <div className="flex-shrink-0 flex gap-2">
        <button
          onClick={() => onEditClick(book)}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
        >
          Edit
        </button>
        <button
          onClick={() => deleteBook(book.id)}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
        >
          Hapus
        </button>
      </div>
    </li>
  );
};
