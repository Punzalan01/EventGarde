import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from './SectionTitle';
import { CardStack } from '@/components/ui/card-stack';
import type { UpcomingEvent } from '../models/personal.model';

interface UpcomingEventsSectionProps {
  upcomingEvents: UpcomingEvent[];
  workspaceId: string | undefined;
}

export function UpcomingEventsSection({
  upcomingEvents,
  workspaceId,
}: UpcomingEventsSectionProps) {
  return (
    <div className="pb-10 relative z-10">
      <div className="flex justify-center">
        <SectionTitle eyebrow="Upcoming Events" />
      </div>
      <div className="mt-8 flex justify-center">
        <CardStack
          cardWidth={800}
          cardHeight={480}
          maxVisible={5}
          overlap={0.8}
          spreadDeg={0}
          tiltXDeg={0}
          items={upcomingEvents.map(evt => ({
            id: evt.id,
            title: evt.title,
            description: evt.description,
            imageSrc: evt.thumbnail,
            price: evt.price,
            joinedCount: evt.joinedCount,
            capacity: evt.capacity,
          }))}
          autoAdvance
          pauseOnHover
          renderCard={(item: any, { active }) => {
            const ratio = (item.capacity && item.joinedCount) ? (item.joinedCount / item.capacity) : 0;
            const isLimited = ratio > 0.8;
            const statusText = isLimited ? 'LIMITED' : 'AVAILABLE';
            const statusColor = isLimited ? 'bg-red-600/90' : 'bg-[#15b292]/90';

            return (
              <Link to={`/personal/${workspaceId}/discovery/event/${item.id}`} className="relative h-full w-full bg-[#111827] block overflow-hidden rounded-3xl">
                <img src={item.imageSrc} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/90 via-[#111827]/40 to-transparent pointer-events-none" />

                <div className={`absolute top-6 right-6 ${statusColor} backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-md`}>
                  {statusText}
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-8">
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-white leading-[1.1] mb-2">{item.title}</h3>
                  <p className="text-base font-semibold text-white/80 mb-6 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between text-sm font-bold text-[#C4B5FD]">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#15b292]" />
                      {item.joinedCount?.toLocaleString()} Joined
                    </span>
                    {item.capacity && <span>{item.capacity.toLocaleString()} Capacity</span>}
                  </div>
                </div>
              </Link>
            );
          }}
        />
      </div>
    </div>
  );
}
