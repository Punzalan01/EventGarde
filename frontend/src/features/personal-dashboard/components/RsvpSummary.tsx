import React from 'react';
import type { PendingRsvp } from '../models/personal.model';
import { statusCopy } from '../constants/dashboard.constants';

export function RsvpSummary({ rsvp, isActive, onSelect }: { rsvp: PendingRsvp; isActive: boolean; onSelect: () => void }) {
  const status = statusCopy[rsvp.status];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-3 text-left transition ${isActive
        ? 'border-[#A78BFA] bg-white shadow-[0_16px_34px_-26px_rgba(110,65,226,0.8)]'
        : 'border-white/10 bg-white/8 hover:bg-white/12'
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-sm font-black leading-tight ${isActive ? 'text-[#111827]' : 'text-white'}`}>
            {rsvp.title}
          </p>
          <p className={`mt-1 text-xs font-semibold ${isActive ? 'text-[#6B7280]' : 'text-white/70'}`}>
            {rsvp.date}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-1 text-[0.65rem] font-black uppercase tracking-wide ${status.className}`}>
          {status.label}
        </span>
      </div>
    </button>
  );
}
