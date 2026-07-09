import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import { usePersonalDashboardViewModel } from '../viewmodels/usePersonalDashboardViewModel';
import type { DigitalTicket, PendingRsvp, PendingRsvpStatus, RecommendedEvent } from '../models/personal.model';

const statusCopy: Record<PendingRsvpStatus, { label: string; className: string }> = {
  otp_required: {
    label: 'OTP required',
    className: 'border-amber-200 bg-amber-100 text-amber-900',
  },
  ready: {
    label: 'Ready to confirm',
    className: 'border-emerald-200 bg-emerald-100 text-emerald-900',
  },
  mismatch: {
    label: 'Contact mismatch',
    className: 'border-red-200 bg-red-100 text-red-900',
  },
};

const entryCopy: Record<DigitalTicket['entryStatus'], string> = {
  checked_in: 'Checked in',
  not_open: 'Entry not open',
  qr_ready: 'QR ready',
};

function CarouselProgress({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Slide ${activeIndex + 1} of ${count}`}>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === activeIndex ? 'w-12 bg-[#6E41E2]' : 'w-2 bg-[#A78BFA]/70'
          }`}
        />
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow }: { eyebrow: string }) {
  return (
    <h2 className="text-sm font-extrabold uppercase leading-none tracking-[0.08em] text-[#111827] md:text-base">
      {eyebrow}
    </h2>
  );
}

