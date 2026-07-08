import { Router } from 'express'
import { csrfProtection } from '../../shared/middleware/csrf.middleware'
import { requireAuth } from '../../shared/middleware/auth.middleware'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as authController from './auth.controller'

export const authRoutes = Router()

authRoutes.post('/register', asyncHandler(authController.register))
authRoutes.post('/login', asyncHandler(authController.login))
authRoutes.post('/otp/send', asyncHandler(authController.sendOtp))
authRoutes.post('/otp/verify', asyncHandler(authController.verifyOtp))
authRoutes.get('/google', asyncHandler(authController.google))
authRoutes.get('/callback', asyncHandler(authController.callback))
authRoutes.post('/refresh', csrfProtection, asyncHandler(authController.refresh))
authRoutes.post('/logout', csrfProtection, asyncHandler(authController.logout))
authRoutes.get('/me', requireAuth, asyncHandler(authController.me))
