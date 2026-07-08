import { supabaseAdmin } from '../../config/supabase'
import { AppError } from '../../shared/utils/AppError'
import type {
  AuthMetadata,
  UserProfile,
  Workspace,
  WorkspaceMembership,
} from './auth.model'
import { toSafeUser } from './auth.model'
import type { User } from '@supabase/supabase-js'

function normalizeContactValue(type: 'email' | 'phone', value: string) {
  if (type === 'email') {
    return value.trim().toLowerCase()
  }

  return value.replace(/\s+/g, '')
}

function assertNoDbError(error: unknown, message: string): asserts error is null {
  if (error) {
    throw new AppError(500, message, 'DATABASE_ERROR', error)
  }
}

export async function getAuthMetadata(user: User): Promise<AuthMetadata> {
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle<UserProfile>()

  assertNoDbError(profileError, 'Unable to load user profile.')

  let defaultWorkspace: Workspace | null = null
  if (profile?.default_workspace_id) {
    const { data, error } = await supabaseAdmin
      .from('workspaces')
      .select('*')
      .eq('id', profile.default_workspace_id)
      .maybeSingle<Workspace>()

    assertNoDbError(error, 'Unable to load default workspace.')
    defaultWorkspace = data ?? null
  }

  const { data: memberships, error: membershipsError } = await supabaseAdmin
    .from('workspace_memberships')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .returns<WorkspaceMembership[]>()

  assertNoDbError(membershipsError, 'Unable to load workspace memberships.')

  return {
    user: toSafeUser(user),
    profile: profile ?? null,
    default_workspace: defaultWorkspace,
    memberships: memberships ?? [],
  }
}

export async function touchLastLogin(userId: string) {
  const { error } = await supabaseAdmin
    .from('user_profiles')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', userId)

  assertNoDbError(error, 'Unable to update last login timestamp.')
}

export async function upsertVerifiedContact(
  userId: string,
  type: 'email' | 'phone',
  value: string,
  source: string,
) {
  const { error } = await supabaseAdmin
    .from('user_verified_contacts')
    .upsert(
      {
        user_id: userId,
        type,
        value_normalized: normalizeContactValue(type, value),
        verified_at: new Date().toISOString(),
        source,
      },
      { onConflict: 'user_id,type,value_normalized' },
    )

  assertNoDbError(error, 'Unable to save verified contact.')
}

export async function getWorkspaceAccess(userId: string, workspaceId: string) {
  const { data: workspace, error: workspaceError } = await supabaseAdmin
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)
    .maybeSingle<Workspace>()

  assertNoDbError(workspaceError, 'Unable to load workspace.')
  if (!workspace) {
    throw new AppError(404, 'Workspace not found.', 'WORKSPACE_NOT_FOUND')
  }

  const { data: membership, error: membershipError } = await supabaseAdmin
    .from('workspace_memberships')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle<WorkspaceMembership>()

  assertNoDbError(membershipError, 'Unable to load workspace membership.')
  if (!membership) {
    throw new AppError(403, 'You do not have access to this workspace.', 'WORKSPACE_ACCESS_DENIED')
  }

  return { workspace, membership }
}

export async function repairMissingPersonalWorkspace(userId?: string) {
  const { data, error } = await supabaseAdmin.rpc('repair_missing_personal_workspaces', {
    target_user_id: userId ?? null,
  })

  assertNoDbError(error, 'Unable to repair personal workspace records.')
  return data as number
}
