import type { NextFunction, Request, Response } from 'express'
import { ACCESS_COOKIE_NAME } from '../../config/cookies'
import { supabaseAuth } from '../../config/supabase'
import { AppError } from '../utils/AppError'

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies?.[ACCESS_COOKIE_NAME]
    if (!accessToken) {
      throw new AppError(401, 'Authentication is required.', 'AUTH_REQUIRED')
    }

    const { data, error } = await supabaseAuth.auth.getUser(accessToken)
    if (error || !data.user) {
      throw new AppError(401, 'Session is invalid or expired.', 'AUTH_INVALID')
    }

    req.authUser = data.user
    next()
  } catch (error) {
    next(error)
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies?.[ACCESS_COOKIE_NAME]
    if (!accessToken) {
      next()
      return
    }

    const { data, error } = await supabaseAuth.auth.getUser(accessToken)
    if (!error && data.user) {
      req.authUser = data.user
    }

    next()
  } catch {
    next()
  }
}
