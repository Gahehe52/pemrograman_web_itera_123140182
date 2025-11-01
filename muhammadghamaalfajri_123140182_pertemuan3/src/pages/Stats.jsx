import React from 'react';
import useBookStats from '../hooks/useBookStats';

// --- (Page) StatsPage ---
export default function StatsPage() {
  const { total, owned, reading, toBuy } = useBookStats();

  const StatCard = ({ title, value, colorClass }) => (
    <div className={`p-6 rounded-lg shadow-lg text-white ${colorClass}`}>
      <p className="text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Statistik Buku</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Buku" value={total} colorClass="bg-blue-600" />
        <StatCard title="Dimiliki" value={owned} colorClass="bg-green-600" />
        <StatCard title="Sedang Dibaca" value={reading} colorClass="bg-yellow-500" />
        <StatCard title="Ingin Dibeli" value={toBuy} colorClass="bg-purple-600" />
      </div>
    </div>
  );
};
