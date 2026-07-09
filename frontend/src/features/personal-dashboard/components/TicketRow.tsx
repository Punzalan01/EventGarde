import React from 'react';
import { CalendarDays, Ticket, QrCode } from 'lucide-react';
import type { DigitalTicket } from '../models/personal.model';

const entryCopy: Record<DigitalTicket['entryStatus'], string> = {
  checked_in: 'Checked in',
  not_open: 'Entry not open',
  qr_ready: 'QR ready',
};

export function TicketRow({ ticket }: { ticket: DigitalTicket }) {
  return (
    <article className="group flex min-h-[7.25rem] overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-34px_rgba(17,24,39,0.65)] ring-1 ring-[#E6E0FF] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgba(110,65,226,0.55)]">
      <div className="relative w-28 shrink-0 overflow-hidden bg-[#111827] sm:w-36">
        <img
          src={ticket.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F0EBFF] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide text-[#5833B5]">
              {ticket.ticketStatus}
            </span>
            <span className="text-xs font-bold text-[#6B7280]">{entryCopy[ticket.entryStatus]}</span>
          </div>
          <h3 className="truncate text-lg font-black leading-tight tracking-tight text-[#111827]">
            {ticket.event}
          </h3>
          <p className="mt-1 truncate text-sm font-semibold text-[#6B7280]">{ticket.location}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-[#4B5563]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#6E41E2]" />
              {ticket.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5 text-[#6E41E2]" />
              {ticket.type}
            </span>
          </div>
        </div>
        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E6E0FF] bg-[#FAFAFC] text-[#111827] sm:flex">
          <QrCode className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}
