'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

export default function TeacherDashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center bg-white p-12 rounded-3xl shadow-sm border border-teal-100">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E] mb-4">
          Dashboard Guru
        </h1>
        <p className="text-teal-700 mb-8">
          Selamat datang, Pendidik Hebat! Di sini Anda bisa menyusun kelas, mengunggah materi, modul, serta mengelola kuis bagi murid-murid Anda.
        </p>
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="inline-block bg-[#0F766E] text-white px-6 py-3 rounded-full font-medium shadow-md">
            Role Aktif: Teacher
          </div>
          <button 
            onClick={handleLogout}
            className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-6 py-2 rounded-full font-medium transition-all"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
