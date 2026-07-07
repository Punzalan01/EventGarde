import { TestimonialSection } from '@/components/ui/testimonials'
import { testimonialsData } from '@/features/landing/data/landing.data'

export function TestimonialsSection() {
  return (
    <TestimonialSection
      title="Trusted by organizers, vendors, and guests"
      subtitle="EventGarde keeps every part of the event lifecycle connected, from first discovery to final check-in."
      testimonials={testimonialsData}
    />
  )
}
