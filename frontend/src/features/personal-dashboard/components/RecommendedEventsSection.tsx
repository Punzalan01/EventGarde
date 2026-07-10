import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { RecommendedCard } from './RecommendedCard';
import { CarouselProgress } from './CarouselProgress';
import type { RecommendedEvent } from '../models/personal.model';

interface RecommendedEventsSectionProps {
  visibleRecommendedEvents: RecommendedEvent[];
  handleRecommendedNext: () => void;
  handleRecommendedPrevious: () => void;
  recommendedPageCount: number;
  normalizedRecommendedPage: number;
}

export function RecommendedEventsSection({
  visibleRecommendedEvents,
  handleRecommendedNext,
  handleRecommendedPrevious,
  recommendedPageCount,
  normalizedRecommendedPage,
}: RecommendedEventsSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="px-1 flex items-center justify-between">
        <SectionTitle eyebrow="Recommended for you" />
        <Link to="discovery" className="text-xs font-bold uppercase tracking-wide text-[#6E41E2] hover:text-[#5833B5] flex items-center gap-1">
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
  );
}
