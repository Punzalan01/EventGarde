import { BrowserRouter } from 'react-router-dom'
import { PublicRoutes } from '@/app/routes/PublicRoutes'
import { OrganizerRoutes } from '@/app/routes/OrganizerRoutes'
import { PersonalRoutes } from '@/app/routes/PersonalRoutes'
import { VendorRoutes } from '@/app/routes/VendorRoutes'

export function AppRoutes() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <PublicRoutes />
      <OrganizerRoutes />
      <PersonalRoutes />
      <VendorRoutes />
    </BrowserRouter>
  )
}
