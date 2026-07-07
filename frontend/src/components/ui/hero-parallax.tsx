import React from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'

export interface HeroParallaxProduct {
  title: string
  link: string
  thumbnail: string
}

export interface HeroParallaxProps {
  products: HeroParallaxProduct[]
  eyebrow?: string
  title?: string
  highlightedTitle?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

const heroTextMotion: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
}

export function HeroParallax({
  products,
  eyebrow,
  title = 'Experience events beautifully.',
  highlightedTitle = 'Host them flawlessly.',
  description = 'Discover live experiences, manage ticketing, coordinate vendors, and run verified event operations from one polished workspace.',
  primaryAction = { label: 'Browse Events', href: '/events' },
  secondaryAction = { label: 'Become an Organizer', href: '/pricing' },
}: HeroParallaxProps) {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [14, 0]),
    springConfig,
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.35, 1]),
    springConfig,
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [16, 0]),
    springConfig,
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-560, 360]),
    springConfig,
  )

  return (
    <section
      ref={ref}
      className="relative flex h-[240vh] flex-col overflow-hidden bg-[#FBFBFD] pt-28 antialiased [perspective:1000px] [transform-style:preserve-3d] lg:pt-32"
    >
      <Header
        eyebrow={eyebrow}
        title={title}
        highlightedTitle={highlightedTitle}
        description={description}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        aria-label="EventGarde event showcase"
      >
        <motion.div className="mb-8 flex flex-row-reverse gap-5 md:mb-12 md:gap-10 lg:gap-16">
          {firstRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
        <motion.div className="mb-8 flex gap-5 md:mb-12 md:gap-10 lg:gap-16">
          {secondRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-5 md:gap-10 lg:gap-16">
          {thirdRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export function Header({
  eyebrow,
  title,
  highlightedTitle,
  description,
  primaryAction,
  secondaryAction,
}: Omit<HeroParallaxProps, 'products'>) {
  return (
    <div className="relative left-0 top-0 z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-8 md:pb-24 lg:px-8">
      {eyebrow ? (
        <span className="mb-6 inline-flex rounded-full border border-[#D7CEF9] bg-white px-4 py-1.5 text-sm font-semibold text-[#5833B5] shadow-sm">
          {eyebrow}
        </span>
      ) : null}
      <motion.h1
        variants={heroTextMotion}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className="max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl md:text-7xl"
      >
        {title}{' '}
        <span className="text-[#6E41E2]">{highlightedTitle}</span>
      </motion.h1>
      <motion.p
        variants={heroTextMotion}
        custom={0.12}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className="mt-7 max-w-2xl text-base leading-8 text-[#4B5563] md:text-xl"
      >
        {description}
      </motion.p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={primaryAction?.href}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#6E41E2] px-7 py-3 text-base font-semibold text-white shadow-[0_12px_28px_rgba(110,65,226,0.24)] transition hover:bg-[#5833B5]"
        >
          {primaryAction?.label}
        </a>
        <a
          href={secondaryAction?.href}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D7CEF9] bg-white px-7 py-3 text-base font-semibold text-[#5833B5] transition hover:bg-[#F0EBFF]"
        >
          {secondaryAction?.label}
        </a>
      </div>
    </div>
  )
}

export function ProductCard({
  product,
  translate,
}: {
  product: HeroParallaxProduct
  translate: MotionValue<number>
}) {
  return (
    <motion.article
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product relative h-64 w-[20rem] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_18px_45px_rgba(17,24,39,0.16)] md:h-80 md:w-[26rem] lg:h-96 lg:w-[30rem]"
    >
      <a
        href={product.link}
        className="block h-full focus:outline-none focus:ring-4 focus:ring-[#6E41E2]/30"
        aria-label={product.title}
      >
        <img
          src={product.thumbnail}
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover/product:scale-105"
          alt={product.title}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-[#111827]/10 to-transparent opacity-70 transition group-hover/product:opacity-90" />
        <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold tracking-tight text-white opacity-0 transition group-hover/product:opacity-100">
          {product.title}
        </h2>
      </a>
    </motion.article>
  )
}
