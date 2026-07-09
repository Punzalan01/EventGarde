import { useState, useMemo } from 'react';
import { TicketRecord, getTickets } from '../models/ticket.model';

export function useTicketHistoryViewModel() {
  const allTickets = useMemo(() => getTickets(), []);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const selectedTicket = useMemo(() => {
    if (!selectedTicketId) return null;
    return allTickets.find(t => t.id === selectedTicketId) || null;
  }, [allTickets, selectedTicketId]);

  const openTicketModal = (id: string) => {
    setSelectedTicketId(id);
    setIsTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    // intentionally leave selectedTicketId to allow exit animations
  };

  const filteredTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchesSearch =
        ticket.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allTickets, statusFilter, searchQuery]);

  const totalPaid = useMemo(() => {
    return allTickets
      .filter((t) => t.status === 'Confirmed' && t.amount !== 'Free')
      .reduce((sum, t) => sum + parseFloat(t.amount.replace('₱', '')), 0);
  }, [allTickets]);

  const stats = useMemo(() => ({
    total: allTickets.length,
    confirmed: allTickets.filter((t) => t.status === 'Confirmed').length,
    pending: allTickets.filter((t) => t.status === 'Pending').length,
    cancelled: allTickets.filter((t) => t.status === 'Cancelled').length,
    totalPaid,
  }), [allTickets, totalPaid]);

  return {
    tickets: filteredTickets,
    stats,
    totalPaid,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    selectedTicketId,
    selectedTicket,
    isTicketModalOpen,
    openTicketModal,
    closeTicketModal,
  };
}
