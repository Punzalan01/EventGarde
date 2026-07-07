import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { cn } from '@/utils/cn'

const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

const organizerPhotoCards = [
  {
    title: 'Verified organizer access',
    description:
      'Keep event creation behind identity checks and paid workspace permissions.',
    imageUrl:
      'https://images.unsplash.com/photo-1713816821443-7c348d0537a6?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'A black and white corporate event security and data setting',
    className: 'min-h-[23rem] lg:min-h-[30rem]',
  },
  {
    title: 'Ticketing and payments',
    description:
      'Sell tickets, monitor payments, and keep revenue reporting close to event operations.',
    imageUrl:
      'https://images.unsplash.com/photo-1770479086965-430e49d96e23?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'A large stadium filled with spectators watching an event',
    className: 'min-h-[21rem] lg:min-h-[24rem]',
  },
  {
    title: 'Fast entry scanning',
    description:
      'Use QR scanning for event-day check-ins with live attendance visibility.',
    imageUrl:
      'https://images.unsplash.com/photo-1761053703248-d578c6c09ab5?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Concert backstage technology and production controls',
    className: 'min-h-[21rem] lg:min-h-[24rem]',
  },
  {
    title: 'Vendor coordination',
    description:
      'Track booked partners, requests, and planning tasks from the same workspace.',
    imageUrl:
      'https://images.unsplash.com/photo-1727097467318-35fe841b0009?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Festival mainstage production lighting in a dark venue',
    className: 'min-h-[23rem] lg:min-h-[30rem]',
  },
]

const organizerPhotoColumns = [
  organizerPhotoCards.slice(0, 2),
  organizerPhotoCards.slice(2),
]

function createPhotoGridReveal(shouldReduceMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  }
}

function createPhotoCardReveal(shouldReduceMotion: boolean): Variants {
  return {
    hidden: (direction = 1) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction * 36,
      y: shouldReduceMotion ? 0 : 44,
      scale: shouldReduceMotion ? 1 : 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: premiumEase,
      },
    },
  }
}

function createCardHoverVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: '0 28px 70px -30px rgba(17,24,39,0.55)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -10,
      scale: shouldReduceMotion ? 1 : 1.04,
      boxShadow:
        '0 30px 55px -24px rgba(110,65,226,0.52), 0 20px 30px rgba(0,0,0,0.18)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createImageHoverVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.14,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createPurpleGlowVariants(): Variants {
  return {
    rest: {
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      opacity: 0.55,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createOverlayHoverVariants(): Variants {
  return {
    rest: {
      opacity: 0.72,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      opacity: 0.82,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createTextHoverVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -6,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

export function OrganizerSection() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const photoGridReveal = createPhotoGridReveal(Boolean(shouldReduceMotion))
  const photoCardReveal = createPhotoCardReveal(Boolean(shouldReduceMotion))
  const cardHoverVariants = createCardHoverVariants(Boolean(shouldReduceMotion))
  const imageHoverVariants = createImageHoverVariants(Boolean(shouldReduceMotion))
  const purpleGlowVariants = createPurpleGlowVariants()
  const overlayHoverVariants = createOverlayHoverVariants()
  const textHoverVariants = createTextHoverVariants(Boolean(shouldReduceMotion))

  return (
    <section className="organizer-gradient-section py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Enterprise power, verified trust.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#4B5563]">
            Event creation is exclusive to verified organizers on a paid
            workspace subscription. You get ticketing, integrated payments,
            event-day scanning, and vendor coordination without scattering
            work across tools.
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href="/pricing"
              className="landing-shine-button inline-flex items-center justify-center rounded-full bg-[#6E41E2] px-8 py-3.5 text-base font-semibold text-white shadow-[0_18px_38px_rgba(110,65,226,0.26)] transition-all hover:bg-[#5833B5] hover:shadow-[0_22px_46px_rgba(110,65,226,0.32)]"
            >
              See Organizer Pricing
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={photoGridReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-4 lg:grid-cols-[0.98fr_1.02fr] lg:gap-5"
        >
          {organizerPhotoColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={cn('grid gap-4 lg:gap-5', columnIndex === 1 && 'lg:pt-10')}
            >
              {column.map((card) => (
                <motion.article
                  key={card.title}
                  custom={columnIndex === 0 ? -1 : 1}
                  variants={photoCardReveal}
                  className={cn('relative', card.className)}
                >
                  <motion.div
                    variants={cardHoverVariants}
                    initial="rest"
                    animate="rest"
                    whileHover={shouldReduceMotion ? undefined : 'hover'}
                    className="vendor-gradient-border will-change-transform-filter absolute inset-0 overflow-hidden rounded-xl bg-[#111827] ring-1 ring-white/10"
                  >
                    <motion.img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      variants={imageHoverVariants}
                      className="absolute inset-0 h-full w-full origin-center object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <motion.div
                      variants={purpleGlowVariants}
                      className="absolute inset-0 bg-gradient-to-br from-[#6E41E2]/40 via-transparent to-[#4C2BA8]/70 mix-blend-screen"
                    />
                    <motion.div
                      variants={overlayHoverVariants}
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20"
                    />
                    <motion.div
                      variants={textHoverVariants}
                      className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6"
                    >
                      <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                        {card.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                        {card.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
