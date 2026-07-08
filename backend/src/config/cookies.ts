import type { CookieOptions, Response } from 'express'
import { env } from './env'

export const ACCESS_COOKIE_NAME = 'eg_access_token'
export const REFRESH_COOKIE_NAME = 'eg_refresh_token'
export const CSRF_COOKIE_NAME = 'eg_csrf_token'

const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

function baseCookieOptions(path: string): CookieOptions {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'lax',
    path,
    domain: env.COOKIE_DOMAIN,
  }
}

export function accessCookieOptions(maxAgeSeconds?: number): CookieOptions {
  return {
    ...baseCookieOptions('/'),
    maxAge: (maxAgeSeconds ?? 60 * 60) * 1000,
  }
}

export function refreshCookieOptions(): CookieOptions {
  return {
    ...baseCookieOptions('/api/auth'),
    maxAge: thirtyDaysMs,
  }
}

export function csrfCookieOptions(): CookieOptions {
  return {
    httpOnly: false,
    secure: env.isProduction,
    sameSite: 'lax',
    path: '/',
    domain: env.COOKIE_DOMAIN,
    maxAge: 24 * 60 * 60 * 1000,
  }
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE_NAME, {
    ...baseCookieOptions('/'),
    maxAge: undefined,
  })
  res.clearCookie(REFRESH_COOKIE_NAME, {
    ...baseCookieOptions('/api/auth'),
    maxAge: undefined,
  })
}
