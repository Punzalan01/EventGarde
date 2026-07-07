import { Navbar } from '@/features/landing/components/Navbar'
import { HeroSection } from '@/features/landing/components/HeroSection'
import { AttendeeSection } from '@/features/landing/components/AttendeeSection'
import { OrganizerSection } from '@/features/landing/components/OrganizerSection'
import { VendorGrid } from '@/features/landing/components/VendorGrid'
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection'
import { CTASection } from '@/features/landing/components/CTASection'
import { Footer } from '@/features/landing/components/Footer'

export function LandingPageView() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AttendeeSection />
        <OrganizerSection />
        <VendorGrid />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
