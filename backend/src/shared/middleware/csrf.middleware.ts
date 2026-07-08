import { randomBytes, timingSafeEqual } from 'crypto'
import type { NextFunction, Request, Response } from 'express'
import {
  CSRF_COOKIE_NAME,
  csrfCookieOptions,
} from '../../config/cookies'
import { AppError } from '../utils/AppError'

function tokensMatch(headerToken: string, cookieToken: string) {
  const headerBuffer = Buffer.from(headerToken)
  const cookieBuffer = Buffer.from(cookieToken)

  if (headerBuffer.length !== cookieBuffer.length) {
    return false
  }

  return timingSafeEqual(headerBuffer, cookieBuffer)
}

export function issueCsrfToken(_req: Request, res: Response) {
  const csrfToken = randomBytes(32).toString('hex')
  res.cookie(CSRF_COOKIE_NAME, csrfToken, csrfCookieOptions())
  res.status(200).json({ csrfToken })
}

export function csrfProtection(req: Request, _res: Response, next: NextFunction) {
  const cookieToken = req.cookies?.[CSRF_COOKIE_NAME]
  const headerToken = req.get('x-csrf-token')

  if (!cookieToken || !headerToken || !tokensMatch(headerToken, cookieToken)) {
    next(new AppError(403, 'CSRF token is missing or invalid.', 'CSRF_INVALID'))
    return
  }

  next()
}
