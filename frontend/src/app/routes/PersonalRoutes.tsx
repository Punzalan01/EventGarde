import { Routes, Route } from 'react-router-dom'
import { PersonalLayout } from '@/app/layouts/PersonalLayout'
import { PersonalDashboardView } from '@/features/personal-dashboard/views/PersonalDashboardView'
import { DiscoverView } from '@/features/discover/views/DiscoverView'
import { TicketHistoryView } from '@/features/personal-dashboard/views/TicketHistoryView'
import { PendingRsvpsView } from '@/features/personal-dashboard/views/PendingRsvpsView'
import { WorkspaceRedirect } from '@/shared/components/layout/WorkspaceRedirect'

export function PersonalRoutes() {
  return (
    <>
      <Route path="/personal" element={<WorkspaceRedirect basePath="/personal" />} />
      <Route path="/personal/:workspaceId" element={<PersonalLayout />}>
        <Route index element={<PersonalDashboardView />} />
        <Route path="discovery" element={<DiscoverView />} />
        <Route path="tickets" element={<TicketHistoryView />} />
        <Route path="rsvp" element={<PendingRsvpsView />} />
      </Route>
    </>
  )
}
