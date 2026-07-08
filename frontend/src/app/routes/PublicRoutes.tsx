import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { AuthRoutes } from '@/app/routes/AuthRoutes'
import { UserRoutes } from '@/app/routes/UserRoutes'
import { LandingPageView } from '@/features/landing/views/LandingPageView'
import { PricingView } from '@/features/subscriptions/views/PricingView'

export function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPageView />} />
        <Route path="pricing" element={<PricingView />} />
      </Route>
      {AuthRoutes()}
      {UserRoutes()}
    </Routes>
  )
}
