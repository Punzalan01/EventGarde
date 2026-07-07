import {
  UtensilsCrossed,
  Radio,
  Building2,
  type LucideIcon,
} from 'lucide-react'
import type { HeroParallaxProduct } from '@/components/ui/hero-parallax'
import type { Testimonial } from '@/components/ui/testimonials'

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

export const eventShowcaseItems: HeroParallaxProduct[] = [
  {
    title: 'Rooftop Launch Night',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Main Stage Festival',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Private Dining Series',
    link: '/marketplace',
    thumbnail:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Gallery Reception',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Conference Check-In',
    link: '/pricing',
    thumbnail:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Outdoor Music Market',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Verified Vendor Setup',
    link: '/marketplace',
    thumbnail:
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Executive Summit',
    link: '/pricing',
    thumbnail:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'After-Hours Social',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Creator Workshop',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Immersive Brand Pop-Up',
    link: '/marketplace',
    thumbnail:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Ballroom Fundraiser',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Community Food Fair',
    link: '/marketplace',
    thumbnail:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Night Market Tickets',
    link: '/events',
    thumbnail:
      'https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Secure Event Entry',
    link: '/pricing',
    thumbnail:
      'https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80',
  },
]

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote:
      'Registration used to be the messiest part of our launch. EventGarde gave us one verified workspace for publishing, payment tracking, and guest updates.',
    name: 'Organizer workspace',
    role: 'Registration and event setup',
    imageSrc:
      'https://images.unsplash.com/photo-1760385737059-c65b583ec23e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Conference registration signage inside an event venue',
  },
  {
    id: 2,
    quote:
      'QR tickets made entry fast and easy to audit. Staff could scan guests at the door while organizers watched attendance update in real time.',
    name: 'Event-day check-in',
    role: 'Ticket scanning and attendance',
    imageSrc:
      'https://images.unsplash.com/photo-1662383729882-e03ce8e00887?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A phone displaying a QR ticket for event entry',
  },
  {
    id: 3,
    quote:
      'Vendor planning stayed connected to the event budget. We could compare service options, book food partners, and keep every request tied to the event.',
    name: 'Vendor marketplace',
    role: 'Food service and supplier booking',
    imageSrc:
      'https://images.unsplash.com/photo-1760561150700-b8af77e68edf?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Food trailer parked outdoors for event vendor service',
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
