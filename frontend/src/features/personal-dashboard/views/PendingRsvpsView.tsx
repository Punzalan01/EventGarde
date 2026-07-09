import React, { useState, useMemo } from 'react';
import { usePersonalDashboardViewModel } from '../viewmodels/usePersonalDashboardViewModel';
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
  Shirt
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
  } = usePersonalDashboardViewModel();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);
  const [replyMode, setReplyMode] = useState<'email' | 'sms' | null>(null);
  const [replyText, setReplyText] = useState('');
  const [drafts, setDrafts] = useState<Record<string, {text: string, mode: 'email' | 'sms'}>>({});
  const [currentFilter, setCurrentFilter] = useState('inbox');

  const selectedMail = pendingRsvps.find(r => r.id === selectedMailId);

  const filteredRsvps = useMemo(() => {
    switch (currentFilter) {
      case 'saved':
        return pendingRsvps.filter(r => savedIds.includes(r.id));
      case 'pending':
        return pendingRsvps.filter(r => r.status === 'otp_required');
      case 'approved':
        return pendingRsvps.filter(r => r.status === 'ready');
      case 'denied':
        return pendingRsvps.filter(r => r.status === 'mismatch');
      case 'draft':
        return pendingRsvps.filter(r => !!drafts[r.id]);
      case 'delete':
        return [];
      case 'inbox':
      default:
        return pendingRsvps;
    }
  }, [pendingRsvps, currentFilter, savedIds]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRsvps.length && filteredRsvps.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRsvps.map(r => r.id));
    }
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden bg-white text-gray-700 font-sans">
      {/* Sidebar - Email Style */}
      <div className="w-64 border-r border-gray-100 flex flex-col pt-4 shrink-0 bg-white">

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
                    onClick={() => { 
                      setCurrentFilter(item.id); 
                      if (replyText.trim() && selectedMailId && replyMode) {
                        setDrafts(prev => ({...prev, [selectedMailId]: {text: replyText, mode: replyMode}}));
                      }
                      setSelectedMailId(null); 
                      setReplyMode(null); 
                      setReplyText('');
                    }}
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
              <button 
                onClick={() => { 
                  if (replyText.trim() && selectedMailId && replyMode) {
                    setDrafts(prev => ({...prev, [selectedMailId]: {text: replyText, mode: replyMode}}));
                  }
                  setSelectedMailId(null); 
                  setReplyMode(null); 
                  setReplyText(''); 
                }}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 flex items-center gap-2"
                title="Back to Inbox"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            {filteredRsvps.length > 0 ? `1-${filteredRsvps.length} of ${filteredRsvps.length}` : '0 items'}
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-300 cursor-default"><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-2 rounded-full text-gray-300 cursor-default"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* Email Content Area */}
        {selectedMail ? (
          <div className="flex-1 overflow-y-auto bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-black text-[#111827] mb-8">{selectedMail.title}</h1>
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6E41E2] text-white flex items-center justify-center text-xl font-bold shrink-0">
                    {selectedMail.host.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827]">{selectedMail.host}</h3>
                    <p className="text-sm text-gray-500">to me • {selectedMail.date.split(',')[0]}</p>
                  </div>
                </div>
                {statusCopy[selectedMail.status] && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${statusCopy[selectedMail.status].className.replace('text-white', 'text-gray-700').replace('bg-white/10', 'bg-gray-100').replace('border-white/10', 'border-gray-300')}`}>
                    {statusCopy[selectedMail.status].label}
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none text-gray-700 mb-12">
                <p className="mb-4">Hello,</p>
                <p className="mb-4">You have an RSVP update regarding <strong>{selectedMail.title}</strong> at <strong>{selectedMail.venue}</strong> on <strong>{selectedMail.date}</strong>.</p>
                <p className="mb-4">{selectedMail.message}</p>
                <div className="grid grid-cols-3 gap-6 mb-8 mt-6 p-6 bg-gradient-to-br from-[#FAFAFC] to-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col gap-2 relative">
                    <div className="w-8 h-8 rounded-full bg-[#F0EBFF] flex items-center justify-center text-[#6E41E2] mb-1">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Event Type</p>
                      <p className="text-sm font-bold text-[#111827]">Private Networking</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 relative border-l border-gray-100 pl-6">
                    <div className="w-8 h-8 rounded-full bg-[#E5F6EE] flex items-center justify-center text-[#15b292] mb-1">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Guest Pass</p>
                      <p className="text-sm font-bold text-[#111827]">+1 Allowed</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 relative border-l border-gray-100 pl-6">
                    <div className="w-8 h-8 rounded-full bg-[#FFF0F0] flex items-center justify-center text-[#E03131] mb-1">
                      <Shirt className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Dress Code</p>
                      <p className="text-sm font-bold text-[#111827]">Smart Casual</p>
                    </div>
                  </div>
                </div>
                <p>Best regards,<br/>{selectedMail.host}</p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                {selectedMail.status !== 'ready' ? (
                  <button 
                    onClick={() => openRsvpGate(selectedMail)}
                    className="px-6 py-2.5 bg-[#6E41E2] text-white font-bold rounded-full hover:bg-[#5833B5] transition-colors shadow-sm"
                  >
                    Process RSVP
                  </button>
                ) : (
                  <button 
                    onClick={() => { alert('Your attendance is confirmed!'); }}
                    className="px-6 py-2.5 bg-[#15b292] text-white font-bold rounded-full hover:bg-[#11987d] transition-colors shadow-sm"
                  >
                    Confirm Attendance
                  </button>
                )}
                {!replyMode && (
                  <>
                    <button 
                      onClick={() => setReplyMode('email')}
                      className="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 inline-flex"
                    >
                      <Reply className="w-4 h-4" /> Reply
                    </button>
                    <button 
                      onClick={() => setReplyMode('sms')}
                      className="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 inline-flex"
                    >
                      <MessageSquare className="w-4 h-4" /> Text
                    </button>
                  </>
                )}
              </div>

              {replyMode && (
                <div className="mt-6 border border-gray-200 rounded-2xl p-4 bg-[#FAFAFC]">
                  <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-700">
                    {replyMode === 'email' ? <Reply className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    {replyMode === 'email' ? 'Reply via Email' : 'Reply via Text Message'}
                  </div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6E41E2] outline-none resize-none mb-4"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => { 
                        if (replyText.trim() && replyMode) {
                          setDrafts(prev => ({...prev, [selectedMail!.id]: {text: replyText, mode: replyMode}}));
                        } else if (!replyText.trim()) {
                          setDrafts(prev => { const newD = {...prev}; delete newD[selectedMail!.id]; return newD; });
                        }
                        setReplyMode(null); 
                        setReplyText(''); 
                      }}
                      className="px-5 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      Save Draft & Close
                    </button>
                    <button
                      onClick={() => {
                        setDrafts(prev => { const newD = {...prev}; delete newD[selectedMail!.id]; return newD; });
                        setReplyMode(null);
                        setReplyText('');
                        alert('Message sent!');
                      }}
                      className="px-5 py-2 font-bold text-white bg-[#15b292] hover:bg-[#11987d] rounded-full flex items-center gap-2 transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4" /> Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-white">
            {filteredRsvps.map((rsvp) => {
              const isSelected = selectedIds.includes(rsvp.id);
              const isSaved = savedIds.includes(rsvp.id);
              const statusLabel = statusCopy[rsvp.status];

              return (
                <div 
                  key={rsvp.id} 
                  onClick={() => { 
                    if (replyText.trim() && selectedMailId && replyMode) {
                      setDrafts(prev => ({...prev, [selectedMailId]: {text: replyText, mode: replyMode}}));
                    }
                    setSelectedMailId(rsvp.id); 
                    if (drafts[rsvp.id]) {
                      setReplyMode(drafts[rsvp.id].mode);
                      setReplyText(drafts[rsvp.id].text);
                    } else {
                      setReplyMode(null); 
                      setReplyText(''); 
                    }
                  }}
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
          </div>
        )}
      </div>

      <Dialog open={showRsvpGate} onOpenChange={(open) => !open && closeRsvpGate()}>
        <DialogContent className="p-0 overflow-hidden max-w-[420px] border-none shadow-2xl bg-white rounded-3xl">
          {activePendingRsvp && (
            <>
              <div className="relative h-40 bg-[#111827]">
                <img src={activePendingRsvp.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-white font-black text-xl leading-tight line-clamp-1">{activePendingRsvp.title}</h3>
                  <p className="text-white/80 text-xs font-semibold mt-1 flex items-center gap-1">
                     <MapPin className="w-3 h-3"/> {activePendingRsvp.venue}
                  </p>
                </div>
              </div>
              <form onSubmit={handleRsvpSubmit} className="px-6 pb-8 pt-0">
                <DialogHeader className="text-left relative">
                  <div className="absolute -top-6 right-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6E41E2] text-white shadow-lg ring-4 ring-white">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="pt-6">
                    <DialogTitle className="text-2xl font-black leading-tight tracking-tight text-[#111827]">
                      Verify Identity
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-sm font-medium leading-relaxed text-[#6B7280]">
                      Enter the 6-digit code we sent to <strong className="text-gray-900">{activePendingRsvp.invitedContact}</strong> to confirm your RSVP.
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <div className="mt-6 relative">
                  <div className="flex justify-between gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const digit = otpCode[index];
                      return (
                        <div 
                          key={index} 
                          className={`flex h-14 w-12 items-center justify-center rounded-xl border-2 text-2xl font-black shadow-sm transition-colors ${
                            digit ? 'border-[#6E41E2] text-[#111827] bg-[#F0EBFF]/30' : 'border-gray-200 bg-white text-transparent'
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
                  className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#6E41E2] px-5 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(110,65,226,0.25)] transition-all hover:bg-[#5833B5] hover:shadow-[0_16px_32px_rgba(110,65,226,0.35)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:transform-none"
                >
                  {activePendingRsvp.status === 'mismatch' ? 'Contact Organizer' : 'Submit RSVP Code'}
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </form>
            </>
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
