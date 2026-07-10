import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedEventsSectionProps {
  activeFeaturedEvent: any;
  featuredIndex: number;
  featuredEvents: any[];
  handleFeaturedNext: () => void;
  handleFeaturedPrevious: () => void;
  setFeaturedSlide: (index: number) => void;
  workspaceId: string | undefined;
}

export function FeaturedEventsSection({
  activeFeaturedEvent,
  featuredIndex,
  featuredEvents,
  handleFeaturedNext,
  handleFeaturedPrevious,
  setFeaturedSlide,
  workspaceId
}: FeaturedEventsSectionProps) {
  return (
    <div className="mx-auto w-full max-w-full">
      <section className="relative overflow-hidden bg-[#111827] shadow-[0_35px_80px_-45px_rgba(17,24,39,0.8)] ring-1 ring-white/20 min-h-[30rem] sm:min-h-[36rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -50) handleFeaturedNext();
              else if (offset.x > 50) handleFeaturedPrevious();
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-end cursor-grab active:cursor-grabbing"
          >
            <img
              src={activeFeaturedEvent.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-72 pointer-events-none"
              draggable="false"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050510] via-[#111827]/88 to-[#6E41E2]/45 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

            <div className="relative z-10 flex w-full flex-col justify-end gap-8 p-6 px-8 pb-20 sm:p-8 sm:px-12 sm:pb-24 lg:p-10 lg:px-16 lg:pb-28">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 w-full">
                <div className="max-w-4xl">

                  <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
                    {activeFeaturedEvent.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                    {activeFeaturedEvent.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4 text-base font-bold text-white/90 sm:text-lg">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-[#C4B5FD]" />
                      {activeFeaturedEvent.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#C4B5FD]" />
                      {activeFeaturedEvent.location}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 mb-1">
                  <Link
                    to={`/personal/${workspaceId}/discovery/event/${activeFeaturedEvent.id}`}
                    aria-label={featuredIndex % 2 === 1 ? "GET FREE TICKETS" : "BUY TICKETS"}
                    className={`group/btn relative overflow-hidden flex items-center justify-center w-full sm:w-[260px] h-11 text-white font-bold text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 ${featuredIndex % 2 === 1
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
                    <motion.span
                      className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 -skew-x-12"
                      animate={{ left: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 0.5 }}
                    />
                    <span className="relative z-10 uppercase tracking-wide group-hover/btn:hidden">
                      {featuredIndex % 2 === 1 ? "Free" : "BUY TICKETS"}
                    </span>
                    <span className="relative z-10 uppercase tracking-wide hidden group-hover/btn:block">
                      {Math.max(1, 50 - (featuredIndex * 5))} Tickets Left
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 sm:bottom-8 lg:bottom-10">
          {featuredEvents.map((event, index) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setFeaturedSlide(index)}
              aria-label={`Show ${event.title}`}
              className={`h-2.5 rounded-full shadow-sm transition-all duration-300 ${index === featuredIndex ? 'w-12 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
