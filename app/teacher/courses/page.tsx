'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<number | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    description: '',
    thumbnail_file: null as File | null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const fetchCourses = async (tId?: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      const id = tId ?? teacherId;

      const res = await axios.get('/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const myCourses = res.data.data.filter((c: any) => c.user_id === id);
      setCourses(myCourses);
    } catch (error) {
      console.error("Gagal memuat kelas", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userDataStr = localStorage.getItem('user_data');
        let tId = null;

        if (userDataStr) {
          const user = JSON.parse(userDataStr);
          tId = user.id;
          setTeacherId(tId);
        }

        if (!tId) return;

        // Fetch Kategori untuk dropdown form
        const catRes = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(catRes.data.data);

        await fetchCourses(tId);
      } catch (error) {
        console.error("Gagal inisialisasi", error);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const token = localStorage.getItem('auth_token');

      // Gunakan FormData agar bisa upload file gambar
      const fd = new FormData();
      fd.append('category_id', formData.category_id);
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      if (formData.thumbnail_file) {
        fd.append('thumbnail_file', formData.thumbnail_file);
      }

      await axios.post('/api/courses', fd, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      setShowModal(false);
      setFormData({ category_id: '', title: '', description: '', thumbnail_file: null });
      setThumbnailPreview(null);
      await fetchCourses();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal membuat kelas baru.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    (course.category?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
            Kelas Saya
          </h1>
          <p className="text-gray-500 mt-1">Kelola kerangka pembelajaran pada kelas yang Anda asuh.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95"
        >
          <span className="material-icons text-[20px]">add_circle</span>
          Buat Kelas Baru
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
        <div className="flex-1 relative">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Cari nama kelas atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#F97316] transition-colors"
          />
        </div>
      </div>

      {/* Modal Tambah Kelas */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-orange-50">
              <div>
                <h2 className="text-xl font-bold text-[#F97316]">Buat Kelas Baru</h2>
                <p className="text-sm text-orange-700/70 mt-0.5">Anda secara otomatis menjadi Guru pengampu kelas ini.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-icons">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama / Judul Kelas <span className="text-red-500">*</span></label>
                <input
                  type="text" required placeholder="Contoh: Matematika Dasar Kelas 7"
                  value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#F97316] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Kelas <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.category_id} onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#F97316] bg-white appearance-none"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Kelas <span className="text-red-500">*</span></label>
                <textarea
                  required rows={3} placeholder="Jelaskan topik, tujuan pembelajaran, dan target peserta kelas ini..."
                  value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#F97316] resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Kelas (Opsional)</label>
                
                {/* Preview Area */}
                {thumbnailPreview && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-gray-200">
                    <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setThumbnailPreview(null); setFormData({...formData, thumbnail_file: null}); }}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    >
                      <span className="material-icons text-sm">close</span>
                    </button>
                  </div>
                )}

                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-[#F97316] transition-colors">
                  <span className="material-icons text-3xl text-gray-400 mb-1">add_photo_alternate</span>
                  <span className="text-sm font-medium text-gray-500">Klik untuk pilih gambar</span>
                  <span className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP · Maks 5MB</span>
                  <input 
                    type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0] || null;
                      setFormData({...formData, thumbnail_file: file});
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setThumbnailPreview(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setThumbnailPreview(null);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  Batal
                </button>
                <button
                  type="submit" disabled={isSaving}
                  className="bg-[#F97316] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Membuat Kelas...' : 'Buat Kelas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Memuat data kelas...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center">
          <span className="material-icons text-6xl text-gray-200 mb-3">inbox</span>
          <p className="text-gray-500 text-lg font-medium">Belum ada kelas yang Anda buat.</p>
          <p className="text-gray-400 text-sm mt-1">Klik tombol "Buat Kelas Baru" untuk mulai mengajar!</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 bg-[#F97316] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-icons text-[18px]">add_circle</span>
            Buat Kelas Pertama Saya
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">

              {/* Thumbnail */}
              <div className="h-40 bg-gray-100 relative w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${course.thumbnail_url || course.thumbnail || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur text-[#F97316] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {course.category?.name || 'Umum'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-bold text-white text-lg line-clamp-2 leading-tight group-hover:text-orange-300 transition-colors">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-gray-500 line-clamp-3 mb-5 flex-1">{course.description}</p>

                <Link
                  href={`/teacher/courses/${course.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#F97316] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
                >
                  <span className="material-icons text-[18px]">edit_note</span>
                  Buka Builder Modul
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
