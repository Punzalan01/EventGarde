import {
  UtensilsCrossed,
  Radio,
  Building2,
  type LucideIcon,
} from 'lucide-react'

export interface VendorCard {
  icon: LucideIcon
  title: string
  description: string
  bgColor: string
  iconColor: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

export const navLinks: NavLink[] = [
  { label: 'Discover Events', href: '/events' },
  { label: 'Vendor Marketplace', href: '/marketplace' },
  { label: 'Organizer Pricing', href: '/pricing' },
]

export const vendorCards: VendorCard[] = [
  {
    icon: UtensilsCrossed,
    title: 'Catering & Bar',
    description:
      'From gourmet food trucks to premium open bars. Browse verified vendors,compare menus, and book directly through the platform.',
    bgColor: 'bg-[#F0EBFF]',
    iconColor: 'text-[#6E41E2]',
  },
  {
    icon: Radio,
    title: 'Audio & Visuals',
    description:
      'Professional sound systems, lighting rigs, LED walls, and staging. Find AV teams that know how to set the perfect atmosphere.',
    bgColor: 'bg-[#FFF1E8]',
    iconColor: 'text-[#E29541]',
  },
  {
    icon: Building2,
    title: 'Venues & Spaces',
    description:
      'Intimate galleries, grand ballrooms, outdoor gardens — discover and book unique spaces that match your event vision.',
    bgColor: 'bg-[#EBF5FF]',
    iconColor: 'text-[#4171E2]',
  },
]

export const footerColumns: FooterColumn[] = [
  {
    heading: 'For Attendees',
    links: [
      { label: 'Discover Events', href: '/events' },
      { label: 'My Tickets', href: '/tickets' },
      { label: 'Vendor Marketplace', href: '/marketplace' },
      { label: 'Mobile App', href: '#' },
    ],
  },
  {
    heading: 'For Organizers',
    links: [
      { label: 'Create Event', href: '/organizer/create' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Verification', href: '/verification' },
      { label: 'Organizer Guide', href: '#' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'API Docs', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
]
