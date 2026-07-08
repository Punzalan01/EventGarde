import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  AuthMetadata,
  UserProfile,
  SafeUser,
  Workspace,
  WorkspaceMembership,
} from '@/features/auth/models/user.model'
import * as authService from '@/features/auth/services/auth.service'

interface AuthContextValue {
  user: SafeUser | null
  profile: UserProfile | null
  defaultWorkspace: Workspace | null
  memberships: WorkspaceMembership[]
  isLoading: boolean
  isAuthenticated: boolean
  setAuthMetadata: (metadata: AuthMetadata | null) => void
  refreshAuthState: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [metadata, setMetadata] = useState<AuthMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const setAuthMetadata = useCallback((nextMetadata: AuthMetadata | null) => {
    setMetadata(nextMetadata)
  }, [])

  const refreshAuthState = useCallback(async () => {
    setIsLoading(true)
    try {
      const currentAuth = await authService.fetchCurrentAuth()
      setMetadata(currentAuth)
    } catch {
      setMetadata(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setMetadata(null)
  }, [])

  useEffect(() => {
    void refreshAuthState()
  }, [refreshAuthState])

  const value = useMemo<AuthContextValue>(() => ({
    user: metadata?.user ?? null,
    profile: metadata?.profile ?? null,
    defaultWorkspace: metadata?.default_workspace ?? null,
    memberships: metadata?.memberships ?? [],
    isLoading,
    isAuthenticated: Boolean(metadata?.user),
    setAuthMetadata,
    refreshAuthState,
    logout,
  }), [isLoading, logout, metadata, refreshAuthState, setAuthMetadata])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
