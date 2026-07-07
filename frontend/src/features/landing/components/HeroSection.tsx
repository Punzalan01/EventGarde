import { HeroParallax } from '@/components/ui/hero-parallax'
import { eventShowcaseItems } from '@/features/landing/data/landing.data'

export function HeroSection() {
  return (
    <HeroParallax
      products={eventShowcaseItems}
      title="Experience events beautifully."
      highlightedTitle="Host them flawlessly."
      description="EventGarde brings discovery, ticketing, vendor booking, organizer verification, and event-day operations into one polished workspace."
      primaryAction={{ label: 'Browse Events', href: '/events' }}
      secondaryAction={{ label: 'Become an Organizer', href: '/pricing' }}
    />
  )
}
