import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { RoleType } from './navigation.config';

interface DashboardLayoutProps {
  role: RoleType;
  children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMenuToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsSidebarVisible(!isSidebarVisible);
    }
  };

  return (
    <div className={`flex min-h-screen font-sans ${role === 'personal' ? 'bg-transparent' : 'bg-[#FAFAFC]'}`}>
      <Sidebar 
        role={role} 
        isDesktopVisible={isSidebarVisible} 
        isMobileOpen={isMobileOpen} 
        onMobileClose={() => setIsMobileOpen(false)} 
        onDesktopClose={() => setIsSidebarVisible(false)}
      />
      
      {/* Main content wrapper - static, never pushed */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuToggle={handleMenuToggle} 
          isDesktopVisible={isSidebarVisible}
          isMobileOpen={isMobileOpen}
          role={role}
        />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
