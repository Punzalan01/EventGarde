import React from 'react';
import { Menu, Bell, Sparkles, ChevronDown, CreditCard, Settings } from 'lucide-react';
import { RoleType } from './navigation.config';

interface HeaderProps {
  onMenuToggle: () => void;
  isDesktopVisible?: boolean;
  isMobileOpen?: boolean;
  role: RoleType;
}

export function Header({ onMenuToggle, isDesktopVisible = true, isMobileOpen = false, role }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b backdrop-blur-md border-[#D6BCFA]/40 shadow-[0_4px_20px_rgba(110,65,226,0.08)] overflow-hidden">
      
      {/* Pastel Purple Gradient Background Overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F3E8FF]/85 via-[#E9D8FD]/85 to-[#D6BCFA]/85"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4 flex-1">
          {/* Always show hamburger button */}
          <button 
            onClick={onMenuToggle}
            className="p-2 -ml-2 text-[#5833B5] hover:bg-[#E9D8FD]/50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Personal Workspace: Upgrade CTA */}
          {role === 'personal' && (
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6E41E2] to-[#8c65f0] text-white text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(110,65,226,0.25)] hover:shadow-[0_6px_20px_rgba(110,65,226,0.35)] transition-all hover:-translate-y-0.5 border border-white/20">
              <Sparkles className="w-4 h-4 text-[#FFF1E8]" />
              Upgrade to Business
            </button>
          )}

          {/* Organizer Workspace: Billing & Subscription */}
          {role === 'organizer' && (
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-[#6E41E2] text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-all border border-[#D6BCFA]">
              <CreditCard className="w-4 h-4 text-[#5833B5]" />
              Billing & Plan
            </button>
          )}

          {/* All Roles: Notifications */}
          <button className="relative p-2 text-[#5833B5] hover:bg-[#E9D8FD]/50 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#E9D8FD]"></span>
          </button>
          
          {/* Role-specific Profile Dropdown / Settings */}
          <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#E9D8FD]/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-white text-[#6E41E2] flex items-center justify-center font-bold text-sm border-2 border-[#D6BCFA] shadow-sm">
              JD
            </div>
            {role === 'personal' ? (
              <ChevronDown className="w-4 h-4 text-[#5833B5] hidden md:block" />
            ) : (
              <Settings className="w-4 h-4 text-[#5833B5] hidden md:block" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
