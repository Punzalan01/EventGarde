import type { PendingRsvpStatus } from '../models/personal.model';

export const statusCopy: Record<PendingRsvpStatus, { label: string; className: string }> = {
  otp_required: {
    label: 'OTP required',
    className: 'border-amber-200 bg-amber-100 text-amber-900',
  },
  ready: {
    label: 'Ready to confirm',
    className: 'border-emerald-200 bg-emerald-100 text-emerald-900',
  },
  mismatch: {
    label: 'Contact mismatch',
    className: 'border-red-200 bg-red-100 text-red-900',
  },
};
