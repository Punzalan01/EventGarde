import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().min(1),
  FRONTEND_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  COOKIE_DOMAIN: z.string().min(1).optional(),
})

const parsedEnv = envSchema.superRefine((value, context) => {
  if (!value.SUPABASE_SERVICE_ROLE_KEY && !value.SUPABASE_SECRET_KEY) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['SUPABASE_SERVICE_ROLE_KEY'],
      message: 'SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is required.',
    })
  }
}).parse(process.env)

export const env = {
  ...parsedEnv,
  SUPABASE_SERVICE_KEY: parsedEnv.SUPABASE_SERVICE_ROLE_KEY ?? parsedEnv.SUPABASE_SECRET_KEY!,
  isProduction: parsedEnv.NODE_ENV === 'production',
  corsOrigins: parsedEnv.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean),
}
