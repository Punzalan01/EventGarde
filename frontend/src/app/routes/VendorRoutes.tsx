import { Routes, Route } from 'react-router-dom'
import { VendorLayout } from '@/app/layouts/VendorLayout'
import { VendorDashboardView } from '@/features/vendor-storefront/views/VendorDashboardView'
import { WorkspaceRedirect } from '@/shared/components/layout/WorkspaceRedirect'

export function VendorRoutes() {
  return (
    <>
      <Route path="/vendor" element={<WorkspaceRedirect basePath="/vendor" />} />
      <Route path="/vendor/:workspaceId" element={<VendorLayout />}>
        <Route index element={<VendorDashboardView />} />
      </Route>
    </>
  )
}
