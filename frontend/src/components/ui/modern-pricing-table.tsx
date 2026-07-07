import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utils/cn'

export interface Plan {
  title: string
  workspaceType: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  isFeatured?: boolean
}

interface PricingTableProps {
  plans: Plan[]
  title?: string
  description?: string
  currency?: string
}

const pesoFormatter = new Intl.NumberFormat('en-PH', {
  maximumFractionDigits: 0,
})

function AnimatedCharacter({
  character,
  index,
}: {
  character: string
  index: number
}) {
  return (
    <span className="relative inline-block min-w-[0.42ch] overflow-hidden text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${character}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.035,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="block"
        >
          {character}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ScrollingNumber({ value }: { value: number }) {
  const numberString = pesoFormatter.format(value)

  return (
    <span className="inline-flex items-center">
      {numberString.split('').map((character, index) => (
        <AnimatedCharacter
          key={`${value}-${index}-${character}`}
          character={character}
          index={index}
        />
      ))}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

export default function PricingTable({
  plans,
  title = 'Choose your organizer workspace',
  description = 'Event creation unlocks only after verification and an active Business Workspace subscription. Pick the tier that matches your event type, operating scale, and team needs.',
  currency = '₱',
}: PricingTableProps) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-8 lg:px-8">
      <motion.div
        className="mx-auto max-w-3xl space-y-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="space-y-4">
          <motion.h1
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-base leading-8 text-[#4B5563] sm:text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Tabs
            value={isYearly ? 'yearly' : 'monthly'}
            onValueChange={(value) => setIsYearly(value === 'yearly')}
          >
            <TabsList className="h-12 w-full">
              <TabsTrigger value="monthly" className="min-w-28">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="min-w-36 gap-2">
                Yearly
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan, index) => {
          const displayedMonthly = isYearly
            ? Math.round(plan.price.yearly / 12)
            : plan.price.monthly
          const yearlySavings = plan.price.monthly * 12 - plan.price.yearly

          return (
            <motion.article
              key={plan.title}
              variants={cardVariants}
              className="relative"
            >
              {plan.isFeatured ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="absolute -top-4 left-1/2 z-10 -translate-x-1/2"
                >
                  <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6E41E2] to-[#4C2BA8] px-4 py-2 text-sm font-bold text-white shadow-[0_18px_34px_rgba(110,65,226,0.28)]">
                    <Star className="size-3 fill-current" aria-hidden="true" />
                    Most Popular
                  </div>
                </motion.div>
              ) : null}

              <div
                className={cn(
                  'relative flex h-full flex-col rounded-xl border-2 p-6 transition-all duration-300 sm:p-8',
                  plan.isFeatured
                    ? 'border-[#6E41E2] bg-gradient-to-br from-[#F0EBFF] via-white to-[#FAFAFC] shadow-[0_28px_70px_-38px_rgba(76,43,168,0.68)]'
                    : 'border-gray-200 bg-white shadow-[0_20px_55px_-42px_rgba(17,24,39,0.45)]',
                )}
              >
                <div className="mb-8 space-y-4 text-center">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#6E41E2]">
                      {plan.workspaceType}
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827]">
                      {plan.title}
                    </h2>
                  </div>
                  <p className="min-h-[4.5rem] text-sm leading-6 text-[#6B7280]">
                    {plan.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-4xl font-extrabold tracking-tight text-[#111827]">
                      <span>{currency}</span>
                      <ScrollingNumber value={displayedMonthly} />
                      <span className="ml-1 text-base font-semibold text-[#6B7280]">
                        /month
                      </span>
                    </div>
                    <motion.div
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-6 flex-wrap items-center justify-center gap-2 text-sm text-[#6B7280]"
                    >
                      <span>
                        {isYearly ? 'billed yearly' : 'billed monthly'}
                      </span>
                      {isYearly ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700"
                        >
                          Save {currency}
                          {pesoFormatter.format(yearlySavings)}
                        </motion.span>
                      ) : null}
                    </motion.div>
                  </div>
                </div>

                <div className="mb-8 flex-1 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.6 + index * 0.1 + featureIndex * 0.05,
                      }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0EBFF] text-[#5833B5]">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-6 text-[#374151]">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Button
                    asChild
                    variant={plan.isFeatured ? 'default' : 'outline'}
                    size="lg"
                    className="landing-shine-button w-full"
                  >
                    <a href={plan.ctaHref}>{plan.ctaText}</a>
                  </Button>
                </motion.div>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </div>
  )
}
