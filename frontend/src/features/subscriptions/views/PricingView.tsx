import PricingTable from '@/components/ui/modern-pricing-table'
import { Footer } from '@/features/landing/components/Footer'
import { Navbar } from '@/features/landing/components/Navbar'
import { usePricingViewModel } from '@/features/subscriptions/viewmodels/usePricingViewModel'

const accessSteps = [
  {
    title: 'Verify the workspace',
    description:
      'Tier 1 organizers submit government ID and selfie verification. Tier 2 and Tier 3 organizers submit DTI or SEC business documents.',
  },
  {
    title: 'Activate a paid tier',
    description:
      'Event creation remains locked until a Business Workspace subscription is active for the selected organizer tier.',
  },
  {
    title: 'Create and operate events',
    description:
      'Once unlocked, organizers can manage RSVP flows, ticketing, QR scanning, analytics, vendor booking, and team access.',
  },
]

export function PricingView() {
  const { plans } = usePricingViewModel()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAFAFC] pt-28">
        <section className="relative isolate overflow-hidden pb-10 pt-8 lg:pb-16 lg:pt-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(110,65,226,0.18),transparent_32%),radial-gradient(circle_at_88%_24%,rgba(255,241,232,0.76),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#FAFAFC_64%,#F0EBFF_100%)]"
          />
          <PricingTable plans={plans} />
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div>
                <h2 className="max-w-xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-4xl">
                  Organizer access is verified before event creation opens.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#4B5563]">
                  EventGarde keeps personal attendee accounts separate from
                  organizer workspaces. Paid tiers unlock the operational tools,
                  while verification protects guest data, ticketing, and vendor
                  booking workflows.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {accessSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] p-5 shadow-[0_18px_45px_-38px_rgba(17,24,39,0.42)]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6E41E2] text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold tracking-tight text-[#111827]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
