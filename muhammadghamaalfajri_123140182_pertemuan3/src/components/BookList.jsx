import React from 'react';
import { useBooks } from '../context/BookContext';
import BookItem from '../components/BookItem';

// --- (Component) BookList ---
export default function BookList({ onEditClick }) {
  const { filteredBooks } = useBooks();

  if (filteredBooks.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada buku yang cocok dengan filter.</p>;
  }

  return (
    <ul className="space-y-4">
      {filteredBooks.map(book => (
        <BookItem 
          key={book.id} 
          book={book} 
          onEditClick={onEditClick} 
        />
      ))}
    </ul>
  );
};
