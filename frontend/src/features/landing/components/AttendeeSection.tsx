import { motion } from 'framer-motion'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  HoverSliderTrigger,
  TextStaggerHover,
} from '@/components/ui/animated-slideshow'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

const attendeeSlides = [
  {
    id: 'discover',
    title: 'Discover',
    description:
      'Browse public events by category, date, and venue before deciding where to spend the night.',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    alt: 'A live event crowd with raised hands under stage lights',
  },
  {
    id: 'tickets',
    title: 'Tickets',
    description:
      'Keep RSVPs, QR tickets, payment status, and entry details connected to one attendee workspace.',
    imageUrl:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1600&q=80',
    alt: 'Guests gathered at a warmly lit event venue',
  },
  {
    id: 'vendors',
    title: 'Vendors',
    description:
      'Shortlist food, venues, audio, styling, and production partners while planning around the event.',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80',
    alt: 'Prepared catering dishes arranged for an event service',
  },
  {
    id: 'check-in',
    title: 'Check in',
    description:
      'Pull up the right ticket fast at the door so the arrival flow stays simple for attendees and staff.',
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
    alt: 'People celebrating together at a social event',
  },
  {
    id: 'plan',
    title: 'Plan ahead',
    description:
      'Save promising events, compare details, and come back to the plan without digging through messages.',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    alt: 'A team reviewing plans together around a shared workspace',
  },
]

function AttendeeAnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(115deg, rgba(110,65,226,0.18) 1px, transparent 1px), linear-gradient(25deg, rgba(184,115,46,0.12) 1px, transparent 1px)',
          backgroundSize: '88px 88px, 132px 132px',
        }}
        animate={{
          backgroundPosition: ['0px 0px, 0px 0px', '88px 88px, -132px 132px'],
        }}
        transition={{
          duration: 34,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      <motion.svg
        className="absolute left-1/2 top-1/2 h-[58rem] w-[92rem] -translate-x-1/2 -translate-y-1/2 opacity-25"
        viewBox="0 0 1472 928"
        fill="none"
      >
        <motion.path
          d="M-48 194C144 92 296 88 468 180C700 304 816 306 1048 184C1194 108 1330 100 1518 168"
          stroke="#6E41E2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="18 24"
          animate={{ strokeDashoffset: [0, -168] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        />
        <motion.path
          d="M-72 610C154 468 366 470 570 604C778 742 982 744 1212 590C1328 512 1438 484 1548 510"
          stroke="#3159B7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="12 28"
          animate={{ strokeDashoffset: [0, 160] }}
          transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
        />
        <motion.path
          d="M96 818C312 668 522 666 714 792C930 934 1120 928 1340 752"
          stroke="#B8732E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 22"
          animate={{ strokeDashoffset: [0, -142] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        />
      </motion.svg>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#faf9f5] to-transparent"
        animate={{ opacity: [0.9, 0.65, 0.9] }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  )
}

export function AttendeeSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#faf9f5] py-20 text-[#3d3929] lg:py-24">
      <AttendeeAnimatedBackground />
      <HoverSlider className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <h2 className="max-w-3xl text-3xl leading-[1.05] tracking-normal text-[#2f2b1f] sm:text-4xl lg:text-5xl">
            Move from discovery to the door.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[#625d50] sm:text-lg">
            EventGarde gives attendees a practical workspace for finding events,
            managing tickets, saving vendors, and showing up ready.
          </p>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-2"
          >
            {attendeeSlides.map((slide, index) => (
              <HoverSliderTrigger
                key={slide.id}
                index={index}
                aria-label={`${slide.title}: ${slide.description}`}
                className="group w-full rounded-xl border border-transparent p-4 transition duration-300 hover:border-[#e4ddce] hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6E41E2] data-[active=true]:border-[#6E41E2]/20 data-[active=true]:bg-white data-[active=true]:shadow-soft"
              >
                <TextStaggerHover
                  index={index}
                  text={slide.title}
                  className="block text-3xl font-extrabold uppercase leading-none tracking-normal text-[#3d3929] sm:text-4xl lg:text-5xl"
                />
                <span className="mt-3 block max-w-xl text-sm leading-6 text-[#625d50] sm:text-base">
                  {slide.description}
                </span>
              </HoverSliderTrigger>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <HoverSliderImageWrap className="aspect-[4/3] rounded-xl border border-[#e4ddce] bg-white shadow-soft-lg">
              {attendeeSlides.map((slide, index) => (
                <div key={slide.id}>
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
          </motion.div>
        </div>
      </HoverSlider>
    </section>
  )
}
