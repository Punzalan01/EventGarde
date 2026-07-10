import React from 'react';
import { Link } from 'react-router-dom';
import { Inbox } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import type { PendingRsvp } from '../models/personal.model';

interface PendingRsvpsSectionProps {
  pendingRsvps: PendingRsvp[];
}

export function PendingRsvpsSection({ pendingRsvps }: PendingRsvpsSectionProps) {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="PENDING" />
        <Link to="rsvp" className="text-sm font-bold text-[#6E41E2]">
          Open Inbox →
        </Link>
      </div>
      <div className="mt-4 rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            {pendingRsvps.slice(0, 3).map((rsvp) => (
              <div key={rsvp.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAFC] border border-gray-100 hover:border-[#6E41E2]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0EBFF] flex items-center justify-center text-[#6E41E2]">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111827]">{rsvp.title}</h4>
                    <p className="text-sm text-gray-500">{rsvp.host} • {rsvp.date.split(',')[0]}</p>
                  </div>
                </div>
                <Link to={`rsvp?mailId=${rsvp.id}`} className="text-[#6E41E2] font-semibold text-sm">
                  View
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="rsvp" className="inline-flex items-center justify-center rounded-full bg-[#6E41E2] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#5833B5]">
              View All in Inbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
