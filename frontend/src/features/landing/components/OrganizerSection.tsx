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
    text: 'Event creation is strictly locked behind identity verification.',
  },
  {
    icon: CreditCard,
    text: 'Integrated ticketing and payment processing via PayMongo.',
  },
  {
    icon: ScanLine,
    text: 'On-site QR scanning for fast, secure event-day check-ins.',
  },
  {
    icon: LayoutDashboard,
    text: 'Vendor coordination tools to manage every partner seamlessly.',
  },
]

export function OrganizerSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:order-1"
          >
            <span className="inline-flex w-fit rounded-full bg-[#FFF1E8] px-4 py-1.5 text-sm font-semibold text-[#B57841]">
              For Verified Organizers
            </span>
            <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Enterprise power, verified trust.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-[#4B5563]">
              Event creation is exclusive to verified organizers on a paid
              workspace subscription. You get enterprise-grade ticketing,
              integrated payments, event-day scanning, and vendor coordination.
            </p>
            <ul className="mt-2 space-y-4">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E8]">
                    <f.icon className="h-5 w-5 text-[#E29541]" />
                  </span>
                  <span className="pt-1.5 text-base leading-relaxed text-[#4B5563]">
                    {f.text}
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
            className="relative mx-auto w-full max-w-md lg:order-2"
          >
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#6E41E2]" />
                <span className="text-xs font-medium text-[#6E41E2]">
                  Organizer Dashboard
                </span>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#F0EBFF] p-3 text-center">
                  <div className="mx-auto mb-1 h-6 w-6 rounded bg-[#6E41E2]" />
                  <div className="mx-auto h-2 w-12 rounded-full bg-[#6E41E2]/20" />
                </div>
                <div className="rounded-xl bg-[#FFF1E8] p-3 text-center">
                  <div className="mx-auto mb-1 h-6 w-6 rounded bg-[#E29541]" />
                  <div className="mx-auto h-2 w-12 rounded-full bg-[#E29541]/20" />
                </div>
                <div className="rounded-xl bg-[#EBF5FF] p-3 text-center">
                  <div className="mx-auto mb-1 h-6 w-6 rounded bg-[#4171E2]" />
                  <div className="mx-auto h-2 w-12 rounded-full bg-[#4171E2]/20" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-xs font-bold text-green-700">
                      128
                    </div>
                    <span className="text-sm font-medium text-[#4B5563]">
                      Tickets Sold
                    </span>
                  </div>
                  <div className="h-6 w-16 rounded bg-green-100" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0EBFF] text-xs font-bold text-[#6E41E2]">
                      42
                    </div>
                    <span className="text-sm font-medium text-[#4B5563]">
                      Checked In
                    </span>
                  </div>
                  <div className="h-6 w-16 rounded bg-[#F0EBFF]" />
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-r from-[#6E41E2] to-[#5833B5] p-4 text-white">
                <div className="mb-1 text-xs font-medium opacity-80">
                  Revenue
                </div>
                <div className="text-2xl font-extrabold tracking-tight">
                  PHP 24,580
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/20">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
