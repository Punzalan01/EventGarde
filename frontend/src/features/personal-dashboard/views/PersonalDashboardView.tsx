import { useParams } from 'react-router-dom';
import { usePersonalDashboardViewModel } from '../viewmodels/usePersonalDashboardViewModel';
import { FeaturedEventsSection } from '../components/FeaturedEventsSection';
import { RecommendedEventsSection } from '../components/RecommendedEventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { PendingRsvpsSection } from '../components/PendingRsvpsSection';

export function PersonalDashboardView() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const {
    activeFeaturedEvent,
    featuredEvents,
    featuredIndex,
    handleFeaturedNext,
    handleFeaturedPrevious,
    handleRecommendedNext,
    handleRecommendedPrevious,
    normalizedRecommendedPage,
    pendingRsvps,
    recommendedPageCount,
    setFeaturedSlide,
    upcomingEvents,
    visibleRecommendedEvents,
  } = usePersonalDashboardViewModel();

  return (
    <div className="min-h-screen overflow-hidden bg-[#F3F4F6] text-[#111827]">
      <FeaturedEventsSection
        activeFeaturedEvent={activeFeaturedEvent}
        featuredIndex={featuredIndex}
        featuredEvents={featuredEvents}
        handleFeaturedNext={handleFeaturedNext}
        handleFeaturedPrevious={handleFeaturedPrevious}
        setFeaturedSlide={setFeaturedSlide}
        workspaceId={workspaceId}
      />

      {/* Rest of Dashboard Constrained */}
      <div className="mx-auto w-full max-w-[100rem] px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <RecommendedEventsSection
          visibleRecommendedEvents={visibleRecommendedEvents}
          handleRecommendedNext={handleRecommendedNext}
          handleRecommendedPrevious={handleRecommendedPrevious}
          recommendedPageCount={recommendedPageCount}
          normalizedRecommendedPage={normalizedRecommendedPage}
        />

        <section className="mt-5 flex flex-col gap-10">
          <UpcomingEventsSection upcomingEvents={upcomingEvents} workspaceId={workspaceId} />
          <PendingRsvpsSection pendingRsvps={pendingRsvps} />
        </section>
      </div>
    </div>
  );
}
