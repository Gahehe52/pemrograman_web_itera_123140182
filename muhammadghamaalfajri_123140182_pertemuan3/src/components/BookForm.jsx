import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';

// --- (Component) BookForm ---
export default function BookForm({ bookToEdit, onDone }) {
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik'
  });
  const [errors, setErrors] = useState({});
  const isEditing = !!bookToEdit;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        status: bookToEdit.status
      });
    } else {
      setFormData({ title: '', author: '', status: 'milik' });
    }
  }, [bookToEdit, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Judul tidak boleh kosong";
    if (!formData.author.trim()) newErrors.author = "Penulis tidak boleh kosong";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isEditing) {
      updateBook({ ...bookToEdit, ...formData });
    } else {
      addBook(formData);
    }
    setFormData({ title: '', author: '', status: 'milik' });
    setErrors({});
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h2>
      <div className="space-y-4">
        {/* Input Judul */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text" id="title" name="title" value={formData.title} onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${ errors.title ? 'border-red-500' : 'border-gray-300' }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>
        {/* Input Penulis */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Penulis</label>
          <input
            type="text" id="author" name="author" value={formData.author} onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${ errors.author ? 'border-red-500' : 'border-gray-300' }`}
          />
          {errors.author && <p className="mt-1 text-xs text-red-600">{errors.author}</p>}
        </div>
        {/* Pilihan Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status" name="status" value={formData.status} onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
          >
            <option value="milik">Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>
        {/* Tombol Submit */}
        <div className="flex justify-end gap-3">
          {isEditing && (
            <button type="button" onClick={onDone} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
              Batal
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            {isEditing ? 'Simpan Perubahan' : 'Simpan Buku'}
          </button>
        </div>
      </div>
    </form>
  );
};
