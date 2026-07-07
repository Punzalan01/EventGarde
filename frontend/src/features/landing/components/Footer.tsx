import { footerColumns } from '@/features/landing/data/landing.data'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
