import React from 'react';
import { useDiscoverViewModel } from '../viewmodels/useDiscoverViewModel';
import { DiscoverEvent } from '../models/DiscoverEvent';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Inline SectionTitle to avoid cross-feature dependency issues if not needed
function SectionTitle({ eyebrow }: { eyebrow: string }) {
  return (
    <h2 className="text-xl font-black uppercase leading-tight tracking-wider text-[#111827] md:text-3xl">
      {eyebrow}
    </h2>
  );
}

// Mimicking the RecommendedCard UI from the dashboard
function DiscoverCard({ event, index = 0 }: { event: DiscoverEvent; index?: number }) {
  const isFree = index % 2 === 1; // Just for visual variance

  return (
    <article className="flex flex-col min-w-[20rem] md:min-w-0 flex-1 shrink-0 group/card bg-zinc-50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden border border-zinc-200/60">
      {/* Poster Image */}
      <Link to={`event/${event.id}`} className="block w-full bg-black overflow-hidden relative group/img">
        <img
          src={event.imageSrc}
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
        <Link to={`event/${event.id}`}>
          <h1 className="text-base sm:text-lg font-black text-[#111827] leading-[1.1] uppercase line-clamp-2">
            {event.title}
          </h1>
        </Link>
        <p className="text-sm font-medium text-gray-500 truncate">{event.location}</p>

        <div className="mt-auto pt-2">
          <span className="inline-flex bg-[#1C73A6] text-white text-[0.7rem] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
            {event.date}
          </span>
        </div>

        <div className="pt-4">
          <Link
            to={`event/${event.id}`}
            className={`group/btn relative overflow-hidden flex items-center justify-center w-full h-11 text-white font-bold text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 ${event.isPrivate
              ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:ring-blue-500/30"
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
            <span className={`relative z-10 uppercase tracking-wide ${(!event.isPrivate && !isFree) ? 'group-hover/btn:hidden' : ''}`}>
              {event.isPrivate ? "ENTER CODE" : (isFree ? "Free" : "Buy Tickets")}
            </span>
            {(!event.isPrivate && !isFree) && (
              <span className="relative z-10 uppercase tracking-wide hidden group-hover/btn:block">
                PHP {(event.price || ((index + 1) * 350)).toLocaleString()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}

function CategoryRow({ title, events }: { title: string; events: DiscoverEvent[] }) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (events.length === 0) return null;

  return (
    <section className="relative mt-10">
      <div className="px-1 flex items-center justify-between">
        <SectionTitle eyebrow={title} />
      </div>

      <div className="relative mt-4 px-0 md:px-14 group">
        <button
          type="button"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827] text-white shadow-xl transition hover:bg-[#6E41E2] md:flex"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible"
        >
          {events.map((event, index) => (
            <DiscoverCard key={event.id} event={event} index={index} />
          ))}
        </div>

        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827] text-white shadow-xl transition hover:bg-[#6E41E2] md:flex"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#111827]/25 to-transparent" />
    </section>
  );
}

export function DiscoverView() {
  const { allEvents } = useDiscoverViewModel();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const allCategories = ['All', 'Technology', 'Design', 'Entertainment', 'Wellness', 'Business', 'Food & Culture', 'Gaming', 'Networking'];

  // Define the default categories we want to show rows for if 'All' is selected
  const defaultCategories = ['Technology', 'Design', 'Entertainment', 'Wellness', 'Business', 'Food & Culture', 'Gaming', 'Networking'];

  const filteredEvents = selectedCategory === 'All'
    ? []
    : allEvents.filter(e => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#111827] overflow-hidden">
      {/* Background decoration similar to dashboard */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(110,65,226,0.17),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(17,24,39,0.10),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F5F1FF_52%,#FFFFFF_100%)]"
      />

      <div className="mx-auto w-full max-w-[100rem] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/60 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#111827] sm:text-4xl">
              Discover Events
            </h1>
            <p className="mt-2 text-base font-medium text-gray-500">
              Explore and find your next unforgettable experience.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category-select" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Select Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 w-full md:w-64 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-[#111827] shadow-sm focus:border-[#6E41E2] focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/20"
            >
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedCategory === 'All' ? (
          <div className="space-y-2">
            {defaultCategories.map((category) => {
              const categoryEvents = allEvents.filter(e => e.category === category);
              if (categoryEvents.length === 0) return null;
              return (
                <CategoryRow
                  key={category}
                  title={category}
                  events={categoryEvents}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <div className="px-1 flex items-center justify-between mb-6">
              <SectionTitle eyebrow={`${selectedCategory} Events`} />
            </div>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredEvents.map((event, index) => (
                  <DiscoverCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-semibold">No events found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
