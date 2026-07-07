import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#6E41E2] py-24 lg:py-32">
      <div className="pointer-events-none absolute top-[-20%] right-[-10%] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-8"
      >
        <h2 className="text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to join EventGarde?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          Whether you want to discover unforgettable experiences or build and
          manage your own events, there is a path for you.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/register"
            className={cn(
              'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all',
              'bg-white text-[#6E41E2] hover:bg-gray-100',
              'shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]',
            )}
          >
            Join as Attendee (Free)
          </a>
          <a
            href="/verification"
            className={cn(
              'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all',
              'border-2 border-white bg-transparent text-white hover:bg-white/10',
            )}
          >
            Apply for Organizer Workspace
          </a>
        </div>
      </motion.div>
    </section>
  )
}
