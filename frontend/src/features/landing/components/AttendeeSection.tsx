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

export function AttendeeSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-[#3d3929] lg:py-24">
      <img
        src="/images/background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
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
                className="group w-full rounded-xl border border-transparent bg-transparent p-4 transition duration-300 hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6E41E2] data-[active=true]:bg-transparent"
              >
                <TextStaggerHover
                  index={index}
                  text={slide.title}
                  className="block text-3xl font-extrabold uppercase leading-none tracking-normal text-[#111827] transition duration-300 group-hover:text-[#6E41E2] group-hover:drop-shadow-[0_0_16px_rgba(110,65,226,0.42)] group-data-[active=true]:text-[#6E41E2] group-data-[active=true]:drop-shadow-[0_0_16px_rgba(110,65,226,0.42)] sm:text-4xl lg:text-5xl"
                />
                <span className="mt-3 block max-w-xl text-sm leading-6 text-[#111827] transition duration-300 group-hover:text-[#5833B5] group-data-[active=true]:text-[#5833B5] sm:text-base">
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
