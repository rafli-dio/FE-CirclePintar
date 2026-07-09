'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Dapatkan CSRF cookie dari Sanctum
      await axios.get('/sanctum/csrf-cookie');

      // 2. Lakukan request login dan tangkap responsenya
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // 3. Ekstrak data dan token
      const userData = response.data.data;
      const token = response.data.token;
      const role = userData.role;

      // 4. Simpan ke local storage agar persisten
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));

      // 5. Redirect berdasarkan role
      if (role === 'super_admin') {
        router.push('/admin/dashboard');
      } else if (role === 'teacher') {
        router.push('/teacher/dashboard');
      } else if (role === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/'); // Fallback
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrorMsg('Email atau Password salah.');
      } else {
        setErrorMsg('Terjadi kesalahan pada server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      {/* Login Container */}
      <div className="w-full max-w-[1100px] h-full lg:h-[700px] bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        {/* Left Side: Illustration Panel */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full bg-[#f8fffe] hidden md:flex items-center justify-center p-8">
          <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
            <Image
              src="/logo-circle-pintar.png"
              alt="Circle Pintar"
              width={140}
              height={35}
              className="object-contain"
            />
          </div>
          {/* Illustration Box */}
          <div className="relative w-full h-full max-w-[400px] max-h-[500px]">
             <Image
                src="/login-circlepintar.png"
                alt="Login Illustration"
                fill
                style={{ objectFit: 'contain' }}
                priority
             />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="relative w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 lg:py-0">
          
          {/* Back Button */}
          <Link 
            href="/" 
            className="absolute top-6 left-6 sm:top-8 sm:left-10 w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#0F766E] hover:border-[#0F766E] hover:bg-gray-50 transition-all shadow-sm"
            aria-label="Kembali ke Beranda"
          >
            <span className="material-icons text-[20px]">arrow_back</span>
          </Link>

          <div className="w-full max-w-[360px] mx-auto flex flex-col gap-8 mt-8 lg:mt-0">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E] text-center mb-2">
              Login
            </h1>

            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              
              {/* Error Message */}
              {errorMsg && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                  {errorMsg}
                </div>
              )}
              
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-800">Email</label>
                <div className="flex items-center bg-[#E5E7EB]/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F97316] transition-all group border border-transparent focus-within:border-[#F97316]">
                  <div className="pl-4 pr-3 py-2 flex items-center justify-center text-gray-500 border-r border-[#1BAA8A] mx-1 my-1.5">
                    <span className="material-icons text-xl">mail_outline</span>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Contoh@gmail.com" 
                    className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-gray-700 text-[14px] placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-800">Password</label>
                <div className="flex items-center bg-[#E5E7EB]/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#1BAA8A] transition-all border border-transparent focus-within:border-[#1BAA8A]">
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pl-4 pr-3 py-2 flex items-center justify-center text-gray-500 border-r border-[#1BAA8A] mx-1 my-1.5 hover:text-[#0F766E] transition-colors"
                  >
                    <span className="material-icons text-xl">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="****************" 
                    className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-gray-700 text-[14px] tracking-widest placeholder-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-4 bg-[#0F766E] text-white font-semibold text-lg py-3 rounded-xl border-[3px] border-[#F97316] shadow-md hover:bg-[#0d645d] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Log in'}
              </button>

            </form>

            {/* Footer Text */}
            <p className="text-center text-gray-600 text-[14px]">
              Don't have an account?{' '}
              <Link href="/daftar" className="text-gray-500 hover:text-[#0F766E] font-medium underline decoration-gray-400 underline-offset-2">
                Sign Up Here
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
