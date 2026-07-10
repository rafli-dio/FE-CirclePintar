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

  const INITIAL_MATERIAL_FORM = {
    title: '',
    type: 'video',
    order_number: 1,
    content_url: '',
    content_body: '',
    file: null as File | null,
  };
  const [materialForm, setMaterialForm] = useState(INITIAL_MATERIAL_FORM);
  const [textMode, setTextMode] = useState<'body' | 'url'>('body');
  const [previewMaterial, setPreviewMaterial] = useState<any>(null);

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

  // Handler Hapus Modul
  const handleDeleteModule = async (moduleId: number, moduleTitle: string) => {
    if (!confirm(`Yakin ingin menghapus modul "${moduleTitle}"? Semua materi di dalamnya juga akan terhapus!`)) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`/api/modules/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menghapus modul');
    }
  };

  // Handler Hapus Materi
  const handleDeleteMaterial = async (materialId: number, materialTitle: string) => {
    if (!confirm(`Yakin ingin menghapus materi "${materialTitle}"?`)) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`/api/materials/${materialId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menghapus materi');
    }
  };

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
        if (materialForm.content_body) {
          formData.append('content_body', materialForm.content_body);
        }
      }

      await axios.post(`/api/modules/${activeModuleId}/materials`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setShowMaterialModal(false);
      setMaterialForm({ title: '', type: 'video', order_number: 1, content_url: '', content_body: '', file: null });
      setTextMode('body');
      fetchData();
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
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setActiveModuleId(module.id);
                      // Reset SELURUH form ke nilai bersih, jangan spread state lama
                      setMaterialForm({
                        title: '',
                        type: 'video',
                        order_number: (module.materials?.length || 0) + 1,
                        content_url: '',
                        content_body: '',
                        file: null,
                      });
                      setTextMode('body');
                      setShowMaterialModal(true);
                    }}
                    className="text-sm font-semibold text-[#0F766E] bg-[#0F766E]/10 px-4 py-2 rounded-lg hover:bg-[#0F766E]/20 transition-colors flex items-center gap-1"
                  >
                    <span className="material-icons text-[16px]">add</span> Materi
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id, module.title)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Hapus Modul"
                  >
                    <span className="material-icons text-[18px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Materials List */}
              <div className="p-4 flex flex-col gap-2">
                {(!module.materials || module.materials.length === 0) ? (
                  <p className="text-sm text-gray-400 italic py-2 pl-12">Belum ada materi di modul ini.</p>
                ) : (
                  module.materials.map((mat: any) => (
                    <div key={mat.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors ml-11 gap-3">
                      {/* Info Materi */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className={`material-icons text-[22px] shrink-0 ${
                          mat.type === 'video' ? 'text-red-500' : mat.type === 'pdf' ? 'text-blue-500' : 'text-green-500'
                        }`}>
                          {mat.type === 'video' ? 'play_circle' : mat.type === 'pdf' ? 'picture_as_pdf' : 'article'}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">{mat.title}</p>
                          <p className="text-xs text-gray-400 capitalize">{mat.type === 'video' ? 'Video' : mat.type === 'pdf' ? 'Dokumen PDF' : 'Artikel/Teks'}</p>
                        </div>
                      </div>

                      {/* Aksi */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Tombol Pratinjau */}
                        <button
                          onClick={() => setPreviewMaterial(mat)}
                          title="Pratinjau Materi"
                          className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] bg-[#0F766E]/10 hover:bg-[#0F766E]/20 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span className="material-icons text-[15px]">visibility</span>
                          Pratinjau
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDeleteMaterial(mat.id, mat.title)}
                          title="Hapus Materi"
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <span className="material-icons text-[18px]">delete</span>
                        </button>
                      </div>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-[#0F766E]/5 shrink-0">
              <h2 className="text-lg font-bold text-[#0F766E]">Tambah Materi Baru</h2>
              <button onClick={() => setShowMaterialModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleMaterialSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
              
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
                    value={materialForm.type} 
                    onChange={e => setMaterialForm({
                      ...materialForm, 
                      type: e.target.value,
                      content_url: '',
                      content_body: '',
                      file: null,
                    })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#0F766E] appearance-none bg-white"
                  >
                    <option value="video">🎬 Video URL (Youtube/MP4)</option>
                    <option value="pdf">📄 Berkas Dokumen PDF</option>
                    <option value="text">📝 Teks / Artikel Panjang</option>
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
              ) : materialForm.type === 'text' ? (
                <div className="mt-2 flex flex-col gap-3">
                  {/* Pilihan: ketik langsung ATAU tautkan URL */}
                  <div className="flex rounded-xl overflow-hidden border border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setTextMode('body');
                        setMaterialForm({...materialForm, content_url: ''});
                      }}
                      className={`flex-1 py-2 text-sm font-medium transition-colors ${
                        textMode === 'body'
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      ✏️ Ketik Langsung
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTextMode('url');
                        setMaterialForm({...materialForm, content_body: ''});
                      }}
                      className={`flex-1 py-2 text-sm font-medium transition-colors ${
                        textMode === 'url'
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      🔗 Tautan URL
                    </button>
                  </div>

                  {textMode === 'body' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Isi Materi Teks
                        <span className="ml-2 text-xs text-gray-400">{materialForm.content_body?.length || 0} karakter</span>
                      </label>
                      <textarea
                        required
                        rows={10}
                        placeholder="Tulis isi materi secara lengkap di sini. Anda bisa menjelaskan konsep, menambahkan contoh soal, menulis ringkasan, atau catatan apapun untuk siswa..."
                        value={materialForm.content_body || ''}
                        onChange={e => setMaterialForm({...materialForm, content_body: e.target.value})}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] resize-y text-sm leading-relaxed"
                      />
                      <p className="text-xs text-gray-400 mt-1">💡 Tip: Gunakan baris kosong untuk membuat paragraf baru.</p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL Tautan Artikel</label>
                      <input
                        type="url" required placeholder="https://..."
                        value={materialForm.content_url || ''}
                        onChange={e => setMaterialForm({...materialForm, content_url: e.target.value})}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#0F766E]"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Tautan Eksternal</label>
                  <input 
                    type="url" required placeholder="https://youtube.com/..."
                    value={materialForm.content_url || ''}
                    onChange={e => setMaterialForm({...materialForm, content_url: e.target.value})}
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

      {/* --- MODAL PRATINJAU MATERI --- */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50 shrink-0">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className={`material-icons ${
                  previewMaterial.type === 'video' ? 'text-red-500' : previewMaterial.type === 'pdf' ? 'text-blue-500' : 'text-green-500'
                }`}>
                  {previewMaterial.type === 'video' ? 'play_circle' : previewMaterial.type === 'pdf' ? 'picture_as_pdf' : 'article'}
                </span>
                {previewMaterial.title}
              </h2>
              <button onClick={() => setPreviewMaterial(null)} className="text-gray-400 hover:text-gray-600 bg-white p-1 rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              {previewMaterial.type === 'text' && previewMaterial.content_body ? (
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                  <div className="prose prose-teal max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
                      {previewMaterial.content_body}
                    </div>
                  </div>
                </div>
              ) : previewMaterial.type === 'pdf' && previewMaterial.content_url ? (
                <div className="h-[70vh] bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                  <iframe 
                    src={previewMaterial.content_url} 
                    className="w-full h-full"
                    title="Pratinjau PDF"
                  />
                </div>
              ) : previewMaterial.type === 'video' && previewMaterial.content_url ? (
                <div className="flex flex-col items-center justify-center h-[50vh] max-w-2xl mx-auto text-center gap-4 bg-white rounded-xl border border-gray-100 p-8">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                    <span className="material-icons text-4xl">play_arrow</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Pratinjau Video</h3>
                  <p className="text-gray-500 mb-4 text-sm">Video eksternal (YouTube/Drive) akan dibuka di tab baru untuk pengalaman menonton terbaik.</p>
                  <a 
                    href={previewMaterial.content_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    Buka Video <span className="material-icons text-sm">open_in_new</span>
                  </a>
                </div>
              ) : previewMaterial.content_url ? (
                <div className="flex flex-col items-center justify-center h-[40vh] max-w-md mx-auto text-center gap-4 bg-white rounded-xl border border-gray-100 p-8">
                  <span className="material-icons text-5xl text-blue-500">link</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Tautan Eksternal</h3>
                    <p className="text-sm text-gray-500 mt-1">Materi ini adalah tautan ke website lain.</p>
                  </div>
                  <a 
                    href={previewMaterial.content_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-50 text-blue-600 border border-blue-100 px-6 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors mt-2"
                  >
                    Kunjungi Tautan
                  </a>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <span className="material-icons text-6xl mb-4 opacity-50">warning_amber</span>
                  <p>Materi tidak memiliki konten yang bisa ditampilkan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
