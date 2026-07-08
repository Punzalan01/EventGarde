export interface PublicEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
}

export interface DigitalTicket {
  id: string;
  event: string;
  date: string;
  type: string;
  qrCode: string;
}

export const getPublicEvents = (): PublicEvent[] => [
  { id: 'e1', title: 'Neon Nights Festival', date: 'Oct 24, 2026', location: 'Metropolis Arena', price: '$45', image: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
  { id: 'e2', title: 'Tech Startup Mixer', date: 'Nov 02, 2026', location: 'Innovation Hub', price: 'Free', image: 'bg-gradient-to-br from-emerald-400 to-teal-500' },
  { id: 'e3', title: 'Art & Wine Gala', date: 'Nov 15, 2026', location: 'Downtown Gallery', price: '$120', image: 'bg-gradient-to-br from-rose-400 to-red-500' },
  { id: 'e4', title: 'Indie Rock Showcase', date: 'Dec 05, 2026', location: 'The Underground', price: '$25', image: 'bg-gradient-to-br from-slate-700 to-slate-900' }
];

export const getDigitalTickets = (): DigitalTicket[] => [
  { id: 't1', event: 'Global Design Conference', date: 'Sept 10, 2026', type: 'VIP Pass', qrCode: 'QR_DATA_1' }
];
