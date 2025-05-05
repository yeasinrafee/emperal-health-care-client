import Footer from '@/components/Shared/Footer/Footer';
import Navbar from '@/components/Shared/Navbar/Navbar';
import React, { ReactNode } from 'react';

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </>
  );
}
