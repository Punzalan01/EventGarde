import type {
  AuthMetadata,
  AuthResponse,
} from '@/features/auth/models/user.model'
import type {
  LoginFormState,
  RegisterFormState,
} from '@/features/auth/models/auth.model'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

let cachedCsrfToken: string | null = null

async function readJson<ResponseBody>(response: Response): Promise<ResponseBody> {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload?.error?.message ?? 'Request failed.'
    throw new Error(message)
  }

  return payload as ResponseBody
}

async function getCsrfToken() {
  if (cachedCsrfToken) {
    return cachedCsrfToken
  }

  const response = await fetch(`${API_BASE_URL}/api/csrf-token`, {
    credentials: 'include',
  })
  const data = await readJson<{ csrfToken: string }>(response)
  cachedCsrfToken = data.csrfToken
  return cachedCsrfToken
}

async function apiRequest<ResponseBody>(
  path: string,
  options: RequestInit & { csrf?: boolean } = {},
) {
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.csrf) {
    headers.set('x-csrf-token', await getCsrfToken())
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  return readJson<ResponseBody>(response)
}

function roleToPrimaryIntent(role: RegisterFormState['role']) {
  if (role === 'Organizer') {
    return 'organizer'
  }
  if (role === 'Vendor') {
    return 'vendor'
  }
  return 'attendee'
}

export function login(form: LoginFormState) {
  return apiRequest<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  })
}

export function register(form: RegisterFormState) {
  return apiRequest<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      full_name: form.fullName,
      primary_intent: roleToPrimaryIntent(form.role),
      acceptedTerms: form.acceptedTerms,
    }),
  })
}

export function sendEmailOtp(email: string) {
  return apiRequest<AuthResponse>('/api/auth/otp/send', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export function verifyEmailOtp(email: string, token: string) {
  return apiRequest<AuthResponse>('/api/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
  })
}

export function fetchCurrentAuth() {
  return apiRequest<AuthMetadata>('/api/auth/me')
}

export function refreshSession() {
  return apiRequest<AuthResponse>('/api/auth/refresh', {
    method: 'POST',
    csrf: true,
  })
}

export function logout() {
  return apiRequest<{ status: string }>('/api/auth/logout', {
    method: 'POST',
    csrf: true,
  })
}

export function redirectToGoogle() {
  window.location.assign(`${API_BASE_URL}/api/auth/google`)
}
