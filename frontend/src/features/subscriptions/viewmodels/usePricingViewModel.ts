import type { Plan } from '@/components/ui/modern-pricing-table'

const organizerPlans: Plan[] = [
  {
    title: 'Starter',
    workspaceType: 'Mini-Workspace',
    price: {
      monthly: 1499,
      yearly: 14388,
    },
    description:
      'For independent coordinators and milestone hosts running private social events.',
    features: [
      'Private and unlisted events only',
      'Strict RSVP matching by verified email or mobile',
      'Up to 300 PAX per event',
      'Full access to browse and book marketplace vendors',
      'Optional customization add-ons for advanced layouts',
    ],
    ctaText: 'Start verification',
    ctaHref: '/register',
  },
  {
    title: 'Professional',
    workspaceType: 'Business Workspace',
    price: {
      monthly: 4999,
      yearly: 47988,
    },
    description:
      'For corporations, campuses, SMEs, and agencies that need public or internal events.',
    features: [
      'Internal or public Discovery Page listing option',
      'Custom registration and feedback forms',
      'Ticket tiers, attendee analytics, and revenue tracking',
      'Multi-user collaboration with up to 5 Admin seats',
      'Vendor inquiries, chat, booking requests, and payments',
    ],
    ctaText: 'Choose Professional',
    ctaHref: '/register',
    isFeatured: true,
  },
  {
    title: 'Enterprise',
    workspaceType: 'Scale Workspace',
    price: {
      monthly: 14999,
      yearly: 143988,
    },
    description:
      'For festivals, expos, trade fairs, and large public event operations.',
    features: [
      'Unlimited PAX capacity',
      'Global Discovery Page spotlight listing',
      'Public ticket sales through PayMongo',
      'Advanced RBAC and unlimited workspace seats',
      'Enterprise-scale ticketing, analytics, and QR scanning',
    ],
    ctaText: 'Plan Enterprise',
    ctaHref: '/register',
  },
]

export function usePricingViewModel() {
  return {
    plans: organizerPlans,
  }
}
