import { Link } from 'react-router-dom'
import { CalendarPlus, LogOut, ShieldCheck, Ticket } from 'lucide-react'
import { useAuth } from '@/shared/hooks/useAuth'

export function UserDashboardView() {
  const {
    defaultWorkspace,
    isAuthenticated,
    isLoading,
    logout,
    profile,
  } = useAuth()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
        Loading workspace...
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
        <Link className="font-semibold text-[#6E41E2]" to="/login">
          Log in to view your workspace
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E41E2]">
              Personal Workspace
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              {defaultWorkspace?.name ?? 'Personal Workspace'}
            </h1>
            <p className="mt-2 text-sm text-[#4B5563]">
              {profile?.full_name ? `Signed in as ${profile.full_name}` : 'Your free EventGarde workspace'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-[#111827]"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            to="/"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <Ticket className="h-5 w-5 text-[#6E41E2]" aria-hidden="true" />
            <h2 className="mt-4 font-bold">Browse events</h2>
            <p className="mt-2 text-sm text-[#4B5563]">
              Discover public events, buy tickets, and manage attendee access.
            </p>
          </Link>
          <Link
            to="/events/create"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <CalendarPlus className="h-5 w-5 text-[#6E41E2]" aria-hidden="true" />
            <h2 className="mt-4 font-bold">Create event</h2>
            <p className="mt-2 text-sm text-[#4B5563]">
              Requires a verified, active Business Workspace.
            </p>
          </Link>
          <Link
            to="/pricing"
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <ShieldCheck className="h-5 w-5 text-[#6E41E2]" aria-hidden="true" />
            <h2 className="mt-4 font-bold">Upgrade workspace</h2>
            <p className="mt-2 text-sm text-[#4B5563]">
              Verification and subscription unlock organizer tooling.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
