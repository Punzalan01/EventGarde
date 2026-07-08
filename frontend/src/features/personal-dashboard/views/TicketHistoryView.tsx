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
  } = useTicketHistoryViewModel();

  return (
    <div className="relative min-h-screen font-sans text-[#4B5563]">
      <BackgroundGradientPurple />

      <div className="relative z-10 w-full px-6 py-10">

        {/* Single unified card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#E9D8FD] shadow-lg overflow-hidden">

          {/* Card Header: title + stats */}
          <div className="px-8 py-6 border-b border-[#F3E8FF] bg-gradient-to-r from-[#F0EBFF]/60 to-white/60">
            {/* Title row */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#6E41E2] flex items-center justify-center shadow-md shrink-0">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">Ticket History</h1>
                <p className="text-gray-500 text-sm">All your event registrations and tickets in one place.</p>
              </div>
            </div>

            {/* Stats row inside the card header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Tickets', value: tickets.length, color: 'text-[#6E41E2]', bg: 'bg-[#F0EBFF]' },
                { label: 'Confirmed', value: tickets.filter(t => t.status === 'Confirmed').length, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                { label: 'Pending', value: tickets.filter(t => t.status === 'Pending').length, color: 'text-yellow-700', bg: 'bg-yellow-50' },
                { label: 'Total Paid', value: `$${totalPaid.toFixed(2)}`, color: 'text-[#111827]', bg: 'bg-gray-50' },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.bg} rounded-2xl px-5 py-4 border border-white/80`}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Table section */}
          <div className="px-2">
            <Table>
              <TableCaption className="pb-4">Showing all {tickets.length} ticket records.</TableCaption>
              <TableHeader>
                <TableRow className="bg-[#FAFAFC] hover:bg-[#FAFAFC]">
                  <TableHead>Ticket No.</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => {
                  const status = statusConfig[ticket.status];
                  return (
                    <TableRow key={ticket.id}>
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
                      <TableCell className="text-gray-500">{ticket.paymentMethod}</TableCell>
                      <TableCell className="text-right font-bold text-[#111827]">{ticket.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} className="font-bold text-[#111827]">Total Paid</TableCell>
                  <TableCell className="text-right font-extrabold text-[#6E41E2]">${totalPaid.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

        </div>

      </div>
    </div>
  );
}