function RecommendedCard({ event }: { event: RecommendedEvent }) {
  return (
    <article className="group relative h-[16.25rem] min-w-[16rem] flex-1 overflow-hidden rounded-2xl bg-[#111827] shadow-[0_24px_55px_-30px_rgba(17,24,39,0.75)] ring-1 ring-white/60 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_48px_-26px_rgba(110,65,226,0.7)] md:min-w-0">
      <img
        src={event.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#111827]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#6E41E2]/35 via-transparent to-black/45 opacity-80" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
            {event.label}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111827] shadow-sm">
            {event.price}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-black leading-[0.98] tracking-tight text-white">
            {event.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-white/80">
            <span>{event.date}</span>
            <span aria-hidden="true">/</span>
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function TicketRow({ ticket }: { ticket: DigitalTicket }) {
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

function RsvpSummary({ rsvp, isActive, onSelect }: { rsvp: PendingRsvp; isActive: boolean; onSelect: () => void }) {
  const status = statusCopy[rsvp.status];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-3 text-left transition ${
        isActive
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
    visibleRecommendedEvents,
  } = usePersonalDashboardViewModel();

  const activeRsvpStatus = activePendingRsvp ? statusCopy[activePendingRsvp.status] : null;

  return (
    <div className="min-h-screen overflow-hidden bg-[#FBFBFD] text-[#111827]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(110,65,226,0.17),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(17,24,39,0.10),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F5F1FF_52%,#FFFFFF_100%)]"
      />

      <div className="mx-auto w-full max-w-[72rem] px-4 pb-10 pt-3 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-[#111827] shadow-[0_35px_80px_-45px_rgba(17,24,39,0.8)] ring-1 ring-white/20">
          <img
            src={activeFeaturedEvent.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-500"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050510] via-[#111827]/88 to-[#6E41E2]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

          <div className="relative z-10 grid min-h-[18rem] items-end gap-8 p-6 sm:min-h-[22rem] sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/85 backdrop-blur">
                {activeFeaturedEvent.eyebrow}
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                {activeFeaturedEvent.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/90 sm:text-base">
                {activeFeaturedEvent.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-white/85">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#C4B5FD]" />
                  {activeFeaturedEvent.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C4B5FD]" />
                  {activeFeaturedEvent.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:self-end">
              <button
                type="button"
                onClick={handleFeaturedPrevious}
                aria-label="Previous featured event"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#111827] focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleFeaturedNext}
                aria-label="Next featured event"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111827] shadow-lg transition hover:bg-[#F0EBFF] focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <div className="mt-3">
          <div className="flex items-center justify-center gap-2">
            {featuredEvents.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setFeaturedSlide(index)}
                aria-label={`Show ${event.title}`}
                className={`h-2 rounded-full transition-all ${
                  index === featuredIndex ? 'w-12 bg-[#6E41E2]' : 'w-2 bg-[#8C7C87]'
                }`}
              />
            ))}
          </div>
        </div>

        <section className="relative mt-8">
          <div className="px-1">
            <SectionTitle eyebrow="Recommended for you" />
            <div className="mt-3 flex flex-wrap gap-2">
              {recommendedCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleRecommendedCategoryChange(category.id)}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                    recommendedCategory === category.id
                      ? 'bg-[#111827] text-white shadow-[0_14px_30px_-18px_rgba(17,24,39,0.8)]'
                      : 'bg-white text-[#6B7280] ring-1 ring-[#E6E0FF] hover:text-[#111827]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-4">
            <button
              type="button"
              onClick={handleRecommendedPrevious}
              aria-label="Previous recommended events"
              className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827] text-white shadow-xl transition hover:bg-[#6E41E2] md:flex"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible">
              {visibleRecommendedEvents.map((event) => (
                <RecommendedCard key={event.id} event={event} />
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
              className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#111827] text-white shadow-xl transition hover:bg-[#6E41E2] md:flex"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3">
            <CarouselProgress count={recommendedPageCount} activeIndex={normalizedRecommendedPage} />
          </div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#111827]/25 to-transparent" />
        </section>

        <section className="mt-5 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <SectionTitle eyebrow="Upcoming Events" />
            <div className="mt-3 grid gap-3">
              {digitalTickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="Pending RSVP's" />
            <article className="relative mt-3 min-h-[31.25rem] overflow-hidden rounded-3xl bg-[#111827] p-4 text-white shadow-[0_35px_80px_-45px_rgba(17,24,39,0.85)] ring-1 ring-white/10 sm:p-5 lg:min-h-[50.25rem]">
              {activePendingRsvp && (
                <>
                  <img
                    src={activePendingRsvp.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-35"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#111827]/88 to-[#6E41E2]/65" />
                  <div className="relative z-10 grid h-full min-h-[28.75rem] gap-5 lg:min-h-[47.75rem] lg:grid-cols-[0.88fr_1.12fr]">
                    <div className="flex flex-col gap-3">
                      {pendingRsvps.map((rsvp) => (
                        <RsvpSummary
                          key={rsvp.id}
                          rsvp={rsvp}
                          isActive={activePendingRsvp.id === rsvp.id}
                          onSelect={() => openRsvpGate(rsvp)}
                        />
                      ))}
                    </div>

                    <div className="flex min-h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                      <div>
                        {activeRsvpStatus && (
                          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${activeRsvpStatus.className}`}>
                            {activeRsvpStatus.label}
                          </span>
                        )}
                        <h3 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-4xl">
                          {activePendingRsvp.title}
                        </h3>
                        <div className="mt-5 grid gap-3 text-sm font-semibold text-white/80">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-[#C4B5FD]" />
                            {activePendingRsvp.date}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#C4B5FD]" />
                            {activePendingRsvp.venue}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#C4B5FD]" />
                            Hosted by {activePendingRsvp.host}
                          </span>
                        </div>
                        <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-medium leading-6 text-white/78">
                          {activePendingRsvp.message}
                        </p>

                        {activePendingRsvp.status === 'mismatch' && (
                          <div className="mt-4 flex gap-3 rounded-2xl border border-red-300/30 bg-red-500/15 p-4 text-sm font-semibold text-red-50">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                            <p>This RSVP is terminally blocked until the organizer updates the master guest list.</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => openRsvpGate(activePendingRsvp)}
                          disabled={activePendingRsvp.status === 'mismatch'}
                          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#111827] transition hover:bg-[#F0EBFF] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
                        >
                          {activePendingRsvp.status === 'ready' ? 'Confirm RSVP' : 'Verify Contact'}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white/80">
                          <ShieldCheck className="h-4 w-4" />
                          {activePendingRsvp.invitedContact}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </article>
          </div>
        </section>
      </div>

      {showRsvpGate && activePendingRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close RSVP verification"
            className="absolute inset-0 bg-[#050510]/70 backdrop-blur-sm"
            onClick={closeRsvpGate}
          />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative h-32 bg-[#111827]">
              <img src={activePendingRsvp.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111827] to-[#6E41E2]/60" />
              <button
                type="button"
                onClick={closeRsvpGate}
                className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white hover:text-[#111827]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleRsvpSubmit} className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EBFF] text-[#6E41E2]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#111827]">
                Verify RSVP Contact
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-[#6B7280]">
                Enter the 6-digit code sent to the invited email or phone for {activePendingRsvp.title}.
              </p>
              <input
                type="text"
                inputMode="numeric"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="000000"
                className="mt-5 w-full rounded-2xl border border-[#E6E0FF] bg-[#FAFAFC] px-4 py-4 text-center text-2xl font-black tracking-[0.45em] text-[#111827] outline-none transition focus:border-[#6E41E2] focus:ring-4 focus:ring-[#6E41E2]/15"
                maxLength={6}
              />
              <button
                type="submit"
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6E41E2] px-5 py-3 text-sm font-black text-white shadow-[0_18px_38px_rgba(110,65,226,0.26)] transition hover:bg-[#5833B5]"
              >
                Submit RSVP Code
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
