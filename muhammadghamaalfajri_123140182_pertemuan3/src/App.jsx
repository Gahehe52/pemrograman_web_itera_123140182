import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navigation from './components/Navigation';
import HomePage from './pages/Home';
import StatsPage from './pages/Stats';

// --- (Main Component) App ---
export default function App() {
  return (
    // 1. Sediakan Konteks untuk seluruh aplikasi
    <BookProvider>
      {/* 2. Atur Router */}
      <BrowserRouter>
        <div className="bg-gray-100 min-h-screen font-sans">
          <div className="container mx-auto max-w-4xl p-4 sm:p-8">
            
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                Manajemen Buku Pribadi
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Catat koleksi bacaanmu di satu tempat.
              </p>
            </header>

            <main>
              {/* 3. Tampilkan Navigasi (yang sekarang menggunakan NavLink) */}
              <Navigation />

              {/* 4. Tentukan Rute Halaman */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stats" element={<StatsPage />} />
              </Routes>
            </main>

            <footer className="text-center mt-12 text-gray-500 text-sm">
              Dibuat dengan React & Tailwind CSS
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}
