'use client';
import React, { useState } from 'react';
import TeacherSidebar from '@/components/layouts/teacher/TeacherSidebar';
import TeacherHeader from '@/components/layouts/teacher/TeacherHeader';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-[family-name:var(--font-geist-sans)]">

      {/* Sidebar Nav
          - Mobile : fixed, off-screen by default (drawer)
          - Desktop: sticky, menempati ruang di flex container secara alami */}
      <TeacherSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area — flex-1 cukup, sidebar sticky sudah atur ruangnya */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <TeacherHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
