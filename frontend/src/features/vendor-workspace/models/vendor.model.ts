export interface VendorProfile {
  name: string;
  status: string;
  services: string[];
  baseRate: string;
}

export interface BookingRequest {
  id: string;
  event: string;
  client: string;
  date: string;
  value: string;
  status: string;
  selected: boolean;
}

export interface MessagePreview {
  id: string;
  sender: string;
  event: string;
  preview: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'client' | 'vendor';
  time: string;
}

export const getVendorProfile = (): VendorProfile => ({
  name: 'Lumina Catering',
  status: 'Accepting Requests',
  services: ['Catering', 'Bar', 'Staffing'],
  baseRate: '$1,200',
});

export const getBookingRequests = (): BookingRequest[] => [
  { id: 'b1', event: 'Tech Summit 2026', client: 'Alice Walker', date: 'Oct 24, 2026', value: '$4,500', status: 'Pending', selected: true },
  { id: 'b2', event: 'Corporate Gala', client: 'Bob Smith', date: 'Nov 12, 2026', value: '$8,200', status: 'Reviewing', selected: false },
  { id: 'b3', event: 'Startup Mixer', client: 'Sarah Connor', date: 'Dec 05, 2026', value: '$2,100', status: 'Approved', selected: false }
];

export const getMessages = (): MessagePreview[] => [
  { id: 'm1', sender: 'Alice Walker', event: 'Tech Summit 2026', preview: 'Can we adjust the menu for vegans?' },
  { id: 'm2', sender: 'Bob Smith', event: 'Corporate Gala', preview: 'Contract signed on our end.' }
];

export const getActiveChat = (): ChatMessage[] => [
  { id: 1, text: 'Hi, we are very interested in your catering packages.', sender: 'client', time: '10:00 AM' },
  { id: 2, text: 'Can we adjust the menu for vegans?', sender: 'client', time: '10:02 AM' },
  { id: 3, text: 'Absolutely! We can swap the main course for a plant-based option.', sender: 'vendor', time: '10:15 AM' }
];
