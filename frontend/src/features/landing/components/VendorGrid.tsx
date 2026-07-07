import { motion } from 'framer-motion'
import { vendorCards } from '@/features/landing/data/landing.data'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

export function VendorGrid() {
  return (
    <section className="bg-[#F5FAFF] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Connect with top-tier vendors
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#4B5563]">
            Browse, compare, and book trusted service providers for your next
            event — all within the EventGarde ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {vendorCards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                variants={cardAnim}
                className="group rounded-xl border border-[#DCEBFA] bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="mb-4 grid grid-cols-[3.25rem_1fr] items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-[#111827]">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-[#4B5563]">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
