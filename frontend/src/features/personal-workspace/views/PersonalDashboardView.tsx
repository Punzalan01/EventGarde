import React from 'react';
import { usePersonalDashboardViewModel } from '../viewmodels/usePersonalDashboardViewModel';
import { Search, MapPin, Calendar, QrCode, Lock, ChevronRight, Ticket, X } from 'lucide-react';

export function PersonalDashboardView() {
  const {
    showRsvpGate,
    setShowRsvpGate,
    otpCode,
    setOtpCode,
    publicEvents,
    digitalTickets,
    handleRsvpSubmit
  } = usePersonalDashboardViewModel();

  return (
    <div className="min-h-screen font-sans text-[#4B5563] relative overflow-hidden will-change-transform" style={{ contain: 'paint' }}>
      
      {/* Background with mesh gradient */}
      <div className="landing-mesh-section absolute inset-0 -z-10 h-full w-full will-change-transform" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative z-10">
        
        {/* Header / Global Discovery Panel Intro */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6E41E2] animate-pulse" />
            <span className="text-sm font-medium text-[#6E41E2]">Live Events Near You</span>
          </div>
          <h1 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-5xl md:text-6xl max-w-2xl">
            Discover your next unforgettable experience.
          </h1>
          <div className="flex gap-4 max-w-md mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/50 shadow-soft transition-all"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Discovery Grid */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl flex items-center justify-between">
              Trending This Week
              <button className="text-sm font-medium text-[#6E41E2] flex items-center hover:text-[#5833B5]">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publicEvents.map((event) => (
                <div key={event.id} className="group relative bg-white rounded-3xl shadow-soft-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                  {/* Image Placeholder */}
                  <div className={`h-48 w-full ${event.image} relative`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-sm font-bold text-[#111827]">
                      {event.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-[#111827] font-bold text-xl leading-[1.1] mb-3 group-hover:text-[#6E41E2] transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {event.location}
                      </div>
                    </div>
                    
                    <button className="mt-6 w-full py-3 rounded-2xl bg-[#6E41E2] text-white font-medium landing-shine-button transition-colors hover:bg-[#5833B5]">
                      Buy Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Digital Wallet & Checkout Module */}
          <div className="space-y-8">
            
            {/* Digital Wallet Module */}
            <div className="glass rounded-3xl p-6 shadow-soft-lg border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-xl">
                  Digital Wallet
                </h2>
                <div className="w-10 h-10 rounded-full bg-[#F0EBFF] text-[#6E41E2] flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              {digitalTickets.length > 0 ? (
                <div className="space-y-4">
                  {digitalTickets.map(ticket => (
                    <div key={ticket.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-[#F0EBFF] transition-colors">
                      <div className="w-16 h-16 bg-[#FAFAFC] rounded-xl flex items-center justify-center shrink-0">
                        <QrCode className="w-8 h-8 text-[#111827]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#6E41E2] uppercase tracking-wider mb-1">
                          {ticket.type}
                        </div>
                        <div className="text-[#111827] font-bold leading-tight mb-1">
                          {ticket.event}
                        </div>
                        <div className="text-xs">{ticket.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm">
                  No upcoming tickets.
                </div>
              )}
            </div>

            {/* PayMongo Checkout / Private RSVP Gate Trigger */}
            <div className="bg-[#FFF1E8] rounded-3xl p-6 shadow-soft-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-[#6E41E2]">
                  <Lock className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-widest">Private Event</span>
                </div>
                <h3 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl mb-2">
                  Have an RSVP code?
                </h3>
                <p className="text-sm mb-6 text-[#111827]/70">
                  Enter your unique code to unlock your private checkout portal.
                </p>
                <button 
                  onClick={() => setShowRsvpGate(true)}
                  className="w-full bg-[#111827] text-white py-3 rounded-2xl font-medium shadow-soft hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <Ticket className="w-5 h-5" />
                  Enter RSVP Code
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Private RSVP OTP Gate Modal */}
      {showRsvpGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setShowRsvpGate(false)} />
          <div className="glass w-full max-w-md rounded-3xl p-8 shadow-soft-lg border border-white/50 relative z-10 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowRsvpGate(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#111827] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-[#F0EBFF] rounded-2xl text-[#6E41E2] flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl mb-2">
              Unlock Private Event
            </h2>
            <p className="text-sm mb-8 text-[#4B5563]">
              Please enter the 6-digit OTP code sent to your email.
            </p>
            
            <form onSubmit={handleRsvpSubmit}>
              <input 
                type="text" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="0 0 0 0 0 0" 
                className="w-full bg-white px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/50 shadow-inner text-center tracking-[0.5em] text-2xl font-bold mb-6"
                maxLength={6}
              />
              <button 
                type="submit"
                className="w-full bg-[#6E41E2] text-white py-4 rounded-2xl font-bold landing-shine-button transition-colors hover:bg-[#5833B5]"
              >
                Verify & Checkout
              </button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
