import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { navLinks } from '@/features/landing/data/landing.data'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrolledState = () => {
      const nextIsScrolled = window.scrollY > 12
      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled
          ? currentIsScrolled
          : nextIsScrolled,
      )
    }

    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrolledState)
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 overflow-hidden border-b backdrop-blur-md transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isScrolled
          ? 'border-[#A78BFA]/45 shadow-[0_18px_45px_rgba(76,43,168,0.34)]'
          : 'border-gray-100/60 shadow-none',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-white/80 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isScrolled ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5833B5]/95 via-[#6E41E2]/95 to-[#4C2BA8]/95 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isScrolled ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:py-4 lg:px-8">
        <motion.a
          href="/"
          aria-label="EventGarde home"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'flex min-w-max items-center gap-2 text-2xl font-extrabold tracking-tight transition-colors duration-500 ease-out sm:gap-3 sm:text-3xl',
            isScrolled ? 'text-white' : 'text-[#111827]',
          )}
        >
          <span
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 transition-colors duration-500 ease-out sm:h-14 sm:w-14',
              isScrolled ? 'ring-white/25' : 'ring-gray-100',
            )}
          >
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
              className={cn(
                'relative py-2 text-sm font-medium transition-all duration-500 ease-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 after:ease-out hover:font-bold hover:after:scale-x-100 focus-visible:font-bold focus-visible:outline-none focus-visible:after:scale-x-100',
                isScrolled
                  ? 'text-white after:bg-white after:shadow-[0_0_14px_rgba(255,255,255,0.5)] hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.32)] focus-visible:text-white focus-visible:drop-shadow-[0_0_10px_rgba(255,255,255,0.32)]'
                  : 'text-[#4B5563] after:bg-[#6E41E2] after:shadow-[0_0_12px_rgba(110,65,226,0.65)] hover:text-[#6E41E2] hover:drop-shadow-[0_0_10px_rgba(110,65,226,0.45)] focus-visible:text-[#6E41E2] focus-visible:drop-shadow-[0_0_10px_rgba(110,65,226,0.45)]',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            data-shine={isScrolled ? undefined : 'purple'}
            className={cn(
              'landing-shine-button hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_10px_24px_rgba(76,43,168,0.18)] ring-1 transition-all duration-500 ease-out hover:shadow-[0_14px_30px_rgba(76,43,168,0.26)] sm:inline-flex',
              isScrolled
                ? 'bg-white/10 text-white/85 ring-white/15 hover:bg-white/20 hover:text-white'
                : 'bg-white/85 text-[#4B5563] ring-[#6E41E2]/10 hover:bg-[#F0EBFF] hover:text-[#6E41E2]',
            )}
          >
            Log In
          </a>
          <a
            href="/register"
            data-shine={isScrolled ? 'purple' : undefined}
            className={cn(
              'landing-shine-button rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_12px_28px_rgba(76,43,168,0.22)] transition-all duration-500 ease-out hover:shadow-[0_16px_34px_rgba(76,43,168,0.3)] sm:px-5',
              isScrolled
                ? 'bg-white text-[#5833B5] shadow-[0_12px_28px_rgba(17,24,39,0.18)] hover:bg-[#F0EBFF]'
                : 'bg-[#6E41E2] text-white hover:bg-[#5833B5]',
            )}
          >
            Create Free Account
          </a>
        </div>
      </div>
    </nav>
  )
}
