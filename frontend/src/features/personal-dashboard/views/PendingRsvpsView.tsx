import { usePendingRsvpsViewModel } from '../viewmodels/usePendingRsvpsViewModel';
import { 
  Inbox,
  Bookmark,
  Clock,
  Send,
  File,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  CheckCircle2,
  ShieldCheck,
  X,
  ArrowLeft,
  Reply,
  MessageSquare,
  MapPin,
  Star,
  Users,
  Shirt,
  Briefcase,
  Music,
  Utensils,
  Palette,
  Search,
  Calendar,
  Map,
  AlertTriangle
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { statusCopy } from '../constants/dashboard.constants';

export function PendingRsvpsView() {
  const {
    pendingRsvps,
    openRsvpGate,
    closeRsvpGate,
    showRsvpGate,
    activePendingRsvp,
    otpCode,
    setOtpCode,
    handleRsvpSubmit,

    selectedIds,
    savedIds,
    selectedMailId,
    replyMode,
    setReplyMode,
    replyText,
    setReplyText,
    drafts,
    sentReplies,
    currentFilter,
    visibleCount,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,

    selectedMail,
    filteredRsvps,

    toggleSelect,
    toggleSelectAll,
    toggleSave,
    handleNavClick,
    handleBackToInbox,
    handleMailClick,
    cancelReply,
    sendReply,
    loadMore,
  } = usePendingRsvpsViewModel();

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden bg-white text-gray-700 font-sans">
      {/* Sidebar - Email Style */}
      <div className="w-64 border-r border-gray-100 flex flex-col pt-4 shrink-0 bg-white">
        <div className="px-4 mb-4 mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search emails..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-0.5">
            {[
              { id: 'inbox', label: 'Inbox', icon: Inbox },
              { id: 'saved', label: 'Saved', icon: Bookmark },
              { id: 'pending', label: 'Pending', icon: Clock },
              { id: 'approved', label: 'Approved', icon: CheckCircle2 },
              { id: 'denied', label: 'Denied', icon: X },
              { id: 'draft', label: 'Draft', icon: File },
              { id: 'delete', label: 'Delete', icon: TrashIcon },
            ].map((item) => {
              const isActive = currentFilter === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-4 px-6 py-1.5 font-medium rounded-r-full mr-4 transition-colors ${isActive ? 'bg-[#D3E3FD] text-[#0B57D0]' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {item.label}
                    {item.id === 'inbox' && (
                      <span className="ml-auto text-xs font-bold shrink-0">{pendingRsvps.length}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Action Bar */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 shrink-0 bg-white">
          <div className="flex items-center gap-4">
            {!selectedMail ? (
              <div className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={selectedIds.length === filteredRsvps.length && filteredRsvps.length > 0}
                  onChange={toggleSelectAll}
                />
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><ChevronDownIcon className="w-4 h-4" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBackToInbox}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-600 flex items-center gap-2"
                  title="Back to Inbox"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => toggleSave(e, selectedMail.id)}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${savedIds.includes(selectedMail.id) ? 'text-[#6E41E2]' : 'text-gray-400 hover:text-gray-600'}`}
                  title={savedIds.includes(selectedMail.id) ? "Unsave" : "Save"}
                >
                  <Bookmark className="w-5 h-5" fill={savedIds.includes(selectedMail.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="date_desc">Newest</option>
              <option value="date_asc">Oldest</option>
              <option value="alpha_asc">A-Z</option>
              <option value="alpha_desc">Z-A</option>
            </select>
          </div>
        </div>

        {/* Email Content Area */}
        {selectedMail ? (
          <div className="flex-1 overflow-y-auto bg-white p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">{selectedMail.title}</h1>
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-semibold shrink-0">
                    {selectedMail.host.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedMail.host}</h3>
                    <p className="text-sm text-gray-500">to me <span className="mx-1">•</span> {selectedMail.date.split(',')[0]}</p>
                  </div>
                </div>
                {statusCopy[selectedMail.status] && (
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider border ${statusCopy[selectedMail.status].className.replace('text-white', 'text-gray-700').replace('bg-white/10', 'bg-gray-100').replace('border-white/10', 'border-gray-200')}`}>
                    {statusCopy[selectedMail.status].label}
                  </span>
                )}
              </div>
              
              <div className="text-base text-gray-800 leading-relaxed mb-10">
                <p className="mb-4">Hi there,</p>
                <p className="mb-4">You have an RSVP update regarding <span className="font-medium text-gray-900">{selectedMail.title}</span> at <span className="font-medium text-gray-900">{selectedMail.venue}</span> on <span className="font-medium text-gray-900">{selectedMail.date}</span>.</p>
                
                {selectedMail.status === 'mismatch' ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-900 mb-1">Access Denied</h4>
                      <p className="text-sm text-red-700">{selectedMail.message}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mb-8">{selectedMail.message}</p>
                )}
                
                {selectedMail.status === 'ready' && (
                  <div className="mb-8 space-y-6">
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5">
                      <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-600" /> Event Itinerary
                      </h4>
                      <ul className="text-sm space-y-2 text-gray-700">
                        <li className="flex gap-3"><span className="text-gray-400 w-16 font-medium">6:00 PM</span> Arrivals & Welcome Drinks</li>
                        <li className="flex gap-3"><span className="text-gray-400 w-16 font-medium">7:00 PM</span> Keynote Presentation</li>
                        <li className="flex gap-3"><span className="text-gray-400 w-16 font-medium">8:30 PM</span> Networking & Dinner</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col justify-center items-center text-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          <Map className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 text-sm">Location Map</h5>
                          <p className="text-xs text-gray-500 mt-1">Click to open directions</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                        <h5 className="font-medium text-gray-900 text-sm mb-2">Event Guidelines</h5>
                        <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                          <li>Smart casual dress code</li>
                          <li>Bring digital QR ticket</li>
                          <li>Valet parking available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200 gap-4 sm:gap-0">
                  <div className="flex-1 sm:px-4 sm:first:pl-0 flex items-center gap-3 w-full">
                    {(() => {
                      const categoryIcons: Record<string, React.ElementType> = { business: Briefcase, music: Music, food: Utensils, creative: Palette };
                      const categoryLabels: Record<string, string> = { business: 'Business', music: 'Live Music', food: 'Food & Dining', creative: 'Arts & Culture' };
                      const Icon = selectedMail.category ? categoryIcons[selectedMail.category] || Star : Star;
                      const label = selectedMail.category ? categoryLabels[selectedMail.category] || 'Event' : 'Private Event';
                      return (
                        <>
                          <Icon className="w-5 h-5 text-gray-400 shrink-0" />
                          <div>
                            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Event Type</p>
                            <p className="text-sm font-medium text-gray-900">{label}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex-1 sm:px-4 pt-4 sm:pt-0 flex items-center gap-3 w-full">
                    <Users className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Guest Pass</p>
                      <p className="text-sm font-medium text-gray-900">+1 Allowed</p>
                    </div>
                  </div>
                </div>
                
                <p>Best regards,<br/><span className="font-medium text-gray-900">{selectedMail.host}</span></p>
              </div>

              {sentReplies[selectedMail.id] && sentReplies[selectedMail.id].length > 0 && (
                <div className="flex flex-col gap-8 mb-10 border-t border-gray-100 pt-8">
                  {sentReplies[selectedMail.id].slice(-10).map((reply, i) => (
                    <div key={i} className={`flex flex-col gap-3 ${i > 0 ? 'border-t border-gray-100 pt-8' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-medium shrink-0">
                          Me
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">You</h3>
                          <p className="text-sm text-gray-500">
                            {reply.mode === 'email' ? 'via Email' : 'via Text'} <span className="mx-1">•</span> {reply.date}
                          </p>
                        </div>
                      </div>
                      <div className="pl-13 text-gray-800 text-base leading-relaxed whitespace-pre-wrap ml-[52px]">
                        {reply.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedMail.status !== 'mismatch' && (
                <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6">
                  {selectedMail.status !== 'ready' ? (
                    <button 
                      onClick={() => openRsvpGate(selectedMail)}
                      className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      Proceed
                    </button>
                  ) : (
                    <button 
                      onClick={() => { alert('Added to your calendar!'); }}
                      className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" /> Add to Calendar
                    </button>
                  )}
                  {!replyMode && (
                    <>
                      <button 
                        onClick={() => setReplyMode('email')}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <Reply className="w-4 h-4" /> Reply
                      </button>
                      <button 
                        onClick={() => setReplyMode('sms')}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" /> Text
                      </button>
                    </>
                  )}
                </div>
              )}

              {replyMode && (
                <div className="mt-8 border-t border-gray-100 pt-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600">
                    {replyMode === 'email' ? <Reply className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    {replyMode === 'email' ? 'Reply via Email' : 'Reply via Text Message'}
                  </div>
                  <div className="relative">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full h-32 p-4 pb-14 text-sm border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-400 transition-shadow shadow-sm"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                        onClick={cancelReply}
                        className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={sendReply}
                        className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" /> Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredRsvps.slice(0, visibleCount).map((rsvp) => {
              const isSelected = selectedIds.includes(rsvp.id);
              const isSaved = savedIds.includes(rsvp.id);
              const statusLabel = statusCopy[rsvp.status];

              return (
                <div 
                  key={rsvp.id} 
                  onClick={() => handleMailClick(rsvp.id)}
                  className={`flex items-center px-4 py-2.5 border-b border-gray-100 group cursor-pointer
                    ${isSelected ? 'bg-[#C2E7FF]/20' : 'hover:shadow-[inset_1px_0_0_#dadce0,inset_-1px_0_0_#dadce0,0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] hover:z-10 bg-white relative'}
                  `}
                >
                  <div className="flex items-center gap-3 w-48 shrink-0">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        checked={isSelected}
                        onChange={(e) => toggleSelect(rsvp.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button 
                        onClick={(e) => toggleSave(e, rsvp.id)}
                        className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${isSaved ? 'text-[#6E41E2]' : 'text-gray-300 hover:text-gray-400'}`}
                        title={isSaved ? "Unsave" : "Save"}
                      >
                        <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <span className={`font-bold text-sm truncate ${isSelected ? 'text-[#202124]' : 'text-gray-800'}`}>
                      {rsvp.host}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex items-center gap-3 min-w-0 mr-4">
                    {statusLabel && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 border ${statusLabel.className.replace('text-white', 'text-gray-700').replace('bg-white/10', 'bg-gray-100').replace('border-white/10', 'border-gray-300')}`}>
                        {statusLabel.label}
                      </span>
                    )}
                    <span className="text-[#202124] font-bold text-sm truncate">{rsvp.title}</span>
                    <span className="text-gray-500 text-sm truncate">- {rsvp.message}</span>
                  </div>

                  <div className="text-xs font-bold text-[#202124] whitespace-nowrap shrink-0 group-hover:hidden">
                    {rsvp.date.split(',')[0]}
                  </div>
                  
                  <div className="hidden group-hover:flex items-center gap-2 shrink-0">
                    <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500" title="Delete">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {visibleCount < filteredRsvps.length && (
              <div className="flex justify-center py-6">
                <button 
                  onClick={loadMore}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-all"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={showRsvpGate} onOpenChange={(open) => !open && closeRsvpGate()}>
        <DialogContent className="sm:max-w-md p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
          {activePendingRsvp && (
            <form onSubmit={handleRsvpSubmit} className="flex flex-col text-center">
              <div className="w-12 h-12 bg-[#F0EBFF] text-[#6E41E2] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
                Verify your identity
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mb-6">
                Enter the 6-digit code we sent to <span className="font-medium text-gray-900">{activePendingRsvp.invitedContact}</span> to confirm your RSVP for <span className="font-medium text-gray-900">{activePendingRsvp.title}</span>.
              </DialogDescription>

              <div className="relative w-full max-w-xs mx-auto mb-8">
                <div className="flex justify-between gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const digit = otpCode[index];
                    return (
                      <div 
                        key={index} 
                        className={`flex h-12 w-12 items-center justify-center rounded-lg border text-lg font-semibold transition-colors ${
                          digit ? 'border-[#6E41E2] text-[#111827] bg-white' : 'border-gray-300 bg-gray-50 text-transparent'
                        }`}
                      >
                        {digit || ''}
                      </div>
                    );
                  })}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={activePendingRsvp.status === 'mismatch' || otpCode.length < 6}
                className="w-full bg-[#6E41E2] hover:bg-[#5833B5] text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {activePendingRsvp.status === 'mismatch' ? 'Contact Organizer' : 'Submit RSVP Code'}
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArchiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="5" x="2" y="4" rx="2"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
  )
}
