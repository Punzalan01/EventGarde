import React, { useState, useRef, useEffect } from 'react';
import {
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  CubeIcon,
  ExitIcon,
  GearIcon,
  HamburgerMenuIcon,
  LayersIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { GradientButton } from '@/shared/components/ui/gradient-button';
import { RoleType } from './navigation.config';
import { X } from 'lucide-react';
import PricingTable from '@/components/ui/modern-pricing-table';
import { usePricingViewModel } from '@/features/subscriptions/viewmodels/usePricingViewModel';

interface HeaderProps {
  onMenuToggle: () => void;
  isDesktopVisible?: boolean;
  isMobileOpen?: boolean;
  role: RoleType;
}

export function Header({ onMenuToggle, isDesktopVisible = true, isMobileOpen = false, role }: HeaderProps) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const { plans } = usePricingViewModel();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const roles = [
    { id: 'personal', name: 'Personal Dashboard', badge: 'FREE TIER', badgeColor: 'bg-[#F3F4F6] text-[#4B5563]', icon: <PersonIcon className="w-4 h-4" /> },
    { id: 'organizer', name: 'Organizer Workspace', badge: 'VERIFIED BUSINESS', badgeColor: 'bg-[#D1FAE5] text-[#047857]', icon: <LayersIcon className="w-4 h-4" /> },
    { id: 'vendor', name: 'Vendor Storefront', badge: 'PENDING REVIEW', badgeColor: 'bg-[#FEF3C7] text-[#B45309]', icon: <CubeIcon className="w-4 h-4" /> },
  ];

  const utilityButtonClass = 'flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F0F4] text-[#4B5563] shadow-sm ring-1 ring-black/5 transition hover:bg-[#111827] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#6E41E2]/20';

  return (
    <>
    <header className={`sticky top-0 z-30 border-b backdrop-blur-md shadow-[0_4px_20px_rgba(110,65,226,0.08)] ${
      role === 'personal'
        ? 'h-20 border-[#111827]/10 bg-white/90'
        : 'h-16 border-[#D6BCFA]/40'
    }`}>

      {/* Pastel Purple Gradient Background Overlay */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          role === 'personal'
            ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(246,241,255,0.88),rgba(255,255,255,0.96))]'
            : 'bg-gradient-to-r from-[#F3E8FF]/85 via-[#E9D8FD]/85 to-[#D6BCFA]/85'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-4 flex-1">
          {/* Always show hamburger button */}
          <button
            onClick={onMenuToggle}
            className={role === 'personal'
              ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white shadow-sm transition hover:bg-[#6E41E2] focus:outline-none focus:ring-4 focus:ring-[#6E41E2]/20'
              : 'p-2 -ml-2 text-[#5833B5] hover:bg-[#E9D8FD]/50 rounded-lg transition-colors'
            }
            aria-label="Toggle workspace navigation"
          >
            <HamburgerMenuIcon className="w-5 h-5" />
          </button>
          {role === 'personal' ? (
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F0F4] ring-1 ring-black/5">
                <img src="/logo.png" alt="EventGarde" className="h-8 w-8 object-contain" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-black leading-none tracking-tight text-[#111827] sm:text-2xl">
                  EventGarde
                </h2>
                <p className="mt-1 truncate text-xs font-semibold text-[#6B7280] sm:text-sm">
                  Subscription / Free Personal Workspace
                </p>
              </div>
            </div>
          ) : (
            <h2 className="text-[#5833B5] font-bold text-xl hidden sm:block tracking-normal">
              {role === 'organizer' ? 'Organizer Workspace' : role === 'vendor' ? 'Vendor Storefront' : 'Admin'}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

          {role === 'personal' && (
            <div className="hidden items-center gap-2 sm:flex">
              <button type="button" className={utilityButtonClass} aria-label="Notifications">
                <BellIcon className="h-5 w-5" />
              </button>
              <button type="button" className={utilityButtonClass} aria-label="Search">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={utilityButtonClass}
                aria-label="Settings"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <GearIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Organizer billing CTA */}
          {role !== 'personal' && role === 'organizer' && (
            <GradientButton
              className="hidden md:flex items-center justify-center !px-6 !py-2.5 !min-w-fit text-sm"
              onClick={() => setShowPricingModal(true)}
            >
              Billing &amp; Plan
            </GradientButton>
          )}

          {/* All Roles: Notifications */}
          {role !== 'personal' && (
            <button className="relative p-2 text-[#5833B5] hover:bg-[#E9D8FD]/50 rounded-full transition-colors" aria-label="Notifications">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#E9D8FD]"></span>
            </button>
          )}

          {/* Role-specific Profile Dropdown / Settings */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-label="Open profile menu"
              className={role === 'personal'
                ? 'flex min-w-[10.75rem] shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#F1F0F4] py-1 pl-1 pr-3 shadow-sm ring-1 ring-black/5 transition hover:bg-[#E9D8FD]/70'
                : 'flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#E9D8FD]/50 transition-colors'
              }
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className={role === 'personal'
                ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5B5057] text-sm font-black text-white shadow-sm'
                : 'w-9 h-9 rounded-full bg-white text-[#6E41E2] flex items-center justify-center font-bold text-sm border-2 border-[#D6BCFA] shadow-sm'
              }>
                {getInitials(profile?.full_name)}
              </div>
              {role === 'personal' ? (
                <>
                  <span className="hidden max-w-[9rem] truncate text-sm font-black text-[#111827] md:inline">
                    {profile?.full_name || 'Attendee'}
                  </span>
                  <ChevronDownIcon className="hidden h-4 w-4 shrink-0 text-[#6B7280] md:block" />
                </>
              ) : (
                <GearIcon className="w-4 h-4 text-[#5833B5] hidden md:block" />
              )}
            </button>

            {/* Dropdown Modal */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-[0_10px_40px_rgba(110,65,226,0.15)] border border-[#E9D8FD] overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-[#F3E8FF] bg-[#FAFAFC]">
                  <p className="text-sm font-bold text-[#111827] truncate">{profile?.full_name || 'User'}</p>
                  <p className="text-xs font-medium text-[#6B7280] truncate mt-0.5">{profile?.email}</p>
                </div>
                <div className="p-2 border-b border-[#F3E8FF]">
                  <div className="px-2 py-1 mb-1 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                    Switch Workspace
                  </div>
                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => { setIsProfileOpen(false); navigate(`/${r.id}`); }}
                        className={`w-full flex items-start gap-3 p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group
                          ${role === r.id ? 'bg-[#F0EBFF] shadow-sm' : 'hover:bg-gray-50 hover:shadow-sm'}
                        `}
                      >
                        <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                          ${role === r.id ? 'bg-[#6E41E2] text-white' : 'bg-[#F3F4F6] text-[#6B7280] group-hover:bg-white group-hover:text-[#6E41E2] group-hover:shadow-sm'}
                        `}>
                          {r.icon}
                        </div>
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-sm font-bold truncate ${role === r.id ? 'text-[#111827]' : 'text-[#4B5563]'}`}>
                              {r.name}
                            </span>
                            {role === r.id && <CheckIcon className="w-4 h-4 text-[#6E41E2] shrink-0" />}
                          </div>
                          <span className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${r.badgeColor}`}>
                            {r.badge}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <ExitIcon className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 pt-10">
          <div className="relative w-full max-w-6xl bg-[#FAFAFC] rounded-3xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowPricingModal(false)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg text-[#4B5563] hover:text-[#111827] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(110,65,226,0.18),transparent_32%),radial-gradient(circle_at_88%_24%,rgba(255,241,232,0.76),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#FAFAFC_64%,#F0EBFF_100%)]"
            />
            <div className="pt-8 pb-12 px-4">
              <PricingTable
                plans={plans}
                title="Upgrade to Organizer Access"
                description="Unlock powerful event creation, vendor management, and ticketing tools. Choose a plan that scales with your events."
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
