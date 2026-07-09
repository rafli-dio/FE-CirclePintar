'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth_token');
      const res = await axios.get('/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data kategori", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menghapus kategori');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      if (editId) {
        // Mode Edit
        await axios.put(`/api/categories/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Mode Tambah
        await axios.post('/api/categories', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      closeForm();
      fetchCategories();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menyimpan kategori');
    }
  };

  const openEdit = (cat: any) => {
    setEditId(cat.id);
    setFormData({ name: cat.name });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ name: '' });
  };

  const filteredCategories = categories.filter((c) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
            Kategori Kelas
          </h1>
          <p className="text-gray-500 mt-1">Kelola master data Kategori Pelajaran.</p>
        </div>
        <button 
          onClick={() => {
            setEditId(null);
            setFormData({ name: '' });
            setShowForm(true);
          }}
          className="bg-[#0F766E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#0d645d] transition-all flex items-center gap-2"
        >
          <span className="material-icons text-sm">add</span>
          Tambah Kategori
        </button>
      </div>

      {/* Form Tambah (Modal) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{editId ? 'Edit Kategori' : 'Kategori Baru'}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kategori</label>
                <input 
                  type="text" placeholder="Misal: Matematika, IPA, Pemrograman" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Batal
                </button>
                <button type="submit" className="bg-[#F97316] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#e06612] transition-colors shadow-sm">
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            type="text" 
            placeholder="Cari kategori..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#0F766E] transition-colors"
          />
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium w-16">ID</th>
                <th className="p-4 font-medium">Nama Kategori</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400">Loading data...</td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400">Tidak ada kategori yang ditemukan.</td>
                </tr>
              ) : (
                filteredCategories.map((cat, index) => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 font-bold text-gray-800">{cat.name}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => openEdit(cat)}
                        className="text-blue-500 hover:text-blue-700 p-2 transition-colors mr-2"
                        title="Edit Kategori"
                      >
                        <span className="material-icons text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                        title="Hapus Kategori"
                      >
                        <span className="material-icons text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
