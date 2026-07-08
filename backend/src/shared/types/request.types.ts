import type { User } from '@supabase/supabase-js'
import type {
  Workspace,
  WorkspaceMembership,
} from '../../features/auth/auth.model'

declare global {
  namespace Express {
    interface Request {
      authUser?: User
      workspace?: Workspace
      workspaceMembership?: WorkspaceMembership
    }
  }
}

export {}
