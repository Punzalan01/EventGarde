import { 
  LayoutDashboard, Calendar, Users, Settings, MessageSquare, Ticket, ShoppingBag, 
  Briefcase, FileText, Home, Compass, Info, Wallet, Mail, Shield, CheckCircle, 
  Bookmark, Store, Bell, User, Sparkles, BarChart3, CreditCard, LineChart, PieChart 
} from 'lucide-react';

export type RoleType = 'organizer' | 'personal' | 'vendor' | 'admin';

export interface NavItem {
  label?: string;
  path?: string;
  icon?: React.ElementType;
  isDivider?: boolean;
}

export const NavigationConfig: Record<RoleType, NavItem[]> = {
  organizer: [
    { label: 'Dashboard', path: '/organizer', icon: LayoutDashboard },
    { label: 'Events', path: '/organizer/events', icon: Calendar },
    { label: 'Guests & RSVPs', path: '/organizer/guests', icon: Users },
    { label: 'Ticketing', path: '/organizer/ticketing', icon: Ticket },
    { label: 'Marketplace', path: '/organizer/marketplace', icon: Store },
    { label: 'My Bookings', path: '/organizer/bookings', icon: Briefcase },
    { label: 'Team', path: '/organizer/team', icon: Shield },
    { label: 'Analytics', path: '/organizer/analytics', icon: LineChart },
  ],
  personal: [
    { label: 'Dashboard', path: '/personal', icon: Home },
    { label: 'Discover', path: '/personal/discovery', icon: Compass },
    { label: 'My Tickets', path: '/personal/tickets', icon: Wallet },
    { label: 'RSVPs', path: '/personal/rsvp', icon: Mail },
    { label: 'Saved', path: '/personal/saved', icon: Bookmark },
    { label: 'Vendors', path: '/personal/vendors', icon: Store },
  ],
  vendor: [
    { label: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
    { label: 'Storefront', path: '/vendor/storefront', icon: Store },
    { label: 'Messages', path: '/vendor/messages', icon: MessageSquare },
    { label: 'Bookings', path: '/vendor/bookings', icon: Briefcase },
    { label: 'Calendar', path: '/vendor/calendar', icon: Calendar },
    { label: 'Payments', path: '/vendor/payments', icon: CreditCard },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ]
};
