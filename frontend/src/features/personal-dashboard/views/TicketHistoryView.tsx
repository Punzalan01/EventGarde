import React from 'react';
import { Ticket, QrCode, CheckCircle2, Clock, XCircle, Search, Filter } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { BackgroundGradientPurple } from '@/components/ui/background-gradient-snippet';
import { useTicketHistoryViewModel } from '@/features/tickets/viewmodels/useTicketHistoryViewModel';
import { TicketDetailModal } from '../components/TicketDetailModal';
import { TicketRecord, TicketStatus } from '@/features/tickets/models/ticket.model';

const statusConfig: Record<TicketStatus, { icon: React.ReactNode; className: string }> = {
  Confirmed: {
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  Pending: {
    icon: <Clock className="w-3.5 h-3.5" />,
    className: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  },
  Cancelled: {
    icon: <XCircle className="w-3.5 h-3.5" />,
    className: 'bg-red-50 text-red-600 border border-red-200',
  },
};

export function TicketHistoryView() {
  const {
    tickets,
    stats,
    totalPaid,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    selectedTicket,
    isTicketModalOpen,
    openTicketModal,
    closeTicketModal,
  } = useTicketHistoryViewModel();

  return (
    <div className="relative min-h-screen font-sans text-[#4B5563] bg-[#F3F4F6]">

      <div className="relative z-10 w-full px-6 py-10">

        {/* Single unified card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#E9D8FD] shadow-lg overflow-hidden">



          {/* Table section */}
          <div className="px-2">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FAFAFC] hover:bg-[#FAFAFC]">
                  <TableHead>Ticket No.</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-12">Payment Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => {
                  const status = statusConfig[ticket.status];
                  return (
                    <TableRow
                      key={ticket.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => openTicketModal(ticket.id)}
                    >
                      <TableCell className="font-mono font-semibold text-[#6E41E2] text-xs">{ticket.ticketNo}</TableCell>
                      <TableCell className="font-semibold text-[#111827] max-w-[200px]">
                        <span className="line-clamp-2">{ticket.event}</span>
                      </TableCell>
                      <TableCell className="text-gray-500 whitespace-nowrap">{ticket.date}</TableCell>
                      <TableCell className="text-gray-600">{ticket.type}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                          {status.icon}
                          {ticket.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500 pr-12">{ticket.paymentMethod}</TableCell>
                      <TableCell className="text-right font-bold text-[#111827]">{ticket.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

        </div>
        <p className="mt-4 text-sm text-center text-black pb-4 font-medium">Showing all {tickets.length} ticket records.</p>
      </div>

      <TicketDetailModal
        isOpen={isTicketModalOpen}
        onClose={closeTicketModal}
        ticket={selectedTicket}
      />
    </div>
  );
}
