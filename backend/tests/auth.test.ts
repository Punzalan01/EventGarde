import fs from 'fs'
import path from 'path'
import request from 'supertest'
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

process.env.NODE_ENV = 'test'
process.env.PORT = '4001'
process.env.CORS_ORIGIN = 'http://localhost:5173'
process.env.FRONTEND_URL = 'http://localhost:5173'
process.env.API_BASE_URL = 'http://localhost:4001'
process.env.SUPABASE_URL = 'https://example.supabase.co'
process.env.SUPABASE_ANON_KEY = 'anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key'

const mocks = vi.hoisted(() => ({
  exchangeCodeForSession: vi.fn(),
  getAuthMetadata: vi.fn(),
  getUser: vi.fn(),
  getWorkspaceAccess: vi.fn(),
  refreshSession: vi.fn(),
  signInWithOAuth: vi.fn(),
  signInWithPassword: vi.fn(),
  signOut: vi.fn(),
  signUp: vi.fn(),
  touchLastLogin: vi.fn(),
  upsertVerifiedContact: vi.fn(),
  verifyOtp: vi.fn(),
}))

vi.mock('../src/config/supabase', () => ({
  supabaseAuth: {
    auth: {
      exchangeCodeForSession: mocks.exchangeCodeForSession,
      getUser: mocks.getUser,
      refreshSession: mocks.refreshSession,
      signInWithOAuth: mocks.signInWithOAuth,
      signInWithPassword: mocks.signInWithPassword,
      signUp: mocks.signUp,
      verifyOtp: mocks.verifyOtp,
      signInWithOtp: vi.fn(),
    },
  },
  supabaseAdmin: {
    auth: {
      admin: {
        signOut: mocks.signOut,
      },
    },
  },
}))

vi.mock('../src/features/auth/auth.repository', () => ({
  getAuthMetadata: mocks.getAuthMetadata,
  getWorkspaceAccess: mocks.getWorkspaceAccess,
  repairMissingPersonalWorkspace: vi.fn(),
  touchLastLogin: mocks.touchLastLogin,
  upsertVerifiedContact: mocks.upsertVerifiedContact,
}))

const user = {
  id: 'user-1',
  email: 'person@example.com',
  phone: null,
  created_at: '2026-07-08T00:00:00.000Z',
  last_sign_in_at: '2026-07-08T00:00:00.000Z',
}

const personalWorkspace = {
  id: 'workspace-personal',
  owner_user_id: 'user-1',
  name: "Person's Personal Workspace",
  workspace_type: 'personal',
  tier: 'free',
  verification_status: 'not_required',
  subscription_status: 'free',
  created_at: '2026-07-08T00:00:00.000Z',
  updated_at: '2026-07-08T00:00:00.000Z',
}

const personalMembership = {
  id: 'membership-1',
  workspace_id: 'workspace-personal',
  user_id: 'user-1',
  role: 'personal_owner',
  status: 'active',
  created_at: '2026-07-08T00:00:00.000Z',
  updated_at: '2026-07-08T00:00:00.000Z',
}

const authMetadata = {
  user,
  profile: {
    id: 'user-1',
    full_name: 'Person',
    avatar_url: null,
    email: 'person@example.com',
    phone: null,
    primary_intent: 'attendee',
    default_workspace_id: 'workspace-personal',
    terms_accepted_at: '2026-07-08T00:00:00.000Z',
    last_login_at: '2026-07-08T00:00:00.000Z',
    created_at: '2026-07-08T00:00:00.000Z',
    updated_at: '2026-07-08T00:00:00.000Z',
  },
  default_workspace: personalWorkspace,
  memberships: [personalMembership],
}

const session = {
  access_token: 'access-token-secret',
  refresh_token: 'refresh-token-secret',
  expires_in: 3600,
  user,
}

let app: Awaited<typeof import('../src/app')>['app']

function migrationSql() {
  const backendRoot = process.cwd().endsWith('backend')
    ? process.cwd()
    : path.join(process.cwd(), 'backend')
  const migrationsDir = path.join(backendRoot, 'supabase/migrations')

  return fs.readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .map((file) => fs.readFileSync(path.join(migrationsDir, file), 'utf8'))
    .join('\n')
}

async function csrfCookieAndToken() {
  const response = await request(app).get('/api/csrf-token').expect(200)
  const cookie = response.headers['set-cookie'][0].split(';')[0]
  return {
    cookie,
    token: response.body.csrfToken as string,
  }
}

beforeAll(async () => {
  ;({ app } = await import('../src/app'))
})

beforeEach(() => {
  vi.clearAllMocks()
  mocks.getAuthMetadata.mockResolvedValue(authMetadata)
  mocks.getUser.mockResolvedValue({ data: { user }, error: null })
  mocks.touchLastLogin.mockResolvedValue(undefined)
})

