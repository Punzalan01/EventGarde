import { footerColumns } from '@/features/landing/data/landing.data'
import CountUp from '@/components/ui/CountUp'

const footerStats = [
  { value: 12000, suffix: '+', label: 'tickets tracked' },
  { value: 850, suffix: '+', label: 'verified vendors' },
  { value: 5200, suffix: '+', label: 'guest check-ins' },
]

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 grid gap-3 rounded-2xl border border-[#F0EBFF] bg-[#FAFAFC] p-3 shadow-[0_24px_60px_rgba(76,43,168,0.08)] sm:grid-cols-3">
          {footerStats.map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white px-5 py-6 text-center ring-1 ring-gray-100"
            >
              <p className="text-3xl font-extrabold tracking-tight text-[#6E41E2] sm:text-4xl">
                <CountUp
                  from={0}
                  to={stat.value}
                  separator=","
                  duration={3.8}
                  delay={index * 0.2}
                />
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-sm font-bold tracking-wide text-[#111827] uppercase">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#6E41E2]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <span className="text-2xl font-extrabold tracking-tight text-[#111827]">
            EventGarde
          </span>
          <p className="text-sm text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} EventGarde. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
