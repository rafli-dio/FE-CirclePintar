'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export default function CoursesManagementPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    category_id: '' 
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth_token');
      
      // Ambil daftar Course dan Kategori secara paralel
      const [resCourses, resCategories] = await Promise.all([
        axios.get('/api/courses', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/categories', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setCourses(resCourses.data.data);
      setCategories(resCategories.data.data);
    } catch (error) {
      console.error("Gagal mengambil data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kelas ini? Semua modul dan materi di dalamnya akan ikut terhapus!')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menghapus kelas');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      if (editId) {
        await axios.put(`/api/courses/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/courses', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      closeForm();
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menyimpan kelas');
    }
  };

  const openEdit = (course: any) => {
    setEditId(course.id);
    setFormData({ 
      title: course.title, 
      description: course.description, 
      category_id: course.category?.id?.toString() || '' 
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ title: '', description: '', category_id: '' });
  };

  // Filter logika
  const filteredCourses = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'all' ? true : c.category?.id?.toString() === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
            Mata Pelajaran (Course)
          </h1>
          <p className="text-gray-500 mt-1">Kelola daftar kelas dan mata pelajaran yang tersedia.</p>
        </div>
        <button 
          onClick={() => {
            setEditId(null);
            setFormData({ title: '', description: '', category_id: '' });
            setShowForm(true);
          }}
          className="bg-[#0F766E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#0d645d] transition-all flex items-center gap-2"
        >
          <span className="material-icons text-sm">add</span>
          Buat Kelas Baru
        </button>
      </div>

      {/* Form Tambah (Modal) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{editId ? 'Edit Kelas' : 'Buat Kelas Pembelajaran Baru'}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Kelas</label>
                  <input 
                    type="text" placeholder="Contoh: Matematika Dasar Aljabar" required
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select 
                    required
                    value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] appearance-none bg-white"
                  >
                    <option value="" disabled>-- Pilih Kategori --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat</label>
                  <textarea 
                    placeholder="Tuliskan tujuan dan deskripsi kelas ini..." required rows={3}
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Batal
                </button>
                <button type="submit" className="bg-[#F97316] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#e06612] transition-colors shadow-sm">
                  Simpan Kelas
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
            placeholder="Cari nama kelas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#0F766E] transition-colors"
          />
        </div>
        <div className="w-full sm:w-64">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#0F766E] transition-colors appearance-none bg-white"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">Judul Kelas</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Guru / Pengajar</th>
                <th className="p-4 font-medium">Tanggal Dibuat</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Loading data...</td>
                </tr>
              ) : filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Tidak ada kelas yang ditemukan.</td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-gray-800">{course.title}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E]">
                        {course.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{course.teacher?.name || '-'}</td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(course.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button 
                        onClick={() => openEdit(course)}
                        className="text-blue-500 hover:text-blue-700 p-2 transition-colors"
                        title="Edit Kelas"
                      >
                        <span className="material-icons text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                        title="Hapus Kelas"
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
