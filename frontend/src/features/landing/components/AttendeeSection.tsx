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
    text: 'Public discovery page to browse and find your next favorite event.',
  },
  {
    icon: Ticket,
    text: 'Seamless RSVPs and instant digital ticketing — no hidden fees.',
  },
  {
    icon: ShoppingBag,
    text: 'Explore the vendor marketplace and book services directly.',
  },
]

export function AttendeeSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="text-xs font-medium text-green-600">
                  Discover
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EBFF]">
                    <div className="h-6 w-6 rounded bg-[#6E41E2]" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-32 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-24 rounded-full bg-gray-100" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-[#6E41E2]/10" />
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1E8]">
                    <div className="h-6 w-6 rounded bg-[#E29541]" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-28 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-20 rounded-full bg-gray-100" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-[#E29541]/10" />
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF5FF]">
                    <div className="h-6 w-6 rounded bg-[#4171E2]" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-36 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-20 rounded-full bg-gray-100" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-[#4171E2]/10" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex w-fit rounded-full bg-[#F0EBFF] px-4 py-1.5 text-sm font-semibold text-[#5833B5]">
              For the Attendees
            </span>
            <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Your personal event passport.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-[#4B5563]">
              Your Personal Workspace is completely free. Browse the public
              discovery page, RSVP to events, buy tickets instantly, and explore
              our vendor marketplace — all from one beautiful dashboard.
            </p>
            <ul className="mt-2 space-y-4">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0EBFF]">
                    <f.icon className="h-5 w-5 text-[#6E41E2]" />
                  </span>
                  <span className="pt-1.5 text-base leading-relaxed text-[#4B5563]">
                    {f.text}
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
