'use client';
import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Simulasi pengambilan profil pengguna dari penyimpanan lokal atau konteks aplikasi
    // Biasanya ini di set saat login: localStorage.setItem('auth_user', JSON.stringify(res.data.data));
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Abaikan
      }
    } else {
      // Data dummy sebagai placeholder profil
      setUser({
        name: 'Super Admin',
        email: 'admin@circlepintar.id',
        role: 'super_admin'
      });
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profil berhasil diperbarui secara lokal. (Integrasi API spesifik profil belum diaktifkan).');
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
                type="text" defaultValue={user?.name}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] text-gray-800"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
              <input 
                type="email" defaultValue={user?.email} disabled
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-2">Email tidak dapat diubah secara langsung demi keamanan. Hubungi teknisi sistem.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Baru (Opsional)</label>
              <input 
                type="password" placeholder="Kosongkan jika tidak diubah"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
              <input 
                type="password" placeholder="Ulangi kata sandi baru"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-[#0F766E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0d645d] transition-all shadow-md hover:shadow-lg active:scale-95">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
