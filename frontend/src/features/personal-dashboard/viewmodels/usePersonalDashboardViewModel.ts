import { useMemo, useState, useEffect, type FormEvent } from 'react';
import {
  getDigitalTickets,
  getFeaturedEvents,
  getPendingRsvps,
  getPublicEvents,
  getRecommendedEvents,
  getUpcomingEvents,
  recommendedCategories,
  type PendingRsvp,
  type RecommendedCategoryFilter,
} from '../models/personal.model';

const RECOMMENDED_PAGE_SIZE = 4;

export function usePersonalDashboardViewModel() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [recommendedCategory, setRecommendedCategory] = useState<RecommendedCategoryFilter>('all');
  const [recommendedPage, setRecommendedPage] = useState(0);
  const [showRsvpGate, setShowRsvpGate] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState<PendingRsvp | null>(null);
  const [otpCode, setOtpCode] = useState('');

  const publicEvents = useMemo(() => getPublicEvents(), []);
  const featuredEvents = useMemo(() => getFeaturedEvents(), []);
  const recommendedEvents = useMemo(() => getRecommendedEvents(), []);
  const digitalTickets = useMemo(() => getDigitalTickets(), []);
  const pendingRsvps = useMemo(() => getPendingRsvps(), []);
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);

  const filteredRecommendedEvents = useMemo(() => {
    if (recommendedCategory === 'all') return recommendedEvents;
    return recommendedEvents.filter((event) => event.category === recommendedCategory);
  }, [recommendedCategory, recommendedEvents]);

  const recommendedPageCount = Math.max(1, Math.ceil(filteredRecommendedEvents.length / RECOMMENDED_PAGE_SIZE));
  const normalizedRecommendedPage = Math.min(recommendedPage, recommendedPageCount - 1);
  const visibleRecommendedEvents = filteredRecommendedEvents.slice(
    normalizedRecommendedPage * RECOMMENDED_PAGE_SIZE,
    normalizedRecommendedPage * RECOMMENDED_PAGE_SIZE + RECOMMENDED_PAGE_SIZE,
  );

  const activeFeaturedEvent = featuredEvents[featuredIndex] ?? featuredEvents[0];
  const activePendingRsvp = selectedRsvp ?? pendingRsvps[0] ?? null;

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  const setFeaturedSlide = (index: number) => {
    setFeaturedIndex(index);
  };

  const handleFeaturedPrevious = () => {
    setFeaturedIndex((current) => (current === 0 ? featuredEvents.length - 1 : current - 1));
  };

  const handleFeaturedNext = () => {
    setFeaturedIndex((current) => (current + 1) % featuredEvents.length);
  };

  const handleRecommendedCategoryChange = (category: RecommendedCategoryFilter) => {
    setRecommendedCategory(category);
    setRecommendedPage(0);
  };

  const handleRecommendedPrevious = () => {
    setRecommendedPage((current) => (current === 0 ? recommendedPageCount - 1 : current - 1));
  };

  const handleRecommendedNext = () => {
    setRecommendedPage((current) => (current + 1) % recommendedPageCount);
  };

  const openRsvpGate = (rsvp: PendingRsvp) => {
    setSelectedRsvp(rsvp);
    setOtpCode('');
    if (rsvp.status !== 'mismatch') {
      setShowRsvpGate(true);
    }
  };

  const closeRsvpGate = () => {
    setShowRsvpGate(false);
  };

  const handleRsvpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowRsvpGate(false);
    setOtpCode('');
  };

  return {
    activeFeaturedEvent,
    activePendingRsvp,
    closeRsvpGate,
    digitalTickets,
    featuredEvents,
    featuredIndex,
    filteredRecommendedEvents,
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
    publicEvents,
    recommendedCategories,
    recommendedCategory,
    recommendedPageCount,
    setFeaturedSlide,
    setOtpCode,
    setShowRsvpGate,
    showRsvpGate,
    upcomingEvents,
    visibleRecommendedEvents,
  };
}
