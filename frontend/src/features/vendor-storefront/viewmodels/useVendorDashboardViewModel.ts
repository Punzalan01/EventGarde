import { useState, useMemo } from 'react';
import { getVendorProfile, getBookingRequests, getMessages, getActiveChat } from '../models/vendor.model';

export function useVendorDashboardViewModel() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [activeMessageId, setActiveMessageId] = useState('m1');

  const storeProfile = useMemo(() => getVendorProfile(), []);
  const bookingRequests = useMemo(() => getBookingRequests(), []);
  const messages = useMemo(() => getMessages(), []);
  const activeChat = useMemo(() => getActiveChat(), []);

  return {
    activeTab,
    setActiveTab,
    activeMessageId,
    setActiveMessageId,
    storeProfile,
    bookingRequests,
    messages,
    activeChat
  };
}
