import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import SplitText from '@/components/ui/SplitText'
import {
  vendorCards,
  type VendorCard,
} from '@/features/landing/data/landing.data'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const MARQUEE_BASE_DURATION = 25
const VENDOR_COPY_COUNT = 3
const hoverEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface MarqueeVendorCard {
  card: VendorCard
  key: string
}

function createHeadingVariants(shouldReduceMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: 'easeOut',
      },
    },
  }
}

function createStaticGridVariants(shouldReduceMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
      },
    },
  }
}

function createStaticCardRevealVariants(
  shouldReduceMotion: boolean,
): Variants {
  return {
    hidden: (direction = 1) => ({
      opacity: 0,
      x: direction * (shouldReduceMotion ? 28 : 64),
      scale: 0.96,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.65,
        ease: hoverEase,
      },
    },
  }
}

function createVendorCardHoverVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      y: shouldReduceMotion ? -4 : -8,
      scale: 1.03,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createVendorImageHoverVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      scale: shouldReduceMotion ? 1.06 : 1.1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createVendorPurpleOverlayVariants(): Variants {
  return {
    rest: {
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      opacity: 0.78,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createVendorContentVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      y: shouldReduceMotion ? -3 : -6,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createVendorDescriptionVariants(shouldReduceMotion: boolean): Variants {
  return {
    rest: {
      opacity: 0,
      y: shouldReduceMotion ? 6 : 12,
      maxHeight: 0,
      marginTop: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    hover: {
      opacity: 1,
      y: 0,
      maxHeight: 140,
      marginTop: 8,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
}

function createContinuousVendorCards(): MarqueeVendorCard[] {
  return Array.from({ length: VENDOR_COPY_COUNT }, (_, copyIndex) =>
    vendorCards.map((card) => ({
      card,
      key: `${copyIndex}-${card.title}`,
    })),
  ).flat()
}

function StaticVendorCards({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean
}) {
  const staticGridVariants = createStaticGridVariants(shouldReduceMotion)
  const staticCardRevealVariants =
    createStaticCardRevealVariants(shouldReduceMotion)
  const cardHoverVariants = createVendorCardHoverVariants(shouldReduceMotion)
  const imageHoverVariants = createVendorImageHoverVariants(shouldReduceMotion)
  const purpleOverlayVariants = createVendorPurpleOverlayVariants()
  const contentVariants = createVendorContentVariants(shouldReduceMotion)
  const descriptionVariants =
    createVendorDescriptionVariants(shouldReduceMotion)

  return (
    <motion.div
      variants={staticGridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3 lg:px-8"
    >
      {vendorCards.map((card, index) => (
        <motion.article
          key={card.title}
          custom={index % 2 === 0 ? -1 : 1}
          variants={staticCardRevealVariants}
          className="relative min-h-[25rem] sm:min-h-[28rem]"
        >
          <motion.div
            variants={cardHoverVariants}
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="vendor-gradient-border will-change-transform-filter absolute inset-0 overflow-hidden rounded-xl bg-[#111827] shadow-[0_24px_60px_-30px_rgba(17,24,39,0.5)]"
          >
            <motion.img
              src={card.imageUrl}
              alt={card.imageAlt}
              variants={imageHoverVariants}
              className="absolute inset-0 h-full w-full origin-center object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
            <motion.div
              variants={purpleOverlayVariants}
              className="absolute inset-0 bg-gradient-to-t from-[#6E41E2]/85 via-[#6E41E2]/35 to-transparent mix-blend-screen"
            />
            <motion.div
              variants={contentVariants}
              className="absolute inset-x-4 bottom-4 z-20 rounded-lg border border-white/20 bg-[#111827]/25 p-4 text-white shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                {card.title}
              </h3>
              <motion.p
                variants={descriptionVariants}
                className="overflow-hidden text-sm leading-6 text-white/90"
              >
                {card.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  )
}

export function VendorGrid() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [hoveredCardKey, setHoveredCardKey] = useState<string | null>(null)
  const [entryComplete, setEntryComplete] = useState(false)
  const headingVariants = createHeadingVariants(Boolean(shouldReduceMotion))
  const continuousVendorCards = createContinuousVendorCards()
  const isAnyCardHovered = hoveredCardKey !== null
  const marqueeDuration = isAnyCardHovered
    ? MARQUEE_BASE_DURATION * 5
    : MARQUEE_BASE_DURATION
  const hoverTransitionDuration = isAnyCardHovered ? 0.25 : 0.4

  return (
    <section className="relative isolate overflow-hidden bg-[#FAFAFC] py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(110,65,226,0.16),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(88,51,181,0.12),transparent_32%),linear-gradient(135deg,#F6F5FA_0%,#FAFAFC_52%,#F0EBFF_100%)]" />
        <FlickeringGrid
          className="absolute inset-0 h-full w-full opacity-80"
          squareSize={4}
          gridGap={8}
          color="#6E41E2"
          maxOpacity={0.22}
          flickerChance={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFC]/78 via-[#FAFAFC]/54 to-[#FAFAFC]/82" />
      </div>
      <div className="relative z-10">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mb-12 max-w-3xl px-6 text-center lg:px-8"
        >
          <h2 className="text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            <SplitText
              tag="span"
              text="Connect with top-tier vendors"
              delay={18}
              duration={0.72}
              ease="power4.out"
              splitType="words, chars"
              from={{ opacity: 0, y: 38, filter: 'blur(10px)' }}
              to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              threshold={0.18}
              rootMargin="0px"
              textAlign="center"
            />
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#4B5563]">
            <SplitText
              tag="span"
              text="Browse, compare, and book trusted service providers for your next event - all within the EventGarde ecosystem."
              delay={34}
              duration={0.62}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 22 }}
              to={{ opacity: 1, y: 0, delay: 0.12 }}
              threshold={0.18}
              rootMargin="0px"
              textAlign="center"
            />
          </p>
        </motion.div>

        {shouldReduceMotion ? (
          <StaticVendorCards shouldReduceMotion={Boolean(shouldReduceMotion)} />
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => setEntryComplete(true)}
            className="relative z-10 w-full overflow-hidden py-5 pl-6 lg:pl-8"
          >
            <motion.div
              className="motion-marquee-container w-max select-none"
              animate={entryComplete ? { x: ['0%', '-33.333%'] } : { x: '0%' }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: marqueeDuration,
              }}
            >
              {continuousVendorCards.map(({ card, key }) => {
                const isSelfHovered = hoveredCardKey === key
                const isSibling = isAnyCardHovered && !isSelfHovered

                return (
                  <motion.article
                    key={key}
                    data-active={isSelfHovered ? 'true' : undefined}
                    onHoverStart={() => setHoveredCardKey(key)}
                    onHoverEnd={() => setHoveredCardKey(null)}
                    animate={{
                      scale: isSelfHovered ? 1.05 : 1,
                      opacity: isSibling ? 0.5 : 1,
                      filter: isSibling ? 'saturate(0.6)' : 'saturate(1)',
                    }}
                    transition={{
                      duration: hoverTransitionDuration,
                      ease: 'easeOut',
                    }}
                    className="vendor-gradient-border will-change-transform-filter relative mr-4 h-[25rem] w-[20rem] shrink-0 overflow-hidden rounded-xl bg-[#111827] shadow-[0_24px_60px_-30px_rgba(17,24,39,0.5)] sm:h-[28rem] sm:w-[22rem] lg:mr-5 lg:w-[24rem]"
                    style={{
                      zIndex: isSelfHovered ? 10 : 1,
                      transformOrigin: 'center',
                    }}
                  >
                    <motion.img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      animate={{ scale: isSelfHovered ? 1.1 : 1 }}
                      transition={{
                        duration: hoverTransitionDuration,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 h-full w-full origin-center object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                    <motion.div
                      animate={{ opacity: isSelfHovered ? 0.78 : 0 }}
                      transition={{
                        duration: hoverTransitionDuration,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-[#6E41E2]/85 via-[#6E41E2]/35 to-transparent mix-blend-screen"
                    />
                    <motion.div
                      animate={{ y: isSelfHovered ? -6 : 0 }}
                      transition={{
                        duration: hoverTransitionDuration,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-x-4 bottom-4 z-20 rounded-lg border border-white/20 bg-[#111827]/25 p-4 text-white shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
                    >
                      <h3 className="text-xl font-extrabold tracking-tight text-white">
                        {card.title}
                      </h3>
                      <motion.p
                        animate={{
                          opacity: isSelfHovered ? 1 : 0,
                          y: isSelfHovered ? 0 : 12,
                          maxHeight: isSelfHovered ? 140 : 0,
                          marginTop: isSelfHovered ? 8 : 0,
                        }}
                        transition={{
                          duration: hoverTransitionDuration,
                          ease: 'easeOut',
                        }}
                        className="overflow-hidden text-sm leading-6 text-white/90"
                      >
                        {card.description}
                      </motion.p>
                    </motion.div>
                  </motion.article>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
