import { motion, type Variants } from 'framer-motion'
import { Quote } from 'lucide-react'

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  imageSrc: string
  imageAlt?: string
}

export interface TestimonialSectionProps {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function TestimonialSection({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) {
  return (
    <section className="w-full bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <span className="inline-flex rounded-full bg-[#EBF5FF] px-4 py-1.5 text-sm font-semibold text-[#3159B7]">
          Social Proof
        </span>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#4B5563]">
          {subtitle}
        </p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.id}
              className="group relative h-[30rem] overflow-hidden rounded-lg bg-[#111827] text-left shadow-soft"
              variants={itemVariants}
            >
              <img
                src={testimonial.imageSrc}
                alt={testimonial.imageAlt ?? testimonial.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/45 to-[#111827]/5" />

              <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Quote
                  className="mb-4 h-8 w-8 text-white/45"
                  aria-hidden="true"
                />
                <blockquote className="text-base font-medium leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <div className="mt-5">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="mt-1 text-sm font-medium text-white/65">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
