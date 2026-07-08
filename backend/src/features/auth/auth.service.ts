import type { Response } from 'express'
import type { Session, User } from '@supabase/supabase-js'
import { env } from '../../config/env'
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  accessCookieOptions,
  clearAuthCookies,
  refreshCookieOptions,
} from '../../config/cookies'
import { supabaseAdmin, supabaseAuth } from '../../config/supabase'
import { AppError } from '../../shared/utils/AppError'
import type {
  AuthMetadata,
  AuthResponse,
} from './auth.model'
import {
  getAuthMetadata,
  touchLastLogin,
  upsertVerifiedContact,
} from './auth.repository'
import type {
  LoginInput,
  RegisterInput,
  SendOtpInput,
  VerifyOtpInput,
} from './auth.validator'

function requireSession(session: Session | null, message = 'Authentication failed.') {
  if (!session?.access_token || !session.refresh_token || !session.user) {
    throw new AppError(401, message, 'AUTH_SESSION_MISSING')
  }

  return session
}

function setSessionCookies(res: Response, session: Session, sessionCookie = false) {
  res.cookie(
    ACCESS_COOKIE_NAME,
    session.access_token,
    accessCookieOptions(session.expires_in, sessionCookie),
  )
  res.cookie(
    REFRESH_COOKIE_NAME,
    session.refresh_token,
    refreshCookieOptions(sessionCookie),
  )
  if (sessionCookie) {
    res.cookie(SESSION_COOKIE_NAME, '1', {
      ...accessCookieOptions(undefined, true),
      httpOnly: true,
    })
  } else {
    res.clearCookie(SESSION_COOKIE_NAME, {
      ...accessCookieOptions(undefined, true),
      maxAge: undefined,
    })
  }
}

async function metadataForAuthenticatedUser(user: User): Promise<AuthMetadata> {
  await touchLastLogin(user.id)
  return getAuthMetadata(user)
}

export async function register(input: RegisterInput, res: Response): Promise<AuthResponse> {
  const { data, error } = await supabaseAuth.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.full_name,
        phone: input.phone,
        primary_intent: input.primary_intent,
        terms_accepted_at: input.terms_accepted_at,
      },
      emailRedirectTo: `${env.FRONTEND_URL}/login`,
    },
  })

  if (error) {
    throw new AppError(400, error.message, 'REGISTER_FAILED')
  }

  if (!data.session && data.user) {
    return {
      status: 'confirmation_required',
      message: 'Registration created. Please check your email to confirm your account.',
      ...(await getAuthMetadata(data.user)),
    }
  }

  const session = requireSession(data.session, 'Registration did not create a session.')
  setSessionCookies(res, session)

  return {
    status: 'authenticated',
    ...(await metadataForAuthenticatedUser(session.user)),
  }
}

export async function login(input: LoginInput, res: Response): Promise<AuthResponse> {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    throw new AppError(401, 'Invalid email or password.', 'LOGIN_FAILED')
  }

  const session = requireSession(data.session)
  const sessionCookie = input.rememberMe === false
  setSessionCookies(res, session, sessionCookie)

  return {
    status: 'authenticated',
    ...(await metadataForAuthenticatedUser(session.user)),
  }
}

export async function sendOtp(input: SendOtpInput): Promise<AuthResponse> {
  const { error } = input.email
    ? await supabaseAuth.auth.signInWithOtp({
      email: input.email,
      options: {
        shouldCreateUser: true,
      },
    })
    : await supabaseAuth.auth.signInWithOtp({
      phone: input.phone!,
      options: {
        shouldCreateUser: true,
      },
    })

  if (error) {
    throw new AppError(400, error.message, 'OTP_SEND_FAILED')
  }

  return {
    status: 'otp_sent',
    message: input.email
      ? 'Email OTP sent.'
      : 'SMS OTP requested. Supabase SMS provider configuration is required.',
    user: {
      id: '',
      email: input.email ?? null,
      phone: input.phone ?? null,
    },
    profile: null,
    default_workspace: null,
    memberships: [],
  }
}

export async function verifyOtp(input: VerifyOtpInput, res: Response): Promise<AuthResponse> {
  const { data, error } = input.email
    ? await supabaseAuth.auth.verifyOtp({
      email: input.email,
      token: input.token,
      type: 'email',
    })
    : await supabaseAuth.auth.verifyOtp({
      phone: input.phone!,
      token: input.token,
      type: 'sms',
    })

  if (error) {
    throw new AppError(401, error.message, 'OTP_VERIFY_FAILED')
  }

  const session = requireSession(data.session, 'OTP verification did not create a session.')
  setSessionCookies(res, session)

  if (input.email) {
    await upsertVerifiedContact(session.user.id, 'email', input.email, 'supabase_otp')
  }
  if (input.phone) {
    await upsertVerifiedContact(session.user.id, 'phone', input.phone, 'supabase_otp')
  }

  return {
    status: 'authenticated',
    ...(await metadataForAuthenticatedUser(session.user)),
  }
}

export async function getGoogleProviderUrl() {
  const { data, error } = await supabaseAuth.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${env.API_BASE_URL}/api/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error || !data.url) {
    throw new AppError(500, error?.message ?? 'Unable to start Google OAuth.', 'GOOGLE_OAUTH_FAILED')
  }

  return data.url
}

export async function completeOAuthCallback(code: string, res: Response): Promise<AuthMetadata> {
  const { data, error } = await supabaseAuth.auth.exchangeCodeForSession(code)

  if (error) {
    throw new AppError(401, error.message, 'OAUTH_CALLBACK_FAILED')
  }

  const session = requireSession(data.session, 'OAuth callback did not create a session.')
  setSessionCookies(res, session)
  return metadataForAuthenticatedUser(session.user)
}

export async function refreshSession(refreshToken: string | undefined, res: Response, isSessionCookie = false): Promise<AuthResponse> {
  if (!refreshToken) {
    throw new AppError(401, 'Refresh token is missing.', 'REFRESH_TOKEN_MISSING')
  }

  const { data, error } = await supabaseAuth.auth.refreshSession({
    refresh_token: refreshToken,
  })

  if (error) {
    clearAuthCookies(res)
    throw new AppError(401, error.message, 'REFRESH_FAILED')
  }

  const session = requireSession(data.session, 'Session refresh failed.')
  setSessionCookies(res, session, isSessionCookie)

  return {
    status: 'authenticated',
    ...(await metadataForAuthenticatedUser(session.user)),
  }
}

export async function logout(accessToken: string | undefined, res: Response) {
  if (accessToken) {
    await Promise.resolve(supabaseAdmin.auth.admin.signOut(accessToken)).catch(() => undefined)
  }

  clearAuthCookies(res)
}
