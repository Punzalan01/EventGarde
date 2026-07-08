import { Outlet } from 'react-router-dom'
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout'

export function VendorLayout() {
  return (
    <DashboardLayout role="vendor">
      <Outlet />
    </DashboardLayout>
  )
}
