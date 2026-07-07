import { motion } from 'framer-motion'
import { Search, Ticket, ShoppingBag } from 'lucide-react'

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
    icon: Search,
    title: 'Find relevant events',
    description:
      'Browse public listings by category, date, and venue so attendees can move from interest to RSVP quickly.',
  },
  {
    icon: Ticket,
    title: 'Keep tickets ready',
    description:
      'RSVPs, paid tickets, and QR entry details stay attached to the attendee workspace.',
  },
  {
    icon: ShoppingBag,
    title: 'Plan around vendors',
    description:
      'Discover food, AV, and venue services without leaving the EventGarde flow.',
  },
]

const attendeePreviewRows = [
  {
    icon: Search,
    title: 'Discovery feed',
    detail: 'Concerts, workshops, markets',
    accent: 'bg-[#F0EBFF] text-[#6E41E2]',
  },
  {
    icon: Ticket,
    title: 'Ticket wallet',
    detail: 'QR tickets and RSVP status',
    accent: 'bg-[#FFF1E8] text-[#B8732E]',
  },
  {
    icon: ShoppingBag,
    title: 'Vendor shortlist',
    detail: 'Saved food, AV, and venue services',
    accent: 'bg-[#EBF5FF] text-[#3159B7]',
  },
]

export function AttendeeSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-soft">
              <div className="mb-5 flex items-start justify-between gap-5 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[#111827]">
                    Attendee workspace
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    A practical home for discovery, RSVPs, tickets, and vendor
                    research.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold leading-none text-[#6E41E2]">
                    12
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Saved events
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {attendeePreviewRows.map((row) => {
                  const Icon = row.icon
                  return (
                    <div
                      key={row.title}
                      className="grid grid-cols-[2.75rem_1fr] items-center gap-3 rounded-lg border border-gray-100 bg-[#FBFBFD] p-3"
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${row.accent}`}
                      >
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Your personal event passport.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5563]">
              Your Personal Workspace is completely free. Browse the public
              discovery page, RSVP to events, buy tickets instantly, and explore
              the vendor marketplace from one dashboard.
            </p>
            <ul className="mt-1 space-y-3">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="grid grid-cols-[2.75rem_1fr] gap-4 rounded-lg border border-gray-100 bg-[#FBFBFD] p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F0EBFF]">
                    <feature.icon className="h-5 w-5 text-[#6E41E2]" />
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
