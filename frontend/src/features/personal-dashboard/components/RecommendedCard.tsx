import React from 'react';
import type { RecommendedEvent } from '../models/personal.model';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';

export function RecommendedCard({ event, index = 0 }: { event: RecommendedEvent, index?: number }) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const isFree = index % 2 === 1;

  return (
    <article className="flex flex-col min-w-[20rem] md:min-w-0 flex-1 group bg-zinc-50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden border border-zinc-200/60">
      {/* Poster Image */}
      <Link to={`/personal/${workspaceId}/discovery/event/${event.id}`} className="block w-full bg-black overflow-hidden relative group/img">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover/img:scale-105 ${event.isPrivate ? 'blur-md' : ''}`}
          loading="lazy"
          decoding="async"
        />
        {event.isPrivate && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
            <Lock className="w-8 h-8 text-white mb-2" />
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="flex flex-col gap-1.5 flex-grow p-5">
        <Link to={`/personal/${workspaceId}/discovery/event/${event.id}`}>
          <h1 className="text-base sm:text-lg font-black text-[#111827] leading-[1.1] uppercase line-clamp-2">
            {event.title}
          </h1>
        </Link>
        <p className="text-sm font-medium text-gray-500 truncate">{event.location}</p>

        <div className="mt-1">
          <span className="inline-flex bg-[#1C73A6] text-white text-[0.7rem] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
            {event.date}
          </span>
        </div>

        <div className="mt-4">
          <Link
            to={`/personal/${workspaceId}/discovery/event/${event.id}`}
            aria-label={event.isPrivate ? "ENTER CODE" : (isFree ? "GET FREE TICKETS" : "BUY TICKETS")}
            className={`group/btn relative overflow-hidden flex items-center justify-center w-full h-11 text-white font-bold text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 ${event.isPrivate
              ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-black hover:to-black hover:text-white focus:ring-black/30"
              : isFree
                ? "bg-gradient-to-r from-[#15b292] to-[#11987d] hover:from-yellow-400 hover:to-yellow-500 hover:text-black focus:ring-yellow-500/30"
                : "bg-gradient-to-r from-red-600 to-red-500 hover:from-yellow-400 hover:to-yellow-500 hover:text-black focus:ring-yellow-500/30"
              }`}
            style={{
              maskImage: 'radial-gradient(circle at 0 0, transparent 6px, black 7px), radial-gradient(circle at 100% 0, transparent 6px, black 7px), radial-gradient(circle at 0 100%, transparent 6px, black 7px), radial-gradient(circle at 100% 100%, transparent 6px, black 7px)',
              maskSize: '51% 51%',
              maskRepeat: 'no-repeat',
              maskPosition: 'top left, top right, bottom left, bottom right',
              WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 6px, black 7px), radial-gradient(circle at 100% 0, transparent 6px, black 7px), radial-gradient(circle at 0 100%, transparent 6px, black 7px), radial-gradient(circle at 100% 100%, transparent 6px, black 7px)',
              WebkitMaskSize: '51% 51%',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'top left, top right, bottom left, bottom right',
            }}
          >
            <span className="relative z-10 uppercase tracking-wide group-hover/btn:hidden">
              {event.isPrivate ? "ENTER CODE" : (isFree ? "Free" : "Buy Tickets")}
            </span>
            <span className="relative z-10 uppercase tracking-wide hidden group-hover/btn:block">
              {Math.max(1, 50 - (index * 5))} Tickets Left
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
