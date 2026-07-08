import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonalDashboardViewModel } from '../viewmodels/usePersonalDashboardViewModel';
import { TopEvent, UpcomingEvent } from '../models/personal.model';
import { Search, MapPin, Calendar, QrCode, Lock, ChevronRight, Ticket, X, ShieldAlert, ShieldCheck, ArrowRight, Star, Plus } from 'lucide-react';
import { AnimatedList } from '@/shared/components/ui/AnimatedList';
import AgentPlan from '@/shared/components/ui/agent-plan';
import { Footer } from '@/features/landing/components/Footer';
import { useAuth } from '@/shared/hooks/useAuth';
import { ReviewsSection } from '@/shared/components/blocks/reviews-section';
import { Gallery4 } from '@/shared/components/blocks/gallery4';
import { BackgroundSnippet } from '@/shared/components/ui/background-snippets';
import { LayoutGrid } from '@/shared/components/ui/layout-grid';
import { GradientButton } from '@/shared/components/ui/gradient-button';
import { CoachSchedulingCard } from '@/shared/components/ui/coach-scheduling-card';
import { IdentityCard } from '@/shared/components/ui/identity-card';
import { SimpleFooter } from '@/shared/components/ui/simple-footer';
import { BookmarkIconButton } from '@/components/ui/bookmark-icon-button';
import { AnimatePresence, motion } from 'framer-motion';

export function PersonalDashboardView() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const {
    showRsvpGate,
    setShowRsvpGate,
    otpCode,
    setOtpCode,
    publicEvents,
    digitalTickets,
    handleRsvpSubmit,
    isVerified,
    isVerificationPending,
    handleVerifyAccount,
    topEvents,
    joinedEvents,
    upcomingEvents,
    showSchedulingModal,
    setShowSchedulingModal,
    schedulingEventName,
    handleJoinEvent,
  } = usePersonalDashboardViewModel();

  const upcomingEventsCards = upcomingEvents.slice(0, 4).map((event: UpcomingEvent) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    content: (
      <>
        <div className="absolute top-0 right-0 flex items-center gap-2">
          <BookmarkIconButton />
          <GradientButton
            variant="variant"
            className="!px-4 !py-2 !min-w-fit text-xs md:text-sm shadow-sm"
            onClick={(e: React.MouseEvent) => handleJoinEvent(event.title, e)}
          >
            RSVP Now
          </GradientButton>
        </div>
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">{event.title}</p>
          <p className="font-normal text-base text-white">{event.description}</p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {event.longDescription}
          </p>
        </div>
      </>
    ),
    className: event.className,
    thumbnail: event.thumbnail,
  }));

  return (
    <div className="relative min-h-screen font-sans text-[#4B5563]">
      <BackgroundSnippet />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-8 space-y-10">

        {/* Fixed Left Sidebar: Event Tracker */}
        <div className="hidden lg:block fixed left-4 lg:left-8 top-20 w-[280px] z-30 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <div className="flex flex-col pb-10">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-[#111827] font-bold text-lg tracking-tight">Event Tracker</h3>
            </div>
            <div className="relative z-0 mb-6 overflow-hidden">
              <AgentPlan />
            </div>

          </div>
        </div>

        {/* Fixed Right Sidebar: Identity Card */}


        {/* Main Content (Top Events & Others) */}
        <div className="w-full flex flex-col space-y-10">

          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">Dashboard Overview</h1>
              <span className="px-3 py-1 bg-[#F0EBFF] text-[#6E41E2] font-bold text-sm rounded-full shadow-sm border border-[#D6BCFA]">
                {joinedEvents.length} Entries
              </span>
            </div>
            <p className="text-gray-500 mb-8">Welcome back! Here's a snapshot of your events and activities.</p>
          </div>

          {/* Joined Events (Gallery4) */}
          <Gallery4
            title="Joined Events"
            description="Access the events you have registered or RSVP'd to."
            items={joinedEvents}
          />

          {/* Upcoming Events Grid */}
          <div className="w-full flex flex-col">
            <div className="flex items-end justify-between shrink-0 mb-6">
              <div className="flex flex-col">
                <h2 className="text-[#111827] font-bold text-2xl tracking-tight mb-2">Discover Public Events</h2>
                <p className="text-gray-500 text-sm md:text-base max-w-2xl">Browse and join publicly available events in the directory.</p>
              </div>
              <button
                onClick={() => navigate('discovery')}
                className="text-sm font-semibold text-[#6E41E2] hover:text-[#5833B5] flex items-center transition-colors mb-1"
              >
                View Directory <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="h-[800px] w-full">
              <LayoutGrid cards={upcomingEventsCards} />
            </div>
          </div>

        </div>
      </div>

      {/* RSVP Modal */}
      {showRsvpGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111827]/60 backdrop-blur-sm" onClick={() => setShowRsvpGate(false)} />
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl relative z-10 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowRsvpGate(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#111827] transition-colors bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 bg-[#F0EBFF] rounded-xl text-[#6E41E2] flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-[#111827] font-bold text-xl mb-1">
              Private Event Access
            </h2>
            <p className="text-sm mb-6 text-gray-500">
              Enter the 6-digit access code sent to your email.
            </p>

            <form onSubmit={handleRsvpSubmit}>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="000000"
                className="w-full bg-[#FAFAFC] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/20 focus:border-[#6E41E2] text-center tracking-[0.5em] text-xl font-bold mb-4 placeholder:text-gray-300 transition-all"
                maxLength={6}
              />
              <button
                type="submit"
                className="w-full bg-[#6E41E2] text-white py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-[#5833B5] transition-colors"
              >
                Verify Code
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reviews Section Pre-Footer */}
      <ReviewsSection />

      {/* Main Footer */}
      <SimpleFooter />
    </div>
  );
}
