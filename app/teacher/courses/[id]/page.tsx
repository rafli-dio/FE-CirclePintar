'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CourseBuilderPage() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // States untuk Modals
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  // States untuk Form
  const [moduleForm, setModuleForm] = useState({ title: '', order_number: 1 });
  const [materialForm, setMaterialForm] = useState({
    title: '',
    type: 'video', // 'video', 'pdf', 'text'
    order_number: 1,
    content_url: '',
    file: null as File | null
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth_token');
      
      // Ambil detail kelas
      const courseRes = await axios.get(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourse(courseRes.data.data);

      // Ambil daftar modul & materinya
      const modulesRes = await axios.get(`/api/courses/${id}/modules`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModules(modulesRes.data.data);

    } catch (error) {
      console.error("Gagal memuat data kelas", error);
      alert('Gagal memuat data atau Anda tidak memiliki akses.');
      router.push('/teacher/courses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Handler Submit Modul
  const handleModuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`/api/courses/${id}/modules`, moduleForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModuleModal(false);
      setModuleForm({ title: '', order_number: modules.length + 2 });
      fetchData(); // Refresh data
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menambahkan modul');
    }
  };

  // Handler Submit Materi
  const handleMaterialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModuleId) return;

    try {
      const token = localStorage.getItem('auth_token');
      
      // Gunakan FormData karena bisa upload file (PDF)
      const formData = new FormData();
      formData.append('title', materialForm.title);
      formData.append('type', materialForm.type);
      formData.append('order_number', materialForm.order_number.toString());
      
      if (materialForm.type === 'pdf' && materialForm.file) {
        formData.append('file', materialForm.file);
      } else {
        formData.append('content_url', materialForm.content_url);
      }

      await axios.post(`/api/modules/${activeModuleId}/materials`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setShowMaterialModal(false);
      setMaterialForm({ title: '', type: 'video', order_number: 1, content_url: '', file: null });
      fetchData(); // Refresh data
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menambahkan materi');
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500 font-medium">Memuat Builder Kurikulum...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 pb-20">
      
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link href="/teacher/courses" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0F766E]">Builder Kurikulum</h1>
          <p className="text-sm text-gray-500">Rakit struktur pembelajaran dan unggah materi.</p>
        </div>
      </div>

      {/* Course Banner Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 relative overflow-hidden">
        <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${course?.thumbnail_url || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400'})` }} />
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#F97316] text-xs font-bold bg-orange-50 w-max px-2 py-1 rounded mb-2 uppercase tracking-wide">
            {course?.category?.name || 'Kategori Umum'}
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{course?.title}</h2>
          <p className="text-gray-500 text-sm line-clamp-2">{course?.description}</p>
        </div>
      </div>

      {/* Builder Tools Area */}
      <div className="flex justify-between items-end mt-4">
        <div>
          <h3 className="text-xl font-bold text-[#0F766E]">Struktur Modul ({modules.length})</h3>
          <p className="text-sm text-gray-500">Daftar bab dan materi di kelas ini.</p>
        </div>
        <button 
          onClick={() => {
            setModuleForm({ title: '', order_number: modules.length + 1 });
            setShowModuleModal(true);
          }}
          className="bg-[#F97316] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-icons text-[20px]">add_circle</span>
          Bab Modul Baru
        </button>
      </div>

      {/* Modul List */}
      {modules.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed">
          <span className="material-icons text-5xl text-gray-300 mb-3">account_tree</span>
          <p className="text-gray-500 font-medium">Kelas ini belum memiliki Modul/Bab.</p>
          <p className="text-gray-400 text-sm">Klik tombol "Bab Modul Baru" untuk mulai menyusun kurikulum.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Module Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#0F766E]/10 text-[#0F766E] font-bold flex items-center justify-center">
                    {module.order_number}
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">{module.title}</h4>
                </div>
                <button 
                  onClick={() => {
                    setActiveModuleId(module.id);
                    setMaterialForm({ ...materialForm, order_number: (module.materials?.length || 0) + 1 });
                    setShowMaterialModal(true);
                  }}
                  className="text-sm font-semibold text-[#0F766E] bg-[#0F766E]/10 px-4 py-2 rounded-lg hover:bg-[#0F766E]/20 transition-colors flex items-center gap-1"
                >
                  <span className="material-icons text-[16px]">add</span> Materi
                </button>
              </div>

              {/* Materials List */}
              <div className="p-4 flex flex-col gap-2">
                {(!module.materials || module.materials.length === 0) ? (
                  <p className="text-sm text-gray-400 italic py-2 pl-12">Belum ada materi di modul ini.</p>
                ) : (
                  module.materials.map((mat: any) => (
                    <div key={mat.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors ml-11">
                      <div className="flex items-center gap-3">
                        <span className={`material-icons text-[20px] ${
                          mat.type === 'video' ? 'text-red-500' : mat.type === 'pdf' ? 'text-blue-500' : 'text-gray-500'
                        }`}>
                          {mat.type === 'video' ? 'play_circle' : mat.type === 'pdf' ? 'picture_as_pdf' : 'article'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">{mat.title}</p>
                          <p className="text-xs text-gray-400 capitalize">Tipe: {mat.type}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 p-1">
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL TAMBAH MODUL --- */}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Buat Bab Modul Baru</h2>
              <button onClick={() => setShowModuleModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleModuleSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Bab Modul</label>
                <input 
                  type="text" required placeholder="Contoh: Pendahuluan"
                  value={moduleForm.title} onChange={e => setModuleForm({...moduleForm, title: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#F97316]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Urut</label>
                <input 
                  type="number" required min="1"
                  value={moduleForm.order_number} onChange={e => setModuleForm({...moduleForm, order_number: parseInt(e.target.value)})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#F97316]"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowModuleModal(false)} className="px-4 py-2 font-medium text-gray-600">Batal</button>
                <button type="submit" className="bg-[#F97316] text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600">Simpan Modul</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL TAMBAH MATERI --- */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-[#0F766E]/5">
              <h2 className="text-lg font-bold text-[#0F766E]">Tambah Materi Baru</h2>
              <button onClick={() => setShowMaterialModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleMaterialSubmit} className="p-6 flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Materi</label>
                <input 
                  type="text" required placeholder="Contoh: Video Pengantar"
                  value={materialForm.title} onChange={e => setMaterialForm({...materialForm, title: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Materi</label>
                  <select 
                    value={materialForm.type} onChange={e => setMaterialForm({...materialForm, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#0F766E] appearance-none bg-white"
                  >
                    <option value="video">Video URL (Youtube/MP4)</option>
                    <option value="pdf">Berkas Dokumen PDF</option>
                    <option value="text">Artikel / Teks (URL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                  <input 
                    type="number" required min="1"
                    value={materialForm.order_number} onChange={e => setMaterialForm({...materialForm, order_number: parseInt(e.target.value)})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              {materialForm.type === 'pdf' ? (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unggah File PDF (Max 50MB)</label>
                  <input 
                    type="file" accept="application/pdf" required
                    onChange={e => setMaterialForm({...materialForm, file: e.target.files ? e.target.files[0] : null})}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0F766E]/10 file:text-[#0F766E] hover:file:bg-[#0F766E]/20"
                  />
                </div>
              ) : (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Tautan Eksternal</label>
                  <input 
                    type="url" required placeholder="https://youtube.com/..."
                    value={materialForm.content_url} onChange={e => setMaterialForm({...materialForm, content_url: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#0F766E]"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowMaterialModal(false)} className="px-5 py-2 font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Batal</button>
                <button type="submit" className="bg-[#0F766E] text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 shadow-sm">
                  Simpan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
