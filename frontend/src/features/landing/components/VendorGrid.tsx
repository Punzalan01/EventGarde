import { motion } from 'framer-motion'
import { vendorCards } from '@/features/landing/data/landing.data'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

function createContainerReveal(shouldReduceMotion: boolean) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.14 },
    },
  }
}

function createCardReveal(shouldReduceMotion: boolean) {
  return {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.58,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }
}

export function VendorGrid() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const containerReveal = createContainerReveal(Boolean(shouldReduceMotion))
  const cardReveal = createCardReveal(Boolean(shouldReduceMotion))

  return (
    <section className="landing-mesh-section py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Connect with top-tier vendors
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#4B5563]">
            Browse, compare, and book trusted service providers for your next
            event - all within the EventGarde ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={containerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {vendorCards.map((card) => (
            <motion.article
              key={card.title}
              variants={cardReveal}
              className="vendor-gradient-border group relative min-h-[25rem] overflow-hidden rounded-xl bg-[#111827] shadow-[0_24px_60px_-30px_rgba(17,24,39,0.5)] transition-shadow duration-300 hover:shadow-[0_30px_75px_-24px_rgba(110,65,226,0.48)] sm:min-h-[28rem]"
            >
              <img
                src={card.imageUrl}
                alt={card.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
              <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/20 bg-white/10 p-4 text-white shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md transition duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
