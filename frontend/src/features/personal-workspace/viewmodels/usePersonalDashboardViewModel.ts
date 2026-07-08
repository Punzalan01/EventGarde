import { useState, useMemo } from 'react';
import { getPublicEvents, getDigitalTickets } from '../models/personal.model';

export function usePersonalDashboardViewModel() {
  const [activeTab, setActiveTab] = useState('discovery');
  const [showRsvpGate, setShowRsvpGate] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  
  const publicEvents = useMemo(() => getPublicEvents(), []);
  const digitalTickets = useMemo(() => getDigitalTickets(), []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRsvpGate(false);
    // Logic for verifying OTP
  };

  return {
    activeTab,
    setActiveTab,
    showRsvpGate,
    setShowRsvpGate,
    otpCode,
    setOtpCode,
    publicEvents,
    digitalTickets,
    handleRsvpSubmit
  };
}
