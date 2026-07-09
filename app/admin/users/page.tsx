'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fitur Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', password_confirmation: '', role: 'student'
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth_token');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Refresh tabel
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menghapus');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      
      // Jika mode Edit tapi password kosong, jangan kirim password
      const submitData = { ...formData };
      if (editId && !submitData.password) {
        delete (submitData as any).password;
        delete (submitData as any).password_confirmation;
      }

      if (editId) {
        await axios.put(`/api/users/${editId}`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/users', submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      closeForm();
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menyimpan pengguna');
    }
  };

  const openEdit = (user: any) => {
    setEditId(user.id);
    setFormData({ 
      name: user.name, 
      email: user.email, 
      password: '', 
      password_confirmation: '', 
      role: user.role 
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ name: '', email: '', password: '', password_confirmation: '', role: 'student' });
  };

  // Filter logika di luar render block (React Best Practice)
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'all' ? true : u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
            Kelola Pengguna
          </h1>
          <p className="text-gray-500 mt-1">Daftar Guru dan Siswa di platform.</p>
        </div>
        <button 
          onClick={() => {
            setEditId(null);
            setFormData({ name: '', email: '', password: '', password_confirmation: '', role: 'student' });
            setShowForm(true);
          }}
          className="bg-[#0F766E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#0d645d] transition-all flex items-center gap-2"
        >
          <span className="material-icons text-sm">add</span>
          Tambah Pengguna
        </button>
      </div>

      {/* Form Tambah Pengguna (Modal) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{editId ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            {/* Modal Body & Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="Nama Lengkap" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                />
                <input 
                  type="email" placeholder="Email Akun" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                />
                <input 
                  type="password" placeholder={editId ? "Password Baru (Kosongkan jika tidak diubah)" : "Password"} 
                  required={!editId} minLength={8}
                  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                  className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                />
                <input 
                  type="password" placeholder="Ulangi Password" 
                  required={!editId} minLength={8}
                  value={formData.password_confirmation} onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
                  className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                />
                <select 
                  value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                  className="md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] appearance-none bg-white"
                >
                  <option value="student">Siswa (Student)</option>
                  <option value="teacher">Guru (Teacher)</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Batal
                </button>
                <button type="submit" className="bg-[#F97316] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#e06612] transition-colors shadow-sm">
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Baris Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input 
            type="text" 
            placeholder="Cari nama atau email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#0F766E] transition-colors"
          />
        </div>
        <div className="w-full sm:w-48">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#0F766E] transition-colors appearance-none bg-white"
          >
            <option value="all">Semua Peran</option>
            <option value="student">Siswa</option>
            <option value="teacher">Guru</option>
            <option value="super_admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">Nama</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Peran (Role)</th>
                <th className="p-4 font-medium">Bergabung</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Loading data...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    Tidak ada pengguna yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'super_admin' ? 'bg-red-100 text-red-600' :
                        user.role === 'teacher' ? 'bg-[#0F766E]/10 text-[#0F766E]' :
                        'bg-orange-100 text-[#F97316]'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(user.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button 
                        onClick={() => openEdit(user)}
                        className="text-blue-500 hover:text-blue-700 p-2 transition-colors"
                        title="Edit Pengguna"
                      >
                        <span className="material-icons text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === 'super_admin'}
                        className="text-red-400 hover:text-red-600 p-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Hapus Pengguna"
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
