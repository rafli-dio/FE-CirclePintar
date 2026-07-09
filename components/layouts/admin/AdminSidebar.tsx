'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Kategori Kelas', path: '/admin/categories', icon: 'category' },
    { name: 'Manajemen Course', path: '/admin/courses', icon: 'menu_book' },
    { name: 'Manajemen Badges', path: '/admin/badges', icon: 'workspace_premium' },
    { name: 'Kelola Pengguna', path: '/admin/users', icon: 'people' },
    { name: 'Pengaturan', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-circle-pintar.png"
              alt="Circle Pintar Logo"
              width={140}
              height={35}
              priority
              style={{ objectFit: 'contain', height: '35px', width: 'auto' }}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-[#0F766E] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F766E]'
                }`}
              >
                <span className="material-icons text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
