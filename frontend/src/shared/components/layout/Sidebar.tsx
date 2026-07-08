import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoleType, NavigationConfig } from './navigation.config';
import { X } from 'lucide-react';

interface SidebarProps {
  role: RoleType;
  isDesktopVisible: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onDesktopClose?: () => void;
}

export function Sidebar({ role, isDesktopVisible, isMobileOpen, onMobileClose, onDesktopClose }: SidebarProps) {
  const links = NavigationConfig[role] || [];

  return (
    <>
      {/* Overlay - visible on mobile when open, and desktop when visible */}
      <div
        className={`fixed inset-0 bg-[#111827]/40 z-40 transition-opacity duration-300 ease-in-out
          ${(isMobileOpen || isDesktopVisible) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => {
          onMobileClose();
          if (onDesktopClose) onDesktopClose();
        }}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-50 w-64
          transition-transform duration-300 ease-in-out will-change-transform
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDesktopVisible ? 'md:translate-x-0' : 'md:-translate-x-full'}
        `}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="flex flex-col h-full w-64">
          {/* Logo / Brand Area */}
          <div className="h-16 flex items-center px-4 border-b border-gray-100 justify-between">
            <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="EventGarde Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-extrabold text-[#2D3748] text-xl tracking-tight">
                EventGarde
              </span>
            </div>
            {/* Close buttons */}
            <div className="flex items-center">
              <button className="md:hidden text-gray-400 hover:text-[#111827] p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0" onClick={onMobileClose}>
                <X className="w-5 h-5" />
              </button>
              {onDesktopClose && (
                <button className="hidden md:block text-gray-400 hover:text-[#111827] p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0" onClick={onDesktopClose}>
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {links.map((link, index) => {
              if (link.isDivider) {
                return <div key={`divider-${index}`} className="h-px bg-gray-200 my-3 mx-2" />;
              }
              
              const Icon = link.icon!;
              return (
                <NavLink
                  key={link.path || index}
                  to={link.path!}
                  end={link.path === '/organizer' || link.path === '/personal' || link.path === '/vendor'}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm
                    ${isActive
                      ? 'bg-gray-100/80 text-[#2D3748] font-semibold'
                      : 'text-[#4B5563] hover:bg-gray-100 hover:text-[#2D3748] font-normal'
                    }
                  `}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0 text-gray-500" strokeWidth={2} />
                  <span className="whitespace-nowrap">{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
