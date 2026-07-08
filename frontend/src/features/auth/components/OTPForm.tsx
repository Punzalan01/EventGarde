import { Loader2, Mail, ShieldCheck } from 'lucide-react'
import { useOTPViewModel } from '@/features/auth/viewmodels/useOTPViewModel'

export function OTPForm() {
  const {
    email,
    token,
    isSending,
    isVerifying,
    status,
    setEmail,
    setToken,
    sendOtp,
    verifyOtp,
  } = useOTPViewModel()

  return (
    <div className="mx-auto w-full max-w-[520px] rounded-2xl border border-white/80 bg-white/95 p-6 shadow-[0_30px_70px_rgba(76,43,168,0.16)] sm:p-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6E41E2]">
          Passwordless access
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
          Verify email OTP
        </h2>
      </div>

      <form className="mt-7 space-y-4" onSubmit={sendOtp}>
        <label className="block">
          <span className="text-sm font-semibold text-[#111827]">Email address</span>
          <span className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4">
            <Mail className="h-5 w-5 text-[#6E41E2]" aria-hidden="true" />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="you@example.com"
            />
          </span>
        </label>
        <button
          type="submit"
          disabled={isSending || isVerifying}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6E41E2] px-5 text-sm font-bold text-white disabled:opacity-70"
        >
          {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send OTP'}
        </button>
      </form>

      <form className="mt-6 space-y-4" onSubmit={verifyOtp}>
        <label className="block">
          <span className="text-sm font-semibold text-[#111827]">OTP code</span>
          <span className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4">
            <ShieldCheck className="h-5 w-5 text-[#6E41E2]" aria-hidden="true" />
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              required
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Enter code"
            />
          </span>
        </label>
        <button
          type="submit"
          disabled={isSending || isVerifying}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111827] px-5 text-sm font-bold text-white disabled:opacity-70"
        >
          {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verify OTP'}
        </button>
      </form>

      {status && (
        <p className="mt-5 rounded-xl bg-[#F0EBFF] px-4 py-3 text-sm font-medium text-[#5833B5]">
          {status}
        </p>
      )}
    </div>
  )
}
