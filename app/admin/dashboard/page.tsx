'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axios.get('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (error) {
        console.error("Gagal memuat statistik", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Title Section */}
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Ringkasan statistik sistem Circle Pintar.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <span className="material-icons text-3xl">school</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Siswa</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? '...' : stats?.metrics?.students || 0}
            </h3>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <span className="material-icons text-3xl">co_present</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Guru</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? '...' : stats?.metrics?.teachers || 0}
            </h3>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-full bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center">
            <span className="material-icons text-3xl">menu_book</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Kelas Aktif</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? '...' : stats?.metrics?.courses || 0}
            </h3>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center">
            <span className="material-icons text-3xl">emoji_events</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Lencana Sistem</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? '...' : stats?.metrics?.badges || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-2">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Pertumbuhan Pendaftar Siswa (6 Bulan Terakhir)</h2>
        <div className="w-full h-80">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Memuat Grafik...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats?.growth_chart || []}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="students" 
                  name="Jumlah Siswa" 
                  fill="#0F766E" 
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
}
