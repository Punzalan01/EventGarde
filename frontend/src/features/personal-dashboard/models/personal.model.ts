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

export interface DigitalTicket {
  id: string;
  event: string;
  date: string;
  type: string;
  qrCode: string;
}

export const getPublicEvents = (): PublicEvent[] => [
  { id: 'e1', title: 'Global FinTech Summit 2026', date: 'Oct 24, 2026', location: 'Metropolis Convention Center', price: '$499', image: 'bg-gradient-to-r from-blue-900 to-indigo-800', type: 'B2B', organizer: 'TechFinance Inc.' },
  { id: 'e2', title: 'Neon Nights Music Festival', date: 'Nov 02, 2026', location: 'Central Park', price: '$85', image: 'bg-gradient-to-br from-pink-500 to-violet-600', type: 'B2C', organizer: 'Live Nation' },
  { id: 'e3', title: 'Enterprise SaaS Expo', date: 'Nov 15, 2026', location: 'Silicon Valley Hub', price: 'Free', image: 'bg-gradient-to-r from-slate-800 to-slate-900', type: 'B2B', organizer: 'SaaS Weekly' },
  { id: 'e4', title: 'Underground Indie Showcase', date: 'Dec 05, 2026', location: 'The Basement Venue', price: '$25', image: 'bg-gradient-to-r from-emerald-600 to-teal-700', type: 'B2C', organizer: 'Local Arts Collective' },
  { id: 'e5', title: 'AI & Machine Learning Conference', date: 'Jan 10, 2027', location: 'Tech Hub Arena', price: '$299', image: 'bg-gradient-to-r from-purple-600 to-blue-500', type: 'B2B', organizer: 'FutureTech' },
  { id: 'e6', title: 'Food Truck Carnival', date: 'Jan 20, 2027', location: 'Downtown Square', price: '$15', image: 'bg-gradient-to-r from-yellow-400 to-orange-500', type: 'B2C', organizer: 'City Eats' },
  { id: 'e7', title: 'Marketing Innovators Summit', date: 'Feb 14, 2027', location: 'Grand Hotel Ballroom', price: '$199', image: 'bg-gradient-to-r from-rose-500 to-pink-600', type: 'B2B', organizer: 'Marketing Pro' },
  { id: 'e8', title: 'Retro Gaming Expo', date: 'Mar 05, 2027', location: 'Community Center', price: '$35', image: 'bg-gradient-to-br from-cyan-500 to-blue-600', type: 'B2C', organizer: 'Nostalgia Gamers' },
  { id: 'e9', title: 'Web3 & Crypto Symposium', date: 'Apr 12, 2027', location: 'Virtual / Blockchain Hub', price: '$599', image: 'bg-gradient-to-r from-indigo-500 to-purple-600', type: 'B2B', organizer: 'Crypto Leaders' },
  { id: 'e10', title: 'Summer Wellness Retreat', date: 'May 01, 2027', location: 'Mountain Resort', price: '$120', image: 'bg-gradient-to-r from-green-400 to-emerald-500', type: 'B2C', organizer: 'Mindful Living' },
  { id: 'e11', title: 'Startup Pitch Day', date: 'Jun 15, 2027', location: 'Innovation Lab', price: 'Free', image: 'bg-gradient-to-br from-slate-700 to-gray-900', type: 'B2B', organizer: 'Angel Network' },
  { id: 'e12', title: 'Cosplay Convention 2027', date: 'Jul 22, 2027', location: 'Mega Expo Center', price: '$65', image: 'bg-gradient-to-r from-fuchsia-600 to-pink-500', type: 'B2C', organizer: 'Anime World' },
  { id: 'e13', title: 'E-Commerce Growth Masterclass', date: 'Aug 10, 2027', location: 'Business District', price: '$150', image: 'bg-gradient-to-r from-blue-500 to-cyan-500', type: 'B2B', organizer: 'Retail Next' }
];

export const getDigitalTickets = (): DigitalTicket[] => [
  { id: 't1', event: 'Global FinTech Summit 2026', date: 'Oct 24, 2026', type: 'General Admission', qrCode: 'QR_DATA_1' }
];

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
}

