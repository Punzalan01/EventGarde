import { Routes, Route } from 'react-router-dom'
import { OrganizerLayout } from '@/app/layouts/OrganizerLayout'
import { OrganizerDashboardView } from '@/features/organizer-workspace/views/OrganizerDashboardView'

export function OrganizerRoutes() {
  return (
    <Routes>
      <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerDashboardView />} />
      </Route>
    </Routes>
  )
}
