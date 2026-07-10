'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: AdminSidebarProps) {
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
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}
          w-64
        `}
      >
        {/* Logo & Toggle Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0 overflow-hidden">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center overflow-hidden transition-all duration-300 ${isCollapsed ? 'lg:w-0 lg:opacity-0' : 'opacity-100'}`}
          >
            <Image
              src="/logo-circle-pintar.png"
              alt="Circle Pintar Logo"
              width={130}
              height={35}
              priority
              style={{ objectFit: 'contain', height: '32px', width: 'auto' }}
            />
          </Link>

          {/* Toggle Button (Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-[#0F766E] hover:bg-gray-100 transition-all shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}
            title={isCollapsed ? 'Buka Sidebar' : 'Ciutkan Sidebar'}
          >
            <span className="material-icons text-xl">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>

          {/* Close Button (Mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600"
          >
            <span className="material-icons text-xl">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                title={item.name}
                style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
                className={`
                  w-full flex items-center rounded-xl transition-all duration-200 font-medium group relative
                  ${isCollapsed ? 'p-[10px]' : 'gap-3 px-3 py-3'}
                  ${isActive
                    ? 'bg-[#0F766E] text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F766E]'
                  }
                `}
              >
                <span className="material-icons text-xl shrink-0">{item.icon}</span>

                {/* Label — tidak dirender sama sekali saat collapsed */}
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{item.name}</span>
                )}

                {/* Tooltip saat collapsed */}
                {isCollapsed && (
                  <div className="hidden lg:group-hover:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
