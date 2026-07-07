import { BrowserRouter } from 'react-router-dom'
import { PublicRoutes } from '@/app/routes/PublicRoutes'

export function AppRoutes() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <PublicRoutes />
    </BrowserRouter>
  )
}
