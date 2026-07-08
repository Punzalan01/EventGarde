import { Routes, Route } from 'react-router-dom'
import { VendorLayout } from '@/app/layouts/VendorLayout'
import { VendorDashboardView } from '@/features/vendor-workspace/views/VendorDashboardView'

export function VendorRoutes() {
  return (
    <Routes>
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboardView />} />
      </Route>
    </Routes>
  )
}
