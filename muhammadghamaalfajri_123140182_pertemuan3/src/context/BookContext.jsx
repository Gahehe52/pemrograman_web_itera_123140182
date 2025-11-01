import React, { createContext, useContext, useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Impor hook kustom

// --- 1. (Context) BookContext ---
const BookContext = createContext(null);

// Hook kustom untuk mengakses konteks dengan mudah
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks harus digunakan di dalam BookProvider");
  }
  return context;
}

// Provider untuk BookContext
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filter, setFilter] = useState('all'); // 'all', 'milik', 'baca', 'beli'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fungsi CRUD
  const addBook = (book) => {
    const newBook = { ...book, id: Date.now() };
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  const updateBook = (updatedBook) => {
    setBooks(prevBooks => 
      prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  // Logika untuk memfilter dan mencari buku
  const filteredBooks = useMemo(() => {
    let currentBooks = [...books];
    if (filter !== 'all') {
      currentBooks = currentBooks.filter(book => book.status === filter);
    }
    if (searchTerm) {
      currentBooks = currentBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return currentBooks;
  }, [books, filter, searchTerm]);

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    filteredBooks
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
