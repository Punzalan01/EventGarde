import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { navLinks } from '@/features/landing/data/landing.data'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:py-4 lg:px-8">
        <motion.a
          href="/"
          aria-label="EventGarde home"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="flex min-w-max items-center gap-2 text-xl font-extrabold tracking-tight text-[#111827] sm:gap-3 sm:text-2xl"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-100 sm:h-12 sm:w-12">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
            />
          </span>
          EventGarde
        </motion.a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#6E41E2]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className={cn(
              'hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:inline-flex',
              'text-[#4B5563] hover:text-[#6E41E2] hover:bg-[#F0EBFF]',
            )}
          >
            Log In
          </a>
          <a
            href="/register"
            className={cn(
              'rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-5',
              'bg-[#6E41E2] text-white hover:bg-[#5833B5]',
            )}
          >
            Create Free Account
          </a>
        </div>
      </div>
    </nav>
  )
}
