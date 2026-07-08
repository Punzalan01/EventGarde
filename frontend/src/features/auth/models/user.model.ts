export type PrimaryIntent = 'attendee' | 'organizer' | 'vendor'
export type WorkspaceRole = 'personal_owner' | 'super_admin' | 'admin' | 'vendor_member'
export type WorkspaceType = 'personal' | 'business'
export type WorkspaceTier = 'free' | 'starter' | 'professional' | 'enterprise'
export type VerificationStatus = 'not_required' | 'pending' | 'verified' | 'rejected'
export type SubscriptionStatus = 'free' | 'inactive' | 'active' | 'past_due' | 'cancelled'

export interface SafeUser {
  id: string
  email: string | null
  phone: string | null
  created_at?: string
  last_sign_in_at?: string | null
}

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
  phone: string | null
  primary_intent: PrimaryIntent
  default_workspace_id: string | null
  terms_accepted_at: string | null
  last_login_at: string | null
  created_at: string
  updated_at: string
}

export interface Workspace {
  id: string
  owner_user_id: string
  name: string
  workspace_type: WorkspaceType
  tier: WorkspaceTier
  verification_status: VerificationStatus
  subscription_status: SubscriptionStatus
  created_at: string
  updated_at: string
}

export interface WorkspaceMembership {
  id: string
  workspace_id: string
  user_id: string
  role: WorkspaceRole
  status: 'active' | 'invited' | 'removed'
  created_at: string
  updated_at: string
}

export interface AuthMetadata {
  user: SafeUser
  profile: UserProfile | null
  default_workspace: Workspace | null
  memberships: WorkspaceMembership[]
}

export interface AuthResponse extends AuthMetadata {
  status: 'authenticated' | 'confirmation_required' | 'otp_sent'
  message?: string
}
