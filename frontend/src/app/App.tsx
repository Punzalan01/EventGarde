import { AppRoutes } from '@/app/routes/AppRoutes'
import { AuthProvider } from '@/app/providers/AuthProvider'

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