describe('auth sessions', () => {
  it('sets HTTP-only cookies on login and does not return raw tokens', async () => {
    mocks.signInWithPassword.mockResolvedValue({ data: { session }, error: null })

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'person@example.com', password: 'password123' })
      .expect(200)

    expect(response.headers['set-cookie'].join(';')).toContain('eg_access_token=')
    expect(response.headers['set-cookie'].join(';')).toContain('HttpOnly')
    expect(JSON.stringify(response.body)).not.toContain('access-token-secret')
    expect(JSON.stringify(response.body)).not.toContain('refresh-token-secret')
  })

  it('returns unauthorized and no cookies for invalid login', async () => {
    mocks.signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { message: 'Invalid login credentials' },
    })

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'person@example.com', password: 'wrong-password' })
      .expect(401)

    expect(response.headers['set-cookie']).toBeUndefined()
    expect(response.body.error.code).toBe('LOGIN_FAILED')
  })

  it('refreshes and rotates session cookies with CSRF protection', async () => {
    mocks.refreshSession.mockResolvedValue({ data: { session }, error: null })
    const csrf = await csrfCookieAndToken()

    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', [csrf.cookie, 'eg_refresh_token=old-refresh'])
      .set('x-csrf-token', csrf.token)
      .expect(200)

    expect(response.headers['set-cookie'].join(';')).toContain('eg_access_token=')
    expect(mocks.refreshSession).toHaveBeenCalledWith({ refresh_token: 'old-refresh' })
  })

  it('clears cookies on logout', async () => {
    const csrf = await csrfCookieAndToken()

    const response = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', [csrf.cookie, 'eg_access_token=access-token-secret'])
      .set('x-csrf-token', csrf.token)
      .expect(200)

    expect(response.headers['set-cookie'].join(';')).toContain('eg_access_token=;')
  })

  it('returns current user metadata for valid cookies', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Cookie', 'eg_access_token=access-token-secret')
      .expect(200)

    expect(response.body.default_workspace.workspace_type).toBe('personal')
    expect(response.body.memberships[0].role).toBe('personal_owner')
  })

  it('rejects CSRF-protected mutations without a token', async () => {
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', 'eg_access_token=access-token-secret')
      .expect(403)

    expect(response.body.error.code).toBe('CSRF_INVALID')
  })
})

describe('Google OAuth', () => {
  it('redirects to the Supabase provider URL', async () => {
    mocks.signInWithOAuth.mockResolvedValue({
      data: { url: 'https://accounts.google.com/oauth' },
      error: null,
    })

    await request(app)
      .get('/api/auth/google')
      .expect(302)
      .expect('Location', 'https://accounts.google.com/oauth')
  })

  it('handles an invalid callback safely', async () => {
    await request(app)
      .get('/api/auth/callback')
      .expect(302)
      .expect('Location', 'http://localhost:5173/login?auth_error=missing_oauth_code')
  })
})

describe('workspace event creation access', () => {
  it('blocks Personal Workspace users from creating events', async () => {
    mocks.getWorkspaceAccess.mockResolvedValue({
      workspace: personalWorkspace,
      membership: personalMembership,
    })
    const csrf = await csrfCookieAndToken()

    const response = await request(app)
      .post('/api/events')
      .set('Cookie', [csrf.cookie, 'eg_access_token=access-token-secret'])
      .set('x-csrf-token', csrf.token)
      .send({ workspace_id: 'workspace-personal' })
      .expect(403)

    expect(response.body.error.code).toBe('EVENT_CREATION_FORBIDDEN')
  })

  it('allows admins in verified active Business Workspaces through the gate', async () => {
    mocks.getWorkspaceAccess.mockResolvedValue({
      workspace: {
        ...personalWorkspace,
        id: 'workspace-business',
        workspace_type: 'business',
        tier: 'starter',
        verification_status: 'verified',
        subscription_status: 'active',
      },
      membership: {
        ...personalMembership,
        workspace_id: 'workspace-business',
        role: 'admin',
      },
    })
    const csrf = await csrfCookieAndToken()

    const response = await request(app)
      .post('/api/events')
      .set('Cookie', [csrf.cookie, 'eg_access_token=access-token-secret'])
      .set('x-csrf-token', csrf.token)
      .send({ workspace_id: 'workspace-business' })
      .expect(201)

    expect(response.body.status).toBe('event_creation_allowed')
  })
})

describe('database migration', () => {
  it('creates the signup trigger and duplicate-protection indexes', () => {
    const sql = migrationSql()

    expect(sql).toContain('create trigger on_auth_user_created_eventgarde')
    expect(sql).toContain('repair_missing_personal_workspaces')
    expect(sql).toContain('workspaces_one_personal_per_owner_idx')
    expect(sql).toContain('workspace_memberships_workspace_user_idx')
    expect(sql).toContain('user_verified_contacts_unique_idx')
    expect(sql).toContain("role = 'personal_owner'")
  })

  it('does not store auth tokens or service-role keys in frontend auth code', () => {
    const root = process.cwd().endsWith('backend')
      ? path.resolve(process.cwd(), '..')
      : process.cwd()
    const authService = fs.readFileSync(
      path.join(root, 'frontend/src/features/auth/services/auth.service.ts'),
      'utf8',
    )

    expect(authService).not.toMatch(/localStorage|sessionStorage/)
    expect(authService).not.toContain('SUPABASE_SERVICE_ROLE_KEY')
    expect(authService).not.toContain('access_token')
    expect(authService).not.toContain('refresh_token')
  })
})
