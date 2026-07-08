import { Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail, User } from 'lucide-react'
import { useRegisterViewModel } from '@/features/auth/viewmodels/useRegisterViewModel'

export function RegisterForm() {
  const {
    form,
    showPassword,
    isLoading,
    isGoogleLoading,
    status,
    updateField,
    togglePasswordVisibility,
    submitRegistration,
    registerWithGoogle,
  } = useRegisterViewModel()

  return (
    <div className="mx-auto w-full max-w-[520px]">
      {/* Card */}
      <div className="rounded-2xl border border-white/80 bg-white/95 p-6 shadow-[0_30px_70px_rgba(76,43,168,0.16)] backdrop-blur-md sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-gradient-to-br from-white to-white/40 p-2 shadow-[0_8px_16px_rgba(110,65,226,0.12)] backdrop-blur-md ring-1 ring-black/5">
            <img src="/logo.png" alt="EventGarde Logo" className="h-full w-full object-contain drop-shadow-sm" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6E41E2]">
            Create account
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
            Sign up for EventGarde
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#4B5563]">
            Join us to start managing events, bookings, and personal access effortlessly.
          </p>
        </div>

        <form className="mt-7 space-y-5" onSubmit={submitRegistration}>
          <label className="block">
            <span className="text-sm font-semibold text-[#111827]">Full name</span>
            <span className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#6E41E2] focus-within:ring-4 focus-within:ring-[#F0EBFF]">
              <User className="h-5 w-5 shrink-0 text-[#6E41E2]" aria-hidden="true" />
              <input
                value={form.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#111827]">Email address</span>
            <span className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#6E41E2] focus-within:ring-4 focus-within:ring-[#F0EBFF]">
              <Mail className="h-5 w-5 shrink-0 text-[#6E41E2]" aria-hidden="true" />
              <input
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#111827]">Password</span>
            <span className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#6E41E2] focus-within:ring-4 focus-within:ring-[#F0EBFF]">
              <LockKeyhole className="h-5 w-5 shrink-0 text-[#6E41E2]" aria-hidden="true" />
              <input
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#F0EBFF] hover:text-[#6E41E2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E41E2]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm leading-6 text-[#4B5563]">
            <input
              required
              checked={form.acceptedTerms}
              onChange={(event) => updateField('acceptedTerms', event.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6E41E2] focus:ring-[#6E41E2]"
            />
            I agree to EventGarde's terms and privacy policy.
          </label>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="landing-shine-button flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6E41E2] px-5 text-sm font-bold text-white shadow-[0_18px_34px_rgba(110,65,226,0.28)] transition hover:bg-[#5833B5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C4B5FD] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={registerWithGoogle}
            disabled={isLoading || isGoogleLoading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-5 text-sm font-bold text-[#111827] shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F0EBFF] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" aria-hidden="true" />
            ) : (
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Sign up with Google
          </button>
        </div>

        {status && (
          <p className="mt-5 rounded-xl bg-[#F0EBFF] px-4 py-3 text-sm font-medium text-[#5833B5]">
            {status}
          </p>
        )}

        <p className="mt-7 text-center text-sm text-[#4B5563]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#6E41E2] hover:text-[#5833B5]">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <Link
          to="/"
          className="text-sm text-[#6B7280] transition hover:text-[#6E41E2]"
        >
          Return to previous page
        </Link>
      </div>
    </div>
  )
}
