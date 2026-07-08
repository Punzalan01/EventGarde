import { Outlet } from 'react-router-dom'
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout'

export function PersonalLayout() {
  return (
    <DashboardLayout role="personal">
      <Outlet />
    </DashboardLayout>
  )
}
