import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookFilter from '../components/BookFilter';
import BookList from '../components/BookList';

// --- (Page) HomePage ---
export default function HomePage() {
  const [editingBook, setEditingBook] = useState(null);

  const handleEditClick = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDoneEditing = () => {
    setEditingBook(null);
  };

  return (
    <div className="space-y-6">
      <BookForm 
        bookToEdit={editingBook} 
        onDone={handleDoneEditing} 
      />
      
      {/* PERUBAHAN: Ganti shadow-md menjadi shadow */}
      <div className="p-6 bg-white rounded-lg shadow">
        {/* PERUBAHAN: Ganti warna teks header */}
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">Daftar Bukumu</h2>
        <BookFilter />
        <BookList onEditClick={handleEditClick} />
      </div>
    </div>
  );
};
