import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
  Inbox,
} from 'lucide-react';
import { usePersonalDashboardViewModel } from '../viewmodels/usePersonalDashboardViewModel';
import { statusCopy } from '../constants/dashboard.constants';
import { CarouselProgress } from '../components/CarouselProgress';
import { SectionTitle } from '../components/SectionTitle';
import { RecommendedCard } from '../components/RecommendedCard';
import { TicketRow } from '../components/TicketRow';
import { RsvpSummary } from '../components/RsvpSummary';
import { CardStack } from '@/components/ui/card-stack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function PersonalDashboardView() {
  const {
    activeFeaturedEvent,
    activePendingRsvp,
    closeRsvpGate,
    digitalTickets,
    featuredEvents,
    featuredIndex,
    handleFeaturedNext,
    handleFeaturedPrevious,
    handleRecommendedCategoryChange,
    handleRecommendedNext,
    handleRecommendedPrevious,
    handleRsvpSubmit,
    normalizedRecommendedPage,
    openRsvpGate,
    otpCode,
    pendingRsvps,
    recommendedCategories,
    recommendedCategory,
    recommendedPageCount,
    setFeaturedSlide,
    setOtpCode,
    showRsvpGate,
    upcomingEvents,
    visibleRecommendedEvents,
  } = usePersonalDashboardViewModel();

  const activeRsvpStatus = activePendingRsvp ? statusCopy[activePendingRsvp.status] : null;

  return (
    <div className="min-h-screen overflow-hidden bg-[#F3F4F6] text-[#111827]">

      {/* Featured Events Full Width */}
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
                    <button
                      type="button"
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
                      <span className={`relative z-10 uppercase tracking-wide ${featuredIndex % 2 !== 1 ? 'group-hover/btn:hidden' : ''}`}>
                        {featuredIndex % 2 === 1 ? "Free" : "BUY TICKETS"}
                      </span>
                      {featuredIndex % 2 !== 1 && (
                        <span className="relative z-10 uppercase tracking-wide hidden group-hover/btn:block">
                          PHP {((featuredIndex + 1) * 2500).toLocaleString()}
                        </span>
                      )}
                    </button>
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

      {/* Rest of Dashboard Constrained */}
      <div className="mx-auto w-full max-w-[100rem] px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden">
          <div className="px-1 flex items-center justify-between">
            <SectionTitle eyebrow="Recommended for you" />
            <Link to="/personal/discovery" className="text-xs font-bold uppercase tracking-wide text-[#6E41E2] hover:text-[#5833B5] flex items-center gap-1">
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative mt-4 px-0 md:px-14 group">
            <button
              type="button"
              onClick={handleRecommendedPrevious}
              aria-label="Previous recommended events"
              className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827] text-white shadow-xl transition hover:bg-[#6E41E2] md:flex"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible">
              {visibleRecommendedEvents.map((event, index) => (
                <RecommendedCard key={event.id} event={event} index={index} />
              ))}
              {visibleRecommendedEvents.length === 0 && (
                <div className="col-span-4 rounded-2xl border border-dashed border-[#C4B5FD] bg-white p-8 text-center text-sm font-bold text-[#6B7280]">
                  No recommendations in this category yet.
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleRecommendedNext}
              aria-label="Next recommended events"
              className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827] text-white shadow-xl transition hover:bg-[#6E41E2] md:flex"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3">
            <CarouselProgress count={recommendedPageCount} activeIndex={normalizedRecommendedPage} />
          </div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#111827]/25 to-transparent" />
        </section>

        <section className="mt-5 flex flex-col gap-10">
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
                    <div className="relative h-full w-full bg-[#111827]">
                      <img src={item.imageSrc} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
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
                    </div>
                  );
                }}
              />
            </div>
          </div>

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
                      <Link to="rsvp" className="text-[#6E41E2] font-semibold text-sm">
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
        </section>

      </div>
    </div>
  );
}
