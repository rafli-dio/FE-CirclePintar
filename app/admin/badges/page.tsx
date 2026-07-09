'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export default function BadgesManagementPage() {
  const [badges, setBadges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    badge_type: 'quiz_score',
    requirement_value: 1,
    reward_xp: 0
  });

  const fetchBadges = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth_token');
      const res = await axios.get('/api/badges', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBadges(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data badge", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus Lencana ini?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`/api/badges/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBadges();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menghapus lencana');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      
      const payload = {
        ...formData,
        requirement_value: parseInt(formData.requirement_value.toString()),
        reward_xp: parseInt(formData.reward_xp.toString())
      };

      if (editId) {
        await axios.put(`/api/badges/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/badges', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      closeForm();
      fetchBadges();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menyimpan lencana');
    }
  };

  const openEdit = (badge: any) => {
    setEditId(badge.id);
    setFormData({ 
      name: badge.name, 
      description: badge.description, 
      badge_type: badge.badge_type,
      requirement_value: badge.requirement_value,
      reward_xp: badge.reward_xp
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      name: '', description: '', badge_type: 'quiz_score', requirement_value: 1, reward_xp: 0
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">
            Kelola Badges (Lencana)
          </h1>
          <p className="text-gray-500 mt-1">Atur syarat pencapaian dan imbalan XP untuk memotivasi siswa.</p>
        </div>
        <button 
          onClick={() => {
            setEditId(null);
            setFormData({ name: '', description: '', badge_type: 'quiz_score', requirement_value: 1, reward_xp: 0 });
            setShowForm(true);
          }}
          className="bg-[#0F766E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#0d645d] transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="material-icons text-sm">workspace_premium</span>
          Buat Lencana Baru
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                <span className="material-icons align-middle mr-2 text-[#F97316]">emoji_events</span>
                {editId ? 'Edit Lencana Pencapaian' : 'Buat Lencana Pencapaian'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lencana</label>
                  <input 
                    type="text" placeholder="Contoh: Sang Juara Kuis" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Pencapaian (Trigger)</label>
                  <select 
                    required
                    value={formData.badge_type} onChange={e => setFormData({...formData, badge_type: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] appearance-none bg-white"
                  >
                    <option value="quiz_score">Berdasarkan Nilai Kuis (Quiz Score)</option>
                    <option value="xp_milestone">Berdasarkan Total XP (XP Milestone)</option>
                    <option value="course_complete">Berdasarkan Kelas Selesai (Course Complete)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Syarat Nilai / Jumlah Minimum</label>
                  <input 
                    type="number" placeholder="Contoh: 100" required min="1"
                    value={formData.requirement_value} onChange={e => setFormData({...formData, requirement_value: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi & Syarat Mendapatkan</label>
                  <textarea 
                    placeholder="Contoh: Diberikan kepada murid yang berhasil meraih nilai 100 berturut-turut." required rows={2}
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E] resize-none"
                  />
                </div>

                <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                  <label className="block text-sm font-bold text-[#F97316] mb-1">Bonus XP (Opsional)</label>
                  <p className="text-xs text-gray-500 mb-2">Berapa tambahan XP yang didapat siswa jika meraih lencana ini?</p>
                  <div className="relative w-full md:w-1/2">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#F97316] text-xl">stars</span>
                    <input 
                      type="number" required min="0"
                      value={formData.reward_xp} onChange={e => setFormData({...formData, reward_xp: parseInt(e.target.value) || 0})}
                      className="w-full border border-[#F97316]/30 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#F97316] bg-orange-50/30"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Batal
                </button>
                <button type="submit" className="bg-[#0F766E] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0d645d] transition-colors shadow-sm">
                  Simpan Lencana
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Card Grid */}
      {isLoading ? (
        <div className="text-center p-8 text-gray-400">Loading data lencana...</div>
      ) : badges.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed">
          <span className="material-icons text-5xl text-gray-300 mb-3">workspace_premium</span>
          <p className="text-gray-500">Belum ada Lencana yang dibuat.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button onClick={() => openEdit(badge)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <span className="material-icons text-sm">edit</span>
                </button>
                <button onClick={() => handleDelete(badge.id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <span className="material-icons text-sm">delete</span>
                </button>
              </div>
              
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-4 border-2 border-orange-200">
                <span className="material-icons text-3xl text-orange-500">emoji_events</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{badge.description}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Tipe Pencapaian</span>
                  <span className="font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {badge.badge_type === 'quiz_score' ? 'Nilai Kuis' : badge.badge_type === 'xp_milestone' ? 'Total XP' : 'Kelas Selesai'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Syarat Minimum</span>
                  <span className="font-semibold text-gray-800">{badge.requirement_value}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Bonus XP</span>
                  <span className="font-bold text-[#F97316]">+{badge.reward_xp} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
