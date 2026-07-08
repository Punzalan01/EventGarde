import type { NextFunction, Request, Response } from 'express'
import {
  getWorkspaceAccess,
} from '../../features/auth/auth.repository'
import { AppError } from '../utils/AppError'

function readWorkspaceId(req: Request) {
  const fromParams = req.params.workspaceId ?? req.params.workspace_id
  const fromBody = req.body?.workspace_id ?? req.body?.workspaceId
  const fromQuery = req.query.workspace_id ?? req.query.workspaceId

  if (typeof fromParams === 'string') {
    return fromParams
  }
  if (typeof fromBody === 'string') {
    return fromBody
  }
  if (typeof fromQuery === 'string') {
    return fromQuery
  }

  return undefined
}

export async function requireWorkspaceAccess(req: Request, _res: Response, next: NextFunction) {
  try {
    if (!req.authUser) {
      throw new AppError(401, 'Authentication is required.', 'AUTH_REQUIRED')
    }

    const workspaceId = readWorkspaceId(req)
    if (!workspaceId) {
      throw new AppError(400, 'workspace_id is required.', 'WORKSPACE_ID_REQUIRED')
    }

    const { workspace, membership } = await getWorkspaceAccess(req.authUser.id, workspaceId)
    req.workspace = workspace
    req.workspaceMembership = membership
    next()
  } catch (error) {
    next(error)
  }
}

export function requireBusinessWorkspace(req: Request, _res: Response, next: NextFunction) {
  if (!req.workspace) {
    next(new AppError(500, 'Workspace context was not loaded.', 'WORKSPACE_CONTEXT_MISSING'))
    return
  }

  if (req.workspace.workspace_type !== 'business') {
    next(new AppError(403, 'Personal Workspaces cannot perform this action.', 'BUSINESS_WORKSPACE_REQUIRED'))
    return
  }

  next()
}

export function requireEventCreationAccess(req: Request, _res: Response, next: NextFunction) {
  if (!req.workspace || !req.workspaceMembership) {
    next(new AppError(500, 'Workspace access context was not loaded.', 'WORKSPACE_CONTEXT_MISSING'))
    return
  }

  const workspaceAllowsEvents =
    req.workspace.workspace_type === 'business'
    && req.workspace.tier !== 'free'
    && req.workspace.verification_status === 'verified'
    && req.workspace.subscription_status === 'active'

  const roleAllowsEvents = ['super_admin', 'admin'].includes(req.workspaceMembership.role)

  if (!workspaceAllowsEvents || !roleAllowsEvents) {
    next(new AppError(403, 'Event creation requires a verified, active Business Workspace and an admin role.', 'EVENT_CREATION_FORBIDDEN'))
    return
  }

  next()
}
