import Navbar from '@/components/Shared/Navbar/Navbar';
import React, { ReactNode } from 'react';

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
