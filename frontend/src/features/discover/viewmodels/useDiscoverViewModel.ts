import { DiscoverEvent } from '../models/DiscoverEvent';

const allEvents: DiscoverEvent[] = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2026',
    description: 'Join the biggest technology conference in Southeast Asia featuring keynotes, workshops, and networking.',
    imageSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    date: 'Jul 15, 2026',
    location: 'BGC, Taguig City',
    attendees: '2,500',
    category: 'Technology',
    isPrivate: false,
  },
  {
    id: 2,
    title: 'Manila Design Week',
    description: 'A week-long celebration of design, creativity, and innovation across multiple venues in Manila.',
    imageSrc: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    date: 'Aug 3, 2026',
    location: 'Makati City',
    attendees: '4,200',
    category: 'Design',
    isPrivate: false,
  },
  {
    id: 3,
    title: 'Startup Founders Mixer',
    description: 'An exclusive networking event for startup founders, VCs, and angel investors in the Philippines.',
    imageSrc: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    date: 'Jul 28, 2026',
    location: 'Ortigas Center',
    attendees: '350',
    category: 'Networking',
    isPrivate: true,
  },
  {
    id: 4,
    title: 'Music & Arts Festival',
    description: 'A vibrant outdoor festival featuring live performances, art installations, and local food vendors.',
    imageSrc: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    date: 'Sep 12, 2026',
    location: 'Clark, Pampanga',
    attendees: '8,000',
    category: 'Entertainment',
    isPrivate: false,
  },
  {
    id: 5,
    title: 'Wellness & Mindfulness Retreat',
    description: 'A weekend retreat focused on mental health, yoga, meditation, and holistic wellness practices.',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    date: 'Aug 20, 2026',
    location: 'Tagaytay City',
    attendees: '200',
    category: 'Wellness',
    isPrivate: false,
  },
  {
    id: 6,
    title: 'Corporate Leadership Forum',
    description: 'An invite-only gathering of C-suite executives discussing the future of business in Asia Pacific.',
    imageSrc: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    date: 'Oct 5, 2026',
    location: 'Pasig City',
    attendees: '150',
    category: 'Business',
    isPrivate: true,
  },
  {
    id: 7,
    title: 'Food & Culture Expo',
    description: 'Discover diverse cuisines, cultural performances, and artisanal crafts from across the Philippines.',
    imageSrc: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    date: 'Sep 25, 2026',
    location: 'SM Mall of Asia',
    attendees: '12,000',
    category: 'Food & Culture',
    isPrivate: false,
  },
  {
    id: 8,
    title: 'Esports Championship Finals',
    description: 'Watch the top esports teams from Southeast Asia compete for the regional championship title.',
    imageSrc: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    date: 'Nov 10, 2026',
    location: 'Philippine Arena',
    attendees: '15,000',
    category: 'Gaming',
    isPrivate: false,
  },
];

export function useDiscoverViewModel() {
  const publicEvents = allEvents.filter((e) => !e.isPrivate);
  const privateEvents = allEvents.filter((e) => e.isPrivate);

  // Featured events for the CardStack (first 5 public)
  const featuredEvents = publicEvents.slice(0, 5);

  return {
    allEvents,
    publicEvents,
    privateEvents,
    featuredEvents,
  };
}
