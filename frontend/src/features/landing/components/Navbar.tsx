import { cn } from '@/utils/cn'
import { navLinks } from '@/features/landing/data/landing.data'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="text-2xl font-extrabold tracking-tight text-[#111827]">
          EventGarde
        </a>

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
              'rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
              'text-[#4B5563] hover:text-[#6E41E2] hover:bg-[#F0EBFF]',
            )}
          >
            Log In
          </a>
          <a
            href="/register"
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
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
