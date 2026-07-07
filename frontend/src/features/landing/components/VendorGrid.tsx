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
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-[#F0EBFF] px-4 py-1.5 text-sm font-semibold text-[#5833B5]">
            Marketplace
          </span>
          <h2 className="mt-4 text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
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
          className="grid gap-8 lg:grid-cols-3"
        >
          {vendorCards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                variants={cardAnim}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${card.bgColor}`}
                >
                  <Icon className={`h-7 w-7 ${card.iconColor}`} />
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-[#111827]">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-[#4B5563]">
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
