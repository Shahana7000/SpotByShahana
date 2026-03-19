import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Player } from '../player/Player';
import { Toaster } from 'sonner';

export const AppShell = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {!isMobile && <Sidebar />}
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {!isMobile && <Navbar />}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pb-24 md:pb-24">
          {children}
        </div>
      </main>

      <Player />
      
      {isMobile && <MobileNav />}

      <Toaster 
        theme="dark"
        toastOptions={{
          className: 'glass-panel text-white border-white/10 shadow-2xl',
        }}
        position="top-center"
      />
    </div>
  );
};
