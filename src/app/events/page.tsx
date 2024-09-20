"use client";

import Sidebar from '@/app/components/Sidebar';

export default function Events({ children }) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }