export type TicketStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export interface TicketRecord {
  id: string;
  ticketNo: string;
  event: string;
  date: string;
  type: string;
  status: TicketStatus;
  amount: string;
  paymentMethod: string;
}

export const getTickets = (): TicketRecord[] => [
  { id: 't1', ticketNo: 'TKT-001', event: 'Global FinTech Summit 2026', date: 'Oct 24, 2026', type: 'General Admission', status: 'Confirmed', amount: '₱499.00', paymentMethod: 'GCash' },
  { id: 't2', ticketNo: 'TKT-002', event: 'Neon Nights Music Festival', date: 'Nov 02, 2026', type: 'VIP Pass', status: 'Confirmed', amount: '₱85.00', paymentMethod: 'Paymaya' },
  { id: 't3', ticketNo: 'TKT-003', event: 'Enterprise SaaS Expo', date: 'Nov 15, 2026', type: 'General Admission', status: 'Pending', amount: '₱0.00', paymentMethod: 'Free' },
  { id: 't4', ticketNo: 'TKT-004', event: 'Underground Indie Showcase', date: 'Dec 05, 2026', type: 'Standard', status: 'Cancelled', amount: '₱25.00', paymentMethod: 'Bank Transfer' },
  { id: 't5', ticketNo: 'TKT-005', event: 'AI & Machine Learning Conference', date: 'Jan 10, 2027', type: 'General Admission', status: 'Confirmed', amount: '₱299.00', paymentMethod: 'Paymaya' },
  { id: 't6', ticketNo: 'TKT-006', event: 'Food Truck Carnival', date: 'Jan 20, 2027', type: 'Standard', status: 'Pending', amount: '₱15.00', paymentMethod: 'GCash' },
  { id: 't7', ticketNo: 'TKT-007', event: 'Startup Pitch Day', date: 'Jun 15, 2027', type: 'General Admission', status: 'Confirmed', amount: '₱0.00', paymentMethod: 'Free' },
];
