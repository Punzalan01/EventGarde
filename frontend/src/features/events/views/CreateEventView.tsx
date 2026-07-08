import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '@/shared/hooks/useAuth'

export function CreateEventView() {
  const {
    defaultWorkspace,
    memberships,
    isAuthenticated,
    isLoading,
  } = useAuth()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
        Checking workspace access...
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
        <Link className="font-semibold text-[#6E41E2]" to="/login">
          Log in before creating an event
        </Link>
      </main>
    )
  }

  const membership = memberships.find((item) => item.workspace_id === defaultWorkspace?.id)
  const canCreateEvent =
    defaultWorkspace?.workspace_type === 'business'
    && defaultWorkspace.tier !== 'free'
    && defaultWorkspace.verification_status === 'verified'
    && defaultWorkspace.subscription_status === 'active'
    && ['super_admin', 'admin'].includes(membership?.role ?? '')

  if (!canCreateEvent) {
    return (
      <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
        <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <ShieldAlert className="h-8 w-8 text-[#6E41E2]" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-extrabold">Event creation is locked</h1>
          <p className="mt-3 text-sm leading-6 text-[#4B5563]">
            Personal Workspaces can browse events, buy tickets, RSVP, and use the marketplace for personal use. Event creation requires a verified Business Workspace with an active subscription.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/pricing"
              className="rounded-full bg-[#6E41E2] px-5 py-2 text-sm font-bold text-white"
            >
              View workspace tiers
            </Link>
            <Link
              to="/workspace"
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-bold text-[#111827]"
            >
              Back to workspace
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAFAFC] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">Create event</h1>
        <p className="mt-3 text-sm text-[#4B5563]">
          Workspace access is verified. Event-builder persistence belongs to the event feature implementation.
        </p>
      </div>
    </main>
  )
}
