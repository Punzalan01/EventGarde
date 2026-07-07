import { motion } from 'framer-motion'
import { Shield, CreditCard, ScanLine, LayoutDashboard } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

const features = [
  {
    icon: Shield,
    title: 'Verified organizer access',
    description:
      'Keep event creation behind identity checks and paid workspace permissions.',
  },
  {
    icon: CreditCard,
    title: 'Ticketing and payments',
    description:
      'Sell tickets, monitor payments, and keep revenue reporting close to event operations.',
  },
  {
    icon: ScanLine,
    title: 'Fast entry scanning',
    description:
      'Use QR scanning for event-day check-ins with live attendance visibility.',
  },
  {
    icon: LayoutDashboard,
    title: 'Vendor coordination',
    description:
      'Track booked partners, requests, and planning tasks from the same workspace.',
  },
]

const organizerPreviewRows = [
  {
    icon: Shield,
    title: 'Verification gate',
    detail: 'Organizer access checked before publishing',
  },
  {
    icon: CreditCard,
    title: 'Payment tracking',
    detail: 'Ticket revenue and failed payments visible',
  },
  {
    icon: ScanLine,
    title: 'Entry operations',
    detail: 'QR scans update attendance in real time',
  },
  {
    icon: LayoutDashboard,
    title: 'Vendor tasks',
    detail: 'Bookings and requests stay tied to the event',
  },
]

export function OrganizerSection() {
  return (
    <section className="bg-[#F7F4FF] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Enterprise power, verified trust.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5563]">
              Event creation is exclusive to verified organizers on a paid
              workspace subscription. You get ticketing, integrated payments,
              event-day scanning, and vendor coordination without scattering
              work across tools.
            </p>
            <ul className="mt-1 grid gap-3 md:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="grid grid-cols-[2.75rem_1fr] gap-4 rounded-lg border border-[#E3DAFF] bg-white/80 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF1E8]">
                    <feature.icon className="h-5 w-5 text-[#B8732E]" />
                  </span>
                  <span>
                    <span className="block text-base font-bold tracking-tight text-[#111827]">
                      {feature.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[#4B5563]">
                      {feature.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[#6E41E2] px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_0_rgba(110,65,226,0.3)] transition-all hover:bg-[#5833B5]"
              >
                See Organizer Pricing
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="rounded-xl border border-[#E3DAFF] bg-white p-5 shadow-soft">
              <div className="mb-5 grid gap-3 border-b border-gray-100 pb-4 sm:grid-cols-3">
                <div>
                  <div className="text-2xl font-extrabold leading-none text-[#6E41E2]">
                    128
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Tickets sold
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold leading-none text-[#111827]">
                    42
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Checked in
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold leading-none text-[#B8732E]">
                    PHP 24.5k
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Revenue
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {organizerPreviewRows.map((row) => {
                  const Icon = row.icon
                  return (
                    <div
                      key={row.title}
                      className="grid grid-cols-[2.75rem_1fr] items-center gap-3 rounded-lg border border-gray-100 bg-[#FBFBFD] p-3"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F0EBFF] text-[#6E41E2]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#111827]">
                          {row.title}
                        </div>
                        <div className="mt-0.5 text-sm leading-5 text-[#6B7280]">
                          {row.detail}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
