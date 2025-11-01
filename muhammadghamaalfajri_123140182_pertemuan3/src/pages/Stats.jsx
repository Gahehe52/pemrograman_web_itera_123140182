import React from 'react';
import useBookStats from '../hooks/useBookStats';

// --- (Page) StatsPage ---
export default function StatsPage() {
  const { total, owned, reading, toBuy } = useBookStats();

  const StatCard = ({ title, value, colorClass }) => (
    // PERUBAHAN: Ganti shadow-lg menjadi shadow
    <div className={`p-6 rounded-lg shadow text-white ${colorClass}`}>
      <p className="text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    // PERUBAHAN: Ganti shadow-md menjadi shadow
    <div className="p-6 bg-white rounded-lg shadow">
      {/* PERUBAHAN: Ganti warna teks header */}
      <h2 className="text-3xl font-bold mb-6 text-sky-800">Statistik Buku</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* PERUBAHAN: Ganti warna-warna kartu */}
        <StatCard title="Total Buku" value={total} colorClass="bg-sky-600" />
        <StatCard title="Dimiliki" value={owned} colorClass="bg-emerald-500" />
        <StatCard title="Sedang Dibaca" value={reading} colorClass="bg-amber-500" />
        <StatCard title="Ingin Dibeli" value={toBuy} colorClass="bg-indigo-500" />
      </div>
    </div>
  );
};
