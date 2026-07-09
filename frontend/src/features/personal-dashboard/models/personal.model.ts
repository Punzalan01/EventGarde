export type EventCategory = 'business' | 'music' | 'food' | 'creative';

export interface FeaturedEvent {
  id: string;
  title: string;
  eyebrow: string;
  date: string;
  location: string;
  image: string;
  description: string;
  ctaLabel: string;
}

export interface RecommendedEvent {
  id: string;
  title: string;
  category: EventCategory;
  label: string;
  date: string;
  location: string;
  price: string;
  image: string;
  isPrivate?: boolean;
}

export interface PublicEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  type: 'B2B' | 'B2C';
  organizer: string;
}

export type TicketStatus = 'active' | 'confirmed' | 'upcoming';
export type EntryStatus = 'qr_ready' | 'not_open' | 'checked_in';

export interface DigitalTicket {
  id: string;
  event: string;
  date: string;
  type: string;
  qrCode: string;
  image: string;
  location: string;
  ticketStatus: TicketStatus;
  entryStatus: EntryStatus;
}

export type PendingRsvpStatus = 'otp_required' | 'ready' | 'mismatch';

export interface PendingRsvp {
  id: string;
  title: string;
  date: string;
  venue: string;
  host: string;
  status: PendingRsvpStatus;
  invitedContact: string;
  image: string;
  message: string;
}

export interface TopEvent {
  rank: number;
  name: string;
  category: string;
  attendees: string;
  rating: number;
  location: string;
}

export interface JoinedEvent {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface UpcomingEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  className: string;
  thumbnail: string;
  longDescription: string;
  price?: number;
  joinedCount?: number;
  capacity?: number;
}

export const recommendedCategories = [
  { id: 'all', label: 'All' },
  { id: 'business', label: 'Business' },
  { id: 'music', label: 'Music' },
  { id: 'food', label: 'Food' },
  { id: 'creative', label: 'Creative' },
] as const;

export type RecommendedCategoryFilter = typeof recommendedCategories[number]['id'];

export const getFeaturedEvents = (): FeaturedEvent[] => [
  {
    id: 'featured-1',
    title: 'Global Tech Summit 2026',
    eyebrow: 'Featured Events',
    date: 'Oct 15-17, 2026',
    location: 'Moscone Center, San Francisco',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=85',
    description: 'Keynotes, product launches, and private networking for builders shaping the next wave of enterprise technology.',
    ctaLabel: 'View itinerary',
  },
  {
    id: 'featured-2',
    title: 'Main Stage Festival',
    eyebrow: 'Spotlight',
    date: 'April 10-12, 2027',
    location: 'Empire Polo Club, Indio',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1800&q=85',
    description: 'Three nights of live music, visual production, and premium attendee access across the festival grounds.',
    ctaLabel: 'Explore tickets',
  },
  {
    id: 'featured-3',
    title: 'Private Dining Series',
    eyebrow: 'Invitation Ready',
    date: 'Nov 8, 2026',
    location: 'Harbor House, San Francisco',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85',
    description: 'A confirmed RSVP experience with a host-curated menu, guest notes, and arrival guidance in one place.',
    ctaLabel: 'Confirm RSVP',
  },
];

export const getRecommendedEvents = (): RecommendedEvent[] => [
  {
    id: 'rec-1',
    title: 'Rooftop Launch Night',
    category: 'business',
    label: 'Launch',
    date: 'Aug 18, 2026',
    location: 'Los Angeles, CA',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'rec-2',
    title: 'Outdoor Music Market',
    category: 'music',
    label: 'Festival',
    date: 'Sep 7, 2026',
    location: 'Austin, TX',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'rec-3',
    title: 'Private Dining Series',
    category: 'food',
    label: 'Dining',
    date: 'Nov 8, 2026',
    location: 'San Francisco, CA',
    price: 'Invite',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85',
    isPrivate: true,
  },
  {
    id: 'rec-4',
    title: 'Gallery Reception',
    category: 'creative',
    label: 'Arts',
    date: 'Oct 3, 2026',
    location: 'New York, NY',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'rec-5',
    title: 'Executive Summit',
    category: 'business',
    label: 'Summit',
    date: 'Oct 24, 2026',
    location: 'Chicago, IL',
    price: '$499',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'rec-6',
    title: 'After-Hours Social',
    category: 'music',
    label: 'Social',
    date: 'Dec 12, 2026',
    location: 'Miami, FL',
    price: '$60',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'rec-7',
    title: 'Community Food Fair',
    category: 'food',
    label: 'Market',
    date: 'Jan 20, 2027',
    location: 'Portland, OR',
    price: '$15',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'rec-8',
    title: 'Creator Workshop',
    category: 'creative',
    label: 'Workshop',
    date: 'Feb 14, 2027',
    location: 'Seattle, WA',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85',
  },
];

