import { Routes, Route } from 'react-router-dom'
import { OrganizerLayout } from '@/app/layouts/OrganizerLayout'
import { OrganizerDashboardView } from '@/features/organizer-workspace/views/OrganizerDashboardView'
import { WorkspaceRedirect } from '@/shared/components/layout/WorkspaceRedirect'

export function OrganizerRoutes() {
  return (
    <>
      <Route path="/organizer" element={<WorkspaceRedirect basePath="/organizer" />} />
      <Route path="/organizer/:workspaceId" element={<OrganizerLayout />}>
        <Route index element={<OrganizerDashboardView />} />
      </Route>
    </>
  )
}
