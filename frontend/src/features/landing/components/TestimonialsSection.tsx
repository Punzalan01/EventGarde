import { TestimonialSection } from '@/components/ui/testimonials'
import { testimonialsData } from '@/features/landing/data/landing.data'

export function TestimonialsSection() {
  return (
    <TestimonialSection
      title="Built around real event workflows"
      subtitle="From verified organizer setup to QR ticket scanning and vendor booking, EventGarde keeps each operational detail connected to the event."
      testimonials={testimonialsData}
    />
  )
}
