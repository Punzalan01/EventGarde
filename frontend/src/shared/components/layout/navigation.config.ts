import {
  DashboardIcon, CalendarIcon, PersonIcon, GearIcon, ChatBubbleIcon,
  LayersIcon, HomeIcon, MagnifyingGlassIcon,
  EnvelopeClosedIcon, LockClosedIcon, CubeIcon,
  IdCardIcon, BarChartIcon,
} from '@radix-ui/react-icons';
import { Ticket } from 'lucide-react';

export type RoleType = 'organizer' | 'personal' | 'vendor' | 'admin';

export interface NavItem {
  label?: string;
  path?: string;
  icon?: React.ElementType;
  isDivider?: boolean;
}

export const NavigationConfig: Record<RoleType, NavItem[]> = {
  organizer: [
    { label: 'Dashboard', path: '/organizer', icon: DashboardIcon },
    { label: 'Events', path: '/organizer/events', icon: CalendarIcon },
    { label: 'Guests & RSVPs', path: '/organizer/guests', icon: PersonIcon },
    { label: 'Ticketing', path: '/organizer/ticketing', icon: Ticket },
    { label: 'Marketplace', path: '/organizer/marketplace', icon: CubeIcon },
    { label: 'My Bookings', path: '/organizer/bookings', icon: LayersIcon },
    { label: 'Team', path: '/organizer/team', icon: LockClosedIcon },
    { label: 'Analytics', path: '/organizer/analytics', icon: BarChartIcon },
  ],
  personal: [
    { label: 'Dashboard', path: '/personal', icon: HomeIcon },
    { label: 'Ticket History', path: '/personal/tickets', icon: Ticket },
    { label: 'Mailbox', path: '/personal/rsvp', icon: EnvelopeClosedIcon },
    { label: 'My Calendar', path: '/personal/calendar', icon: CalendarIcon },
    { label: 'Discover', path: '/personal/discovery', icon: MagnifyingGlassIcon },
  ],
  vendor: [
    { label: 'Dashboard', path: '/vendor', icon: DashboardIcon },
    { label: 'Storefront', path: '/vendor/storefront', icon: CubeIcon },
    { label: 'Messages', path: '/vendor/messages', icon: ChatBubbleIcon },
    { label: 'Bookings', path: '/vendor/bookings', icon: LayersIcon },
    { label: 'Calendar', path: '/vendor/calendar', icon: CalendarIcon },
    { label: 'Payments', path: '/vendor/payments', icon: IdCardIcon },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: DashboardIcon },
    { label: 'Users', path: '/admin/users', icon: PersonIcon },
    { label: 'Settings', path: '/admin/settings', icon: GearIcon },
  ]
};
