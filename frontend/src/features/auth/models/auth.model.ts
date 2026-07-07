export type RegisterRole = 'Attendee' | 'Organizer' | 'Vendor'

export interface LoginFormState {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterFormState {
  fullName: string
  organization: string
  email: string
  password: string
  role: RegisterRole
  acceptedTerms: boolean
}

export const registerRoles: RegisterRole[] = ['Attendee', 'Organizer', 'Vendor']