export const getPublicEvents = (): PublicEvent[] => [
  { id: 'e1', title: 'Global FinTech Summit 2026', date: 'Oct 24, 2026', location: 'Metropolis Convention Center', price: '$499', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85', type: 'B2B', organizer: 'TechFinance Inc.' },
  { id: 'e2', title: 'Neon Nights Music Festival', date: 'Nov 02, 2026', location: 'Central Park', price: '$85', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85', type: 'B2C', organizer: 'Live Nation' },
  { id: 'e3', title: 'Enterprise SaaS Expo', date: 'Nov 15, 2026', location: 'Silicon Valley Hub', price: 'Free', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85', type: 'B2B', organizer: 'SaaS Weekly' },
  { id: 'e4', title: 'Underground Indie Showcase', date: 'Dec 05, 2026', location: 'The Basement Venue', price: '$25', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85', type: 'B2C', organizer: 'Local Arts Collective' },
];

export const getDigitalTickets = (): DigitalTicket[] => [
  {
    id: 't1',
    event: 'Global Tech Summit 2026',
    date: 'Oct 15-17, 2026',
    type: 'General Admission',
    qrCode: 'QR_DATA_1',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=85',
    location: 'Moscone Center, San Francisco',
    ticketStatus: 'active',
    entryStatus: 'qr_ready',
  },
  {
    id: 't2',
    event: 'Main Stage Festival',
    date: 'April 10-12, 2027',
    type: 'Weekend Pass',
    qrCode: 'QR_DATA_2',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1000&q=85',
    location: 'Empire Polo Club, Indio',
    ticketStatus: 'confirmed',
    entryStatus: 'not_open',
  },
  {
    id: 't3',
    event: 'Private Dining Series',
    date: 'Nov 8, 2026',
    type: 'Hosted RSVP',
    qrCode: 'QR_DATA_3',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=85',
    location: 'Harbor House, San Francisco',
    ticketStatus: 'confirmed',
    entryStatus: 'qr_ready',
  },
  {
    id: 't4',
    event: 'Gallery Reception',
    date: 'Oct 3, 2026',
    type: 'Guest Entry',
    qrCode: 'QR_DATA_4',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=85',
    location: 'New York, NY',
    ticketStatus: 'upcoming',
    entryStatus: 'not_open',
  },
];

export const getPendingRsvps = (): PendingRsvp[] => [
  {
    id: 'rsvp-1',
    title: 'Founders Dinner Private Reception',
    date: 'Nov 8, 2026',
    venue: 'Harbor House, San Francisco',
    host: 'EventGarde Private Hosts',
    status: 'otp_required',
    invitedContact: 'jeremy@example.com',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=85',
    message: 'Verify your invited contact before this private RSVP can be confirmed.',
  },
  {
    id: 'rsvp-2',
    title: 'Product Leadership Salon',
    date: 'Dec 3, 2026',
    venue: 'Union Hall, New York',
    host: 'Northstar Product Council',
    status: 'ready',
    invitedContact: 'primary email matched',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85',
    message: 'Your verified email matches the host guest list.',
  },
  {
    id: 'rsvp-3',
    title: 'Collectors Preview Night',
    date: 'Jan 18, 2027',
    venue: 'Westside Gallery, Los Angeles',
    host: 'Westside Gallery',
    status: 'mismatch',
    invitedContact: 'phone not on list',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=85',
    message: 'Your verified contact does not match the guest list. Contact the organizer directly.',
  },
  {
    id: 'rsvp-4',
    title: 'Tech Founders Brunch',
    date: 'Feb 10, 2027',
    venue: 'The Atrium, Seattle',
    host: 'Seattle Tech Network',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85',
    message: 'Your RSVP is ready to be confirmed.',
  },
  {
    id: 'rsvp-5',
    title: 'AI Innovators Mixer',
    date: 'Feb 15, 2027',
    venue: 'Innovation Hub, Austin',
    host: 'AI Collective',
    status: 'otp_required',
    invitedContact: 'david@example.com',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85',
    message: 'Verification required before RSVP confirmation.',
  },
  {
    id: 'rsvp-6',
    title: 'Spring Fashion Gala',
    date: 'Mar 5, 2027',
    venue: 'Grand Plaza, New York',
    host: 'NY Fashion Week',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85',
    message: 'Your verified email matches the host guest list.',
  },
  {
    id: 'rsvp-7',
    title: 'Fintech Roundtable',
    date: 'Mar 12, 2027',
    venue: 'Financial District, London',
    host: 'Global Finance',
    status: 'mismatch',
    invitedContact: 'unrecognized contact',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=85',
    message: 'Contact mismatch. Please reach out to the host.',
  },
  {
    id: 'rsvp-8',
    title: 'Healthcare Innovation Summit',
    date: 'Apr 2, 2027',
    venue: 'Medical Center, Boston',
    host: 'HealthTech Boston',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85',
    message: 'Your RSVP is ready to be confirmed.',
  },
  {
    id: 'rsvp-9',
    title: 'Renewable Energy Conference',
    date: 'Apr 18, 2027',
    venue: 'Eco Park, Denver',
    host: 'Green Future Org',
    status: 'otp_required',
    invitedContact: 'sarah@example.com',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
    message: 'OTP verification sent to your registered email.',
  },
  {
    id: 'rsvp-10',
    title: 'E-commerce Leadership Retreat',
    date: 'May 5, 2027',
    venue: 'Mountain Resort, Aspen',
    host: 'Retail Leaders Council',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=85',
    message: 'You are on the confirmed guest list.',
  },
  {
    id: 'rsvp-11',
    title: 'SaaS Connect Dinner',
    date: 'May 20, 2027',
    venue: 'Sky Lounge, San Francisco',
    host: 'SaaS Weekly',
    status: 'mismatch',
    invitedContact: 'no match',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85',
    message: 'Your verified contact does not match the guest list.',
  },
  {
    id: 'rsvp-12',
    title: 'Crypto Investors Meetup',
    date: 'Jun 8, 2027',
    venue: 'Crypto Hub, Miami',
    host: 'Blockchain Network',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=85',
    message: 'Ready to confirm.',
  },
  {
    id: 'rsvp-13',
    title: 'EdTech Innovators Forum',
    date: 'Jun 22, 2027',
    venue: 'University Hall, Chicago',
    host: 'EdTech Consortium',
    status: 'otp_required',
    invitedContact: 'michael@example.com',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85',
    message: 'OTP verification required.',
  },
  {
    id: 'rsvp-14',
    title: 'Real Estate Summit',
    date: 'Jul 10, 2027',
    venue: 'Grand Hotel, Las Vegas',
    host: 'Property Leaders',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85',
    message: 'Guest list match confirmed.',
  },
  {
    id: 'rsvp-15',
    title: 'Cybersecurity Briefing',
    date: 'Jul 25, 2027',
    venue: 'Secure Center, DC',
    host: 'Cyber Defense Alliance',
    status: 'mismatch',
    invitedContact: 'no access',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85',
    message: 'Please contact support to resolve invitation status.',
  },
  {
    id: 'rsvp-16',
    title: 'Marketing Automation Workshop',
    date: 'Aug 12, 2027',
    venue: 'Tech Space, Austin',
    host: 'Marketing Pros',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=85',
    message: 'Your RSVP is ready.',
  },
  {
    id: 'rsvp-17',
    title: 'Space Tech Symposium',
    date: 'Sep 5, 2027',
    venue: 'Aero Center, Houston',
    host: 'Space Innovators',
    status: 'otp_required',
    invitedContact: 'jessica@example.com',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85',
    message: 'Please verify your contact email.',
  },
  {
    id: 'rsvp-18',
    title: 'Sustainable Agriculture Forum',
    date: 'Sep 20, 2027',
    venue: 'Agri Center, Des Moines',
    host: 'Future Farm',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
    message: 'Ready to confirm attendance.',
  },
  {
    id: 'rsvp-19',
    title: 'Gaming Industry Mixer',
    date: 'Oct 10, 2027',
    venue: 'Arcade Lounge, LA',
    host: 'Game Devs United',
    status: 'mismatch',
    invitedContact: 'not on list',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=85',
    message: 'Contact does not match guest list.',
  },
  {
    id: 'rsvp-20',
    title: 'End of Year Gala',
    date: 'Dec 15, 2027',
    venue: 'The Crystal Ballroom, New York',
    host: 'EventGarde',
    status: 'ready',
    invitedContact: 'email matched',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85',
    message: 'Your verified email matches the host guest list.',
  },
];

export const getTopEvents = (): TopEvent[] => [
  { rank: 1, name: 'Global Tech Summit 2026', category: 'B2B Conference', attendees: '12.5K', rating: 4.9, location: 'San Francisco, CA' },
  { rank: 2, name: 'Coachella Valley Music', category: 'B2C Festival', attendees: '11.2K', rating: 4.8, location: 'Indio, CA' },
  { rank: 3, name: 'Web Summit Lisbon', category: 'B2B Conference', attendees: '9.8K', rating: 4.7, location: 'Lisbon, Portugal' },
  { rank: 4, name: 'Design Leadership Forum', category: 'B2B Summit', attendees: '7.4K', rating: 4.9, location: 'New York, NY' },
];

export const getJoinedEvents = (): JoinedEvent[] => [
  {
    id: 'event-1',
    title: 'Global Tech Summit 2026',
    description: 'Oct 15-17, 2026 - Moscone Center, San Francisco',
    href: '#',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'event-2',
    title: 'Main Stage Festival',
    description: 'April 10-12, 2027 - Empire Polo Club, Indio',
    href: '#',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1000&q=85',
  },
];

export const getUpcomingEvents = (): UpcomingEvent[] => [
  {
    id: 1,
    title: 'Global Tech Summit 2026',
    description: 'B2B Conference',
    date: 'Oct 15-17, 2026',
    className: 'md:col-span-2',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
    longDescription: 'Join industry leaders at the Moscone Center to explore AI, machine learning, and cloud computing.',
    price: 4500,
    joinedCount: 12400,
    capacity: 12500,
  },
  {
    id: 2,
    title: 'Main Stage Festival',
    description: 'B2C Festival',
    date: 'April 10-12, 2027',
    className: 'col-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85',
    longDescription: 'Experience music, art, and production across a high-energy weekend.',
    price: 0,
    joinedCount: 8500,
    capacity: 15000,
  },
  {
    id: 3,
    title: 'Design Leadership Forum',
    description: 'B2B Summit',
    date: 'May 05-06, 2027',
    className: 'col-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85',
    longDescription: 'A two-day intensive forum for design leaders.',
    price: 2500,
    joinedCount: 7300,
    capacity: 7400,
  },
  {
    id: 4,
    title: 'Web Summit Lisbon',
    description: 'Tech Expo',
    date: 'Nov 01-04, 2026',
    className: 'col-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
    longDescription: 'The global gathering of founders and CEOs of technology companies.',
    price: 3200,
    joinedCount: 9500,
    capacity: 10000,
  },
  {
    id: 5,
    title: 'Underground Indie Showcase',
    description: 'B2C Concert',
    date: 'Dec 05, 2026',
    className: 'col-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85',
    longDescription: 'Discover the best emerging local talent.',
    price: 0,
    joinedCount: 300,
    capacity: 500,
  },
];
