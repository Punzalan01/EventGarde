import type { Request, Response } from 'express'
import { env } from '../../config/env'
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
} from '../../config/cookies'
import { AppError } from '../../shared/utils/AppError'
import {
  getAuthMetadata,
} from './auth.repository'
import * as authService from './auth.service'
import {
  loginSchema,
  registerSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from './auth.validator'

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body)
  const result = await authService.register(input, res)
  res.status(result.status === 'confirmation_required' ? 202 : 201).json(result)
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body)
  const result = await authService.login(input, res)
  res.status(200).json(result)
}

export async function sendOtp(req: Request, res: Response) {
  const input = sendOtpSchema.parse(req.body)
  const result = await authService.sendOtp(input)
  res.status(202).json(result)
}

export async function verifyOtp(req: Request, res: Response) {
  const input = verifyOtpSchema.parse(req.body)
  const result = await authService.verifyOtp(input, res)
  res.status(200).json(result)
}

export async function google(_req: Request, res: Response) {
  const providerUrl = await authService.getGoogleProviderUrl()
  res.redirect(providerUrl)
}

export async function callback(req: Request, res: Response) {
  const code = typeof req.query.code === 'string' ? req.query.code : undefined
  if (!code) {
    res.redirect(`${env.FRONTEND_URL}/login?auth_error=missing_oauth_code`)
    return
  }

  try {
    await authService.completeOAuthCallback(code, res)
    res.redirect(`${env.FRONTEND_URL}/workspace`)
  } catch {
    res.redirect(`${env.FRONTEND_URL}/login?auth_error=oauth_callback_failed`)
  }
}

export async function refresh(req: Request, res: Response) {
  const result = await authService.refreshSession(req.cookies?.[REFRESH_COOKIE_NAME], res)
  res.status(200).json(result)
}

export async function logout(req: Request, res: Response) {
  await authService.logout(req.cookies?.[ACCESS_COOKIE_NAME], res)
  res.status(200).json({ status: 'ok' })
}

export async function me(req: Request, res: Response) {
  if (!req.authUser) {
    throw new AppError(401, 'Authentication is required.', 'AUTH_REQUIRED')
  }

  const result = await getAuthMetadata(req.authUser)
  res.status(200).json(result)
}
