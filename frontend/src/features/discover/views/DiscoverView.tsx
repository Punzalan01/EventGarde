import React from 'react';
import { useDiscoverViewModel } from '../viewmodels/useDiscoverViewModel';
import { DiscoverEvent } from '../models/DiscoverEvent';
import { CardStack } from '@/components/ui/card-stack';
import { BookmarkIconButton } from '@/components/ui/bookmark-icon-button';
import { BackgroundGradientLight } from '@/components/ui/background-gradient-snippet';
import { Lock, MapPin, Calendar, Users, Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export function DiscoverView() {
  const { allEvents, featuredEvents } = useDiscoverViewModel();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = ['All', 'Technology', 'Design', 'Entertainment', 'Wellness', 'Business', 'Food & Culture', 'Gaming', 'Networking'];

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-sans text-[#4B5563] relative overflow-hidden will-change-transform" style={{ contain: 'paint' }}>
      <BackgroundGradientLight />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-4xl md:text-5xl mb-4">
            Discover Events
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Explore public events you can join, RSVP to, or save for later. Private events require an access code.
          </p>
        </div>

        {/* Featured Events Card Stack */}
        <div className="w-full">
          <h2 className="text-[#111827] font-bold text-2xl tracking-tight mb-2 text-center">Featured Events</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Swipe or click to explore trending public events</p>
          <CardStack<DiscoverEvent>
            items={featuredEvents}
            initialIndex={0}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots
            cardWidth={560}
            cardHeight={340}
            renderCard={(item, { active }) => (
              <div className="relative h-full w-full">
                <div className="absolute inset-0">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                    loading="eager"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 z-20">
                  <BookmarkIconButton />
                </div>
                {item.category && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-[#6E41E2] text-white text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                )}
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <div className="text-xl font-bold text-white truncate">{item.title}</div>
                  {item.description && (
                    <div className="mt-1.5 line-clamp-2 text-sm text-white/80">{item.description}</div>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-white/70 text-xs">
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {item.location}
                      </span>
                    )}
                    {item.attendees && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {item.attendees}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                  ? 'bg-[#6E41E2] text-white shadow-md'
                  : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-[#F0EBFF] hover:text-[#6E41E2] hover:border-[#D6BCFA]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All Events Grid */}
        <div>
          <h2 className="text-[#111827] font-bold text-2xl tracking-tight mb-6">
            All Events
            <span className="text-gray-400 font-normal text-base ml-2">({filteredEvents.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`group relative rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${event.isPrivate
                    ? 'border-gray-300'
                    : 'border-gray-100 hover:border-[#D6BCFA] hover:-translate-y-1'
                  }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${event.isPrivate ? 'blur-md scale-110' : ''
                      }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Private overlay */}
                  {event.isPrivate && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Private Event</span>
                    </div>
                  )}

                  {/* Category tag */}
                  {event.category && !event.isPrivate && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#6E41E2]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        {event.category}
                      </span>
                    </div>
                  )}

                  {/* Bookmark */}
                  {!event.isPrivate && (
                    <div className="absolute top-3 right-3">
                      <BookmarkIconButton />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-5 ${event.isPrivate ? 'opacity-60' : ''}`}>
                  <h3 className="text-[#111827] font-bold text-lg mb-1 truncate">{event.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {event.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {event.date}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {event.location}
                      </span>
                    )}
                  </div>

                  {event.attendees && !event.isPrivate && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="w-3.5 h-3.5" />
                        <span className="font-bold text-[#6E41E2]">{event.attendees}</span> attendees
                      </span>
                      <button className="text-xs font-bold text-[#6E41E2] hover:text-[#5833B5] transition-colors">
                        View Details →
                      </button>
                    </div>
                  )}

                  {event.isPrivate && (
                    <div className="mt-3">
                      <button className="w-full py-2.5 rounded-xl bg-[#111827] text-white text-sm font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Request Access
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-[#111827] font-bold text-xl mb-2">No events found</h3>
              <p className="text-gray-400">Try a different search term or filter.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
