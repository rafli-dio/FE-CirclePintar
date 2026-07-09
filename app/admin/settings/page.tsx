'use client';
import React, { useState, useEffect } from 'react';

import axios from '@/lib/axios';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    // Simulasi pengambilan profil pengguna dari penyimpanan lokal atau konteks aplikasi
    // Biasanya ini di set saat login: localStorage.setItem('user_data', JSON.stringify(res.data.data));
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFormData(prev => ({ ...prev, name: parsed.name }));
      } catch (e) {
        // Abaikan
      }
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return alert('Data sesi profil tidak valid. Silakan login ulang.');

    if (formData.password && formData.password !== formData.password_confirmation) {
      return alert('Konfirmasi kata sandi baru tidak cocok!');
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem('auth_token');
      
      const payload: any = { name: formData.name };
      if (formData.password) {
        payload.password = formData.password;
        payload.password_confirmation = formData.password_confirmation;
      }

      const res = await axios.put(`/api/users/${user.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedUser = res.data.data;
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      // Beritahu Header untuk memperbarui sapaan (React Custom Event)
      window.dispatchEvent(new Event('user-profile-updated'));
      
      setFormData(prev => ({ ...prev, password: '', password_confirmation: '' }));
      alert('Profil Anda berhasil diperbarui di dalam sistem!');

    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal memperbarui profil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
          Pengaturan Akun
        </h1>
        <p className="text-gray-500 mt-1">Kelola preferensi dan profil pribadi Anda.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar Nav Settings (opsional, untuk masa depan jika ada tab pengaturan lain) */}
        <div className="w-full md:w-64 bg-gray-50 p-6 border-r border-gray-100 flex flex-col gap-2">
          <button className="flex items-center gap-3 text-[#0F766E] font-medium bg-[#0F766E]/10 p-3 rounded-lg text-left transition-colors">
            <span className="material-icons text-[20px]">person</span>
            Profil Saya
          </button>
          <button className="flex items-center gap-3 text-gray-600 font-medium hover:bg-gray-100 p-3 rounded-lg text-left transition-colors">
            <span className="material-icons text-[20px]">notifications</span>
            Notifikasi
          </button>
          <button className="flex items-center gap-3 text-gray-600 font-medium hover:bg-gray-100 p-3 rounded-lg text-left transition-colors">
            <span className="material-icons text-[20px]">security</span>
            Keamanan
          </button>
        </div>

        {/* Form Profil */}
        <div className="flex-1 p-8">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0F766E] to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-500">{user?.role === 'super_admin' ? 'Administrator' : 'Pengguna'}</p>
              <button className="mt-3 px-4 py-1.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Ubah Foto
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input 
                type="text" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] text-gray-800"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
              <input 
                type="email" value={user?.email || ''} disabled
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-2">Email tidak dapat diubah secara langsung demi keamanan. Hubungi teknisi sistem.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Baru (Opsional)</label>
              <input 
                type="password" placeholder="Kosongkan jika tidak diubah" minLength={8}
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
              <input 
                type="password" placeholder="Ulangi kata sandi baru" minLength={8}
                value={formData.password_confirmation} onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <button 
                type="submit" disabled={isSaving}
                className="bg-[#0F766E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0d645d] transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
