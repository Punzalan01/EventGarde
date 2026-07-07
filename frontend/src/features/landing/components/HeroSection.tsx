import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute top-[-10%] right-[-10%] h-72 w-72 rounded-full bg-[#F0EBFF] opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-72 w-72 rounded-full bg-[#FFF1E8] opacity-80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F0EBFF] px-4 py-1.5 text-sm font-semibold text-[#5833B5]"
            >
              <span aria-hidden="true">✨</span>
              The complete event ecosystem
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl leading-[1.1] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Experience events beautifully.{' '}
              <span className="text-[#6E41E2]">Host them flawlessly.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl text-lg leading-relaxed text-[#4B5563]"
            >
              EventGarde is the only platform where attendees discover their next
              favorite experience, and verified organizers get enterprise-grade
              tools to make it happen.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="/events"
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all',
                  'border-2 border-[#6E41E2] bg-white text-[#6E41E2] hover:bg-[#F0EBFF]',
                  'shadow-[0_4px_14px_0_rgba(110,65,226,0.15)]',
                )}
              >
                Browse Events
              </a>
              <a
                href="/pricing"
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all',
                  'bg-[#6E41E2] text-white hover:bg-[#5833B5]',
                  'shadow-[0_4px_14px_0_rgba(110,65,226,0.3)]',
                )}
              >
                Become an Organizer
              </a>
            </motion.div>
          </div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08),0_10px_15px_-5px_rgba(0,0,0,0.03)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <div className="h-8 w-8 rounded-full bg-[#6E41E2]" />
                  <div className="h-8 w-8 rounded-full bg-[#F0EBFF]" />
                  <div className="h-8 w-8 rounded-full bg-[#FFF1E8]" />
                </div>
                <div className="h-2 w-24 rounded-full bg-gray-200" />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 h-3 w-16 rounded-full bg-[#6E41E2]/20" />
                  <div className="h-6 w-full rounded-lg bg-[#6E41E2]/10" />
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 h-3 w-16 rounded-full bg-[#E29541]/20" />
                  <div className="h-6 w-full rounded-lg bg-[#E29541]/10" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 h-8 w-8 rounded-full bg-[#F0EBFF]" />
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-28 rounded-full bg-gray-200" />
                      <div className="h-2 w-20 rounded-full bg-gray-100" />
                    </div>
                  </div>
                  <div className="h-5 w-12 rounded-full bg-[#6E41E2]/10" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 h-8 w-8 rounded-full bg-[#FFF1E8]" />
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-28 rounded-full bg-gray-200" />
                      <div className="h-2 w-20 rounded-full bg-gray-100" />
                    </div>
                  </div>
                  <div className="h-5 w-12 rounded-full bg-[#E29541]/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
