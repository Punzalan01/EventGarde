import { useState, useMemo } from 'react';
import { getPublicEvents, getDigitalTickets, getTopEvents, getJoinedEvents, getUpcomingEvents } from '../models/personal.model';
import { useAuth } from '@/shared/hooks/useAuth';

export function usePersonalDashboardViewModel() {
  const { defaultWorkspace } = useAuth();
  const [activeTab, setActiveTab] = useState('discovery');
  const [showRsvpGate, setShowRsvpGate] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  
  // Local state to simulate verification request before backend is fully hooked up
  const [localVerificationPending, setLocalVerificationPending] = useState(false);
  
  const publicEvents = useMemo(() => getPublicEvents(), []);
  const digitalTickets = useMemo(() => getDigitalTickets(), []);
  const topEvents = useMemo(() => getTopEvents(), []);
  const joinedEvents = useMemo(() => getJoinedEvents(), []);
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);

  // Scheduling Modal State
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [schedulingEventName, setSchedulingEventName] = useState("");

  const handleJoinEvent = (eventName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSchedulingEventName(eventName);
    setShowSchedulingModal(true);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRsvpGate(false);
    // Logic for verifying OTP
  };

  const handleVerifyAccount = () => {
    // In a real app, this would call an API
    setLocalVerificationPending(true);
  };

  const isVerified = defaultWorkspace?.verification_status === 'verified';
  const isVerificationPending = defaultWorkspace?.verification_status === 'pending' || localVerificationPending;

  return {
    activeTab,
    setActiveTab,
    showRsvpGate,
    setShowRsvpGate,
    otpCode,
    setOtpCode,
    publicEvents,
    digitalTickets,
    topEvents,
    joinedEvents,
    upcomingEvents,
    showSchedulingModal,
    setShowSchedulingModal,
    schedulingEventName,
    handleJoinEvent,
    handleRsvpSubmit,
    isVerified,
    isVerificationPending,
    handleVerifyAccount,
  };
}
