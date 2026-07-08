import { z } from 'zod'

const primaryIntentSchema = z.enum(['attendee', 'organizer', 'vendor']).default('attendee')

const roleToPrimaryIntent: Record<string, z.infer<typeof primaryIntentSchema>> = {
  Attendee: 'attendee',
  Organizer: 'organizer',
  Vendor: 'vendor',
  attendee: 'attendee',
  organizer: 'organizer',
  vendor: 'vendor',
}

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().trim().min(1).optional(),
  fullName: z.string().trim().min(1).optional(),
  phone: z.string().trim().min(3).optional(),
  primary_intent: primaryIntentSchema.optional(),
  role: z.string().optional(),
  acceptedTerms: z.boolean().optional(),
  terms_accepted: z.boolean().optional(),
}).transform((value) => {
  const acceptedTerms = value.acceptedTerms ?? value.terms_accepted ?? false
  const primaryIntent = value.primary_intent ?? (value.role ? roleToPrimaryIntent[value.role] : undefined) ?? 'attendee'

  if (!acceptedTerms) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        path: ['acceptedTerms'],
        message: 'Terms must be accepted before registration.',
      },
    ])
  }

  return {
    email: value.email,
    password: value.password,
    full_name: value.full_name ?? value.fullName ?? '',
    phone: value.phone,
    primary_intent: primaryIntent,
    terms_accepted_at: new Date().toISOString(),
  }
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
})

export const sendOtpSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().trim().min(3).optional(),
}).refine((value) => Boolean(value.email) !== Boolean(value.phone), {
  message: 'Provide exactly one of email or phone.',
  path: ['email'],
})

export const verifyOtpSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().trim().min(3).optional(),
  token: z.string().trim().min(4),
}).refine((value) => Boolean(value.email) !== Boolean(value.phone), {
  message: 'Provide exactly one of email or phone.',
  path: ['email'],
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type SendOtpInput = z.infer<typeof sendOtpSchema>
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>
