'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

interface AdminHeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState('Super Admin');

  const loadUser = () => {
    const data = localStorage.getItem('user_data');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.name) setUserName(parsed.name);
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  };

  useEffect(() => {
    loadUser();
    
    // Dengarkan kejadian pembaruan profil kustom dari tab yang sama
    window.addEventListener('user-profile-updated', loadUser);
    return () => window.removeEventListener('user-profile-updated', loadUser);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      
      {/* Kiri: Hamburger Menu & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-500 hover:text-[#0F766E] focus:outline-none p-1"
        >
          <span className="material-icons text-2xl">menu</span>
        </button>
      </div>

      {/* Kanan: Profil & Logout */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E] font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-600">Halo, {userName}</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
        >
          <span className="material-icons text-lg">logout</span>
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>

    </header>
  );
}
