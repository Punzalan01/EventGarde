import { useState, useEffect } from 'react';
import { EventDetailRecord } from '../models/eventDetail.model';
import { useDiscoverViewModel } from './useDiscoverViewModel';

export function useEventDetailViewModel(eventId: string | undefined) {
  const { allEvents } = useDiscoverViewModel();
  const [eventDetail, setEventDetail] = useState<EventDetailRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ABOUT' | 'SEAT PLAN' | 'TICKETS'>('SEAT PLAN');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Mocking an API call to fetch full event details based on the basic event data
    setLoading(true);
    setTimeout(() => {
      const baseEvent = allEvents.find(e => e.id === eventId) || allEvents[0];
      
      const mockedDetail: EventDetailRecord & { moreDetails: string } = {
        id: String(baseEvent?.id || 'ev-unknown'),
        title: baseEvent?.title || 'Unknown Event',
        venue: 'SM Mall of Asia Arena', // Mocking SM Tickets venue style
        date: 'SEP 05, 2026',
        time: '7:00 PM',
        heroImage: baseEvent?.imageSrc || 'https://images.unsplash.com/photo-1540039155733-d76e6c484940?q=80&w=2000&auto=format&fit=crop',
        seatPlanImage: '/seat-plan.svg', // Realistic stadium seat plan
        moreDetails: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        aboutHtml: `
          <p class="mb-4"><strong>SVIP PACKAGE</strong><br/>Package: PHP 16,050</p>
          <ul class="list-disc pl-5 mb-6 text-sm opacity-90 space-y-1">
            <li>One (1) SVIP Standing ticket</li>
            <li>Exclusive access to Pre-Show Soundcheck Party</li>
            <li>VIP laminate and lanyard</li>
            <li>Priority merchandise shopping</li>
            <li>Photocard with printed signature</li>
          </ul>
          <p class="text-sm opacity-90 leading-relaxed text-justify">
            This group has captivated global audiences with their exceptional talents in vocals, rap, performance, and visuals. Earning them the name 'MONSTER ROOKIE.' The group officially debuted with their first EP, breaking records for first-week sales. Following their single achievements on global charts, they made a rapid comeback.
          </p>
        `,
        guidelines: [
          'SM Tickets user account',
          'Credit card to be used',
          'One (1) valid government ID to be presented for redemption'
        ],
        pricingTiers: [
          { id: 't1', name: 'SVIP PACKAGE', type: 'Standing', price: 16050 },
          { id: 't2', name: 'VIP A PREMIUM', type: 'Reserved Seating', price: 13750 },
          { id: 't3', name: 'VIP A REGULAR', type: 'Reserved Seating', price: 13250 },
          { id: 't4', name: 'VIP B PREMIUM', type: 'Reserved Seating', price: 12500 },
          { id: 't5', name: 'VIP B REGULAR', type: 'Reserved Seating', price: 11750 },
          { id: 't6', name: 'BOX A PREMIUM', type: 'Reserved Seating', price: 7750 },
          { id: 't7', name: 'BOX B PREMIUM', type: 'Reserved Seating', price: 7250 },
          { id: 't8', name: 'BOX REGULAR', type: 'Reserved Seating', price: 3500 },
        ]
      };

      setEventDetail(mockedDetail);
      setLoading(false);
    }, 400); // Slight delay for realistic loading
  }, [eventId, allEvents]);

  return {
    eventDetail,
    loading,
    activeTab,
    setActiveTab,
    showMore,
    setShowMore
  };
}
