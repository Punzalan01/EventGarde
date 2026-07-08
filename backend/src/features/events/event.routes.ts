import { Router } from 'express'
import { csrfProtection } from '../../shared/middleware/csrf.middleware'
import { requireAuth } from '../../shared/middleware/auth.middleware'
import {
  requireEventCreationAccess,
  requireWorkspaceAccess,
} from '../../shared/middleware/workspace-access.middleware'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as eventController from './event.controller'

export const eventRoutes = Router()

eventRoutes.post(
  '/',
  csrfProtection,
  requireAuth,
  requireWorkspaceAccess,
  requireEventCreationAccess,
  asyncHandler(eventController.createEvent),
)