export const getTopEvents = (): TopEvent[] => [
  { rank: 1, name: "Global Tech Summit 2026", category: "B2B Conference", attendees: "12.5K", rating: 4.9, location: "San Francisco, CA" },
  { rank: 2, name: "Coachella Valley Music", category: "B2C Festival", attendees: "11.2K", rating: 4.8, location: "Indio, CA" },
  { rank: 3, name: "Web Summit Lisbon", category: "B2B Conference", attendees: "9.8K", rating: 4.7, location: "Lisbon, Portugal" },
  { rank: 4, name: "Design Leadership Forum", category: "B2B Summit", attendees: "7.4K", rating: 4.9, location: "New York, NY" },
  { rank: 5, name: "Art Basel Miami Beach", category: "B2C Exhibition", attendees: "6.9K", rating: 4.8, location: "Miami, FL" },
  { rank: 6, name: "CES 2026 Las Vegas", category: "B2B Expo", attendees: "6.1K", rating: 4.6, location: "Las Vegas, NV" },
  { rank: 7, name: "SXSW Interactive 2026", category: "B2C Conference", attendees: "5.7K", rating: 4.8, location: "Austin, TX" },
  { rank: 8, name: "E3 Gaming Expo", category: "B2C Exhibition", attendees: "5.2K", rating: 4.5, location: "Los Angeles, CA" },
  { rank: 9, name: "Forbes Under 30 Summit", category: "B2B Summit", attendees: "4.9K", rating: 4.9, location: "Boston, MA" },
  { rank: 10, name: "Sundance Film Festival", category: "B2C Festival", attendees: "4.5K", rating: 4.7, location: "Park City, UT" },
  { rank: 11, name: "Mobile World Congress", category: "B2B Conference", attendees: "4.1K", rating: 4.6, location: "Barcelona, Spain" },
  { rank: 12, name: "Cannes Lions Festival", category: "B2B Exhibition", attendees: "3.8K", rating: 4.8, location: "Cannes, France" },
  { rank: 13, name: "Tomorrowland 2026", category: "B2C Festival", attendees: "3.5K", rating: 4.9, location: "Boom, Belgium" },
  { rank: 14, name: "Slush Helsinki", category: "B2B Summit", attendees: "3.2K", rating: 4.7, location: "Helsinki, Finland" },
  { rank: 15, name: "Comic-Con International", category: "B2C Exhibition", attendees: "3.0K", rating: 4.8, location: "San Diego, CA" },
];

export const getJoinedEvents = (): JoinedEvent[] => [
  {
    id: "event-1",
    title: "Global Tech Summit 2026",
    description: "Oct 15-17 • Moscone Center, San Francisco",
    href: "#",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000",
  },
  {
    id: "event-2",
    title: "Coachella Valley Music",
    description: "April 10-12 • Empire Polo Club, Indio",
    href: "#",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000",
  },
  {
    id: "event-3",
    title: "Web Summit Lisbon",
    description: "Nov 2-5 • Altice Arena, Lisbon",
    href: "#",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1000",
  },
  {
    id: "event-4",
    title: "Design Leadership Forum",
    description: "June 20 • Online Virtual",
    href: "#",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
  },
];

export const getUpcomingEvents = (): UpcomingEvent[] => [
  {
    id: 1,
    title: "Global Tech Summit 2026",
    description: "B2B Conference",
    date: "Oct 15-17",
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=3474&auto=format&fit=crop",
    longDescription: "Join industry leaders at the Moscone Center to explore the latest advancements in AI, machine learning, and cloud computing."
  },
  {
    id: 2,
    title: "Coachella Valley Music",
    description: "B2C Festival",
    date: "April 10-12",
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=3540&auto=format&fit=crop",
    longDescription: "Experience an unforgettable weekend of music, art, and culture in the heart of the desert."
  },
  {
    id: 3,
    title: "Web Summit Lisbon",
    description: "B2B Conference",
    date: "Nov 2-5",
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=3540&auto=format&fit=crop",
    longDescription: "Where the global tech community comes together. Networking, insights, and unparalleled opportunities."
  },
  {
    id: 4,
    title: "Design Leadership Forum",
    description: "B2B Summit",
    date: "June 20",
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3540&auto=format&fit=crop",
    longDescription: "An exclusive gathering for creative directors and design leaders to discuss the future of digital product design."
  },
];
