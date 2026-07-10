'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/layouts/admin/AdminSidebar';
import AdminHeader from '@/components/layouts/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-800">

      {/* Sidebar Nav
          - Mobile : fixed, off-screen by default (drawer)
          - Desktop: sticky, menempati ruang di flex container secara alami
          Karena sticky di desktop sudah mendorong konten via flex,
          kita TIDAK perlu margin-left tambahan di main content. */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Area — flex-1 cukup, sidebar sticky sudah atur ruangnya */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">

        {/* Top Header */}
        <AdminHeader setSidebarOpen={setIsSidebarOpen} />

        {/* Content Canvas */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
