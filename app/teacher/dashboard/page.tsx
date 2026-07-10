'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';

export default function TeacherDashboardPage() {
  const [coursesCount, setCoursesCount] = useState(0);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('Pendidik');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userDataStr = localStorage.getItem('user_data');
        let teacherId = null;
        
        if (userDataStr) {
          const user = JSON.parse(userDataStr);
          teacherId = user.id;
          if (user.name) setUserName(user.name);
        }

        if (!teacherId) return;

        // Fetch semua course, lalu filter miliknya
        const res = await axios.get('/api/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const allCourses = res.data.data;
        const myCourses = allCourses.filter((c: any) => c.user_id === teacherId);
        
        setCoursesCount(myCourses.length);
        
        // Ambil 3 kelas terbaru
        setRecentCourses(myCourses.slice(0, 3));
        
      } catch (error) {
        console.error("Gagal memuat data dasbor guru", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#F97316] to-amber-500 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 w-full md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-fredoka)] mb-2">
            Selamat Datang, Pak/Bu {userName.split(' ')[0]}! 👋
          </h1>
          <p className="text-orange-50 text-lg opacity-90">
            Mari kita bentuk generasi emas hari ini. Rancang materi kelas Anda dengan mudah dan mulailah mengajar.
          </p>
        </div>
        {/* Dekorasi Latar Belakang */}
        <span className="material-icons absolute -right-4 -bottom-4 text-[150px] text-white opacity-20 transform -rotate-12 pointer-events-none">
          local_library
        </span>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-icons text-3xl">menu_book</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Kelas yang Diasuh</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? '...' : coursesCount}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-icons text-3xl">people</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Murid (Estimasi)</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLoading ? '...' : (coursesCount * 12)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-icons text-3xl">quiz</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ujian / Kuis Aktif</p>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
          </div>
        </div>
      </div>

      {/* Konten Terkini */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0F766E]">Daftar Kelas Anda</h2>
          <Link href="/teacher/courses" className="text-sm text-[#F97316] font-medium hover:underline">
            Lihat Semua Kelas
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-400">Memuat kelas Anda...</div>
        ) : recentCourses.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
            <span className="material-icons text-4xl text-gray-300 mb-2">assignment</span>
            <p className="text-gray-500 font-medium">Belum ada kelas yang ditugaskan kepada Anda.</p>
            <p className="text-sm text-gray-400 mt-1">Hubungi Administrator jika ini sebuah kesalahan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {recentCourses.map(course => (
              <div key={course.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col">
                <div className="h-32 bg-gray-100 relative w-full">
                   <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${course.thumbnail_url || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-medium px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">
                      {course.category?.name || 'Umum'}
                    </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{course.description}</p>
                  
                  <Link 
                    href={`/teacher/courses/${course.id}`} 
                    className="w-full text-center bg-orange-50 text-[#F97316] py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition-colors"
                  >
                    Kelola Materi Kelas
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
