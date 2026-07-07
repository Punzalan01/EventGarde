import { BrowserRouter } from 'react-router-dom'
import { PublicRoutes } from '@/app/routes/PublicRoutes'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  )
}
