import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePersonalDashboardViewModel } from './usePersonalDashboardViewModel';

export function usePendingRsvpsViewModel() {
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

  const [searchParams] = useSearchParams();
  const urlMailId = searchParams.get('mailId');

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedMailId, setSelectedMailId] = useState<string | null>(urlMailId);

  useEffect(() => {
    if (urlMailId) {
      setSelectedMailId(urlMailId);
    }
  }, [urlMailId]);

  const [replyMode, setReplyMode] = useState<'email' | 'sms' | null>(null);
  const [replyText, setReplyText] = useState('');
  const [drafts, setDrafts] = useState<Record<string, {text: string, mode: 'email' | 'sms'}>>({});
  const [sentReplies, setSentReplies] = useState<Record<string, {text: string, date: string, mode: 'email' | 'sms'}[]>>({});
  const [currentFilter, setCurrentFilter] = useState('inbox');
  const [visibleCount, setVisibleCount] = useState(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'alpha_asc' | 'alpha_desc'>('date_desc');

  const selectedMail = pendingRsvps.find(r => r.id === selectedMailId);

  const filteredRsvps = useMemo(() => {
    let result = pendingRsvps;
    
    switch (currentFilter) {
      case 'saved': result = result.filter(r => savedIds.includes(r.id)); break;
      case 'pending': result = result.filter(r => r.status === 'otp_required'); break;
      case 'approved': result = result.filter(r => r.status === 'ready'); break;
      case 'denied': result = result.filter(r => r.status === 'mismatch'); break;
      case 'draft': result = result.filter(r => !!drafts[r.id]); break;
      case 'delete': result = []; break;
      case 'inbox': default: break;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.host.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => {
      if (sortBy.startsWith('date')) {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortBy === 'date_desc' ? dateB - dateA : dateA - dateB;
      } else {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return sortBy === 'alpha_asc' ? -1 : 1;
        if (titleA > titleB) return sortBy === 'alpha_asc' ? 1 : -1;
        return 0;
      }
    });
  }, [pendingRsvps, currentFilter, savedIds, drafts, searchQuery, sortBy]);

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

  const handleNavClick = (filterId: string) => {
    setCurrentFilter(filterId);
    if (replyText.trim() && selectedMailId && replyMode) {
      setDrafts(prev => ({...prev, [selectedMailId]: {text: replyText, mode: replyMode}}));
    }
    setSelectedMailId(null);
    setReplyMode(null);
    setReplyText('');
  };

  const handleBackToInbox = () => {
    if (replyText.trim() && selectedMailId && replyMode) {
      setDrafts(prev => ({...prev, [selectedMailId]: {text: replyText, mode: replyMode}}));
    }
    setSelectedMailId(null);
    setReplyMode(null);
    setReplyText('');
  };

  const handleMailClick = (id: string) => {
    if (replyText.trim() && selectedMailId && replyMode) {
      setDrafts(prev => ({...prev, [selectedMailId]: {text: replyText, mode: replyMode}}));
    }
    setSelectedMailId(id);
    if (drafts[id]) {
      setReplyMode(drafts[id].mode);
      setReplyText(drafts[id].text);
    } else {
      setReplyMode(null);
      setReplyText('');
    }
  };

  const cancelReply = () => {
    if (replyText.trim() && replyMode && selectedMail) {
      setDrafts(prev => ({...prev, [selectedMail.id]: {text: replyText, mode: replyMode}}));
    } else if (!replyText.trim() && selectedMail) {
      setDrafts(prev => { const newD = {...prev}; delete newD[selectedMail.id]; return newD; });
    }
    setReplyMode(null);
    setReplyText('');
  };

  const sendReply = () => {
    if (replyText.trim() && replyMode && selectedMail) {
      const newReply = { text: replyText, date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }), mode: replyMode };
      setSentReplies(prev => ({
        ...prev, 
        [selectedMail.id]: [...(prev[selectedMail.id] || []), newReply]
      }));
    }
    if (selectedMail) {
      setDrafts(prev => { const newD = {...prev}; delete newD[selectedMail.id]; return newD; });
    }
    setReplyMode(null);
    setReplyText('');
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  return {
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
  };
}
